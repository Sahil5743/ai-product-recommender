import React from "react";
import styles from "./ProductCard.module.css";

/**
 * @param {{ product: import("../data/products").Product, highlighted: boolean, reason: string|null }} props
 */
export default function ProductCard({ product, highlighted, reason }) {
  return (
    <div className={`${styles.card} ${highlighted ? styles.highlighted : ""}`}>
      <div className={styles.header}>
        <div className={styles.nameGroup}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.brand}>{product.brand}</span>
        </div>
        <span className={styles.price}>${product.price}</span>
      </div>

      <p className={styles.description}>{product.description}</p>

      <div className={styles.footer}>
        <span className={styles.categoryTag}>{product.category}</span>
        {product.tags.map((tag) => (
          <span key={tag} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>

      {highlighted && reason && (
        <div className={styles.reason}>
          <span className={styles.reasonIcon}>✓</span>
          {reason}
        </div>
      )}
    </div>
  );
}
