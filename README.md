# TG Distribuidora

![TG Distribuidora](public/logo.png)

**A maior distribuidora de tecnologia em segurança eletrônica do Mato Grosso do Sul.**

Site institucional da TG Distribuidora — distribuidora autorizada Hikvision, Intelbras e Dahua, com unidades em Dourados (matriz), Campo Grande, Ponta Porã e Três Lagoas.

## Stack

| Camada | Tecnologia |
| ------ | ---------- |
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
| ------- | ---- |
| `npm run dev` | Servidor de desenvolvimento (Turbopack) |
| `npm run build` | Build de produção |
| `npm run start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm run clean` | Limpa artefatos do Next |

## Variáveis de ambiente

Copie o `.env.example` para `.env.local` — ambas as variáveis são opcionais:

```bash
# URL pública canônica (sem barra no final). Alimenta metadataBase, canonical,
# Open Graph, robots.txt e sitemap.xml. Default: https://tgdistribuidora.com.br
NEXT_PUBLIC_SITE_URL="https://tgdistribuidora.com.br"

# Código de verificação do Google Search Console (método "tag HTML" — só o
# valor do content). Vazio = nenhuma meta tag de verificação é emitida.
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=""
```

## Estrutura

```text
app/                    # Rotas (App Router)
  layout.tsx            # Layout raiz: metadata base, OpenGraph, fontes
  page.tsx              # Home (hero, depoimentos, etc.)
  globals.css           # Tailwind + tokens de tema
  robots.ts             # Metadata route → /robots.txt
  sitemap.ts            # Metadata route → /sitemap.xml (registre rotas novas em ROUTES)
  sobre/                # Institucional
  marcas/               # Marcas parceiras (filtro por categoria)
  produtos/             # Catálogo (filtro por categoria/marca via ?brand=)
  contato/              # Contato, mapa e formulário
  first-class-dev/      # Página do parceiro de desenvolvimento (server component,
                        #   exporta metadata própria)
  ^ sobre/marcas/produtos/contato têm layout.tsx (server) com metadata +
    JSON-LD, porque as page.tsx são client components
components/
  Navbar.tsx
  Footer.tsx            # Inclui links de redes sociais
  InteractiveMap.tsx    # Mapa Leaflet (carregado client-side)
  ProductModal.tsx      # Pop-up de detalhes do produto
  FaqSection.tsx        # Accordion de FAQ (alimenta o FAQPage JSON-LD)
  Motion.tsx            # Primitivas de animação compartilhadas
  FcdStandardPage.tsx   # Boilerplate da página First Class Dev
hooks/                  # use-mobile
lib/
  seo.ts                # Fonte única: URL, descrição, unidades, marcas, builders de JSON-LD
  products.ts           # Catálogo de produtos (dados hardcoded)
  utils.ts              # cn()
public/                 # logo, og-image, imagens das lojas e dos produtos
old/                    # Site legado (PHP/CodeIgniter) — apenas referência
```

Alias de import: `@/*` aponta para a raiz do projeto (ex.: `@/components/Navbar`).

## Deploy

`next.config.ts` usa `output: 'standalone'` — gera bundle autocontido em `.next/standalone` para deploy em container/Node.

## Licença

Projeto privado. © TG Distribuidora.
