"use client";

import { useState, type KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled: boolean;
  isLoading: boolean;
  placeholder: string;
}

export function ChatInput({
  onSend,
  disabled,
  isLoading,
  placeholder,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim() || disabled || isLoading) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  const canSend = value.trim().length > 0 && !isLoading && !disabled;

  return (
    <div className="border-t border-border px-4 py-3">
      <div className="flex items-center gap-3">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none disabled:opacity-30"
        />
        <button
          onClick={handleSend}
          disabled={!canSend}
          className={`rounded-xl p-2.5 transition-all duration-200 ${
            canSend
              ? "bg-brand/15 text-brand hover:bg-brand/25"
              : "bg-surface-elevated text-text-muted"
          }`}
        >
          <Send size={15} />
        </button>
      </div>
    </div>
  );
}
