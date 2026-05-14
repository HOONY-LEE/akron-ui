import React, { forwardRef } from "react";
import styles from "./FeatureCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FeatureCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이콘 (ReactNode) */
  icon?: React.ReactNode;
  /** 아이콘 배경 색상 */
  iconBg?: string;
  /** 아이콘 색상 */
  iconColor?: string;
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 레이아웃 */
  layout?: "vertical" | "horizontal";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FeatureCard = forwardRef<HTMLDivElement, FeatureCardProps>(
  (
    {
      icon,
      iconBg = "var(--akron-primary-light)",
      iconColor = "var(--akron-primary)",
      title,
      description,
      size = "md",
      layout = "vertical",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${layout === "horizontal" ? styles.horizontal : ""} ${className ?? ""}`}
        {...rest}
      >
        {icon && (
          <div
            className={styles.iconWrapper}
            style={{ backgroundColor: iconBg, color: iconColor }}
          >
            {icon}
          </div>
        )}
        <div>
          <h4 className={styles.title}>{title}</h4>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    );
  }
);

FeatureCard.displayName = "FeatureCard";
