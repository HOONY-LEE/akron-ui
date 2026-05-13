import React, { forwardRef } from "react";
import styles from "./GlassCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GlassCardBlur = "sm" | "md" | "lg" | "xl";
export type GlassCardBorder = "none" | "subtle" | "visible";

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 블러 강도 */
  blur?: GlassCardBlur;
  /** 테두리 스타일 */
  border?: GlassCardBorder;
  /** 그림자 */
  shadow?: boolean;
  /** 호버 효과 */
  hoverable?: boolean;
  /** 불투명도 (0-100) */
  opacity?: number;
  children: React.ReactNode;
}

// ─── GlassCard ────────────────────────────────────────────────────────────────

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      blur = "md",
      border = "subtle",
      shadow = true,
      hoverable = false,
      opacity = 15,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.root,
      styles[`blur-${blur}`],
      styles[`border-${border}`],
      shadow && styles.shadow,
      hoverable && styles.hoverable,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyle: React.CSSProperties = {
      ...style,
      "--glass-opacity": `${opacity}%`,
    } as React.CSSProperties;

    return (
      <div ref={ref} className={classes} style={inlineStyle} {...props}>
        {children}
      </div>
    );
  },
);

GlassCard.displayName = "GlassCard";
