import React, { useState, useCallback } from "react";
import ProductCatalog from "./components/ProductCatalog";
import ChatPanel from "./components/ChatPanel";
import ChatInput from "./components/ChatInput";
import { useRecommendations } from "./hooks/useRecommendations";
import styles from "./App.module.css";

/**
 * @typedef {{ role: "user"|"ai", content: string }} Message
 */

export default function App() {
  const [messages, setMessages] = useState([]);
  const [highlightMap, setHighlightMap] = useState(new Map());

  const { getRecommendations, isLoading, error } = useRecommendations();

  const handleSend = useCallback(
    async (text) => {
      // Add the user message immediately
      setMessages((prev) => [...prev, { role: "user", content: text }]);

      const result = await getRecommendations(text);

      if (result) {
        // Add AI message
        setMessages((prev) => [...prev, { role: "ai", content: result.message }]);

        // Build highlight map: productId -> reason string
        const newMap = new Map(
          result.recommendations.map((r) => [r.id, r.reason])
        );
        setHighlightMap(newMap);
      }
    },
    [getRecommendations]
  );

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>✦</span>
          <span className={styles.logoText}>AI Product Recommender</span>
        </div>
        <p className={styles.tagline}>Tell the AI what you need — it'll find your best match.</p>
      </header>

      <main className={styles.main}>
        <div className={styles.splitPane}>
          {/* Left: product catalog */}
          <ProductCatalog highlightMap={highlightMap} />

          {/* Right: chat interface */}
          <div className={styles.chatPane}>
            <div className={styles.chatHeader}>
              <span className={styles.chatIcon}>✦</span>
              <h2 className={styles.chatTitle}>AI assistant</h2>
              <span className={styles.poweredBy}>Powered by Claude</span>
            </div>
            <ChatPanel messages={messages} isLoading={isLoading} error={error} />
            <ChatInput onSend={handleSend} isLoading={isLoading} />
          </div>
        </div>
      </main>
    </div>
  );
}
