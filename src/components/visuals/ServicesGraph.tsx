"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Node = { id: string; x: number; y: number; label: string; tone: string };

const NODES: Node[] = [
  { id: "gw", x: 70, y: 120, label: "gateway HTTP", tone: "#60a5fa" },
  { id: "m1", x: 232, y: 44, label: "matrículas", tone: "#a78bfa" },
  { id: "m2", x: 232, y: 96, label: "turmas", tone: "#a78bfa" },
  { id: "m3", x: 232, y: 148, label: "cursos", tone: "#a78bfa" },
  { id: "m4", x: 232, y: 200, label: "+ 6 serviços", tone: "#737c98" },
  { id: "redis", x: 70, y: 214, label: "Redis", tone: "#ff4438" },
  { id: "mq", x: 352, y: 72, label: "RabbitMQ", tone: "#ff6600" },
  { id: "notif", x: 352, y: 176, label: "notificações", tone: "#34d399" },
];

const EDGES: [string, string][] = [
  ["gw", "m1"],
  ["gw", "m2"],
  ["gw", "m3"],
  ["gw", "m4"],
  ["gw", "redis"],
  ["m1", "mq"],
  ["mq", "notif"],
];

const byId = Object.fromEntries(NODES.map((node) => [node.id, node]));

/** Mapa do backend do Gestor Acadêmico, com "pacotes" correndo pelas conexões. */
export function ServicesGraph() {
  const reduced = usePrefersReducedMotion();

  return (
    <svg viewBox="0 0 420 250" className="h-auto w-full" role="img" aria-label="Gateway HTTP ligado por TCP aos microsserviços, com cache Redis e eventos no RabbitMQ">
      {EDGES.map(([from, to], i) => {
        const a = byId[from];
        const b = byId[to];
        return (
          <g key={`${from}-${to}`}>
            <motion.line
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="rgb(148 163 184 / 0.28)"
              strokeWidth={1}
              strokeDasharray="3 4"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 + i * 0.1 }}
            />
            {!reduced && (
              <motion.circle
                r={2.6}
                fill={b.tone}
                initial={{ cx: a.x, cy: a.y, opacity: 0 }}
                animate={{ cx: [a.x, b.x], cy: [a.y, b.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.8, delay: i * 0.45, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
              />
            )}
          </g>
        );
      })}
      {NODES.map((node) => (
        <g key={node.id}>
          <circle cx={node.x} cy={node.y} r={17} fill="#0b0e1d" stroke={node.tone} strokeOpacity={0.55} />
          <circle cx={node.x} cy={node.y} r={4} fill={node.tone} />
          <text
            x={node.x}
            y={node.y + 31}
            textAnchor="middle"
            className="fill-[#a6aec4] font-mono text-[10px]"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
