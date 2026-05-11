import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 text-center">
      <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
        SOLTICIA
      </p>
      <h1 className="text-3xl font-semibold">Página no encontrada</h1>
      <p className="text-sm text-foreground/70">
        La sección que buscas no está disponible en este momento.
      </p>
      <Button asChild className="rounded-full">
        <Link href="/">Volver al inicio</Link>
      </Button>
    </main>
  );
}
