"use client";

// Lista de orçamento — o "carrinho" da loja.
//
// A TG não vende pelo site: a lista vai inteira para o WhatsApp do vendedor
// da vez na filial que o visitante escolher, e o preço final sai na conversa.
// Fica no navegador (localStorage) para sobreviver à troca de página e ao
// fechar a aba; nada é gravado em servidor até o visitante enviar.

import React from "react";
import FotoProduto from "@/components/loja/FotoProduto";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, Minus, Plus, Trash2, MessageCircle, ClipboardList, Loader2 } from "lucide-react";
import {
  ErroLoja,
  buscarFiliaisAtendimento,
  enviarOrcamento,
  hrefProduto,
  lojaConfigurada,
  tituloProduto,
  type FilialAtendimento,
} from "@/lib/vitrine";

export type ItemLista = {
  codProd: number;
  descricao: string;
  marca: string | null;
  unidade: string;
  imagem: string | null;
  qtd: number;
};

// O Syncro recusa listas maiores que isso (vira cotação, não orçamento).
export const MAX_ITENS = 50;
const QTD_MAX = 99_999;
const CHAVE_STORAGE = "tg-lista-orcamento";

type Ctx = {
  itens: ItemLista[];
  total: number;
  aberta: boolean;
  abrir: () => void;
  fechar: () => void;
  adicionar: (item: Omit<ItemLista, "qtd">, qtd?: number) => void;
  mudarQtd: (codProd: number, qtd: number) => void;
  remover: (codProd: number) => void;
  limpar: () => void;
};

const ListaContext = React.createContext<Ctx | null>(null);

export function useListaOrcamento(): Ctx {
  const ctx = React.useContext(ListaContext);
  if (!ctx) throw new Error("useListaOrcamento fora do ListaOrcamentoProvider");
  return ctx;
}

function lerStorage(): ItemLista[] {
  try {
    const bruto = JSON.parse(localStorage.getItem(CHAVE_STORAGE) ?? "[]");
    return Array.isArray(bruto)
      ? bruto.filter((i) => Number.isInteger(i?.codProd) && i.qtd > 0).slice(0, MAX_ITENS)
      : [];
  } catch {
    return [];
  }
}

const limitarQtd = (n: number) => Math.min(QTD_MAX, Math.max(1, Math.round(n)));

export function ListaOrcamentoProvider({ children }: { children: React.ReactNode }) {
  const [itens, setItens] = React.useState<ItemLista[]>([]);
  const [aberta, setAberta] = React.useState(false);
  const carregou = React.useRef(false);

  // Lê depois de montar: o HTML pré-renderizado sai com a lista vazia e não
  // diverge na hidratação.
  React.useEffect(() => {
    setItens(lerStorage());
    carregou.current = true;
  }, []);

  React.useEffect(() => {
    if (!carregou.current) return;
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
    } catch {
      // Aba anônima ou storage cheio: a lista vale só nesta página.
    }
  }, [itens]);

  const ctx = React.useMemo<Ctx>(
    () => ({
      itens,
      total: itens.length,
      aberta,
      abrir: () => setAberta(true),
      fechar: () => setAberta(false),
      adicionar: (item, qtd = 1) =>
        setItens((atual) => {
          const ja = atual.find((i) => i.codProd === item.codProd);
          if (ja) {
            return atual.map((i) =>
              i.codProd === item.codProd ? { ...i, qtd: limitarQtd(i.qtd + qtd) } : i,
            );
          }
          if (atual.length >= MAX_ITENS) return atual;
          return [...atual, { ...item, qtd: limitarQtd(qtd) }];
        }),
      mudarQtd: (codProd, qtd) =>
        setItens((atual) =>
          atual.map((i) => (i.codProd === codProd ? { ...i, qtd: limitarQtd(qtd) } : i)),
        ),
      remover: (codProd) => setItens((atual) => atual.filter((i) => i.codProd !== codProd)),
      limpar: () => setItens([]),
    }),
    [itens, aberta],
  );

  return (
    <ListaContext.Provider value={ctx}>
      {children}
      <PainelLista />
    </ListaContext.Provider>
  );
}

/** Botão da barra de navegação, com a contagem de produtos na lista. */
export function BotaoLista({ className = "" }: { className?: string }) {
  const { total, abrir } = useListaOrcamento();
  return (
    <button
      type="button"
      onClick={abrir}
      aria-label={`Abrir lista de orçamento${total ? ` (${total} ${total === 1 ? "produto" : "produtos"})` : ""}`}
      className={`tap-target relative flex items-center justify-center w-10 h-10 rounded-full text-on-surface hover:bg-primary/10 hover:text-primary transition-colors active:scale-90 ${className}`}
    >
      <ClipboardList className="w-5 h-5" />
      <AnimatePresence>
        {total > 0 && (
          <motion.span
            key={total}
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-white text-[10px] font-bold tabular-nums flex items-center justify-center"
          >
            {total}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}

function PainelLista() {
  const { itens, aberta, fechar, mudarQtd, remover, limpar } = useListaOrcamento();
  const [filiais, setFiliais] = React.useState<FilialAtendimento[] | null>(null);
  const [filial, setFilial] = React.useState<number | null>(null);
  const [enviando, setEnviando] = React.useState(false);
  const [erro, setErro] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!aberta) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && fechar();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [aberta, fechar]);

  // As filiais que atendem só são buscadas quando a lista abre pela primeira vez.
  React.useEffect(() => {
    if (!aberta || filiais || !lojaConfigurada) return;
    buscarFiliaisAtendimento()
      .then((f) => {
        setFiliais(f);
        if (f.length === 1) setFilial(f[0].codigo);
      })
      .catch(() => setFiliais([]));
  }, [aberta, filiais]);

  async function enviar() {
    if (!filial || itens.length === 0) return;
    setErro(null);
    setEnviando(true);
    // A janela abre AGORA, ainda dentro do clique: aberta depois do `await`,
    // o navegador do celular a trataria como pop-up e bloquearia.
    const janela = window.open("", "_blank");
    try {
      const url = await enviarOrcamento(
        filial,
        itens.map((i) => ({ codProd: i.codProd, qtd: i.qtd })),
      );
      if (janela) {
        janela.opener = null;
        janela.location.href = url;
      } else {
        window.location.href = url;
      }
      limpar();
      fechar();
    } catch (e) {
      janela?.close();
      setErro(
        e instanceof ErroLoja
          ? e.message
          : "Não foi possível enviar a lista. Confira sua conexão e tente de novo.",
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <AnimatePresence>
      {aberta && (
        <div className="fixed inset-0 z-[100]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={fechar}
            className="absolute inset-0 bg-neutral-950/50 backdrop-blur-sm"
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Lista de orçamento"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 32, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <header className="flex items-center justify-between px-5 sm:px-6 py-5 border-b border-neutral-100">
              <div>
                <h2 className="text-xl font-headline font-black tracking-tight text-on-surface">
                  Lista de orçamento
                </h2>
                <p className="text-xs text-on-surface-variant mt-0.5">
                  {itens.length === 0
                    ? "Nenhum produto ainda"
                    : `${itens.length} ${itens.length === 1 ? "produto" : "produtos"}`}
                </p>
              </div>
              <button
                type="button"
                onClick={fechar}
                aria-label="Fechar lista"
                className="tap-target flex items-center justify-center w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </header>

            {itens.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-8 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <ClipboardList className="w-8 h-8 text-primary" />
                </div>
                <p className="text-on-surface-variant">
                  Monte sua lista com os produtos do catálogo e envie para um vendedor pelo
                  WhatsApp.
                </p>
                <Link
                  href="/produtos"
                  onClick={fechar}
                  className="px-6 py-3 bg-primary text-white rounded-lg font-bold text-sm"
                >
                  Ver produtos
                </Link>
              </div>
            ) : (
              <ul className="flex-1 overflow-y-auto divide-y divide-neutral-100 px-5 sm:px-6">
                {itens.map((item) => (
                  <li key={item.codProd} className="flex gap-4 py-4">
                    <Link
                      href={hrefProduto(item)}
                      onClick={fechar}
                      className="relative w-20 h-20 shrink-0 rounded-xl overflow-hidden bg-neutral-50 border border-neutral-100"
                    >
                      <FotoProduto
                        src={item.imagem}
                        alt={item.descricao}
                        fill
                        sizes="80px"
                        className="object-contain p-1.5"
                      />
                    </Link>
                    <div className="flex-1 min-w-0 flex flex-col">
                      <div className="flex items-start gap-2">
                        <Link
                          href={hrefProduto(item)}
                          onClick={fechar}
                          className="flex-1 text-sm font-bold text-on-surface leading-snug line-clamp-2 hover:text-primary"
                        >
                          {tituloProduto(item.descricao)}
                        </Link>
                        <button
                          type="button"
                          onClick={() => remover(item.codProd)}
                          aria-label={`Remover ${item.descricao} da lista`}
                          className="p-1.5 -m-1 rounded-full text-neutral-400 hover:text-primary hover:bg-primary/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      {item.marca && (
                        <p className="text-[11px] uppercase tracking-wider text-neutral-400 mt-0.5">
                          {item.marca}
                        </p>
                      )}
                      <div className="mt-auto pt-2">
                        <Quantidade
                          valor={item.qtd}
                          unidade={item.unidade}
                          onChange={(n) => mudarQtd(item.codProd, n)}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {itens.length > 0 && (
              <footer className="border-t border-neutral-100 px-5 sm:px-6 py-5 space-y-4 bg-surface-container-low">
                <div>
                  <label
                    htmlFor="lista-filial"
                    className="block text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-2"
                  >
                    Atendimento pela filial
                  </label>
                  {filiais === null ? (
                    <div className="h-11 rounded-lg bg-white border border-neutral-200 animate-pulse" />
                  ) : filiais.length === 0 ? (
                    <p className="text-sm text-on-surface-variant">
                      O atendimento pelo WhatsApp está indisponível agora. Ligue para{" "}
                      <a href="tel:+556730323090" className="font-bold text-primary">
                        67 3032-3090
                      </a>
                      .
                    </p>
                  ) : (
                    <select
                      id="lista-filial"
                      value={filial ?? ""}
                      onChange={(e) => setFilial(Number(e.target.value) || null)}
                      className="w-full h-11 px-3 rounded-lg bg-white border border-neutral-200 text-sm font-medium focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    >
                      <option value="">Escolha a filial</option>
                      {filiais.map((f) => (
                        <option key={f.codigo} value={f.codigo}>
                          {f.nome}
                          {f.uf ? ` – ${f.uf}` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                {erro && (
                  <p role="alert" className="text-sm text-primary font-medium">
                    {erro}
                  </p>
                )}

                <button
                  type="button"
                  onClick={enviar}
                  disabled={!filial || enviando}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/25 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:shadow-none"
                >
                  {enviando ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <MessageCircle className="w-5 h-5" />
                  )}
                  Enviar pelo WhatsApp
                </button>
                <p className="text-[11px] text-center text-on-surface-variant">
                  Um vendedor da filial recebe a lista e responde com o orçamento.
                </p>
              </footer>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

/** Seletor de quantidade − n + (mesmo desenho na lista e na página do produto). */
export function Quantidade({
  valor,
  unidade,
  onChange,
  grande = false,
}: {
  valor: number;
  unidade?: string;
  onChange: (n: number) => void;
  grande?: boolean;
}) {
  const alt = grande ? "h-12" : "h-9";
  return (
    <div className="flex items-center gap-2">
      <div className={`inline-flex items-center rounded-full border border-neutral-200 bg-white ${alt}`}>
        <button
          type="button"
          onClick={() => onChange(valor - 1)}
          disabled={valor <= 1}
          aria-label="Diminuir quantidade"
          className={`${alt} aspect-square flex items-center justify-center rounded-full text-on-surface hover:text-primary disabled:opacity-30`}
        >
          <Minus className="w-4 h-4" />
        </button>
        <input
          type="number"
          inputMode="numeric"
          min={1}
          max={QTD_MAX}
          value={valor}
          onChange={(e) => onChange(Number(e.target.value) || 1)}
          aria-label="Quantidade"
          className="w-12 text-center bg-transparent font-bold tabular-nums outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => onChange(valor + 1)}
          aria-label="Aumentar quantidade"
          className={`${alt} aspect-square flex items-center justify-center rounded-full text-on-surface hover:text-primary`}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      {unidade && <span className="text-xs font-bold text-neutral-400">{unidade}</span>}
    </div>
  );
}
