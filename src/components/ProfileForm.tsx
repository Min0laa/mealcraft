"use client";

import { motion } from "framer-motion";
import type { Locale, UserProfile, ActivityLevel } from "@/types";
import { SUPERMARKETS, ACTIVITY_LABELS } from "@/lib/constants";

interface ProfileFormProps {
  profile: UserProfile;
  onChange: (profile: UserProfile) => void;
  locale: Locale;
}

const T = {
  title: { en: "Your profile", fr: "Ton profil" },
  weight: { en: "Weight", fr: "Poids" },
  height: { en: "Height", fr: "Taille" },
  activity: { en: "Activity", fr: "Activité" },
  budget: { en: "Budget", fr: "Budget" },
  store: { en: "Store", fr: "Magasin" },
  restrictions: { en: "Restrictions / allergies", fr: "Restrictions / allergies" },
  select: { en: "Select", fr: "Choisir" },
} as const;

function InputField({
  label,
  unit,
  value,
  placeholder,
  onChange,
}: {
  label: string;
  unit: string;
  value: number | null;
  placeholder: string;
  onChange: (v: number | null) => void;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
        {label}
      </span>
      <div className="flex items-center rounded-xl border border-border bg-surface-card px-3 py-2.5 transition-colors focus-within:border-brand/40">
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) =>
            onChange(e.target.value ? Number(e.target.value) : null)
          }
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
        />
        <span className="ml-1 text-[10px] text-text-muted">{unit}</span>
      </div>
    </label>
  );
}

export function ProfileForm({ profile, onChange, locale }: ProfileFormProps) {
  const update = (field: keyof UserProfile, value: unknown) => {
    onChange({ ...profile, [field]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mb-6 rounded-2xl border border-border bg-surface-card p-5"
    >
      <p className="mb-4 text-[10px] font-medium uppercase tracking-widest text-text-muted">
        {T.title[locale]}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <InputField
          label={T.weight[locale]}
          unit="kg"
          value={profile.weight}
          placeholder="70"
          onChange={(v) => update("weight", v)}
        />
        <InputField
          label={T.height[locale]}
          unit="cm"
          value={profile.height}
          placeholder="180"
          onChange={(v) => update("height", v)}
        />

        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
            {T.activity[locale]}
          </span>
          <select
            value={profile.activityLevel ?? ""}
            onChange={(e) =>
              update(
                "activityLevel",
                e.target.value ? (e.target.value as ActivityLevel) : null
              )
            }
            className="rounded-xl border border-border bg-surface-card px-3 py-2.5 text-sm text-text-primary transition-colors focus:outline-none focus:border-brand/40"
          >
            <option value="">{T.select[locale]}</option>
            {(["sedentary", "moderate", "active", "athlete"] as const).map(
              (level) => (
                <option key={level} value={level}>
                  {ACTIVITY_LABELS[level][locale]}
                </option>
              )
            )}
          </select>
        </label>

        <InputField
          label={T.budget[locale]}
          unit="€/sem"
          value={profile.budget}
          placeholder="60"
          onChange={(v) => update("budget", v)}
        />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
            {T.store[locale]}
          </span>
          <select
            value={profile.supermarket ?? ""}
            onChange={(e) => update("supermarket", e.target.value || null)}
            className="rounded-xl border border-border bg-surface-card px-3 py-2.5 text-sm text-text-primary transition-colors focus:outline-none focus:border-brand/40"
          >
            <option value="">{T.select[locale]}</option>
            {SUPERMARKETS.map((store) => (
              <option key={store} value={store}>
                {store}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
            {T.restrictions[locale]}
          </span>
          <input
            type="text"
            value={profile.restrictions}
            onChange={(e) => update("restrictions", e.target.value)}
            placeholder={
              locale === "en"
                ? "e.g. no gluten, vegetarian..."
                : "ex: sans gluten, végétarien..."
            }
            className="rounded-xl border border-border bg-surface-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted transition-colors focus:outline-none focus:border-brand/40"
          />
        </label>
      </div>
    </motion.div>
  );
}
