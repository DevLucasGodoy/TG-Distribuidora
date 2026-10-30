"use client";

// Catálogo — a loja da TG.
//
// Desenho adaptado do Vercel Commerce (github.com/vercel/commerce, MIT):
// categorias na coluna da esquerda, grade de produtos ao lado, busca no topo
// e "lista de orçamento" no lugar do carrinho. Os dados vêm do Syncro
// (`lib/vitrine.ts`), direto do navegador: a resposta é a mesma para todo
// visitante e fica no CDN do Syncro.
//
// Estado na URL (?q, ?depto, ?secao): busca e categoria podem ser
// compartilhadas e o "voltar" do navegador funciona.

import React, { Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LayoutGrid,
  MessageCircle,
  ClipboardList,
  Tag,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal } from "@/components/Motion";
import ProdutoCard from "@/components/loja/ProdutoCard";
import { useListaOrcamento } from "@/components/loja/ListaOrcamento";
import {
  buscarCategorias,
  buscarVitrine,
  lojaConfigurada,
  type Categoria,
  type FormatoPreco,
  type ItemVitrine,
} from "@/lib/vitrine";

const POR_PAGINA = 24;

export default function ProdutosPage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />
      <main className="pt-24 md:pt-28 pb-24">
        <Suspense fallback={<GradeCarregando />}>
          <Catalogo />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}

const semAcento = (s: string) =>
  s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const numero = (v: string | null) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : undefined;
};

function Catalogo() {
  const router = useRouter();
  const params = useSearchParams();
  const q = (params.get("q") ?? "").trim();
  const depto = numero(params.get("depto"));
  const secao = numero(params.get("secao"));
  // Sem busca nem categoria, a página abre na vitrine: ofertas em cima e,
  // na grade, os mais vendidos dos últimos 90 dias.
  const inicio = !q && !depto && !secao;
  const destaque = inicio ? ("mais_vendidos" as const) : undefined;

  const [categorias, setCategorias] = React.useState<Categoria[]>([]);
  const [itens, setItens] = React.useState<ItemVitrine[]>([]);
  const [formato, setFormato] = React.useState<FormatoPreco>("um");
  const [cursor, setCursor] = React.useState<number | null>(null);
  const [estado, setEstado] = React.useState<"carregando" | "pronto" | "mais" | "erro">("carregando");
  const [erro, setErro] = React.useState<string | null>(null);
  const [menuAberto, setMenuAberto] = React.useState(false);
  const [filtroCat, setFiltroCat] = React.useState("");
  const [texto, setTexto] = React.useState(q);

  React.useEffect(() => setTexto(q), [q]);

  React.useEffect(() => {
    if (!lojaConfigurada) return;
    buscarCategorias().then(setCategorias).catch(() => setCategorias([]));
  }, []);

  React.useEffect(() => {
    if (!lojaConfigurada) {
      setEstado("erro");
      setErro("O catálogo está indisponível no momento.");
      return;
    }
    let vivo = true;
    setEstado("carregando");
    buscarVitrine({ q, depto, secao, destaque, limit: POR_PAGINA })
      .then((r) => {
        if (!vivo) return;
        setItens(r.itens);
        setFormato(r.formatoPreco);
        setCursor(r.proximoCursor);
        setEstado("pronto");
      })
      .catch((e: Error) => {
        if (!vivo) return;
        setErro(e.message);
        setEstado("erro");
      });
    return () => {
      vivo = false;
    };
  }, [q, depto, secao, destaque]);

  async function verMais() {
    if (cursor == null) return;
    setEstado("mais");
    try {
      const r = await buscarVitrine({ q, depto, secao, destaque, cursor, limit: POR_PAGINA });
      setItens((atual) => [...atual, ...r.itens]);
      setCursor(r.proximoCursor);
      setEstado("pronto");
    } catch (e) {
      setErro((e as Error).message);
      setEstado("pronto");
    }
  }

  function navegar(novo: { q?: string; depto?: number; secao?: number }) {
    const u = new URLSearchParams();
    if (novo.q) u.set("q", novo.q);
    if (novo.depto) u.set("depto", String(novo.depto));
    if (novo.secao) u.set("secao", String(novo.secao));
    const s = u.toString();
    router.push(s ? `/produtos?${s}` : "/produtos", { scroll: false });
    setMenuAberto(false);
    setFiltroCat("");
  }

  // Busca dentro do menu: departamento OU seção, sem acento e sem caixa. O
  // departamento aparece se o nome casa (com todas as seções) ou se alguma
  // seção casa (só com elas, já abertas).
  const termoCat = semAcento(filtroCat.trim());
  const categoriasVisiveis = termoCat
    ? categorias.flatMap((c) => {
        if (semAcento(c.nome).includes(termoCat)) return [{ ...c, abrir: false }];
        const secoes = c.secoes.filter((s) => semAcento(s.nome).includes(termoCat));
        return secoes.length ? [{ ...c, secoes, abrir: true }] : [];
      })
    : categorias.map((c) => ({ ...c, abrir: false }));

  const catAtual = categorias.find((c) => c.codigo === depto);
  const secAtual = catAtual?.secoes.find((s) => s.codigo === secao);
  const titulo = q
    ? `Resultados para “${q}”`
    : (secAtual?.nome ?? catAtual?.nome ?? "Mais vendidos");

  return (
    <>
      {/* Cabeçalho + busca */}
      <section className="bg-surface-container-low py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-12">
          <Reveal className="max-w-2xl">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-3 block">
              Loja TG Distribuidora
            </span>
            <h1 className="text-3xl md:text-5xl font-headline font-black tracking-tighter text-on-surface mb-3">
              Segurança eletrônica <span className="text-primary">a pronta entrega.</span>
            </h1>
            <p className="text-on-surface-variant md:text-lg">
              Câmeras, alarmes, controle de acesso e automatização das marcas em que o instalador
              confia, com estoque em Dourados, Campo Grande, Ponta Porã e Três Lagoas. Monte sua
              lista e um vendedor da sua filial responde com o orçamento pelo WhatsApp.
            </p>
          </Reveal>
          <form
            role="search"
            onSubmit={(e) => {
              e.preventDefault();
              navegar({ q: texto.trim() });
            }}
            className="relative w-full md:max-w-md group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
            <input
              type="search"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Buscar por nome ou código…"
              aria-label="Buscar produtos"
              maxLength={60}
              className="w-full pl-12 pr-12 py-4 rounded-2xl bg-white border border-neutral-100 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all [&::-webkit-search-cancel-button]:hidden"
            />
            {texto && (
              <button
                type="button"
                onClick={() => {
                  setTexto("");
                  if (q) navegar({ depto, secao });
                }}
                aria-label="Limpar busca"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full text-neutral-400 hover:text-primary"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 mt-8 md:mt-12 flex flex-col md:flex-row gap-8 lg:gap-12">
        {/* Categorias — coluna no desktop, sanfona no celular */}
        <aside className="md:w-56 lg:w-64 shrink-0">
          <button
            type="button"
            onClick={() => setMenuAberto((v) => !v)}
            aria-expanded={menuAberto}
            className="md:hidden w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white border border-neutral-200 text-sm font-bold"
          >
            <span className="flex items-center gap-2">
              <LayoutGrid className="w-4 h-4 text-primary" />
              {catAtual?.nome ?? "Categorias"}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform ${menuAberto ? "rotate-180" : ""}`} />
          </button>
          <nav
            aria-label="Categorias"
            className={`${menuAberto ? "block" : "hidden"} md:block mt-2 md:mt-0 md:sticky md:top-32 md:max-h-[calc(100vh-9rem)] md:overflow-y-auto pr-1 no-scrollbar`}
          >
            <p className="hidden md:block text-[11px] font-bold uppercase tracking-widest text-neutral-400 mb-3">
              Categorias
            </p>
            <div className="relative mb-2 md:mb-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="search"
                value={filtroCat}
                onChange={(e) => setFiltroCat(e.target.value)}
                placeholder="Buscar categoria…"
                aria-label="Buscar categoria"
                className="w-full h-10 pl-9 pr-8 rounded-lg bg-white border border-neutral-200 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none [&::-webkit-search-cancel-button]:hidden"
              />
              {filtroCat && (
                <button
                  type="button"
                  onClick={() => setFiltroCat("")}
                  aria-label="Limpar busca de categoria"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-neutral-400 hover:text-primary"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <ul className="space-y-0.5 bg-white md:bg-transparent rounded-xl md:rounded-none border md:border-0 border-neutral-200 p-2 md:p-0">
              {!termoCat && (
                <li>
                  <ItemCategoria ativo={!depto && !q} onClick={() => navegar({})}>
                    Destaques
                  </ItemCategoria>
                </li>
              )}
              {termoCat && categoriasVisiveis.length === 0 && (
                <li className="px-3 py-2 text-sm text-on-surface-variant">
                  Nenhuma categoria com “{filtroCat.trim()}”.
                </li>
              )}
              {categoriasVisiveis.map((c) => (
                <li key={c.codigo}>
                  <ItemCategoria
                    ativo={c.codigo === depto && !secao}
                    quantidade={c.quantidade}
                    onClick={() => navegar({ q, depto: c.codigo })}
                  >
                    {c.nome}
                  </ItemCategoria>
                  {(c.abrir || (c.codigo === depto && c.secoes.length > 1)) && (
                    <ul className="ml-3 pl-3 border-l border-neutral-200 my-1 space-y-0.5">
                      {c.secoes.map((s) => (
                        <li key={s.codigo}>
                          <ItemCategoria
                            pequeno
                            ativo={s.codigo === secao}
                            quantidade={s.quantidade}
                            onClick={() => navegar({ q, depto: c.codigo, secao: s.codigo })}
                          >
                            {s.nome}
                          </ItemCategoria>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Grade */}
        <section className="flex-1 min-w-0" aria-live="polite">
          {inicio && <FaixaOfertas />}
          <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
            <h2 className="text-xl font-headline font-bold text-on-surface">
              {titulo}
              {estado !== "carregando" && estado !== "erro" && (
                <span className="text-neutral-400 ml-2 font-normal text-base">
                  ({itens.length}
                  {cursor != null ? "+" : ""} {itens.length === 1 ? "item" : "itens"})
                </span>
              )}
            </h2>
            {(q || depto) && (
              <button
                type="button"
                onClick={() => navegar({})}
                className="text-xs font-bold text-neutral-500 hover:text-primary"
              >
                ✕ Limpar filtros
              </button>
            )}
          </div>

          {estado === "carregando" ? (
            <GradeCarregando />
          ) : estado === "erro" ? (
            <Aviso titulo={erro ?? "O catálogo está indisponível no momento."} />
          ) : itens.length === 0 ? (
            <Aviso
              titulo={q ? `Nada encontrado para “${q}”.` : "Nenhum produto nesta categoria."}
              texto="Tente outra palavra ou fale com um vendedor: nem todo item do estoque aparece no site."
            />
          ) : (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
                {itens.map((item, i) => (
                  <ProdutoCard key={item.codProd} item={item} formato={formato} prioridade={i < 4} />
                ))}
              </div>
              {cursor != null && (
                <div className="mt-10 flex justify-center">
                  <button
                    type="button"
                    onClick={verMais}
                    disabled={estado === "mais"}
                    className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl border border-neutral-200 bg-white font-bold text-sm text-on-surface hover:border-primary hover:text-primary transition-colors disabled:opacity-60"
                  >
                    {estado === "mais" && <Loader2 className="w-4 h-4 animate-spin" />}
                    Ver mais produtos
                  </button>
                </div>
              )}
            </>
          )}
        </section>
      </div>

      <FaixaLista />
    </>
  );
}

/**
 * Ofertas — promoção vigente no WinThor (política de desconto), fila que rola
 * de lado. Some quando não há promoção: faixa vazia não vende nada.
 */
function FaixaOfertas() {
  const [itens, setItens] = React.useState<ItemVitrine[] | null>(null);
  const [formato, setFormato] = React.useState<FormatoPreco>("um");
  const trilho = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!lojaConfigurada) return;
    buscarVitrine({ destaque: "promocao", limit: 16 })
      .then((r) => {
        setItens(r.itens);
        setFormato(r.formatoPreco);
      })
      .catch(() => setItens([]));
  }, []);

  if (!itens?.length) return null;
  const rolar = (dir: number) =>
    trilho.current?.scrollBy({ left: dir * trilho.current.clientWidth * 0.8, behavior: "smooth" });

  return (
    <div className="mb-10 md:mb-12">
      <div className="flex items-end justify-between gap-4 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-secondary font-bold tracking-[0.2em] uppercase text-[11px]">
            <Tag className="w-3.5 h-3.5" />
            Em promoção
          </span>
          <h2 className="mt-1 text-xl font-headline font-bold text-on-surface">Ofertas</h2>
        </div>
        <div className="hidden sm:flex gap-2">
          <button
            type="button"
            onClick={() => rolar(-1)}
            aria-label="Ofertas anteriores"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => rolar(1)}
            aria-label="Próximas ofertas"
            className="w-10 h-10 rounded-full border border-neutral-200 bg-white flex items-center justify-center hover:border-primary hover:text-primary"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div
        ref={trilho}
        className="-mx-5 px-5 sm:mx-0 sm:px-0 flex gap-3 sm:gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2"
      >
        {itens.map((item) => (
          <div key={item.codProd} className="snap-start shrink-0 w-[46%] sm:w-[31%] xl:w-[23.5%]">
            <ProdutoCard item={item} formato={formato} />
          </div>
        ))}
      </div>
    </div>
  );
}

function ItemCategoria({
  children,
  ativo,
  quantidade,
  pequeno = false,
  onClick,
}: {
  children: React.ReactNode;
  ativo: boolean;
  quantidade?: number;
  pequeno?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={ativo ? "page" : undefined}
      className={`w-full flex items-center justify-between gap-2 text-left rounded-lg px-3 ${pequeno ? "py-1.5 text-[13px]" : "py-2 text-sm"} transition-colors ${
        ativo
          ? "bg-primary/10 text-primary font-bold"
          : "text-on-surface-variant hover:text-primary hover:bg-white"
      }`}
    >
      <span className="truncate">{children}</span>
      {quantidade != null && (
        <span className="text-[11px] tabular-nums text-neutral-400">{quantidade}</span>
      )}
    </button>
  );
}

function GradeCarregando() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="rounded-2xl bg-white border border-neutral-100 overflow-hidden">
          <div className="aspect-square bg-neutral-100 animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-3 w-1/3 bg-neutral-100 rounded animate-pulse" />
            <div className="h-4 w-full bg-neutral-100 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-neutral-100 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Aviso({ titulo, texto }: { titulo: string; texto?: string }) {
  return (
    <div className="py-16 md:py-24 text-center max-w-md mx-auto">
      <p className="text-lg font-headline font-bold text-on-surface">{titulo}</p>
      {texto && <p className="mt-2 text-on-surface-variant">{texto}</p>}
      <Link
        href="/contato"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm"
      >
        <MessageCircle className="w-4 h-4" />
        Falar com a TG
      </Link>
    </div>
  );
}

/** Atalho fixo no rodapé do celular enquanto houver itens na lista. */
function FaixaLista() {
  const { total, abrir } = useListaOrcamento();
  if (total === 0) return null;
  return (
    // A direita fica livre para o "voltar ao topo" do rodapé.
    <div className="md:hidden fixed bottom-5 left-4 right-20 z-40">
      <button
        type="button"
        onClick={abrir}
        className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-primary text-white font-bold shadow-2xl shadow-primary/40"
      >
        <ClipboardList className="w-5 h-5" />
        Ver lista de orçamento ({total})
      </button>
    </div>
  );
}
