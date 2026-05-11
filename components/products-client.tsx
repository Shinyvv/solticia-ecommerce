"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const availabilityOptions = [
  { value: "all", label: "Todas" },
  { value: "available", label: "Disponibles" },
  { value: "unavailable", label: "No disponibles" },
];

export function ProductsClient({
  products,
  categories,
}: {
  products: Product[];
  categories: string[];
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return products.filter((product) => {
      if (!product.visible) return false;
      const matchesQuery = normalized
        ? `${product.nombre} ${product.descripcion} ${product.categoria}`
            .toLowerCase()
            .includes(normalized)
        : true;
      const matchesCategory =
        category === "all" ? true : product.categoria === category;
      const matchesAvailability =
        availability === "all"
          ? true
          : availability === "available"
            ? product.disponible
            : !product.disponible;

      return matchesQuery && matchesCategory && matchesAvailability;
    });
  }, [products, query, category, availability]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Input
          placeholder="Buscar por nombre o categoría"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Todas las categorías" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las categorías</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Disponibilidad" />
          </SelectTrigger>
          <SelectContent>
            {availabilityOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-foreground/5 bg-card p-10 text-center">
          <p className="text-sm text-muted-foreground">
            No hay productos para mostrar con esos filtros.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
