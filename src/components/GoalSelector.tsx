"use client";

import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Equal } from "lucide-react";
import type { FitnessGoal, Locale } from "@/types";
import { GOAL_LABELS } from "@/lib/constants";

interface GoalSelectorProps {
  selected: FitnessGoal | null;
  onSelect: (goal: FitnessGoal) => void;
  locale: Locale;
}

const GOALS_META = [
  {
    id: "bulk" as FitnessGoal,
    Icon: TrendingUp,
  },
  {
    id: "cut" as FitnessGoal,
    Icon: TrendingDown,
  },
  {
    id: "maintain" as FitnessGoal,
    Icon: Equal,
  },
];

export function GoalSelector({ selected, onSelect, locale }: GoalSelectorProps) {
  const title =
    locale === "en" ? "Your goal" : "Ton objectif";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mb-6"
    >
      <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-text-muted">
        {title}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {GOALS_META.map((goal) => {
          const isActive = selected === goal.id;
          return (
            <button
              key={goal.id}
              onClick={() => onSelect(goal.id)}
              className={`flex flex-col items-center gap-2.5 rounded-2xl border p-5 transition-all duration-200 ${
                isActive
                  ? "border-brand/30 bg-brand/5 shadow-lg shadow-brand/5"
                  : "border-border bg-surface-card hover:border-border-light hover:bg-surface-elevated"
              }`}
            >
              <goal.Icon
                size={20}
                strokeWidth={2}
                className={`transition-colors ${
                  isActive ? "text-brand" : "text-text-muted"
                }`}
              />
              <span
                className={`text-xs font-semibold tracking-wide transition-colors ${
                  isActive ? "text-brand" : "text-text-secondary"
                }`}
              >
                {GOAL_LABELS[goal.id][locale]}
              </span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
