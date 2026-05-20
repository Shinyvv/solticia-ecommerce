import { NextResponse, type NextRequest } from "next/server";
import { slugify } from "@/lib/slug";
import { getDemoProductById } from "@/lib/demo-products";
import type { Product } from "@/lib/types";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = getDemoProductById(id);

  if (!existing) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

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

  const updated: Product = {
    ...existing,
    nombre,
    slug,
    descripcion: String(body.descripcion ?? "").trim(),
    precio: Number(body.precio ?? 0),
    categoria,
    imagenes: Array.isArray(body.imagenes) ? body.imagenes : existing.imagenes,
    tallas: Array.isArray(body.tallas) ? body.tallas : existing.tallas,
    disponible:
      typeof body.disponible === "boolean"
        ? body.disponible
        : existing.disponible,
    visible:
      typeof body.visible === "boolean" ? body.visible : existing.visible,
    destacado:
      typeof body.destacado === "boolean" ? body.destacado : existing.destacado,
  };

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const existing = getDemoProductById(id);

  if (!existing) {
    return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
  }

  return NextResponse.json({ ok: true, id });
}
