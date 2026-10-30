import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProdutoDetalhe from "@/components/loja/ProdutoDetalhe";
import { SITE_URL, breadcrumbSchema, jsonLdGraph } from "@/lib/seo";
import {
  buscarProduto,
  codDoSegmento,
  hrefProduto,
  lojaConfigurada,
  tituloProduto,
} from "@/lib/vitrine";

// Página do produto. Server component: o HTML já sai com nome, fotos e preço
// (o Google indexa o produto), e a resposta do Syncro fica guardada por
// 5 minutos no servidor (`lib/vitrine.ts`) — a mesma para todo visitante.

type Props = { params: Promise<{ produto: string }> };

async function carregar(segmento: string) {
  const cod = codDoSegmento(segmento);
  if (cod == null || !lojaConfigurada) return null;
  try {
    return await buscarProduto(cod);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dados = await carregar((await params).produto);
  if (!dados) return { title: "Produto não encontrado", robots: { index: false } };
  const p = dados.produto;
  const nome = tituloProduto(p.descricao);
  const description = `${nome}${p.marca ? ` ${p.marca}` : ""} — código ${p.codProd}. Segurança eletrônica com pronta entrega em Mato Grosso do Sul. Peça seu orçamento pelo WhatsApp.`;
  return {
    title: { absolute: `${nome} | TG Distribuidora` },
    description,
    alternates: { canonical: hrefProduto(p) },
    openGraph: {
      title: `${nome} | TG Distribuidora`,
      description,
      url: `${SITE_URL}${hrefProduto(p)}`,
      images: p.imagens.length ? [p.imagens[0]] : undefined,
    },
  };
}

export default async function ProdutoPage({ params }: Props) {
  const dados = await carregar((await params).produto);
  if (!dados) notFound();
  const { produto, formatoPreco } = dados;
  const nome = tituloProduto(produto.descricao);

  // Product sem `offers` quando o preço está desligado no Syncro: o schema não
  // pode prometer um número que a tela não mostra.
  const produtoSchema = {
    "@type": "Product",
    "@id": `${SITE_URL}${hrefProduto(produto)}#produto`,
    name: nome,
    sku: String(produto.codProd),
    ...(produto.marca ? { brand: { "@type": "Brand", name: produto.marca } } : {}),
    ...(produto.imagens.length ? { image: produto.imagens } : {}),
    ...(produto.precoAvista != null
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "BRL",
            price: produto.precoAvista.toFixed(2),
            availability:
              produto.disponibilidade === "indisponivel"
                ? "https://schema.org/OutOfStock"
                : "https://schema.org/InStock",
            url: `${SITE_URL}${hrefProduto(produto)}`,
          },
        }
      : {}),
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdGraph([
            produtoSchema,
            breadcrumbSchema([
              { name: "Produtos", path: "/produtos" },
              { name: nome, path: hrefProduto(produto) },
            ]),
          ]),
        }}
      />
      <Navbar />
      <main className="pt-24 md:pt-28 pb-24">
        <ProdutoDetalhe produto={produto} formato={formatoPreco} />
      </main>
      <Footer />
    </div>
  );
}
