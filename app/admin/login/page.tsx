"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      setError("Credenciales inválidas.");
      setLoading(false);
      return;
    }

    router.push("/admin");
  };

  return (
    <main className="container flex min-h-[70vh] items-center justify-center py-12">
      <div className="w-full max-w-md space-y-6 rounded-[2rem] border border-foreground/5 bg-card p-8 shadow-subtle">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            SOLTICIA · Admin
          </p>
          <h1 className="text-2xl font-semibold">Iniciar sesión</h1>
          <p className="text-sm text-foreground/70">
            Acceso exclusivo para gestión de productos.
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Usuario</Label>
            <Input value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Contraseña</Label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error ? <p className="text-sm text-destructive">{error}</p> : null}

        <Button
          className="w-full rounded-full"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Validando..." : "Entrar"}
        </Button>
      </div>
    </main>
  );
}
