import React, { forwardRef } from "react";
import styles from "./DonutChart.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DonutChartSize = "sm" | "md" | "lg";

export interface DonutChartItem {
  name: string;
  value: number;
  color?: string;
}

export interface DonutChartProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "data"> {
  /** Chart data */
  data: DonutChartItem[];
  /** Chart size */
  size?: DonutChartSize;
  /** Stroke width ratio 0-1. 1 = pie chart. Default 0.3 */
  thickness?: number;
  /** Show center label. Default true */
  showLabel?: boolean;
  /** Custom center label */
  label?: string;
  /** Format the displayed value */
  valueFormatter?: (value: number, total: number) => string;
  /** Animate segments on mount. Default true */
  animate?: boolean;
  /** Show legend. Default true */
  showLegend?: boolean;
  /** Legend position. Default 'bottom' */
  legendPosition?: "bottom" | "right";
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<DonutChartSize, number> = {
  sm: 120,
  md: 180,
  lg: 240,
};

const DEFAULT_COLORS = [
  "var(--ark-color-primary-500)",
  "var(--ark-color-success-500)",
  "var(--ark-color-warning-500)",
  "var(--ark-color-error-500)",
  "var(--ark-color-info-500)",
];

const EXTRA_HUES = [280, 330, 30, 160, 200, 70, 310, 10, 250, 130];

function getSegmentColor(index: number): string {
  if (index < DEFAULT_COLORS.length) {
    return DEFAULT_COLORS[index];
  }
  const hue = EXTRA_HUES[(index - DEFAULT_COLORS.length) % EXTRA_HUES.length];
  return `hsl(${hue}, 65%, 55%)`;
}

const LABEL_SIZE_CLASS: Record<DonutChartSize, string> = {
  sm: styles.centerLabelSm,
  md: styles.centerLabelMd,
  lg: styles.centerLabelLg,
};

// ─── DonutChart ───────────────────────────────────────────────────────────────

export const DonutChart = forwardRef<HTMLDivElement, DonutChartProps>(
  (
    {
      data,
      size = "md",
      thickness = 0.3,
      showLabel = true,
      label,
      valueFormatter,
      animate = true,
      showLegend = true,
      legendPosition = "bottom",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const diameter = SIZE_MAP[size];
    const clampedThickness = Math.min(1, Math.max(0, thickness));
    const strokeWidth = (diameter / 2) * clampedThickness;
    const radius = (diameter - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Build segments
    let cumulativeOffset = 0;
    const segments = data.map((item, index) => {
      const ratio = total > 0 ? item.value / total : 0;
      const dashLength = ratio * circumference;
      const dashGap = circumference - dashLength;
      const offset = -cumulativeOffset;
      cumulativeOffset += dashLength;

      return {
        ...item,
        color: item.color ?? getSegmentColor(index),
        dashArray: `${dashLength} ${dashGap}`,
        dashOffset: offset,
        dashLength,
      };
    });

    const centerText =
      label ??
      (valueFormatter ? valueFormatter(total, total) : String(total));

    const rootClasses = [
      styles.root,
      legendPosition === "bottom"
        ? styles.rootLegendBottom
        : styles.rootLegendRight,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const chartWrapperClasses = [
      styles.chartWrapper,
      animate && styles.animate,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootClasses} style={style} {...props}>
        <div
          className={chartWrapperClasses}
          style={{ width: diameter, height: diameter }}
        >
          <svg
            className={styles.chart}
            width={diameter}
            height={diameter}
            viewBox={`0 0 ${diameter} ${diameter}`}
            fill="none"
            role="img"
            aria-label={
              label ??
              `Donut chart with total ${total}`
            }
          >
            {segments.map((seg, i) => (
              <circle
                key={i}
                className={styles.segment}
                cx={diameter / 2}
                cy={diameter / 2}
                r={radius}
                stroke={seg.color}
                strokeWidth={strokeWidth}
                strokeDasharray={seg.dashArray}
                strokeDashoffset={seg.dashOffset}
                fill="none"
                style={
                  animate
                    ? ({
                        "--dash-offset": seg.dashOffset,
                        "--circumference": circumference,
                        animationDelay: `${i * 80}ms`,
                      } as React.CSSProperties)
                    : undefined
                }
              />
            ))}
          </svg>

          {showLabel && (
            <div
              className={`${styles.centerLabel} ${LABEL_SIZE_CLASS[size]}`}
            >
              {centerText}
            </div>
          )}
        </div>

        {showLegend && (
          <div className={styles.legend}>
            {segments.map((seg, i) => (
              <div key={i} className={styles.legendItem}>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: seg.color }}
                />
                <span className={styles.legendName}>{seg.name}</span>
                <span className={styles.legendValue}>
                  {valueFormatter
                    ? valueFormatter(seg.value, total)
                    : seg.value}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  },
);

DonutChart.displayName = "DonutChart";
