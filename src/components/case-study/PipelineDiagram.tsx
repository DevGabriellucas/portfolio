"use client";

import { Check } from "lucide-react";
import { motion } from "motion/react";
import { TechIcon } from "@/components/ui/TechIcon";
import { EASE_OUT } from "@/lib/utils";

// Os tres jobs reais do .github/workflows/ci.yml do EcoHub.
const JOBS = [
  {
    nome: "Análise e testes",
    passos: ["Verificar formatação", "Análise estática (flutter analyze)", "149 testes unitários (flutter test)"],
  },
  {
    nome: "Regras de segurança do Firestore",
    passos: ["Sobe o emulador do Firestore", "24 testes de regras com Jest"],
  },
  {
    nome: "Build Android (APK)",
    passos: ["flutter build apk --release"],
    depende: "roda depois de “Análise e testes”",
  },
];

// Quantos passos vem antes de cada job: os checks acendem em sequencia.
const OFFSETS = JOBS.map((_, i) => JOBS.slice(0, i).reduce((total, job) => total + job.passos.length, 0));

function Step({ texto, delay }: { texto: string; delay: number }) {
  return (
    <motion.li
      className="flex items-start gap-2.5 text-sm text-muted"
      initial={{ opacity: 0.25 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
    >
      <motion.span
        className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-verde/15 text-verde"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay, type: "spring", stiffness: 400, damping: 18 }}
      >
        <Check className="h-3 w-3" />
      </motion.span>
      {texto}
    </motion.li>
  );
}

export function PipelineDiagram() {
  return (
    <div className="glass rounded-3xl p-5 md:p-7">
      <div className="flex items-center gap-2.5 font-mono text-xs text-muted">
        <TechIcon name="githubactions" colored className="h-4 w-4" />
        .github/workflows/ci.yml · a cada push e pull request
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {JOBS.map((job, i) => (
          <motion.div
            key={job.nome}
            className="relative rounded-2xl border border-line bg-ink/60 p-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: EASE_OUT }}
          >
            <p className="font-display text-base font-semibold tracking-tight">{job.nome}</p>
            {job.depende && <p className="mt-1 font-mono text-[11px] text-dim">{job.depende}</p>}
            <ul className="mt-4 space-y-2.5">
              {job.passos.map((passo, j) => (
                <Step key={passo} texto={passo} delay={0.4 + (OFFSETS[i] + j + 1) * 0.22} />
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
