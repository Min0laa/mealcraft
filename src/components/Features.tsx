"use client";

import { motion } from "framer-motion";
import { Target, Brain, ShoppingCart, BarChart3, Store, RefreshCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export function Features() {
  const { locale } = useLanguage();

  const steps = [
    { step: "01", title: t.features.step1Title[locale], desc: t.features.step1Desc[locale], icon: Target },
    { step: "02", title: t.features.step2Title[locale], desc: t.features.step2Desc[locale], icon: Brain },
    { step: "03", title: t.features.step3Title[locale], desc: t.features.step3Desc[locale], icon: ShoppingCart },
  ];

  const features = [
    { icon: BarChart3, title: t.features.feat1Title[locale], desc: t.features.feat1Desc[locale] },
    { icon: Store, title: t.features.feat2Title[locale], desc: t.features.feat2Desc[locale] },
    { icon: RefreshCw, title: t.features.feat3Title[locale], desc: t.features.feat3Desc[locale] },
  ];

  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-brand">
            {t.features.label[locale]}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t.features.title[locale]}
          </h2>
          <p className="mx-auto max-w-md text-sm text-text-secondary">
            {t.features.sub[locale]}
          </p>
        </motion.div>

        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.15 }}
              className="rounded-2xl border border-border bg-surface-card p-6"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand/10">
                  <s.icon size={18} className="text-brand" />
                </div>
                <span className="text-[10px] font-bold text-text-muted">{s.step}</span>
              </div>
              <h3 className="mb-2 text-base font-semibold text-text-primary">{s.title}</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-4 rounded-2xl border border-border bg-surface-card p-5"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-surface-elevated">
                <f.icon size={16} className="text-brand" />
              </div>
              <div>
                <h4 className="mb-1 text-sm font-semibold text-text-primary">{f.title}</h4>
                <p className="text-xs leading-relaxed text-text-secondary">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
