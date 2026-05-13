import React, { forwardRef, useRef, useEffect, useState } from "react";
import styles from "./Ticker.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TickerColor = "default" | "primary" | "success" | "warning" | "danger" | "dark";

export interface TickerItem {
  id: string;
  content: React.ReactNode;
}

export interface TickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 표시할 아이템 목록 */
  items: TickerItem[];
  /** 스크롤 속도 (px/s) */
  speed?: number;
  /** 색상 테마 */
  color?: TickerColor;
  /** 헤더 레이블 */
  label?: string;
  /** 구분자 */
  separator?: React.ReactNode;
  /** 일시정지 (hover 시 자동) */
  pauseOnHover?: boolean;
  /** 방향 */
  direction?: "left" | "right";
}

// ─── Ticker ───────────────────────────────────────────────────────────────────

export const Ticker = forwardRef<HTMLDivElement, TickerProps>(
  (
    {
      items,
      speed = 60,
      color = "default",
      label,
      separator = "•",
      pauseOnHover = true,
      direction = "left",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
      if (trackRef.current) {
        const w = trackRef.current.scrollWidth / 2;
        setDuration(w / speed);
      }
    }, [items, speed]);

    const classes = [
      styles.root,
      styles[`color-${color}`],
      pauseOnHover && styles.pauseOnHover,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const animStyle: React.CSSProperties = {
      "--ticker-duration": `${duration}s`,
      "--ticker-direction": direction === "right" ? "reverse" : "normal",
    } as React.CSSProperties;

    // Duplicate items for seamless loop
    const allItems = [...items, ...items];

    return (
      <div ref={ref} className={classes} style={style} {...props}>
        {label && <div className={styles.label}>{label}</div>}
        <div className={styles.overflow}>
          <div
            ref={trackRef}
            className={styles.track}
            style={animStyle}
          >
            {allItems.map((item, i) => (
              <React.Fragment key={`${item.id}-${i}`}>
                <span className={styles.item}>{item.content}</span>
                {separator && (
                  <span className={styles.separator} aria-hidden="true">
                    {separator}
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

Ticker.displayName = "Ticker";
