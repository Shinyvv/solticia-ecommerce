import Link from "next/link";
import { FadeIn, Stagger } from "@/components/motion";
import { LookbookGrid } from "@/components/lookbook-grid";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppCta } from "@/components/whatsapp-cta";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink } from "@/lib/whatsapp";
import { getFeaturedDemoProducts } from "@/lib/demo-products";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featured = getFeaturedDemoProducts();

  return (
    <main className="bg-background">
      <section className="container grid gap-10 py-12 md:grid-cols-2 md:items-center">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            SOLTICIA · Boutique editorial
          </p>
          <h1 className="mt-6 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
            Diseño local y del mundo.
          </h1>
          <p className="mt-5 text-sm text-foreground/70 md:text-base">
            Prendas seleccionadas con sensibilidad artística, estilo minimalista y
            una experiencia boutique premium en Talagante.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full">
              <Link href="/productos">Explorar colección</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full">
              <a href={getWhatsAppLink("Hola! Quiero conocer la colección SOLTICIA.")}
                >Consultar por WhatsApp</a>
            </Button>
          </div>
        </FadeIn>
        <FadeIn>
          <div className="aspect-4/5 rounded-[2.5rem] border border-foreground/5 bg-linear-to-br from-[#f2ebe1] via-white to-[#efe6da] shadow-subtle" />
        </FadeIn>
      </section>

      <section className="container py-12">
        <SectionHeading
          eyebrow="Selección editorial"
          title="Nuevas colecciones"
          description="Looks destacados para una mujer sofisticada, minimalista y contemporánea."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {[
            "Cápsula Tierra",
            "Líneas Serenas",
            "Seda Editorial",
          ].map((title) => (
            <FadeIn key={title}>
              <div className="rounded-[2rem] border border-foreground/5 bg-card p-6 shadow-subtle">
                <div className="mb-6 aspect-4/5 rounded-2xl bg-linear-to-br from-[#f3eee7] via-white to-[#efe9dd]" />
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-foreground/70">
                  Diseños con textura, calma y movimiento.
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <SectionHeading
          eyebrow="Prendas seleccionadas"
          title="Productos destacados"
          description="Cada pieza es curada para transmitir elegancia natural y espíritu editorial."
        />
        <div className="mt-10">
          {featured.length === 0 ? (
            <div className="rounded-[2rem] border border-foreground/5 bg-card p-10 text-center">
              <p className="text-sm text-muted-foreground">
                Aún no hay productos destacados. Agrega productos en el panel
                admin y márcalos como destacados.
              </p>
            </div>
          ) : (
            <Stagger>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featured.map((product) => (
                  <FadeIn key={product.id}>
                    <ProductCard product={product} />
                  </FadeIn>
                ))}
              </div>
            </Stagger>
          )}
        </div>
      </section>

      <section className="container py-12">
        <SectionHeading
          eyebrow="Lookbook"
          title="Editorial & lifestyle"
          description="Inspiración visual tipo Pinterest para conectar con la estética SOLTICIA."
        />
        <div className="mt-10">
          <LookbookGrid />
        </div>
      </section>

      <section className="container py-12">
        <WhatsAppCta />
      </section>
    </main>
  );
}
