import React, { useEffect, useRef } from "react";
import styles from "./ChatPanel.module.css";

/**
 * @typedef {Object} Message
 * @property {"user"|"ai"} role
 * @property {string} content
 */

/**
 * @param {{ messages: Message[], isLoading: boolean, error: string|null }} props
 */
export default function ChatPanel({ messages, isLoading, error }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  return (
    <div className={styles.container}>
      {messages.length === 0 && !isLoading && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>✦</div>
          <p className={styles.emptyTitle}>Ask for a recommendation</p>
          <p className={styles.emptyHint}>
            Try "I want a phone under $500" or "Best noise-cancelling headphones"
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <div key={i} className={`${styles.message} ${styles[msg.role]}`}>
          <span className={styles.label}>{msg.role === "user" ? "You" : "AI assistant"}</span>
          <div className={styles.bubble}>{msg.content}</div>
        </div>
      ))}

      {isLoading && (
        <div className={`${styles.message} ${styles.ai}`}>
          <span className={styles.label}>AI assistant</span>
          <div className={styles.bubble}>
            <div className={styles.typing}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className={styles.error}>
          <span>⚠</span> {error}
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
