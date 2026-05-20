import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getDemoProductBySlug } from "@/lib/demo-products";
import { formatPrice } from "@/lib/format";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = getDemoProductBySlug(params.slug);

  if (!product) {
    return { title: "Producto no encontrado" };
  }

  return {
    title: product.nombre,
    description: product.descripcion,
    openGraph: {
      title: product.nombre,
      description: product.descripcion,
    },
  };
}

export default async function ProductoDetallePage({ params }: PageProps) {
  const product = getDemoProductBySlug(params.slug);

  if (!product) notFound();

  return (
    <main className="container grid gap-10 py-12 lg:grid-cols-2">
      <div className="space-y-4">
        <div className="relative aspect-4/5 w-full overflow-hidden rounded-[2.5rem] border border-foreground/5 bg-linear-to-br from-[#f2ebe1] via-white to-[#efe6da]">
          {!product.disponible ? (
            <Badge className="absolute left-4 top-4 border-foreground/20 bg-background/80">
              No disponible
            </Badge>
          ) : null}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(product.imagenes.length ? product.imagenes : ["1", "2", "3"]).map(
            (item: string, index: number) => (
              <div
                key={`${item}-${index}`}
                className="aspect-4/5 rounded-2xl border border-foreground/5 bg-linear-to-br from-[#f3eee7] via-white to-[#efe9dd]"
              />
            )
          )}
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Imágenes referenciales · Reemplazar con fotos reales
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            {product.categoria}
          </p>
          <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            {product.nombre}
          </h1>
          <p className="text-lg text-foreground/80">{formatPrice(product.precio)}</p>
        </div>
        <p className="text-sm text-foreground/70 md:text-base">
          {product.descripcion}
        </p>

        {product.tallas.length > 0 ? (
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Tallas disponibles
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {product.tallas.map((talla: string) => (
                <Badge key={talla} className="border-foreground/10 bg-card">
                  {talla}
                </Badge>
              ))}
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <Button asChild size="lg" className="w-full rounded-full">
            <a
              href={getWhatsAppLink(
                `Hola! Me interesa este producto: ${product.nombre}`
              )}
            >
              Consultar por WhatsApp
            </a>
          </Button>
          <p className="text-xs text-muted-foreground">
            Atención personalizada y asesoría de estilo por WhatsApp.
          </p>
        </div>
      </div>
    </main>
  );
}
