import { NextResponse, type NextRequest } from "next/server";
import { slugify } from "@/lib/slug";
import { getDemoProducts } from "@/lib/demo-products";
import type { Product } from "@/lib/types";

export async function GET() {
  const products = getDemoProducts();
  return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const nombre = String(body.nombre ?? "").trim();
  const slug = String(body.slug ?? "").trim() || slugify(nombre);

  if (!nombre || !slug) {
    return NextResponse.json(
      { error: "Nombre y slug son obligatorios" },
      { status: 400 }
    );
  }

  const categoria = String(body.categoria ?? "").trim() || "General";

  const created: Product = {
    id: `demo-${Date.now()}`,
    nombre,
    slug,
    descripcion: String(body.descripcion ?? "").trim(),
    precio: Number(body.precio ?? 0),
    categoria,
    imagenes: Array.isArray(body.imagenes) ? body.imagenes : [],
    tallas: Array.isArray(body.tallas) ? body.tallas : [],
    disponible: typeof body.disponible === "boolean" ? body.disponible : true,
    visible: typeof body.visible === "boolean" ? body.visible : true,
    destacado: typeof body.destacado === "boolean" ? body.destacado : false,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(created, { status: 201 });
}
