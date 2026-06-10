import React, { useState } from "react";
import { QUICK_PROMPTS } from "../data/products";
import styles from "./ChatInput.module.css";

/**
 * @param {{ onSend: (text: string) => void, isLoading: boolean }} props
 */
export default function ChatInput({ onSend, isLoading }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSend(trimmed);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const useQuickPrompt = (prompt) => {
    if (isLoading) return;
    onSend(prompt);
  };

  return (
    <div className={styles.container}>
      <div className={styles.quickPrompts}>
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            className={styles.chip}
            onClick={() => useQuickPrompt(prompt)}
            disabled={isLoading}
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className={styles.inputRow}>
        <input
          type="text"
          className={styles.input}
          placeholder="Describe what you're looking for…"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          aria-label="Product preference input"
        />
        <button
          className={styles.sendButton}
          onClick={handleSend}
          disabled={isLoading || !value.trim()}
          aria-label="Send message"
        >
          {isLoading ? (
            <span className={styles.spinner} />
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          )}
          <span>{isLoading ? "Thinking…" : "Ask AI"}</span>
        </button>
      </div>
    </div>
  );
}
