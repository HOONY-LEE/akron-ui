import React, { forwardRef, useEffect, useRef, useState } from "react";
import styles from "./AnimatedCounter.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AnimatedCounterEasing = "linear" | "easeOut" | "easeInOut" | "spring";

export interface AnimatedCounterProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** 시작 값 */
  from?: number;
  /** 목표 값 */
  to: number;
  /** 애니메이션 지속 시간 (ms) */
  duration?: number;
  /** 소수점 자릿수 */
  decimals?: number;
  /** 값 포맷 함수 (기본: toLocaleString) */
  formatValue?: (value: number) => string;
  /** 이징 함수 */
  easing?: AnimatedCounterEasing;
  /** 구분자 (기본: 로케일 기반) */
  separator?: string;
  /** 접두사 */
  prefix?: string;
  /** 접미사 */
  suffix?: string;
  /** 뷰포트 진입 시 시작 (Intersection Observer) */
  startOnView?: boolean;
  /** 값 변경 완료 콜백 */
  onComplete?: () => void;
}

// ─── Easing ───────────────────────────────────────────────────────────────────

const EASING: Record<AnimatedCounterEasing, (t: number) => number> = {
  linear:    (t) => t,
  easeOut:   (t) => 1 - Math.pow(1 - t, 3),
  easeInOut: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
  spring:    (t) => {
    const c4 = (2 * Math.PI) / 3;
    if (t === 0) return 0;
    if (t === 1) return 1;
    return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },
};

// ─── AnimatedCounter ──────────────────────────────────────────────────────────

export const AnimatedCounter = forwardRef<HTMLSpanElement, AnimatedCounterProps>(
  (
    {
      from = 0,
      to,
      duration = 1500,
      decimals = 0,
      formatValue,
      easing = "easeOut",
      separator,
      prefix = "",
      suffix = "",
      startOnView = false,
      onComplete,
      className,
      ...props
    },
    ref,
  ) => {
    const [displayValue, setDisplayValue] = useState(from);
    const rafRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const rootRef = useRef<HTMLSpanElement>(null);
    const hasStarted = useRef(false);

    const easingFn = EASING[easing] ?? EASING.easeOut;

    const format = (val: number): string => {
      if (formatValue) return formatValue(val);
      const fixed = val.toFixed(decimals);
      if (separator !== undefined) {
        const [intPart, decPart] = fixed.split(".");
        const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, separator);
        return decPart !== undefined ? `${formatted}.${decPart}` : formatted;
      }
      return parseFloat(fixed).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    };

    const startAnimation = () => {
      if (hasStarted.current) return;
      hasStarted.current = true;

      const startVal = from;
      const endVal = to;

      const tick = (now: number) => {
        if (!startTimeRef.current) startTimeRef.current = now;
        const elapsed = now - startTimeRef.current;
        const t = Math.min(elapsed / duration, 1);
        const eased = easingFn(t);
        const current = startVal + (endVal - startVal) * eased;

        setDisplayValue(current);

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          setDisplayValue(endVal);
          onComplete?.();
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    // Re-animate when `to` changes
    useEffect(() => {
      hasStarted.current = false;
      startTimeRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);

      if (!startOnView) {
        startAnimation();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [to, from, duration, easing]);

    // IntersectionObserver for startOnView
    useEffect(() => {
      if (!startOnView) return;
      const el = (ref as React.RefObject<HTMLSpanElement>)?.current ?? rootRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            startAnimation();
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(el);
      return () => observer.disconnect();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [startOnView, to]);

    // Cleanup
    useEffect(() => {
      return () => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
      };
    }, []);

    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <span
        ref={ref ?? rootRef}
        className={classes}
        aria-live="polite"
        aria-atomic="true"
        {...props}
      >
        {prefix}{format(displayValue)}{suffix}
      </span>
    );
  },
);

AnimatedCounter.displayName = "AnimatedCounter";
