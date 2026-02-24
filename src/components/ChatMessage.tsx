"use client";

import { motion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "@/types";

interface ChatMessageProps {
  message: ChatMessageType;
}

function isTotalLine(line: string): boolean {
  return /^total\s*[:\-]/i.test(line.trim());
}

function isMealLine(line: string): boolean {
  return /kcal/i.test(line) && line.includes(" - ");
}

function parseMealLine(line: string) {
  const parts = line.split(" - ");
  if (parts.length >= 3) {
    return {
      meal: parts[0].trim(),
      foods: parts.slice(1, -1).join(" - ").trim(),
      calories: parts[parts.length - 1].trim(),
    };
  }
  return null;
}

function isCartLine(line: string): boolean {
  return /€/.test(line) && line.includes(" - ");
}

function MealPlanBlock({ lines }: { lines: string[] }) {
  return (
    <div className="space-y-1.5">
      {lines.map((line, i) => {
        const trimmed = line.trim();
        if (!trimmed) return null;

        if (isTotalLine(trimmed)) {
          return (
            <div
              key={i}
              className="mt-2 border-t border-brand/20 pt-2 text-[11px] font-semibold text-brand"
            >
              {trimmed}
            </div>
          );
        }

        const meal = isMealLine(trimmed) ? parseMealLine(trimmed) : null;
        if (meal) {
          return (
            <div
              key={i}
              className="rounded-xl bg-surface/50 px-3 py-2.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium text-text-primary">
                  {meal.meal}
                </span>
                <span className="text-[10px] font-medium text-brand">
                  {meal.calories}
                </span>
              </div>
              <span className="mt-0.5 block text-[10px] text-text-muted">
                {meal.foods}
              </span>
            </div>
          );
        }

        if (isCartLine(trimmed)) {
          return (
            <div key={i} className="flex justify-between rounded-xl bg-surface/50 px-3 py-2">
              <span className="text-[11px] text-text-secondary">{trimmed.split(" - ").slice(0, -1).join(" - ")}</span>
              <span className="text-[10px] font-medium text-brand">{trimmed.split(" - ").pop()}</span>
            </div>
          );
        }

        return (
          <p key={i} className="text-xs leading-relaxed text-text-secondary">
            {trimmed}
          </p>
        );
      })}
    </div>
  );
}

function FormattedContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const hasStructured = lines.some((l) => isMealLine(l) || isCartLine(l));

  if (hasStructured) {
    return <MealPlanBlock lines={lines} />;
  }

  const paragraphs = content.split("\n\n").filter((p) => p.trim());
  return (
    <div className="space-y-3">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-xs leading-relaxed text-text-secondary">
          {para.split("\n").map((line, j) => (
            <span key={j}>
              {j > 0 && <br />}
              {line}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-brand/10 text-text-primary"
            : "bg-surface-elevated"
        }`}
      >
        {isUser ? (
          <p className="text-xs leading-relaxed">{message.content}</p>
        ) : (
          <FormattedContent content={message.content} />
        )}
      </div>
    </motion.div>
  );
}
