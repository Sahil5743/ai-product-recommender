import React, { useState, useMemo } from "react";
import { PRODUCTS, CATEGORIES } from "../data/products";
import ProductCard from "./ProductCard";
import styles from "./ProductCatalog.module.css";

/**
 * @param {{ highlightMap: Map<number, string> }} props
 */
export default function ProductCatalog({ highlightMap }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMatchesOnly, setShowMatchesOnly] = useState(false);

  const recommendationOrder = useMemo(
    () => Array.from(highlightMap.keys()),
    [highlightMap]
  );

  const filtered = useMemo(() => {
    const results = PRODUCTS.filter((p) => {
      const categoryMatch = activeCategory === "All" || p.category === activeCategory;
      const matchFilter = !showMatchesOnly || highlightMap.has(p.id);
      return categoryMatch && matchFilter;
    });

    return results.sort((left, right) => {
      const leftRank = recommendationOrder.indexOf(left.id);
      const rightRank = recommendationOrder.indexOf(right.id);

      if (leftRank === -1 && rightRank === -1) return 0;
      if (leftRank === -1) return 1;
      if (rightRank === -1) return -1;

      return leftRank - rightRank;
    });
  }, [activeCategory, showMatchesOnly, highlightMap, recommendationOrder]);

  const matchCount = highlightMap.size;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <div className={styles.titleRow}>
          <h2 className={styles.title}>Product catalog</h2>
          {matchCount > 0 && (
            <span className={styles.matchBadge}>
              {matchCount} match{matchCount !== 1 ? "es" : ""}
            </span>
          )}
        </div>

        <div className={styles.filters}>
          <div className={styles.categoryTabs}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`${styles.tab} ${activeCategory === cat ? styles.activeTab : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {matchCount > 0 && (
            <button
              className={`${styles.filterToggle} ${showMatchesOnly ? styles.filterActive : ""}`}
              onClick={() => setShowMatchesOnly((v) => !v)}
            >
              {showMatchesOnly ? "Show all" : "Matches only"}
            </button>
          )}
        </div>
      </div>

      <div className={styles.grid}>
        {filtered.length === 0 ? (
          <p className={styles.empty}>No products match this filter.</p>
        ) : (
          filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              highlighted={highlightMap.has(product.id)}
              reason={highlightMap.get(product.id) || null}
            />
          ))
        )}
      </div>
    </div>
  );
}
