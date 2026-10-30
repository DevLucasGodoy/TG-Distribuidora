import type { Metadata } from 'next';
import { SITE_URL, breadcrumbSchema, jsonLdGraph } from '@/lib/seo';

const description =
  'Catálogo TG Distribuidora: CFTV, alarmes, controle de acesso, automatização, cabos e energia. Estoque das filiais de Mato Grosso do Sul e orçamento pelo WhatsApp.';

export const metadata: Metadata = {
  title: 'Produtos de Segurança Eletrônica',
  description,
  alternates: { canonical: '/produtos' },
  openGraph: {
    title: 'Produtos de Segurança Eletrônica | TG Distribuidora',
    description,
    url: `${SITE_URL}/produtos`,
    type: 'website',
  },
};

// O catálogo vem do Syncro (lib/vitrine.ts). Cada produto tem a sua página,
// com o schema Product próprio; aqui fica só a trilha da seção.
export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([breadcrumbSchema([{ name: 'Produtos', path: '/produtos' }])]),
        }}
      />
      {children}
    </>
  );
}
