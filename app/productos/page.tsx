import { ProductsClient } from "@/components/products-client";
import { SectionHeading } from "@/components/section-heading";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  let products = [];

  try {
    products = await prisma.product.findMany({
      where: { visible: true },
      orderBy: { createdAt: "desc" },
    });
  } catch {
    products = [];
  }

  const categories = Array.from(
    new Set(products.map((product) => product.categoria).filter(Boolean))
  );

  return (
    <main className="container space-y-10 py-12">
      <SectionHeading
        eyebrow="Catálogo"
        title="Productos SOLTICIA"
        description="Explora piezas seleccionadas y consulta directamente por WhatsApp."
      />
      <ProductsClient products={products} categories={categories} />
    </main>
  );
}
