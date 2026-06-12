# TG Distribuidora — Site Institucional

Site institucional da **TG Distribuidora**, a maior distribuidora de tecnologia em segurança eletrônica do Mato Grosso do Sul. Distribuidora autorizada Hikvision, Intelbras e Dahua, com unidades em Dourados (matriz), Campo Grande, Ponta Porã e Três Lagoas.

🌐 **Produção:** [tgdistribuidora.com.br](https://tgdistribuidora.com.br)

---

## Stack

| Tecnologia | Versão | Uso |
| --- | --- | --- |
| [Next.js](https://nextjs.org) | 16 (App Router) | Framework React com SSR/SSG |
| [React](https://react.dev) | 19 | UI |
| [TypeScript](https://www.typescriptlang.org) | 5.9 | Tipagem estática |
| [Tailwind CSS](https://tailwindcss.com) | 4 | Estilização (tokens via `@theme`) |
| [Motion](https://motion.dev) | 12 | Animações (`motion/react`) |
| [Lucide React](https://lucide.dev) | — | Ícones |
| [Leaflet](https://leafletjs.com) + react-leaflet | — | Mapa interativo das unidades |

## Rodando localmente

**Pré-requisitos:** Node.js 20+

```bash
npm install
npm run dev
```

O site sobe em `http://localhost:3000`.

### Scripts

| Comando | Ação |
| --- | --- |
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Serve o build de produção |
| `npm run lint` | ESLint |
| `npm run clean` | Limpa artefatos do Next |

### Variáveis de ambiente

| Variável | Padrão | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | `https://tgdistribuidora.com.br` | Base para metadados/Open Graph |

## Estrutura

```text
app/
  layout.tsx            # Root layout: fontes (Inter/Manrope), metadados, Open Graph
  globals.css           # Tokens de design (@theme), cores e tipografia
  page.tsx              # Home
  sobre/page.tsx        # Sobre Nós
  marcas/page.tsx       # Marcas Parceiras
  produtos/page.tsx     # Catálogo de produtos
  contato/page.tsx      # Contato + mapa das unidades
  first-class-dev/      # Página da First Class Dev (quem desenvolveu o site)
components/
  Navbar.tsx            # Navegação fixa + drawer mobile
  Footer.tsx            # Rodapé com unidades, contatos e redes sociais
  InteractiveMap.tsx    # Mapa Leaflet das unidades
hooks/use-mobile.ts     # Detecção de viewport mobile
lib/utils.ts            # Helper cn() (clsx + tailwind-merge)
public/                 # Logo, OG image, fotos das lojas
old/                    # Site PHP legado (referência — não editar)
```

## Design

- **Cores:** primária `#98001b` (vermelho TG), secundária `#7b5800`, terciária `#094795` — definidas em [app/globals.css](app/globals.css) via `@theme`.
- **Tipografia:** [Manrope](https://fonts.google.com/specimen/Manrope) para títulos (`font-headline`), [Inter](https://fonts.google.com/specimen/Inter) para texto (`font-body`), carregadas via `next/font`.
- **Idioma:** todo o conteúdo em pt-BR.

---

## Créditos

Desenvolvido pela [**First Class Dev**](https://www.firstclassdev.com.br) — sites que transformam visitantes em clientes. Conheça a história da empresa na página [/first-class-dev](app/first-class-dev/page.tsx) deste site.
