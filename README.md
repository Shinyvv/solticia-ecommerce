# SOLTICIA — Ecommerce boutique premium

Aplicación web premium para la tienda conceptual SOLTICIA. Toda la conversión se realiza por WhatsApp. No incluye carrito ni pagos online.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS + shadcn/ui
- Framer Motion
- Prisma ORM + PostgreSQL

## Configuración

1. Copia el archivo de entorno y completa los valores:

```
cp .env.example .env
```

2. Instala dependencias:

```
npm install
```

3. Genera el cliente Prisma y migra la base de datos:

```
npx prisma generate
npx prisma migrate dev --name init
```

4. Levanta el entorno de desarrollo:

```
npm run dev
```

## WhatsApp

Configura el número en `NEXT_PUBLIC_WHATSAPP_NUMBER` para que todos los botones abran la conversación prellenada.

## Admin

Usa la ruta `/admin` para crear, editar, ocultar y marcar disponibilidad de productos.
