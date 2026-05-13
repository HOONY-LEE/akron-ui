import React, { forwardRef } from "react";
import styles from "./Gauge.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GaugeSize = "sm" | "md" | "lg" | "xl";
export type GaugeColor = "primary" | "success" | "warning" | "danger" | "auto";

export interface GaugeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 현재 값 */
  value: number;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 크기 */
  size?: GaugeSize;
  /** 색상 */
  color?: GaugeColor;
  /** 중앙 레이블 */
  label?: string;
  /** 값 표시 여부 */
  showValue?: boolean;
  /** 최솟값/최댓값 표시 여부 */
  showMinMax?: boolean;
  /** 값 포맷 함수 */
  formatValue?: (value: number, percent: number) => string;
  /** 두께 (px, 기본값은 size에 따라 결정) */
  thickness?: number;
  /** 애니메이션 */
  animated?: boolean;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const SIZE_MAP: Record<GaugeSize, { svgSize: number; defaultThickness: number; valueFontClass: string; labelFontClass: string }> = {
  sm:  { svgSize: 80,  defaultThickness: 6,  valueFontClass: styles.valueSm,  labelFontClass: styles.labelSm  },
  md:  { svgSize: 120, defaultThickness: 8,  valueFontClass: styles.valueMd,  labelFontClass: styles.labelMd  },
  lg:  { svgSize: 160, defaultThickness: 10, valueFontClass: styles.valueLg,  labelFontClass: styles.labelLg  },
  xl:  { svgSize: 200, defaultThickness: 12, valueFontClass: styles.valueXl,  labelFontClass: styles.labelXl  },
};

const COLOR_VAR: Record<Exclude<GaugeColor, "auto">, string> = {
  primary: "var(--ark-color-primary-500)",
  success: "var(--ark-color-success-500)",
  warning: "var(--ark-color-warning-500)",
  danger:  "var(--ark-color-error-500)",
};

const GAUGE_DEGREES = 270;

// ─── Gauge ────────────────────────────────────────────────────────────────────

export const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      size = "md",
      color = "primary",
      label,
      showValue = true,
      showMinMax = false,
      formatValue,
      thickness,
      animated = true,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const { svgSize, defaultThickness, valueFontClass, labelFontClass } = SIZE_MAP[size];
    const strokeWidth = thickness ?? defaultThickness;

    // Clamp and compute percent
    const clamped = Math.min(Math.max(value, min), max);
    const percent = max === min ? 0 : (clamped - min) / (max - min);

    // Auto color selection
    let fillColor: string;
    if (color === "auto") {
      if (percent < 0.33) fillColor = "var(--ark-color-error-500)";
      else if (percent < 0.66) fillColor = "var(--ark-color-warning-500)";
      else fillColor = "var(--ark-color-success-500)";
    } else {
      fillColor = COLOR_VAR[color];
    }

    // SVG geometry
    const cx = svgSize / 2;
    const cy = svgSize / 2;
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const trackLength = (GAUGE_DEGREES / 360) * circumference;
    const trackGap = circumference - trackLength;
    const fillLength = percent * trackLength;

    // Rotation: start at bottom-left (225° from top = 135° from default 3 o'clock)
    const rotation = 135;

    const displayValue = formatValue
      ? formatValue(clamped, Math.round(percent * 100))
      : `${Math.round(clamped)}`;

    const classes = [styles.root, styles[`size-${size}`], className].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ "--gauge-fill-color": fillColor, ...style } as React.CSSProperties}
        {...props}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          className={styles.svg}
          aria-valuenow={clamped}
          aria-valuemin={min}
          aria-valuemax={max}
          role="meter"
        >
          {/* Track */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke="var(--ark-color-border)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${trackLength} ${trackGap}`}
            strokeLinecap="round"
            transform={`rotate(${rotation}, ${cx}, ${cy})`}
          />
          {/* Fill */}
          <circle
            cx={cx}
            cy={cy}
            r={radius}
            fill="none"
            stroke={fillColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${fillLength} ${circumference - fillLength}`}
            strokeLinecap="round"
            transform={`rotate(${rotation}, ${cx}, ${cy})`}
            className={animated ? styles.fill : undefined}
          />
        </svg>

        {/* Center content */}
        <div className={styles.center}>
          {showValue && (
            <span className={[styles.value, valueFontClass].join(" ")}>
              {displayValue}
            </span>
          )}
          {label && (
            <span className={[styles.label, labelFontClass].join(" ")}>
              {label}
            </span>
          )}
        </div>

        {/* Min/Max labels */}
        {showMinMax && (
          <div className={styles.minMax}>
            <span className={styles.minMaxText}>{min}</span>
            <span className={styles.minMaxText}>{max}</span>
          </div>
        )}
      </div>
    );
  },
);

Gauge.displayName = "Gauge";
