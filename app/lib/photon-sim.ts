/**
 * 2D Monte Carlo photon migration in a semi-infinite turbid medium.
 * Units are millimetres. Isotropic scattering with the reduced scattering
 * coefficient stands in for forward-peaked scattering (similarity rule).
 * Teaching values only: no measured data.
 */
export const SIM = {
  mus: 1, // reduced scattering coefficient, 1/mm
  mua: 0.006, // absorption coefficient, 1/mm
  aperture: 1.6, // detector half-width, mm
  detectors: [10, 20, 30], // source–detector separations, mm
  x0: -8, // visible window, mm
  x1: 40,
  depth: 24,
  cell: 0.4, // density grid resolution, mm
  pDynamic: 0.12, // share of scattering events off moving red blood cells
  psPerMm: 4.67, // time of flight per mm of path (n = 1.4)
  binPs: 50,
  bins: 64,
} as const;

export const NX = Math.round((SIM.x1 - SIM.x0) / SIM.cell);
export const NY = Math.round(SIM.depth / SIM.cell);

export type Walk = {
  /** Flat x,y pairs from entry to exit (or loss). */
  pts: number[];
  /** Vertex indices where the photon scattered off a moving red blood cell. */
  dynamic: number[];
  /** Detector index reached, or -1. */
  detector: number;
};

/** One photon from the source at the origin, launched straight down. */
export function walkPhoton(maxSteps = 4000): Walk {
  let x = 0;
  let y = 0;
  let angle = Math.PI / 2;
  const pts = [0, 0];
  const dynamic: number[] = [];
  for (let k = 0; k < maxSteps; k++) {
    const step = -Math.log(Math.random()) / SIM.mus;
    const nx = x + Math.cos(angle) * step;
    const ny = y + Math.sin(angle) * step;
    if (ny < 0) {
      const t = y / (y - ny);
      const ex = x + (nx - x) * t;
      pts.push(ex, 0);
      const r = Math.abs(ex);
      const detector = SIM.detectors.findIndex((d) => Math.abs(r - d) < SIM.aperture);
      // Detectors sit to the right; mirror photons that exit on the left.
      if (detector >= 0 && ex < 0) for (let i = 0; i < pts.length; i += 2) pts[i] = -pts[i];
      return { pts, dynamic, detector };
    }
    x = nx;
    y = ny;
    pts.push(x, y);
    if (Math.abs(x) > 80 || y > 60) break;
    if (Math.random() < 1 - Math.exp(-SIM.mua * step)) break;
    if (Math.random() < SIM.pDynamic) dynamic.push(pts.length / 2 - 1);
    angle = Math.random() * Math.PI * 2;
  }
  return { pts, dynamic, detector: -1 };
}

/** Keep launching photons until one reaches the given detector. */
export function detectedWalk(detector: number, tries = 50000): Walk {
  for (let i = 0; i < tries; i++) {
    const walk = walkPhoton();
    if (walk.detector === detector && walk.pts.length > 20) return walk;
  }
  return walkPhoton();
}

/**
 * Bulk simulation for the background worker. It accumulates, per detector, a
 * path-density grid (the "banana"), a time-of-flight histogram (TRS), and the
 * mean number of moving-scatterer events (which sets the DCS decay rate).
 */
const workerSource = `
const S = ${JSON.stringify(SIM)};
const NX = ${NX}, NY = ${NY};
const sampleP = [0.015, 0.12, 0.9];
const buf = new Float32Array(2 * 4004);
let grids, hist, dynSum, hits, samples, running = false, timer = 0, lastPost = 0;

function reset() {
  grids = [0, 1, 2].map(() => new Float32Array(NX * NY));
  hist = [0, 1, 2].map(() => new Float32Array(S.bins));
  dynSum = [0, 0, 0];
  hits = [0, 0, 0];
  samples = [];
}

function deposit(g, n, flip) {
  for (let i = 0; i < n - 1; i++) {
    const ax = buf[2 * i] * flip, ay = buf[2 * i + 1];
    const dx = buf[2 * i + 2] * flip - ax, dy = buf[2 * i + 3] - ay;
    const m = Math.max(1, Math.ceil(Math.hypot(dx, dy) / S.cell));
    for (let j = 0; j < m; j++) {
      const f = (j + 0.5) / m;
      const px = ax + dx * f, py = ay + dy * f;
      if (px < S.x0 || py < 0) continue;
      const ix = ((px - S.x0) / S.cell) | 0, iy = (py / S.cell) | 0;
      if (ix < NX && iy < NY) g[iy * NX + ix] += 1;
    }
  }
}

function photon() {
  let x = 0, y = 0, a = Math.PI / 2, n = 1, L = 0, dyn = 0;
  buf[0] = 0; buf[1] = 0;
  for (let k = 0; k < 4000; k++) {
    const s = -Math.log(Math.random()) / S.mus;
    const nx = x + Math.cos(a) * s, ny = y + Math.sin(a) * s;
    if (ny < 0) {
      const t = y / (y - ny);
      const ex = x + (nx - x) * t;
      L += s * t;
      buf[2 * n] = ex; buf[2 * n + 1] = 0; n++;
      const r = Math.abs(ex);
      for (let d = 0; d < 3; d++) {
        if (Math.abs(r - S.detectors[d]) >= S.aperture) continue;
        const flip = ex < 0 ? -1 : 1;
        hits[d]++;
        dynSum[d] += dyn;
        const bin = ((L * S.psPerMm) / S.binPs) | 0;
        if (bin < S.bins) hist[d][bin]++;
        deposit(grids[d], n, flip);
        if (samples.length < 8 && Math.random() < sampleP[d]) {
          const pts = new Float32Array(2 * n);
          for (let i = 0; i < n; i++) { pts[2 * i] = buf[2 * i] * flip; pts[2 * i + 1] = buf[2 * i + 1]; }
          samples.push({ d, pts });
        }
      }
      return;
    }
    L += s; x = nx; y = ny;
    buf[2 * n] = x; buf[2 * n + 1] = y; n++;
    if (x > 80 || x < -80 || y > 60) return;
    if (Math.random() < 1 - Math.exp(-S.mua * s)) return;
    if (Math.random() < S.pDynamic) dyn++;
    a = Math.random() * 6.283185307179586;
  }
}

function post() {
  postMessage({
    grids: grids.map((g) => g.slice()),
    hist: hist.map((h) => h.slice()),
    dynamic: dynSum.map((v, i) => (hits[i] ? v / hits[i] : 0)),
    hits: hits.slice(),
    samples,
  });
  samples = [];
}

function tick() {
  if (!running) return;
  const t0 = performance.now();
  while (performance.now() - t0 < 20) for (let i = 0; i < 200; i++) photon();
  if (performance.now() - lastPost > 120) { post(); lastPost = performance.now(); }
  timer = setTimeout(tick, 0);
}

reset();
onmessage = (e) => {
  if (e.data === "reset") reset();
  else if (e.data === "run") { if (!running) { running = true; tick(); } }
  else if (e.data === "pause") { running = false; clearTimeout(timer); post(); }
};
`;

export type Snapshot = {
  grids: Float32Array[];
  hist: Float32Array[];
  dynamic: number[];
  hits: number[];
  samples: { d: number; pts: Float32Array }[];
};

export function createPhotonWorker(): { worker: Worker; dispose: () => void } | null {
  if (typeof Worker === "undefined") return null;
  const url = URL.createObjectURL(new Blob([workerSource], { type: "text/javascript" }));
  const worker = new Worker(url);
  return {
    worker,
    dispose: () => {
      worker.terminate();
      URL.revokeObjectURL(url);
    },
  };
}
