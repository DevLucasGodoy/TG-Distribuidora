import type { Metadata } from 'next';
import { SITE_URL, breadcrumbSchema, jsonLdGraph } from '@/lib/seo';

const description =
  'Conheça a TG Distribuidora: história, valores e a estrutura de quatro unidades que atende integradores e instaladores de segurança eletrônica em todo o Mato Grosso do Sul.';

export const metadata: Metadata = {
  title: 'Sobre a Empresa',
  description,
  alternates: { canonical: '/sobre' },
  openGraph: {
    title: 'Sobre a TG Distribuidora',
    description,
    url: `${SITE_URL}/sobre`,
    type: 'website',
  },
};

export default function SobreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            {
              '@type': 'AboutPage',
              '@id': `${SITE_URL}/sobre#pagina`,
              name: 'Sobre a TG Distribuidora',
              description,
              url: `${SITE_URL}/sobre`,
              inLanguage: 'pt-BR',
              about: { '@id': `${SITE_URL}/#organization` },
            },
            breadcrumbSchema([{ name: 'Sobre', path: '/sobre' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
