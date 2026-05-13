import React, { forwardRef, useState, useEffect } from "react";
import styles from "./ReadingProgress.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ReadingProgressPlacement = "top" | "bottom";
export type ReadingProgressColor =
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "gradient";

export interface ReadingProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 진행 바 두께 */
  height?: number;
  /** 위치 */
  placement?: ReadingProgressPlacement;
  /** 색상 */
  color?: ReadingProgressColor;
  /** 커스텀 색상 */
  progressColor?: string;
  /** 스크롤 컨테이너 (기본: window) */
  scrollContainer?: React.RefObject<HTMLElement>;
  /** z-index */
  zIndex?: number;
}

// ─── ReadingProgress ──────────────────────────────────────────────────────────

export const ReadingProgress = forwardRef<HTMLDivElement, ReadingProgressProps>(
  (
    {
      height = 3,
      placement = "top",
      color = "primary",
      progressColor,
      scrollContainer,
      zIndex = 1000,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const el = scrollContainer?.current ?? window;

      const onScroll = () => {
        if (scrollContainer?.current) {
          const { scrollTop, scrollHeight, clientHeight } =
            scrollContainer.current;
          const total = scrollHeight - clientHeight;
          setProgress(total > 0 ? (scrollTop / total) * 100 : 0);
        } else {
          const scrollTop =
            document.documentElement.scrollTop || document.body.scrollTop;
          const scrollHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0);
        }
      };

      el.addEventListener("scroll", onScroll, { passive: true });
      return () => el.removeEventListener("scroll", onScroll);
    }, [scrollContainer]);

    const COLOR_MAP: Record<ReadingProgressColor, string> = {
      primary: "var(--ark-color-primary)",
      success: "#22c55e",
      warning: "#f97316",
      danger: "#ef4444",
      gradient: "linear-gradient(90deg, var(--ark-color-primary-400), var(--ark-color-primary-600))",
    };

    const fg = progressColor ?? COLOR_MAP[color];
    const isGradient = color === "gradient" || (progressColor?.includes("gradient") ?? false);

    const classes = [
      styles.root,
      styles[`placement-${placement}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{
          height,
          zIndex,
          ...style,
        }}
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        {...props}
      >
        <div
          className={styles.bar}
          style={{
            width: `${progress}%`,
            background: fg,
            ...(isGradient ? { backgroundSize: "200% 100%" } : {}),
          }}
        />
      </div>
    );
  },
);

ReadingProgress.displayName = "ReadingProgress";
