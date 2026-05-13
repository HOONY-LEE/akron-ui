import React, { forwardRef } from "react";
import styles from "./ProgressRing.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ProgressRingSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressRingColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

const SIZE_MAP: Record<ProgressRingSize, number> = {
  xs: 32,
  sm: 48,
  md: 64,
  lg: 96,
  xl: 128,
};

const STROKE_MAP: Record<ProgressRingSize, number> = {
  xs: 3,
  sm: 4,
  md: 5,
  lg: 7,
  xl: 9,
};

const COLOR_MAP: Record<ProgressRingColor, string> = {
  primary: "var(--ark-color-primary)",
  success: "#22c55e",
  warning: "#f97316",
  danger: "#ef4444",
  info: "#3b82f6",
};

export interface ProgressRingProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 진행률 0–100 */
  value: number;
  /** 크기 */
  size?: ProgressRingSize;
  /** 색상 */
  color?: ProgressRingColor;
  /** 링 두께 */
  strokeWidth?: number;
  /** 중앙 레이블 (기본: 퍼센트 표시) */
  label?: React.ReactNode;
  /** 레이블 숨김 */
  hideLabel?: boolean;
  /** 트랙 색상 오버라이드 */
  trackColor?: string;
  /** 진행 색상 오버라이드 */
  progressColor?: string;
  /** 애니메이션 */
  animate?: boolean;
}

// ─── ProgressRing ─────────────────────────────────────────────────────────────

export const ProgressRing = forwardRef<HTMLDivElement, ProgressRingProps>(
  (
    {
      value,
      size = "md",
      color = "primary",
      strokeWidth,
      label,
      hideLabel = false,
      trackColor,
      progressColor,
      animate = true,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const clampedValue = Math.min(100, Math.max(0, value));
    const diameter = SIZE_MAP[size];
    const sw = strokeWidth ?? STROKE_MAP[size];
    const radius = (diameter - sw) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (clampedValue / 100) * circumference;

    const track = trackColor ?? "var(--ark-color-border)";
    const progress = progressColor ?? COLOR_MAP[color];

    const labelContent =
      label !== undefined ? label : `${Math.round(clampedValue)}%`;

    const classes = [
      styles.root,
      animate && styles.animate,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ width: diameter, height: diameter, ...style }}
        role="progressbar"
        aria-valuenow={clampedValue}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <svg
          width={diameter}
          height={diameter}
          viewBox={`0 0 ${diameter} ${diameter}`}
          fill="none"
          className={styles.svg}
        >
          {/* Track */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={track}
            strokeWidth={sw}
          />
          {/* Progress */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            stroke={progress}
            strokeWidth={sw}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={styles.progressCircle}
            style={
              animate
                ? ({
                    "--dash-offset": offset,
                    "--circumference": circumference,
                  } as React.CSSProperties)
                : undefined
            }
          />
        </svg>

        {/* Center label */}
        {!hideLabel && (
          <div className={styles.label}>
            {labelContent}
          </div>
        )}
      </div>
    );
  },
);

ProgressRing.displayName = "ProgressRing";
