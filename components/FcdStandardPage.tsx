"use client";

/* ============================================================================
 * First Class Dev — PÁGINA PADRÃO (boilerplate portátil) · "Sobre"
 * ----------------------------------------------------------------------------
 * Port fiel do mockup "Sobre · First Class Dev".
 * Fontes (--font-display/serif/mono) são injetadas pelo server wrapper em
 * app/first-class-dev/page.tsx via next/font. --font-body vem do layout (Inter).
 *
 * Editar por projeto: COLORS, FONT, CONTACT e os arrays de CONTENT abaixo. ↓↓↓
 * ========================================================================== */

import React, { useEffect, useRef, useState } from "react";

/* -- Paleta da plataforma --------------------------------------------------- */
const C = {
  page: "#FBFBF9",
  dark: "#0E1512",
  brand: "#00BF63",
  bright: "#1FDB80",
  mint: "#5FE0A8",
  light: "#9DF0CC",
  body: "#6A716E",
  sub: "#8A938E",
  line: "#EAECE9",
  line2: "#CFE8DA",
  soft: "#E4F7EE",
  btnInk: "#06241A",
};

const FONT = {
  display: "var(--font-display), 'Space Grotesk', ui-sans-serif, system-ui, sans-serif",
  body: "var(--font-body), 'Instrument Sans', ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-mono), 'Space Mono', ui-monospace, monospace",
  serif: "var(--font-serif), 'Instrument Serif', Georgia, serif",
};

/* -- Contato (atualizado jun/2026) ----------------------------------------- */
const CONTACT = {
  whatsapp: "https://wa.me/5511941683003",
  phone: "+55 (11) 94168-3003",
  email: "equipe@firstclassdev.com.br",
  site: "firstclassdev.com.br",
  url: "https://firstclassdev.com.br",
  linkedin: "https://www.linkedin.com/company/firstclassdev/",
  instagram: "https://instagram.com/firstclassdev/",
  x: "https://x.com/firstclassdev_",
};

/* -- Conteúdo --------------------------------------------------------------- */
const STATS = [
  { n: "20", plus: true, l: "projetos entregues" },
  { n: "11", l: "produtos próprios" },
  { n: "5", l: "anos de mercado" },
  { n: "3", l: "países atendidos" },
];

const HISTORIA = [
  "A First Class Dev nasceu em 2021, da inquietação de um desenvolvedor que via pequenas e médias empresas travadas por processos manuais, planilhas infinitas e softwares de prateleira que nunca se encaixavam.",
  "Lucas Godoy, fundador e CEO, abriu a empresa para provar que dá para entregar tecnologia de alto nível com proximidade, agilidade e foco em resultado — sem o distanciamento das grandes consultorias.",
  "Desde o primeiro projeto, o método é o mesmo: entender o problema antes de escrever a primeira linha de código. Tecnologia é meio; o resultado do cliente é o fim.",
];

const FRENTES = [
  { k: "01 · BRAND", t: "Sites, lojas e landing pages", d: "Identidade visual e páginas onde cada pixel guia o visitante até o contato. Nossa especialidade: sites que viram máquina de conversão." },
  { k: "02 · SAAS", t: "Produtos prontos para usar", d: "11 SaaS próprios com assinatura mensal, sem instalação e 7 dias de teste grátis. Cada um nasceu de um problema real." },
  { k: "03 · DEV", t: "Sistemas sob medida", d: "Sistemas, portais e aplicações web que se encaixam no processo do cliente e escalam com ele. Da estratégia ao deploy." },
];

const VALORES = [
  { n: "01", t: "Cliente em primeiro lugar", d: "Não entregamos código. Entregamos resultado. Se não resolve o problema, não está pronto." },
  { n: "02", t: "Simples vence", d: "Buscamos a solução mais simples que resolve. Complexidade desnecessária é dívida técnica." },
  { n: "03", t: "Parceiros de longo prazo", d: "Temos clientes desde 2021. Construímos relações, não transações." },
];

const PAISES = ["Brasil", "Estados Unidos", "Argentina"];

const PRODUTOS = [
  "Radar B3", "Servix", "FC Noivos", "FC Chef", "First Care", "FC Converter",
  "First Class Insight", "FC Academy", "FC Moments", "Velaris", "Syncro",
];

/* -- Reveal on scroll (IntersectionObserver, zero deps) -------------------- */
function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}s` }}
      className={`transition-all duration-700 ease-out ${shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
    >
      {children}
    </div>
  );
}

/* -- Primitivos ------------------------------------------------------------- */
function LogoMark({ size = 30, color = "#fff" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} fill="none" stroke={color} strokeWidth={3.4} strokeLinecap="round" style={{ display: "block", flexShrink: 0 }}>
      <ellipse cx="60" cy="60" rx="52" ry="18" transform="rotate(-18 60 60)" />
      <g strokeWidth={3}>
        <circle cx="60" cy="60" r="16" />
        <ellipse cx="60" cy="60" rx="16" ry="6" />
        <ellipse cx="60" cy="60" rx="6" ry="16" />
      </g>
      <circle cx="111" cy="60" r="4" fill="#2BE38E" stroke="none" />
    </svg>
  );
}

function Eyebrow({ children, color = C.brand, className = "" }: { children: React.ReactNode; color?: string; className?: string }) {
  return (
    <div className={className} style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color }}>
      {children}
    </div>
  );
}

function Italic({ children, gradient = false }: { children: React.ReactNode; gradient?: boolean }) {
  const grad: React.CSSProperties = gradient
    ? { background: `linear-gradient(90deg, ${C.bright}, ${C.light})`, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }
    : { color: C.brand };
  return (
    <span style={{ fontFamily: FONT.serif, fontStyle: "italic", fontWeight: 400, letterSpacing: 0, ...grad }}>
      {children}
    </span>
  );
}

const isExt = (href: string) => href.startsWith("http") || href.startsWith("mailto:");
function PrimaryBtn({ href, children, lg = false }: { href: string; children: React.ReactNode; lg?: boolean }) {
  return (
    <a
      href={href}
      target={isExt(href) ? "_blank" : undefined}
      rel={isExt(href) ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold leading-none transition hover:-translate-y-0.5"
      style={{ fontFamily: FONT.display, padding: lg ? "15px 30px" : "10px 19px", fontSize: lg ? 16 : 14, color: C.btnInk, background: C.bright, boxShadow: "0 6px 20px -8px rgba(43,227,142,0.75)" }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}
function GhostBtn({ href, children, lg = false }: { href: string; children: React.ReactNode; lg?: boolean }) {
  return (
    <a
      href={href}
      target={isExt(href) ? "_blank" : undefined}
      rel={isExt(href) ? "noopener noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full font-semibold leading-none transition hover:bg-white/15"
      style={{ fontFamily: FONT.display, padding: lg ? "15px 30px" : "10px 19px", fontSize: lg ? 16 : 14, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(4px)" }}
    >
      {children}
      <span aria-hidden="true">→</span>
    </a>
  );
}

const SHELL = "mx-auto w-full max-w-[1200px] px-5 md:px-10";
const GRID_BG =
  "linear-gradient(rgba(255,255,255,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.045) 1px,transparent 1px)";

/* -- Nav -------------------------------------------------------------------- */
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-[200] border-b" style={{ background: "rgba(14,21,18,0.72)", backdropFilter: "blur(12px)", borderColor: "rgba(255,255,255,0.08)" }}>
      <div className={`${SHELL} flex items-center justify-between gap-6 py-3.5`}>
        <a href="#top" className="flex items-center gap-3 no-underline">
          <LogoMark />
          <span className="whitespace-nowrap text-[19px] font-bold text-white" style={{ fontFamily: FONT.display, letterSpacing: "-0.02em" }}>
            First Class Dev
          </span>
        </a>
        <div className="hidden items-center gap-[34px] md:flex" style={{ fontFamily: FONT.body }}>
          <a href={CONTACT.url} target="_blank" rel="noopener noreferrer" className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.8)" }}>Home</a>
          <a href="#frentes" className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.8)" }}>Ferramentas</a>
          <a href="#top" className="text-[14.5px] font-semibold text-white no-underline">Sobre</a>
          <a href="#contato" className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.8)" }}>Contato</a>
        </div>
        <PrimaryBtn href={CONTACT.url}>Quero um site assim</PrimaryBtn>
      </div>
    </nav>
  );
}

/* ========================================================================== */
export default function FcdStandardPage() {
  return (
    <main style={{ background: C.page, color: C.dark, fontFamily: FONT.body }}>
      <Nav />

      {/* ===== HERO ===== */}
      <header id="top" className="relative overflow-hidden" style={{ background: C.dark }}>
        <div className="pointer-events-none absolute inset-0 opacity-60" style={{ backgroundImage: GRID_BG, backgroundSize: "46px 46px" }} />
        <div className="pointer-events-none absolute left-[42%] top-[-160px] h-[540px] w-[760px] -translate-x-1/2" style={{ background: `radial-gradient(50% 50% at 50% 50%, rgba(0,191,99,0.26), transparent 70%)` }} />
        <div className={`relative z-[2] ${SHELL}`} style={{ paddingTop: 150, paddingBottom: 88 }}>
          <Reveal>
            <Eyebrow color={C.mint} className="mb-6">Estúdio de software · desde 2021</Eyebrow>
          </Reveal>
          <Reveal delay={0.06}>
            <h1 className="m-0 max-w-[880px] text-white" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(38px,6vw,60px)", lineHeight: 1.04, letterSpacing: "-0.035em" }}>
              Transformamos o seu site em uma <Italic gradient>máquina de conversão</Italic> de novos clientes.
            </h1>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mb-0 mt-[26px] max-w-[620px] text-[19px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.78)" }}>
              A First Class Dev é o estúdio de tecnologia que cria sites, lojas e landing pages desenhados para vender — e SaaS e sistemas sob medida quando o desafio vai além do site.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <PrimaryBtn href={CONTACT.url} lg>Quero um site assim</PrimaryBtn>
              <GhostBtn href={CONTACT.whatsapp} lg>Falar com especialista</GhostBtn>
            </div>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-[22px]" style={{ fontFamily: FONT.mono, fontSize: 11.5, letterSpacing: "0.08em", color: "rgba(255,255,255,0.5)" }}>
              RESPOSTA EM ATÉ 4H · ORÇAMENTO SEM COMPROMISSO
            </div>
          </Reveal>
        </div>
      </header>

      {/* ===== STATS ===== */}
      <section className={SHELL} style={{ paddingTop: 64, paddingBottom: 24 }}>
        <Reveal>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 48, letterSpacing: "-0.02em", color: C.brand, lineHeight: 1 }}>
                  {s.n}
                  {s.plus && <span style={{ color: C.bright }}>+</span>}
                </div>
                <div className="mt-2.5 text-[14px]" style={{ color: C.body }}>{s.l}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== NOSSA HISTÓRIA ===== */}
      <section className={SHELL} style={{ paddingTop: 72, paddingBottom: 20 }}>
        <Reveal>
          <Eyebrow className="mb-5">Nossa história</Eyebrow>
          <div className="grid items-start gap-10 md:grid-cols-[1.25fr_0.75fr] md:gap-[56px]">
            <h2 className="m-0 max-w-[760px]" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,4vw,40px)", lineHeight: 1.16, letterSpacing: "-0.03em", color: C.dark }}>
              Começou com um incômodo: e se a tecnologia se adaptasse ao negócio — <Italic>e não o contrário?</Italic>
            </h2>
            <div className="flex flex-col gap-[18px] pt-1.5">
              {HISTORIA.map((p, i) => (
                <p key={i} className="m-0 text-[16px] leading-[1.65]" style={{ color: C.body }}>{p}</p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== O QUE FAZEMOS (3 frentes) ===== */}
      <section id="frentes" className={`scroll-mt-24 ${SHELL}`} style={{ paddingTop: 64, paddingBottom: 20 }}>
        <Reveal>
          <div className="mb-10 max-w-[620px]">
            <Eyebrow className="mb-4">O que fazemos</Eyebrow>
            <h2 className="m-0" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,3.6vw,38px)", lineHeight: 1.12, letterSpacing: "-0.03em", color: C.dark }}>
              Três frentes que <Italic>se completam.</Italic>
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-[18px] md:grid-cols-3">
          {FRENTES.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.08}>
              <div className="h-full rounded-2xl border bg-white px-6 pb-[26px] pt-7 transition duration-300 hover:-translate-y-[3px] hover:shadow-[0_20px_40px_-28px_rgba(8,30,22,0.5)]" style={{ borderColor: C.line }}>
                <div className="mb-4" style={{ fontFamily: FONT.mono, fontSize: 12, color: C.brand }}>{f.k}</div>
                <h3 className="m-0 mb-2.5 text-[19px] font-semibold" style={{ fontFamily: FONT.display, letterSpacing: "-0.01em", color: C.dark }}>{f.t}</h3>
                <p className="m-0 text-[14.5px] leading-[1.6]" style={{ color: C.body }}>{f.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== FUNDADOR ===== */}
      <section className={SHELL} style={{ paddingTop: 64, paddingBottom: 20 }}>
        <Reveal>
          <div className="grid overflow-hidden rounded-[20px] border bg-white md:grid-cols-[280px_1fr]" style={{ borderColor: C.line }}>
            <div className="relative flex items-center justify-center overflow-hidden p-10" style={{ background: C.dark }}>
              <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "26px 26px" }} />
              <div className="relative flex h-[140px] w-[140px] items-center justify-center rounded-full" style={{ background: `linear-gradient(145deg, ${C.brand}, #06281C)`, border: "1px solid rgba(31,219,128,0.4)", boxShadow: "0 0 40px rgba(31,219,128,0.25)" }}>
                <span style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: 46, letterSpacing: "-0.02em", color: "#EAFBF2" }}>LG</span>
              </div>
            </div>
            <div className="px-10 py-9">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="m-0 text-[25px] font-bold" style={{ fontFamily: FONT.display, letterSpacing: "-0.02em", color: C.dark }}>Lucas Godoy</h3>
                <span className="inline-flex items-center whitespace-nowrap rounded-full px-[13px] py-1.5" style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.04em", lineHeight: 1, color: C.dark, background: C.soft }}>CEO &amp; Fundador</span>
              </div>
              <div className="mt-2" style={{ fontFamily: FONT.mono, fontSize: 12.5, color: C.sub }}>Desenvolvedor sênior · arquiteturas na nuvem</div>
              <p className="mb-0 mt-[18px] max-w-[560px] text-[15.5px] leading-[1.65]" style={{ color: C.body }}>
                Engenheiro de software com experiência em sistemas web, integrações com ERPs e arquiteturas na nuvem. Fundou a First Class Dev em 2021 para entregar tecnologia de alto nível com proximidade e foco em resultado.
              </p>
              <div className="mt-6 flex gap-[18px]" style={{ fontFamily: FONT.mono, fontSize: 13 }}>
                <a href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: C.brand }}>LinkedIn</a>
                <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: C.brand }}>Instagram</a>
                <a href={CONTACT.x} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: C.brand }}>X</a>
                <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: C.brand }}>WhatsApp</a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== NO QUE ACREDITAMOS (valores) ===== */}
      <section className={SHELL} style={{ paddingTop: 64, paddingBottom: 20 }}>
        <Reveal>
          <div className="mb-10 max-w-[600px]">
            <Eyebrow className="mb-4">No que acreditamos</Eyebrow>
            <h2 className="m-0" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,3.6vw,38px)", lineHeight: 1.12, letterSpacing: "-0.03em", color: C.dark }}>
              O que nos move <Italic>todo dia.</Italic>
            </h2>
          </div>
        </Reveal>
        <div className="grid gap-[18px] md:grid-cols-3">
          {VALORES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.08}>
              <div className="h-full rounded-2xl border bg-white px-6 pb-[26px] pt-7" style={{ borderColor: C.line }}>
                <div className="mb-[18px]" style={{ fontFamily: FONT.mono, fontSize: 12, color: C.brand }}>{v.n}</div>
                <h3 className="m-0 mb-2.5 text-[18px] font-semibold" style={{ fontFamily: FONT.display, color: C.dark }}>{v.t}</h3>
                <p className="m-0 text-[14px] leading-[1.6]" style={{ color: C.body }}>{v.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== PRESENÇA GLOBAL ===== */}
      <section className={SHELL} style={{ paddingTop: 64, paddingBottom: 20 }}>
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-10 rounded-[20px] border px-12 py-11" style={{ borderColor: C.line, background: "#FAFBFA" }}>
            <div className="max-w-[480px]">
              <Eyebrow className="mb-3.5">Presença global</Eyebrow>
              <h2 className="m-0" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(24px,3vw,30px)", lineHeight: 1.16, letterSpacing: "-0.03em", color: C.dark }}>
                Operamos 100% online, atendendo no Brasil e no exterior.
              </h2>
              <p className="mb-0 mt-4 text-[15.5px] leading-[1.6]" style={{ color: C.body }}>
                Projetos hoje no Brasil, Estados Unidos e Argentina — em português, inglês e espanhol.
              </p>
            </div>
            <div className="flex flex-col gap-[18px]">
              <div className="flex flex-wrap gap-2.5">
                {PAISES.map((p) => (
                  <span key={p} className="rounded-full px-3.5 py-2" style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: C.dark, background: C.soft, border: `1px solid ${C.line2}` }}>{p}</span>
                ))}
              </div>
              <div style={{ fontFamily: FONT.mono, fontSize: 13, letterSpacing: "0.1em", color: C.sub }}>PT · EN · ES</div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== NOSSOS PRODUTOS ===== */}
      <section className={SHELL} style={{ paddingTop: 64, paddingBottom: 20 }}>
        <Reveal>
          <div className="mb-8 max-w-[620px]">
            <Eyebrow className="mb-4">Nossos produtos</Eyebrow>
            <h2 className="m-0" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,3.6vw,38px)", lineHeight: 1.12, letterSpacing: "-0.03em", color: C.dark }}>
              11 SaaS, todos com <Italic>7 dias grátis.</Italic>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {PRODUTOS.map((p) => (
              <span key={p} className="rounded-full border bg-white px-[18px] py-[11px] text-[15px] font-semibold" style={{ fontFamily: FONT.display, color: C.dark, borderColor: C.line }}>{p}</span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ===== CTA ===== */}
      <section id="contato" className={`scroll-mt-24 ${SHELL}`} style={{ paddingTop: 60, paddingBottom: 90 }}>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 py-14 md:px-14 md:py-16" style={{ background: C.dark }}>
            <div className="pointer-events-none absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
            <div className="pointer-events-none absolute inset-0 opacity-[0.55]" style={{ background: "radial-gradient(80% 120% at 88% 0%, rgba(31,219,128,0.32), transparent 55%)" }} />
            <div className="relative z-[2] flex flex-wrap items-center justify-between gap-10">
              <div className="max-w-[560px]">
                <Eyebrow color={C.mint} className="mb-[18px]">Vamos conversar</Eyebrow>
                <h2 className="m-0 text-white" style={{ fontFamily: FONT.display, fontWeight: 700, fontSize: "clamp(28px,3.4vw,36px)", lineHeight: 1.14, letterSpacing: "-0.03em" }}>
                  Sua empresa pode ter um site que <Italic gradient>transforma visitantes em clientes.</Italic>
                </h2>
                <p className="mb-0 mt-[18px] text-[16px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.64)" }}>
                  Em 30 minutos entendemos o seu desafio e mostramos como podemos ajudar.
                </p>
              </div>
              <div className="flex flex-col gap-3.5">
                <PrimaryBtn href={CONTACT.url} lg>Quero um site assim</PrimaryBtn>
                <GhostBtn href={CONTACT.whatsapp} lg>Falar com especialista</GhostBtn>
              </div>
            </div>
            <div className="relative z-[2] mt-[30px] flex flex-wrap gap-8 border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ fontFamily: FONT.mono, fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} className="no-underline" style={{ fontFamily: FONT.mono, fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>{CONTACT.email}</a>
              <a href={CONTACT.url} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ fontFamily: FONT.mono, fontSize: 12.5, color: "rgba(255,255,255,0.8)" }}>{CONTACT.site}</a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative overflow-hidden text-white" style={{ background: "linear-gradient(160deg,#0B3D29 0%,#0A2E20 55%,#072018 100%)" }}>
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize: "46px 46px" }} />
        <div className="absolute right-[8%] top-[-160px] h-[420px] w-[620px]" style={{ background: "radial-gradient(50% 50% at 50% 50%, rgba(31,219,128,0.22), transparent 70%)" }} />
        <div className={`relative ${SHELL}`} style={{ paddingTop: 72, paddingBottom: 30 }}>
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
            <div className="max-w-[300px]">
              <span className="flex items-center gap-3">
                <LogoMark />
                <span className="text-[19px] font-bold text-white" style={{ fontFamily: FONT.display, letterSpacing: "-0.02em" }}>First Class Dev</span>
              </span>
              <p className="my-5 text-[14.5px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.72)" }}>
                Sites que transformam visitantes em clientes — e tecnologia sob medida para crescer.
              </p>
            </div>
            <FooterCol title="Empresa" links={[["Soluções Digitais", CONTACT.url], ["Sobre", "#top"], ["Contato", "#contato"]]} />
            <FooterCol title="Explorar" links={[["Serviços", "#frentes"], ["Ferramentas", "#frentes"]]} />
            <div>
              <div className="mb-[18px]" style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>Contato</div>
              <div className="flex flex-col gap-3">
                <div>
                  <div className="mb-[3px]" style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.42)" }}>WhatsApp</div>
                  <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.85)" }}>{CONTACT.phone}</a>
                </div>
                <div>
                  <div className="mb-[3px]" style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.08em", color: "rgba(255,255,255,0.42)" }}>E-mail</div>
                  <a href={`mailto:${CONTACT.email}`} className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.85)" }}>{CONTACT.email}</a>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t pt-[26px]" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
            <span style={{ fontFamily: FONT.mono, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>© 2026 First Class Dev. Todos os direitos reservados.</span>
            <a href={`${CONTACT.url}/pt/privacy-policy`} target="_blank" rel="noopener noreferrer" className="no-underline" style={{ fontFamily: FONT.mono, fontSize: 12, color: "rgba(255,255,255,0.45)" }}>Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="mb-[18px]" style={{ fontFamily: FONT.mono, fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>{title}</div>
      <div className="flex flex-col gap-3">
        {links.map(([label, href]) => (
          <a key={label} href={href} target={isExt(href) ? "_blank" : undefined} rel={isExt(href) ? "noopener noreferrer" : undefined} className="text-[14.5px] no-underline" style={{ color: "rgba(255,255,255,0.85)" }}>{label}</a>
        ))}
      </div>
    </div>
  );
}
