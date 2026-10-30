"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import {
  PhoneCall,
  MapPin,
  Mail,
  Clock,
  ArrowUp,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import { UNITS, SITE_EMAIL, SITE_PHONE } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/Motion";

const WHATSAPP_URL = "https://wa.me/5567999943090";

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const IconLinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const socials = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/tg.distribuidora/",
    Icon: IconInstagram,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/tgdistribuidora/?locale=pt_BR",
    Icon: IconFacebook,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/tg-distribuidora/?originalSubdomain=br",
    Icon: IconLinkedIn,
  },
  { label: "WhatsApp", href: WHATSAPP_URL, Icon: IconWhatsApp },
];

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Marcas Parceiras", href: "/marcas" },
  { label: "Produtos", href: "/produtos" },
  { label: "Contato", href: "/contato" },
  { label: "Perguntas Frequentes", href: "/contato#faq" },
];

/** +556730323090 → (67) 3032-3090 · +5567999941447 → (67) 99994-1447 */
function formatPhone(e164: string) {
  const digits = e164.replace(/\D/g, "").replace(/^55/, "");
  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);
  const split = rest.length > 8 ? 5 : 4;
  return `(${ddd}) ${rest.slice(0, split)}-${rest.slice(split)}`;
}

function mapsUrl(street: string, city: string) {
  return `https://maps.google.com/?q=${encodeURIComponent(`${street}, ${city}, MS`)}`;
}

/** Botão flutuante "voltar ao topo" — aparece depois de 600px de rolagem. */
function BackToTop() {
  const [visible, setVisible] = React.useState(false);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          aria-label="Voltar ao topo"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" })
          }
          initial={{ opacity: 0, scale: 0.6, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 12 }}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
          className="tap-target fixed bottom-5 right-5 md:bottom-6 md:right-6 z-50 w-12 h-12 rounded-full bg-primary text-white shadow-xl shadow-primary/30 flex items-center justify-center"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Footer() {
  return (
    <footer className="relative w-full mt-auto bg-neutral-50 border-t border-neutral-200">
      {/* Filete gradiente animado no topo do rodapé */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-[linear-gradient(90deg,#98001b,#be1e2d,#fdc34d,#be1e2d,#98001b)] animate-gradient-pan"
      />

      {/* Faixa de chamada — WhatsApp + telefone */}
      <Reveal as="section" className="border-b border-neutral-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-6 md:py-10 flex flex-col lg:flex-row items-center justify-between gap-5 md:gap-8">
          <div className="text-center lg:text-left">
            <h3 className="font-headline font-black text-xl md:text-3xl tracking-tighter text-on-surface">
              Precisa de um orçamento hoje?
            </h3>
            <p className="hidden sm:block text-on-surface-variant text-sm mt-2 max-w-md">
              Pronta entrega em quatro unidades no MS, preço de atacado e suporte
              técnico para instaladores.
            </p>
          </div>

          {/* No celular os dois botões dividem a linha. */}
          <div className="grid grid-cols-2 sm:flex sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <motion.a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 320, damping: 20 }}
              className="relative inline-flex items-center justify-center gap-2 sm:gap-3 px-3 sm:px-7 py-3 sm:py-3.5 rounded-xl bg-primary text-white text-sm sm:text-base font-bold shadow-lg shadow-primary/25 overflow-hidden group"
            >
              {/* brilho que cruza o botão no hover */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 skew-x-12 opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"
              />
              <span className="relative flex items-center justify-center w-5 h-5">
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-white/40 animate-pulse-ring"
                />
                <MessageCircle className="relative w-5 h-5" />
              </span>
              <span className="sm:hidden">WhatsApp</span>
              <span className="hidden sm:inline">Falar no WhatsApp</span>
              <ArrowRight className="hidden sm:block w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.a>

            <a
              href={`tel:${SITE_PHONE}`}
              className="inline-flex items-center justify-center gap-2 px-3 sm:px-7 py-3 sm:py-3.5 rounded-xl border border-neutral-200 text-on-surface text-sm sm:text-base font-bold whitespace-nowrap hover:border-primary hover:text-primary transition-colors"
            >
              <PhoneCall className="w-4 h-4" />
              {formatPhone(SITE_PHONE)}
            </a>
          </div>
        </div>
      </Reveal>

      {/* Colunas principais */}
      <Stagger className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-6 md:pt-14 pb-6 md:pb-10 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-10">
        {/* Marca — no celular, logo e redes na mesma linha, sem o texto */}
        <StaggerItem className="md:col-span-4 flex flex-row md:flex-col items-center md:items-start justify-between gap-4">
          <Link href="/" className="relative h-9 w-28 md:h-10 md:w-40 block shrink-0">
            <Image
              alt="TG Distribuidora"
              fill
              sizes="160px"
              className="object-contain object-left"
              src="/logo.png"
            />
          </Link>
          <p className="hidden md:block text-neutral-500 text-xs font-body leading-relaxed max-w-sm">
            A maior distribuidora de tecnologia em segurança do Mato Grosso do
            Sul. CFTV, alarmes, controle de acesso, automatização de portões e
            energia solar — revenda autorizada Hikvision, Intelbras e Dahua.
          </p>
          <div className="flex gap-2 md:gap-3 md:mt-1">
            {socials.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                className="tap-target w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-600 hover:bg-primary hover:text-white hover:border-primary transition-colors"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </StaggerItem>

        {/* Navegação */}
        <StaggerItem className="md:col-span-3 flex flex-col gap-2 md:gap-4 pt-5 md:pt-0 border-t md:border-0 border-neutral-200">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Navegação
          </h4>
          <ul className="grid grid-cols-2 md:flex md:flex-col gap-x-4 md:gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="group inline-flex items-center gap-2 py-1.5 md:py-1 text-neutral-600 text-sm hover:text-primary transition-colors"
                >
                  <span className="w-0 group-hover:w-3 h-[1px] bg-primary transition-all duration-300" />
                  <span className="link-underline">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </StaggerItem>

        {/* Fale conosco */}
        <StaggerItem className="md:col-span-5 flex flex-col gap-3 md:gap-4 pt-5 md:pt-0 border-t md:border-0 border-neutral-200">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Fale Conosco
          </h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-4 md:gap-5">
            <div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">
                Linha Principal
              </p>
              <a
                href={`tel:${SITE_PHONE}`}
                className="flex items-center gap-2 text-neutral-800 font-bold text-base md:text-lg whitespace-nowrap hover:text-primary transition-colors"
              >
                <PhoneCall className="text-primary w-4 h-4" />
                {formatPhone(SITE_PHONE)}
              </a>
            </div>
            <div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">
                Horário
              </p>
              <p className="flex items-center gap-2 text-neutral-600 text-xs">
                <Clock className="w-3 h-3 text-primary shrink-0" />
                Seg — Sex, 07:30 às 17:30
              </p>
              <p className="text-neutral-600 text-xs pl-5">Sáb, 07:30 às 11:30</p>
            </div>
            <div className="col-span-2">
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">
                E-mail
              </p>
              <a
                href={`mailto:${SITE_EMAIL}`}
                className="inline-flex items-center gap-2 text-neutral-600 text-xs hover:text-primary transition-colors"
              >
                <Mail className="w-3 h-3 text-primary shrink-0" />
                <span className="link-underline">{SITE_EMAIL}</span>
              </a>
            </div>
          </div>
        </StaggerItem>
      </Stagger>

      {/* Unidades — dados vindos de lib/seo.ts (fonte única) */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pb-6 md:pb-12">
        <div className="flex items-center gap-4 mb-3 md:mb-6">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label whitespace-nowrap">
            Nossas Unidades
          </h4>
          <span className="h-[1px] flex-grow bg-neutral-200" />
        </div>

        {/* Celular: uma linha por unidade, com mapa e ligação no polegar. */}
        <ul className="md:hidden divide-y divide-neutral-200 rounded-xl border border-neutral-200 bg-white">
          {UNITS.map((unit) => (
            <li key={unit.city} className="flex items-center gap-2 pl-4 pr-2 py-2">
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-2 text-sm font-bold text-neutral-800">
                  {unit.city}
                  {unit.isHQ && (
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-1.5 py-0.5 rounded-full">
                      Matriz
                    </span>
                  )}
                </p>
                <p className="text-[11px] text-neutral-500 truncate">{unit.street}</p>
              </div>
              <a
                href={mapsUrl(unit.street, unit.city)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver a unidade de ${unit.city} no mapa`}
                className="tap-target flex items-center justify-center w-10 h-10 rounded-full text-neutral-500 hover:text-primary hover:bg-primary/10"
              >
                <MapPin className="w-4 h-4" />
              </a>
              <a
                href={`tel:${unit.phone}`}
                aria-label={`Ligar para ${unit.city}: ${formatPhone(unit.phone)}`}
                className="tap-target flex items-center justify-center w-10 h-10 rounded-full text-primary bg-primary/10"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </li>
          ))}
        </ul>

        <Stagger
          className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4"
          step={0.07}
        >
          {UNITS.map((unit) => (
            <StaggerItem
              key={unit.city}
              lift={5}
              className="group relative bg-white border border-neutral-200 rounded-xl p-5 overflow-hidden hover:border-primary/40 hover:shadow-lg hover:shadow-neutral-200/60 transition-colors"
            >
              <span
                aria-hidden="true"
                className="absolute top-0 left-0 h-[2px] w-full bg-primary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"
              />
              <div className="flex items-center justify-between gap-2 mb-3">
                <Link
                  href="/contato"
                  className="text-neutral-800 text-sm font-bold hover:text-primary transition-colors leading-tight"
                >
                  {unit.city}
                </Link>
                {unit.isHQ && (
                  <span className="text-[9px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    Matriz
                  </span>
                )}
              </div>
              <a
                href={mapsUrl(unit.street, unit.city)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-1.5 text-neutral-500 text-xs hover:text-primary transition-colors group/maps mb-2"
              >
                <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                <span className="leading-relaxed group-hover/maps:underline underline-offset-2">
                  {unit.street}
                </span>
              </a>
              <a
                href={`tel:${unit.phone}`}
                className="flex items-center gap-1.5 text-neutral-500 text-xs hover:text-primary transition-colors"
              >
                <PhoneCall className="w-3 h-3 shrink-0" />
                {formatPhone(unit.phone)}
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 pt-4 pb-20 sm:pb-5 md:py-5 flex flex-col sm:flex-row justify-between items-center gap-1.5 md:gap-2">
          {/* O ano é resolvido no build; suppressHydrationWarning evita
              divergência se a página prerenderizada virar o ano no cliente. */}
          <p
            suppressHydrationWarning
            className="text-neutral-400 text-[10px] font-body uppercase tracking-widest text-center sm:text-left"
          >
            © {new Date().getFullYear()} TG Distribuidora — Todos os direitos
            reservados.
          </p>
          <p className="text-neutral-400 text-[10px] font-body uppercase tracking-widest">
            Desenvolvido pela{" "}
            <Link
              href="/first-class-dev"
              className="text-primary font-bold link-underline"
            >
              First Class Dev
            </Link>
          </p>
        </div>
      </div>

      <BackToTop />
    </footer>
  );
}
