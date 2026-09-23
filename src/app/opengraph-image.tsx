import { ImageResponse } from "next/og";
import { perfil } from "@/data/perfil";

// Imagem que aparece quando o link do portfolio e compartilhado (LinkedIn, WhatsApp...).

export const alt = `${perfil.nome} — ${perfil.cargo}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Esfera de pontos (a mesma ideia das particulas do site), calculada uma vez.
const DOTS = (() => {
  const count = 260;
  const golden = Math.PI * (3 - Math.sqrt(5));
  const tilt = 0.35;
  return Array.from({ length: count }, (_, i) => {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * r;
    const z = Math.sin(theta) * r;
    const yt = y * Math.cos(tilt) - z * Math.sin(tilt);
    const zt = y * Math.sin(tilt) + z * Math.cos(tilt);
    const depth = (zt + 1) / 2;
    return { x, y: yt, depth, hue: i % 7 === 0 ? "#22d3ee" : i % 2 === 0 ? "#60a5fa" : "#a78bfa" };
  }).sort((a, b) => a.depth - b.depth);
})();

export default function Image() {
  const cx = 930;
  const cy = 315;
  const radius = 205;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#05060d",
          backgroundImage:
            "radial-gradient(circle at 78% 45%, rgba(59,130,246,0.28), transparent 45%), radial-gradient(circle at 10% 100%, rgba(139,92,246,0.22), transparent 45%)",
          color: "#eef0f7",
          fontFamily: "sans-serif",
        }}
      >
        {DOTS.map((dot, i) => {
          const s = 3 + dot.depth * 5;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: cx + dot.x * radius - s / 2,
                top: cy + dot.y * radius - s / 2,
                width: s,
                height: s,
                borderRadius: 999,
                background: dot.hue,
                opacity: 0.25 + dot.depth * 0.75,
              }}
            />
          );
        })}

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", width: 800 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 18,
              border: "2px solid #8b5cf6",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            GL
          </div>
          <div style={{ display: "flex", marginTop: 36, fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {perfil.nome}
          </div>
          <div style={{ display: "flex", marginTop: 18, fontSize: 38, color: "#a78bfa" }}>{perfil.cargo}</div>
          <div style={{ display: "flex", marginTop: 26, fontSize: 23, color: "#a6aec4" }}>
            TypeScript · React · Next.js · Node.js · PostgreSQL · Docker
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: 40,
              fontSize: 22,
              color: "#34d399",
            }}
          >
            <div style={{ display: "flex", width: 12, height: 12, borderRadius: 999, background: "#34d399", marginRight: 14 }} />
            ADM4All em produção · {perfil.local}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
