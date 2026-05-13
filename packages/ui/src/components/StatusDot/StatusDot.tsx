import React, { forwardRef } from "react";
import styles from "./StatusDot.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatusDotColor = "success" | "warning" | "error" | "info" | "gray" | "primary";
export type StatusDotSize = "xs" | "sm" | "md" | "lg";

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 상태 색상 */
  color?: StatusDotColor;
  /** 크기 */
  size?: StatusDotSize;
  /** 펄스 애니메이션 */
  pulse?: boolean;
  /** 라벨 텍스트 */
  label?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const StatusDot = forwardRef<HTMLSpanElement, StatusDotProps>(
  (
    {
      color = "gray",
      size = "md",
      pulse = false,
      label,
      className,
      ...rest
    },
    ref
  ) => {
    const rootCls = [
      styles.root,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const dotCls = [
      styles.dot,
      styles[color],
      styles[size],
      pulse && styles.pulse,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <span ref={ref} className={rootCls} {...rest}>
        <span className={dotCls} aria-hidden="true" />
        {label && <span className={styles.label}>{label}</span>}
      </span>
    );
  }
);

StatusDot.displayName = "StatusDot";
