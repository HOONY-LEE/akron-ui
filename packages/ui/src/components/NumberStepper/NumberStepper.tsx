import React, { forwardRef, useState, useCallback } from "react";
import { Minus, Plus } from "lucide-react";
import styles from "./NumberStepper.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NumberStepperProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 현재 값 (제어) */
  value?: number;
  /** 기본값 (비제어) */
  defaultValue?: number;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 비활성화 */
  disabled?: boolean;
  /** 값 변경 핸들러 */
  onChange?: (value: number) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const NumberStepper = forwardRef<HTMLDivElement, NumberStepperProps>(
  (
    {
      value: valueProp,
      defaultValue = 0,
      min = -Infinity,
      max = Infinity,
      step = 1,
      size = "md",
      disabled = false,
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const current = isControlled ? valueProp : internal;

    const clamp = useCallback(
      (v: number) => Math.min(max, Math.max(min, v)),
      [min, max]
    );

    const update = useCallback(
      (next: number) => {
        const clamped = clamp(next);
        if (!isControlled) setInternal(clamped);
        onChange?.(clamped);
      },
      [clamp, isControlled, onChange]
    );

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      if (raw === "" || raw === "-") return;
      const num = Number(raw);
      if (!Number.isNaN(num)) update(num);
    };

    const iconSize = size === "sm" ? 14 : size === "lg" ? 20 : 16;

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${disabled ? styles.disabled : ""} ${className ?? ""}`}
        {...rest}
      >
        <button
          type="button"
          className={styles.btn}
          onClick={() => update(current - step)}
          disabled={disabled || current <= min}
          aria-label="감소"
        >
          <Minus size={iconSize} />
        </button>
        <input
          type="number"
          className={styles.input}
          value={current}
          onChange={handleInput}
          disabled={disabled}
          min={min === -Infinity ? undefined : min}
          max={max === Infinity ? undefined : max}
          step={step}
        />
        <button
          type="button"
          className={styles.btn}
          onClick={() => update(current + step)}
          disabled={disabled || current >= max}
          aria-label="증가"
        >
          <Plus size={iconSize} />
        </button>
      </div>
    );
  }
);

NumberStepper.displayName = "NumberStepper";
