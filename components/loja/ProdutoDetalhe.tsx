"use client";

import React from "react";
import FotoProduto from "@/components/loja/FotoProduto";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Hash,
  Layers,
  MapPin,
  Maximize2,
  Package,
  Send,
  Share2,
  Tag,
  X,
} from "lucide-react";
import {
  tituloProduto,
  hrefProduto,
  precoBR,
  TEXTO_DISPONIBILIDADE,
  type FormatoPreco,
  type ItemVitrine,
  type ProdutoDetalhe as Produto,
} from "@/lib/vitrine";
import { Quantidade, useListaOrcamento } from "@/components/loja/ListaOrcamento";
import { Preco, SeloDisponibilidade } from "@/components/loja/ProdutoCard";

const nomeCategoria = (s: string | null) => (s ? tituloProduto(s) : null);

/**
 * A foto já chega do Syncro comprimida (WebP, até 1600px). Reotimizar com o
 * padrão 75 do Next comprimia de novo e borrava etiqueta e conector. Precisa
 * estar em `images.qualities` do next.config, senão o Next recusa.
 */
const FOTO_GRANDE_QUALIDADE = 90;

export default function ProdutoDetalhe({
  produto,
  formato,
  relacionados = [],
}: {
  produto: Produto;
  formato: FormatoPreco;
  relacionados?: ItemVitrine[];
}) {
  const { itens, adicionar, abrir } = useListaOrcamento();
  const [qtd, setQtd] = React.useState(1);
  const [acabouDeAdicionar, setAcabouDeAdicionar] = React.useState(false);
  const naLista = itens.find((i) => i.codProd === produto.codProd);
  const cat = produto.categoria;
  const departamento = nomeCategoria(cat?.departamento ?? null);
  const secao = nomeCategoria(cat?.secaoNome ?? null);
  // Estoque desligado no Syncro → nenhuma filial traz faixa → a seção some.
  const comEstoque = produto.filiais.some((f) => f.disponibilidade != null);

  function incluir() {
    adicionar(
      {
        codProd: produto.codProd,
        descricao: produto.descricao,
        marca: produto.marca,
        unidade: produto.unidade,
        imagem: produto.imagens[0] ?? produto.imagem,
      },
      qtd,
    );
    setAcabouDeAdicionar(true);
    setTimeout(() => setAcabouDeAdicionar(false), 2000);
  }

  const fotos = produto.imagens.length ? produto.imagens : [produto.imagem];
  const linkSecao =
    cat?.depto != null
      ? `/produtos?depto=${cat.depto}${cat.secao != null ? `&secao=${cat.secao}` : ""}`
      : "/produtos";
  const etiquetas = [
    produto.marca && { rotulo: produto.marca, icone: Tag },
    { rotulo: `Cód. ${produto.codProd}`, icone: Hash },
    produto.embalagem && { rotulo: `Embalagem ${produto.embalagem}`, icone: Package },
    (secao || departamento) && { rotulo: (secao || departamento) as string, icone: Layers },
  ].filter(Boolean) as { rotulo: string; icone: React.ElementType }[];

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-4 md:pt-6">
      {/* Desenho do product-detail-page (@kavikatiyar, 21st.dev): trilha com a
          ação à direita, foto e dados em duas colunas, dois botões de mesma
          largura, etiquetas, descrição e o quadro de quem vende no pé. */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 md:p-8">
        <div className="flex items-center justify-between gap-4 mb-6">
          <nav aria-label="Trilha" className="min-w-0 flex flex-wrap items-center text-sm text-on-surface-variant">
            <Link href="/produtos" className="hover:text-primary transition-colors">
              Produtos
            </Link>
            {departamento && cat?.depto != null && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-neutral-300" />
                <Link href={`/produtos?depto=${cat.depto}`} className="hover:text-primary transition-colors">
                  {departamento}
                </Link>
              </>
            )}
            {secao && cat?.depto != null && cat.secao != null && (
              <>
                <ChevronRight className="h-4 w-4 mx-1 text-neutral-300" />
                <Link href={linkSecao} className="hover:text-primary transition-colors">
                  {secao}
                </Link>
              </>
            )}
          </nav>
          <Compartilhar titulo={tituloProduto(produto.descricao)} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <Galeria imagens={fotos} alt={produto.descricao} />

          <div className="flex flex-col">
            {produto.emPromocao && (
              <span className="self-start mb-3 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-widest">
                Oferta{produto.promoPct ? ` −${Math.round(produto.promoPct)}%` : ""}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-on-surface">
              {tituloProduto(produto.descricao)}
            </h1>

            {/* Preço logo abaixo do nome, grande, com a nota pequena (no modelo
                é o frete; aqui é de onde sai o valor). */}
            <div className="mt-3">
              {produto.precoAvista != null ? (
                <>
                  <Preco item={produto} formato={formato} grande />
                  <p className="mt-2 text-sm text-on-surface-variant">
                    Referência da filial principal. O valor final sai no orçamento.
                  </p>
                </>
              ) : (
                <>
                  <span className="text-3xl md:text-4xl font-headline font-bold text-on-surface">
                    Preço sob consulta
                  </span>
                  <p className="mt-1 text-sm text-on-surface-variant">
                    {produto.sobConsulta
                      ? "Sem estoque na filial principal agora: o vendedor confirma prazo e preço."
                      : "O vendedor da sua filial envia o preço pelo WhatsApp."}
                  </p>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-on-surface-variant">Quantidade</span>
              <Quantidade valor={qtd} unidade={produto.unidade} onChange={setQtd} />
            </div>

            {/* Dois botões de mesma largura, como "Buy Now" / "Contact Seller". */}
            <div className="flex gap-2 mt-4 mb-6">
              <button
                type="button"
                onClick={incluir}
                aria-label={acabouDeAdicionar ? "Adicionado à lista de orçamento" : "Adicionar à lista de orçamento"}
                className="flex-1 min-w-0 h-11 px-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition-colors"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={acabouDeAdicionar ? "ok" : "add"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    {acabouDeAdicionar ? <Check className="h-5 w-5" /> : <ClipboardList className="h-5 w-5" />}
                    {acabouDeAdicionar ? "Adicionado" : "Adicionar"}
                  </motion.span>
                </AnimatePresence>
              </button>
              <button
                type="button"
                onClick={abrir}
                className="flex-1 min-w-0 h-11 px-4 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-200 bg-white text-sm font-semibold text-on-surface hover:bg-neutral-50 transition-colors"
              >
                <Send className="h-5 w-5" />
                {naLista ? `Ver lista (${naLista.qtd})` : "Pedir orçamento"}
              </button>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {etiquetas.map((t) => (
                <span
                  key={t.rotulo}
                  className="inline-flex items-center gap-2 rounded-full bg-neutral-100 text-on-surface text-sm py-1 px-3"
                >
                  <t.icone className="h-4 w-4 text-on-surface-variant" />
                  {t.rotulo}
                </span>
              ))}
            </div>

            <p className="text-on-surface-variant leading-relaxed">
              {tituloProduto(produto.descricao)}
              {produto.marca ? `, da ${produto.marca},` : ""} com nota fiscal e garantia do fabricante.
              Monte a lista com tudo o que precisa e envie de uma vez.
              <a href="#info-tecnica" className="text-primary font-medium hover:underline ml-2">
                Ver ficha técnica
              </a>
            </p>

            {comEstoque && (
              <ul className="mt-6 space-y-2">
                {produto.filiais.map((f) => (
                  <li key={f.codigo} className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2 text-on-surface">
                      <MapPin className="w-4 h-4 text-neutral-300" />
                      {f.nome}
                      {f.uf ? <span className="text-neutral-400">– {f.uf}</span> : null}
                    </span>
                    <SeloDisponibilidade valor={f.disponibilidade} />
                  </li>
                ))}
              </ul>
            )}

            {/* Quem vende: no modelo é o vendedor com nota; aqui é a TG e a
                promessa real (vendedor da filial no WhatsApp), sem nota inventada. */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <div className="flex justify-between items-center gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <span className="relative h-12 w-12 shrink-0 rounded-full border border-neutral-100 bg-white overflow-hidden">
                    <Image src="/logo.png" alt="" fill sizes="48px" className="object-contain p-1.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-on-surface">TG Distribuidora</p>
                    <p className="text-sm text-on-surface-variant">Vendedor da sua filial responde pelo WhatsApp</p>
                  </div>
                </div>
                <Link href={linkSecao} className="shrink-0 text-sm font-medium text-primary hover:underline underline-offset-4">
                  Ver mais &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* "Você também pode gostar" do modelo, dentro do mesmo cartão: foto
            quadrada que cresce no hover e leva ao produto. */}
        {relacionados.length > 0 && (
          <section aria-labelledby="relacionados" className="mt-10 md:mt-12">
            <h2 id="relacionados" className="text-2xl font-headline font-bold tracking-tight text-on-surface">
              Você também pode gostar
            </h2>
            <ul className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              {relacionados.map((r) => (
                <li key={r.codProd}>
                  <Link href={hrefProduto(r)} className="group block">
                    <span className="relative block bg-neutral-50 rounded-lg aspect-square overflow-hidden">
                      <FotoProduto
                        src={r.imagem}
                        alt={tituloProduto(r.descricao)}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-contain p-4 group-hover:scale-105"
                      />
                    </span>
                    <span className="mt-2 block text-sm font-medium text-on-surface line-clamp-2 group-hover:text-primary transition-colors">
                      {tituloProduto(r.descricao)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <InformacoesTecnicas produto={produto} departamento={departamento} secao={secao} />
      <Comparativo produto={produto} relacionados={relacionados} />
    </div>
  );
}

/**
 * Comparativo com os similares no desenho do comparison-table (Origin UI,
 * 21st.dev): tabela com fio entre todas as colunas, nome de cada produto na
 * vertical no cabeçalho, ✓/✕ coloridos e o detalhe pequeno embaixo. Só entra
 * o que a vitrine traz de todos os produtos (marca, preço, embalagem,
 * estoque, oferta): nada é preenchido no chute.
 */
function Comparativo({
  produto,
  relacionados,
}: {
  produto: Produto;
  relacionados: ItemVitrine[];
}) {
  if (relacionados.length < 2) return null;
  const colunas: ItemVitrine[] = [produto, ...relacionados];
  const comEstoque = colunas.some((c) => c.disponibilidade != null);
  const comPreco = colunas.some((c) => c.precoAvista != null);

  const Sim = ({ ok, detalhe }: { ok: boolean; detalhe?: string | null }) => (
    <>
      {ok ? (
        <Check className="inline-flex stroke-emerald-600" size={16} strokeWidth={2} aria-hidden />
      ) : (
        <X className="inline-flex stroke-red-600" size={16} strokeWidth={2} aria-hidden />
      )}
      <span className="sr-only">{ok ? "Sim" : "Não"}</span>
      {detalhe && <div className="text-xs font-medium text-on-surface-variant">{detalhe}</div>}
    </>
  );

  const linhas: { rotulo: string; celula: (c: ItemVitrine) => React.ReactNode }[] = [
    { rotulo: "Marca", celula: (c) => <span className="text-sm">{c.marca ?? "—"}</span> },
    ...(comPreco
      ? [
          {
            rotulo: "Preço à vista",
            celula: (c: ItemVitrine) => (
              <span className="text-sm font-semibold tabular-nums whitespace-nowrap">
                {c.precoAvista != null ? precoBR(c.precoAvista) : "Sob consulta"}
              </span>
            ),
          },
        ]
      : []),
    { rotulo: "Embalagem", celula: (c) => <span className="text-sm">{c.embalagem ?? c.unidade}</span> },
    ...(comEstoque
      ? [
          {
            rotulo: "Em estoque",
            celula: (c: ItemVitrine) => (
              <Sim
                ok={c.disponibilidade === "disponivel" || c.disponibilidade === "ultimas"}
                detalhe={c.disponibilidade ? TEXTO_DISPONIBILIDADE[c.disponibilidade] : null}
              />
            ),
          },
        ]
      : []),
    {
      rotulo: "Em oferta",
      celula: (c) => <Sim ok={c.emPromocao} detalhe={c.promoPct ? `−${Math.round(c.promoPct)}%` : null} />,
    },
  ];

  const fio = "*:border-neutral-200 [&>:not(:last-child)]:border-r";

  return (
    <section
      aria-labelledby="comparativo"
      className="mt-6 md:mt-8 bg-white rounded-2xl border border-neutral-100 shadow-sm p-4 md:p-8"
    >
      <h2 id="comparativo" className="text-2xl font-headline font-bold tracking-tight text-on-surface">
        Compare com similares
      </h2>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full caption-bottom text-sm bg-white">
          <thead>
            <tr className={`border-b border-neutral-200 ${fio}`}>
              <td className="p-3" />
              {colunas.map((c, n) => (
                <th
                  key={c.codProd}
                  scope="col"
                  className={`h-auto max-h-48 rotate-180 px-2 py-3 align-middle text-left font-medium [writing-mode:vertical-lr] ${
                    n === 0 ? "text-primary" : "text-on-surface"
                  }`}
                >
                  {n === 0 ? (
                    <span className="block max-h-44 truncate">{tituloProduto(c.descricao)} (este)</span>
                  ) : (
                    <Link href={hrefProduto(c)} className="block max-h-44 truncate hover:text-primary">
                      {tituloProduto(c.descricao)}
                    </Link>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {linhas.map((l) => (
              <tr key={l.rotulo} className={`border-b border-neutral-200 last:border-b-0 hover:bg-neutral-50 ${fio}`}>
                <th scope="row" className="p-3 text-left font-medium text-on-surface whitespace-nowrap">
                  {l.rotulo}
                </th>
                {colunas.map((c, n) => (
                  <td key={c.codProd} className={`p-3 space-y-1 text-center ${n === 0 ? "bg-primary/5" : ""}`}>
                    {l.celula(c)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/**
 * Descrição + ficha técnica, abaixo do quadro principal (como a aba
 * "Detalhes" de uma loja). Tudo que aparece aqui vem do cadastro do WinThor
 * pelo Syncro; linha sem dado confiável não chega a ser enviada.
 */
function InformacoesTecnicas({
  produto,
  departamento,
  secao,
}: {
  produto: Produto;
  departamento: string | null;
  secao: string | null;
}) {
  const linhas = [
    ...(produto.marca ? [{ rotulo: "Marca", valor: produto.marca }] : []),
    ...(departamento
      ? [{ rotulo: "Categoria", valor: secao && secao !== departamento ? `${departamento} › ${secao}` : departamento }]
      : []),
    ...(produto.ficha ?? []),
  ];
  const nome = tituloProduto(produto.descricao);

  return (
    <section
      aria-labelledby="info-tecnica"
      className="mt-6 md:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 bg-white rounded-3xl border border-neutral-100 p-5 sm:p-6 md:p-10"
    >
      <div className="lg:col-span-5">
        <h2 id="info-tecnica" className="text-xl md:text-2xl font-headline font-black tracking-tight text-on-surface">
          Sobre o produto
        </h2>
        <p className="mt-3 text-sm md:text-base text-on-surface-variant leading-relaxed">
          {nome}
          {produto.marca ? `, da ${produto.marca},` : ""} com nota fiscal e garantia do fabricante.
          Para instalação, compatibilidade com o seu projeto ou volume de revenda, fale com um
          vendedor: ele confere a aplicação antes de fechar o orçamento.
        </p>
      </div>
      <div className="lg:col-span-7">
        <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
          Informações técnicas
        </p>
        <dl className="divide-y divide-neutral-100 border-y border-neutral-100">
          {linhas.map((l) => (
            <div key={l.rotulo} className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4 py-3 text-sm">
              <dt className="text-on-surface-variant">{l.rotulo}</dt>
              <dd className="font-medium text-on-surface break-words">{l.valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/**
 * Compartilhar (ícone à direita da trilha, como no modelo). Celular abre o
 * menu de compartilhar do sistema; no computador copia o link.
 */
function Compartilhar({ titulo }: { titulo: string }) {
  const [copiado, setCopiado] = React.useState(false);
  async function compartilhar() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: titulo, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* cancelado pelo usuário */
    }
  }
  return (
    <button
      type="button"
      onClick={compartilhar}
      className="shrink-0 h-10 inline-flex items-center gap-2 rounded-md px-2.5 text-sm text-on-surface hover:bg-neutral-100 transition-colors"
    >
      {copiado ? <Check className="h-5 w-5 text-primary" /> : <Share2 className="h-5 w-5" />}
      <span className={copiado ? "" : "sr-only"}>{copiado ? "Link copiado" : "Compartilhar"}</span>
    </button>
  );
}

/**
 * Galeria do modelo: foto grande que desliza ao trocar e pontos embaixo. Tocar na foto abre a tela cheia, para ler
 * etiqueta, conector e acabamento.
 */
function Galeria({ imagens, alt }: { imagens: (string | null)[]; alt: string }) {
  const [i, setI] = React.useState(0);
  const [ampliada, setAmpliada] = React.useState(false);
  const total = imagens.length;
  const ir = React.useCallback((d: number) => setI((atual) => (atual + d + total) % total), [total]);
  const temFoto = !!imagens[i];

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="relative aspect-square lg:aspect-[4/5] w-full overflow-hidden rounded-xl border border-neutral-100 bg-white"
        >
          <FotoProduto
            src={imagens[i]}
            alt={total > 1 ? `${alt} — foto ${i + 1} de ${total}` : alt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={FOTO_GRANDE_QUALIDADE}
            ampliacaoMax={2}
            className="object-contain p-6"
            priority={i === 0}
          />
          {temFoto && (
            <button
              type="button"
              onClick={() => setAmpliada(true)}
              aria-label="Ampliar foto"
              className="absolute inset-0 z-10 cursor-zoom-in"
            >
              <span className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 border border-neutral-200 flex items-center justify-center text-on-surface">
                <Maximize2 className="w-4 h-4" />
              </span>
            </button>
          )}
        </motion.div>
      </AnimatePresence>
      {total > 1 && (
        <div className="flex gap-1">
          {imagens.map((_, n) => (
              // Alvo de 24px com o ponto de 8px dentro: só o ponto ficava
              // pequeno demais para o dedo.
              <button
                key={n}
                type="button"
                onClick={() => setI(n)}
                aria-label={`Ver foto ${n + 1}`}
                aria-current={n === i}
                className="group h-6 w-6 flex items-center justify-center"
              >
                <span
                  className={`h-2 w-2 rounded-full transition-colors ${
                    n === i ? "bg-primary" : "bg-neutral-300 group-hover:bg-neutral-400"
                  }`}
                />
              </button>
            ))}
        </div>
      )}
      {ampliada && (
        <FotoAmpliada imagens={imagens} i={i} alt={alt} ir={ir} fechar={() => setAmpliada(false)} />
      )}
    </div>
  );
}

/** Foto em tela cheia, fundo branco. Esc fecha; setas do teclado trocam a foto. */
function FotoAmpliada({
  imagens,
  i,
  alt,
  ir,
  fechar,
}: {
  imagens: (string | null)[];
  i: number;
  alt: string;
  ir: (d: number) => void;
  fechar: () => void;
}) {
  const total = imagens.length;
  React.useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowLeft" && total > 1) ir(-1);
      else if (e.key === "ArrowRight" && total > 1) ir(1);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", tecla);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", tecla);
    };
  }, [fechar, ir, total]);

  return (
    <div role="dialog" aria-modal="true" aria-label={alt} className="fixed inset-0 z-[100] bg-white">
      <div className="absolute inset-0 p-4 sm:p-12" onClick={fechar}>
        <div className="relative w-full h-full">
          <FotoProduto
            key={imagens[i] ?? i}
            src={imagens[i]}
            alt={total > 1 ? `${alt} — foto ${i + 1} de ${total}` : alt}
            fill
            sizes="100vw"
            quality={FOTO_GRANDE_QUALIDADE}
            ampliacaoMax={2}
            className="object-contain"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={fechar}
        aria-label="Fechar"
        autoFocus
        className="tap-target absolute top-4 right-4 w-11 h-11 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-on-surface"
      >
        <X className="w-5 h-5" />
      </button>
      {total > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center rounded-full bg-white border border-neutral-200 shadow-sm">
          <button
            type="button"
            onClick={() => ir(-1)}
            aria-label="Foto anterior"
            className="tap-target w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold tabular-nums text-neutral-400 px-1">
            {i + 1}/{total}
          </span>
          <button
            type="button"
            onClick={() => ir(1)}
            aria-label="Próxima foto"
            className="tap-target w-11 h-11 flex items-center justify-center text-on-surface hover:text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
