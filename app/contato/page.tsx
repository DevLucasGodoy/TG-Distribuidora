'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'motion/react';
import {
  PhoneCall,
  Mail,
  Clock,
  MapPin,
  Send,
  Building2,
  MessageCircle,
  CheckCircle,
  X
} from 'lucide-react';
// Import estático de propósito: o texto do FAQ precisa sair no HTML
// pré-renderizado para o Google e os bots de IA lerem sem executar JS.
import FaqSection from '@/components/FaqSection';
import { Reveal, Stagger, StaggerItem } from '@/components/Motion';
const Navbar = dynamic(() => import('@/components/Navbar'), { ssr: false });
const Footer = dynamic(() => import('@/components/Footer'), { ssr: false });
const InteractiveMap = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => <div className="h-[320px] sm:h-[420px] md:h-[500px] w-full bg-neutral-100 animate-pulse rounded-2xl flex items-center justify-center font-bold text-neutral-400">Carregando Mapa...</div>
});

function SuccessBanner() {
  const searchParams = useSearchParams();
  const [dismissed, setDismissed] = useState(false);
  const showSuccess = !dismissed && searchParams.get('success') === 'true';

  useEffect(() => {
    if (searchParams.get('success') === 'true') {
      const timer = setTimeout(() => setDismissed(true), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (!showSuccess) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-4 bg-green-50 border border-green-200 rounded-lg px-6 py-4 shadow-lg">
        <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
        <div>
          <p className="font-bold text-green-900">Mensagem enviada com sucesso!</p>
          <p className="text-sm text-green-700">Entraremos em contato em até 24 horas úteis.</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="ml-4 text-green-600 hover:text-green-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
}

export default function ContatoPage() {
  const offices = [
    { name: 'Dourados', type: 'Matriz', address: 'R. Pedro Rigotti, 925 - Vila Santo André', mapsUrl: 'https://maps.google.com/?q=R.+Pedro+Rigotti,+925,+Vila+Santo+André,+Dourados,+MS', phone: '67 3032-3090', phone2: '67 3021-3150', whatsapp: '67 99958-3090', desc: 'Nossa matriz tecnológica, atendendo todo o cone sul com precisão técnica e suporte dedicado.', img: '/lojas/dourados.jpg' },
    { name: 'Campo Grande', type: 'Hub da Capital', address: 'Av. Salgado Filho, 1756', mapsUrl: 'https://maps.google.com/?q=Av.+Salgado+Filho,+1756,+Campo+Grande,+MS', phone: '67 3043-3090', phone2: '67 3042-3091', whatsapp: '67 99285-6510', desc: 'Logística estratégica e showroom de alta tecnologia para a capital do Mato Grosso do Sul.', img: '/lojas/campo-grande.jpg' },
    { name: 'Ponta Porã', type: 'Logística Fronteira', address: 'Av. Paraguai, 2310 - Centro', mapsUrl: 'https://maps.google.com/?q=Av.+Paraguai,+2310,+Centro,+Ponta+Porã,+MS', phone: '67 3431-6421', whatsapp: '67 99996-3043', desc: 'Ponto estratégico de distribuição e atendimento regional para a região de fronteira.', img: '/lojas/ponta-pora.jpg' },
    { name: 'Três Lagoas', type: 'Expansão Leste', address: 'R. Darcí Pio, 1333 - Santos Dumont', mapsUrl: 'https://maps.google.com/?q=R.+Darcí+Pio,+1333,+Santos+Dumont,+Três+Lagoas,+MS', phone: '67 99994-1447', whatsapp: '67 99994-1447', desc: 'Atendimento especializado para a região industrial e costa leste, garantindo agilidade no suporte.', img: '/lojas/tres-lagoas.jpg' }
  ];

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Suspense fallback={null}>
        <SuccessBanner />
      </Suspense>
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-5 sm:px-6 lg:px-8 py-10 md:py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center md:items-end">
          <Stagger className="lg:col-span-7 text-center lg:text-left" step={0.12}>
            <StaggerItem>
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Entre em Contato</span>
            </StaggerItem>
            <StaggerItem>
              <h1 className="font-headline text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter text-on-surface leading-[0.95] mb-8">
                O Hub da Rede <br/>de Segurança.
              </h1>
            </StaggerItem>
            <StaggerItem>
              <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Conectando tecnologia de segurança premium com instaladores especializados em todo o Centro-Sul do Brasil. Fale com nossos guardiões arquitetônicos hoje mesmo.
              </p>
            </StaggerItem>
          </Stagger>
          <Reveal className="lg:col-span-5 flex flex-col items-center lg:items-end" direction="left" delay={0.2}>
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
              className="bg-neutral-100 p-6 md:p-8 rounded-xl w-full max-w-sm text-center lg:text-right"
            >
              <p className="text-sm font-label text-on-surface-variant uppercase tracking-widest mb-2 font-bold">Linha Principal</p>
              <a className="text-2xl md:text-3xl font-headline font-extrabold text-primary hover:text-primary-container transition-colors" href="tel:6730323090">
                67 3032-3090
              </a>
            </motion.div>
          </Reveal>
        </section>

        {/* Offices Grid */}
        <section className="px-5 sm:px-6 lg:px-8 py-10 md:py-16 bg-surface-container-low">
          <div className="max-w-7xl mx-auto">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-headline font-bold mb-8 md:mb-12 flex items-center gap-4">
                <motion.span
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="w-12 h-[2px] bg-primary origin-left"
                />
                Sedes Regionais
              </h2>
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office, i) => (
                <StaggerItem
                  key={i}
                  lift={8}
                  className="group bg-white p-6 rounded-xl flex flex-col h-full hover:shadow-2xl transition-shadow duration-500"
                >
                  <div className="flex justify-between items-start mb-8">
                    <span className="bg-secondary-container text-on-secondary-container px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter">{office.type}</span>
                    <Building2 className="text-primary w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-headline font-bold mb-3">Unidade {office.name}</h3>
                  <p className="text-on-surface-variant text-sm mb-6 leading-relaxed flex-grow">
                    {office.desc}
                  </p>
                  <div className="pt-4 border-t border-neutral-100 space-y-2">
                    {(office as any).address && (
                      <a
                        href={(office as any).mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-sm font-medium text-tertiary hover:text-primary transition-colors group/maps"
                      >
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed underline-offset-2 group-hover/maps:underline">{(office as any).address}, {office.name}/MS</span>
                      </a>
                    )}
                    {(office as any).phone && (
                      <div className="flex items-center gap-3 text-sm font-medium text-on-surface-variant">
                        <PhoneCall className="w-4 h-4" />
                        <span className="text-xs">{(office as any).phone}{(office as any).phone2 ? ` / ${(office as any).phone2}` : ''}</span>
                      </div>
                    )}
                    {office.whatsapp && (
                      <div className="flex items-center gap-3 text-sm font-bold text-secondary">
                        <MessageCircle className="w-4 h-4" />
                        <span>{office.whatsapp}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 overflow-hidden rounded-lg h-32 relative bg-neutral-50">
                    {office.img ? (
                      <Image src={office.img} alt={office.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" referrerPolicy="no-referrer" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Building2 className="w-10 h-10 text-neutral-200" />
                      </div>
                    )}
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="px-5 sm:px-6 lg:px-8 pb-14 md:pb-24 max-w-7xl mx-auto">
          <Reveal className="text-center mb-12">
            <h2 className="text-3xl font-headline font-black tracking-tighter mb-4">Mapeamento da Rede</h2>
            <p className="text-on-surface-variant max-w-2xl mx-auto">
              Visualização geográfica das nossas unidades estratégicas no Mato Grosso do Sul.
            </p>
          </Reveal>
          <Reveal scale={0.97} distance={40}>
            <InteractiveMap />
          </Reveal>
        </section>

        {/* Contact Form */}
        <section className="px-5 sm:px-6 lg:px-8 py-16 md:py-32 max-w-7xl mx-auto relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary/5 rounded-full blur-3xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 relative z-10">
            <Reveal className="lg:col-span-5" direction="right" distance={40}>
              <h2 className="text-4xl font-headline font-extrabold mb-6 tracking-tight">Mensagem Direta</h2>
              <p className="text-on-surface-variant leading-relaxed mb-12">
                Se você procura suporte técnico ou deseja tornar-se um instalador parceiro, nossa equipe está pronta para responder em até 24 horas úteis.
              </p>
              <div className="space-y-8">
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Mail className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1 font-bold">E-mail</p>
                    <p className="font-headline font-bold text-lg">contato@tgdistribuidora.com.br</p>
                  </div>
                </div>
                <div className="group flex items-start gap-6">
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                    <Clock className="text-primary w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1 font-bold">Horário de Suporte</p>
                    <div className="space-y-1">
                      <p className="font-headline font-bold text-lg">Seg - Sex, 07:30 às 17:30</p>
                      <p className="font-headline font-bold text-lg">Sáb, 07:30 às 11:30</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
            <Reveal className="lg:col-span-7" direction="left" distance={40} delay={0.1}>
              <form action="https://formsubmit.co/contato@tgdistribuidora.com.br" method="POST" className="space-y-8 p-8 bg-white/50 backdrop-blur-lg rounded-2xl border border-neutral-100 shadow-xl">
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_next" value="https://tgdistribuidora.com.br/contato?success=true" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-1 font-bold">Nome Completo</label>
                    <input name="name" className="w-full bg-transparent border-0 border-b border-neutral-200 py-3 focus:ring-0 focus:border-primary transition-all" placeholder="Seu nome" type="text" required/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-1 font-bold">Endereço de E-mail</label>
                    <input name="email" className="w-full bg-transparent border-0 border-b border-neutral-200 py-3 focus:ring-0 focus:border-primary transition-all" placeholder="exemplo@empresa.com.br" type="email" required/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-1 font-bold">Assunto</label>
                  <select name="subject" className="w-full bg-transparent border-0 border-b border-neutral-200 py-3 focus:ring-0 focus:border-primary transition-all" required>
                    <option value="">Selecione um assunto...</option>
                    <option value="Dúvidas Gerais">Dúvidas Gerais</option>
                    <option value="Suporte Técnico">Suporte Técnico</option>
                    <option value="Nova Parceria">Nova Parceria</option>
                    <option value="Disponibilidade de Produto">Disponibilidade de Produto</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-label uppercase tracking-widest text-on-surface-variant px-1 font-bold">Sua Mensagem</label>
                  <textarea name="message" className="w-full bg-transparent border-0 border-b border-neutral-200 py-3 focus:ring-0 focus:border-primary transition-all resize-none" placeholder="Como podemos ajudar você hoje?" rows={4} required></textarea>
                </div>
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 360, damping: 20 }}
                  className="group relative w-full py-4 bg-primary text-white font-headline font-bold rounded-lg overflow-hidden shadow-lg shadow-primary/20"
                  type="submit"
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
                  />
                  <span className="relative">Enviar Mensagem Segura</span>
                </motion.button>
              </form>
            </Reveal>
          </div>
        </section>

        {/* Perguntas Frequentes — conteúdo espelhado no JSON-LD FAQPage
            declarado em app/contato/layout.tsx. */}
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
