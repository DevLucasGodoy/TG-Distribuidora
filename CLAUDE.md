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

## Files worth knowing

- `app/layout.tsx` — metadata, OpenGraph, fonts. `NEXT_PUBLIC_SITE_URL` overrides the base URL.
- `components/Footer.tsx` — units list + social links (Instagram/Facebook/LinkedIn/WhatsApp).
- `app/page.tsx` — home; testimonials carousel array lives here.
- `old/` — legacy PHP/CodeIgniter site, reference only. Do not edit.

## Notes

- `.env.example` lists legacy AI-Studio vars (`GEMINI_API_KEY`, `APP_URL`) that the app does
  **not** use. The only real env var is `NEXT_PUBLIC_SITE_URL` (optional).
- Deploy target is `output: 'standalone'`.
