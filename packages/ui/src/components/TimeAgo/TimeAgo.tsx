import React, { forwardRef, useState, useEffect } from "react";
import styles from "./TimeAgo.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TimeAgoLocale = "ko" | "en";

export interface TimeAgoProps
  extends Omit<React.HTMLAttributes<HTMLTimeElement>, "children"> {
  /** 기준 날짜/시각 */
  date: Date | string | number;
  /** 자동 업데이트 간격 (ms, 0이면 비활성화) */
  updateInterval?: number;
  /** 로케일 */
  locale?: TimeAgoLocale;
  /** 절대 시간도 title로 표시 */
  showTitle?: boolean;
  /** suffix 숨김 */
  hideSuffix?: boolean;
}

// ─── Time formatting ──────────────────────────────────────────────────────────

interface TimeUnits {
  ko: Record<string, string>;
  en: Record<string, string>;
}

const UNITS_AGO: TimeUnits = {
  ko: {
    just: "방금 전",
    seconds: "초 전",
    minute: "1분 전",
    minutes: "분 전",
    hour: "1시간 전",
    hours: "시간 전",
    day: "어제",
    days: "일 전",
    month: "지난달",
    months: "개월 전",
    year: "작년",
    years: "년 전",
  },
  en: {
    just: "just now",
    seconds: "seconds ago",
    minute: "a minute ago",
    minutes: "minutes ago",
    hour: "an hour ago",
    hours: "hours ago",
    day: "yesterday",
    days: "days ago",
    month: "last month",
    months: "months ago",
    year: "last year",
    years: "years ago",
  },
};

const UNITS_FROM_NOW: TimeUnits = {
  ko: {
    just: "방금",
    seconds: "초 후",
    minute: "1분 후",
    minutes: "분 후",
    hour: "1시간 후",
    hours: "시간 후",
    day: "내일",
    days: "일 후",
    month: "다음달",
    months: "개월 후",
    year: "내년",
    years: "년 후",
  },
  en: {
    just: "just now",
    seconds: "in seconds",
    minute: "in a minute",
    minutes: "in minutes",
    hour: "in an hour",
    hours: "in hours",
    day: "tomorrow",
    days: "in days",
    month: "next month",
    months: "in months",
    year: "next year",
    years: "in years",
  },
};

function formatTimeAgo(date: Date, locale: TimeAgoLocale): string {
  const now = Date.now();
  const diffMs = now - date.getTime();
  const isPast = diffMs >= 0;
  const absDiff = Math.abs(diffMs);
  const units = isPast ? UNITS_AGO[locale] : UNITS_FROM_NOW[locale];

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 10) return units.just;
  if (seconds < 60) return locale === "ko" ? `${seconds}${units.seconds}` : `${seconds} ${units.seconds}`;
  if (minutes === 1) return units.minute;
  if (minutes < 60) return locale === "ko" ? `${minutes}${units.minutes}` : `${minutes} ${units.minutes}`;
  if (hours === 1) return units.hour;
  if (hours < 24) return locale === "ko" ? `${hours}${units.hours}` : `${hours} ${units.hours}`;
  if (days === 1) return units.day;
  if (days < 30) return locale === "ko" ? `${days}${units.days}` : `${days} ${units.days}`;
  if (months === 1) return units.month;
  if (months < 12) return locale === "ko" ? `${months}${units.months}` : `${months} ${units.months}`;
  if (years === 1) return units.year;
  return locale === "ko" ? `${years}${units.years}` : `${years} ${units.years}`;
}

function toDate(d: Date | string | number): Date {
  return d instanceof Date ? d : new Date(d);
}

// ─── TimeAgo ──────────────────────────────────────────────────────────────────

export const TimeAgo = forwardRef<HTMLTimeElement, TimeAgoProps>(
  (
    {
      date,
      updateInterval = 30000,
      locale = "ko",
      showTitle = true,
      hideSuffix = false,
      className,
      ...props
    },
    ref,
  ) => {
    const dateObj = toDate(date);
    const [text, setText] = useState(() => formatTimeAgo(dateObj, locale));

    useEffect(() => {
      setText(formatTimeAgo(toDate(date), locale));
    }, [date, locale]);

    useEffect(() => {
      if (!updateInterval) return;
      const id = setInterval(() => {
        setText(formatTimeAgo(toDate(date), locale));
      }, updateInterval);
      return () => clearInterval(id);
    }, [date, locale, updateInterval]);

    const iso = dateObj.toISOString();
    const titleStr = showTitle
      ? dateObj.toLocaleString(locale === "ko" ? "ko-KR" : "en-US")
      : undefined;

    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <time
        ref={ref}
        className={classes}
        dateTime={iso}
        title={titleStr}
        {...props}
      >
        {text}
      </time>
    );
  },
);

TimeAgo.displayName = "TimeAgo";
