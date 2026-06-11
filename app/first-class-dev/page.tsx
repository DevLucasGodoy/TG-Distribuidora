'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
  ArrowUpRight,
  Code2,
  Gauge,
  Globe2,
  Handshake,
  Heart,
  Layers,
  Mail,
  MessageCircle,
  MousePointerClick,
  Palette,
  Rocket,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const SITE_URL = 'https://www.firstclassdev.com.br';
const WHATSAPP_URL = 'https://wa.me/5519996168818';
const EMAIL = 'contato@firstclassdev.com.br';

// Paleta oficial First Class Dev (Forest) — intencional, não usar tokens TG aqui
const BRAND = '#10b981';
const BRAND_DEEP = '#0d8f64';
const BG_DARK = '#0a120e';
const BG_DARK_ALT = '#0f1a14';

function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden>
      <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="20" cy="20" rx="18" ry="6" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="20" cy="20" rx="6" ry="18" stroke="currentColor" strokeWidth="1.2" />
      <ellipse cx="20" cy="20" rx="18" ry="12" stroke="currentColor" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

const conversionPillars = [
  {
    icon: Gauge,
    title: 'Rápido e encontrável',
    desc: 'Performance e SEO técnico para o cliente certo chegar até você pelo Google — antes de chegar ao concorrente.',
  },
  {
    icon: MousePointerClick,
    title: 'Desenhado para converter',
    desc: 'Hierarquia visual, prova social e CTAs estratégicos que guiam o visitante, passo a passo, até o botão de contato.',
  },
  {
    icon: MessageCircle,
    title: 'Direto para a venda',
    desc: 'Caminho curto: em poucos cliques o visitante vira uma conversa no seu WhatsApp ou um orçamento na sua caixa de entrada.',
  },
  {
    icon: TrendingUp,
    title: 'Feito para crescer',
    desc: 'Estrutura pronta para campanhas, métricas e otimização contínua — o site melhora de conversão a cada mês.',
  },
];

const stats = [
  { val: '2021', label: 'Ano de fundação — clientes que caminham conosco desde o início' },
  { val: '20+', label: 'Projetos entregues para PMEs no Brasil e no exterior' },
  { val: '11', label: 'Produtos SaaS próprios em operação' },
  { val: '3', label: 'Países atendidos: Brasil, Estados Unidos e Argentina' },
];

const fronts = [
  {
    icon: Layers,
    title: 'SaaS',
    desc: 'Produtos prontos para usar, com assinatura mensal e sem instalação. Onze soluções cobrindo mercados diferentes.',
  },
  {
    icon: Code2,
    title: 'Dev',
    desc: 'Sistemas, portais e aplicações web sob medida, que se encaixam no processo do cliente e escalam com ele.',
  },
  {
    icon: Palette,
    title: 'Brand',
    desc: 'Identidade visual, sites, landing pages e lojas pensados para converter: cada pixel guia o visitante até o contato.',
  },
];

const products = [
  { name: 'Radar B3', desc: 'Análise do mercado financeiro com sinais, dashboards e alertas' },
  { name: 'Servix', desc: 'Gestão de ordens de serviço para equipes técnicas' },
  { name: 'FC Noivos', desc: 'Planejamento completo de casamentos' },
  { name: 'FC Chef', desc: 'Receitas, lista de compras e cardápio semanal' },
  { name: 'First Care', desc: 'Atendimento ao cliente multicanal com IA' },
  { name: 'FC Converter', desc: 'Conversão de arquivos 100% no navegador, sem upload' },
  { name: 'First Class Insight', desc: 'Conteúdo executivo: resumos, cursos e estudos de caso' },
  { name: 'FC Academy', desc: 'Escola de tecnologia com projetos reais' },
  { name: 'FC Moments', desc: 'Gestão de eventos e momentos especiais' },
  { name: 'Velaris', desc: 'ERP completo para PMEs' },
  { name: 'Syncro', desc: 'Integração e automação de sistemas sem código' },
];

const values = [
  {
    icon: Heart,
    title: 'Cliente em primeiro lugar',
    desc: 'Não entregamos código. Entregamos resultado. Se não resolve o problema, não está pronto.',
  },
  {
    icon: Sparkles,
    title: 'Simples vence',
    desc: 'Buscamos a solução mais simples que resolve. Complexidade desnecessária é dívida técnica.',
  },
  {
    icon: Handshake,
    title: 'Parceiros de longo prazo',
    desc: 'Construímos relações, não transações.',
  },
];

export default function FirstClassDevPage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-[#10b981]/20">
      <Navbar />

      <main className="pt-24">
        {/* Hero — identidade First Class Dev */}
        <section
          className="relative overflow-hidden text-white"
          style={{ background: `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_DARK_ALT} 100%)` }}
        >
          <div
            className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl"
            style={{ background: 'rgba(16, 185, 129, 0.18)' }}
          />
          <div
            className="absolute -bottom-40 -left-24 w-80 h-80 rounded-full blur-3xl"
            style={{ background: 'rgba(16, 185, 129, 0.10)' }}
          />

          <div className="relative z-10 max-w-7xl mx-auto px-8 py-24 md:py-32 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              style={{ color: BRAND }}
            >
              <LogoMark className="h-20 w-20 md:h-24 md:w-24" />
            </motion.div>

            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-8 inline-block font-label font-bold text-xs md:text-sm uppercase tracking-[0.25em]"
              style={{ color: BRAND }}
            >
              Quem construiu este site
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="mt-4 text-4xl sm:text-5xl md:text-6xl font-headline font-extrabold tracking-tighter leading-[1.1] max-w-3xl"
            >
              First Class Dev
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-6 text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl"
            >
              O estúdio de tecnologia que transforma o seu site em uma{' '}
              <strong className="text-white">máquina de conversão de novos clientes</strong>. Desde 2021,
              criamos SaaS, sites, lojas e sistemas sob medida que fazem pequenas e médias empresas
              venderem mais — no Brasil e no exterior.
            </motion.p>

            {/* Botão em destaque — CTA principal */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-10 flex flex-col sm:flex-row items-center gap-4"
            >
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg md:text-xl text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
                style={{
                  background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DEEP} 100%)`,
                  boxShadow: '0 20px 50px -12px rgba(16, 185, 129, 0.35)',
                }}
              >
                <Globe2 className="w-6 h-6" />
                Conheça a First Class Dev
                <ArrowUpRight className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl font-bold text-white/90 border border-white/20 hover:bg-white/10 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" style={{ color: BRAND }} />
                Falar no WhatsApp
              </a>
            </motion.div>
          </div>
        </section>

        {/* Máquina de conversão */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mb-16"
            >
              <span
                className="inline-block font-label font-bold text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: BRAND_DEEP }}
              >
                Nossa especialidade
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-6">
                Seu site, uma{' '}
                <span style={{ color: BRAND_DEEP }}>máquina de conversão</span> de novos clientes
              </h2>
              <p className="text-xl text-on-surface-variant leading-relaxed">
                Site bonito não basta. Cada projeto que entregamos é desenhado para um único objetivo:
                transformar visitantes em contatos e contatos em clientes. Design, conteúdo, velocidade e
                tecnologia trabalhando juntos para vender.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {conversionPillars.map((pillar, i) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-8 rounded-2xl bg-surface border border-neutral-200 hover:border-[#10b981]/40 hover:shadow-lg transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                    style={{ background: 'rgba(16, 185, 129, 0.12)' }}
                  >
                    <pillar.icon className="w-6 h-6" style={{ color: BRAND_DEEP }} />
                  </div>
                  <h3 className="text-lg font-headline font-bold text-on-surface mb-2">{pillar.title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{pillar.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-10 p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6"
              style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)' }}
            >
              <p className="text-lg text-on-surface font-medium text-center md:text-left">
                Este site da TG Distribuidora que você está navegando agora?{' '}
                <strong style={{ color: BRAND_DEEP }}>Foi construído exatamente assim.</strong>
              </p>
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex shrink-0 items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DEEP} 100%)` }}
              >
                Quero um site assim
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 bg-surface">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.val}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-8 rounded-xl shadow-sm border-b-4"
                style={{ borderBottomColor: BRAND }}
              >
                <h3 className="text-4xl font-headline font-extrabold mb-2" style={{ color: BRAND_DEEP }}>
                  {stat.val}
                </h3>
                <p className="text-on-surface-variant text-sm font-medium leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* História */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <span
                className="inline-block font-label font-bold text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: BRAND_DEEP }}
              >
                A história
              </span>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-8 tracking-tight">
                Começou com um incômodo
              </h2>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  A First Class Dev nasceu em 2021, da inquietação de um desenvolvedor que via, todos os
                  dias, pequenas e médias empresas travadas por processos manuais, planilhas infinitas e
                  softwares de prateleira que nunca se encaixavam de verdade.
                </p>
                <p className="font-semibold" style={{ color: BRAND_DEEP }}>
                  A pergunta era simples: e se a tecnologia se adaptasse ao negócio — e não o contrário?
                </p>
                <p>
                  Foi com essa ideia que <strong className="text-on-surface">Lucas Godoy</strong>, fundador
                  e CEO, abriu a First Class Dev. Engenheiro de software com experiência em sistemas web,
                  integrações com ERPs e arquiteturas na nuvem, ele queria provar que dava para entregar
                  tecnologia de alto nível com proximidade, agilidade e foco em resultado.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full md:w-1/2"
            >
              <h3 className="text-2xl font-headline font-extrabold text-on-surface mb-6 tracking-tight">
                Da estratégia ao código
              </h3>
              <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
                <p>
                  Desde o primeiro projeto, a forma de trabalhar é a mesma:{' '}
                  <strong className="text-on-surface">
                    entender o problema antes de escrever a primeira linha de código
                  </strong>
                  . Mergulhamos no negócio do cliente, mapeamos processos e só então propomos a solução.
                  Tecnologia é meio; o resultado do cliente é o fim.
                </p>
                <p>
                  Esse jeito de trabalhar rendeu mais de 20 projetos entregues e clientes que caminham
                  conosco desde 2021 — porque construímos relações de longo prazo, não transações.
                </p>
                <p>
                  Operamos 100% online, atendendo clientes em todo o Brasil e no exterior — em português,
                  inglês e espanhol.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Três frentes */}
        <section className="py-24" style={{ background: BG_DARK }}>
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-xl mb-16">
              <span
                className="inline-block font-label font-bold text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: BRAND }}
              >
                O que fazemos
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-white tracking-tight">
                Três frentes que se completam
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {fronts.map((front, i) => (
                <motion.div
                  key={front.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-2xl border border-white/10 hover:border-[#10b981]/50 transition-colors"
                  style={{ background: BG_DARK_ALT }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(16, 185, 129, 0.15)' }}
                  >
                    <front.icon className="w-7 h-7" style={{ color: BRAND }} />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-white mb-3">{front.title}</h3>
                  <p className="text-white/60 leading-relaxed">{front.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Produtos próprios */}
        <section className="py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-2xl mb-16">
              <span
                className="inline-block font-label font-bold text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: BRAND_DEEP }}
              >
                Produtos próprios
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
                11 SaaS nascidos de problemas reais
              </h2>
              <p className="text-xl text-on-surface-variant">
                Cada um é a prova viva da nossa engenharia — cobrindo mercados diferentes, do financeiro a
                eventos.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {products.map((product, i) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.06 }}
                  className="group bg-white p-6 rounded-xl border border-neutral-200 hover:shadow-lg hover:border-[#10b981]/40 transition-all"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Rocket
                      className="w-4 h-4 shrink-0 group-hover:-translate-y-0.5 transition-transform"
                      style={{ color: BRAND }}
                    />
                    <h3 className="font-headline font-bold text-on-surface">{product.name}</h3>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{product.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-8">
            <div className="max-w-xl mb-16">
              <span
                className="inline-block font-label font-bold text-sm uppercase tracking-[0.2em] mb-4"
                style={{ color: BRAND_DEEP }}
              >
                No que acreditamos
              </span>
              <h2 className="text-4xl md:text-5xl font-headline font-extrabold text-on-surface tracking-tight">
                Nossos valores
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-2xl bg-surface border border-neutral-200"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6"
                    style={{ background: 'rgba(16, 185, 129, 0.12)' }}
                  >
                    <value.icon className="w-7 h-7" style={{ color: BRAND_DEEP }} />
                  </div>
                  <h3 className="text-xl font-headline font-bold text-on-surface mb-3">{value.title}</h3>
                  <p className="text-on-surface-variant leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section
          className="py-24 text-white"
          style={{ background: `linear-gradient(160deg, ${BG_DARK} 0%, ${BG_DARK_ALT} 100%)` }}
        >
          <div className="max-w-4xl mx-auto px-8 text-center">
            <div className="flex justify-center mb-8" style={{ color: BRAND }}>
              <LogoMark className="h-14 w-14" />
            </div>
            <h2 className="text-4xl md:text-5xl font-headline font-extrabold tracking-tight mb-6">
              Vamos conversar?
            </h2>
            <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Se a sua empresa quer um site que transforma visitantes em clientes, a conversa começa
              aqui. O próximo capítulo da First Class Dev pode incluir o seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={SITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white transition-all hover:scale-105 active:scale-95"
                style={{ background: `linear-gradient(135deg, ${BRAND} 0%, ${BRAND_DEEP} 100%)` }}
              >
                <Globe2 className="w-5 h-5" />
                firstclassdev.com.br
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white/90 border border-white/20 hover:bg-white/10 transition-all active:scale-95"
              >
                <MessageCircle className="w-5 h-5" style={{ color: BRAND }} />
                WhatsApp
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-white/90 border border-white/20 hover:bg-white/10 transition-all active:scale-95"
              >
                <Mail className="w-5 h-5" style={{ color: BRAND }} />
                E-mail
              </a>
            </div>
            <p className="mt-12 text-white/40 text-sm italic">
              First Class Dev — tecnologia sob medida que faz a sua empresa vender mais e crescer.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
