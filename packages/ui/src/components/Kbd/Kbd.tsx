import React, { forwardRef } from "react";
import styles from "./Kbd.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type KbdSize = "sm" | "md" | "lg";
export type KbdVariant = "default" | "outline" | "filled";

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  /** 크기 */
  size?: KbdSize;
  /** 변형 */
  variant?: KbdVariant;
}

// ─── Kbd ─────────────────────────────────────────────────────────────────────

export const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ size = "md", variant = "default", className, children, ...props }, ref) => {
    const classes = [
      styles.kbd,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <kbd ref={ref} className={classes} {...props}>
        {children}
      </kbd>
    );
  },
);

Kbd.displayName = "Kbd";

// ─── KbdShortcut ─────────────────────────────────────────────────────────────
// Convenience wrapper: renders keys separated by `+` (or custom separator)

export interface KbdShortcutProps {
  /** 키 배열. e.g. ["⌘", "K"] or ["Ctrl", "Shift", "P"] */
  keys: string[];
  /** 구분자 (기본: "+") */
  separator?: React.ReactNode;
  /** Kbd 크기 */
  size?: KbdSize;
  /** Kbd 변형 */
  variant?: KbdVariant;
  /** 래퍼 className */
  className?: string;
}

export const KbdShortcut: React.FC<KbdShortcutProps> = ({
  keys,
  separator = "+",
  size = "md",
  variant = "default",
  className,
}) => {
  return (
    <span
      className={[styles.shortcut, className].filter(Boolean).join(" ")}
      aria-label={keys.join(" ")}
    >
      {keys.map((key, i) => (
        <React.Fragment key={i}>
          {i > 0 && (
            <span className={styles.separator} aria-hidden="true">
              {separator}
            </span>
          )}
          <Kbd size={size} variant={variant}>
            {key}
          </Kbd>
        </React.Fragment>
      ))}
    </span>
  );
};

KbdShortcut.displayName = "KbdShortcut";
