import React, { forwardRef, useState, useRef, useLayoutEffect } from "react";
import styles from "./SegmentedControl.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SegmentedControlSize = "sm" | "md" | "lg";

export interface SegmentedControlOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface SegmentedControlProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 옵션 목록 */
  options: SegmentedControlOption[];
  /** 선택된 값 (제어) */
  value?: string;
  /** 초기 값 (비제어) */
  defaultValue?: string;
  /** 선택 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 크기 */
  size?: SegmentedControlSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      size = "md",
      disabled = false,
      fullWidth = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(
      defaultValue ?? options.find((o) => !o.disabled)?.value ?? "",
    );
    const selectedValue = isControlled ? (valueProp ?? "") : internalValue;

    // Sliding indicator
    const containerRef = useRef<HTMLDivElement>(null);
    const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({});

    useLayoutEffect(() => {
      if (!containerRef.current) return;
      const idx = options.findIndex((o) => o.value === selectedValue);
      if (idx === -1) return;
      const buttons = containerRef.current.querySelectorAll<HTMLButtonElement>(
        "[data-segment]",
      );
      const btn = buttons[idx];
      if (!btn) return;
      setIndicatorStyle({
        width: btn.offsetWidth,
        transform: `translateX(${btn.offsetLeft}px)`,
      });
    }, [selectedValue, options]);

    const handleSelect = (opt: SegmentedControlOption) => {
      if (opt.disabled || disabled) return;
      if (!isControlled) setInternalValue(opt.value);
      onChange?.(opt.value);
    };

    return (
      <div
        ref={ref}
        className={[
          styles.wrapper,
          fullWidth ? styles.fullWidth : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <div
          ref={containerRef}
          className={[
            styles.track,
            styles[size],
            disabled ? styles.trackDisabled : "",
          ]
            .filter(Boolean)
            .join(" ")}
          role="group"
        >
          {/* Sliding indicator */}
          <span className={styles.indicator} style={indicatorStyle} />

          {options.map((opt) => {
            const isSelected = opt.value === selectedValue;
            return (
              <button
                key={opt.value}
                type="button"
                data-segment
                disabled={opt.disabled || disabled}
                aria-pressed={isSelected}
                className={[
                  styles.segment,
                  isSelected ? styles.selected : "",
                  opt.disabled || disabled ? styles.segmentDisabled : "",
                  fullWidth ? styles.segmentFull : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleSelect(opt)}
              >
                {opt.icon && <span className={styles.icon}>{opt.icon}</span>}
                <span className={styles.label}>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

SegmentedControl.displayName = "SegmentedControl";
