<div align="center">
  <img src="public/logo.png" alt="TG Distribuidora" width="320" />
  <h1>TG Distribuidora</h1>
  <p><strong>A maior distribuidora de tecnologia em segurança eletrônica do Mato Grosso do Sul.</strong></p>
</div>

Site institucional da TG Distribuidora — distribuidora autorizada Hikvision, Intelbras e Dahua, com unidades em Dourados (matriz), Campo Grande, Ponta Porã e Três Lagoas.

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | [Next.js](https://nextjs.org) 16 (App Router + Turbopack) |
| UI | React 19, TypeScript 5 |
| Estilo | Tailwind CSS 4 (`@tailwindcss/postcss`) |
| Animação | [Motion](https://motion.dev) (`motion/react`) |
| Mapas | Leaflet + React Leaflet |
| Ícones | lucide-react |
| Fontes | Inter (corpo) + Manrope (títulos) via `next/font` |
| Formulário | [FormSubmit](https://formsubmit.co) (sem backend próprio) |

## Pré-requisitos

- Node.js 18.18+ (recomendado LTS)
- npm

## Rodar localmente

```bash
npm install
npm run dev
```

App em [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | Ação |
|---------|------|
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run clean` | Limpa artefatos do Next |

## Variáveis de ambiente

Crie um `.env.local` (opcional):

```bash
# URL base do site, usada em metadata/OpenGraph. Default: https://tgdistribuidora.com.br
NEXT_PUBLIC_SITE_URL="https://tgdistribuidora.com.br"
```

> O `.env.example` ainda contém variáveis legadas do scaffold do AI Studio (`GEMINI_API_KEY`, `APP_URL`) que **não são usadas** pelo app.

## Estrutura

```text
app/                 # Rotas (App Router)
  layout.tsx         # Layout raiz, metadata, fontes
  page.tsx           # Home (hero, depoimentos, etc.)
  sobre/             # Institucional
  marcas/            # Marcas parceiras (filtro por categoria)
  produtos/          # Catálogo (filtro por categoria/marca via ?brand=)
  contato/           # Contato, mapa e formulário
  globals.css        # Tailwind + tokens de tema
components/
  Navbar.tsx
  Footer.tsx         # Inclui links de redes sociais
  InteractiveMap.tsx # Mapa Leaflet (carregado client-side)
hooks/               # use-mobile
lib/                 # utils (cn)
public/              # logo, og-image, imagens das lojas
old/                 # Site legado (PHP/CodeIgniter) — apenas referência
```

Alias de import: `@/*` aponta para a raiz do projeto (ex.: `@/components/Navbar`).

## Deploy

`next.config.ts` usa `output: 'standalone'` — gera bundle autocontido em `.next/standalone` para deploy em container/Node.

## Licença

Projeto privado. © TG Distribuidora.
