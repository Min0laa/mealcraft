"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";
import { t } from "@/lib/i18n";

const LINK_KEYS = [
  { key: "home" as const, href: "#hero" },
  { key: "how" as const, href: "#features" },
  { key: "tool" as const, href: "#app" },
  { key: "contact" as const, href: "#contact" },
];

export function Navbar() {
  const { locale, toggle } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-surface/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <button onClick={() => handleClick("#hero")}>
          <Logo size="sm" />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {LINK_KEYS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className="text-sm text-text-secondary transition-colors hover:text-brand"
            >
              {t.nav[link.key][locale]}
            </button>
          ))}
          <button
            onClick={toggle}
            className="rounded-lg border border-border px-2.5 py-1.5 text-xs text-text-secondary transition-all hover:border-brand/40 hover:text-brand"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => handleClick("#app")}
            className="rounded-xl bg-brand px-5 py-2 text-sm font-medium text-white transition-all hover:bg-brand-dark"
          >
            {t.nav.cta[locale]}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggle}
            className="rounded-lg border border-border px-2 py-1 text-xs text-text-secondary"
          >
            {locale === "fr" ? "EN" : "FR"}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-text-secondary"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-border bg-surface/95 backdrop-blur-xl px-6 pb-6 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {LINK_KEYS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleClick(link.href)}
                className="text-left text-sm text-text-secondary"
              >
                {t.nav[link.key][locale]}
              </button>
            ))}
            <button
              onClick={() => handleClick("#app")}
              className="mt-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-medium text-white"
            >
              {t.nav.cta[locale]}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
