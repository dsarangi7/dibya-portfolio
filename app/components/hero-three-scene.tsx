"use client";

import { Float, Line, Sparkles } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function useTelemetryDots() {
  return useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const angle = (index / 14) * Math.PI * 2;
        const radius = 2.3 + (index % 3) * 0.22;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, Math.sin(index) * 0.12);
      }),
    [],
  );
}

function BatteryCoreScene({
  mouseX,
  mouseY,
}: {
  mouseX: number;
  mouseY: number;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const dots = useTelemetryDots();

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    const targetX = mouseX * 0.45;
    const targetY = mouseY * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.035);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03);
    camera.lookAt(0, 0, 0);

    if (group.current) {
      group.current.rotation.y = t * 0.18 + mouseX * 0.08;
      group.current.rotation.x = Math.sin(t * 0.28) * 0.08 + mouseY * 0.04;
      group.current.position.y = Math.sin(t * 0.9) * 0.05;
    }

    if (core.current) {
      core.current.scale.setScalar(1 + Math.sin(t * 2.2) * 0.018);
      const material = core.current.material as THREE.MeshStandardMaterial;
      material.emissiveIntensity = 1.5 + Math.sin(t * 1.7) * 0.25;
    }

    if (shell.current) {
      shell.current.rotation.y = -t * 0.12;
    }

    if (ringA.current) {
      ringA.current.rotation.z = t * 0.25;
    }

    if (ringB.current) {
      ringB.current.rotation.z = -t * 0.18;
    }
  });

  return (
    <group ref={group}>
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 6]} intensity={1.4} color="#c7f9ff" />
      <pointLight position={[-5, -3, 4]} intensity={1.2} color="#8b5cf6" />
      <pointLight position={[2, 1, 5]} intensity={1.8} color="#67e8f9" />

      <mesh ref={core} castShadow={false} receiveShadow={false}>
        <sphereGeometry args={[1.18, 36, 36]} />
        <meshStandardMaterial
          color="#07131f"
          emissive="#1d8fb8"
          emissiveIntensity={1.55}
          roughness={0.12}
          metalness={0.85}
        />
      </mesh>

      <mesh ref={shell} scale={1.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.16} wireframe />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.05, 0.025, 10, 120]} />
        <meshBasicMaterial color="#67e8f9" transparent opacity={0.42} />
      </mesh>

      <mesh ref={ringB} rotation={[0, Math.PI / 5, Math.PI / 2]}>
        <torusGeometry args={[1.62, 0.018, 10, 120]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.28} />
      </mesh>

      <Float speed={1.1} rotationIntensity={0.22} floatIntensity={0.35}>
        <group position={[2.7, 0.9, 0.15]} rotation={[0.1, -0.75, 0.05]}>
          <mesh>
            <planeGeometry args={[1.55, 0.88]} />
            <meshBasicMaterial color="#08111c" transparent opacity={0.34} />
          </mesh>
          <Line points={[[-0.48, 0.22, 0.02], [0.08, 0.22, 0.02], [0.26, -0.02, 0.02], [0.58, -0.02, 0.02]]} color="#67e8f9" lineWidth={1.2} />
          <Line points={[[-0.48, -0.14, 0.02], [-0.08, -0.14, 0.02], [0.08, -0.28, 0.02], [0.54, -0.28, 0.02]]} color="#f8d36b" lineWidth={1} />
        </group>
      </Float>

      <Float speed={1.25} rotationIntensity={0.18} floatIntensity={0.28}>
        <group position={[-2.95, -0.55, -0.1]} rotation={[0.06, 0.82, -0.04]}>
          <mesh>
            <planeGeometry args={[1.38, 0.76]} />
            <meshBasicMaterial color="#08111c" transparent opacity={0.3} />
          </mesh>
          <Line points={[[-0.42, 0.16, 0.02], [-0.05, 0.16, 0.02], [0.18, 0.02, 0.02], [0.52, 0.02, 0.02]]} color="#a78bfa" lineWidth={1.1} />
          <Line points={[[-0.46, -0.18, 0.02], [0.02, -0.18, 0.02], [0.14, -0.06, 0.02], [0.5, -0.06, 0.02]]} color="#67e8f9" lineWidth={0.9} />
        </group>
      </Float>

      <Float speed={0.95} rotationIntensity={0.2} floatIntensity={0.3}>
        <group position={[0.08, 2.25, 0.08]} rotation={[0, 0.18, 0.08]}>
          <mesh>
            <planeGeometry args={[1.65, 0.7]} />
            <meshBasicMaterial color="#08111c" transparent opacity={0.22} />
          </mesh>
          <Line points={[[-0.56, -0.02, 0.02], [-0.18, -0.02, 0.02], [0.08, 0.16, 0.02], [0.58, 0.16, 0.02]]} color="#67e8f9" lineWidth={1.05} />
        </group>
      </Float>

      <Sparkles count={18} scale={8} size={1.8} speed={0.35} color="#67e8f9" noise={0.6} />

      {dots.map((dot, index) => (
        <mesh key={index} position={dot.toArray()}>
          <sphereGeometry args={[index % 4 === 0 ? 0.05 : 0.03, 8, 8]} />
          <meshBasicMaterial color={index % 2 === 0 ? "#67e8f9" : "#f8d36b"} transparent opacity={0.8} />
        </mesh>
      ))}
    </group>
  );
}

function HeroFallbackScene() {
  return (
    <div className="relative flex h-full min-h-[28rem] items-center justify-center overflow-hidden rounded-[2.5rem] border border-cyan-300/10 bg-slate-950/35 shadow-[0_0_140px_rgba(34,211,238,0.08)]">
      <div className="absolute inset-0 tech-grid opacity-25" />
      <div className="absolute inset-0 particles opacity-50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.16),_transparent_38%),radial-gradient(circle_at_72%_28%,_rgba(167,139,250,0.12),_transparent_24%)]" />
      <div className="absolute h-[18rem] w-[18rem] rounded-full border border-cyan-300/20 bg-cyan-300/10 blur-3xl" />
      <div className="relative flex h-[21rem] w-[21rem] items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-cyan-200/20" />
        <div className="absolute inset-6 rounded-full border border-violet-300/15" />
        <div className="absolute inset-12 rounded-full border border-amber-200/10" />
        <div className="absolute inset-20 rounded-full bg-[radial-gradient(circle,_rgba(103,232,249,0.35),_rgba(103,232,249,0.06)_46%,_transparent_72%)] blur-sm" />
        <div className="relative z-10">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <div className="text-cyan-100">
              <svg viewBox="0 0 96 96" className="h-16 w-16" fill="none" aria-hidden="true">
                <path d="M16 48C16 30.3 30.3 16 48 16h19c7.2 0 13 5.8 13 13v38c0 7.2-5.8 13-13 13H48C30.3 80 16 65.7 16 48Z" stroke="currentColor" strokeWidth="2" opacity="0.9" />
                <path d="M29 65V31h13c9.5 0 16 6.8 16 17s-6.5 17-16 17H29Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SceneContent({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  return (
    <Suspense fallback={null}>
      <BatteryCoreScene mouseX={mouseX} mouseY={mouseY} />
    </Suspense>
  );
}

export function HeroThreeScene({
  mouseX,
  mouseY,
  reducedMotion = false,
  supportsWebGL = true,
}: {
  mouseX: number;
  mouseY: number;
  reducedMotion?: boolean;
  supportsWebGL?: boolean;
}) {
  if (!supportsWebGL || reducedMotion) {
    return <HeroFallbackScene />;
  }

  return (
    <div className="relative h-full min-h-[28rem] overflow-hidden rounded-[2.5rem] border border-cyan-300/10 bg-slate-950/30 shadow-[0_0_140px_rgba(34,211,238,0.08)]">
      <div className="absolute inset-0 tech-grid opacity-30" />
      <div className="absolute inset-0 particles opacity-60" />
      <Canvas
        dpr={[1, 1.35]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        camera={{ position: [0, 0, 7.2], fov: 42, near: 0.1, far: 30 }}
        className="absolute inset-0"
      >
        <SceneContent mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.1),_transparent_35%),radial-gradient(circle_at_75%_25%,_rgba(167,139,250,0.08),_transparent_24%)]" />
      <div className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-cyan-300/40 to-transparent" />
    </div>
  );
}
