import React, { forwardRef } from "react";
import styles from "./MeterGroup.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MeterItem {
  label: string;
  value: number;
  /** CSS 색상 값 또는 토큰 (예: 'var(--ark-color-primary-500)') */
  color?: string;
}

export type MeterGroupSize = "sm" | "md" | "lg";
export type MeterGroupLegend = "none" | "bottom" | "right";

export interface MeterGroupProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 세그먼트 목록 */
  items: MeterItem[];
  /** 합산 기준값 (기본: items의 value 합산) */
  total?: number;
  /** 크기 */
  size?: MeterGroupSize;
  /** 레전드 위치 */
  legend?: MeterGroupLegend;
  /** 퍼센트 표시 */
  showPercent?: boolean;
  /** 값 표시 */
  showValue?: boolean;
  /** 단위 */
  unit?: string;
  /** 값 포맷 함수 */
  formatValue?: (value: number, percent: number) => string;
  /** 애니메이션 */
  animated?: boolean;
}

// ─── Default segment colors ───────────────────────────────────────────────────

const DEFAULT_COLORS = [
  "var(--ark-color-primary-500)",
  "var(--ark-color-success-500)",
  "var(--ark-color-warning-500)",
  "var(--ark-color-error-500)",
  "#8b5cf6",
  "#06b6d4",
  "#f97316",
  "#84cc16",
];

// ─── MeterGroup ───────────────────────────────────────────────────────────────

export const MeterGroup = forwardRef<HTMLDivElement, MeterGroupProps>(
  (
    {
      items,
      total: totalProp,
      size = "md",
      legend = "bottom",
      showPercent = true,
      showValue = false,
      unit = "",
      formatValue,
      animated = true,
      className,
      ...props
    },
    ref,
  ) => {
    const total = totalProp ?? items.reduce((sum, it) => sum + it.value, 0);

    const classes = [styles.root, styles[`size-${size}`], className].filter(Boolean).join(" ");

    const legendItems = (
      <div className={styles.legend}>
        {items.map((item, i) => {
          const pct = total === 0 ? 0 : (item.value / total) * 100;
          const color = item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
          const displayStr = formatValue
            ? formatValue(item.value, Math.round(pct))
            : showValue
              ? `${item.value}${unit}`
              : showPercent
                ? `${Math.round(pct)}%`
                : "";

          return (
            <div key={i} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: color }} />
              <span className={styles.legendLabel}>{item.label}</span>
              {displayStr && (
                <span className={styles.legendValue}>{displayStr}</span>
              )}
            </div>
          );
        })}
      </div>
    );

    return (
      <div
        ref={ref}
        className={classes}
        style={legend === "right" ? { display: "flex", gap: "var(--ark-spacing-4)", alignItems: "center" } : undefined}
        {...props}
      >
        {/* Bar */}
        <div className={[styles.bar, animated ? styles.barAnimated : ""].filter(Boolean).join(" ")} style={legend === "right" ? { flex: 1 } : undefined}>
          {total === 0 ? (
            <div className={styles.emptyBar} />
          ) : (
            items.map((item, i) => {
              const pct = (item.value / total) * 100;
              if (pct === 0) return null;
              const color = item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length];
              return (
                <div
                  key={i}
                  className={styles.segment}
                  style={{
                    width: `${pct}%`,
                    background: color,
                    "--seg-color": color,
                  } as React.CSSProperties}
                  title={`${item.label}: ${item.value}${unit} (${Math.round(pct)}%)`}
                />
              );
            })
          )}
        </div>

        {/* Legend */}
        {legend !== "none" && legendItems}
      </div>
    );
  },
);

MeterGroup.displayName = "MeterGroup";
