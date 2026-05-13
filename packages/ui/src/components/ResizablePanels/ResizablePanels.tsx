import React, { forwardRef, useCallback, useRef, useState } from "react";
import styles from "./ResizablePanels.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ResizableDirection = "horizontal" | "vertical";

export interface ResizablePanelsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 분할 방향 */
  direction?: ResizableDirection;
  /** 첫 번째 패널 내용 */
  first: React.ReactNode;
  /** 두 번째 패널 내용 */
  second: React.ReactNode;
  /** 초기 첫 번째 패널 크기 (0–100, 퍼센트) */
  defaultSize?: number;
  /** 최소 크기 (퍼센트) */
  minSize?: number;
  /** 최대 크기 (퍼센트) */
  maxSize?: number;
  /** 현재 크기 (controlled) */
  size?: number;
  /** 크기 변경 콜백 */
  onSizeChange?: (size: number) => void;
  /** 구분자 두께 (px) */
  handleSize?: number;
}

// ─── ResizablePanels ──────────────────────────────────────────────────────────

export const ResizablePanels = forwardRef<HTMLDivElement, ResizablePanelsProps>(
  (
    {
      direction = "horizontal",
      first,
      second,
      defaultSize = 50,
      minSize = 10,
      maxSize = 90,
      size: sizeProp,
      onSizeChange,
      handleSize = 4,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const isControlled = sizeProp !== undefined;
    const [internalSize, setInternalSize] = useState(defaultSize);
    const size = isControlled ? sizeProp! : internalSize;

    const containerRef = useRef<HTMLDivElement>(null);
    const isDragging = useRef(false);

    const clamp = useCallback(
      (val: number) => Math.min(maxSize, Math.max(minSize, val)),
      [minSize, maxSize],
    );

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        isDragging.current = true;

        const onMouseMove = (moveEvent: MouseEvent) => {
          if (!isDragging.current || !containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          let newSize: number;

          if (direction === "horizontal") {
            newSize = ((moveEvent.clientX - rect.left) / rect.width) * 100;
          } else {
            newSize = ((moveEvent.clientY - rect.top) / rect.height) * 100;
          }

          const clamped = clamp(newSize);
          if (!isControlled) setInternalSize(clamped);
          onSizeChange?.(clamped);
        };

        const onMouseUp = () => {
          isDragging.current = false;
          document.removeEventListener("mousemove", onMouseMove);
          document.removeEventListener("mouseup", onMouseUp);
        };

        document.addEventListener("mousemove", onMouseMove);
        document.addEventListener("mouseup", onMouseUp);
      },
      [direction, clamp, isControlled, onSizeChange],
    );

    // Touch support
    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        isDragging.current = true;

        const onTouchMove = (touchEvent: TouchEvent) => {
          if (!isDragging.current || !containerRef.current) return;
          const touch = touchEvent.touches[0];
          const rect = containerRef.current.getBoundingClientRect();
          let newSize: number;

          if (direction === "horizontal") {
            newSize = ((touch.clientX - rect.left) / rect.width) * 100;
          } else {
            newSize = ((touch.clientY - rect.top) / rect.height) * 100;
          }

          const clamped = clamp(newSize);
          if (!isControlled) setInternalSize(clamped);
          onSizeChange?.(clamped);
        };

        const onTouchEnd = () => {
          isDragging.current = false;
          document.removeEventListener("touchmove", onTouchMove);
          document.removeEventListener("touchend", onTouchEnd);
        };

        document.addEventListener("touchmove", onTouchMove, { passive: true });
        document.addEventListener("touchend", onTouchEnd);
      },
      [direction, clamp, isControlled, onSizeChange],
    );

    const isHorizontal = direction === "horizontal";

    const firstStyle: React.CSSProperties = isHorizontal
      ? { width: `${size}%`, height: "100%" }
      : { width: "100%", height: `${size}%` };

    const secondStyle: React.CSSProperties = isHorizontal
      ? { width: `${100 - size}%`, height: "100%" }
      : { width: "100%", height: `${100 - size}%` };

    const handleStyle: React.CSSProperties = isHorizontal
      ? { width: `${handleSize}px`, height: "100%", cursor: "col-resize" }
      : { height: `${handleSize}px`, width: "100%", cursor: "row-resize" };

    const classes = [
      styles.root,
      styles[`dir-${direction}`],
      className,
    ].filter(Boolean).join(" ");

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={classes}
        style={style}
        {...props}
      >
        <div className={styles.panel} style={firstStyle}>
          {first}
        </div>

        <div
          className={styles.handle}
          style={handleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          role="separator"
          aria-orientation={isHorizontal ? "vertical" : "horizontal"}
          aria-valuenow={Math.round(size)}
          aria-valuemin={minSize}
          aria-valuemax={maxSize}
          tabIndex={0}
          onKeyDown={(e) => {
            const step = 1;
            if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
              const next = clamp(size - step);
              if (!isControlled) setInternalSize(next);
              onSizeChange?.(next);
            } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
              const next = clamp(size + step);
              if (!isControlled) setInternalSize(next);
              onSizeChange?.(next);
            }
          }}
        >
          <div className={styles.handleBar} />
        </div>

        <div className={styles.panel} style={secondStyle}>
          {second}
        </div>
      </div>
    );
  },
);

ResizablePanels.displayName = "ResizablePanels";
