import React, { forwardRef, useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import styles from "./BackToTop.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BackToTopPosition =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export type BackToTopVariant = "filled" | "outline" | "ghost";
export type BackToTopSize = "sm" | "md" | "lg";

export interface BackToTopProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 버튼 표시 시작 스크롤 위치 (px) */
  threshold?: number;
  /** 위치 */
  position?: BackToTopPosition;
  /** 변형 */
  variant?: BackToTopVariant;
  /** 크기 */
  size?: BackToTopSize;
  /** 스크롤 동작 */
  behavior?: ScrollBehavior;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 레이블 텍스트 */
  label?: string;
  /** 오프셋 (px) */
  offsetX?: number;
  offsetY?: number;
}

// ─── BackToTop ────────────────────────────────────────────────────────────────

export const BackToTop = forwardRef<HTMLButtonElement, BackToTopProps>(
  (
    {
      threshold = 300,
      position = "bottom-right",
      variant = "filled",
      size = "md",
      behavior = "smooth",
      icon,
      label,
      offsetX = 24,
      offsetY = 24,
      className,
      style,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
      const onScroll = () => {
        const scrollY =
          document.documentElement.scrollTop || document.body.scrollTop;
        setVisible(scrollY >= threshold);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      window.scrollTo({ top: 0, behavior });
      onClick?.(e);
    };

    const posStyle: React.CSSProperties =
      position === "bottom-right"
        ? { right: offsetX, bottom: offsetY }
        : position === "bottom-left"
        ? { left: offsetX, bottom: offsetY }
        : { left: "50%", bottom: offsetY, transform: "translateX(-50%)" };

    const classes = [
      styles.root,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      visible ? styles.visible : styles.hidden,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        aria-label={label ?? "맨 위로 이동"}
        className={classes}
        style={{ ...posStyle, ...style }}
        onClick={handleClick}
        {...props}
      >
        {icon ?? <ArrowUp />}
        {label && <span className={styles.labelText}>{label}</span>}
      </button>
    );
  },
);

BackToTop.displayName = "BackToTop";
