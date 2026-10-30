"use client";

import React from "react";
import Image, { type ImageProps } from "next/image";
import { ImageOff } from "lucide-react";

/**
 * Foto de produto. Sem foto (a API manda `null`) ou com a foto fora do ar,
 * desenha um quadro neutro "sem foto" — NUNCA uma imagem genérica: uma foto
 * de banco de câmeras na página de uma bobina diz ao cliente que o produto é
 * outro. Sempre usado com `fill`, dentro de um pai `relative`.
 *
 * Tratamento da foto:
 * - `mix-blend-multiply`: quase toda foto de fabricante vem com fundo branco,
 *   que aparecia como um retângulo branco dentro do quadro cinza. Com a
 *   mistura o branco assume a cor do quadro e sobra só o produto.
 * - Enquanto a foto não chega, o quadro pulsa em vez de ficar vazio, e a foto
 *   entra com fade em vez de saltar.
 */
export default function FotoProduto({
  src,
  alt,
  className = "",
  ...resto
}: Omit<ImageProps, "src"> & { src: string | null }) {
  const [falhou, setFalhou] = React.useState(false);
  const [carregada, setCarregada] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    setFalhou(false);
    // Foto já em cache pode terminar antes da hidratação, e aí o onLoad não
    // dispara: sem esta conferência ela ficaria invisível para sempre.
    const img = ref.current;
    setCarregada(!!img && img.complete && img.naturalWidth > 0);
  }, [src]);

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
  return (
    <>
      {!carregada && <div aria-hidden className="absolute inset-0 animate-pulse bg-neutral-100" />}
      <Image
        {...resto}
        ref={ref}
        alt={alt}
        src={src}
        onLoad={() => setCarregada(true)}
        onError={() => setFalhou(true)}
        className={`mix-blend-multiply transition-[opacity,transform] duration-500 ${carregada ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </>
  );
}
