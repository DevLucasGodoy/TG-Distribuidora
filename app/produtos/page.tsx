"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
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
  const [activeCategory, setActiveCategory] = React.useState("Todos");
  const [searchQuery, setSearchQuery] = React.useState("");

  const categories = [
    { name: "Todos", icon: Database },
    { name: "CFTV", icon: Video },
    { name: "Controle de Acesso", icon: Lock },
    { name: "Redes", icon: Wifi },
    { name: "Alarmes", icon: ShieldCheck },
    { name: "Energia Solar", icon: Zap },
  ];

  const products = [
    {
      id: 1,
      name: "Câmera IP Speed Dome Ultra",
      category: "CFTV",
      brand: "Hikvision",
      desc: "Zoom óptico de 32x, visão noturna laser de 200m e rastreamento inteligente com IA.",
      img: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 2,
      name: "Gravador NVR Inteligente 32ch",
      category: "CFTV",
      brand: "Intelbras",
      desc: "Suporte a resolução 4K, reconhecimento facial e compressão de vídeo H.265+.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 3,
      name: "Fechadura Biométrica Profissional",
      category: "Controle de Acesso",
      brand: "AGL",
      desc: "Abertura por digital, senha, cartão RFID e app via Bluetooth.",
      img: "https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 4,
      name: "Central de Alarme Cloud 20",
      category: "Alarmes",
      brand: "JFL Alarmes",
      desc: "Gerenciamento total via aplicativo, 20 zonas e discadora integrada.",
      img: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 5,
      name: "Switch Gerenciável 24 Portas PoE",
      category: "Redes",
      brand: "TP-Link",
      desc: "Ideal para infraestrutura IP, com alta largura de banda e alimentação PoE.",
      img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 6,
      name: "Inversor Solar On-Grid 5KW",
      category: "Energia Solar",
      brand: "TG Solar",
      desc: "Eficiência superior a 98%, monitoramento remoto via Wi-Fi e garantia estendida.",
      img: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 7,
      name: "Painel Monocristalino 550W",
      category: "Energia Solar",
      brand: "Vertys",
      desc: "Células Half-cut de alta densidade, resistência máxima a condições climáticas.",
      img: "https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=600",
    },
    {
      id: 8,
      name: "Cabo Coaxial HD 95% Malha",
      category: "Redes",
      brand: "Telecam Cabos",
      desc: "Blindagem tripla, ideal para transmissões de vídeo em alta definição sem interferências.",
      img: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=600",
    },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      activeCategory === "Todos" || p.category === activeCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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
        <div className="sticky top-[80px] z-40 bg-surface/80 backdrop-blur-md border-b border-neutral-100 px-8">
          <div className="max-w-7xl mx-auto flex items-center gap-4 py-4 overflow-x-auto no-scrollbar">
            <Filter className="w-5 h-5 text-neutral-400 shrink-0 mr-2" />
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold font-label whitespace-nowrap transition-all ${
                  activeCategory === cat.name
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "bg-white text-on-surface-variant border border-neutral-100 hover:border-primary/50"
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <section className="px-8 mt-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-headline font-bold text-on-surface">
                {activeCategory}{" "}
                <span className="text-neutral-300 ml-2 font-normal">
                  ({filteredProducts.length} itens)
                </span>
              </h2>
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
