import * as THREE from "three";
import { starFragment, starVertex } from "./shaders";

/** Estrelas ao fundo, numa casca esferica longe da camera, para dar profundidade. */
export class Starfield {
  readonly points: THREE.Points;
  private readonly geometry = new THREE.BufferGeometry();
  private readonly material: THREE.ShaderMaterial;
  private elapsed = 0;

  constructor(count: number, private readonly reduced: boolean) {
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const randoms = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Disco largo bem atras da cena. O giro e so em Z, entao nenhuma
      // estrela chega perto da camera (antes, algumas passavam rente a ela
      // e viravam uma bola de luz atravessando a tela).
      const r = Math.sqrt(Math.random()) * 34;
      const theta = Math.random() * Math.PI * 2;
      positions[i * 3] = Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(theta) * r * 0.75;
      positions[i * 3 + 2] = -10 - Math.random() * 26;
      sizes[i] = 0.8 + Math.random() * 2.2;
      randoms[i] = Math.random();
    }

    this.geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    this.geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    this.geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

    this.material = new THREE.ShaderMaterial({
      vertexShader: starVertex,
      fragmentShader: starFragment,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: 1 },
        uColor: { value: new THREE.Color("#c7d2fe") },
        uOpacity: { value: 0.75 },
      },
    });

    this.points = new THREE.Points(this.geometry, this.material);
    this.points.frustumCulled = false;
  }

  update(dt: number, scrollY: number, pixelRatio: number) {
    if (!this.reduced) this.elapsed += dt;
    // Gira devagar em torno do eixo da camera e acompanha o scroll.
    this.points.rotation.z = this.elapsed * 0.008 + scrollY * 0.00008;
    this.material.uniforms.uTime.value = this.elapsed;
    this.material.uniforms.uPixelRatio.value = pixelRatio;
  }

  dispose() {
    this.geometry.dispose();
    this.material.dispose();
  }
}
