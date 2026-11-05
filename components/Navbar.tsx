"use client";

import React from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { ScrollProgress } from "@/components/Motion";
import { BotaoLista } from "@/components/loja/ListaOrcamento";

/**
 * Barra do topo no desenho do header-2 (@efferd, 21st.dev): faixa reta no
 * topo da página que, ao rolar, vira uma barra flutuante mais estreita, com
 * borda, sombra e vidro. No celular o menu é a tela inteira abaixo da barra,
 * com os links em cima e as ações no pé, e o ícone ☰ que gira para ✕.
 */
const TELEFONE = "tel:+556730323090";

const navItems = [
  { label: "Início", href: "/" },
  { label: "Sobre Nós", href: "/sobre" },
  { label: "Marcas Parceiras", href: "/marcas" },
  { label: "Produtos", href: "/produtos" },
];

function useRolou(limite: number) {
  const [rolou, setRolou] = React.useState(false);
  React.useEffect(() => {
    const medir = () => setRolou(window.scrollY > limite);
    medir();
    window.addEventListener("scroll", medir, { passive: true });
    return () => window.removeEventListener("scroll", medir);
  }, [limite]);
  return rolou;
}

/** ☰ que vira ✕ desenhando o traço (MenuToggleIcon do modelo). */
function IconeMenu({ aberto, className = "" }: { aberto: boolean; className?: string }) {
  return (
    <svg
      strokeWidth={2.5}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 32 32"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={`transition-transform ease-in-out duration-300 ${aberto ? "-rotate-45" : ""} ${className}`}
    >
      <path
        className={`transition-all ease-in-out duration-300 ${
          aberto ? "[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]" : "[stroke-dasharray:12_63]"
        }`}
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      />
      <path d="M7 16 27 16" />
    </svg>
  );
}

const botaoFantasma =
  "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md px-4 text-sm font-medium transition-colors";
const botaoContorno =
  "inline-flex h-10 items-center justify-center gap-2 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-4 text-sm font-medium text-on-surface hover:bg-neutral-50 transition-colors";
const botaoCheio =
  "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 text-sm font-medium text-white hover:bg-primary/90 transition-colors";

export default function Navbar() {
  const [aberto, setAberto] = React.useState(false);
  const rolou = useRolou(10);
  const pathname = usePathname();
  // "Produtos" continua aceso dentro da página de um produto.
  const ativo = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  React.useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  // Trocar de página fecha o menu do celular.
  React.useEffect(() => setAberto(false), [pathname]);

  const flutuando = rolou && !aberto;

  return (
    <div className="fixed inset-x-0 top-0 z-50 pointer-events-none">
      <ScrollProgress />
      <header
        className={`pointer-events-auto mx-auto w-full max-w-7xl border-b md:rounded-md md:border md:transition-all md:ease-out md:duration-300 ${
          flutuando
            ? "bg-white/95 supports-[backdrop-filter]:bg-white/60 border-neutral-200 backdrop-blur-lg md:mt-4 md:max-w-4xl md:shadow"
            : aberto
              ? "bg-white border-transparent"
              : "bg-white/90 backdrop-blur-md border-transparent"
        }`}
      >
        <nav
          className={`flex h-16 w-full items-center justify-between gap-4 px-4 md:transition-all md:ease-out md:duration-300 ${
            flutuando ? "md:h-14 md:px-2" : "md:px-8"
          }`}
        >
          <Link href="/" aria-label="TG Distribuidora — início" className="relative block h-9 w-32 shrink-0">
            <Image
              alt="TG Distribuidora"
              fill
              sizes="128px"
              className="object-contain object-left"
              src="/logo.png"
              priority
            />
          </Link>

          <div className="hidden items-center gap-2 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo(item.href) ? "page" : undefined}
                className={`${botaoFantasma} ${
                  ativo(item.href) ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <BotaoLista />
            <a href={TELEFONE} aria-label="Ligar para a TG Distribuidora" className={botaoContorno}>
              <Phone className="h-4 w-4" />
              <span className={flutuando ? "hidden" : "hidden lg:inline"}>67 3032-3090</span>
            </a>
            <Link href="/contato" className={botaoCheio}>
              Fale Conosco
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <BotaoLista />
            <button
              type="button"
              onClick={() => setAberto(!aberto)}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 bg-white text-on-surface hover:bg-neutral-50"
            >
              <IconeMenu aberto={aberto} className="size-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Menu do celular: a tela inteira abaixo da barra. */}
      <div
        className={`pointer-events-auto fixed top-16 right-0 bottom-0 left-0 z-50 flex-col overflow-hidden border-y border-neutral-200 bg-white/95 backdrop-blur-lg md:hidden ${
          aberto ? "flex" : "hidden"
        }`}
      >
        <div className="flex h-full w-full flex-col justify-between gap-y-2 p-4 animate-[menuEntra_200ms_ease-out]">
          <div className="grid gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={ativo(item.href) ? "page" : undefined}
                className={`${botaoFantasma} justify-start text-base ${
                  ativo(item.href) ? "bg-primary/10 text-primary" : "text-on-surface hover:bg-neutral-100"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <a href={TELEFONE} className={`${botaoContorno} w-full`}>
              <Phone className="h-4 w-4" /> 67 3032-3090
            </a>
            <Link href="/contato" className={`${botaoCheio} w-full`}>
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
