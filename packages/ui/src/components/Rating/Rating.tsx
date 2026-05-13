import React, { forwardRef, useState } from "react";
import { Star } from "lucide-react";
import styles from "./Rating.module.css";

export type RatingSize = "sm" | "md" | "lg";

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 현재 값 (제어 모드, 0~count) */
  value?: number;
  /** 기본 값 (비제어 모드) */
  defaultValue?: number;
  /** 값 변경 핸들러 */
  onChange?: (value: number) => void;
  /** 별 개수 */
  count?: number;
  /** 반쪽 별 허용 */
  allowHalf?: boolean;
  /** 클릭으로 초기화 허용 (0으로) */
  clearable?: boolean;
  /** 크기 */
  size?: RatingSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 라벨 */
  label?: string;
  /** 각 별 레이블 (접근성) */
  getLabelText?: (value: number) => string;
  /** 색상 */
  color?: string;
  className?: string;
}

const SIZE_MAP: Record<RatingSize, number> = { sm: 16, md: 22, lg: 28 };

export const Rating = forwardRef<HTMLDivElement, RatingProps>(
  (
    {
      value,
      defaultValue = 0,
      onChange,
      count = 5,
      allowHalf = false,
      clearable = true,
      size = "md",
      disabled = false,
      readOnly = false,
      label,
      getLabelText = (v) => `${v}점`,
      color,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<number>(defaultValue);
    const [hovered, setHovered] = useState<number>(0);

    const current = isControlled ? value! : internal;
    const displayValue = hovered > 0 ? hovered : current;

    const iconSize = SIZE_MAP[size];
    const interactive = !disabled && !readOnly;

    const commit = (newVal: number) => {
      if (!isControlled) setInternal(newVal);
      onChange?.(newVal);
    };

    const handleMouseEnter = (starIdx: number, half: boolean) => {
      if (!interactive) return;
      setHovered(half ? starIdx - 0.5 : starIdx);
    };

    const handleMouseLeave = () => {
      if (!interactive) return;
      setHovered(0);
    };

    const handleClick = (starIdx: number, half: boolean) => {
      if (!interactive) return;
      const newVal = half ? starIdx - 0.5 : starIdx;
      if (clearable && newVal === current) {
        commit(0);
      } else {
        commit(newVal);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!interactive) return;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") {
        e.preventDefault();
        const step = allowHalf ? 0.5 : 1;
        commit(Math.min(current + step, count));
      } else if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
        e.preventDefault();
        const step = allowHalf ? 0.5 : 1;
        commit(Math.max(current - step, 0));
      }
    };

    const wrapperCls = [
      styles.wrapper,
      styles[size],
      disabled ? styles.disabled : "",
      readOnly ? styles.readOnly : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperCls} style={style} {...rest}>
        {label && <span className={styles.label}>{label}</span>}
        <div
          className={styles.stars}
          role="radiogroup"
          aria-label={label ?? "별점"}
          onMouseLeave={handleMouseLeave}
          onKeyDown={handleKeyDown}
          tabIndex={interactive ? 0 : -1}
        >
          {Array.from({ length: count }, (_, i) => {
            const starIdx = i + 1;
            const full = displayValue >= starIdx;
            const half = !full && allowHalf && displayValue >= starIdx - 0.5;

            return (
              <span key={i} className={styles.starWrap}>
                {/* Full star (or right half) */}
                <span
                  className={styles.starFull}
                  role="radio"
                  aria-checked={current === starIdx}
                  aria-label={getLabelText(starIdx)}
                  onMouseEnter={() => handleMouseEnter(starIdx, false)}
                  onClick={() => handleClick(starIdx, false)}
                >
                  <Star
                    size={iconSize}
                    className={[
                      styles.starIcon,
                      full ? styles.filled : half ? styles.halfFilled : styles.empty,
                    ].join(" ")}
                    style={full || half ? (color ? { color } : undefined) : undefined}
                  />
                </span>
                {/* Half-star overlay (left half) */}
                {allowHalf && (
                  <span
                    className={styles.starHalf}
                    onMouseEnter={() => handleMouseEnter(starIdx, true)}
                    onClick={() => handleClick(starIdx, true)}
                    aria-hidden="true"
                  />
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  },
);

Rating.displayName = "Rating";
