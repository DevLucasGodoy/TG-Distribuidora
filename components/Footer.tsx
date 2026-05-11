"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, MapPin } from "lucide-react";
import Link from "next/link";

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const IconFacebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const IconWhatsApp = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.867-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
  </svg>
);

const units = [
  { name: "Dourados (Matriz)", address: "R. Pedro Rigotti, 925 - Vila Santo André", phone: "(67) 3032-3090", mapsUrl: "https://maps.google.com/?q=R.+Pedro+Rigotti,+925,+Vila+Santo+André,+Dourados,+MS" },
  { name: "Campo Grande", address: "Av. Salgado Filho, 1756", phone: "(67) 3043-3090", mapsUrl: "https://maps.google.com/?q=Av.+Salgado+Filho,+1756,+Campo+Grande,+MS" },
  { name: "Ponta Porã", address: "Av. Paraguai, 2310 - Centro", phone: "(67) 3431-6421", mapsUrl: "https://maps.google.com/?q=Av.+Paraguai,+2310,+Centro,+Ponta+Porã,+MS" },
  { name: "Três Lagoas", address: "R. Darcí Pio, 1333 - Santos Dumont", phone: "(67) 99994-1447", mapsUrl: "https://maps.google.com/?q=R.+Darcí+Pio,+1333,+Santos+Dumont,+Três+Lagoas,+MS" },
];

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Logo + descrição */}
        <div className="flex flex-col gap-4">
          <div className="relative h-10 w-40">
            <Image
              alt="TG Distribuidora"
              fill
              sizes="160px"
              className="object-contain object-left"
              src="/logo.png"
              priority
            />
          </div>
          <p className="text-neutral-500 text-xs font-body leading-relaxed">
            A maior distribuidora de tecnologia em segurança do Mato Grosso do Sul. Monitoramento, controle de acesso e energia solar.
          </p>
          <div className="flex gap-3 mt-1">
            <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
              <IconInstagram />
            </a>
            <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
              <IconFacebook />
            </a>
            <a href="https://wa.me/5567999943090" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all">
              <IconWhatsApp />
            </a>
          </div>
        </div>

        {/* Unidades — grade 2×2 */}
        <div className="md:col-span-2 flex flex-col gap-4">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Nossas Unidades
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-5">
            {units.map((unit) => (
              <div key={unit.name} className="flex flex-col gap-1">
                <Link href="/contato" className="text-neutral-700 text-sm font-bold hover:text-primary transition-colors leading-tight">
                  {unit.name}
                </Link>
                <a
                  href={unit.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-neutral-400 text-xs hover:text-primary transition-colors group/maps"
                >
                  <MapPin className="w-3 h-3 shrink-0 mt-0.5" />
                  <span className="leading-relaxed group-hover/maps:underline underline-offset-2">{unit.address}</span>
                </a>
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs">
                  <PhoneCall className="w-3 h-3 shrink-0" />
                  <span>{unit.phone}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fale Conosco */}
        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Fale Conosco
          </h4>
          <div className="flex flex-col gap-3">
            <div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">Linha Principal</p>
              <a href="tel:6730323090" className="flex items-center gap-2 text-neutral-800 font-bold text-lg hover:text-primary transition-colors">
                <PhoneCall className="text-primary w-4 h-4" />
                67 3032-3090
              </a>
            </div>
            <div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">Horário</p>
              <p className="text-neutral-600 text-xs">Seg — Sex, 07:30 às 17:30</p>
              <p className="text-neutral-600 text-xs">Sáb, 07:30 às 11:30</p>
            </div>
            <div>
              <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-1">E-mail</p>
              <a href="mailto:contato@tgdistribuidora.com.br" className="text-neutral-600 text-xs hover:text-primary transition-colors">
                contato@tgdistribuidora.com.br
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Barra inferior */}
      <div className="border-t border-neutral-200">
        <div className="max-w-7xl mx-auto px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-neutral-400 text-[10px] font-body uppercase tracking-widest">
            © 2026 TG Distribuidora — Todos os direitos reservados.
          </p>
          <p className="text-neutral-400 text-[10px] font-body uppercase tracking-widest">
            Desenvolvido pela{" "}
            <Link href="https://firstclassdev.com.br" className="text-primary font-bold" target="_blank" rel="noopener noreferrer">
              First Class Dev
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
