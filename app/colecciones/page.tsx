import { SectionHeading } from "@/components/section-heading";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ColeccionesPage() {
  let categories: { nombre: string; slug: string }[] = [];

  try {
    categories = await prisma.category.findMany({
      orderBy: { nombre: "asc" },
    });
  } catch {
    categories = [];
  }

  return (
    <main className="container space-y-12 py-12">
      <SectionHeading
        eyebrow="Colecciones"
        title="Curaduría SOLTICIA"
        description="Líneas conceptuales que reflejan calma, elegancia y sofisticación femenina."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {categories.length === 0 ? (
          <div className="rounded-[2rem] border border-foreground/5 bg-card p-10">
            <p className="text-sm text-muted-foreground">
              Aún no hay colecciones registradas. Crea categorías desde el panel
              admin.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.slug}
              className="rounded-[2rem] border border-foreground/5 bg-card p-6 shadow-subtle"
            >
              <div className="mb-6 aspect-4/5 rounded-2xl bg-linear-to-br from-[#f2ebe1] via-white to-[#efe6da]" />
              <h3 className="text-xl font-semibold">{category.nombre}</h3>
              <p className="mt-2 text-sm text-foreground/70">
                Diseño editorial inspirado en {category.nombre}.
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
