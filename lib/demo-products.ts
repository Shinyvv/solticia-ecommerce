import type { Product } from "@/lib/types";
import { slugify } from "@/lib/slug";

type DemoCategory = {
  nombre: string;
  slug: string;
};

const demoProducts: Product[] = [
  {
    id: "demo-1",
    nombre: "Vestido Aurora",
    slug: "vestido-aurora",
    descripcion:
      "Vestido fluido con caida ligera, ideal para eventos de dia y tarde.",
    precio: 48900,
    categoria: "Vestidos",
    imagenes: ["1", "2"],
    tallas: ["S", "M", "L"],
    disponible: true,
    visible: true,
    destacado: true,
    createdAt: "2026-05-01T10:00:00.000Z",
  },
  {
    id: "demo-2",
    nombre: "Blazer Lino Serena",
    slug: "blazer-lino-serena",
    descripcion:
      "Blazer de lino estructurado con botones nacarados y fit relajado.",
    precio: 55900,
    categoria: "Blazers",
    imagenes: ["1", "2", "3"],
    tallas: ["S", "M"],
    disponible: true,
    visible: true,
    destacado: true,
    createdAt: "2026-04-28T12:30:00.000Z",
  },
  {
    id: "demo-3",
    nombre: "Pantalon Horizonte",
    slug: "pantalon-horizonte",
    descripcion: "Pantalon de tiro alto con pinzas suaves y caida recta.",
    precio: 42900,
    categoria: "Pantalones",
    imagenes: ["1"],
    tallas: ["M", "L"],
    disponible: true,
    visible: true,
    destacado: false,
    createdAt: "2026-04-20T09:15:00.000Z",
  },
  {
    id: "demo-4",
    nombre: "Top Seda Editorial",
    slug: "top-seda-editorial",
    descripcion: "Top de seda con cuello drapeado y textura suave.",
    precio: 36900,
    categoria: "Tops",
    imagenes: ["1", "2"],
    tallas: ["XS", "S", "M"],
    disponible: false,
    visible: true,
    destacado: true,
    createdAt: "2026-04-16T16:45:00.000Z",
  },
  {
    id: "demo-5",
    nombre: "Falda Brisa",
    slug: "falda-brisa",
    descripcion:
      "Falda midi con movimiento y pretina elastica para mayor comodidad.",
    precio: 33900,
    categoria: "Faldas",
    imagenes: ["1", "2"],
    tallas: ["S", "M", "L"],
    disponible: true,
    visible: true,
    destacado: false,
    createdAt: "2026-04-10T08:00:00.000Z",
  },
  {
    id: "demo-6",
    nombre: "Chaqueta Tierra",
    slug: "chaqueta-tierra",
    descripcion:
      "Chaqueta ligera con textura mate, ideal para capas en clima templado.",
    precio: 59900,
    categoria: "Chaquetas",
    imagenes: ["1"],
    tallas: ["M", "L"],
    disponible: true,
    visible: true,
    destacado: true,
    createdAt: "2026-04-05T14:20:00.000Z",
  },
];

export function getDemoProducts(): Product[] {
  return demoProducts;
}

export function getVisibleDemoProducts(): Product[] {
  return demoProducts.filter((product) => product.visible);
}

export function getFeaturedDemoProducts(): Product[] {
  return demoProducts.filter((product) => product.visible && product.destacado);
}

export function getDemoProductBySlug(slug: string): Product | undefined {
  return demoProducts.find((product) => product.slug === slug);
}

export function getDemoProductById(id: string): Product | undefined {
  return demoProducts.find((product) => product.id === id);
}

export function getDemoCategories(): DemoCategory[] {
  const names = Array.from(
    new Set(demoProducts.map((product) => product.categoria).filter(Boolean))
  );

  return names.map((nombre) => ({ nombre, slug: slugify(nombre) }));
}
