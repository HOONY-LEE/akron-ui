import React, { forwardRef, useRef, useState, useCallback, useEffect } from "react";
import styles from "./Slider.module.css";

export type SliderSize = "sm" | "md" | "lg";
export type SliderOrientation = "horizontal" | "vertical";

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 현재 값 (제어 모드, 단일) */
  value?: number;
  /** 기본 값 (비제어 모드, 단일) */
  defaultValue?: number;
  /** 범위 값 [min, max] (제어 모드) */
  rangeValue?: [number, number];
  /** 기본 범위 값 (비제어 모드) */
  defaultRangeValue?: [number, number];
  /** 값 변경 핸들러 (단일) */
  onChange?: (value: number) => void;
  /** 범위 변경 핸들러 */
  onRangeChange?: (value: [number, number]) => void;
  /** 최솟값 */
  min?: number;
  /** 최댓값 */
  max?: number;
  /** 증감 단위 */
  step?: number;
  /** 크기 */
  size?: SliderSize;
  /** 방향 */
  orientation?: SliderOrientation;
  /** 현재 값 표시 */
  showValue?: boolean;
  /** 값 포맷 함수 */
  formatValue?: (value: number) => string;
  /** 눈금 표시 */
  marks?: boolean | { value: number; label?: string }[];
  /** 비활성화 */
  disabled?: boolean;
  /** 라벨 */
  label?: string;
  /** 도움말 */
  helperText?: string;
  /** 색상 */
  color?: "primary" | "success" | "warning" | "error";
  className?: string;
}

function clamp(v: number, min: number, max: number) {
  return Math.min(Math.max(v, min), max);
}

function snapToStep(v: number, min: number, step: number): number {
  return Math.round((v - min) / step) * step + min;
}

function pct(v: number, min: number, max: number): number {
  return ((v - min) / (max - min)) * 100;
}

export const Slider = forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      value,
      defaultValue,
      rangeValue,
      defaultRangeValue,
      onChange,
      onRangeChange,
      min = 0,
      max = 100,
      step = 1,
      size = "md",
      orientation = "horizontal",
      showValue = false,
      formatValue,
      marks,
      disabled = false,
      label,
      helperText,
      color = "primary",
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isRange = rangeValue !== undefined || defaultRangeValue !== undefined;
    const isControlled = isRange ? rangeValue !== undefined : value !== undefined;

    const [internalSingle, setInternalSingle] = useState<number>(
      defaultValue !== undefined ? defaultValue : min,
    );
    const [internalRange, setInternalRange] = useState<[number, number]>(
      defaultRangeValue !== undefined ? defaultRangeValue : [min, max],
    );

    const singleVal = isControlled && !isRange ? (value as number) : internalSingle;
    const rangeVal = isControlled && isRange ? (rangeValue as [number, number]) : internalRange;

    const trackRef = useRef<HTMLDivElement>(null);
    const draggingThumb = useRef<number | null>(null); // 0 or 1 for range, 0 for single

    const getValueFromEvent = useCallback(
      (clientPos: number): number => {
        const track = trackRef.current;
        if (!track) return min;
        const rect = track.getBoundingClientRect();
        let ratio: number;
        if (orientation === "horizontal") {
          ratio = (clientPos - rect.left) / rect.width;
        } else {
          ratio = 1 - (clientPos - rect.top) / rect.height;
        }
        const raw = min + ratio * (max - min);
        return clamp(snapToStep(raw, min, step), min, max);
      },
      [min, max, step, orientation],
    );

    const handleSingleChange = useCallback(
      (newVal: number) => {
        if (!isControlled) setInternalSingle(newVal);
        onChange?.(newVal);
      },
      [isControlled, onChange],
    );

    const handleRangeChange = useCallback(
      (thumbIdx: number, newVal: number) => {
        const current = isControlled ? rangeVal : internalRange;
        let next: [number, number] = [...current] as [number, number];
        next[thumbIdx] = newVal;
        // prevent crossing
        if (thumbIdx === 0) next[0] = Math.min(newVal, next[1]);
        else next[1] = Math.max(newVal, next[0]);
        if (!isControlled) setInternalRange(next);
        onRangeChange?.(next);
      },
      [isControlled, rangeVal, internalRange, onRangeChange],
    );

    const handleTrackMouseDown = (e: React.MouseEvent) => {
      if (disabled) return;
      const pos = orientation === "horizontal" ? e.clientX : e.clientY;
      const v = getValueFromEvent(pos);
      if (isRange) {
        const dist0 = Math.abs(v - rangeVal[0]);
        const dist1 = Math.abs(v - rangeVal[1]);
        const thumb = dist0 <= dist1 ? 0 : 1;
        draggingThumb.current = thumb;
        handleRangeChange(thumb, v);
      } else {
        draggingThumb.current = 0;
        handleSingleChange(v);
      }
      e.preventDefault();
    };

    useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
        if (draggingThumb.current === null || disabled) return;
        const pos = orientation === "horizontal" ? e.clientX : e.clientY;
        const v = getValueFromEvent(pos);
        if (isRange) {
          handleRangeChange(draggingThumb.current, v);
        } else {
          handleSingleChange(v);
        }
      };
      const handleMouseUp = () => {
        draggingThumb.current = null;
      };
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }, [disabled, getValueFromEvent, handleRangeChange, handleSingleChange, isRange, orientation]);

    const handleThumbKeyDown = (e: React.KeyboardEvent, thumbIdx: number) => {
      const currentVal = isRange ? rangeVal[thumbIdx] : singleVal;
      let newVal = currentVal;
      if (e.key === "ArrowRight" || e.key === "ArrowUp") newVal = clamp(currentVal + step, min, max);
      else if (e.key === "ArrowLeft" || e.key === "ArrowDown") newVal = clamp(currentVal - step, min, max);
      else if (e.key === "Home") newVal = min;
      else if (e.key === "End") newVal = max;
      else return;
      e.preventDefault();
      if (isRange) handleRangeChange(thumbIdx, newVal);
      else handleSingleChange(newVal);
    };

    const fmt = formatValue ?? String;

    // resolve marks
    const resolvedMarks: { value: number; label?: string }[] =
      marks === true
        ? Array.from({ length: Math.floor((max - min) / step) + 1 }, (_, i) => ({
            value: min + i * step,
          }))
        : Array.isArray(marks)
        ? marks
        : [];

    const isHorizontal = orientation === "horizontal";

    const fillStyle = isRange
      ? isHorizontal
        ? {
            left: `${pct(rangeVal[0], min, max)}%`,
            width: `${pct(rangeVal[1], min, max) - pct(rangeVal[0], min, max)}%`,
          }
        : {
            bottom: `${pct(rangeVal[0], min, max)}%`,
            height: `${pct(rangeVal[1], min, max) - pct(rangeVal[0], min, max)}%`,
          }
      : isHorizontal
      ? { left: 0, width: `${pct(singleVal, min, max)}%` }
      : { bottom: 0, height: `${pct(singleVal, min, max)}%` };

    const thumbPositions = isRange
      ? [pct(rangeVal[0], min, max), pct(rangeVal[1], min, max)]
      : [pct(singleVal, min, max)];

    const wrapperCls = [
      styles.wrapper,
      styles[size],
      styles[orientation],
      styles[`color-${color}`],
      disabled ? styles.disabled : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperCls} style={style} {...rest}>
        {(label || (showValue && !isRange)) && (
          <div className={styles.labelRow}>
            {label && <span className={styles.label}>{label}</span>}
            {showValue && !isRange && (
              <span className={styles.valueDisplay}>{fmt(singleVal)}</span>
            )}
          </div>
        )}
        {showValue && isRange && (
          <div className={styles.labelRow}>
            {label && <span className={styles.label}>{label}</span>}
            <span className={styles.valueDisplay}>
              {fmt(rangeVal[0])} – {fmt(rangeVal[1])}
            </span>
          </div>
        )}
        <div className={styles.sliderArea}>
          <div
            ref={trackRef}
            className={styles.track}
            onMouseDown={handleTrackMouseDown}
          >
            <div className={styles.fill} style={fillStyle} />
            {thumbPositions.map((p, i) => (
              <div
                key={i}
                className={styles.thumb}
                style={
                  isHorizontal
                    ? { left: `${p}%`, transform: "translate(-50%, -50%)" }
                    : { bottom: `${p}%`, transform: "translate(-50%, 50%)" }
                }
                role="slider"
                aria-valuemin={min}
                aria-valuemax={max}
                aria-valuenow={isRange ? rangeVal[i] : singleVal}
                aria-orientation={orientation}
                aria-disabled={disabled}
                tabIndex={disabled ? -1 : 0}
                onKeyDown={(e) => handleThumbKeyDown(e, i)}
                onMouseDown={(e) => {
                  if (!disabled) {
                    draggingThumb.current = i;
                    e.stopPropagation();
                  }
                }}
              />
            ))}
          </div>
          {resolvedMarks.length > 0 && (
            <div className={styles.marks}>
              {resolvedMarks.map((m) => (
                <div
                  key={m.value}
                  className={styles.markWrapper}
                  style={
                    isHorizontal
                      ? { left: `${pct(m.value, min, max)}%` }
                      : { bottom: `${pct(m.value, min, max)}%` }
                  }
                >
                  <div className={styles.markDot} />
                  {m.label && <span className={styles.markLabel}>{m.label}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
        {helperText && <span className={styles.helperText}>{helperText}</span>}
      </div>
    );
  },
);

Slider.displayName = "Slider";
