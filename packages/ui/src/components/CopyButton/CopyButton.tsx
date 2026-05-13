import React, { forwardRef, useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CopyButton.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CopyButtonVariant = "ghost" | "outline" | "filled";
export type CopyButtonSize = "sm" | "md" | "lg";

export interface CopyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children" | "onCopy"> {
  /** 복사할 텍스트 */
  value: string;
  /** 복사 성공 후 원래 상태로 돌아오는 시간 (ms) */
  timeout?: number;
  /** 복사 성공 콜백 */
  onCopy?: (value: string) => void;
  /** 버튼 변형 */
  variant?: CopyButtonVariant;
  /** 버튼 크기 */
  size?: CopyButtonSize;
  /** 아이콘만 표시할지 여부 (false면 레이블도 표시) */
  iconOnly?: boolean;
  /** 기본 레이블 */
  label?: string;
  /** 복사 완료 레이블 */
  copiedLabel?: string;
}

// ─── CopyButton ───────────────────────────────────────────────────────────────

export const CopyButton = forwardRef<HTMLButtonElement, CopyButtonProps>(
  (
    {
      value,
      timeout = 2000,
      onCopy,
      variant = "ghost",
      size = "md",
      iconOnly = true,
      label = "복사",
      copiedLabel = "복사됨",
      className,
      disabled,
      onClick,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);

    const handleClick = useCallback(
      async (e: React.MouseEvent<HTMLButtonElement>) => {
        onClick?.(e);
        try {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          onCopy?.(value);
          setTimeout(() => setCopied(false), timeout);
        } catch {
          // Fallback for older browsers
          const textarea = document.createElement("textarea");
          textarea.value = value;
          textarea.style.position = "fixed";
          textarea.style.opacity = "0";
          document.body.appendChild(textarea);
          textarea.focus();
          textarea.select();
          try {
            document.execCommand("copy");
            setCopied(true);
            onCopy?.(value);
            setTimeout(() => setCopied(false), timeout);
          } finally {
            document.body.removeChild(textarea);
          }
        }
      },
      [value, timeout, onCopy, onClick],
    );

    const iconSize = size === "sm" ? 12 : size === "lg" ? 16 : 14;

    const classes = [
      styles.btn,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      copied && styles.copied,
      iconOnly && styles.iconOnly,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        disabled={disabled}
        onClick={handleClick}
        aria-label={copied ? copiedLabel : label}
        {...props}
      >
        <span className={styles.iconWrapper}>
          <span className={[styles.iconDefault, copied && styles.iconHidden].filter(Boolean).join(" ")}>
            <Copy size={iconSize} />
          </span>
          <span className={[styles.iconCheck, !copied && styles.iconHidden].filter(Boolean).join(" ")}>
            <Check size={iconSize} />
          </span>
        </span>
        {!iconOnly && (
          <span className={styles.label}>
            {copied ? copiedLabel : label}
          </span>
        )}
      </button>
    );
  },
);

CopyButton.displayName = "CopyButton";
