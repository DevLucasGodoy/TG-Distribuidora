import type { Metadata } from 'next';
import { BRANDS, SITE_URL, breadcrumbSchema, jsonLdGraph } from '@/lib/seo';

const description = `Revenda autorizada de ${BRANDS.slice(0, 6).join(
  ', '
)} e outras marcas. A TG Distribuidora representa os principais fabricantes de segurança eletrônica no Mato Grosso do Sul.`;

export const metadata: Metadata = {
  title: 'Marcas Representadas',
  description,
  alternates: { canonical: '/marcas' },
  openGraph: {
    title: 'Marcas Representadas | TG Distribuidora',
    description,
    url: `${SITE_URL}/marcas`,
    type: 'website',
  },
};

const brandsSchema = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/marcas#marcas`,
  name: 'Marcas representadas pela TG Distribuidora',
  numberOfItems: BRANDS.length,
  itemListElement: BRANDS.map((brand, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: { '@type': 'Brand', name: brand },
  })),
};

export default function MarcasLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            brandsSchema,
            breadcrumbSchema([{ name: 'Marcas', path: '/marcas' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
