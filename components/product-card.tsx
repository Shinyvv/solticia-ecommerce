import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { getWhatsAppLink } from "@/lib/whatsapp";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group rounded-3xl border border-foreground/5 bg-card p-4 shadow-subtle transition hover:-translate-y-1">
      <div className="relative mb-4 aspect-4/5 w-full overflow-hidden rounded-2xl bg-linear-to-br from-[#f3eee7] via-white to-[#efe6da]">
        <div className="absolute inset-0 opacity-0 transition group-hover:opacity-100">
          <div className="h-full w-full bg-linear-to-tr from-black/5 to-transparent" />
        </div>
        {!product.disponible ? (
          <Badge className="absolute left-4 top-4 border-foreground/20 bg-background/80 text-foreground">
            Agotado
          </Badge>
        ) : null}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium uppercase tracking-[0.18em]">
            {product.nombre}
          </h3>
          <p className="text-sm text-foreground/70">{formatPrice(product.precio)}</p>
        </div>
        <p className="text-xs text-muted-foreground">{product.categoria}</p>
        <div className="flex flex-col gap-2 pt-2">
          <Button asChild variant="outline" className="w-full rounded-full">
            <Link href={`/productos/${product.slug}`}>Ver detalle</Link>
          </Button>
          <Button asChild className="w-full rounded-full">
            <a
              href={getWhatsAppLink(`Hola! Me interesa este producto: ${product.nombre}`)}
            >
              Consultar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
