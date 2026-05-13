import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./NumberTicker.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface NumberTickerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 목표 값 */
  value: number;
  /** 소수점 자릿수 */
  decimalPlaces?: number;
  /** 천 단위 구분자 */
  thousandSeparator?: string;
  /** 소수점 기호 */
  decimalSeparator?: string;
  /** 값 앞 접두사 (예: "₩", "$") */
  prefix?: string;
  /** 값 뒤 접미사 (예: "%", "명") */
  suffix?: string;
  /** 애니메이션 지속시간 (ms) */
  duration?: number;
  /** 애니메이션 시작 지연 (ms) */
  delay?: number;
  /** 시작 값 */
  startValue?: number;
  /** Easing 함수 */
  easing?: "linear" | "easeOut" | "easeInOut";
  /** Intersection Observer로 뷰포트에 들어올 때 시작 */
  animateOnView?: boolean;
}

// ─── Easing functions ─────────────────────────────────────────────────────────

function getEasingFn(type: NumberTickerProps["easing"]) {
  switch (type) {
    case "linear":
      return (t: number) => t;
    case "easeInOut":
      return (t: number) =>
        t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    case "easeOut":
    default:
      return (t: number) => 1 - Math.pow(1 - t, 3);
  }
}

// ─── NumberTicker ─────────────────────────────────────────────────────────────

export const NumberTicker = forwardRef<HTMLSpanElement, NumberTickerProps>(
  (
    {
      value,
      decimalPlaces = 0,
      thousandSeparator = ",",
      decimalSeparator = ".",
      prefix = "",
      suffix = "",
      duration = 1500,
      delay = 0,
      startValue = 0,
      easing = "easeOut",
      animateOnView = true,
      className,
      ...props
    },
    ref,
  ) => {
    const [current, setCurrent] = useState(startValue);
    const [started, setStarted] = useState(!animateOnView);
    const containerRef = useRef<HTMLSpanElement>(null);
    const rafRef = useRef<number>(0);

    // Intersection observer
    useEffect(() => {
      if (!animateOnView) return;
      const el = containerRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [animateOnView]);

    // Animate
    useEffect(() => {
      if (!started) return;

      let timeoutId: ReturnType<typeof setTimeout>;
      const easingFn = getEasingFn(easing);
      const from = startValue;
      const to = value;

      timeoutId = setTimeout(() => {
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const eased = easingFn(progress);
          const currentValue = from + (to - from) * eased;

          setCurrent(currentValue);

          if (progress < 1) {
            rafRef.current = requestAnimationFrame(tick);
          }
        };

        rafRef.current = requestAnimationFrame(tick);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, [started, value, startValue, duration, delay, easing]);

    // Format number
    const formatted = (() => {
      const fixed = current.toFixed(decimalPlaces);
      const [intPart, decPart] = fixed.split(".");

      const intFormatted = intPart.replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandSeparator,
      );

      return decimalPlaces > 0
        ? `${intFormatted}${decimalSeparator}${decPart}`
        : intFormatted;
    })();

    return (
      <span
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLSpanElement | null>).current = node;
        }}
        className={[styles.ticker, className].filter(Boolean).join(" ")}
        {...props}
      >
        {prefix && <span className={styles.affix}>{prefix}</span>}
        <span className={styles.number}>{formatted}</span>
        {suffix && <span className={styles.affix}>{suffix}</span>}
      </span>
    );
  },
);

NumberTicker.displayName = "NumberTicker";
