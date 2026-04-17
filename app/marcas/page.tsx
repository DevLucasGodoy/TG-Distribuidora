'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  Menu, 
  X,
  Globe,
  Shield,
  Send,
  MoreHorizontal
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function MarcasPage() {
  const [activeFilter, setActiveFilter] = React.useState('Todos');

  const partners = [
    { name: 'Hikvision', category: 'CFTV', desc: 'Referência mundial em IA e CFTV, oferecendo o que há de mais avançado em monitoramento inteligente.', img: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=400' },
    { name: 'Intelbras', category: 'CFTV', desc: 'Líder no mercado brasileiro, com soluções integradas que vão da residência ao governo.', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=400' },
    { name: 'JFL Alarmes', category: 'Alarmes', desc: 'Líder no segmento de alarmes e cercas elétricas na América Latina, com tecnologia de ponta para intrusão.', img: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=400' },
    { name: 'AGL', category: 'Controle de Acesso', desc: 'Especialista em fechaduras elétricas, automação e controle de acesso com foco em praticidade e segurança.', img: 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=400' },
    { name: 'Telecam Cabos', category: 'Redes', desc: 'Excelência na fabricação de fios e cabos para sistemas de segurança e redes, garantindo integridade de sinal.', img: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400' },
    { name: 'TG Solar', category: 'Energia Solar', desc: 'Nossa linha própria de soluções fotovoltaicas, integrando tecnologia limpa à sua infraestrutura de segurança.', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&q=80&w=400' },
    { name: 'Vertys', category: 'Energia Solar', desc: 'Sistemas de energia solar de alta performance para projetos industriais e residenciais de grande porte.', img: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=400' },
    // 15 Placeholders
    ...Array.from({ length: 15 }).map((_, i) => ({
      name: `Parceiro Estratégico ${i + 1}`,
      category: ['CFTV', 'Controle de Acesso', 'Redes', 'Alarmes', 'Energia Solar'][i % 5],
      desc: 'Soluções complementares de alta qualidade homologadas pela TG Distribuidora.',
      img: ''
    }))
  ];

  const categories = ['Todos', 'CFTV', 'Controle de Acesso', 'Redes', 'Alarmes', 'Energia Solar'];

  const filteredPartners = activeFilter === 'Todos' 
    ? partners 
    : partners.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative py-12 md:py-24 overflow-hidden">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 space-y-6 text-center lg:text-left"
            >
              <span className="text-primary font-label tracking-[0.2em] text-xs font-bold uppercase">Excelência em Segurança</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-headline font-extrabold tracking-tighter text-on-surface leading-[1.1]">
                Marcas que <br/><span className="text-primary">Protegem o Futuro.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Nossa rede de parceiros é composta pelos líderes globais em tecnologia de monitoramento, controle de acesso e redes. Garantimos procedência e suporte técnico especializado para cada solução.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-5 relative hidden sm:block"
            >
              <div className="aspect-square rounded-xl overflow-hidden shadow-2xl rotate-3 scale-95 hover:rotate-0 hover:scale-100 transition-transform duration-700">
                <Image 
                  className="w-full h-full object-cover" 
                  src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1200"
                  fill
                  referrerPolicy="no-referrer"
                  alt="Infraestrutura de Segurança"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-secondary-container p-6 rounded-lg shadow-xl max-w-[200px]">
                <p className="text-on-secondary-container font-headline font-bold text-3xl leading-none">100%</p>
                <p className="text-on-secondary-container text-[10px] font-bold uppercase tracking-wider mt-1">Garantia de Originalidade</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-3xl font-headline font-bold text-on-surface mb-4">Nossa Curadoria Técnica</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveFilter(cat)}
                      className={`px-4 py-2 rounded-full text-xs font-bold font-label transition-all duration-300 ${
                        activeFilter === cat 
                          ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                          : 'bg-white text-on-surface-variant border border-neutral-100 hover:border-primary/30'
                      }`}
                    >
                      {cat.toUpperCase()}
                    </button>
                  ))}
                </div>
                <p className="text-on-surface-variant">Trabalhamos exclusivamente com fabricantes que definem os padrões da indústria de segurança eletrônica global.</p>
              </div>
              <div className="flex gap-4">
                <span className="flex items-center gap-2 text-tertiary font-label text-sm font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  DISTRIBUIDOR AUTORIZADO
                </span>
              </div>
            </div>

            <motion.div 
              layout
              className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {filteredPartners.map((partner, i) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={partner.name}
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-white p-8 rounded-xl border border-neutral-100 hover:shadow-2xl transition-all duration-500 cursor-pointer"
                >
                  <div className="h-20 flex items-center mb-6 grayscale group-hover:grayscale-0 transition-all relative">
                    {partner.img ? (
                      <Image 
                        src={partner.img} 
                        alt={partner.name}
                        width={160}
                        height={48}
                        className="max-h-12 w-auto object-contain transition-opacity duration-500"
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-neutral-50 rounded-lg text-[10px] font-bold text-neutral-300 font-label tracking-wide text-center">
                        LOGO EM BREVE
                      </div>
                    )}
                  </div>
                  <div className="mb-2">
                    <span className="text-[10px] font-bold font-label tracking-widest text-primary bg-primary/5 px-2 py-1 rounded">
                      {partner.category.toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-2">{partner.name}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{partner.desc}</p>
                  <div className="mt-6 flex items-center text-primary font-label text-[10px] font-bold tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                    VER PRODUTOS <ArrowRight className="ml-2 w-3 h-3" />
                  </div>
                </motion.div>
              ))}
              {activeFilter === 'Todos' && (
                <motion.div 
                  layout
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="group bg-white p-8 rounded-xl border border-neutral-100 hover:shadow-2xl transition-all duration-500 flex flex-col justify-center items-center text-center cursor-pointer"
                >
                  <MoreHorizontal className="w-10 h-10 text-neutral-300 mb-4 group-hover:text-primary transition-colors" />
                  <h3 className="text-lg font-headline font-bold mb-1">E muito mais</h3>
                  <p className="text-xs text-on-surface-variant">Consulte nosso catálogo completo para marcas especializadas.</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>

        {/* Why Partners Section */}
        <section className="py-32 relative">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-20">
            <div className="space-y-12">
              <h2 className="text-4xl font-headline font-extrabold tracking-tight">Por que ser um parceiro <span className="text-primary">TG Distribuidora?</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Homologação Técnica', desc: 'Não somos apenas vendedores. Nossos engenheiros testam cada equipamento antes de entrar no portfólio.', icon: ShieldCheck, bg: 'bg-primary/10', color: 'text-primary' },
                  { title: 'Suporte Nível Especialista', desc: 'Acesso direto ao suporte técnico de fábrica e treinamento exclusivo para instaladores parceiros.', icon: PhoneCall, bg: 'bg-tertiary/10', color: 'text-tertiary' },
                  { title: 'Estoque Estratégico', desc: 'Pronta entrega para as principais lines, garantindo que seu projeto não sofra atrasos logísticos.', icon: Shield, bg: 'bg-secondary/10', color: 'text-secondary' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className={`w-12 h-12 rounded ${item.bg} flex items-center justify-center flex-shrink-0`}>
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-headline font-bold text-lg mb-2">{item.title}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-neutral-100 p-4 rounded-xl">
                <Image 
                  className="rounded-lg shadow-lg w-full object-cover aspect-[4/5]" 
                  src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1200"
                  fill
                  referrerPolicy="no-referrer"
                  alt="Suporte Técnico Especializado"
                />
              </div>
              <div className="absolute top-10 -right-4 bg-tertiary text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3">
                <Shield className="w-5 h-5" />
                <div className="text-[10px] font-bold font-label tracking-widest uppercase">Padrão de Segurança Nível 5</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
