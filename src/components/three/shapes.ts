import { brandIcons, type BrandIconName } from "@/lib/brand-icons";

// Cada forma e uma nuvem com o MESMO numero de pontos. A particula i de uma forma
// "vira" a particula i da proxima, e e isso que produz o morph.

export type ShapeId =
  | "sphere"
  | "typescript"
  | "react"
  | "nextjs"
  | "nodejs"
  | "postgresql"
  | "docker"
  | "flutter"
  | "galaxy"
  | "ring"
  | "scatter";

export type ShapeMeta = {
  /** Rotacao em X do grupo (galaxia e anel ficam deitados; logos de frente). */
  tilt: number;
  /** Velocidade de giro em Y, rad/s. Zero = volta a ficar de frente. */
  spin: number;
  /** Cor da marca que tinge as particulas; null = gradiente azul/violeta. */
  tint: string | null;
};

export const shapeMeta: Record<ShapeId, ShapeMeta> = {
  sphere: { tilt: 0.28, spin: 0.14, tint: null },
  typescript: { tilt: 0, spin: 0, tint: "#4a90e2" },
  react: { tilt: 0, spin: 0, tint: "#61dafb" },
  nextjs: { tilt: 0, spin: 0, tint: "#eef1ff" },
  nodejs: { tilt: 0, spin: 0, tint: "#6cc24a" },
  postgresql: { tilt: 0, spin: 0, tint: "#6b93f0" },
  docker: { tilt: 0, spin: 0, tint: "#2ea8ff" },
  flutter: { tilt: 0, spin: 0, tint: "#54c5f8" },
  galaxy: { tilt: 1.05, spin: 0.045, tint: null },
  ring: { tilt: 1.45, spin: 0.22, tint: null },
  scatter: { tilt: 0, spin: 0.02, tint: null },
};

const ICON_SHAPES: Partial<Record<ShapeId, BrandIconName>> = {
  typescript: "typescript",
  react: "react",
  nextjs: "nextjs",
  nodejs: "nodejs",
  postgresql: "postgresql",
  docker: "docker",
  flutter: "flutter",
};

const TAU = Math.PI * 2;

function sphere(n: number, radius: number) {
  const out = new Float32Array(n * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const jitter = radius * (1 + (Math.random() - 0.5) * 0.07);
    out[i * 3] = Math.cos(theta) * r * jitter;
    out[i * 3 + 1] = y * jitter;
    out[i * 3 + 2] = Math.sin(theta) * r * jitter;
  }
  return out;
}

/**
 * Desenha o path SVG do icone num canvas escondido e sorteia pontos dentro do
 * desenho. Parte dos pontos vai para a borda, para o logo ficar nitido.
 */
function iconCloud(path: string, n: number, size: number) {
  const res = 360;
  const canvas = document.createElement("canvas");
  canvas.width = res;
  canvas.height = res;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return sphere(n, 1.6);

  const pad = res * 0.05;
  const s = (res - pad * 2) / 24;
  ctx.setTransform(s, 0, 0, s, pad, pad);
  ctx.fillStyle = "#fff";
  ctx.fill(new Path2D(path));
  const { data } = ctx.getImageData(0, 0, res, res);

  const filled = (x: number, y: number) =>
    x >= 0 && y >= 0 && x < res && y < res && data[(y * res + x) * 4 + 3] > 127;

  const inside: number[] = [];
  const edge: number[] = [];
  for (let y = 0; y < res; y++) {
    for (let x = 0; x < res; x++) {
      if (!filled(x, y)) continue;
      const isEdge = !filled(x - 1, y) || !filled(x + 1, y) || !filled(x, y - 1) || !filled(x, y + 1);
      (isEdge ? edge : inside).push(x, y);
    }
  }
  if (edge.length + inside.length === 0) return sphere(n, 1.6);

  const points: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const useEdge = (Math.random() < 0.32 && edge.length > 0) || inside.length === 0;
    const pool = useEdge ? edge : inside;
    const j = Math.floor(Math.random() * (pool.length / 2)) * 2;
    const px = pool[j] + Math.random();
    const py = pool[j + 1] + Math.random();
    points.push([(px / res - 0.5) * size, (0.5 - py / res) * size, (Math.random() - 0.5) * 0.24]);
  }

  // Ordenar de cima para baixo faz o morph "escorrer" de forma coerente
  // entre formas, em vez de cada ponto cruzar a tela para um lugar aleatorio.
  points.sort((a, b) => b[1] - a[1]);
  const out = new Float32Array(n * 3);
  points.forEach((p, i) => out.set(p, i * 3));
  return out;
}

function galaxy(n: number) {
  const out = new Float32Array(n * 3);
  const arms = 3;
  const radius = 3.7;
  const spread = () => Math.pow(Math.random(), 2.6) * (Math.random() < 0.5 ? 1 : -1);
  const rows: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const r = Math.pow(Math.random(), 0.8) * radius + 0.12;
    const branch = ((i % arms) / arms) * TAU;
    const angle = branch + r * 1.15;
    const width = 0.35 + r * 0.22;
    rows.push([
      Math.cos(angle) * r + spread() * width,
      spread() * 0.28 * (1.2 - r / radius),
      Math.sin(angle) * r + spread() * width,
    ]);
  }
  // Com a galaxia inclinada, z menor fica mais alto na tela.
  rows.sort((a, b) => a[2] - b[2]);
  rows.forEach((p, i) => out.set(p, i * 3));
  return out;
}

function ring(n: number) {
  const out = new Float32Array(n * 3);
  const rows: [number, number, number][] = [];
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * TAU;
    const halo = Math.random() < 0.2;
    const R = 2.25 + (halo ? (Math.random() - 0.5) * 1.3 : (Math.random() - 0.5) * 0.08);
    const tube = halo ? 0.3 * Math.random() : 0.16 * Math.sqrt(Math.random());
    const phi = Math.random() * TAU;
    rows.push([
      (R + tube * Math.cos(phi)) * Math.cos(theta),
      tube * Math.sin(phi) * (halo ? 1.6 : 1),
      (R + tube * Math.cos(phi)) * Math.sin(theta),
    ]);
  }
  rows.sort((a, b) => a[2] - b[2]);
  rows.forEach((p, i) => out.set(p, i * 3));
  return out;
}

function scatter(n: number) {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 6.5 * Math.cbrt(Math.random());
    const theta = Math.random() * TAU;
    const phi = Math.acos(2 * Math.random() - 1);
    out[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    out[i * 3 + 1] = r * Math.cos(phi) * 0.7;
    out[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
  }
  return out;
}

export function buildShapes(count: number): Record<ShapeId, Float32Array> {
  const shapes = {
    sphere: sphere(count, 1.62),
    galaxy: galaxy(count),
    ring: ring(count),
    scatter: scatter(count),
  } as Record<ShapeId, Float32Array>;

  for (const [id, icon] of Object.entries(ICON_SHAPES) as [ShapeId, BrandIconName][]) {
    shapes[id] = iconCloud(brandIcons[icon].path, count, 3.3);
  }
  return shapes;
}
