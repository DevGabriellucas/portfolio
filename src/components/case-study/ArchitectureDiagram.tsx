"use client";

import { motion } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/hooks";

// Arquitetura do ADM4All: o que roda em cada container do Docker Compose e
// por onde passa uma requisicao. Os "pacotes" animados mostram o fluxo.

type Box = { x: number; y: number; w: number; h: number };

const BROWSER: Box = { x: 16, y: 178, w: 150, h: 84 };
const FRONT: Box = { x: 226, y: 150, w: 206, h: 140 };
const API: Box = { x: 478, y: 58, w: 282, h: 324 };
const DB: Box = { x: 806, y: 170, w: 138, h: 100 };
const ADMINER: Box = { x: 806, y: 308, w: 138, h: 54 };
const SMTP: Box = { x: 806, y: 60, w: 138, h: 60 };

const LAYERS = [
  { y: 112, nome: "infrastructure", desc: "repositórios · SMTP · PDF · storage", cor: "#22d3ee" },
  { y: 196, nome: "application", desc: "casos de uso · JWT · trava de login", cor: "#a78bfa" },
  { y: 280, nome: "domain", desc: "entidades · interfaces de repositório", cor: "#60a5fa" },
];

const FLOWS: { from: [number, number]; to: [number, number]; cor: string; delay: number }[] = [
  { from: [166, 220], to: [226, 220], cor: "#60a5fa", delay: 0 },
  { from: [432, 220], to: [478, 150], cor: "#a78bfa", delay: 0.5 },
  { from: [760, 150], to: [806, 220], cor: "#22d3ee", delay: 1 },
  { from: [760, 124], to: [806, 90], cor: "#34d399", delay: 1.6 },
  { from: [875, 308], to: [875, 270], cor: "#737c98", delay: 2.1 },
];

function Node({ box, title, subtitle, tone, delay }: { box: Box; title: string; subtitle?: string; tone: string; delay: number }) {
  return (
    <motion.g
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay }}
    >
      <rect x={box.x} y={box.y} width={box.w} height={box.h} rx={14} fill="#0b0e1d" stroke={tone} strokeOpacity={0.5} />
      <text x={box.x + 16} y={box.y + 28} className="fill-[#eef0f7] font-display text-[14px] font-semibold">
        {title}
      </text>
      {subtitle && (
        <text x={box.x + 16} y={box.y + 48} className="fill-[#a6aec4] font-mono text-[10.5px]">
          {subtitle}
        </text>
      )}
    </motion.g>
  );
}

export function ArchitectureDiagram() {
  const reduced = usePrefersReducedMotion();

  return (
    <figure className="glass overflow-hidden rounded-3xl">
      <div className="overflow-x-auto p-4 md:p-6">
        <svg
          viewBox="0 0 960 440"
          className="h-auto w-full min-w-[760px]"
          role="img"
          aria-label="Navegador acessa o Next.js, que chama a API Express organizada em infrastructure, application e domain; a API usa o PostgreSQL e envia e-mails por SMTP. Frontend, API, banco e Adminer rodam no Docker Compose."
        >
          <motion.rect
            x={200}
            y={24}
            width={752}
            height={400}
            rx={22}
            fill="none"
            stroke="#2496ED"
            strokeOpacity={0.45}
            strokeDasharray="6 7"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6 }}
          />
          <text x={218} y={50} className="fill-[#2ea8ff] font-mono text-[11px]">
            docker compose
          </text>

          <Node box={BROWSER} title="Navegador" subtitle="3 perfis de usuário" tone="#60a5fa" delay={0} />
          <Node box={FRONT} title="Next.js 16 · React 19" subtitle="telas dos três perfis" tone="#eef0f7" delay={0.1} />
          <text x={FRONT.x + 16} y={FRONT.y + 76} className="fill-[#a6aec4] font-mono text-[10.5px]">
            rota /api/auth/login
          </text>
          <text x={FRONT.x + 16} y={FRONT.y + 94} className="fill-[#a6aec4] font-mono text-[10.5px]">
            roda no servidor e grava
          </text>
          <text x={FRONT.x + 16} y={FRONT.y + 112} className="fill-[#a6aec4] font-mono text-[10.5px]">
            a sessão em cookie httpOnly
          </text>

          <Node box={API} title="API Express · 96 endpoints" tone="#a78bfa" delay={0.2} />
          {LAYERS.map((layer, i) => (
            <motion.g
              key={layer.nome}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 + i * 0.15 }}
            >
              <rect x={API.x + 16} y={layer.y} width={API.w - 32} height={64} rx={10} fill={layer.cor} fillOpacity={0.07} stroke={layer.cor} strokeOpacity={0.35} />
              <text x={API.x + 30} y={layer.y + 27} className="font-mono text-[12px] font-semibold" fill={layer.cor}>
                {layer.nome}
              </text>
              <text x={API.x + 30} y={layer.y + 46} className="fill-[#a6aec4] font-mono text-[10px]">
                {layer.desc}
              </text>
            </motion.g>
          ))}
          {/* Dependencias apontam para dentro: infrastructure -> application -> domain. */}
          {[176, 260].map((y) => (
            <path key={y} d={`M ${API.x + API.w - 40} ${y} v 20`} stroke="#737c98" strokeWidth={1.2} markerEnd="url(#seta)" />
          ))}

          <motion.g initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.35 }}>
            <ellipse cx={DB.x + DB.w / 2} cy={DB.y + 12} rx={DB.w / 2} ry={12} fill="#0b0e1d" stroke="#6b93f0" strokeOpacity={0.6} />
            <path
              d={`M ${DB.x} ${DB.y + 12} v ${DB.h - 24} a ${DB.w / 2} 12 0 0 0 ${DB.w} 0 v -${DB.h - 24}`}
              fill="#0b0e1d"
              stroke="#6b93f0"
              strokeOpacity={0.6}
            />
            <ellipse cx={DB.x + DB.w / 2} cy={DB.y + 12} rx={DB.w / 2} ry={12} fill="#131735" stroke="#6b93f0" strokeOpacity={0.6} />
            <text x={DB.x + DB.w / 2} y={DB.y + 52} textAnchor="middle" className="fill-[#eef0f7] font-display text-[13px] font-semibold">
              PostgreSQL 16
            </text>
            <text x={DB.x + DB.w / 2} y={DB.y + 70} textAnchor="middle" className="fill-[#a6aec4] font-mono text-[10.5px]">
              18 tabelas
            </text>
          </motion.g>

          <Node box={ADMINER} title="Adminer" tone="#737c98" delay={0.4} />
          <Node box={SMTP} title="SMTP" subtitle="e-mails de senha" tone="#34d399" delay={0.45} />

          <defs>
            <marker id="seta" viewBox="0 0 10 10" refX={8} refY={5} markerWidth={7} markerHeight={7} orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#737c98" />
            </marker>
          </defs>

          {FLOWS.map((flow, i) => (
            <g key={i}>
              <line
                x1={flow.from[0]}
                y1={flow.from[1]}
                x2={flow.to[0]}
                y2={flow.to[1]}
                stroke="rgb(148 163 184 / 0.35)"
                strokeDasharray="3 4"
              />
              {!reduced && (
                <motion.circle
                  r={3.4}
                  fill={flow.cor}
                  initial={{ cx: flow.from[0], cy: flow.from[1], opacity: 0 }}
                  animate={{
                    cx: [flow.from[0], flow.to[0]],
                    cy: [flow.from[1], flow.to[1]],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ duration: 1.2, delay: flow.delay, repeat: Infinity, repeatDelay: 1.6, ease: "easeInOut" }}
                />
              )}
            </g>
          ))}
        </svg>
      </div>
      <figcaption className="border-t border-line px-5 py-4 text-sm text-dim md:px-6">
        Tudo sobe com <span className="font-mono text-muted">docker compose up</span>: banco, Adminer, API e front-end.
        No celular, arraste o diagrama para o lado.
      </figcaption>
    </figure>
  );
}
