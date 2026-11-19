"use client";

/**
 * Slowly morphing noise sphere that follows the pointer.
 * Concept and motion adapted from Hamish Williams' DisplacementSphere (MIT).
 * Rewritten as a self-contained ShaderMaterial so it does not depend on
 * three.js internal shader chunks. Perlin noise by Stefan Gustavson (MIT).
 */
import { useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  Color,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  Vector3,
  WebGLRenderer,
} from "three";

const noise = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
vec3 fade(vec3 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}
float pnoise(vec3 P, vec3 rep){
  vec3 Pi0=mod(floor(P),rep); vec3 Pi1=mod(Pi0+vec3(1.0),rep);
  Pi0=mod289(Pi0); Pi1=mod289(Pi1);
  vec3 Pf0=fract(P); vec3 Pf1=Pf0-vec3(1.0);
  vec4 ix=vec4(Pi0.x,Pi1.x,Pi0.x,Pi1.x); vec4 iy=vec4(Pi0.yy,Pi1.yy);
  vec4 iz0=Pi0.zzzz; vec4 iz1=Pi1.zzzz;
  vec4 ixy=permute(permute(ix)+iy); vec4 ixy0=permute(ixy+iz0); vec4 ixy1=permute(ixy+iz1);
  vec4 gx0=ixy0*(1.0/7.0); vec4 gy0=fract(floor(gx0)*(1.0/7.0))-0.5; gx0=fract(gx0);
  vec4 gz0=vec4(0.5)-abs(gx0)-abs(gy0); vec4 sz0=step(gz0,vec4(0.0));
  gx0-=sz0*(step(0.0,gx0)-0.5); gy0-=sz0*(step(0.0,gy0)-0.5);
  vec4 gx1=ixy1*(1.0/7.0); vec4 gy1=fract(floor(gx1)*(1.0/7.0))-0.5; gx1=fract(gx1);
  vec4 gz1=vec4(0.5)-abs(gx1)-abs(gy1); vec4 sz1=step(gz1,vec4(0.0));
  gx1-=sz1*(step(0.0,gx1)-0.5); gy1-=sz1*(step(0.0,gy1)-0.5);
  vec3 g000=vec3(gx0.x,gy0.x,gz0.x); vec3 g100=vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010=vec3(gx0.z,gy0.z,gz0.z); vec3 g110=vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001=vec3(gx1.x,gy1.x,gz1.x); vec3 g101=vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011=vec3(gx1.z,gy1.z,gz1.z); vec3 g111=vec3(gx1.w,gy1.w,gz1.w);
  vec4 norm0=taylorInvSqrt(vec4(dot(g000,g000),dot(g010,g010),dot(g100,g100),dot(g110,g110)));
  g000*=norm0.x; g010*=norm0.y; g100*=norm0.z; g110*=norm0.w;
  vec4 norm1=taylorInvSqrt(vec4(dot(g001,g001),dot(g011,g011),dot(g101,g101),dot(g111,g111)));
  g001*=norm1.x; g011*=norm1.y; g101*=norm1.z; g111*=norm1.w;
  float n000=dot(g000,Pf0); float n100=dot(g100,vec3(Pf1.x,Pf0.yz));
  float n010=dot(g010,vec3(Pf0.x,Pf1.y,Pf0.z)); float n110=dot(g110,vec3(Pf1.xy,Pf0.z));
  float n001=dot(g001,vec3(Pf0.xy,Pf1.z)); float n101=dot(g101,vec3(Pf1.x,Pf0.y,Pf1.z));
  float n011=dot(g011,vec3(Pf0.x,Pf1.yz)); float n111=dot(g111,Pf1);
  vec3 f=fade(Pf0);
  vec4 n_z=mix(vec4(n000,n100,n010,n110),vec4(n001,n101,n011,n111),f.z);
  vec2 n_yz=mix(n_z.xy,n_z.zw,f.y);
  return 2.2*mix(n_yz.x,n_yz.y,f.x);
}
float turbulence(vec3 p){
  float t=-0.5;
  for(float f=1.0;f<=10.0;f++){ float power=pow(2.0,f); t+=abs(pnoise(vec3(power*p),vec3(10.0))/power); }
  return t;
}`;

const vertexShader = /* glsl */ `
uniform float time;
varying vec2 vUv;
varying float vNoise;
varying vec3 vNormal;
${noise}
void main(){
  vUv = uv;
  vNoise = turbulence(0.01 * position + normal + time * 0.8);
  vec3 displaced = position + normal + position * vNoise;
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}`;

const fragmentShader = /* glsl */ `
uniform vec3 tint;
uniform vec3 lightDir;
varying vec2 vUv;
varying float vNoise;
varying vec3 vNormal;
void main(){
  vec3 c = vec3(vUv * (0.2 - 2.0 * vNoise), 1.0);
  vec3 base = cos(vec3(c.b * 1.5, c.r, c.r) * vNoise * 3.0);
  float diffuse = max(dot(normalize(vNormal), normalize(lightDir)), 0.0);
  vec3 lit = base * (0.18 + 0.9 * diffuse);
  gl_FragColor = vec4(mix(lit, lit * tint, 0.4) * 0.42, 1.0);
}`;

const springConfig = { stiffness: 30, damping: 20, mass: 2 };

export function DisplacementSphere({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();
  const rotationX = useSpring(0, springConfig);
  const rotationY = useSpring(0, springConfig);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer: WebGLRenderer;
    try {
      renderer = new WebGLRenderer({
        canvas,
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: true,
      });
    } catch {
      return; // No WebGL: the page still works without the sphere.
    }
    renderer.setPixelRatio(1);

    const camera = new PerspectiveCamera(54, 1, 0.1, 100);
    camera.position.z = 52;
    const scene = new Scene();
    const material = new ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      uniforms: {
        time: { value: 0 },
        tint: { value: new Color("#5fe3ff") },
        lightDir: { value: new Vector3(1, 1, 2) },
      },
    });
    const geometry = new SphereGeometry(32, 128, 128);
    const sphere = new Mesh(geometry, material);
    scene.add(sphere);

    const resize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight * 1.3;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      if (width <= 696) sphere.position.set(14, 10, 0);
      else if (width <= 1040) sphere.position.set(18, 14, 0);
      else sphere.position.set(22, 16, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    let inView = true;
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
    });
    observer.observe(canvas);

    let last = 0;
    const onPointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 100) return;
      last = now;
      rotationX.set(event.clientY / window.innerHeight / 2);
      rotationY.set(event.clientX / window.innerWidth / 2);
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointerMove);

    const start = Date.now();
    let frame = 0;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      if (!inView) return;
      material.uniforms.time.value = 0.00005 * (Date.now() - start);
      sphere.rotation.z += 0.001;
      sphere.rotation.x = rotationX.get();
      sphere.rotation.y = rotationY.get();
      renderer.render(scene, camera);
    };

    if (reduceMotion) renderer.render(scene, camera);
    else animate();
    const showTimer = setTimeout(() => setVisible(true), 50);

    return () => {
      clearTimeout(showTimer);
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [reduceMotion, rotationX, rotationY]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-x-0 top-0 transition-opacity duration-[3000ms] ease-out ${
        visible ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
