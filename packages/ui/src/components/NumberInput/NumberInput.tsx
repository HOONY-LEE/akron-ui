import React, { forwardRef, useRef, useState, useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import styles from "./NumberInput.module.css";

export type NumberInputSize = "sm" | "md" | "lg";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "value" | "onChange" | "defaultValue" | "prefix"> {
  /** 현재 값 (제어 모드) */
  value?: number | null;
  /** 기본 값 (비제어 모드) */
  defaultValue?: number | null;
  /** 값 변경 핸들러 */
  onChange?: (value: number | null) => void;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 소수점 자리수 */
  precision?: number;
  /** 크기 */
  size?: NumberInputSize;
  /** 라벨 */
  label?: string;
  /** 도움말 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 앞 접두사 (예: "₩") */
  prefix?: React.ReactNode;
  /** 뒤 접미사 (예: "kg") */
  suffix?: React.ReactNode;
  /** 스테퍼 버튼 숨김 */
  hideControls?: boolean;
  className?: string;
}

function clamp(val: number, min?: number, max?: number): number {
  if (min !== undefined && val < min) return min;
  if (max !== undefined && val > max) return max;
  return val;
}

function round(val: number, precision: number): number {
  const factor = Math.pow(10, precision);
  return Math.round(val * factor) / factor;
}

export const NumberInput = forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      min,
      max,
      step = 1,
      precision = 0,
      size = "md",
      label,
      helperText,
      errorMessage,
      prefix,
      suffix,
      hideControls = false,
      disabled,
      placeholder,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<number | null>(
      defaultValue !== undefined ? defaultValue : null,
    );
    const [inputStr, setInputStr] = useState<string>(() => {
      const v = isControlled ? value : defaultValue;
      return v != null ? String(v) : "";
    });

    const currentValue = isControlled ? value : internalValue;

    const commitValue = useCallback(
      (newVal: number | null) => {
        const clamped = newVal != null ? round(clamp(newVal, min, max), precision) : null;
        if (!isControlled) {
          setInternalValue(clamped);
        }
        setInputStr(clamped != null ? String(clamped) : "");
        onChange?.(clamped);
      },
      [isControlled, min, max, precision, onChange],
    );

    const increment = () => {
      const base = currentValue ?? 0;
      commitValue(round(base + step, precision));
    };

    const decrement = () => {
      const base = currentValue ?? 0;
      commitValue(round(base - step, precision));
    };

    // long-press 지원
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const startRepeat = (fn: () => void) => {
      fn();
      timeoutRef.current = setTimeout(() => {
        intervalRef.current = setInterval(fn, 80);
      }, 400);
    };

    const stopRepeat = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      setInputStr(raw);
      if (raw === "" || raw === "-") {
        if (!isControlled) setInternalValue(null);
        onChange?.(null);
        return;
      }
      const parsed = parseFloat(raw);
      if (!isNaN(parsed)) {
        if (!isControlled) setInternalValue(parsed);
        onChange?.(parsed);
      }
    };

    const handleBlur = () => {
      if (inputStr === "" || inputStr === "-") {
        commitValue(null);
      } else {
        const parsed = parseFloat(inputStr);
        if (!isNaN(parsed)) {
          commitValue(parsed);
        } else {
          // 잘못된 입력이면 이전 값으로 복원
          setInputStr(currentValue != null ? String(currentValue) : "");
        }
      }
    };

    const hasError = !!errorMessage;

    const wrapperCls = [
      styles.wrapper,
      styles[size],
      hasError ? styles.error : "",
      disabled ? styles.disabled : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const decrDisabled = disabled || (min !== undefined && (currentValue ?? -Infinity) <= min);
    const incrDisabled = disabled || (max !== undefined && (currentValue ?? Infinity) >= max);

    return (
      <div className={wrapperCls} style={style}>
        {label && <label className={styles.label}>{label}</label>}
        <div className={styles.field}>
          {prefix && <span className={styles.prefix}>{prefix}</span>}
          {!hideControls && (
            <button
              type="button"
              className={[styles.stepBtn, styles.decrBtn].join(" ")}
              onMouseDown={() => startRepeat(decrement)}
              onMouseUp={stopRepeat}
              onMouseLeave={stopRepeat}
              onTouchStart={() => startRepeat(decrement)}
              onTouchEnd={stopRepeat}
              disabled={decrDisabled}
              tabIndex={-1}
              aria-label="감소"
            >
              <Minus size={14} />
            </button>
          )}
          <input
            {...rest}
            ref={ref}
            type="text"
            inputMode="decimal"
            className={styles.input}
            value={inputStr}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={disabled}
            placeholder={placeholder}
            aria-invalid={hasError || undefined}
          />
          {!hideControls && (
            <button
              type="button"
              className={[styles.stepBtn, styles.incrBtn].join(" ")}
              onMouseDown={() => startRepeat(increment)}
              onMouseUp={stopRepeat}
              onMouseLeave={stopRepeat}
              onTouchStart={() => startRepeat(increment)}
              onTouchEnd={stopRepeat}
              disabled={incrDisabled}
              tabIndex={-1}
              aria-label="증가"
            >
              <Plus size={14} />
            </button>
          )}
          {suffix && <span className={styles.suffix}>{suffix}</span>}
        </div>
        {!hasError && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
        {hasError && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  },
);

NumberInput.displayName = "NumberInput";
