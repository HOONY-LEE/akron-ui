import React, { forwardRef, useState, useCallback } from "react";
import styles from "./ToggleGroup.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleGroupSize = "sm" | "md" | "lg";
export type ToggleGroupVariant = "default" | "outline" | "ghost";
export type ToggleGroupType = "single" | "multiple";

export interface ToggleGroupItem {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ToggleGroupProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 토글 항목 */
  items: ToggleGroupItem[];
  /** 선택 타입 */
  type?: ToggleGroupType;
  /** 선택 값 (controlled) — single: string, multiple: string[] */
  value?: string | string[];
  /** 기본 선택 값 */
  defaultValue?: string | string[];
  /** 변경 콜백 */
  onChange?: (value: string | string[]) => void;
  /** 크기 */
  size?: ToggleGroupSize;
  /** 변형 */
  variant?: ToggleGroupVariant;
  /** 전체 비활성화 */
  disabled?: boolean;
  /** 전체 너비 채우기 */
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ToggleGroup = forwardRef<HTMLDivElement, ToggleGroupProps>(
  (
    {
      items,
      type = "single",
      value: valueProp,
      defaultValue,
      onChange,
      size = "md",
      variant = "default",
      disabled = false,
      fullWidth = false,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string | string[]>(
      defaultValue ?? (type === "multiple" ? [] : "")
    );

    const current = isControlled ? valueProp : internalValue;

    const isSelected = useCallback(
      (val: string): boolean => {
        if (type === "multiple") {
          return Array.isArray(current) && current.includes(val);
        }
        return current === val;
      },
      [current, type]
    );

    const handleToggle = useCallback(
      (val: string) => {
        let next: string | string[];

        if (type === "multiple") {
          const arr = Array.isArray(current) ? current : [];
          next = arr.includes(val)
            ? arr.filter((v) => v !== val)
            : [...arr, val];
        } else {
          next = current === val ? "" : val;
        }

        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [current, type, isControlled, onChange]
    );

    const rootCls = [
      styles.root,
      styles[size],
      styles[variant],
      fullWidth && styles.fullWidth,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={rootCls}
        role="group"
        aria-label="toggle group"
        {...rest}
      >
        {items.map((item) => {
          const active = isSelected(item.value);
          const isDisabled = disabled || !!item.disabled;

          const btnCls = [
            styles.button,
            active && styles.active,
            isDisabled && styles.buttonDisabled,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <button
              key={item.value}
              type="button"
              className={btnCls}
              onClick={() => !isDisabled && handleToggle(item.value)}
              disabled={isDisabled}
              aria-pressed={active}
              tabIndex={isDisabled ? -1 : 0}
            >
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.label && <span>{item.label}</span>}
            </button>
          );
        })}
      </div>
    );
  }
);

ToggleGroup.displayName = "ToggleGroup";
