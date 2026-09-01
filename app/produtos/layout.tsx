import type { Metadata } from 'next';
import { CATEGORIES, products } from '@/lib/products';
import { SITE_URL, breadcrumbSchema, jsonLdGraph } from '@/lib/seo';

const description = `Catálogo TG Distribuidora: ${CATEGORIES.join(
  ', '
)}. Produtos de segurança eletrônica das principais marcas do mercado, com pronta entrega em Mato Grosso do Sul.`;

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

// ItemList ajuda buscadores e IAs a entenderem o que o catálogo cobre.
const catalogSchema = {
  '@type': 'ItemList',
  '@id': `${SITE_URL}/produtos#catalogo`,
  name: 'Catálogo de produtos TG Distribuidora',
  numberOfItems: products.length,
  itemListElement: CATEGORIES.map((category, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: category,
    url: `${SITE_URL}/produtos`,
  })),
};

export default function ProdutosLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            catalogSchema,
            breadcrumbSchema([{ name: 'Produtos', path: '/produtos' }]),
          ]),
        }}
      />
      {children}
    </>
  );
}
