import React, { forwardRef, useState, useCallback, useRef } from "react";
import { MoveHorizontal } from "lucide-react";
import styles from "./ImageComparison.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ImageComparisonOrientation = "horizontal" | "vertical";

export interface ImageComparisonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** Before 이미지 URL */
  before: string;
  /** After 이미지 URL */
  after: string;
  /** Before 라벨 */
  beforeLabel?: string;
  /** After 라벨 */
  afterLabel?: string;
  /** 초기 슬라이더 위치 (0~100) */
  defaultPosition?: number;
  /** Controlled 슬라이더 위치 */
  position?: number;
  /** 위치 변경 콜백 */
  onChange?: (position: number) => void;
  /** 방향 */
  orientation?: ImageComparisonOrientation;
  /** 높이 */
  height?: number | string;
  /** alt 텍스트 (before) */
  beforeAlt?: string;
  /** alt 텍스트 (after) */
  afterAlt?: string;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ImageComparison = forwardRef<HTMLDivElement, ImageComparisonProps>(
  (
    {
      before,
      after,
      beforeLabel = "Before",
      afterLabel = "After",
      defaultPosition = 50,
      position: positionProp,
      onChange,
      orientation = "horizontal",
      height = 400,
      beforeAlt = "Before image",
      afterAlt = "After image",
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const isControlled = positionProp !== undefined;
    const [internalPos, setInternalPos] = useState(defaultPosition);
    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const pos = isControlled ? positionProp : internalPos;
    const isHorizontal = orientation === "horizontal";

    const updatePosition = useCallback(
      (clientX: number, clientY: number) => {
        const el = containerRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();

        let pct: number;
        if (isHorizontal) {
          pct = ((clientX - rect.left) / rect.width) * 100;
        } else {
          pct = ((clientY - rect.top) / rect.height) * 100;
        }
        pct = Math.max(0, Math.min(100, pct));

        if (!isControlled) setInternalPos(pct);
        onChange?.(pct);
      },
      [isHorizontal, isControlled, onChange]
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        isDragging.current = true;
        updatePosition(e.clientX, e.clientY);

        const onMove = (ev: MouseEvent) => {
          if (!isDragging.current) return;
          updatePosition(ev.clientX, ev.clientY);
        };
        const onUp = () => {
          isDragging.current = false;
          document.removeEventListener("mousemove", onMove);
          document.removeEventListener("mouseup", onUp);
        };
        document.addEventListener("mousemove", onMove);
        document.addEventListener("mouseup", onUp);
      },
      [updatePosition]
    );

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        isDragging.current = true;
        const touch = e.touches[0];
        updatePosition(touch.clientX, touch.clientY);

        const onTouchMove = (ev: TouchEvent) => {
          if (!isDragging.current) return;
          const t = ev.touches[0];
          updatePosition(t.clientX, t.clientY);
        };
        const onTouchEnd = () => {
          isDragging.current = false;
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", onTouchEnd);
        };
        document.addEventListener("touchmove", onTouchMove, { passive: true });
        document.addEventListener("touchend", onTouchEnd);
      },
      [updatePosition]
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        let next = pos;
        const step = 1;
        if (
          (isHorizontal && e.key === "ArrowLeft") ||
          (!isHorizontal && e.key === "ArrowUp")
        ) {
          next = Math.max(0, pos - step);
          e.preventDefault();
        } else if (
          (isHorizontal && e.key === "ArrowRight") ||
          (!isHorizontal && e.key === "ArrowDown")
        ) {
          next = Math.min(100, pos + step);
          e.preventDefault();
        }
        if (next !== pos) {
          if (!isControlled) setInternalPos(next);
          onChange?.(next);
        }
      },
      [pos, isHorizontal, isControlled, onChange]
    );

    const rootCls = [
      styles.root,
      isHorizontal ? styles.horizontal : styles.vertical,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const clipBefore = isHorizontal
      ? `inset(0 ${100 - pos}% 0 0)`
      : `inset(0 0 ${100 - pos}% 0)`;

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={rootCls}
        style={{ ...style, height }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        role="slider"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Image comparison slider"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        {...rest}
      >
        {/* After image (full background) */}
        <img src={after} alt={afterAlt} className={styles.image} draggable={false} />

        {/* Before image (clipped) */}
        <img
          src={before}
          alt={beforeAlt}
          className={styles.image}
          style={{ clipPath: clipBefore }}
          draggable={false}
        />

        {/* Divider line */}
        <div
          className={styles.divider}
          style={
            isHorizontal
              ? { left: `${pos}%` }
              : { top: `${pos}%` }
          }
        >
          <div className={styles.handle}>
            <MoveHorizontal size={16} />
          </div>
        </div>

        {/* Labels */}
        {beforeLabel && (
          <span
            className={[styles.label, styles.labelBefore].join(" ")}
          >
            {beforeLabel}
          </span>
        )}
        {afterLabel && (
          <span
            className={[styles.label, styles.labelAfter].join(" ")}
          >
            {afterLabel}
          </span>
        )}
      </div>
    );
  }
);

ImageComparison.displayName = "ImageComparison";
