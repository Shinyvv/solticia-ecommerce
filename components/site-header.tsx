import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";

export async function SiteHeader() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("solticia_admin")?.value === "1";

  return (
    <header className="sticky top-0 z-40 border-b border-foreground/5 bg-background/90 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-[0.4em]">
          SOLTICIA
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link href="/productos" className="hover:text-foreground/70">
            Productos
          </Link>
          <Link href="/colecciones" className="hover:text-foreground/70">
            Colecciones
          </Link>
          {isAuthed ? (
            <Link href="/admin" className="hover:text-foreground/70">
              Admin
            </Link>
          ) : null}
        </nav>
        <nav className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] md:hidden">
          <Link href="/productos" className="hover:text-foreground/70">
            Productos
          </Link>
          <Link href="/colecciones" className="hover:text-foreground/70">
            Colecciones
          </Link>
          {isAuthed ? (
            <Link href="/admin" className="hover:text-foreground/70">
              Admin
            </Link>
          ) : null}
        </nav>
        <Button asChild size="sm" className="rounded-full">
          <a href={getWhatsAppLink("Hola! Quiero conocer SOLTICIA.")}>WhatsApp</a>
        </Button>
      </div>
    </header>
  );
}
