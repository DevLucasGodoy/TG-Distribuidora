# CLAUDE.md

Guidance for Claude Code when working in this repo.

## What this is

Institutional website for **TG Distribuidora**, an electronic-security distributor in
Mato Grosso do Sul, Brazil (authorized Hikvision / Intelbras / Dahua reseller; units in
Dourados, Campo Grande, Ponta Porã, Três Lagoas). Marketing site — no app backend.
UI copy is **pt-BR**.

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 (strict)
- Tailwind CSS 4 via `@tailwindcss/postcss` (no `tailwind.config` — theme tokens live in `app/globals.css`)
- Motion (`motion/react`) for animation; `transpilePackages: ['motion']` in `next.config.ts`
- Leaflet + React Leaflet for the contact-page map
- lucide-react icons; Inter + Manrope fonts via `next/font`
- Contact form posts to FormSubmit (`formsubmit.co`) — there is no API route

## Commands

```bash
npm run dev      # dev server (Turbopack)
npm run build    # production build — run this to verify changes compile + prerender
npm run lint     # eslint
```

Always run `npm run build` after non-trivial changes: pages are statically prerendered,
so client-only mistakes (see gotchas) fail the build, not just runtime.

## Conventions

- Import alias `@/*` → project root (e.g. `@/components/Navbar`, `@/lib/utils`).
- `cn()` from `@/lib/utils` for className merging (clsx + tailwind-merge).
- Pages are client components (`"use client"`) because they use Motion and hooks.
- Match the existing file's Tailwind token vocabulary (`bg-surface`, `text-on-surface`,
  `text-primary`, etc.) — these are custom theme tokens, not stock Tailwind colors.
  **Todo token precisa estar declarado no bloco `@theme` de `app/globals.css`.** Sem
  `tailwind.config`, uma classe cujo token não existe é descartada em silêncio: sem erro,
  sem aviso, o estilo simplesmente não aparece. Ao inventar `bg-algo-novo`, declare
  `--color-algo-novo` antes. Para conferir se uma classe está viva:
  `grep -r "\.bg-algo-novo" .next/static --include=*.css` depois de um build.
- Page data (products, brands, units, testimonials) is hardcoded as in-file arrays. There
  is no CMS/database. Edit the array in the relevant page/component.

## Gotchas (learned the hard way)

- **`useSearchParams()` needs a `<Suspense>` boundary.** Next 16 fails the static build
  otherwise. Pattern: extract the part that reads search params into a child component and
  wrap it in `<Suspense>`. See `app/produtos/page.tsx` and `app/contato/page.tsx`.
- **Leaflet must be client-only.** `InteractiveMap` is imported with
  `dynamic(() => import(...), { ssr: false })`. Don't import Leaflet at module top level in
  a server-rendered path.
- **SWC native binding errors** (`getBindingsSync is not a function`) or a stale
  `.next` after a Next upgrade → clean reinstall: remove `node_modules` and `.next`,
  then `npm install`. `npm audit fix --force` will try to downgrade Next — do **not** run it.
- **`next-env.d.ts` churns.** Its import path flips between `.next/types` (after build) and
  `.next/dev/types` (after dev). Harmless; don't fight it.
- **Images:** `next.config.ts` allows any remote host (`hostname: '**'`). Many product/brand
  images are hotlinked external URLs.

## SEO / AEO

- `lib/seo.ts` — **fonte única** de URL, descrição, unidades (endereço, telefone,
  coordenadas), marcas e dos builders de JSON-LD. Mudou endereço/telefone/horário?
  Muda aqui e o dado estruturado acompanha.
- `app/robots.ts` → /robots.txt · `app/sitemap.ts` → /sitemap.xml (metadata routes do
  Next). **Não** crie `public/robots.txt` / `public/sitemap.xml` — o arquivo estático
  venceria a rota. Página nova? Registre em `ROUTES` no `app/sitemap.ts`.
- Nunca use `Disallow: /_next/` no robots: as páginas são client components e o
  Googlebot precisa do JS para enxergar o conteúdo.
- **Metadata por rota:** as páginas são `"use client"` e por isso não podem exportar
  `metadata`. O padrão aqui é um `layout.tsx` server component na pasta da rota
  (`app/produtos/layout.tsx` etc.) exportando `metadata` + o `<script
  type="application/ld+json">`. Copie um existente ao criar página nova.
- O layout raiz define `title.template = '%s | TG Distribuidora'`; páginas com
  identidade própria usam `title: { absolute: '...' }` (ver `app/first-class-dev`).
- JSON-LD fica no `<body>`, não em um `<head>` manual (App Router não suporta).
- **FAQ:** a lista `FAQ` em `lib/seo.ts` alimenta ao mesmo tempo o acordeão visível
  (`components/FaqSection.tsx`, em `/contato`) e o schema `FAQPage`. Nunca acrescente
  pergunta ao schema sem que ela apareça na tela — o Google penaliza. `FaqSection` usa
  import estático (não `dynamic`/`ssr: false`) e mantém as respostas montadas com altura
  colapsada, para o texto sair no HTML pré-renderizado.

## Files worth knowing

- `app/layout.tsx` — metadata, OpenGraph, fonts. `NEXT_PUBLIC_SITE_URL` overrides the base URL.
- `components/Footer.tsx` — units list + social links (Instagram/Facebook/LinkedIn/WhatsApp).
- `app/page.tsx` — home; testimonials carousel array lives here.
- `old/` — legacy PHP/CodeIgniter site, reference only. Do not edit.

## Notes

- Env vars (ambas opcionais, ambas em `.env.example`): `NEXT_PUBLIC_SITE_URL` (URL canônica,
  usada por metadata/robots/sitemap) e `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` (código do
  Google Search Console). As vars antigas de AI Studio (`GEMINI_API_KEY`, `APP_URL`) foram
  removidas — o app nunca as usou.
- Deploy target is `output: 'standalone'`.
