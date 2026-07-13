"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { useSyncExternalStore, type ReactNode } from "react";

/*
 * Motion primitives — deliberately small and content-first.
 *
 * Content is always server-rendered and fully visible: the hidden initial state
 * is never emitted into SSR HTML. Entry animations are attached only on the
 * client, and only for users who have not requested reduced motion. This keeps
 * content visible with JavaScript disabled, before hydration, for reduced-motion
 * users, and for crawlers, while preserving the scroll-reveal effect otherwise.
 */

const EASE = [0.22, 1, 0.36, 1] as const;

/** True only on the client, after hydration, when reduced motion is NOT
 *  requested. On the server and during the first (hydration) client render this
 *  is false, so the plain (visible) markup is emitted and hydration matches.
 *
 *  Hydration state is read via useSyncExternalStore — getServerSnapshot returns
 *  false so SSR and the hydrating render agree, then the client snapshot flips
 *  to true after commit. This avoids a setState-in-effect and any mismatch. */
const emptySubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function useAnimateReady() {
  const reduce = useReducedMotion();
  const hydrated = useHydrated();
  return hydrated && !reduce;
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 16,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "article" | "span";
}) {
  const animate = useAnimateReady();

  if (!animate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol";
}) {
  const animate = useAnimateReady();

  if (!animate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article";
}) {
  const animate = useAnimateReady();

  if (!animate) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const MotionTag = motion[as];
  return (
    <MotionTag className={className} variants={itemVariants}>
      {children}
    </MotionTag>
  );
}
