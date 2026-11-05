"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FotoProduto from "@/components/loja/FotoProduto";
import { buscarVitrine, hrefProduto, lojaConfigurada, tituloProduto, type ItemVitrine } from "@/lib/vitrine";

/**
 * Carrossel 3D no desenho do circular-gallery (@ravikatiyar162, 21st.dev):
 * cartões num anel em perspectiva que gira sozinho e acompanha a rolagem da
 * página; o cartão de trás esmaece. Com o mouse (ou o dedo) dá para
 * arrastar o anel, que segue com embalo ao soltar; as setas encaixam o
 * vizinho na frente, e passar o mouse por cima pausa o giro. Aqui cada cartão é um produto (foto em
 * fundo branco, nome e marca no degradê de baixo) e leva à página dele.
 * Quem pediu menos movimento no sistema vê o anel parado.
 */
function useReduzirMovimento() {
  const [reduzir, setReduzir] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduzir(mq.matches);
    const mudou = () => setReduzir(mq.matches);
    mq.addEventListener("change", mudou);
    return () => mq.removeEventListener("change", mudou);
  }, []);
  return reduzir;
}

function useCelular() {
  const [cel, setCel] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setCel(mq.matches);
    const mudou = () => setCel(mq.matches);
    mq.addEventListener("change", mudou);
    return () => mq.removeEventListener("change", mudou);
  }, []);
  return cel;
}

export function GaleriaCircular({
  itens,
  velocidade = 0.02,
}: {
  itens: ItemVitrine[];
  velocidade?: number;
}) {
  const [rotacao, setRotacao] = React.useState(0);
  const [arrastando, setArrastando] = React.useState(false);
  const reduzir = useReduzirMovimento();
  const cel = useCelular();
  const passo = 360 / itens.length;

  // Estado do giro em refs: o laço de animação lê e escreve a cada quadro sem
  // recriar efeito. `alvo` é para onde as setas levam (com freio suave);
  // `inercia` é o embalo que sobra quando se solta o arraste.
  const rot = React.useRef(0);
  const inercia = React.useRef(0);
  const alvo = React.useRef<number | null>(null);
  const sobre = React.useRef(false);
  const arraste = React.useRef<{ x: number; t: number; andou: number; id: number } | null>(null);
  const ultimoScroll = React.useRef(0);

  // Rolar a página também gira (um giro inteiro do topo ao fim da página),
  // somado ao que o mouse fez em vez de sobrescrever.
  React.useEffect(() => {
    if (reduzir) return;
    ultimoScroll.current = window.scrollY;
    const rolar = () => {
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      const delta = window.scrollY - ultimoScroll.current;
      ultimoScroll.current = window.scrollY;
      if (altura > 0 && !arraste.current) rot.current += (delta / altura) * 360;
    };
    window.addEventListener("scroll", rolar, { passive: true });
    return () => window.removeEventListener("scroll", rolar);
  }, [reduzir]);

  React.useEffect(() => {
    let quadro = 0;
    const girar = () => {
      if (!arraste.current) {
        if (alvo.current != null) {
          const falta = alvo.current - rot.current;
          rot.current += falta * 0.12;
          if (Math.abs(falta) < 0.05) {
            rot.current = alvo.current;
            alvo.current = null;
          }
        } else if (Math.abs(inercia.current) > 0.01) {
          rot.current += inercia.current;
          inercia.current *= 0.95;
        } else if (!sobre.current && !reduzir) {
          rot.current += velocidade;
        }
      }
      setRotacao(rot.current);
      quadro = requestAnimationFrame(girar);
    };
    quadro = requestAnimationFrame(girar);
    return () => cancelAnimationFrame(quadro);
  }, [velocidade, reduzir]);

  // Arrastar na horizontal (mouse ou dedo) gira o anel; o dedo na vertical
  // continua rolando a página (touch-action: pan-y).
  const SENSIBILIDADE = 0.35;
  const aoApertar = (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    arraste.current = { x: e.clientX, t: performance.now(), andou: 0, id: e.pointerId };
    inercia.current = 0;
    alvo.current = null;
  };
  const aoMover = (e: React.PointerEvent) => {
    const a = arraste.current;
    if (!a || a.id !== e.pointerId) return;
    const dx = e.clientX - a.x;
    const agora = performance.now();
    a.andou += Math.abs(dx);
    if (a.andou > 4 && !arrastando) {
      setArrastando(true);
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    }
    rot.current += dx * SENSIBILIDADE;
    // Embalo em graus por quadro (~16 ms), medido no último movimento.
    // Teto de 6°/quadro: um arraste rápido não deixa o anel girando à toa.
    const v = ((dx * SENSIBILIDADE) / Math.max(agora - a.t, 1)) * 16;
    inercia.current = Math.max(-6, Math.min(6, v));
    a.x = e.clientX;
    a.t = agora;
  };
  const aoSoltar = (e: React.PointerEvent) => {
    const a = arraste.current;
    if (!a || a.id !== e.pointerId) return;
    // Parou antes de soltar: sem embalo.
    if (performance.now() - a.t > 80) inercia.current = 0;
    arraste.current = null;
    // Deixa o clique (que vem logo depois) saber que foi arraste.
    setTimeout(() => setArrastando(false), 0);
  };

  // Setas: leva o cartão vizinho para a frente, encaixado.
  const ir = (d: 1 | -1) => {
    inercia.current = 0;
    const base = alvo.current ?? rot.current;
    alvo.current = Math.round(base / passo) * passo + d * passo;
  };

  // Medidas do modelo (300×400, raio 600) no computador; menores no celular.
  const larg = cel ? 200 : 260;
  const alt = cel ? 270 : 340;
  const raio = cel ? 300 : 520;

  return (
    <div
      role="region"
      aria-label="Produtos em destaque"
      aria-roledescription="carrossel"
      className={`relative w-full h-full flex items-center justify-center select-none touch-pan-y ${
        arrastando ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ perspective: "2000px" }}
      onPointerDown={aoApertar}
      onPointerMove={aoMover}
      onPointerUp={aoSoltar}
      onPointerCancel={aoSoltar}
      onPointerEnter={() => (sobre.current = true)}
      onPointerLeave={() => (sobre.current = false)}
      onClickCapture={(e) => {
        // Soltar depois de arrastar não abre o produto.
        if (arrastando) {
          e.preventDefault();
          e.stopPropagation();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") ir(1);
        else if (e.key === "ArrowRight") ir(-1);
      }}
    >
      <div className="relative w-full h-full" style={{ transform: `rotateY(${rotacao}deg)`, transformStyle: "preserve-3d" }}>
        {itens.map((it, n) => {
          const angulo = n * passo;
          const relativo = (angulo + (rotacao % 360) + 360) % 360;
          const distancia = Math.abs(relativo > 180 ? 360 - relativo : relativo);
          const opacidade = Math.max(0.3, 1 - distancia / 180);
          const nome = tituloProduto(it.descricao);
          return (
            <div
              key={it.codProd}
              role="group"
              aria-label={nome}
              className="absolute"
              style={{
                width: larg,
                height: alt,
                left: "50%",
                top: "50%",
                marginLeft: -larg / 2,
                marginTop: -alt / 2,
                transform: `rotateY(${angulo}deg) translateZ(${raio}px)`,
                opacity: opacidade,
                transition: "opacity 0.3s linear",
              }}
            >
              <Link
                href={hrefProduto(it)}
                tabIndex={distancia < passo / 2 ? 0 : -1}
                draggable={false}
                onFocus={() => (sobre.current = true)}
                onBlur={() => (sobre.current = false)}
                className="relative block w-full h-full rounded-lg shadow-2xl overflow-hidden border border-neutral-200 bg-white group"
              >
                <FotoProduto
                  src={it.imagem}
                  alt={nome}
                  fill
                  sizes={`${larg}px`}
                  className="object-contain p-6 pb-24 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 w-full p-4 pt-10 bg-gradient-to-t from-black/80 via-black/60 to-transparent text-white">
                  <h3 className="text-base md:text-lg font-bold leading-tight line-clamp-2">{nome}</h3>
                  {it.marca && <em className="text-sm italic opacity-80">{it.marca}</em>}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
      <div className="absolute inset-x-0 bottom-2 z-10 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => ir(1)}
          aria-label="Produto anterior"
          className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur text-on-surface shadow-sm hover:bg-white hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => ir(-1)}
          aria-label="Próximo produto"
          className="h-10 w-10 inline-flex items-center justify-center rounded-full border border-neutral-200 bg-white/90 backdrop-blur text-on-surface shadow-sm hover:bg-white hover:text-primary transition-colors cursor-pointer"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/**
 * Faixa "Mais vendidos" da página inicial, com o carrossel 3D. Busca a lista
 * no Syncro pelo navegador (o CDN do Syncro guarda a resposta); sem loja
 * configurada, sem resposta ou com poucos produtos, a faixa não aparece.
 */
export function FaixaMaisVendidos() {
  const [itens, setItens] = React.useState<ItemVitrine[] | null>(null);

  React.useEffect(() => {
    if (!lojaConfigurada) return;
    let vivo = true;
    buscarVitrine({ destaque: "mais_vendidos", limit: 12 })
      .then((r) => vivo && setItens(r.itens.filter((i) => i.imagem).slice(0, 10)))
      .catch(() => vivo && setItens([]));
    return () => {
      vivo = false;
    };
  }, []);

  if (!itens || itens.length < 5) return null;

  return (
    <section aria-labelledby="mais-vendidos" className="relative bg-surface overflow-hidden py-14 md:py-20">
      <div className="text-center px-5">
        <h2 id="mais-vendidos" className="text-4xl font-headline font-black tracking-tighter text-on-surface">
          Mais vendidos
        </h2>
        <p className="mt-2 text-on-surface-variant">
          O que os integradores mais levam da TG. Arraste para girar e clique num produto para ver.
        </p>
      </div>
      <div className="h-[420px] md:h-[520px]">
        <GaleriaCircular itens={itens} />
      </div>
      <div className="text-center">
        <Link
          href="/produtos"
          className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-5 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
        >
          Ver todos os produtos
        </Link>
      </div>
    </section>
  );
}
