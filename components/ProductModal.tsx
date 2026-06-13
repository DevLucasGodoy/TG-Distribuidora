"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, MessageCircle, CheckCircle2, ArrowRight, Tag } from "lucide-react";
import type { Product } from "@/lib/products";

const WHATSAPP_NUMBER = "5567999943090";

type ProductModalProps = {
  product: Product | null;
  onClose: () => void;
};

export default function ProductModal({ product, onClose }: ProductModalProps) {
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  React.useEffect(() => {
    if (!product) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  const whatsappUrl = product
    ? `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${product.name} (${product.brand}). Pode me enviar mais informações?`
      )}`
    : "#";

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
          />

          {/* Painel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.96 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-5"
          >
            {/* Fechar */}
            <button
              onClick={onClose}
              aria-label="Fechar detalhes do produto"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-neutral-200 shadow-md flex items-center justify-center text-neutral-600 hover:text-primary hover:scale-105 active:scale-95 transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Imagem */}
            <div className="relative h-56 md:h-auto md:col-span-2 bg-neutral-100">
              <Image
                src={product.img}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-[10px] font-bold font-label uppercase tracking-widest text-primary shadow-sm border border-neutral-100">
                  {product.brand}
                </span>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="md:col-span-3 p-8 md:p-10 overflow-y-auto max-h-[60vh] md:max-h-[90vh]">
              <div className="flex items-center gap-2 text-secondary mb-3">
                <Tag className="w-3.5 h-3.5" />
                <span className="text-xs font-bold font-label uppercase tracking-[0.2em]">
                  {product.category}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-headline font-extrabold text-on-surface tracking-tight mb-4">
                {product.name}
              </h3>

              <p className="text-on-surface-variant leading-relaxed mb-6">
                {product.longDesc ?? product.desc}
              </p>

              {product.features && product.features.length > 0 && (
                <ul className="space-y-2.5 mb-6">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-on-surface">
                      <CheckCircle2 className="w-[18px] h-[18px] shrink-0 text-primary mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {product.specs && product.specs.length > 0 && (
                <div className="mb-8 rounded-xl border border-neutral-200 overflow-hidden">
                  {product.specs.map((spec, i) => (
                    <div
                      key={spec.label}
                      className={`flex justify-between gap-4 px-4 py-2.5 text-sm ${
                        i % 2 === 0 ? "bg-neutral-50" : "bg-white"
                      }`}
                    >
                      <span className="font-bold text-on-surface">{spec.label}</span>
                      <span className="text-on-surface-variant text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-white rounded-xl font-bold text-sm hover:bg-primary-container active:scale-95 transition-all shadow-lg shadow-primary/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  Pedir cotação no WhatsApp
                </a>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-sm text-primary border border-neutral-200 hover:border-primary hover:bg-primary/5 active:scale-95 transition-all"
                >
                  Falar com consultor
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
