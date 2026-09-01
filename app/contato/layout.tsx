import type { Metadata } from 'next';
import {
  SITE_URL,
  UNITS,
  breadcrumbSchema,
  faqPageSchema,
  jsonLdGraph,
  localBusinessSchemas,
} from '@/lib/seo';

const description = `Fale com a TG Distribuidora. Unidades em ${UNITS.map(
  (u) => u.city
).join(
  ', '
)}. Atendimento de segunda a sexta das 07:30 às 17:30 e sábado das 07:30 às 11:30.`;

export const metadata: Metadata = {
  title: 'Contato e Unidades',
  description,
  alternates: { canonical: '/contato' },
  openGraph: {
    title: 'Contato e Unidades | TG Distribuidora',
    description,
    url: `${SITE_URL}/contato`,
    type: 'website',
  },
};

export default function ContatoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Uma ficha ElectronicsStore por unidade — base do SEO Local
          (Google Maps / "perto de mim"). Endereços e coordenadas
          vêm de lib/seo.ts.
          O FAQPage só é válido porque as mesmas perguntas/respostas
          aparecem visíveis em <FaqSection /> nesta página. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            ...localBusinessSchemas,
            faqPageSchema,
            breadcrumbSchema([{ name: 'Contato', path: '/contato' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
