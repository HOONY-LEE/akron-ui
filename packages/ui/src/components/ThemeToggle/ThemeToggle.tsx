import React, { forwardRef, useCallback } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeToggle.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ThemeToggleProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> {
  /** 현재 테마 */
  theme?: "light" | "dark";
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** pill 형태 (라벨 포함) */
  variant?: "icon" | "pill";
  /** 테마 변경 핸들러 */
  onChange?: (theme: "light" | "dark") => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ThemeToggle = forwardRef<HTMLButtonElement, ThemeToggleProps>(
  (
    {
      theme = "light",
      size = "md",
      variant = "icon",
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    const isDark = theme === "dark";
    const iconSize = size === "sm" ? 16 : size === "lg" ? 24 : 20;

    const handleClick = useCallback(() => {
      onChange?.(isDark ? "light" : "dark");
    }, [isDark, onChange]);

    return (
      <button
        ref={ref}
        type="button"
        className={`${styles.toggle} ${styles[size]} ${variant === "pill" ? styles.pill : ""} ${isDark ? styles.dark : ""} ${className ?? ""}`}
        onClick={handleClick}
        aria-label={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        {...rest}
      >
        <span className={styles.icon}>
          {isDark ? <Moon size={iconSize} /> : <Sun size={iconSize} />}
        </span>
        {variant === "pill" && (
          <span className={styles.label}>{isDark ? "Dark" : "Light"}</span>
        )}
      </button>
    );
  }
);

ThemeToggle.displayName = "ThemeToggle";
