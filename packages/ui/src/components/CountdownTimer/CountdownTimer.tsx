import React, { forwardRef, useState, useEffect, useCallback } from "react";
import styles from "./CountdownTimer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CountdownTimerSize = "sm" | "md" | "lg";
export type CountdownTimerVariant = "default" | "card" | "minimal";

export interface CountdownTimerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 카운트다운 목표 일시 (Date 또는 ms) */
  targetDate: Date | number;
  /** 크기 */
  size?: CountdownTimerSize;
  /** 변형 */
  variant?: CountdownTimerVariant;
  /** 일(Days) 표시 여부 */
  showDays?: boolean;
  /** 레이블 표시 여부 */
  showLabels?: boolean;
  /** 구분자 문자 */
  separator?: string;
  /** 종료 시 콜백 */
  onComplete?: () => void;
  /** 커스텀 레이블 */
  labels?: { days?: string; hours?: string; minutes?: string; seconds?: string };
}

// ─── Time calculation ─────────────────────────────────────────────────────────

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

function calcTimeLeft(target: Date | number): TimeLeft {
  const targetMs = target instanceof Date ? target.getTime() : target;
  const diff = Math.max(targetMs - Date.now(), 0);
  return {
    total: diff,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// ─── CountdownTimer ───────────────────────────────────────────────────────────

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(
  (
    {
      targetDate,
      size = "md",
      variant = "default",
      showDays = true,
      showLabels = true,
      separator = ":",
      onComplete,
      labels = {},
      className,
      ...props
    },
    ref,
  ) => {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
      calcTimeLeft(targetDate),
    );

    const tick = useCallback(() => {
      const t = calcTimeLeft(targetDate);
      setTimeLeft(t);
      if (t.total === 0) {
        onComplete?.();
      }
    }, [targetDate, onComplete]);

    useEffect(() => {
      if (timeLeft.total === 0) return;
      const id = setInterval(tick, 1000);
      return () => clearInterval(id);
    }, [tick, timeLeft.total]);

    const l = {
      days: labels.days ?? "일",
      hours: labels.hours ?? "시간",
      minutes: labels.minutes ?? "분",
      seconds: labels.seconds ?? "초",
    };

    const rootClass = [
      styles.root,
      styles[`size-${size}`],
      styles[`variant-${variant}`],
      timeLeft.total === 0 && styles.completed,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const units = [
      ...(showDays ? [{ value: timeLeft.days, label: l.days }] : []),
      { value: timeLeft.hours, label: l.hours },
      { value: timeLeft.minutes, label: l.minutes },
      { value: timeLeft.seconds, label: l.seconds },
    ];

    return (
      <div ref={ref} className={rootClass} role="timer" aria-live="off" {...props}>
        {units.map((unit, i) => (
          <React.Fragment key={unit.label}>
            {i > 0 && variant !== "card" && (
              <span className={styles.separator} aria-hidden="true">
                {separator}
              </span>
            )}
            <div className={styles.unit}>
              <span className={styles.value}>{pad(unit.value)}</span>
              {showLabels && (
                <span className={styles.label}>{unit.label}</span>
              )}
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  },
);

CountdownTimer.displayName = "CountdownTimer";
