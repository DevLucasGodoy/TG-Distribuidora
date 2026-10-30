// ====================================================================
// LOJA — cliente da vitrine do Syncro
// ====================================================================
// O catálogo da loja (/produtos) não mora neste repositório: vem do Syncro,
// que lê o WinThor da TG. Este arquivo é a única porta para ele.
//
//   GET  /api/publico/vitrine     listagem, busca (?q), categoria (?depto,
//                                 ?secao) e página do produto (?produto)
//   GET  /api/publico/categorias  menu de departamentos e seções
//   GET  /api/publico/widget      filiais que têm vendedor no WhatsApp
//   POST /api/publico/widget      lista de orçamento → link do WhatsApp do
//                                 vendedor da vez naquela filial
//
// A chave (`NEXT_PUBLIC_SYNCRO_CHAVE`) é pública por desenho: vai no HTML de
// qualquer jeito, e o Syncro só a aceita vinda do domínio cadastrado para ela.
// Quem cadastra o site e gera a chave é o Syncro, em Vitrine › Configurações ›
// Sites.
//
// Sem as duas variáveis a loja mostra "catálogo indisponível" em vez de
// quebrar o build — o resto do site não depende dela.
// ====================================================================

export const SYNCRO_URL = (process.env.NEXT_PUBLIC_SYNCRO_URL ?? "").replace(/\/+$/, "");
export const SYNCRO_CHAVE = process.env.NEXT_PUBLIC_SYNCRO_CHAVE ?? "";
export const lojaConfigurada = Boolean(SYNCRO_URL && SYNCRO_CHAVE);

/** Faixa de estoque. O número exato nunca sai do Syncro. */
export type Disponibilidade = "disponivel" | "ultimas" | "indisponivel" | null;

/** Como desenhar o preço — decisão comercial, muda no Syncro sem deploy. */
export type FormatoPreco = "um" | "um_com_prazo" | "dois";

export type ItemVitrine = {
  codProd: number;
  descricao: string;
  marca: string | null;
  unidade: string;
  embalagem: string | null;
  imagem: string | null;
  /** `null` quando o Syncro está configurado para não mostrar preço. */
  precoAvista: number | null;
  /**
   * Preço a prazo. É ACRÉSCIMO financeiro sobre o à vista, não desconto:
   * nunca riscar, nunca escrever "de/por".
   */
  precoPrazo: number | null;
  rotuloAvista: string | null;
  rotuloPrazo: string | null;
  emPromocao: boolean;
  promoPct: number | null;
  promoAte: string | null;
  disponibilidade: Disponibilidade;
  /**
   * Sem saldo na filial. Só vem em busca, categoria e página do produto. Os
   * preços chegam `null`: quem passa o preço é o vendedor.
   */
  sobConsulta?: boolean;
};

export type FilialEstoque = {
  codigo: number;
  nome: string;
  uf: string | null;
  disponibilidade: Disponibilidade;
};

export type ProdutoDetalhe = ItemVitrine & {
  imagens: string[];
  categoria: {
    depto: number | null;
    departamento: string | null;
    secao: number | null;
    secaoNome: string | null;
  } | null;
  filiais: FilialEstoque[];
  /**
   * Ficha técnica do cadastro (referência do fabricante, EAN, NCM, embalagem,
   * peso e medidas). O Syncro só manda o que é dado de verdade — campo com
   * preenchimento padrão do cadastro fica de fora —, então a lista pode vir curta.
   */
  ficha?: { rotulo: string; valor: string }[];
};

export type RespostaVitrine = {
  ok: true;
  filial: { codigo: number; padrao: boolean };
  formatoPreco: FormatoPreco;
  itens: ItemVitrine[];
  proximoCursor: number | null;
  produto?: ProdutoDetalhe;
};

export type Secao = { codigo: number; nome: string; quantidade: number };
export type Categoria = Secao & { secoes: Secao[] };

export type FilialAtendimento = { codigo: number; nome: string; uf: string | null };

export type FiltroVitrine = {
  q?: string;
  depto?: number;
  secao?: number;
  /** Faixas da página inicial. Ignorado quando há busca ou categoria. */
  destaque?: "promocao" | "mais_vendidos";
  cursor?: number;
  limit?: number;
};

function urlApi(caminho: string, params: Record<string, string | number | undefined> = {}) {
  const u = new URL(`${SYNCRO_URL}/api/publico/${caminho}`);
  // A chave vai na URL (e não num header) porque o CDN do Syncro guarda a
  // resposta por URL: assim cada site tem o seu cache.
  u.searchParams.set("chave", SYNCRO_CHAVE);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") u.searchParams.set(k, String(v));
  }
  return u.toString();
}

/** Erro com a frase que o Syncro mandou — ela já diz ao visitante o que fazer. */
export class ErroLoja extends Error {
  constructor(message: string, readonly status: number) {
    super(message);
  }
}

async function lerJson<T>(r: Response): Promise<T> {
  const corpo = await r.json().catch(() => null);
  if (!r.ok || !corpo?.ok) {
    throw new ErroLoja(
      corpo?.message ?? "Não foi possível carregar o catálogo. Tente de novo em instantes.",
      r.status,
    );
  }
  return corpo as T;
}

// No servidor, guarda a resposta por alguns minutos: a página do produto é
// a mesma para todo visitante, e o Syncro só precisa ser consultado de vez em
// quando. No navegador, o cache é o do CDN do próprio Syncro.
const CACHE_SERVIDOR = { next: { revalidate: 300 } } as RequestInit;

export async function buscarVitrine(filtro: FiltroVitrine = {}): Promise<RespostaVitrine> {
  const r = await fetch(urlApi("vitrine", filtro), CACHE_SERVIDOR);
  return lerJson<RespostaVitrine>(r);
}

/** Página do produto. `null` quando o produto não está (mais) na vitrine. */
export async function buscarProduto(
  codProd: number,
): Promise<{ produto: ProdutoDetalhe; formatoPreco: FormatoPreco } | null> {
  const r = await fetch(urlApi("vitrine", { produto: codProd }), CACHE_SERVIDOR);
  if (r.status === 404) return null;
  const corpo = await lerJson<RespostaVitrine>(r);
  return corpo.produto ? { produto: corpo.produto, formatoPreco: corpo.formatoPreco } : null;
}

export async function buscarCategorias(): Promise<Categoria[]> {
  const r = await fetch(urlApi("categorias"), CACHE_SERVIDOR);
  return (await lerJson<{ categorias: Categoria[] }>(r)).categorias;
}

export async function buscarFiliaisAtendimento(): Promise<FilialAtendimento[]> {
  const r = await fetch(urlApi("widget"), CACHE_SERVIDOR);
  return (await lerJson<{ filiais: FilialAtendimento[] }>(r)).filiais;
}

/** Manda a lista ao Syncro e recebe o link do WhatsApp do vendedor da vez. */
export async function enviarOrcamento(
  filial: number,
  itens: { codProd: number; qtd: number }[],
): Promise<string> {
  const r = await fetch(urlApi("widget"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filial, intencao: "orcamento", itens }),
  });
  return (await lerJson<{ url: string }>(r)).url;
}

// ── Formatação ──────────────────────────────────────────────────────

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
export const precoBR = (n: number) => BRL.format(n);

/** "A VISTA" → "à vista"; o rótulo vem do cadastro de planos do WinThor. */
export function rotuloPlano(r: string | null): string | null {
  if (!r) return null;
  const t = r.trim().toLowerCase();
  return t === "a vista" ? "à vista" : t;
}

export const TEXTO_DISPONIBILIDADE: Record<Exclude<Disponibilidade, null>, string> = {
  disponivel: "Em estoque",
  ultimas: "Últimas unidades",
  indisponivel: "Sem estoque",
};

/** "CAMERA BULLET VHD 1220" → "Camera Bullet Vhd 1220". */
export function tituloProduto(s: string): string {
  return s
    .toLowerCase()
    .replace(/(^|[\s\-/(])([a-zà-ú])/g, (_, sep: string, ch: string) => sep + ch.toUpperCase());
}

/** URL da página do produto: `/produtos/1234-camera-bullet-vhd-1220`. */
export function hrefProduto(item: { codProd: number; descricao: string }): string {
  const slug = item.descricao
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `/produtos/${item.codProd}${slug ? `-${slug}` : ""}`;
}

/** Lê o código do produto do segmento da URL (`1234-camera...` → 1234). */
export function codDoSegmento(seg: string): number | null {
  const m = /^(\d{1,10})(?:-|$)/.exec(seg);
  return m ? Number(m[1]) : null;
}
