"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Clock, Send, CheckCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export function ContactSection() {
  const { locale } = useLanguage();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-brand">
            {t.contact.label[locale]}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">
            {t.contact.title[locale]}
          </h2>
          <p className="text-sm text-text-secondary">
            {t.contact.sub[locale]}
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-2xl border border-border bg-surface-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated">
                <Mail size={16} className="text-brand" />
              </div>
              <p className="mb-1 text-xs text-text-muted">{t.contact.email[locale]}</p>
              <p className="text-sm font-medium text-text-primary">contact@mealcraft.io</p>
            </div>
            <div className="rounded-2xl border border-border bg-surface-card p-5">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-surface-elevated">
                <Clock size={16} className="text-brand" />
              </div>
              <p className="mb-1 text-xs text-text-muted">{t.contact.response[locale]}</p>
              <p className="text-sm font-medium text-text-primary">
                {t.contact.responseVal[locale]}
              </p>
            </div>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <input
              required
              type="text"
              placeholder={t.contact.name[locale]}
              className="w-full rounded-xl border border-border bg-surface-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand/40"
            />
            <input
              required
              type="email"
              placeholder={t.contact.email[locale]}
              className="w-full rounded-xl border border-border bg-surface-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand/40"
            />
            <textarea
              required
              rows={4}
              placeholder={t.contact.message[locale]}
              className="w-full resize-none rounded-xl border border-border bg-surface-card px-4 py-3 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-brand/40"
            />
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition-all hover:bg-brand-dark"
            >
              {sent ? (
                <>
                  <CheckCircle size={14} />
                  {t.contact.sent[locale]}
                </>
              ) : (
                <>
                  <Send size={14} />
                  {t.contact.send[locale]}
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
