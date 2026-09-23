import * as THREE from "three";
import { buildShapes, shapeMeta, type ShapeId } from "./shapes";
import { particleFragment, particleVertex } from "./shaders";
import type { SceneState } from "./sceneStore";

const TAU = Math.PI * 2;

/** Fator de suavizacao independente de FPS: `rate` e o quanto anda por frame a 60 fps. */
const damp = (rate: number, dt: number) => 1 - Math.pow(1 - rate, dt * 60);

type Pointer = { x: number; y: number; active: number };

/**
 * Nuvem de particulas que muda de forma. As posicoes sao atualizadas na CPU
 * (cada particula persegue o alvo com velocidade propria, o que da o efeito
 * organico do morph); ruido, brilho e repulsao do cursor ficam no shader.
 */
export class ParticleSystem {
  /** Grupo externo: posicao, escala e parallax do mouse. */
  readonly root = new THREE.Group();
  private readonly tiltGroup = new THREE.Group();
  private readonly spinGroup = new THREE.Group();
  private readonly geometry = new THREE.BufferGeometry();
  private readonly material: THREE.ShaderMaterial;
  private readonly shapes: Record<ShapeId, Float32Array>;
  private readonly positions: Float32Array;
  private readonly speeds: Float32Array;
  private readonly tint = new THREE.Color();
  private readonly scratchColor = new THREE.Color();

  private current: ShapeId | null = null;
  private first = true;
  private spin = 0;
  private energy = 1.1;
  private tintMix = 0;
  private x = 0;
  private y = 0;
  private scale = 1;
  private opacity = 0;
  private roll = 0;
  private pointerStrength = 0;
  private lastScrollY = 0;

  constructor(
    private readonly count: number,
    private readonly reduced: boolean,
  ) {
    this.shapes = buildShapes(count);
    this.positions = new Float32Array(count * 3);
    this.speeds = new Float32Array(count);
    const randoms = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Nascem todas no centro e explodem para a primeira forma.
      this.positions[i * 3] = (Math.random() - 0.5) * 0.1;
      this.positions[i * 3 + 1] = (Math.random() - 0.5) * 0.1;
      this.positions[i * 3 + 2] = (Math.random() - 0.5) * 0.1;
      this.speeds[i] = 0.55 + Math.random() * 0.9;
      randoms[i] = Math.random();
      scales[i] = Math.random() < 0.06 ? 1.6 + Math.random() * 1.2 : 0.45 + Math.random() * 0.8;
    }

    this.geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(this.positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));
    this.geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: particleVertex,
      fragmentShader: particleFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: count > 5000 ? 33 : 38 },
        uPixelRatio: { value: 1 },
        uEnergy: { value: 1 },
        uPointer: { value: new THREE.Vector2(0, 0) },
        uPointerStrength: { value: 0 },
        uAspect: { value: 1 },
        uOpacity: { value: 0 },
        uColorA: { value: new THREE.Color("#3b82f6") },
        uColorB: { value: new THREE.Color("#a78bfa") },
        uColorC: { value: new THREE.Color("#22d3ee") },
        uTint: { value: new THREE.Color("#ffffff") },
        uTintMix: { value: 0 },
      },
    });

    const points = new THREE.Points(this.geometry, this.material);
    points.frustumCulled = false;
    this.spinGroup.add(points);
    this.tiltGroup.add(this.spinGroup);
    this.root.add(this.tiltGroup);
  }

  update(dt: number, target: SceneState, pointer: Pointer, aspect: number, pixelRatio: number, scrollY: number) {
    const reduced = this.reduced;
    const meta = shapeMeta[target.shape];

    // 1. Forma: ao trocar, injeta energia para as particulas rodopiarem.
    if (target.shape !== this.current) {
      if (this.current !== null && !reduced) this.energy = Math.min(1.2, this.energy + 0.6);
      this.current = target.shape;
    }

    const goal = this.shapes[target.shape];
    const pos = this.positions;
    if (reduced) {
      pos.set(goal);
    } else {
      const k = damp(0.055, dt);
      for (let i = 0; i < this.count; i++) {
        const a = Math.min(1, k * this.speeds[i]);
        const i3 = i * 3;
        pos[i3] += (goal[i3] - pos[i3]) * a;
        pos[i3 + 1] += (goal[i3 + 1] - pos[i3 + 1]) * a;
        pos[i3 + 2] += (goal[i3 + 2] - pos[i3 + 2]) * a;
      }
    }
    (this.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

    // 2. Posicionamento na tela.
    const follow = this.first || reduced ? 1 : damp(target.follow ?? 0.06, dt);
    this.x += (target.x - this.x) * follow;
    this.y += (target.y - this.y) * follow;
    this.scale += (target.scale - this.scale) * follow;
    this.opacity += (target.opacity - this.opacity) * (reduced ? 1 : damp(0.045, dt));
    this.first = false;
    this.root.position.set(this.x, this.y, 0);
    this.root.scale.setScalar(this.scale);

    // 3. Parallax do mouse e inclinacao propria de cada forma.
    const soft = reduced ? 1 : damp(0.05, dt);
    const active = reduced ? 0 : pointer.active;
    this.root.rotation.x += (-pointer.y * 0.2 * active - this.root.rotation.x) * soft;
    this.root.rotation.y += (pointer.x * 0.3 * active - this.root.rotation.y) * soft;
    this.tiltGroup.rotation.x += ((target.tilt ?? meta.tilt) - this.tiltGroup.rotation.x) * soft;
    this.roll += ((target.roll ?? 0) - this.roll) * soft;
    this.tiltGroup.rotation.z = this.roll;

    if (meta.spin > 0 && !reduced) {
      this.spin += dt * meta.spin;
    } else {
      // Logos giram de volta para ficar de frente, pelo caminho mais curto.
      const rest = Math.round(this.spin / TAU) * TAU;
      this.spin += (rest - this.spin) * soft;
    }
    this.spinGroup.rotation.y = this.spin;

    // 4. Energia: decai sozinha e sobe com a velocidade do scroll.
    const scrollSpeed = Math.abs(scrollY - this.lastScrollY) / Math.max(dt, 0.001);
    this.lastScrollY = scrollY;
    const fromScroll = reduced ? 0 : Math.min(0.28, scrollSpeed / 9000);
    this.energy = Math.max(this.energy * Math.pow(0.28, dt), fromScroll);

    // 5. Cor da marca.
    const tk = reduced ? 1 : damp(0.05, dt);
    if (meta.tint) {
      this.tint.lerp(this.scratchColor.set(meta.tint), tk);
      this.tintMix += (0.85 - this.tintMix) * tk;
    } else {
      this.tintMix += (0 - this.tintMix) * tk;
    }

    // 6. Uniforms.
    this.pointerStrength += (active - this.pointerStrength) * soft;
    const u = this.material.uniforms;
    if (!reduced) u.uTime.value += dt;
    u.uEnergy.value = this.energy;
    u.uOpacity.value = this.opacity;
    u.uTint.value.copy(this.tint);
    u.uTintMix.value = this.tintMix;
    u.uAspect.value = aspect;
    u.uPixelRatio.value = pixelRatio;
    u.uPointer.value.set(pointer.x, pointer.y);
    u.uPointerStrength.value = this.pointerStrength;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
