"use client";

import { motion } from "framer-motion";
import { Lock, Star, Zap, Headphones } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export function Paywall() {
  const { locale } = useLanguage();

  const perks = [
    { icon: Zap, label: locale === "fr" ? "Plans illimités" : "Unlimited plans" },
    { icon: Star, label: locale === "fr" ? "Paniers illimités" : "Unlimited carts" },
    { icon: Headphones, label: locale === "fr" ? "Support prioritaire" : "Priority support" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-md rounded-2xl border border-brand/30 bg-surface-card p-8 text-center"
    >
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand/10">
        <Lock size={24} className="text-brand" />
      </div>

      <h3 className="mb-2 text-xl font-bold text-text-primary">
        {t.paywall.title[locale]}
      </h3>
      <p className="mb-6 text-sm text-text-secondary">
        {t.paywall.sub[locale]}
      </p>

      <div className="mb-6 flex justify-center gap-4">
        {perks.map((p) => (
          <div key={p.label} className="flex flex-col items-center gap-1.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated">
              <p.icon size={14} className="text-brand" />
            </div>
            <span className="text-[10px] text-text-secondary">{p.label}</span>
          </div>
        ))}
      </div>

      <button className="w-full rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand/20 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30">
        {t.paywall.cta[locale]}
      </button>

      <p className="mt-3 text-[10px] text-text-muted">
        {locale === "fr"
          ? "Annulable à tout moment. Paiement sécurisé."
          : "Cancel anytime. Secure payment."}
      </p>
    </motion.div>
  );
}
