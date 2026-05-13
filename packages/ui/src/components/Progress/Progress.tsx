import { forwardRef } from "react";
import styles from "./Progress.module.css";

export type ProgressColor = "primary" | "success" | "warning" | "error" | "info";
export type ProgressSize = "xs" | "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 현재 값 (0-100) */
  value?: number;
  /** 최대 값 (기본 100) */
  max?: number;
  /** 색상 */
  color?: ProgressColor;
  /** 크기 (높이) */
  size?: ProgressSize;
  /** 라벨 텍스트 */
  label?: string;
  /** 퍼센트 표시 */
  showValue?: boolean;
  /** 줄무늬 애니메이션 */
  striped?: boolean;
  /** 애니메이션 */
  animated?: boolean;
  className?: string;
}

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      value = 0,
      max = 100,
      color = "primary",
      size = "md",
      label,
      showValue = false,
      striped = false,
      animated = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {(label || showValue) && (
          <div className={styles.header}>
            {label && <span className={styles.label}>{label}</span>}
            {showValue && (
              <span className={styles.value}>{Math.round(percentage)}%</span>
            )}
          </div>
        )}

        <div
          className={[styles.track, styles[size]].join(" ")}
          role="progressbar"
          aria-valuenow={clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          <div
            className={[
              styles.bar,
              styles[color],
              striped ? styles.striped : "",
              animated ? styles.animated : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  },
);

Progress.displayName = "Progress";
