'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
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
  MessageCircle
} from 'lucide-react';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const locations = [
    { name: 'Dourados', type: 'MATRIZ', address: 'R. Pedro Rigotti, 925 - Vila Santo André', phone: '67 3032-3090', phone2: '67 3021-3150', whatsapp: '67 99958-3090', hours: 'Seg - Sex: 08:00 - 18:00', img: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800' },
    { name: 'Campo Grande', type: 'HUB REGIONAL', address: 'Av. Salgado Filho, 1756', phone: '67 3043-3090', phone2: '67 3042-3091', whatsapp: '67 99285-6510', hours: 'Seg - Sex: 08:00 - 18:00', img: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800' },
    { name: 'Ponta Porã', type: 'FRONTEIRA', address: 'Av. Paraguai, 2310 - Centro', phone: '67 3431-6421', whatsapp: '67 99996-3043', hours: 'Seg - Sex: 08:00 - 18:00', img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800' },
    { name: 'Três Lagoas', type: 'HUB LESTE', address: 'R. Darcí Pio, 1333 - Santos Dumont', phone: '67 99994-1447', whatsapp: '67 99994-1447', hours: 'Seg - Sex: 08:00 - 18:00', icon: Building2 }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Ricardo Mendes",
      role: "Diretor Técnico | SegurTech",
      text: "A TG Distribuidora é nossa parceira estratégica há mais de 10 anos. A velocidade na entrega e o suporte técnico especializado são diferenciais que não encontramos em nenhum outro lugar.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 2,
      name: "Ana Cláudia Silva",
      role: "CEO | Proteção Total",
      text: "O catálogo de produtos é impressionante. Sempre encontramos as últimas inovações da Hikvision e Intelbras com preços competitivos e garantia de procedência.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: 3,
      name: "Marcos Oliveira",
      role: "Gerente Logístico | MS Vigilância",
      text: "As quatro unidades estrategicamente localizadas facilitam muito nossa operação. O Portal B2B é intuitivo e agiliza todos os nossos processos de compra.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
    }
  ];

  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-surface selection:bg-primary/20">
      <Navbar />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative min-h-[600px] md:min-h-[800px] flex items-center overflow-hidden bg-surface py-12 md:py-0">
          <div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-6 z-10 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container mb-6">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-bold uppercase tracking-widest font-label">Líder em Mato Grosso do Sul</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-headline font-extrabold tracking-tighter text-on-surface mb-6 leading-[0.95]">
                A Referência em <br/><span className="text-primary">Segurança Eletrônica</span> no MS.
              </h1>
              <p className="text-lg md:text-xl text-on-surface-variant max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed font-body">
                A maior distribuidora de tecnologia em segurança do estado. Vigilância de precisão, monitoramento de alto padrão e sistemas de proteção robustos para profissionais.
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg shadow-xl shadow-primary/20 hover:opacity-90 transition-all flex items-center justify-center gap-2">
                  Explorar Catálogo
                  <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 border border-outline-variant/30 text-primary rounded-lg font-bold text-lg hover:bg-surface-container-low transition-all">
                  Encontrar Representante
                </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
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
              <div className="absolute bottom-0 left-0 w-[90%] sm:w-[70%] p-6 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl z-20">
                <div className="flex items-center gap-2 mb-2 text-primary">
                  <Activity className="w-5 h-5" />
                  <span className="font-bold tracking-tighter font-headline uppercase text-sm">Status em tempo real</span>
                </div>
                <h3 className="text-xl md:text-2xl font-black font-headline text-on-surface mb-2 leading-none">Monitoramento Ultra-HD</h3>
                <p className="text-xs md:text-sm text-on-surface-variant font-body">Soluções de reconhecimento por IA e imagem térmica de última geração para pronta entrega B2B.</p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Locations Section */}
        <section className="py-24 bg-surface-container-low">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-headline font-black tracking-tighter mb-4">Presença Estratégica</h2>
                <p className="text-on-surface-variant max-w-md">Nossa rede logística abrange todo o MS para garantir atendimento rápido e suporte técnico em quatro hubs principais.</p>
              </div>
              <div className="h-[2px] flex-grow bg-neutral-200 mx-8 hidden md:block mb-4"></div>
              <div className="p-4 bg-white rounded-full flex items-center justify-center shadow-sm">
                <MapPin className="text-primary w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((loc, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8 }}
                  className="group relative bg-white p-6 rounded-2xl overflow-hidden border border-neutral-100 shadow-sm"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                  <div className="mb-6">
                    <h3 className="text-xl font-black font-headline mb-1">Unidade {loc.name}</h3>
                    <p className="text-primary font-bold text-[10px] tracking-widest font-label uppercase">{loc.type}</p>
                  </div>
                  <div className="space-y-3 mb-6">
                    {loc.address && (
                      <div className="flex items-start gap-3 text-on-surface-variant">
                        <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                        <span className="text-xs leading-relaxed">{loc.address}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 text-on-surface-variant">
                      <PhoneCall className="w-4 h-4" />
                      <span className="text-xs">{loc.phone}{(loc as any).phone2 ? ` / ${(loc as any).phone2}` : ''}</span>
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
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Counter Section */}
        <section className="py-16 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '15+', label: 'Anos de Experiência' },
              { val: '500+', label: 'Parceiros Ativos' },
              { val: '3k+', label: 'Produtos em Estoque' },
              { val: '24/7', label: 'Suporte Técnico' }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-black font-headline mb-1">{stat.val}</div>
                <div className="text-xs uppercase tracking-widest font-label opacity-70">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials Carousel Section */}
        <section className="py-24 bg-surface-container-high overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="text-center mb-16">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Depoimentos</span>
              <h2 className="text-4xl md:text-5xl font-headline font-black tracking-tighter text-on-surface">Vozes de Quem Confia</h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="absolute top-1/2 -left-4 md:-left-16 -translate-y-1/2 z-20">
                <button 
                  onClick={prevTestimonial}
                  className="p-3 rounded-full bg-white shadow-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-neutral-100"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              </div>
              <div className="absolute top-1/2 -right-4 md:-right-16 -translate-y-1/2 z-20">
                <button 
                  onClick={nextTestimonial}
                  className="p-3 rounded-full bg-white shadow-xl text-primary hover:bg-primary hover:text-white transition-all active:scale-90 border border-neutral-100"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="bg-white rounded-3xl p-8 md:p-16 shadow-2xl shadow-neutral-200/50 border border-neutral-100 relative">
                <div className="absolute top-8 right-8 text-primary/10">
                  <Quote className="w-32 h-32 rotate-180" />
                </div>
                
                <div className="relative z-10">
                  <motion.div
                    key={currentTestimonial}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  >
                    <p className="text-xl md:text-2xl text-on-surface-variant font-body leading-relaxed mb-10 italic">
                      &quot;{testimonials[currentTestimonial].text}&quot;
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-primary/20">
                        <Image 
                          src={testimonials[currentTestimonial].avatar} 
                          alt={testimonials[currentTestimonial].name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 768px) 64px, 64px"
                          className="object-cover"
                        />
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
                </div>
              </div>

              <div className="flex justify-center gap-3 mt-12">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'w-12 bg-primary' : 'w-2 bg-neutral-300'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
