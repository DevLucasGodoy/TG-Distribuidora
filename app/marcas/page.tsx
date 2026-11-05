"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  PhoneCall,
  Shield,
  Plus,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, Stagger, StaggerItem, Parallax } from "@/components/Motion";

export default function MarcasPage() {
  const [activeFilter, setActiveFilter] = React.useState("Todos");

  // `fundo`: a cor do fundo do PRÓPRIO logo (lida nos cantos da imagem). O
  // quadro do card usa a mesma cor, e o logo emenda sem aparecer o retângulo.
  // `destaque`: sobe a marca para a faixa grande acima da grade.
  const partners: {
    name: string;
    category: string;
    desc: string;
    img: string;
    fundo?: string;
    /** Logo com muita margem no próprio arquivo fica miúdo no quadro: amplia. */
    escala?: number;
    destaque?: boolean;
    /** Imagem é foto (não logo recortado): preenche o quadro, e o cartão ocupa a linha toda. */
    capa?: boolean;
  }[] = [
    {
      name: "Hikvision",
      category: "CFTV",
      desc: "Câmeras IP, DVRs, NVRs, Kits CFTV e acessórios de vigilância em HD.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgh-qqwYJWRq-q444s84sDpykVzn2rDe7Sog&s",
    },
    {
      name: "JFL",
      category: "Alarmes",
      desc: "Centrais de alarme, sensores de presença, sensores sem fio, sirenes e controles.",
      img: "https://jflalarmes.com.br/wp-content/uploads/2024/01/cropped-Favicon.png",
      fundo: "#fdb913",
    },
    {
      name: "AGL",
      category: "Controle de Acesso",
      desc: "Interfones, vídeo porteiros, fechaduras elétricas e kits de porteiro eletrônico.",
      img: "https://yt3.googleusercontent.com/P0E4UMelWJfvAIR0nhdTF50Xw7fGUWVtpUJcabuyCJNV-VzSB-tvBwKVWdufBXmXfEEUpZ7Y=s900-c-k-c0x00ffffff-no-rj",
      escala: 1.25,
    },
    {
      name: "IPEC",
      category: "Alarmes",
      desc: "Centrais de alarme, sensores, controles remotos e carregadores.",
      img: "https://yt3.googleusercontent.com/HoS_6E-4ThHx08h9-80056tIqC_fC9nLGpMSvshFuldlcKzr2t0BzOmllCUtPMbIdrkK6llr=s900-c-k-c0x00ffffff-no-rj",
      escala: 1.6,
    },
    {
      name: "Garen",
      category: "Automatização",
      desc: "Motores para portão, centrais de comando, controles remotos, cremalheiras e fotocélulas.",
      img: "https://alphadigi.com.br/wp-content/uploads/2025/04/garem.jpg",
      fundo: "#ffffff",
      destaque: true,
    },
    {
      name: "Rossi",
      category: "Automatização",
      desc: "Motores de portão, automatizadores residenciais, kits completos e acessórios.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSieVtHvqRxCFt93va20P1pDkHntS_bTCpfIA&s",
      fundo: "#02407d",
      destaque: true,
    },
    {
      name: "MPT Cabos",
      category: "Cabos e Redes",
      desc: "Cabos coaxiais, cabos CFTV e cabos de rede de alta qualidade.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSncYz5grHLKqk1YmA1860ZY4pFj1gbkto7jA&s",
      escala: 1.6,
    },
    {
      name: "FC Fontes",
      category: "Fontes e Energia",
      desc: "Fontes chaveadas, fontes para CFTV e distribuidores de energia.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdOejqWYarPw7Pyx_lhuHILeYmgr7z1DJ73w&s",
      escala: 1.5,
    },
    {
      name: "Inove",
      category: "Acessórios",
      desc: "Hastes de aterramento, bases e suportes para sistemas de segurança.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfnSK6CmlvtYC2XF1imDSjZFpHmt0Oj9n9YA&s",
      fundo: "#2b2b2b",
    },
    {
      name: "Condutti",
      category: "Cabos e Redes",
      desc: "Distribuição de fios e cabos especiais para setores de segurança eletrônica.",
      img: "https://falasegura.com.br/content/images/2025/08/Condutti_logo-baixa-1024x724.jpg",
      fundo: "#4fba49",
      escala: 1.6,
    },
    {
      name: "Continente Motores",
      category: "Automatização",
      desc: "Automatizadores e soluções de segurança para aplicações industriais.",
      img: "https://distriseg.com.br/wp-content/uploads/2025/04/logo-continente-alarmes-sensores-eletrificadores-automacao-distriseg.png",
    },
    {
      name: "Trava Tec",
      category: "Controle de Acesso",
      desc: "Travas elétricas, fechos magnéticos e acessórios para portas.",
      img: "https://claumon.com.br/wp-content/uploads/2021/10/logo-travatec.jpg",
      escala: 1.8,
    },
    {
      name: "Confiseg",
      category: "Acessórios",
      desc: "Hastes industriais, hastes de cantoneira, hastes convencionais e hastes meia lua.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXJxonIW_nvQuRnxFfL23ONcIN1-obJ7sEDQ&s",
    },
    {
      name: "Líder",
      category: "Alarmes",
      desc: "Interfonia, porteiros, alarmes, sensores e cercas elétricas.",
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRARdJLN0-TOExN5m9V_i1k7MGY8vjiq7Sgfg&s",
    },
    {
      name: "Movimento",
      category: "Automatização",
      desc: "Automatizadores para portão e peças, acessórios especializados.",
      img: "",
    },
    {
      name: "Cortseg",
      category: "Proteção Perimetral",
      desc: "Concertinas e soluções de proteção perimetral para segurança de perímetro.",
      img: "/marcas/cortseg.webp",
      fundo: "#d1d4d5",
      destaque: true,
      capa: true,
    },
    {
      name: "Vertys",
      category: "Fontes e Energia",
      desc: "Energia solar fotovoltaica: painéis, inversores e kits completos.",
      img: "/marcas/vertys.png",
      fundo: "#0f1e7b",
      escala: 2.2,
    },
  ];

  const categories = [
    "Todos",
    "CFTV",
    "Alarmes",
    "Controle de Acesso",
    "Automatização",
    "Cabos e Redes",
    "Fontes e Energia",
    "Acessórios",
    "Proteção Perimetral",
  ];

  // As marcas em destaque têm faixa própria acima E continuam na grade:
  // quem rola direto para a lista completa também as encontra (05/11/2026).
  const featured = partners.filter((p) => p.destaque);
  const filteredPartners =
    activeFilter === "Todos" ? partners : partners.filter((p) => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <span className="text-primary font-label tracking-[0.2em] text-xs font-bold uppercase">
                Excelência em Segurança
              </span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-[1.1]">
                Marcas que <br />
                <span className="text-primary">Protegem o Futuro.</span>
              </h1>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nossa rede de parceiros é composta pelos líderes globais em
                tecnologia de monitoramento, controle de acesso e redes.
                Garantimos procedência e suporte técnico especializado para cada
                solução.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative hidden sm:block"
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 hover:scale-100 transition-transform duration-700 relative">
                <Image
                  className="w-full h-full object-cover"
                  src="/marcas/garen-rossi.webp"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="eager"
                  alt="Garen e Rossi, marcas distribuídas pela TG"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-lg shadow-xl max-w-[200px] animate-float">
                <p className="text-on-secondary-container font-headline font-bold text-3xl leading-none">
                  100%
                </p>
                <p className="text-on-secondary-container text-[10px] font-bold uppercase tracking-wider mt-1">
                  Garantia de Originalidade
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-14 md:py-24 bg-surface-container-low overflow-x-clip">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            {/* Marcas em destaque — Garen e Rossi */}
            <Reveal className="mb-14 md:mb-20">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-primary font-label tracking-[0.2em] text-xs font-bold uppercase whitespace-nowrap">
                  Marcas em destaque
                </span>
                <span className="h-px flex-grow bg-neutral-200" />
              </div>
              <Stagger className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
                {featured.map((p) => (
                  <StaggerItem
                    key={p.name}
                    lift={6}
                    className={`group relative bg-white rounded-2xl md:rounded-3xl border border-neutral-100 shadow-sm hover:shadow-2xl transition-shadow duration-500 overflow-hidden flex flex-col sm:flex-row ${p.capa ? "md:col-span-2" : ""}`}
                  >
                    <div
                      className={`relative ${p.capa ? "sm:w-[55%] h-52 sm:min-h-[300px]" : "sm:w-[44%] h-48 sm:min-h-[260px]"} sm:h-auto shrink-0 flex items-center justify-center overflow-hidden`}
                      style={{ backgroundColor: p.fundo ?? "#ffffff" }}
                    >
                      {p.capa ? (
                        <Image
                          src={p.img}
                          alt={`Logo ${p.name}`}
                          fill
                          sizes="(max-width: 640px) 100vw, 55vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={p.img}
                          alt={`Logo ${p.name}`}
                          width={320}
                          height={320}
                          className="w-3/4 max-w-[240px] h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      )}
                    </div>
                    <div className="flex-1 flex flex-col p-6 sm:p-8">
                      <span className="self-start text-[10px] font-bold font-label tracking-widest text-on-secondary-container bg-secondary-container px-2.5 py-1 rounded">
                        {p.category.toUpperCase()}
                      </span>
                      <h3 className="mt-3 text-2xl md:text-3xl font-headline font-black tracking-tight text-on-surface">
                        {p.name}
                      </h3>
                      <p className="mt-2 text-sm md:text-base text-on-surface-variant leading-relaxed">
                        {p.desc}
                      </p>
                      <Link
                        href={`/produtos?q=${encodeURIComponent(p.name)}`}
                        className="mt-6 sm:mt-auto sm:pt-6 inline-flex items-center gap-2 self-start text-sm font-bold text-primary group/link"
                      >
                        Ver produtos {p.name}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </Reveal>

            <Reveal className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">
                  Nossa Curadoria Técnica
                </h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => {
                    const isActive = activeFilter === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveFilter(cat)}
                        className={`relative px-4 py-2 rounded-full text-xs font-bold font-label transition-colors duration-300 ${
                          isActive
                            ? "text-white"
                            : "bg-white text-on-surface-variant border border-neutral-100 hover:border-primary/30 hover:text-primary"
                        }`}
                      >
                        {/* Pílula que desliza entre as categorias */}
                        {isActive && (
                          <motion.span
                            layoutId="activeBrandCategory"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                            className="absolute inset-0 bg-primary rounded-full shadow-lg shadow-primary/20"
                          />
                        )}
                        <span className="relative z-10">{cat.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
                <p className="text-on-surface-variant">
                  Trabalhamos exclusivamente com fabricantes que definem os
                  padrões da indústria de segurança eletrônica global.
                </p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-tertiary font-label text-sm font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  DISTRIBUIDOR AUTORIZADO
                </span>
              </div>
            </Reveal>

            <GradeLogos marcas={filteredPartners} />
          </div>
        </section>

        {/* Why Partners Section */}
        <section className="py-16 md:py-32 relative">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
            <div className="space-y-12">
              <Reveal>
                <h2 className="text-4xl font-headline font-extrabold tracking-tight">
                  Por que ser parceiro da{" "}
                  <span className="text-primary">TG Distribuidora?</span>
                </h2>
              </Reveal>
              <Stagger className="space-y-8" step={0.12}>
                {[
                  {
                    title: "Marcas originais, com nota",
                    desc: "Revenda autorizada Hikvision, Intelbras, Dahua, Garen, Rossi e outras: produto com nota fiscal e garantia do fabricante.",
                    icon: ShieldCheck,
                    bg: "bg-primary/10",
                    color: "text-primary",
                  },
                  {
                    title: "Atendimento de quem entende",
                    desc: "O vendedor da sua unidade ajuda a escolher o equipamento e confere a compatibilidade antes de fechar o orçamento.",
                    icon: PhoneCall,
                    bg: "bg-tertiary/10",
                    color: "text-tertiary",
                  },
                  {
                    title: "Pronta entrega no MS",
                    desc: "Estoque em Dourados, Campo Grande, Ponta Porã e Três Lagoas, para a sua obra não parar esperando material.",
                    icon: Shield,
                    bg: "bg-secondary/10",
                    color: "text-secondary",
                  },
                ].map((item, i) => (
                  <StaggerItem key={i} className="group flex gap-6">
                    <div
                      className={`w-12 h-12 rounded ${item.bg} flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-2 transition-colors group-hover:text-primary">
                        {item.title}
                      </h4>
                      <p className="text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            <Parallax className="relative h-[300px] sm:h-[400px] md:h-[480px]" distance={36}>
              <Image
                className="rounded-xl shadow-2xl w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=1200"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                referrerPolicy="no-referrer"
                alt="Aperto de mão entre parceiros de negócio"
              />
              <div className="absolute top-10 -right-4 bg-tertiary text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 animate-float">
                <Shield className="w-5 h-5" />
                <div className="text-[10px] font-bold font-label tracking-widest uppercase">
                  Revenda autorizada
                </div>
              </div>
            </Parallax>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

type Marca = {
  name: string;
  category: string;
  img: string;
  fundo?: string;
  escala?: number;
  capa?: boolean;
};

/**
 * Grade de logos no desenho do logo-cloud-2 (@efferd, 21st.dev): células
 * coladas com fio de 1px, xadrez de fundo claro/cinza, "+" nos cruzamentos
 * internos e fios que vazam até a borda da tela em cima e embaixo. Cada logo
 * fica no quadro com a cor do próprio arquivo (logo raster com fundo) e leva
 * aos produtos da marca. A última linha fecha com células vazias e o
 * "E muito mais", para a grade não terminar dentada.
 */
function GradeLogos({ marcas }: { marcas: Marca[] }) {
  const celulas: (Marca | "mais" | null)[] = [...marcas, "mais"];
  const completar = (n: number) => {
    const c = [...celulas];
    while (c.length % n) c.push(null);
    return c;
  };
  // A grade é de 2 colunas no celular e 4 no computador: as duas listas
  // diferem só nas células vazias do fim.
  const md = completar(4);
  const cel = completar(2);
  const total = Math.max(md.length, cel.length);
  const lista = md.length >= cel.length ? md : cel;

  return (
    <div className="relative grid grid-cols-2 md:grid-cols-4 border-x border-neutral-200">
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t border-neutral-200" />
      {lista.slice(0, total).map((c, i) => {
        const col2 = i % 2, lin2 = Math.floor(i / 2), linhas2 = cel.length / 2;
        const col4 = i % 4, lin4 = Math.floor(i / 4), linhas4 = md.length / 4;
        // Some no celular a célula vazia que só existe para fechar a grade de 4.
        const soMd = i >= cel.length;
        const xadrez2 = (col2 + lin2) % 2 === 0;
        const xadrez4 = (col4 + lin4) % 2 === 0;
        const borda = [
          col2 < 1 ? "border-r" : "",
          lin2 < linhas2 - 1 ? "border-b" : "",
          col4 < 3 ? "md:border-r" : "md:border-r-0",
          lin4 < linhas4 - 1 ? "md:border-b" : "md:border-b-0",
        ].join(" ");
        const fundo = `${xadrez2 ? "bg-neutral-50" : "bg-white"} ${xadrez4 ? "md:bg-neutral-50" : "md:bg-white"}`;
        const mais2 = col2 < 1 && lin2 < linhas2 - 1;
        const mais4 = col4 < 3 && lin4 < linhas4 - 1;
        return (
          <div
            key={c && c !== "mais" ? c.name : `vazio-${i}`}
            className={`relative border-neutral-200 ${borda} ${fundo} ${soMd ? "hidden md:block" : ""}`}
          >
            {c === "mais" ? (
              <Link
                href="/produtos"
                className="flex h-full min-h-40 flex-col items-center justify-center gap-1 px-4 py-8 text-center group"
              >
                <span className="font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                  E muito mais
                </span>
                <span className="text-xs text-on-surface-variant">Ver o catálogo completo →</span>
              </Link>
            ) : c ? (
              <Link
                href={`/produtos?q=${encodeURIComponent(c.name)}`}
                className="group flex h-full min-h-40 flex-col items-center justify-center gap-3 px-4 py-8 md:p-8"
              >
                <span
                  className="relative flex h-16 w-32 md:h-20 md:w-40 items-center justify-center overflow-hidden rounded-md"
                  style={{ backgroundColor: c.fundo ?? "#ffffff" }}
                >
                  {c.img ? (
                    <span
                      className="relative h-full"
                      style={{
                        width: c.capa ? "100%" : "70%",
                        transform: c.escala && !c.capa ? `scale(${c.escala})` : undefined,
                      }}
                    >
                      <Image
                        src={c.img}
                        alt={`Logo ${c.name}`}
                        fill
                        sizes="320px"
                        className={`${c.capa ? "object-cover" : "object-contain"} select-none transition-transform duration-300 group-hover:scale-105`}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    </span>
                  ) : (
                    <span className="font-headline font-black text-lg text-neutral-400">{c.name}</span>
                  )}
                </span>
                <span className="text-center">
                  <span className="block text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">
                    {c.name}
                  </span>
                  <span className="block text-xs text-on-surface-variant">{c.category}</span>
                </span>
              </Link>
            ) : (
              <div className="h-full min-h-40" />
            )}
            {mais2 && (
              <Plus className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6 text-neutral-400 md:hidden" strokeWidth={1} />
            )}
            {mais4 && (
              <Plus className="-right-[12.5px] -bottom-[12.5px] absolute z-10 hidden size-6 text-neutral-400 md:block" strokeWidth={1} />
            )}
          </div>
        );
      })}
      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b border-neutral-200" />
    </div>
  );
}
