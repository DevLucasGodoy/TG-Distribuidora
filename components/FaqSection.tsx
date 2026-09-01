'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Plus } from 'lucide-react';
import { FAQ } from '@/lib/seo';

// Acordeão de perguntas frequentes. O conteúdo vem de FAQ em lib/seo.ts —
// a mesma lista que alimenta o JSON-LD FAQPage em app/contato/layout.tsx.
// Editou uma pergunta? Edite lá, não aqui.
export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq"
      aria-labelledby="faq-titulo"
      className="px-8 py-24 bg-neutral-50 border-t border-neutral-100"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Dúvidas Frequentes
          </span>
          <h2
            id="faq-titulo"
            className="text-3xl md:text-4xl font-headline font-black tracking-tighter text-on-surface"
          >
            Perguntas Frequentes
          </h2>
          <p className="text-on-surface-variant max-w-2xl mx-auto mt-4 leading-relaxed">
            Respostas rápidas sobre unidades, horários, marcas e parcerias. Não
            achou o que procurava? Fale com a gente pelo formulário acima.
          </p>
        </div>

        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {FAQ.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={item.question}>
                <h3>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-resposta-${i}`}
                    id={`faq-pergunta-${i}`}
                    className="w-full flex items-start justify-between gap-6 py-6 text-left group cursor-pointer"
                  >
                    <span className="font-headline font-bold text-base md:text-lg text-on-surface group-hover:text-primary transition-colors leading-snug">
                      {item.question}
                    </span>
                    <span
                      aria-hidden="true"
                      className="shrink-0 w-8 h-8 rounded-full bg-white border border-neutral-200 flex items-center justify-center group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all"
                    >
                      <Plus
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isOpen ? 'rotate-45' : 'rotate-0'
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                {/* A resposta fica SEMPRE montada, só colapsada por altura.
                    Se fosse desmontada (AnimatePresence), o texto sumiria do
                    HTML pré-renderizado e o schema FAQPage ficaria sem o
                    conteúdo visível correspondente — o que o Google penaliza. */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.28, ease: 'easeInOut' }}
                  className="overflow-hidden"
                  aria-hidden={!isOpen}
                >
                  <p
                    id={`faq-resposta-${i}`}
                    role="region"
                    aria-labelledby={`faq-pergunta-${i}`}
                    className="text-on-surface-variant leading-relaxed pb-6 pr-14 text-sm md:text-base"
                  >
                    {item.answer}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
