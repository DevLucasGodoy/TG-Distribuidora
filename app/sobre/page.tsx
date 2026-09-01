'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Users, 
  Building2, 
  ShieldCheck, 
  Activity, 
  MapPin 
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Reveal,
  Stagger,
  StaggerItem,
  CountUp,
  Parallax,
} from '@/components/Motion';

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative min-h-[380px] md:h-[600px] flex items-center overflow-hidden bg-surface-container-low py-14 md:py-0">
          <div className="absolute inset-0 z-0">
            <Image 
              className="w-full h-full object-cover opacity-30 grayscale mix-blend-multiply" 
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
              fill
              sizes="100vw"
              referrerPolicy="no-referrer"
              alt="Centro de Distribuição TG"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/80 to-transparent"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 w-full">
            <Stagger className="max-w-2xl text-center md:text-left" step={0.12}>
              <StaggerItem>
                <span className="inline-block text-secondary font-label tracking-[0.2em] mb-4 font-bold text-sm uppercase">Arquitetos da Segurança</span>
              </StaggerItem>
              <StaggerItem>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold text-on-surface tracking-tighter leading-[1.1] mb-6">
                  Pioneirismo e <span className="text-primary">Excelência</span> no Atacado de Tecnologia em Segurança.
                </h1>
              </StaggerItem>
              <StaggerItem>
                <p className="text-base sm:text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 border-l-4 border-primary pl-6 mx-auto md:mx-0">
                  Unindo tecnologia de classe mundial às demandas regionais com uma equipe de mais de 150 profissionais especializados.
                </p>
              </StaggerItem>
            </Stagger>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-14 md:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { val: '150+', label: 'Profissionais dedicados impulsionando nossas operações diariamente.', icon: Users, color: 'text-secondary', border: 'border-secondary' },
                { val: '4+ Unidades', label: 'Escritórios estrategicamente localizados em Dourados, Campo Grande, Ponta Porã e Três Lagoas.', icon: Building2, color: 'text-primary', border: 'border-primary' },
                { val: '20+ Anos', label: 'Duas décadas de confiabilidade inigualável no setor de distribuição.', icon: ShieldCheck, color: 'text-tertiary', border: 'border-tertiary' }
              ].map((stat, i) => (
                <StaggerItem
                  key={i}
                  lift={8}
                  className={`group bg-white p-7 sm:p-10 rounded-xl shadow-sm hover:shadow-xl hover:shadow-neutral-200/60 transition-shadow duration-500 border-b-4 ${stat.border}`}
                >
                  <stat.icon className={`w-10 h-10 ${stat.color} mb-4 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`} />
                  <CountUp
                    value={stat.val}
                    className="block text-4xl font-headline font-extrabold text-on-surface mb-2 tabular-nums"
                  />
                  <p className="text-on-surface-variant font-medium">{stat.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>

        {/* History Section */}
        <section className="py-14 md:py-24 bg-surface-container-low overflow-hidden">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <Parallax className="w-full md:w-1/2 relative" distance={40}>
              <div className="group aspect-square bg-neutral-200 rounded-2xl overflow-hidden shadow-2xl relative z-10">
                <Image
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-105"
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1200"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  referrerPolicy="no-referrer"
                  alt="Equipe Técnica TG"
                />
              </div>
              <div className="absolute -top-10 -left-10 w-48 h-48 bg-secondary/10 rounded-full blur-3xl animate-float"></div>
              <div
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"
                style={{ animationDelay: '-3s' }}
              ></div>
            </Parallax>
            <Reveal className="w-full md:w-1/2" direction="left" distance={40}>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-8 tracking-tight">Legado de Confiança</h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>Fundada nos princípios de integridade e precisão técnica, a TG Distribuidora evoluiu de um fornecedor local para uma potência regional no atacado de tecnologia de segurança.</p>
                <p>Nossa jornada é definida por um foco implacável no setor B2B, garantindo que integradores de segurança e empresas tenham acesso contínuo às soluções de proteção mais avançadas do mundo.</p>
                <p className="font-semibold text-primary">Não distribuímos apenas equipamentos; entregamos a infraestrutura para um amanhã mais seguro.</p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 md:py-32 bg-surface">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <Reveal className="max-w-xl mb-10 md:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold text-on-surface mb-4">Nossos Valores</h2>
              <p className="text-base sm:text-lg md:text-xl text-on-surface-variant">Os pilares arquitetônicos que sustentam cada transação e relacionamento na TG Distribuidora.</p>
            </Reveal>
            <Stagger className="grid grid-cols-1 md:grid-cols-12 gap-6" step={0.12}>
              <StaggerItem className="md:col-span-8 group relative overflow-hidden rounded-2xl h-[400px] bg-neutral-900">
                <Image 
                  className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" 
                  src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200"
                  fill
                  sizes="(max-width: 768px) 100vw, 66vw"
                  referrerPolicy="no-referrer"
                  alt="Infraestrutura Tecnológica"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 sm:p-9 md:p-12">
                  <span className="text-secondary-container font-label tracking-widest text-sm mb-4 block uppercase font-bold">Pilar 01</span>
                  <h3 className="text-4xl font-headline font-bold text-white mb-4">Confiabilidade</h3>
                  <p className="text-neutral-300 text-lg max-w-lg">Parcerias sólidas construídas sobre 20 anos de consistência e precisão logística.</p>
                </div>
              </StaggerItem>
              <StaggerItem className="md:col-span-4 group bg-neutral-100 p-7 sm:p-10 md:p-12 rounded-2xl flex flex-col justify-between">
                <div className="bg-tertiary w-16 h-16 rounded-lg flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
                  <ShieldCheck className="text-white w-8 h-8" />
                </div>
                <div>
                  <span className="text-tertiary font-label tracking-widest text-sm mb-4 block uppercase font-bold">Pilar 02</span>
                  <h3 className="text-3xl font-headline font-bold text-on-surface mb-4">Tecnologia</h3>
                  <p className="text-on-surface-variant">Curadoria constante das últimas inovações em vigilância e controle de acesso.</p>
                </div>
              </StaggerItem>
              <StaggerItem className="md:col-span-12 bg-primary p-7 sm:p-10 md:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 text-white relative overflow-hidden">
                <div className="w-full md:w-1/3">
                  <span className="text-white/60 font-label tracking-widest text-sm mb-4 block uppercase font-bold">Pilar 03</span>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-headline font-extrabold mb-4">Excelência</h2>
                </div>
                <div className="w-full md:w-2/3">
                  <p className="text-xl text-white/80 leading-relaxed italic">&quot;Excelência não é um ato, mas um hábito. Na distribuição de segurança, não há margem para erros. Buscamos a perfeição em cada entrega, cada suporte e cada parceria.&quot;</p>
                </div>
                <div
                  aria-hidden="true"
                  className="absolute -right-20 -top-20 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-float pointer-events-none"
                />
              </StaggerItem>
            </Stagger>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
