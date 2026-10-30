"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  ShieldCheck,
  Activity,
  MapPin,
  PhoneCall,
  Clock,
  Building2,
  Menu,
  X,
  Send,
  Globe,
  Shield,
  ChevronLeft,
  ChevronRight,
  Quote,
  MessageCircle,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Reveal, Stagger, StaggerItem, CountUp } from "@/components/Motion";

export default function HomePage() {
  const locations = [
    {
      name: "Dourados",
      type: "MATRIZ",
      address: "R. Pedro Rigotti, 925 - Vila Santo André",
      mapsUrl:
        "https://maps.google.com/?q=R.+Pedro+Rigotti,+925,+Vila+Santo+André,+Dourados,+MS",
      phone: "67 3032-3090",
      phone2: "67 3021-3150",
      whatsapp: "67 99958-3090",
      hours: "Seg - Sex: 08:00 - 18:00",
      img: "/lojas/dourados.jpg",
    },
    {
      name: "Campo Grande",
      type: "HUB REGIONAL",
      address: "Av. Salgado Filho, 1756",
      mapsUrl:
        "https://maps.google.com/?q=Av.+Salgado+Filho,+1756,+Campo+Grande,+MS",
      phone: "67 3043-3090",
      phone2: "67 3042-3091",
      whatsapp: "67 99285-6510",
      hours: "Seg - Sex: 08:00 - 18:00",
      img: "/lojas/campo-grande.jpg",
    },
    {
      name: "Ponta Porã",
      type: "FRONTEIRA",
      address: "Av. Paraguai, 2310 - Centro",
      mapsUrl:
        "https://maps.google.com/?q=Av.+Paraguai,+2310,+Centro,+Ponta+Porã,+MS",
      phone: "67 3431-6421",
      whatsapp: "67 99996-3043",
      hours: "Seg - Sex: 08:00 - 18:00",
      img: "/lojas/ponta-pora.jpg",
    },
    {
      name: "Três Lagoas",
      type: "HUB LESTE",
      address: "R. Darcí Pio, 1333 - Santos Dumont",
      mapsUrl:
        "https://maps.google.com/?q=R.+Darcí+Pio,+1333,+Santos+Dumont,+Três+Lagoas,+MS",
      phone: "67 99994-1447",
      whatsapp: "67 99994-1447",
      hours: "Seg - Sex: 08:00 - 18:00",
      img: "/lojas/tres-lagoas.jpg",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Mauro Silva",
      role: "Cliente · Dourados",
      text: "Excelente atendimento na TG Distribuidora de Dourados! Precisei de equipamentos de segurança eletrônica com urgência e encontrei tudo com pronta entrega e preço de atacado. A equipe foi muito atenciosa e me ajudou a escolher os produtos ideais para minha instalação. Ótima opção para quem procura distribuidora de segurança eletrônica em Dourados, com variedade, qualidade e agilidade. Com certeza voltarei a comprar e recomendo para outros instaladores e profissionais da área!",
    },
    {
      id: 2,
      name: "Francisco Freitas",
      role: "Avaliação Google",
      text: "Atendimento excelente, ambiente agradável, bom estacionamento, prestação de serviço rápida.",
    },
    {
      id: 3,
      name: "Igor Gomes",
      role: "Avaliação Google",
      text: "Ótimo atendimento. Tudo para segurança patrimonial.",
    },
    {
      id: 4,
      name: "William Lara",
      role: "Avaliação Google",
      text: "Ótimo atendimento, melhores preços de concertina, cerca elétrica e alarmes da região.",
    },
    {
      id: 5,
      name: "Carlos Eduardo Miranda Pereira",
      role: "Avaliação Google",
      text: "Excelente produtos de primeira linha. Hikvision, Garen e movimento.",
    },
    {
      id: 6,
      name: "Steno Bernobic",
      role: "Avaliação Google",
      text: "Bom atendimento, produto excelente, bons preços. Facilidades em pagamento.",
    },
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);
  // Direção da troca: define de que lado o depoimento entra e sai.
  const [direction, setDirection] = React.useState(1);
  const [autoPlay, setAutoPlay] = React.useState(true);

  const goTo = React.useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setCurrentTestimonial(
        (index + testimonials.length) % testimonials.length,
      );
    },
    [testimonials.length],
  );

  const nextTestimonial = () => goTo(currentTestimonial + 1, 1);
  const prevTestimonial = () => goTo(currentTestimonial - 1, -1);

  // Avanço automático, pausado quando o cursor está sobre o carrossel.
  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [autoPlay, testimonials.length]);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative md:min-h-[800px] flex items-center overflow-hidden bg-surface py-10 md:py-0">
          {/* Halos decorativos que respiram atrás do conteúdo */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-secondary/5 rounded-full blur-3xl animate-float pointer-events-none"
            style={{ animationDelay: "-3s" }}
          />

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
            <Stagger
              className="lg:col-span-6 z-10 text-center lg:text-left"
              step={0.12}
            >
              <StaggerItem>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container mb-6">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-widest font-label">
                    Líder em Mato Grosso do Sul
                  </span>
                </div>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.95]">
                  A Referência em <br />
                  <span className="text-primary">Segurança Eletrônica</span> no
                  MS.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-body">
                  A maior distribuidora de tecnologia em segurança do estado.
                  Vigilância de precisão, monitoramento de alto padrão e
                  sistemas de proteção robustos para profissionais.
                </p>
              </StaggerItem>
              <StaggerItem className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <Link
                  href="/produtos"
                  className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {/* Borda em opacidade cheia: o `/30` anterior foi escrito contra um
                    token inexistente (a classe era descartada no build), então nunca
                    chegou a ser calibrado — a 30% o contorno ficaria invisível. */}
                <motion.button
                  onClick={() => (window.location.href = "/contato")}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: "spring", stiffness: 360, damping: 20 }}
                  className="px-8 py-4 border border-outline-variant text-primary rounded-lg font-bold text-lg hover:bg-surface-container-low hover:border-primary transition-colors"
                >
                  Entrar em Contato
                </motion.button>
              </StaggerItem>
            </Stagger>

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 relative h-[400px] md:h-[600px] w-full hidden sm:block"
            >
              <div className="absolute top-10 right-0 w-[80%] h-[80%] rounded-2xl overflow-hidden shadow-2xl z-0">
                <Image
                  alt="Tecnologia de Segurança Avançada"
                  className="w-full h-full object-cover"
                  src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute bottom-0 left-0 w-[90%] sm:w-[70%] p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-20 animate-float"
              >
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <span className="relative flex w-2.5 h-2.5">
                    <span
                      aria-hidden="true"
                      className="absolute inline-flex w-full h-full rounded-full bg-primary/60 animate-pulse-ring"
                    />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-primary" />
                  </span>
                  <Activity className="w-5 h-5" />
                  <span className="font-bold tracking-tighter font-headline uppercase text-sm">
                    Status em tempo real
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline text-on-surface mb-2 leading-none">
                  Monitoramento Ultra-HD
                </h3>
                <p className="text-xs md:text-sm text-on-surface-variant font-body">
                  Soluções de reconhecimento por IA e imagem térmica de última
                  geração para pronta entrega B2B.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-14 md:py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <Reveal className="flex flex-col md:flex-row justify-between items-end mb-10 md:mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-headline font-black tracking-tighter mb-4">
                  Presença Estratégica
                </h2>
                <p className="text-on-surface-variant max-w-md">
                  Nossa rede logística abrange todo o MS para garantir
                  atendimento rápido e suporte técnico em quatro hubs
                  principais.
                </p>
              </div>
              <div className="h-[2px] flex-grow bg-neutral-200 mx-8 hidden md:block mb-4"></div>
              <motion.div
                whileHover={{ rotate: 12, scale: 1.08 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                aria-hidden="true"
                className="hidden md:flex p-4 bg-white rounded-full items-center justify-center shadow-sm"
              >
                <MapPin className="text-primary w-6 h-6" />
              </motion.div>
            </Reveal>

            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((loc, i) => (
                <StaggerItem
                  key={i}
                  lift={8}
                  className="group relative bg-white p-6 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-neutral-200/60 transition-shadow duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="mb-6">
                    <h3 className="text-xl font-black font-headline mb-1">
                      Unidade {loc.name}
                    </h3>
                    <p className="text-primary font-bold text-[10px] tracking-widest font-label uppercase">
                      {loc.type}
                    </p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {loc.address && (
                      <a
                        href={(loc as any).mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-on-surface-variant hover:text-primary transition-colors group/maps"
                      >
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed underline-offset-2 group-hover/maps:underline">
                          {loc.address}
                        </span>
                      </a>
                    )}
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <PhoneCall className="w-4 h-4" />
                      <span className="text-xs">
                        {loc.phone}
                        {(loc as any).phone2 ? ` / ${(loc as any).phone2}` : ""}
                      </span>
                    </div>
                    {loc.whatsapp && (
                      <div className="flex items-center gap-3 text-secondary font-bold">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-xs">{loc.whatsapp}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <Clock className="w-4 h-4" />
                      <span className="text-xs">{loc.hours}</span>
                    </div>
                  </div>
                  <div className="w-full h-24 bg-neutral-50 rounded-lg overflow-hidden relative grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    {loc.img ? (
                      <Image
                        src={loc.img}
                        alt={loc.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 25vw"
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <Building2 className="w-10 h-10 text-neutral-300" />
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-12 md:py-16 bg-primary text-white relative overflow-hidden">
          {/* Halo lento atrás dos números */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-white/5 rounded-full blur-3xl animate-float pointer-events-none"
          />
          <Stagger className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {[
              { val: "15+", label: "Anos de Experiência" },
              { val: "500+", label: "Parceiros Ativos" },
              { val: "3k+", label: "Produtos em Estoque" },
              { val: "24/7", label: "Suporte Técnico" },
            ].map((stat, i) => (
              <StaggerItem key={i}>
                <CountUp
                  value={stat.val}
                  className="block text-4xl font-black font-headline mb-1 tabular-nums"
                />
                <div className="text-xs uppercase tracking-widest font-label opacity-70">
                  {stat.label}
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* Testimonials Carousel Section */}
        <section className="py-14 md:py-24 bg-surface-container-high overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
            <Reveal className="text-center mb-10 md:mb-16">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                Depoimentos
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-on-surface">
                Vozes de Quem Confia
              </h2>
            </Reveal>

            {/* O avanço automático pausa enquanto o cursor está sobre o bloco. */}
            <div
              className="relative max-w-4xl mx-auto"
              onMouseEnter={() => setAutoPlay(false)}
              onMouseLeave={() => setAutoPlay(true)}
            >
              {/* No celular as setas sairiam por cima do texto: viram uma
                  linha de controles abaixo, junto dos indicadores. */}
              <div className="hidden md:block absolute top-1/2 -left-16 -translate-y-1/2 z-20">
                <button
                  onClick={prevTestimonial}
                  aria-label="Depoimento anterior"
                  className="p-3 rounded-full bg-white shadow-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-neutral-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="hidden md:block absolute top-1/2 -right-16 -translate-y-1/2 z-20">
                <button
                  onClick={nextTestimonial}
                  aria-label="Próximo depoimento"
                  className="p-3 rounded-full bg-white shadow-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-neutral-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-white rounded-2xl md:rounded-3xl p-6 sm:p-10 md:p-16 shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative">
                <div className="absolute top-6 right-6 md:top-8 md:right-8 text-primary/10">
                  <Quote className="w-20 h-20 md:w-32 md:h-32 rotate-180" />
                </div>

                <div className="relative z-10">
                  {/* mode="wait": o depoimento anterior sai antes do próximo entrar,
                      e a direção acompanha o botão clicado. */}
                  <AnimatePresence mode="wait" custom={direction} initial={false}>
                    <motion.div
                      key={currentTestimonial}
                      custom={direction}
                      initial={{ opacity: 0, x: direction * 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: direction * -40 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                    <p className="text-base sm:text-lg md:text-2xl text-on-surface-variant font-body leading-relaxed mb-8 md:mb-10 italic">
                      &quot;{testimonials[currentTestimonial].text}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full border-2 border-primary/20 bg-primary/10 text-primary font-headline font-bold text-xl uppercase shrink-0">
                        {testimonials[currentTestimonial].name
                          .split(" ")
                          .slice(0, 2)
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h4 className="font-headline font-bold text-lg text-on-surface leading-tight">
                          {testimonials[currentTestimonial].name}
                        </h4>
                        <p className="text-sm text-primary font-bold font-label uppercase tracking-widest">
                          {testimonials[currentTestimonial].role}
                        </p>
                      </div>
                    </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 mt-8 md:mt-12">
                <button
                  onClick={prevTestimonial}
                  aria-label="Depoimento anterior"
                  className="tap-target md:hidden p-2.5 rounded-full bg-white shadow-lg text-primary active:scale-90 border border-neutral-100 flex items-center justify-center"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex justify-center gap-1">
                  {testimonials.map((_, i) => (
                    // O botão tem 40px de altura para o toque; o traço visível
                    // é o <span> interno.
                    <button
                      key={i}
                      aria-label={`Ver depoimento ${i + 1}`}
                      aria-current={i === currentTestimonial}
                      onClick={() => goTo(i, i > currentTestimonial ? 1 : -1)}
                      className="group h-10 px-1.5 flex items-center"
                    >
                      <span
                        className={`block h-2 rounded-full transition-all duration-300 group-hover:bg-primary/60 ${i === currentTestimonial ? "w-10 md:w-12 bg-primary" : "w-2 bg-neutral-300"}`}
                      />
                    </button>
                  ))}
                </div>

                <button
                  onClick={nextTestimonial}
                  aria-label="Próximo depoimento"
                  className="tap-target md:hidden p-2.5 rounded-full bg-white shadow-lg text-primary active:scale-90 border border-neutral-100 flex items-center justify-center"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
