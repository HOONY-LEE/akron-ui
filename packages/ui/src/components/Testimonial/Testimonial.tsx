import React, { forwardRef } from "react";
import { Quote, Star } from "lucide-react";
import styles from "./Testimonial.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TestimonialProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 추천사 본문 */
  quote: string;
  /** 작성자 이름 */
  authorName: string;
  /** 작성자 직책/역할 */
  authorTitle?: string;
  /** 작성자 프로필 이미지 URL */
  authorImage?: string;
  /** 별점 (0~5) */
  rating?: number;
  /** 변형 */
  variant?: "card" | "minimal" | "featured";
  /** 크기 */
  size?: "sm" | "md" | "lg";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Testimonial = forwardRef<HTMLDivElement, TestimonialProps>(
  (
    {
      quote,
      authorName,
      authorTitle,
      authorImage,
      rating,
      variant = "card",
      size = "md",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[variant]} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        {variant === "featured" && (
          <div className={styles.quoteIcon}>
            <Quote size={size === "sm" ? 24 : size === "lg" ? 40 : 32} />
          </div>
        )}

        {rating !== undefined && rating > 0 && (
          <div className={styles.stars}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                size={size === "sm" ? 14 : size === "lg" ? 20 : 16}
                className={i < rating ? styles.starFilled : styles.starEmpty}
                fill={i < rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        )}

        <blockquote className={styles.quote}>
          {variant !== "featured" && (
            <Quote size={14} className={styles.inlineQuoteIcon} />
          )}
          {quote}
        </blockquote>

        <div className={styles.author}>
          {authorImage && (
            <img src={authorImage} alt={authorName} className={styles.avatar} />
          )}
          <div className={styles.authorInfo}>
            <span className={styles.authorName}>{authorName}</span>
            {authorTitle && <span className={styles.authorTitle}>{authorTitle}</span>}
          </div>
        </div>
      </div>
    );
  }
);

Testimonial.displayName = "Testimonial";
