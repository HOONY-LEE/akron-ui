import React, { forwardRef, useState, useCallback, useRef } from "react";
import styles from "./CurrencyInput.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CurrencyInputSize = "sm" | "md" | "lg";
export type CurrencyCode = "KRW" | "USD" | "EUR" | "JPY" | "GBP" | "CNY";

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  locale: string;
  decimals: number;
}

const CURRENCY_MAP: Record<CurrencyCode, CurrencyConfig> = {
  KRW: { code: "KRW", symbol: "₩", locale: "ko-KR", decimals: 0 },
  USD: { code: "USD", symbol: "$", locale: "en-US", decimals: 2 },
  EUR: { code: "EUR", symbol: "€", locale: "de-DE", decimals: 2 },
  JPY: { code: "JPY", symbol: "¥", locale: "ja-JP", decimals: 0 },
  GBP: { code: "GBP", symbol: "£", locale: "en-GB", decimals: 2 },
  CNY: { code: "CNY", symbol: "¥", locale: "zh-CN", decimals: 2 },
};

export interface CurrencyInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "defaultValue" | "size" | "type"
  > {
  /** 숫자 값 (controlled) */
  value?: number | null;
  /** 기본 숫자 값 */
  defaultValue?: number | null;
  /** 값 변경 콜백 */
  onChange?: (value: number | null) => void;
  /** 통화 코드 */
  currency?: CurrencyCode;
  /** 크기 */
  size?: CurrencyInputSize;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 에러 상태 */
  error?: boolean;
  /** 통화 기호 위치 */
  symbolPosition?: "prefix" | "suffix";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(
  value: number | null,
  config: CurrencyConfig
): string {
  if (value === null || value === undefined || isNaN(value)) return "";
  return new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(value);
}

function parseCurrency(raw: string, config: CurrencyConfig): number | null {
  // Remove everything except digits, minus, dot, comma
  const cleaned = raw.replace(/[^\d\-.,]/g, "");
  if (!cleaned || cleaned === "-") return null;

  // Determine decimal separator based on locale
  const formatter = new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: 1,
  });
  const parts = formatter.formatToParts(1.1);
  const decimalSep = parts.find((p) => p.type === "decimal")?.value || ".";

  // Normalize: remove group separators, replace decimal with dot
  let normalized: string;
  if (decimalSep === ",") {
    normalized = cleaned.replace(/\./g, "").replace(",", ".");
  } else {
    normalized = cleaned.replace(/,/g, "");
  }

  const num = parseFloat(normalized);
  if (isNaN(num)) return null;

  // Round to allowed decimal places
  const factor = Math.pow(10, config.decimals);
  return Math.round(num * factor) / factor;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      currency = "KRW",
      size = "md",
      min,
      max,
      error = false,
      symbolPosition = "prefix",
      disabled,
      className,
      onFocus,
      onBlur,
      ...rest
    },
    ref
  ) => {
    const config = CURRENCY_MAP[currency];
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(
      defaultValue ?? null
    );
    const [focused, setFocused] = useState(false);
    const [displayValue, setDisplayValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const currentValue = isControlled ? valueProp : internalValue;

    // When not focused, show formatted value
    const shownValue = focused
      ? displayValue
      : formatCurrency(currentValue ?? null, config);

    const updateValue = useCallback(
      (raw: string) => {
        setDisplayValue(raw);
        const num = parseCurrency(raw, config);

        // Clamp
        let clamped = num;
        if (clamped !== null) {
          if (min !== undefined && clamped < min) clamped = min;
          if (max !== undefined && clamped > max) clamped = max;
        }

        if (!isControlled) setInternalValue(clamped);
        onChange?.(clamped);
      },
      [config, isControlled, min, max, onChange]
    );

    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(true);
        // Show raw number in input for easy editing
        setDisplayValue(
          currentValue !== null && currentValue !== undefined
            ? String(currentValue)
            : ""
        );
        onFocus?.(e);
      },
      [currentValue, onFocus]
    );

    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => {
        setFocused(false);
        onBlur?.(e);
      },
      [onBlur]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        updateValue(e.target.value);
      },
      [updateValue]
    );

    const rootCls = [
      styles.root,
      styles[size],
      focused && styles.focused,
      error && styles.error,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootCls}>
        {symbolPosition === "prefix" && (
          <span className={styles.symbol}>{config.symbol}</span>
        )}
        <input
          ref={(node) => {
            (inputRef as React.MutableRefObject<HTMLInputElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          type="text"
          inputMode="decimal"
          className={styles.input}
          value={shownValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          aria-invalid={error || undefined}
          {...rest}
        />
        {symbolPosition === "suffix" && (
          <span className={styles.symbol}>{config.symbol}</span>
        )}
        <span className={styles.code}>{currency}</span>
      </div>
    );
  }
);

CurrencyInput.displayName = "CurrencyInput";
