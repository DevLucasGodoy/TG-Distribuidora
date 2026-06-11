# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Institutional website for **TG Distribuidora** (electronic security distributor in Mato Grosso do Sul, Brazil). All user-facing content is in **pt-BR**.

## Commands

```bash
npm run dev     # dev server (http://localhost:3000)
npm run build   # production build — run to verify changes compile
npm run lint    # ESLint (eslint .)
```

No test suite exists. Use `npm run build` as the correctness check.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript 5.9 · Tailwind CSS 4 · Motion (`motion/react`) · Lucide icons · Leaflet/react-leaflet.

## Architecture & conventions

- **Pages** live in `app/<route>/page.tsx`: `/` (home), `/sobre`, `/marcas`, `/produtos`, `/contato`, `/first-class-dev` (developer credits page).
- Every page is a **client component** (`'use client'`) that renders `<Navbar />` + `<main className="pt-24">…</main>` + `<Footer />`. Follow this pattern for new pages.
- Site-wide metadata/Open Graph lives in `app/layout.tsx`; client pages don't export `metadata`.
- **Design tokens** are in `app/globals.css` under `@theme` (Tailwind 4 — no `tailwind.config`). Colors: `primary` `#98001b`, `primary-container` `#be1e2d`, `secondary` `#7b5800`, `tertiary` `#094795`, `surface`/`background` `#fbf9f8`. Use the token classes (`text-primary`, `bg-surface`, `text-on-surface-variant`), not raw hex.
- **Fonts:** Manrope = `font-headline` (headings, applied globally to h1–h6), Inter = `font-body`. Loaded via `next/font` in `app/layout.tsx` with CSS vars `--font-headline` / `--font-body`.
- **Animations:** use `motion/react` (`motion.div` with `initial`/`animate`/`whileInView`), matching existing pages.
- **Import alias:** `@/*` maps to repo root (e.g. `@/components/Navbar`).
- `lib/utils.ts` exports `cn()` (clsx + tailwind-merge); `hooks/use-mobile.ts` detects mobile viewport.
- Contact data (units, phones, addresses) is duplicated in `components/Footer.tsx` and `app/contato/page.tsx` — keep them in sync when editing.

## Do not touch

- `old/` — legacy PHP site kept for content reference only.
- `node_modules/`, `next-env.d.ts` (generated).

## Branding

- TG Distribuidora logo: `public/logo.png` (light backgrounds).
- The site is developed by **First Class Dev** (firstclassdev.com.br). Footer and mobile drawer link to the internal `/first-class-dev` page; that page uses First Class Dev's own brand palette (emerald `#10b981`, dark `#0a120e`) intentionally — do not "fix" it to TG colors.
