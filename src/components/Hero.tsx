"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles, ShieldCheck, Zap } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";
import { t } from "@/lib/i18n";

export function Hero() {
  const { locale } = useLanguage();

  const badges = [
    { icon: Sparkles, label: t.hero.badge1[locale] },
    { icon: ShieldCheck, label: t.hero.badge2[locale] },
    { icon: Zap, label: t.hero.badge3[locale] },
  ];

  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-brand)_0%,_transparent_70%)] opacity-[0.06]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <div className="mb-10 flex justify-center">
          <Logo size="xl" />
        </div>

        <div className="mb-6 flex flex-wrap justify-center gap-3">
          {badges.map((b) => (
            <span
              key={b.label}
              className="flex items-center gap-1.5 rounded-full border border-border bg-surface-card px-3 py-1.5 text-[10px] text-text-secondary"
            >
              <b.icon size={12} className="text-brand" />
              {b.label}
            </span>
          ))}
        </div>

        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl">
          {t.hero.title1[locale]}
          <br />
          <span className="text-brand">{t.hero.title2[locale]}</span>
        </h1>

        <p className="mx-auto mb-10 max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
          {t.hero.sub[locale]}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={() => scroll("#app")}
            className="rounded-2xl bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30"
          >
            {t.hero.cta[locale]}
          </button>
          <button
            onClick={() => scroll("#features")}
            className="flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-brand"
          >
            {t.hero.how[locale]}
            <ArrowDown size={14} />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10"
      >
        <ArrowDown size={16} className="animate-bounce text-text-muted" />
      </motion.div>
    </section>
  );
}
