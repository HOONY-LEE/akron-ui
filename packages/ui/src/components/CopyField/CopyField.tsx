import React, { forwardRef, useState, useCallback } from "react";
import { Copy, Check } from "lucide-react";
import styles from "./CopyField.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CopyFieldProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onCopy"> {
  /** 표시 / 복사할 값 */
  value: string;
  /** 라벨 */
  label?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 복사 완료 유지 시간 (ms) */
  timeout?: number;
  /** 복사 완료 콜백 */
  onCopy?: (value: string) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CopyField = forwardRef<HTMLDivElement, CopyFieldProps>(
  (
    {
      value,
      label,
      size = "md",
      timeout = 2000,
      onCopy,
      className,
      ...rest
    },
    ref
  ) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async () => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        onCopy?.(value);
        setTimeout(() => setCopied(false), timeout);
      } catch {
        /* clipboard API unavailable */
      }
    }, [value, timeout, onCopy]);

    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    return (
      <div ref={ref} className={className} {...rest}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={`${styles.wrapper} ${styles[size]}`}>
          <input
            type="text"
            className={styles.input}
            value={value}
            readOnly
            onClick={(e) => (e.target as HTMLInputElement).select()}
          />
          <button
            type="button"
            className={`${styles.btn} ${copied ? styles.copied : ""}`}
            onClick={handleCopy}
            aria-label="복사"
          >
            {copied ? <Check size={iconSize} /> : <Copy size={iconSize} />}
          </button>
        </div>
      </div>
    );
  }
);

CopyField.displayName = "CopyField";
