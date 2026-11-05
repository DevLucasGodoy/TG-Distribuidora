import { ArrowUpRight } from "lucide-react";

/**
 * Assinatura do Syncro OS na loja. O catálogo inteiro (produto, foto, oferta,
 * mais vendidos, estoque por filial e o vendedor da vez) sai do Syncro OS, o
 * sistema de gestão da TG — e isso é argumento de venda dos dois lados: o
 * cliente sabe que o estoque é real, e quem visita sabe quem fez.
 *
 * Verde da marca do Syncro (#00bf63) só aqui: o resto da loja é da TG.
 */
const VERDE = "#00bf63";
const SITE_SYNCRO = "https://syncroos.com.br/?utm_source=tgdistribuidora&utm_medium=loja";

/** Marca: rede de nós (o mapa do logo, simplificado para caber em 20px). */
function MarcaSyncro({ className = "w-5 h-5" }: { className?: string }) {
  const nos: [number, number][] = [
    [4, 6], [11, 3], [19, 5], [8, 12], [16, 11], [12, 19], [20, 17],
  ];
  const fios: [number, number][] = [
    [0, 1], [1, 2], [0, 3], [1, 3], [1, 4], [2, 4], [3, 4], [3, 5], [4, 5], [4, 6], [5, 6],
  ];
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      {fios.map(([a, b]) => (
        <line key={`${a}-${b}`} x1={nos[a][0]} y1={nos[a][1]} x2={nos[b][0]} y2={nos[b][1]} stroke={VERDE} strokeWidth={1.1} />
      ))}
      <circle cx={16} cy={11} r={3.2} fill="#ffcd00" opacity={0.55} />
      {nos.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={1.7} fill={VERDE} />
      ))}
    </svg>
  );
}

function NomeSyncro({ className = "" }: { className?: string }) {
  return (
    <span className={`font-headline font-black tracking-tight ${className}`}>
      <span className="text-neutral-900">Syncro</span> <span style={{ color: VERDE }}>OS</span>
    </span>
  );
}

/**
 * Faixa do topo do catálogo: quem faz a loja e o que isso garante ao cliente.
 * Uma linha só, do tamanho da busca: o cartão com três garantias empurrava a
 * busca para baixo e roubava o topo da página (05/11/2026).
 */
export function CartaoSyncro() {
  return (
    <a
      href={SITE_SYNCRO}
      target="_blank"
      rel="noopener"
      aria-label="Catálogo ao vivo do Syncro OS — conheça o Syncro OS"
      className="group flex items-center gap-3 rounded-2xl bg-white border border-neutral-100 shadow-sm px-3.5 py-2.5 hover:border-neutral-200 transition-colors"
    >
      <span className="shrink-0 w-9 h-9 rounded-xl bg-neutral-50 border border-neutral-100 flex items-center justify-center">
        <MarcaSyncro className="w-5 h-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-1.5 text-sm text-on-surface">
          <span className="relative flex w-1.5 h-1.5 shrink-0">
            <span className="absolute inset-0 rounded-full animate-ping" style={{ background: VERDE, opacity: 0.6 }} />
            <span className="relative w-1.5 h-1.5 rounded-full" style={{ background: VERDE }} />
          </span>
          <span className="truncate">
            Catálogo ao vivo do <NomeSyncro />
          </span>
        </span>
        <span className="block truncate text-xs text-on-surface-variant">
          Estoque, preço e ofertas direto do sistema da TG
        </span>
      </span>
      <ArrowUpRight className="w-4 h-4 shrink-0 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
    </a>
  );
}

/** Selo curto ao lado do título da grade. */
export function SeloViaSyncro() {
  return (
    <a
      href={SITE_SYNCRO}
      target="_blank"
      rel="noopener"
      title="Catálogo, estoque e ofertas fornecidos pelo Syncro OS"
      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-500 hover:border-neutral-300 transition-colors"
    >
      <MarcaSyncro className="w-3.5 h-3.5" />
      Dados ao vivo do <NomeSyncro className="text-[11px]" />
    </a>
  );
}
