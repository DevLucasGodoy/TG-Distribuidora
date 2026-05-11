"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  MessageCircle,
  Zap,
  Lock,
  Wifi,
  Video,
  Database,
} from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProdutosPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-surface flex items-center justify-center">Carregando...</div>}>
      <ProdutosPageContent />
    </Suspense>
  );
}

function ProdutosPageContent() {
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [activeBrand, setActiveBrand] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  React.useEffect(() => {
    const brandParam = searchParams.get("brand");
    if (brandParam) {
      setActiveBrand(brandParam);
    }
  }, [searchParams]);

  const categories = [
    { name: "Todos", icon: Database },
    { name: "CFTV", icon: Video },
    { name: "Alarmes", icon: ShieldCheck },
    { name: "Controle de Acesso", icon: Lock },
    { name: "Automatização", icon: Zap },
    { name: "Cabos e Redes", icon: Wifi },
    { name: "Fontes e Energia", icon: Zap },
    { name: "Acessórios", icon: ShieldCheck },
  ];

  const products = [
    {
      id: 1,
      name: "Câmera IP Speed Dome Ultra",
      category: "CFTV",
      brand: "Hikvision",
      desc: "Câmeras IP com zoom óptico 32x, visão noturna laser e rastreamento inteligente com IA.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "Gravador NVR 32 Canais",
      category: "CFTV",
      brand: "Hikvision",
      desc: "Suporte a resolução 4K, reconhecimento facial e compressão inteligente.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      name: "Central de Alarme Inteligente",
      category: "Alarmes",
      brand: "JFL",
      desc: "Gerenciamento via app, 20 zonas de proteção e discadora integrada.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      name: "Sensor de Presença sem Fio",
      category: "Alarmes",
      brand: "JFL",
      desc: "Detector infravermelho com tecnologia sem fio de longo alcance.",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 5,
      name: "Fechadura Biométrica Profissional",
      category: "Controle de Acesso",
      brand: "AGL",
      desc: "Abertura por digital, senha, cartão RFID e Bluetooth.",
      img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 6,
      name: "Interfone Eletrônico Vídeo",
      category: "Controle de Acesso",
      brand: "AGL",
      desc: "Vídeo porteiro com câmera integrada e comunicação em tempo real.",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 7,
      name: "Motor para Portão Automático",
      category: "Automatização",
      brand: "Garen",
      desc: "Abertura e fechamento automático com controle remoto e fotocélula.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 8,
      name: "Motor Residencial para Portão",
      category: "Automatização",
      brand: "Rossi",
      desc: "Automatizador com kits completos de instalação e acessórios.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 9,
      name: "Cabo Coaxial HD 95% Malha",
      category: "Cabos e Redes",
      brand: "MPT Cabos",
      desc: "Blindagem tripla para transmissões de vídeo em alta definição.",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 10,
      name: "Cabo de Rede CAT6 Profissional",
      category: "Cabos e Redes",
      brand: "Condutti",
      desc: "Fios e cabos especiais para segurança eletrônica de alta qualidade.",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 11,
      name: "Fonte Chaveada 12V 10A",
      category: "Fontes e Energia",
      brand: "FC Fontes",
      desc: "Alimentação estabilizada para sistemas CFTV e alarmes.",
      img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 12,
      name: "Distribuidor de Energia 8 Canais",
      category: "Fontes e Energia",
      brand: "FC Fontes",
      desc: "Distribuição de energia com proteção contra picos.",
      img: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 13,
      name: "Haste de Aterramento Industrial",
      category: "Acessórios",
      brand: "Confiseg",
      desc: "Proteção contra surtos com hastes convencionais e cantoneira.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 14,
      name: "Base e Suporte para Câmera",
      category: "Acessórios",
      brand: "Inove",
      desc: "Suportes e bases para fixação de câmeras e sensores.",
      img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 15,
      name: "Trava Elétrica com Fechadura",
      category: "Controle de Acesso",
      brand: "Trava Tec",
      desc: "Sistema de trancamento eletrônico com fechos magnéticos.",
      img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 16,
      name: "Cercas Elétricas de Proteção",
      category: "Acessórios",
      brand: "Líder",
      desc: "Proteção perimetral com tecnologia de choque controlado.",
      img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "Todos" || p.category === activeCategory;
    const matchesBrand = !activeBrand || p.brand === activeBrand;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-24 pb-32">
        {/* Header Section */}
        <section className="bg-surface-container-low px-8 py-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-2xl text-center md:text-left">
              <span className="text-secondary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
                Catálogo de Produtos
              </span>
              <h1 className="text-4xl md:text-6xl font-headline font-black tracking-tighter text-on-surface mb-6">
                Equipamento <span className="text-primary">Homologado.</span>
              </h1>
              <p className="text-on-surface-variant text-lg">
                Produtos de alta performance com garantia nacional e suporte
                técnico dedicado. O portfólio completo para instaladores
                profissionais.
              </p>
            </div>
            <div className="w-full max-w-md">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  placeholder="Buscar por produto ou marca..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-neutral-100 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Categories Bar */}
        <div className="sticky top-[80px] z-40 bg-surface/95 backdrop-blur-md border-b border-neutral-200 shadow-sm px-8">
          <div className="max-w-7xl mx-auto py-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 shrink-0">
                <Filter className="w-5 h-5 text-neutral-500" />
                <span className="text-xs font-bold font-label text-neutral-600 uppercase tracking-wider">Filtrar</span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold font-label transition-all duration-200 group ${
                      activeCategory === cat.name
                        ? "bg-primary text-white shadow-lg shadow-primary/30"
                        : "bg-white text-on-surface-variant border border-neutral-200 hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    <cat.icon className={`w-4 h-4 transition-transform ${activeCategory === cat.name ? "" : "group-hover:scale-110"}`} />
                    {cat.name.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <section className="px-8 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-headline font-bold text-on-surface">
                  {activeCategory}{" "}
                  <span className="text-neutral-300 ml-2 font-normal">
                    ({filteredProducts.length} itens)
                  </span>
                </h2>
                {activeBrand && (
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-label text-primary bg-primary/10 px-3 py-1 rounded-full">
                      Marca: {activeBrand}
                    </span>
                    <button
                      onClick={() => setActiveBrand(null)}
                      className="text-xs font-bold text-neutral-500 hover:text-primary transition-colors"
                    >
                      ✕ Limpar
                    </button>
                  </div>
                )}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    key={product.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm hover:shadow-2xl transition-all duration-500"
                  >
                    <div className="relative h-56 w-full bg-neutral-50 overflow-hidden">
                      <Image
                        src={product.img}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold font-label uppercase tracking-widest text-primary shadow-sm border border-neutral-100">
                          {product.brand}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-headline font-bold text-on-surface group-hover:text-primary transition-colors">
                          {product.name}
                        </h3>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed mb-6 line-clamp-2">
                        {product.desc}
                      </p>
                      <button className="w-full py-3 bg-surface-container-low hover:bg-primary hover:text-white text-primary font-bold text-xs uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2">
                        Ver Detalhes
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProducts.length === 0 && (
              <div className="py-32 text-center text-on-surface-variant italic">
                Nenhum produto encontrado nesta categoria ou busca.
              </div>
            )}
          </div>
        </section>

        {/* Portal B2B — CTA Contato */}
        <section className="px-8 mt-32">
          <div className="max-w-7xl mx-auto bg-primary rounded-[2.5rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mr-48 -mt-48" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter mb-8 leading-tight">
                  Quer se tornar um <br />
                  <span className="text-secondary-container">Parceiro ?</span>
                </h2>
                <ul className="space-y-4 mb-10">
                  {[
                    "Estoque em tempo real em todas as unidades",
                    "Preços negociados para revenda e instalação",
                    "Suporte técnico priorizado 24/7",
                    "Linha de crédito e faturamento direto",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <ShieldCheck className="w-5 h-5 shrink-0 text-secondary-container" />
                      <span className="text-lg font-body opacity-90">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-3 px-10 py-5 bg-white text-primary rounded-xl font-bold text-lg hover:bg-secondary-container transition-all"
                >
                  <MessageCircle className="w-5 h-5" />
                  Entre em Contato
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="relative h-[400px] hidden lg:block rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=800"
                  alt="Equipe de parceiros B2B em reunião de negócios"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-primary/20" />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
