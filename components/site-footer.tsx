import Link from "next/link";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export async function SiteFooter() {
  const cookieStore = await cookies();
  const isAuthed = cookieStore.get("solticia_admin")?.value === "1";

  return (
    <footer className="border-t border-foreground/5 bg-background">
      <div className="container grid gap-6 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.4em] text-muted-foreground">
            SOLTICIA
          </p>
          <p className="text-sm text-foreground/70">{siteConfig.description}</p>
          <p className="text-xs text-muted-foreground">{siteConfig.location}</p>
        </div>
        <div className="space-y-2 text-sm text-foreground/70">
          <p className="uppercase tracking-[0.2em] text-muted-foreground">Explorar</p>
          <Link href="/productos" className="block hover:text-foreground">
            Productos
          </Link>
          <Link href="/colecciones" className="block hover:text-foreground">
            Colecciones
          </Link>
          {isAuthed ? (
            <Link href="/admin" className="block hover:text-foreground">
              Admin
            </Link>
          ) : null}
        </div>
        <div className="space-y-4">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Atención personalizada
          </p>
          <Button asChild className="w-full rounded-full">
            <a href={getWhatsAppLink("Hola! Quiero asesoría en SOLTICIA.")}>Consultar por WhatsApp</a>
          </Button>
        </div>
      </div>
    </footer>
  );
}
