"use client";

// ====================================================================
// Primitivas de animação compartilhadas (Motion / motion-react)
// ====================================================================
// Use estas peças em vez de repetir `initial/animate` solto nas páginas.
// Todas respeitam `prefers-reduced-motion`: com a preferência ligada, o
// conteúdo aparece direto, sem deslocamento nem escala.
// ====================================================================

import React from "react";
import {
  motion,
  animate,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

// Curva padrão do site — saída rápida, chegada suave.
export const EASE = [0.22, 1, 0.36, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

function offsetFor(direction: Direction, distance: number) {
  switch (direction) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
}

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Direção de onde o elemento entra. Padrão: sobe. */
  direction?: Direction;
  /** Distância em px do deslocamento inicial. */
  distance?: number;
  delay?: number;
  duration?: number;
  /** Escala inicial — útil para imagens e cards. */
  scale?: number;
  /** Fração do elemento visível para disparar. */
  amount?: number;
  as?: "div" | "section" | "span" | "li" | "article" | "header" | "footer";
};

/** Aparece uma vez, quando entra na viewport. */
export function Reveal({
  children,
  className,
  direction = "up",
  distance = 28,
  delay = 0,
  duration = 0.6,
  scale,
  amount = 0.2,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsetFor(direction, distance), ...(scale ? { scale } : {}) }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/** Container que escalona a entrada dos filhos (<StaggerItem />). */
export function Stagger({
  children,
  className,
  delay = 0,
  step = 0.09,
  amount = 0.15,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  step?: number;
  amount?: number;
  as?: "div" | "section" | "ul" | "li";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: step, delayChildren: delay } },
  };

  return (
    <Tag
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount, margin: "0px 0px -60px 0px" }}
    >
      {children}
    </Tag>
  );
}

export const staggerItemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};

/** Filho de <Stagger />. Aceita hover/tap opcionais. */
export function StaggerItem({
  children,
  className,
  lift = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  /** px de elevação no hover (0 = sem hover). */
  lift?: number;
  as?: "div" | "li" | "article";
}) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  if (reduced) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag
      className={className}
      variants={staggerItemVariants}
      whileHover={lift ? { y: -lift } : undefined}
      transition={lift ? { type: "spring", stiffness: 320, damping: 22 } : undefined}
    >
      {children}
    </Tag>
  );
}

/**
 * Contador que anima até o número quando entra na tela.
 * Aceita rótulos como "15+", "3k+", "4+ Unidades" ou "24/7" — o prefixo e o
 * sufixo são preservados; se não houver dígito, o texto é renderizado direto.
 */
export function CountUp({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = useReducedMotion();

  // "20+ Anos" → prefixo "", número 20, sufixo "+ Anos"
  // [\s\S] no lugar da flag /s: o target do tsconfig é ES2017 e dotAll só
  // existe a partir de ES2018.
  const match = /^(\D*?)(\d+)([\s\S]*)$/.exec(value);
  const target = match ? Number(match[2]) : null;

  React.useEffect(() => {
    const node = ref.current;
    if (target === null || !node) return;

    // Sem animação: mostra o valor final assim que monta.
    if (reduced) {
      node.textContent = value;
      return;
    }
    if (!inView) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => {
        node.textContent = `${match![1]}${Math.round(latest)}${match![3]}`;
      },
    });
    return () => controls.stop();
  }, [inView, reduced, target, duration, match, value]);

  // Sem dígito no rótulo (ex.: "24h") não há o que contar.
  if (target === null) {
    return <span className={className}>{value}</span>;
  }

  // O HTML servido traz o valor zerado — o mesmo em qualquer preferência de
  // movimento, para não divergir na hidratação. O efeito acima corrige.
  return (
    <span ref={ref} className={className}>
      {`${match![1]}0${match![3]}`}
    </span>
  );
}

/** Deslocamento vertical suave conforme a página rola. */
export function Parallax({
  children,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}

/** Barra de progresso de leitura, fixa no topo. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left bg-gradient-to-r from-primary via-primary-container to-secondary-container"
    />
  );
}
