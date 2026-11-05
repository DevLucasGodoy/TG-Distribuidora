import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProdutoDetalhe from "@/components/loja/ProdutoDetalhe";
import { SITE_URL, breadcrumbSchema, jsonLdGraph } from "@/lib/seo";
import {
  buscarProduto,
  buscarVitrine,
  type ItemVitrine,
  type ProdutoDetalhe as Produto,
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

/**
 * "Você também pode gostar": até 4 produtos da mesma seção (ou do mesmo
 * departamento, se a seção for pequena), sem o próprio produto. Falha da
 * vitrine aqui não derruba a página — a faixa só some.
 */
async function relacionados(p: Produto): Promise<ItemVitrine[]> {
  const cat = p.categoria;
  if (cat?.depto == null) return [];
  const filtros = cat.secao != null ? [{ depto: cat.depto, secao: cat.secao }, { depto: cat.depto }] : [{ depto: cat.depto }];
  const vistos = new Set([p.codProd]);
  const saida: ItemVitrine[] = [];
  for (const f of filtros) {
    try {
      const r = await buscarVitrine({ ...f, limit: 12 });
      for (const it of r.itens) {
        if (saida.length >= 4) break;
        if (vistos.has(it.codProd) || !it.imagem) continue;
        vistos.add(it.codProd);
        saida.push(it);
      }
    } catch {
      /* sem relacionados */
    }
    if (saida.length >= 4) break;
  }
  return saida;
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
  const similares = await relacionados(produto);

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
      <main className="pt-20 md:pt-24 pb-24">
        <ProdutoDetalhe produto={produto} formato={formatoPreco} relacionados={similares} />
      </main>
      <Footer />
    </div>
  );
}
