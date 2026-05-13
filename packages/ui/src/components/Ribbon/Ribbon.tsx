import React, { forwardRef } from "react";
import styles from "./Ribbon.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type RibbonColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export type RibbonPlacement = "top-left" | "top-right";

export interface RibbonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 리본에 표시할 텍스트 */
  label: string;
  /** 리본 색상 */
  color?: RibbonColor;
  /** 리본 위치 */
  placement?: RibbonPlacement;
  /** 자식 요소 (리본이 붙을 컨테이너) */
  children: React.ReactNode;
}

// ─── Ribbon ───────────────────────────────────────────────────────────────────

export const Ribbon = forwardRef<HTMLDivElement, RibbonProps>(
  (
    {
      label,
      color = "primary",
      placement = "top-right",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const wrapClass = [styles.wrapper, className].filter(Boolean).join(" ");

    const ribbonClass = [
      styles.ribbon,
      styles[`color-${color}`],
      styles[`placement-${placement}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapClass} {...props}>
        {children}
        <div className={ribbonClass} aria-label={label}>
          <span className={styles.label}>{label}</span>
        </div>
      </div>
    );
  },
);

Ribbon.displayName = "Ribbon";
