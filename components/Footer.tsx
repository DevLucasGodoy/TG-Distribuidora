"use client";

import React from "react";
import Image from "next/image";
import { PhoneCall, Globe, Shield, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-auto border-t border-neutral-200 bg-neutral-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-16 max-w-7xl mx-auto">
        <div className="md:col-span-2 flex flex-col items-start gap-6">
          <div className="relative h-12 w-48">
            <Image
              alt="TG Distribuidora"
              fill
              sizes="(max-width: 768px) 192px, 192px"
              className="object-contain object-left"
              src="/logo.png"
              priority
            />
          </div>
          <p className="text-neutral-500 text-sm font-body max-w-md leading-relaxed text-left">
            O destino principal para infraestrutura de segurança, especializada
            em monitoramento de alta performance e controle de acesso em todo o
            MS.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Nossas Unidades
          </h4>
          <div className="flex flex-col gap-4">
            {[
              { name: "Dourados (Matriz)", address: "R. Pedro Rigotti, 925 - Vila Santo André", phone: "(67) 3032-3090" },
              { name: "Campo Grande", address: "Av. Salgado Filho, 1756", phone: "(67) 3043-3090" },
              { name: "Ponta Porã", address: "Av. Paraguai, 2310 - Centro", phone: "(67) 3431-6421" },
              { name: "Três Lagoas", address: "R. Darcí Pio, 1333 - Santos Dumont", phone: "(67) 99994-1447" },
            ].map((unit) => (
              <Link
                key={unit.name}
                className="group flex flex-col gap-0.5 hover:opacity-80 transition-opacity"
                href="/contato"
              >
                <span className="text-neutral-700 text-sm font-bold group-hover:text-primary transition-colors">{unit.name}</span>
                <span className="text-neutral-400 text-xs">{unit.address}</span>
                <span className="text-neutral-400 text-xs">{unit.phone}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h4 className="text-primary font-bold text-xs uppercase tracking-wider font-label">
            Fale Conosco
          </h4>
          <div className="flex items-center gap-3 text-neutral-900 font-bold text-2xl">
            <PhoneCall className="text-primary w-6 h-6" />
            67 3032-3090
          </div>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Globe className="w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Shield className="text-sm w-5 h-5" />
            </div>
            <div className="w-10 h-10 rounded-full bg-white border border-neutral-200 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer">
              <Send className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-200 mt-8">
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="flex flex-col items-center justify-center text-center gap-1">
            <p className="text-neutral-400 text-[10px] font-body uppercase tracking-widest leading-relaxed">
              © 2026 TG Distribuidora - Todos os direitos reservados.
            </p>
            <p className="text-neutral-400 text-[10px] font-body uppercase tracking-widest leading-relaxed">
              Desenvolvido pela{" "}
              <Link
                href="https://firstclassdev.com.br"
                className="text-primary font-bold"
                target="_blank"
                rel="noopener noreferrer"
              >
                First Class Dev
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
