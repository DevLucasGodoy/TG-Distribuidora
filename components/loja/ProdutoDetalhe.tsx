"use client";

import React from "react";
import FotoProduto from "@/components/loja/FotoProduto";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, ClipboardList, Check, MapPin, ShieldCheck } from "lucide-react";
import {
  tituloProduto,
  type FormatoPreco,
  type ProdutoDetalhe as Produto,
} from "@/lib/vitrine";
import { Quantidade, useListaOrcamento } from "@/components/loja/ListaOrcamento";
import { Preco, SeloDisponibilidade, SeloItem } from "@/components/loja/ProdutoCard";

const nomeCategoria = (s: string | null) => (s ? tituloProduto(s) : null);

export default function ProdutoDetalhe({
  produto,
  formato,
}: {
  produto: Produto;
  formato: FormatoPreco;
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

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
      {/* Trilha */}
      <nav aria-label="Trilha" className="py-4 md:py-6 text-xs text-on-surface-variant flex flex-wrap items-center gap-1.5">
        <Link href="/produtos" className="hover:text-primary">
          Produtos
        </Link>
        {departamento && cat?.depto != null && (
          <>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link href={`/produtos?depto=${cat.depto}`} className="hover:text-primary">
              {departamento}
            </Link>
          </>
        )}
        {secao && cat?.depto != null && cat.secao != null && (
          <>
            <ChevronRight className="w-3 h-3 text-neutral-300" />
            <Link href={`/produtos?depto=${cat.depto}&secao=${cat.secao}`} className="hover:text-primary">
              {secao}
            </Link>
          </>
        )}
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-neutral-100 p-4 sm:p-6 md:p-10">
        <div className="lg:col-span-7">
          <Galeria imagens={produto.imagens.length ? produto.imagens : [produto.imagem]} alt={produto.descricao} />
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {produto.marca && (
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-400">
                {produto.marca}
              </span>
            )}
            {produto.emPromocao && (
              <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[11px] font-bold uppercase tracking-widest">
                Oferta{produto.promoPct ? ` −${Math.round(produto.promoPct)}%` : ""}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-headline font-black tracking-tight text-on-surface leading-tight">
            {tituloProduto(produto.descricao)}
          </h1>
          <p className="mt-2 text-sm text-neutral-400 font-medium">
            Cód. {produto.codProd}
            {produto.embalagem ? ` · Embalagem ${produto.embalagem}` : ""}
          </p>

          <div className="mt-6 pb-6 border-b border-neutral-100">
            {produto.sobConsulta && (
              <div className="mb-3">
                <SeloItem item={produto} />
              </div>
            )}
            <Preco item={produto} formato={formato} grande />
            {produto.sobConsulta && (
              <p className="mt-2 text-xs text-on-surface-variant">
                Sem estoque na filial principal agora. Inclua na lista mesmo assim: o vendedor
                confirma prazo de chegada e preço no orçamento.
              </p>
            )}
            {produto.precoAvista != null && (
              <p className="mt-2 text-xs text-on-surface-variant">
                Preço de referência da filial principal. O valor final sai no orçamento com o
                vendedor.
              </p>
            )}
          </div>

          {comEstoque && (
            <div className="py-6 border-b border-neutral-100">
              <p className="text-[11px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">
                Estoque por filial
              </p>
              <ul className="space-y-2">
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
            </div>
          )}

          <div className="py-6 space-y-4">
            <Quantidade valor={qtd} unidade={produto.unidade} onChange={setQtd} grande />
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={incluir}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-primary text-white font-bold shadow-xl shadow-primary/25 hover:opacity-90 transition-opacity"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={acabouDeAdicionar ? "ok" : "add"}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="flex items-center gap-2"
                  >
                    {acabouDeAdicionar ? <Check className="w-5 h-5" /> : <ClipboardList className="w-5 h-5" />}
                    {acabouDeAdicionar ? "Adicionado à lista" : "Adicionar à lista"}
                  </motion.span>
                </AnimatePresence>
              </button>
              {naLista && (
                <button
                  type="button"
                  onClick={abrir}
                  className="sm:w-auto px-6 py-4 rounded-xl border border-neutral-200 font-bold text-sm text-on-surface hover:border-primary hover:text-primary transition-colors"
                >
                  Ver lista ({naLista.qtd} {produto.unidade})
                </button>
              )}
            </div>
            <p className="flex items-start gap-2 text-xs text-on-surface-variant">
              <ShieldCheck className="w-4 h-4 shrink-0 text-primary" />
              Monte a lista com todos os produtos que precisa e envie de uma vez: um vendedor da
              filial escolhida responde com o orçamento pelo WhatsApp.
            </p>
          </div>
        </div>
      </div>

      <InformacoesTecnicas produto={produto} departamento={departamento} secao={secao} />
    </div>
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

/** Galeria — foto grande com setas e miniaturas embaixo (como no Commerce). */
function Galeria({ imagens, alt }: { imagens: (string | null)[]; alt: string }) {
  const [i, setI] = React.useState(0);
  const total = imagens.length;
  const ir = (d: number) => setI((atual) => (atual + d + total) % total);

  return (
    <div>
      <div className="relative aspect-square rounded-2xl bg-neutral-50 overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0"
          >
            <FotoProduto
              src={imagens[i]}
              alt={total > 1 ? `${alt} — foto ${i + 1} de ${total}` : alt}
              fill
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain p-6"
              priority={i === 0}
            />
          </motion.div>
        </AnimatePresence>
        {total > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center rounded-full bg-white/90 backdrop-blur border border-neutral-200 shadow-sm">
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
      {total > 1 && (
        <ul className="mt-4 flex gap-3 overflow-x-auto no-scrollbar">
          {imagens.map((src, n) => (
            <li key={src ?? n}>
              <button
                type="button"
                onClick={() => setI(n)}
                aria-label={`Ver foto ${n + 1}`}
                aria-current={n === i}
                className={`relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-50 border-2 transition-colors ${
                  n === i ? "border-primary" : "border-transparent hover:border-neutral-200"
                }`}
              >
                <FotoProduto src={src} alt="" fill sizes="80px" className="object-contain p-1.5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
