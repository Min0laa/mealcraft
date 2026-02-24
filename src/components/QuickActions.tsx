"use client";

import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingCart, RefreshCw } from "lucide-react";
import type { Locale } from "@/types";

interface QuickActionsProps {
  onAction: (message: string) => void;
  disabled: boolean;
  locale: Locale;
}

const ACTIONS = [
  {
    Icon: UtensilsCrossed,
    message: {
      en: "Generate a meal plan for the week",
      fr: "Génère-moi un plan repas pour la semaine",
    },
    label: { en: "Meal plan", fr: "Plan repas" },
  },
  {
    Icon: ShoppingCart,
    message: {
      en: "Build my grocery cart for the week",
      fr: "Fais-moi mon panier de courses pour la semaine",
    },
    label: { en: "Grocery cart", fr: "Mon panier" },
  },
  {
    Icon: RefreshCw,
    message: {
      en: "Swap a meal for something different",
      fr: "Change-moi un repas pour varier",
    },
    label: { en: "Swap meal", fr: "Changer repas" },
  },
];

export function QuickActions({
  onAction,
  disabled,
  locale,
}: QuickActionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mb-5 flex gap-2"
    >
      {ACTIONS.map((action) => (
        <button
          key={action.label.en}
          onClick={() => onAction(action.message[locale])}
          disabled={disabled}
          className="flex items-center gap-2 rounded-xl border border-border bg-surface-card px-4 py-2.5 text-xs font-medium text-text-secondary transition-all hover:border-brand/30 hover:text-brand disabled:opacity-30"
        >
          <action.Icon size={14} />
          {action.label[locale]}
        </button>
      ))}
    </motion.div>
  );
}
