"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/format";

const emptyForm = {
  nombre: "",
  slug: "",
  descripcion: "",
  precio: "",
  categoria: "",
  imagenes: "",
  tallas: "",
  disponible: true,
  visible: true,
  destacado: false,
};

type FormState = typeof emptyForm;

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    const res = await fetch("/api/products");
    if (!res.ok) {
      setProducts([]);
      return;
    }
    const text = await res.text();
    if (!text) {
      setProducts([]);
      return;
    }
    const data = JSON.parse(text) as Product[];
    setProducts(data);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadProducts();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    const payload = {
      ...form,
      precio: Number(form.precio || 0),
      imagenes: form.imagenes
        ? form.imagenes.split(",").map((i) => i.trim()).filter(Boolean)
        : [],
      tallas: form.tallas
        ? form.tallas.split(",").map((t) => t.trim()).filter(Boolean)
        : [],
    };

    const res = await fetch(
      editingId ? `/api/products/${editingId}` : "/api/products",
      {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      setForm(emptyForm);
      setEditingId(null);
      await loadProducts();
    }
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setForm({
      nombre: product.nombre,
      slug: product.slug,
      descripcion: product.descripcion,
      precio: String(product.precio),
      categoria: product.categoria,
      imagenes: product.imagenes.join(", "),
      tallas: product.tallas.join(", "),
      disponible: product.disponible,
      visible: product.visible,
      destacado: product.destacado,
    });
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    await fetch(`/api/products/${id}`, { method: "DELETE" });
    await loadProducts();
    setLoading(false);
  };

  return (
    <main className="container grid gap-10 py-12 lg:grid-cols-[1.1fr_1fr]">
      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Panel Admin
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Gestión de productos</h1>
          <button
            type="button"
            onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = "/";
            }}
            className="mt-3 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground"
          >
            Cerrar sesión
          </button>
        </div>

        <div className="rounded-[2rem] border border-foreground/5 bg-card p-6 shadow-subtle">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Nombre</Label>
              <Input
                value={form.nombre}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, nombre: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, slug: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Precio (CLP)</Label>
              <Input
                type="number"
                value={form.precio}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, precio: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Categoría</Label>
              <Input
                value={form.categoria}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, categoria: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <Label>Descripción</Label>
            <Textarea
              value={form.descripcion}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, descripcion: event.target.value }))
              }
            />
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Imágenes (URLs, separadas por coma)</Label>
              <Input
                value={form.imagenes}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, imagenes: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Tallas (separadas por coma)</Label>
              <Input
                value={form.tallas}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, tallas: event.target.value }))
                }
              />
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="flex items-center justify-between rounded-full border border-foreground/10 px-4 py-2">
              <Label>Disponible</Label>
              <Switch
                checked={form.disponible}
                onCheckedChange={(value) =>
                  setForm((prev) => ({ ...prev, disponible: value }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-full border border-foreground/10 px-4 py-2">
              <Label>Visible</Label>
              <Switch
                checked={form.visible}
                onCheckedChange={(value) =>
                  setForm((prev) => ({ ...prev, visible: value }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-full border border-foreground/10 px-4 py-2">
              <Label>Destacado</Label>
              <Switch
                checked={form.destacado}
                onCheckedChange={(value) =>
                  setForm((prev) => ({ ...prev, destacado: value }))
                }
              />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full"
            >
              {editingId ? "Actualizar" : "Crear producto"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="rounded-full"
            >
              Limpiar
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            Productos actuales
          </p>
          <h2 className="mt-3 text-2xl font-semibold">Listado</h2>
        </div>
        <div className="space-y-4">
          {products.length === 0 ? (
            <div className="rounded-[2rem] border border-foreground/5 bg-card p-8 text-sm text-muted-foreground">
              No hay productos todavía.
            </div>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="rounded-[2rem] border border-foreground/5 bg-card p-5 shadow-subtle"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                      {product.categoria}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold">
                      {product.nombre}
                    </h3>
                    <p className="text-sm text-foreground/70">
                      {formatPrice(product.precio)} · {product.disponible ? "Disponible" : "No disponible"}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                      className="rounded-full"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="rounded-full text-destructive"
                    >
                      Eliminar
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
