import React, { forwardRef } from "react";
import styles from "./InputGroup.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InputGroupSize = "sm" | "md" | "lg";

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 좌측 어돈 (텍스트, 아이콘, 버튼 등) */
  prepend?: React.ReactNode;
  /** 우측 어돈 (텍스트, 아이콘, 버튼 등) */
  append?: React.ReactNode;
  /** 크기 */
  size?: InputGroupSize;
  /** 에러 상태 */
  error?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const InputGroup = forwardRef<HTMLDivElement, InputGroupProps>(
  (
    {
      prepend,
      append,
      size = "md",
      error = false,
      disabled = false,
      fullWidth = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        data-size={size}
        data-error={error || undefined}
        data-disabled={disabled || undefined}
        className={[
          styles.group,
          styles[size],
          error ? styles.errorState : "",
          disabled ? styles.disabled : "",
          fullWidth ? styles.fullWidth : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {prepend && <span className={styles.addon}>{prepend}</span>}
        <span className={styles.inputSlot}>{children}</span>
        {append && <span className={[styles.addon, styles.addonAppend].join(" ")}>{append}</span>}
      </div>
    );
  },
);

InputGroup.displayName = "InputGroup";

// ─── InputGroupAddon ──────────────────────────────────────────────────────────
// Utility to wrap text/icon addons with consistent styling

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

export const InputGroupAddon = forwardRef<HTMLSpanElement, InputGroupAddonProps>(
  ({ children, className, ...rest }, ref) => (
    <span ref={ref} className={[styles.addonText, className].filter(Boolean).join(" ")} {...rest}>
      {children}
    </span>
  ),
);

InputGroupAddon.displayName = "InputGroupAddon";
