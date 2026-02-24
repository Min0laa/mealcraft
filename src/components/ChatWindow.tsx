"use client";

import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import type { ChatMessage as ChatMessageType, Locale } from "@/types";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { TypingIndicator } from "./TypingIndicator";

interface ChatWindowProps {
  messages: ChatMessageType[];
  isLoading: boolean;
  onSend: (message: string) => void;
  disabled: boolean;
  placeholder: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  locale: Locale;
}

const EMPTY_TEXT: Record<Locale, { title: string; hint: string }> = {
  en: {
    title: "Your nutrition assistant",
    hint: "Select a goal, fill your profile, then hit \"Meal plan\" to get started.",
  },
  fr: {
    title: "Ton assistant nutrition",
    hint: "Choisis un objectif, remplis ton profil, puis clique \"Plan repas\" pour commencer.",
  },
};

function EmptyState({ locale }: { locale: Locale }) {
  const t = EMPTY_TEXT[locale];
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10">
        <Leaf size={18} className="text-brand/50" />
      </div>
      <p className="text-sm font-medium text-text-secondary">{t.title}</p>
      <p className="max-w-[300px] text-center text-[11px] text-text-muted">
        {t.hint}
      </p>
    </div>
  );
}

export function ChatWindow({
  messages,
  isLoading,
  onSend,
  disabled,
  placeholder,
  scrollRef,
  locale,
}: ChatWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="flex h-[440px] flex-col overflow-hidden rounded-2xl border border-border bg-surface-card"
    >
      <div data-chat-scroll className="flex-1 space-y-4 overflow-y-auto p-5">
        {messages.length === 0 && <EmptyState locale={locale} />}
        {messages.map((msg, i) => (
          <ChatMessage key={i} message={msg} />
        ))}
        {isLoading && <TypingIndicator />}
        <div ref={scrollRef} />
      </div>
      <ChatInput
        onSend={onSend}
        disabled={disabled}
        isLoading={isLoading}
        placeholder={placeholder}
      />
    </motion.div>
  );
}
