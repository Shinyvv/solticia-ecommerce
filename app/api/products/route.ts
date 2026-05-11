import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(products);
}

export async function POST(request: Request) {
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

  const created = await prisma.product.create({
    data: {
      nombre,
      slug,
      descripcion: String(body.descripcion ?? "").trim(),
      precio: Number(body.precio ?? 0),
      categoria,
      imagenes: Array.isArray(body.imagenes) ? body.imagenes : [],
      tallas: Array.isArray(body.tallas) ? body.tallas : [],
      disponible:
        typeof body.disponible === "boolean" ? body.disponible : true,
      visible: typeof body.visible === "boolean" ? body.visible : true,
      destacado: typeof body.destacado === "boolean" ? body.destacado : false,
    },
  });

  return NextResponse.json(created, { status: 201 });
}
