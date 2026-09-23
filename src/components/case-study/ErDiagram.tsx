"use client";

import { motion } from "motion/react";
import { useState } from "react";

// Esquema atual do ADM4All: 18 tabelas e as chaves estrangeiras entre elas
// (tirado das migrations do repositorio).

type Group = "acesso" | "pessoas" | "academico" | "gestao";

const GROUPS: Record<Group, { nome: string; cor: string; x: number }> = {
  acesso: { nome: "Acesso e segurança", cor: "#60a5fa", x: 20 },
  pessoas: { nome: "Pessoas", cor: "#a78bfa", x: 262 },
  academico: { nome: "Acadêmico", cor: "#22d3ee", x: 504 },
  gestao: { nome: "Emissão e gestão", cor: "#34d399", x: 746 },
};

const W = 204;
const H = 36;

const TABLES: { id: string; group: Group; y: number }[] = [
  { id: "perfis", group: "acesso", y: 70 },
  { id: "usuarios", group: "acesso", y: 150 },
  { id: "recuperacoes_senha", group: "acesso", y: 250 },
  { id: "ativacoes_conta", group: "acesso", y: 330 },
  { id: "cpfs_bloqueados", group: "acesso", y: 410 },
  { id: "alunos", group: "pessoas", y: 110 },
  { id: "instrutores", group: "pessoas", y: 250 },
  { id: "coordenadores", group: "pessoas", y: 390 },
  { id: "treinamentos", group: "academico", y: 70 },
  { id: "turmas", group: "academico", y: 150 },
  { id: "turma_instrutores", group: "academico", y: 230 },
  { id: "aulas", group: "academico", y: 310 },
  { id: "matriculas", group: "academico", y: 390 },
  { id: "frequencias", group: "academico", y: 470 },
  { id: "materiais", group: "gestao", y: 110 },
  { id: "certificados", group: "gestao", y: 230 },
  { id: "relatorios_gerados", group: "gestao", y: 350 },
  { id: "configuracoes_sistema", group: "gestao", y: 470 },
];

// [tabela com a chave estrangeira apontada, tabela que referencia]
const EDGES: [string, string][] = [
  ["perfis", "usuarios"],
  ["usuarios", "recuperacoes_senha"],
  ["usuarios", "ativacoes_conta"],
  ["usuarios", "cpfs_bloqueados"],
  ["usuarios", "alunos"],
  ["usuarios", "instrutores"],
  ["usuarios", "coordenadores"],
  ["treinamentos", "turmas"],
  ["coordenadores", "turmas"],
  ["turmas", "turma_instrutores"],
  ["instrutores", "turma_instrutores"],
  ["turmas", "aulas"],
  ["alunos", "matriculas"],
  ["treinamentos", "matriculas"],
  ["turmas", "matriculas"],
  ["matriculas", "frequencias"],
  ["aulas", "frequencias"],
  ["turmas", "materiais"],
  ["usuarios", "materiais"],
  ["matriculas", "certificados"],
  ["usuarios", "certificados"],
  ["usuarios", "relatorios_gerados"],
  ["usuarios", "configuracoes_sistema"],
];

const byId = Object.fromEntries(TABLES.map((t) => [t.id, t]));

function edgePath(fromId: string, toId: string) {
  const a = byId[fromId];
  const b = byId[toId];
  const ax = GROUPS[a.group].x;
  const bx = GROUPS[b.group].x;
  const ay = a.y + H / 2;
  const by = b.y + H / 2;
  if (ax === bx) {
    // Mesma coluna: curva pela esquerda, mais aberta quanto maior a distancia.
    const bend = 26 + Math.abs(by - ay) * 0.12;
    return `M ${ax} ${ay} C ${ax - bend} ${ay}, ${bx - bend} ${by}, ${bx} ${by}`;
  }
  const [x1, x2] = ax < bx ? [ax + W, bx] : [ax, bx + W];
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${ay} C ${mid} ${ay}, ${mid} ${by}, ${x2} ${by}`;
}

export function ErDiagram() {
  const [active, setActive] = useState<string | null>(null);
  const related = (id: string) =>
    active === null || id === active || EDGES.some(([a, b]) => (a === active && b === id) || (b === active && a === id));

  return (
    <figure className="glass overflow-hidden rounded-3xl">
      <div className="overflow-x-auto p-4 md:p-6">
        <svg
          viewBox="0 0 970 530"
          className="h-auto w-full min-w-[780px]"
          role="img"
          aria-label="Diagrama das 18 tabelas do ADM4All agrupadas em acesso e segurança, pessoas, acadêmico e emissão e gestão, com as chaves estrangeiras entre elas."
          onPointerLeave={() => setActive(null)}
        >
          {(Object.keys(GROUPS) as Group[]).map((key) => (
            <text key={key} x={GROUPS[key].x} y={34} className="font-mono text-[11px] uppercase tracking-[0.14em]" fill={GROUPS[key].cor}>
              {GROUPS[key].nome}
            </text>
          ))}

          {EDGES.map(([from, to], i) => {
            const on = active !== null && (from === active || to === active);
            return (
              <motion.path
                key={`${from}-${to}`}
                d={edgePath(from, to)}
                fill="none"
                stroke={on ? GROUPS[byId[from].group].cor : "rgb(148 163 184)"}
                strokeWidth={on ? 1.8 : 1}
                strokeOpacity={active === null ? 0.28 : on ? 0.95 : 0.06}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.3 + i * 0.03 }}
                style={{ transition: "stroke-opacity 0.3s, stroke-width 0.3s" }}
              />
            );
          })}

          {TABLES.map((table, i) => {
            const group = GROUPS[table.group];
            const dim = !related(table.id);
            return (
              <motion.g
                key={table.id}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.025 }}
              >
                <g
                  tabIndex={0}
                  role="button"
                  aria-label={`Tabela ${table.id}`}
                  onPointerEnter={() => setActive(table.id)}
                  onFocus={() => setActive(table.id)}
                  onBlur={() => setActive(null)}
                  onClick={() => setActive((current) => (current === table.id ? null : table.id))}
                  className="cursor-pointer outline-none"
                  style={{ opacity: dim ? 0.35 : 1, transition: "opacity 0.3s" }}
                >
                  <rect
                    x={group.x}
                    y={table.y}
                    width={W}
                    height={H}
                    rx={9}
                    fill={active === table.id ? group.cor : "#0b0e1d"}
                    fillOpacity={active === table.id ? 0.16 : 1}
                    stroke={group.cor}
                    strokeOpacity={active === table.id ? 0.9 : 0.4}
                  />
                  <circle cx={group.x + 16} cy={table.y + H / 2} r={3.5} fill={group.cor} />
                  <text x={group.x + 30} y={table.y + H / 2 + 4} className="fill-[#eef0f7] font-mono text-[12px]">
                    {table.id}
                  </text>
                </g>
              </motion.g>
            );
          })}
        </svg>
      </div>
      <figcaption className="border-t border-line px-5 py-4 text-sm text-dim md:px-6">
        Passe o mouse (ou toque) numa tabela para ver com quem ela se relaciona.
      </figcaption>
    </figure>
  );
}
