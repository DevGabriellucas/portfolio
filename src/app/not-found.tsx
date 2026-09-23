import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { NotFoundScene } from "@/components/three/NotFoundScene";
import { buttonPrimary } from "@/components/ui/styles";

export default function NotFound() {
  return (
    <section className="flex min-h-[100svh] items-center py-32">
      <NotFoundScene />
      <div className="container-page text-center">
        <p className="font-mono text-sm text-ciano">GET 404</p>
        <h1 className="text-gradient font-display text-[clamp(6rem,24vw,15rem)] font-semibold leading-none tracking-[-0.06em]">
          404
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted">
          Essa rota não existe. As partículas se espalharam procurando por ela.
        </p>
        <Link href="/" className={`${buttonPrimary} mt-10`}>
          <ArrowLeft className="h-4 w-4" />
          Voltar ao início
        </Link>
      </div>
    </section>
  );
}
