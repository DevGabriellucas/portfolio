"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type { Group } from "three";
import { ParticleSystem } from "./ParticleSystem";
import { Starfield } from "./Starfield";
import { CAMERA, pointer, resolveScene } from "./sceneStore";

function Particles() {
  const holder = useRef<Group>(null);
  const particles = useRef<ParticleSystem | null>(null);
  const stars = useRef<Starfield | null>(null);

  useEffect(() => {
    const group = holder.current;
    if (!group) return;

    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const system = new ParticleSystem(mobile ? 3400 : 6500, reduced);
    const field = new Starfield(mobile ? 600 : 1300, reduced);
    group.add(system.root, field.points);
    particles.current = system;
    stars.current = field;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1);
      pointer.active = 1;
    };
    const onLeave = () => {
      pointer.active = 0;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      group.remove(system.root, field.points);
      system.dispose();
      field.dispose();
      particles.current = null;
      stars.current = null;
    };
  }, []);

  useFrame((state, delta) => {
    const system = particles.current;
    if (!system) return;
    // Aba em segundo plano devolve deltas enormes; limitar evita o "salto".
    const dt = Math.min(delta, 1 / 20);
    const { width, height } = state.size;
    const scrollY = window.scrollY;
    system.update(dt, resolveScene(), pointer, width / height, state.viewport.dpr, scrollY);
    stars.current?.update(dt, scrollY, state.viewport.dpr);
  });

  return <group ref={holder} />;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA.z], fov: CAMERA.fov, near: 0.1, far: 80 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      fallback={null}
    >
      <Particles />
    </Canvas>
  );
}
