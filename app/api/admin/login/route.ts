import { NextResponse } from "next/server";

const ADMIN_COOKIE = "solticia_admin";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = String(body.username ?? "").trim();
  const password = String(body.password ?? "").trim();

  const expectedUser = process.env.ADMIN_USERNAME ?? "admin";
  const expectedPass = process.env.ADMIN_PASSWORD ?? "solticia";

  if (username !== expectedUser || password !== expectedPass) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
  });

  return response;
}
