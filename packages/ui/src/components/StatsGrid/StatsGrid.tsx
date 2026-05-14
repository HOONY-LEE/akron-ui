import React, { forwardRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import styles from "./StatsGrid.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StatItem {
  /** 고유 ID */
  id: string;
  /** 라벨 */
  label: string;
  /** 값 */
  value: string | number;
  /** 이전 대비 변화율 (%) */
  change?: number;
  /** 변화 설명 */
  changeLabel?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 접미사 */
  suffix?: string;
  /** 접두사 */
  prefix?: string;
}

export interface StatsGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 통계 항목 목록 */
  items: StatItem[];
  /** 열 수 */
  columns?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 변형 */
  variant?: "default" | "bordered" | "filled";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const StatsGrid = forwardRef<HTMLDivElement, StatsGridProps>(
  (
    {
      items,
      columns = 4,
      size = "md",
      variant = "default",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${styles[variant]} ${className ?? ""}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        {...rest}
      >
        {items.map((item) => {
          const trend =
            item.change === undefined
              ? "neutral"
              : item.change > 0
                ? "up"
                : item.change < 0
                  ? "down"
                  : "neutral";

          return (
            <div key={item.id} className={styles.card}>
              <div className={styles.cardHeader}>
                <span className={styles.label}>{item.label}</span>
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
              </div>

              <div className={styles.valueRow}>
                <span className={styles.value}>
                  {item.prefix}
                  {item.value}
                  {item.suffix}
                </span>
              </div>

              {item.change !== undefined && (
                <div className={`${styles.changeRow} ${styles[trend]}`}>
                  <span className={styles.trendIcon}>
                    {trend === "up" ? (
                      <TrendingUp size={14} />
                    ) : trend === "down" ? (
                      <TrendingDown size={14} />
                    ) : (
                      <Minus size={14} />
                    )}
                  </span>
                  <span className={styles.changeValue}>
                    {item.change > 0 ? "+" : ""}
                    {item.change}%
                  </span>
                  {item.changeLabel && (
                    <span className={styles.changeLabel}>{item.changeLabel}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

StatsGrid.displayName = "StatsGrid";
