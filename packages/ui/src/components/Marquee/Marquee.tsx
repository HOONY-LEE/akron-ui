import React, { forwardRef, useRef, useState, useEffect } from "react";
import styles from "./Marquee.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MarqueeDirection = "left" | "right";

export interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 스크롤 속도 (px/s) */
  speed?: number;
  /** 스크롤 방향 */
  direction?: MarqueeDirection;
  /** hover 시 일시정지 */
  pauseOnHover?: boolean;
  /** 갭 (px) */
  gap?: number;
  /** 반복 횟수 (콘텐츠 복사 수, 최소 2) */
  repeat?: number;
  /** 자식 요소 */
  children: React.ReactNode;
}

// ─── Marquee ──────────────────────────────────────────────────────────────────

export const Marquee = forwardRef<HTMLDivElement, MarqueeProps>(
  (
    {
      speed = 40,
      direction = "left",
      pauseOnHover = true,
      gap = 16,
      repeat = 4,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(10);

    useEffect(() => {
      const el = innerRef.current;
      if (!el) return;
      const w = el.scrollWidth / repeat;
      setDuration(w / speed);
    }, [speed, repeat, children]);

    const copies = Array.from({ length: Math.max(2, repeat) });

    const inlineStyle: React.CSSProperties = {
      "--marquee-gap": `${gap}px`,
      "--marquee-duration": `${duration}s`,
      "--marquee-direction": direction === "right" ? "reverse" : "normal",
      ...style,
    } as React.CSSProperties;

    const classes = [
      styles.root,
      pauseOnHover && styles.pauseOnHover,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} style={inlineStyle} {...props}>
        <div ref={innerRef} className={styles.inner} aria-hidden="true">
          {copies.map((_, i) => (
            <div key={i} className={styles.item}>
              {children}
            </div>
          ))}
        </div>
        {/* Accessible copy — just first instance */}
        <div className={styles.srOnly}>{children}</div>
      </div>
    );
  },
);

Marquee.displayName = "Marquee";
