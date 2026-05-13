import React, { forwardRef } from "react";
import styles from "./LoadingOverlay.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LoadingOverlayVariant = "spinner" | "dots" | "pulse";

export interface LoadingOverlayProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 오버레이 표시 여부 */
  visible: boolean;
  /** 로딩 인디케이터 종류 */
  variant?: LoadingOverlayVariant;
  /** 로딩 텍스트 */
  label?: string;
  /** 오버레이 blur */
  blur?: boolean;
  /** 배경 불투명도 (0~1) */
  opacity?: number;
  /** z-index */
  zIndex?: number;
}

// ─── Spinner ──────────────────────────────────────────────────────────────────

const Spinner: React.FC = () => (
  <div className={styles.spinner} aria-hidden="true" />
);

const Dots: React.FC = () => (
  <div className={styles.dots} aria-hidden="true">
    <div className={styles.dot} />
    <div className={styles.dot} />
    <div className={styles.dot} />
  </div>
);

const Pulse: React.FC = () => (
  <div className={styles.pulse} aria-hidden="true" />
);

// ─── LoadingOverlay ───────────────────────────────────────────────────────────

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  (
    {
      visible,
      variant = "spinner",
      label,
      blur = false,
      opacity = 0.6,
      zIndex,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    if (!visible) return null;

    const inlineStyle: React.CSSProperties = {
      "--overlay-opacity": opacity,
      "--overlay-z": zIndex ?? 10,
      zIndex: zIndex ?? 10,
      ...style,
    } as React.CSSProperties;

    const classes = [
      styles.overlay,
      blur && styles.blur,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={inlineStyle}
        role="status"
        aria-label={label ?? "로딩 중"}
        {...props}
      >
        <div className={styles.content}>
          {variant === "spinner" && <Spinner />}
          {variant === "dots" && <Dots />}
          {variant === "pulse" && <Pulse />}
          {label && <span className={styles.label}>{label}</span>}
        </div>
      </div>
    );
  },
);

LoadingOverlay.displayName = "LoadingOverlay";
