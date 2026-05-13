import React, { forwardRef } from "react";
import styles from "./GradientText.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type GradientTextPreset =
  | "primary"
  | "secondary"
  | "sunset"
  | "ocean"
  | "forest"
  | "candy"
  | "mono";

/** 지원하는 텍스트 HTML 태그 */
export type GradientTextTag =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "div"
  | "strong"
  | "em"
  | "label";

export interface GradientTextProps
  extends React.HTMLAttributes<HTMLElement> {
  /** 그라디언트 프리셋 */
  preset?: GradientTextPreset;
  /** 커스텀 그라디언트 (CSS gradient 문자열) */
  gradient?: string;
  /** 애니메이션 shimmer 효과 */
  animate?: boolean;
  /** 렌더링할 HTML 태그 */
  as?: GradientTextTag;
  children: React.ReactNode;
}

// ─── Gradient presets ─────────────────────────────────────────────────────────

const PRESET_GRADIENTS: Record<GradientTextPreset, string> = {
  primary:
    "linear-gradient(135deg, var(--ark-color-primary-400), var(--ark-color-primary-600))",
  secondary:
    "linear-gradient(135deg, var(--ark-color-primary-300), var(--ark-color-primary-700))",
  sunset: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
  ocean: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6)",
  forest: "linear-gradient(135deg, #10b981, #059669, #047857)",
  candy: "linear-gradient(135deg, #f43f5e, #a855f7, #3b82f6)",
  mono: "linear-gradient(135deg, var(--ark-color-text-secondary), var(--ark-color-text-primary))",
};

// ─── GradientText ─────────────────────────────────────────────────────────────

export const GradientText = forwardRef<HTMLElement, GradientTextProps>(
  (
    {
      preset = "primary",
      gradient,
      animate = false,
      as: Tag = "span",
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const bg = gradient ?? PRESET_GRADIENTS[preset];

    const classes = [styles.root, animate && styles.animate, className]
      .filter(Boolean)
      .join(" ");

    const inlineStyle: React.CSSProperties = {
      ...style,
      "--gradient-bg": bg,
    } as React.CSSProperties;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const TagComponent = Tag as any;

    return (
      <TagComponent
        ref={ref}
        className={classes}
        style={inlineStyle}
        {...props}
      >
        {children}
      </TagComponent>
    );
  },
);

GradientText.displayName = "GradientText";
