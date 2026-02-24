"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { GoalSelector } from "@/components/GoalSelector";
import { ProfileForm } from "@/components/ProfileForm";
import { QuickActions } from "@/components/QuickActions";
import { ChatWindow } from "@/components/ChatWindow";
import { Paywall } from "@/components/Paywall";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useChat } from "@/hooks/useChat";
import { useLanguage } from "@/context/LanguageContext";
import { GOAL_INTROS } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { FitnessGoal, UserProfile } from "@/types";

const EMPTY_PROFILE: UserProfile = {
  weight: null,
  height: null,
  activityLevel: null,
  budget: null,
  supermarket: null,
  restrictions: "",
};

const FREE_LIMIT = 2;
const STORAGE_KEY = "mealcraft_used";

export default function Home() {
  const { locale } = useLanguage();
  const [goal, setGoal] = useState<FitnessGoal | null>(null);
  const [profile, setProfile] = useState<UserProfile>(EMPTY_PROFILE);
  const [usedTries, setUsedTries] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setUsedTries(Number(stored));
  }, []);

  const incrementTries = useCallback(() => {
    setUsedTries((prev) => {
      const next = prev + 1;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const chatContext = useMemo(
    () => ({ goal, locale, profile }),
    [goal, locale, profile]
  );

  const chat = useChat({
    endpoint: "/api/chat",
    context: chatContext,
    onResponse: incrementTries,
  });

  const isLocked = usedTries >= FREE_LIMIT;

  const handleGoalSelect = (selectedGoal: FitnessGoal) => {
    setGoal(selectedGoal);
    chat.reset();
    chat.addSystemMessage(GOAL_INTROS[selectedGoal][locale]);
  };

  const handleQuickAction = (message: string) => {
    if (isLocked) return;
    chat.sendMessage(message);
  };

  const handleSend = (message: string) => {
    if (isLocked) return;
    chat.sendMessage(message);
  };

  const placeholders = {
    active: {
      en: "Ask anything or use the buttons above...",
      fr: "Demande ce que tu veux ou utilise les boutons...",
    },
    inactive: {
      en: "Select a goal first...",
      fr: "Choisis un objectif d'abord...",
    },
  };

  const placeholder = goal
    ? placeholders.active[locale]
    : placeholders.inactive[locale];

  return (
    <>
      <Navbar />
      <Hero />
      <Features />

      <section id="app" className="px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="mb-10 text-center"
          >
            <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-brand">
              {t.app.label[locale]}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-text-primary">
              {t.app.title[locale]}
            </h2>
            <p className="mx-auto max-w-md text-sm text-text-secondary">
              {t.app.sub[locale]}
            </p>
          </motion.div>

          {!isLocked && (
            <>
              <GoalSelector
                selected={goal}
                onSelect={handleGoalSelect}
                locale={locale}
              />
              {goal && (
                <ProfileForm
                  profile={profile}
                  onChange={setProfile}
                  locale={locale}
                />
              )}
              {goal && (
                <QuickActions
                  onAction={handleQuickAction}
                  disabled={chat.isLoading}
                  locale={locale}
                />
              )}

              {!isLocked && usedTries > 0 && (
                <p className="mb-3 text-center text-[10px] text-text-muted">
                  {locale === "fr"
                    ? `${FREE_LIMIT - usedTries} essai${FREE_LIMIT - usedTries !== 1 ? "s" : ""} gratuit${FREE_LIMIT - usedTries !== 1 ? "s" : ""} restant${FREE_LIMIT - usedTries !== 1 ? "s" : ""}`
                    : `${FREE_LIMIT - usedTries} free trial${FREE_LIMIT - usedTries !== 1 ? "s" : ""} remaining`}
                </p>
              )}

              <ChatWindow
                messages={chat.messages}
                isLoading={chat.isLoading}
                onSend={handleSend}
                disabled={!goal}
                placeholder={placeholder}
                scrollRef={chat.scrollRef}
                locale={locale}
              />
            </>
          )}

          {isLocked && <Paywall />}
        </div>
      </section>

      <ContactSection />
      <Footer />
    </>
  );
}
