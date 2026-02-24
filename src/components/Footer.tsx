"use client";

import { useLanguage } from "@/context/LanguageContext";
import { Logo } from "./Logo";
import { t } from "@/lib/i18n";

export function Footer() {
  const { locale } = useLanguage();

  const scroll = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  const links = [
    { label: t.nav.home[locale], href: "#hero" },
    { label: t.nav.how[locale], href: "#features" },
    { label: t.nav.tool[locale], href: "#app" },
    { label: t.nav.contact[locale], href: "#contact" },
  ];

  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
        <div>
          <div className="mb-4">
            <Logo size="md" />
          </div>
          <p className="max-w-xs text-xs leading-relaxed text-text-secondary">
            {t.footer.desc[locale]}
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t.footer.nav[locale]}
          </h4>
          <div className="space-y-2">
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => scroll(l.href)}
                className="block text-sm text-text-secondary transition-colors hover:text-brand"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
            {t.footer.legal[locale]}
          </h4>
          <div className="space-y-2">
            <p className="text-sm text-text-secondary">{t.footer.terms[locale]}</p>
            <p className="text-sm text-text-secondary">{t.footer.privacy[locale]}</p>
            <p className="text-sm text-text-secondary">{t.footer.tos[locale]}</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-5xl border-t border-border pt-6 text-center text-xs text-text-muted">
        © {new Date().getFullYear()} MealCraft. {t.footer.copy[locale]}
      </div>
    </footer>
  );
}
