import { ProductsClient } from "@/components/products-client";
import { SectionHeading } from "@/components/section-heading";
import { getDemoCategories, getVisibleDemoProducts } from "@/lib/demo-products";

export const dynamic = "force-dynamic";

export default async function ProductosPage() {
  const products = getVisibleDemoProducts();
  const categories = getDemoCategories().map((category) => category.nombre);

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
