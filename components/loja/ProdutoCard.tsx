"use client";

import FotoProduto from "@/components/loja/FotoProduto";
import Link from "next/link";
import { Plus, Check } from "lucide-react";
import React from "react";
import {
  TEXTO_DISPONIBILIDADE,
  hrefProduto,
  precoBR,
  rotuloPlano,
  tituloProduto,
  type Disponibilidade,
  type FormatoPreco,
  type ItemVitrine,
} from "@/lib/vitrine";
import { useListaOrcamento } from "@/components/loja/ListaOrcamento";

/** Selo de estoque. Sem faixa (estoque desligado no Syncro) não desenha nada. */
export function SeloDisponibilidade({ valor }: { valor: Disponibilidade }) {
  if (!valor) return null;
  const cor =
    valor === "disponivel"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : valor === "ultimas"
        ? "bg-amber-50 text-amber-800 border-amber-100"
        : "bg-neutral-100 text-neutral-500 border-neutral-200";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${cor}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {TEXTO_DISPONIBILIDADE[valor]}
    </span>
  );
}

/**
 * Selo do item: "Sob consulta" quando a filial está sem saldo (o Syncro manda
 * `sobConsulta`), senão a faixa de estoque.
 */
export function SeloItem({ item }: { item: ItemVitrine }) {
  if (item.sobConsulta) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-sky-50 text-sky-800 border-sky-100">
        <span className="w-1.5 h-1.5 rounded-full bg-current" />
        Sob consulta
      </span>
    );
  }
  return <SeloDisponibilidade valor={item.disponibilidade} />;
}

/**
 * Preço como o Syncro mandou desenhar. O a prazo é acréscimo financeiro:
 * aparece como alternativa ("ou … a prazo"), nunca riscado.
 */
export function Preco({
  item,
  formato,
  grande = false,
}: {
  item: ItemVitrine;
  formato: FormatoPreco;
  grande?: boolean;
}) {
  if (item.precoAvista == null) {
    return (
      <p className={`font-bold text-primary ${grande ? "text-lg" : "text-sm"}`}>
        {item.sobConsulta ? "Preço com o vendedor" : "Consulte o preço"}
      </p>
    );
  }
  const avista = rotuloPlano(item.rotuloAvista);
  const prazo = rotuloPlano(item.rotuloPrazo);
  return (
    <div>
      <p className={`font-headline font-black text-on-surface tabular-nums leading-none whitespace-nowrap ${grande ? "text-3xl" : "text-lg"}`}>
        {precoBR(item.precoAvista)}
      </p>
      <p className={`mt-1 text-on-surface-variant ${grande ? "text-sm" : "text-[11px]"}`}>
        {[avista, item.unidade && `por ${item.unidade.toLowerCase()}`].filter(Boolean).join(" · ")}
      </p>
      {item.precoPrazo != null && formato !== "um" && (
        <p className={`text-on-surface-variant tabular-nums ${grande ? "text-sm mt-1" : "text-[11px] mt-0.5"}`}>
          {formato === "dois" ? "" : "ou "}
          {precoBR(item.precoPrazo)} {prazo ?? "a prazo"}
        </p>
      )}
    </div>
  );
}

export default function ProdutoCard({
  item,
  formato,
  prioridade = false,
}: {
  item: ItemVitrine;
  formato: FormatoPreco;
  prioridade?: boolean;
}) {
  const { itens, adicionar } = useListaOrcamento();
  const naLista = itens.some((i) => i.codProd === item.codProd);
  const href = hrefProduto(item);

  return (
    <article className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
      <Link href={href} className="relative block aspect-square bg-neutral-50 overflow-hidden">
        <FotoProduto
          src={item.imagem}
          alt={item.descricao}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          priority={prioridade}
        />
        {item.emPromocao && (
          <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider">
            Oferta{item.promoPct ? ` −${Math.round(item.promoPct)}%` : ""}
          </span>
        )}
      </Link>

      <div className="flex-1 flex flex-col p-4 sm:p-5 gap-3">
        <div>
          {item.marca && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-400 truncate">
              {item.marca}
            </p>
          )}
          <Link href={href}>
            <h3 className="mt-0.5 text-sm sm:text-[15px] font-headline font-bold text-on-surface leading-snug line-clamp-2 group-hover:text-primary transition-colors">
              {tituloProduto(item.descricao)}
            </h3>
          </Link>
        </div>
        <SeloItem item={item} />
        <div className="mt-auto flex items-end justify-between gap-2">
          <Preco item={item} formato={formato} />
          <button
            type="button"
            onClick={() =>
              adicionar({
                codProd: item.codProd,
                descricao: item.descricao,
                marca: item.marca,
                unidade: item.unidade,
                imagem: item.imagem,
              })
            }
            aria-label={naLista ? "Somar mais um na lista" : "Adicionar à lista de orçamento"}
            title={naLista ? "Na lista — clique para somar mais um" : "Adicionar à lista de orçamento"}
            className={`tap-target shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all active:scale-90 ${
              naLista
                ? "bg-primary text-white shadow-lg shadow-primary/30"
                : "bg-surface-container-low text-primary hover:bg-primary hover:text-white"
            }`}
          >
            {naLista ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </article>
  );
}
