import { Reveal } from "@/components/ui/Reveal";

// Recorte da tabela do ADR 0001 do EcoHub (estimativa para 30 mil usuarios,
// ~10 mil ativos por dia, ja com as dividas de leitura corrigidas).
const ROWS = [
  { item: "Backend / compute", firebase: "Functions Gen2 ~$10", supabase: "Pro $25 + compute", proprio: "2 servidores $60–80" },
  { item: "Banco", firebase: "Firestore ~$20", supabase: "incluso (8 GB)", proprio: "Postgres gerenciado $60–120" },
  { item: "Auth", firebase: "$0 até 50 mil MAU", supabase: "incluso", proprio: "próprio ou Clerk" },
  { item: "Crash / analytics", firebase: "Crashlytics $0", supabase: "Sentry ~$26", proprio: "~$26" },
];

export function CostTable() {
  return (
    <Reveal>
      <div className="glass overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">Comparação de custo mensal estimado entre Firebase, Supabase e backend próprio</caption>
            <thead>
              <tr className="border-b border-line font-mono text-[11px] uppercase tracking-[0.14em] text-dim">
                <th scope="col" className="px-5 py-4 font-normal">Item</th>
                <th scope="col" className="bg-verde/[0.06] px-5 py-4 font-normal text-verde">Firebase Blaze</th>
                <th scope="col" className="px-5 py-4 font-normal">Supabase Pro</th>
                <th scope="col" className="px-5 py-4 font-normal">Backend próprio</th>
              </tr>
            </thead>
            <tbody className="text-muted">
              {ROWS.map((row) => (
                <tr key={row.item} className="border-b border-line/60">
                  <th scope="row" className="px-5 py-3.5 font-normal text-fg">{row.item}</th>
                  <td className="bg-verde/[0.04] px-5 py-3.5">{row.firebase}</td>
                  <td className="px-5 py-3.5">{row.supabase}</td>
                  <td className="px-5 py-3.5">{row.proprio}</td>
                </tr>
              ))}
              <tr className="font-display text-base">
                <th scope="row" className="px-5 py-4 font-semibold text-fg">Total por mês</th>
                <td className="bg-verde/[0.08] px-5 py-4 font-semibold text-verde">~$65–90</td>
                <td className="px-5 py-4 font-semibold text-fg">~$70–150</td>
                <td className="px-5 py-4 font-semibold text-fg">~$200–400</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="border-t border-line px-5 py-4 text-sm text-dim">
          Estimativa do ADR para 30 mil usuários (~10 mil ativos por dia). No piloto de 500 usuários, o Firebase fica em
          ~$9/mês — só as lojas — contra ~$34/mês do Supabase, que cobra o plano mesmo sem uso.
        </p>
      </div>
    </Reveal>
  );
}
