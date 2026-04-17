'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: 'Início', href: '/' },
    { label: 'Sobre Nós', href: '/sobre' },
    { label: 'Marcas Parceiras', href: '/marcas' },
    { label: 'Produtos', href: '/produtos' },
    { label: 'Portal B2B', href: '#' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-none">
      {/* Main Top Bar */}
      <div className="relative z-50 w-full bg-white/90 backdrop-blur-md shadow-sm border-b border-neutral-100 pointer-events-auto">
        <div className="relative flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto h-20 md:h-24">
          {/* Mobile Menu Icon (Left on Mobile) */}
          <div className="md:hidden flex items-center w-12">
            <button 
              className="text-on-surface p-2 hover:bg-neutral-100 rounded-full transition-all active:scale-90" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Logo (Centered on Mobile, Left on Desktop) */}
          <div className="flex-shrink-0 absolute left-1/2 -translate-x-1/2 md:relative md:left-0 md:translate-x-0">
            <Link href="/" className="block group">
              <div className="relative h-10 w-40 md:h-12 md:w-48 transition-transform group-hover:scale-105">
                <Image 
                  alt="TG Distribuidora" 
                  fill
                  sizes="(max-width: 768px) 160px, 192px"
                  className="object-contain"
                  src="https://lh3.googleusercontent.com/aida/ADBb0uisMPVgtijwLZu0FuxtQBpBSo9lHUxhIwRosLZdUp31lLjRxQEUO7nU7nwwPOFZsM3cAQsUOrcJt0y3R4Osrr3kmLwKPBMRTOsS_cjycuIsRauidRgxlqkeR5PPGtIgpYbeSoDvwqBwjA77wM7OKRDehox5Ft2ugUSJ14IHYYXb8s-ozHhr0EoTNuWuhPSSLwAiqnulECXl_ZXsTRmXQbkC4uVmkJ0iQ-sbnJfxpvTrunlVZE1Vt1CbukdZy4KxIg2luJNCrsyROw" 
                  referrerPolicy="no-referrer"
                  priority
                />
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Items */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <Link 
                key={item.label} 
                href={item.href} 
                className={`text-sm font-headline font-bold tracking-tight transition-all duration-300 relative group overflow-hidden ${pathname === item.href ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-primary transition-transform duration-300 ${pathname === item.href ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
              </Link>
            ))}
          </div>

          {/* Action Button (Right) */}
          <div className="flex items-center gap-4 w-12 md:w-auto justify-end">
            <Link href="/contato" className="hidden sm:block bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:scale-95 active:scale-90 transition-all shadow-xl shadow-primary/25">
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-neutral-950/60 backdrop-blur-lg z-40 md:hidden pointer-events-auto"
            />
            
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-surface z-[60] shadow-[25px_0_80px_-20px_rgba(0,0,0,0.4)] md:hidden flex flex-col border-r border-neutral-100 overflow-hidden pointer-events-auto"
            >
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl -ml-24 -mb-24 pointer-events-none" />

              <div className="relative flex justify-between items-center p-8 border-b border-neutral-100 bg-white/80 backdrop-blur-sm z-10">
                <div className="relative h-8 w-32">
                  <Image 
                    alt="TG Distribuidora" 
                    fill
                    sizes="128px"
                    className="object-contain object-left"
                    src="https://lh3.googleusercontent.com/aida/ADBb0uisMPVgtijwLZu0FuxtQBpBSo9lHUxhIwRosLZdUp31lLjRxQEUO7nU7nwwPOFZsM3cAQsUOrcJt0y3R4Osrr3kmLwKPBMRTOsS_cjycuIsRauidRgxlqkeR5PPGtIgpYbeSoDvwqBwjA77wM7OKRDehox5Ft2ugUSJ14IHYYXb8s-ozHhr0EoTNuWuhPSSLwAiqnulECXl_ZXsTRmXQbkC4uVmkJ0iQ-sbnJfxpvTrunlVZE1Vt1CbukdZy4KxIg2luJNCrsyROw" 
                    referrerPolicy="no-referrer"
                    priority
                  />
                </div>
                <button onClick={() => setIsMenuOpen(false)} className="p-2.5 bg-neutral-100/80 hover:bg-neutral-200 rounded-full transition-all active:scale-90 shadow-sm border border-neutral-200">
                  <X className="w-5 h-5 text-primary" />
                </button>
              </div>

              <div className="relative flex flex-col p-8 gap-1 flex-grow overflow-y-auto bg-white/30 backdrop-blur-xs">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className={`group flex items-center justify-between py-5 text-2xl font-headline font-bold transition-all border-b border-neutral-50 ${pathname === item.href ? 'text-primary' : 'text-neutral-600 hover:text-primary'}`}
                    >
                      <span className="relative">
                        {item.label}
                        <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                      </span>
                      <motion.div
                        animate={{ x: pathname === item.href ? 5 : 0 }}
                        className={`opacity-0 transition-all ${pathname === item.href ? 'opacity-100 text-primary' : 'group-hover:opacity-100'}`}
                      >
                        <div className="w-2 h-2 rounded-full bg-current" />
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-auto pt-12"
                >
                  <Link 
                    href="/contato" 
                    onClick={() => setIsMenuOpen(false)}
                    className="group relative block w-full bg-primary text-white px-6 py-5 rounded-2xl font-bold text-center shadow-2xl shadow-primary/30 active:scale-95 transition-all text-xl overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Solicitar Orçamento
                      <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <Menu className="w-3 h-3 rotate-[-45deg]" />
                      </div>
                    </span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  </Link>
                </motion.div>
              </div>

              <div className="relative p-12 bg-neutral-50/90 border-t border-neutral-100">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center relative overflow-hidden group">
                    <div className="w-2.5 h-2.5 rounded-full bg-primary animate-ping absolute" />
                    <div className="w-2.5 h-2.5 rounded-full bg-primary relative z-10" />
                  </div>
                  <div>
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-[0.2em] mb-1">Central de Atendimento</p>
                    <p className="text-lg font-black text-on-surface tracking-tight">67 3032-3090</p>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest opacity-40">
                    TG Distribuidora © 2026
                  </p>
                  <p className="text-[9px] text-neutral-400 font-body opacity-50">
                    Todos os direitos reservados. Projeto First Class.
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
