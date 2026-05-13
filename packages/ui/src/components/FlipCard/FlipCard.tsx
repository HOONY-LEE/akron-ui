import React, { forwardRef, useState } from "react";
import styles from "./FlipCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FlipCardDirection = "horizontal" | "vertical";
export type FlipCardTrigger = "hover" | "click";

export interface FlipCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 앞면 콘텐츠 */
  front: React.ReactNode;
  /** 뒷면 콘텐츠 */
  back: React.ReactNode;
  /** 뒤집기 방향 */
  direction?: FlipCardDirection;
  /** 뒤집기 트리거 */
  trigger?: FlipCardTrigger;
  /** 외부 제어: 뒤집힘 상태 */
  flipped?: boolean;
  /** 뒤집힘 상태 변경 핸들러 */
  onFlipChange?: (flipped: boolean) => void;
  /** 애니메이션 시간 (ms) */
  duration?: number;
  /** 높이 (반드시 지정해야 함) */
  height?: number | string;
}

// ─── FlipCard ─────────────────────────────────────────────────────────────────

export const FlipCard = forwardRef<HTMLDivElement, FlipCardProps>(
  (
    {
      front,
      back,
      direction = "horizontal",
      trigger = "hover",
      flipped: flippedProp,
      onFlipChange,
      duration = 600,
      height = 200,
      className,
      style,
      onClick,
      ...props
    },
    ref,
  ) => {
    const isControlled = flippedProp !== undefined;
    const [internalFlipped, setInternalFlipped] = useState(false);
    const flipped = isControlled ? flippedProp! : internalFlipped;

    const toggle = () => {
      if (!isControlled) setInternalFlipped((v) => !v);
      onFlipChange?.(!flipped);
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if (trigger === "click") toggle();
      onClick?.(e);
    };

    const rootClasses = [
      styles.root,
      styles[`dir-${direction}`],
      trigger === "hover" && styles.hoverTrigger,
      flipped && styles.flipped,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={rootClasses}
        style={
          {
            height,
            "--flip-duration": `${duration}ms`,
            ...style,
          } as React.CSSProperties
        }
        onClick={handleClick}
        role={trigger === "click" ? "button" : undefined}
        tabIndex={trigger === "click" ? 0 : undefined}
        onKeyDown={
          trigger === "click"
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle();
                }
              }
            : undefined
        }
        {...props}
      >
        <div className={styles.inner}>
          <div className={styles.face}>{front}</div>
          <div className={[styles.face, styles.back].join(" ")}>{back}</div>
        </div>
      </div>
    );
  },
);

FlipCard.displayName = "FlipCard";
