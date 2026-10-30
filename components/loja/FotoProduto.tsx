"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/**
 * Foto de produto. Sem foto (a API manda `null`) ou com a foto fora do ar,
 * desenha um quadro neutro "sem foto" — NUNCA uma imagem genérica: uma foto
 * de banco de câmeras na página de uma bobina diz ao cliente que o produto é
 * outro. Sempre usado com `fill`, dentro de um pai `relative`.
 */
export default function FotoProduto({ src, alt, ...resto }: Omit<ImageProps, "src"> & { src: string | null }) {
  const [falhou, setFalhou] = React.useState(false);
  React.useEffect(() => setFalhou(false), [src]);
  if (!src || falhou) {
    return (
      <div
        role="img"
        aria-label={`${alt} — sem foto`}
        className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-50 text-neutral-300"
      >
        <ImageOff className="w-8 h-8 md:w-10 md:h-10" strokeWidth={1.5} />
        <span className="text-[10px] font-bold uppercase tracking-widest">Sem foto</span>
      </div>
    );
  }
  return <Image {...resto} alt={alt} src={src} onError={() => setFalhou(true)} />;
}
