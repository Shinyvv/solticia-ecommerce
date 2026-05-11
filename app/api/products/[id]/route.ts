import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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
  const categorySlug = slugify(categoria);

  await prisma.category.upsert({
    where: { slug: categorySlug },
    update: { nombre: categoria },
    create: { nombre: categoria, slug: categorySlug },
  });

  const updated = await prisma.product.update({
    where: { id: params.id },
    data: {
      nombre,
      slug,
      descripcion: String(body.descripcion ?? "").trim(),
      precio: Number(body.precio ?? 0),
      categoria,
      imagenes: Array.isArray(body.imagenes) ? body.imagenes : [],
      tallas: Array.isArray(body.tallas) ? body.tallas : [],
      disponible:
        typeof body.disponible === "boolean" ? body.disponible : undefined,
      visible: typeof body.visible === "boolean" ? body.visible : undefined,
      destacado: typeof body.destacado === "boolean" ? body.destacado : undefined,
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
