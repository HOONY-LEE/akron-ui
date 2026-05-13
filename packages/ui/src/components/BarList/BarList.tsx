import React, { forwardRef, useMemo } from "react";
import styles from "./BarList.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BarListSize = "sm" | "md" | "lg";

export interface BarListItem {
  /** 라벨 */
  name: string;
  /** 값 */
  value: number;
  /** 색상 */
  color?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 클릭 링크 */
  href?: string;
}

export interface BarListProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 항목 목록 */
  data: BarListItem[];
  /** 크기 */
  size?: BarListSize;
  /** 값 포맷터 */
  valueFormatter?: (value: number) => string;
  /** 정렬 */
  sortOrder?: "ascending" | "descending" | "none";
  /** 최대값 (기본: 자동) */
  maxValue?: number;
  /** 항목 클릭 콜백 */
  onItemClick?: (item: BarListItem) => void;
  /** 색상 */
  color?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const BarList = forwardRef<HTMLDivElement, BarListProps>(
  (
    {
      data,
      size = "md",
      valueFormatter = (v) => v.toLocaleString(),
      sortOrder = "descending",
      maxValue,
      onItemClick,
      color,
      className,
      ...rest
    },
    ref
  ) => {
    const sortedData = useMemo(() => {
      if (sortOrder === "none") return data;
      const sorted = [...data];
      sorted.sort((a, b) =>
        sortOrder === "descending" ? b.value - a.value : a.value - b.value
      );
      return sorted;
    }, [data, sortOrder]);

    const max = useMemo(
      () => maxValue ?? Math.max(...data.map((d) => d.value), 1),
      [data, maxValue]
    );

    const rootCls = [styles.root, styles[size], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} role="list" {...rest}>
        {sortedData.map((item, i) => {
          const pct = Math.max(0, Math.min(100, (item.value / max) * 100));
          const barColor = item.color || color || "var(--ark-color-primary-500)";
          const isClickable = !!onItemClick || !!item.href;

          const content = (
            <>
              <div className={styles.barTrack}>
                <div
                  className={styles.barFill}
                  style={{
                    width: `${pct}%`,
                    background: barColor,
                  }}
                />
                <div className={styles.labelRow}>
                  {item.icon && (
                    <span className={styles.icon}>{item.icon}</span>
                  )}
                  <span className={styles.name}>{item.name}</span>
                </div>
              </div>
              <span className={styles.value}>
                {valueFormatter(item.value)}
              </span>
            </>
          );

          if (item.href) {
            return (
              <a
                key={i}
                href={item.href}
                className={[styles.item, isClickable && styles.clickable]
                  .filter(Boolean)
                  .join(" ")}
                role="listitem"
              >
                {content}
              </a>
            );
          }

          return (
            <div
              key={i}
              className={[styles.item, isClickable && styles.clickable]
                .filter(Boolean)
                .join(" ")}
              role="listitem"
              onClick={() => onItemClick?.(item)}
              tabIndex={isClickable ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && onItemClick) {
                  e.preventDefault();
                  onItemClick(item);
                }
              }}
            >
              {content}
            </div>
          );
        })}
      </div>
    );
  }
);

BarList.displayName = "BarList";
