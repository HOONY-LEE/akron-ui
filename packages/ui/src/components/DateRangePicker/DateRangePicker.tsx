import { forwardRef, useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./DateRangePicker.module.css";

export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export type DateRangePickerSize = "sm" | "md" | "lg";

export interface DateRangePreset {
  label: string;
  range: DateRange;
}

export interface DateRangePickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 선택된 날짜 범위 (제어 모드) */
  value?: DateRange;
  /** 기본 날짜 범위 */
  defaultValue?: DateRange;
  /** 날짜 범위 변경 핸들러 */
  onChange?: (range: DateRange) => void;
  /** 크기 */
  size?: DateRangePickerSize;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 날짜 포맷 (YYYY-MM-DD) */
  format?: string;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 프리셋 목록 */
  presets?: DateRangePreset[];
  /** 프리셋 표시 여부 */
  showPresets?: boolean;
  /** 로케일 */
  locale?: "ko" | "en";
}

/* ── Locale data ── */
const LOCALE_DATA = {
  ko: {
    days: ["일", "월", "화", "수", "목", "금", "토"],
    months: [
      "1월", "2월", "3월", "4월", "5월", "6월",
      "7월", "8월", "9월", "10월", "11월", "12월",
    ],
    formatMonth: (year: number, month: number) =>
      `${year}년 ${month + 1}월`,
  },
  en: {
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    formatMonth: (year: number, month: number) =>
      `${LOCALE_DATA.en.months[month]} ${year}`,
  },
} as const;

/* ── Helpers ── */
function formatDate(date: Date, fmt: string): string {
  const y = String(date.getFullYear());
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return fmt.replace("YYYY", y).replace("MM", m).replace("DD", d);
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Date[] = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(new Date(year, month, 1 - (firstDay - i)));
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  while (days.length % 7 !== 0) {
    days.push(
      new Date(year, month + 1, days.length - daysInMonth - firstDay + 1),
    );
  }
  return days;
}

function getDefaultPresets(locale: "ko" | "en"): DateRangePreset[] {
  const today = new Date();
  const t = startOfDay(today);
  const labels =
    locale === "ko"
      ? ["오늘", "최근 7일", "최근 30일", "이번 달", "지난 달", "최근 3개월"]
      : ["Today", "Last 7 days", "Last 30 days", "This month", "Last month", "Last 3 months"];

  const monthStart = new Date(t.getFullYear(), t.getMonth(), 1);
  const prevMonthStart = new Date(t.getFullYear(), t.getMonth() - 1, 1);
  const prevMonthEnd = new Date(t.getFullYear(), t.getMonth(), 0);

  return [
    { label: labels[0], range: { start: new Date(t), end: new Date(t) } },
    {
      label: labels[1],
      range: {
        start: new Date(t.getFullYear(), t.getMonth(), t.getDate() - 6),
        end: new Date(t),
      },
    },
    {
      label: labels[2],
      range: {
        start: new Date(t.getFullYear(), t.getMonth(), t.getDate() - 29),
        end: new Date(t),
      },
    },
    { label: labels[3], range: { start: monthStart, end: new Date(t) } },
    { label: labels[4], range: { start: prevMonthStart, end: prevMonthEnd } },
    {
      label: labels[5],
      range: {
        start: new Date(t.getFullYear(), t.getMonth() - 2, 1),
        end: new Date(t),
      },
    },
  ];
}

function rangesEqual(a: DateRange, b: DateRange): boolean {
  const startMatch =
    a.start && b.start ? isSameDay(a.start, b.start) : a.start === b.start;
  const endMatch =
    a.end && b.end ? isSameDay(a.end, b.end) : a.end === b.end;
  return startMatch && endMatch;
}

/* ── Component ── */
export const DateRangePicker = forwardRef<HTMLDivElement, DateRangePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      size = "md",
      placeholder = "날짜 범위 선택",
      format: fmt = "YYYY-MM-DD",
      minDate,
      maxDate,
      disabled = false,
      error = false,
      helperText,
      presets: presetsProp,
      showPresets: showPresetsProp,
      locale = "ko",
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalRange, setInternalRange] = useState<DateRange>(
      defaultValue ?? { start: null, end: null },
    );
    const range = isControlled ? value! : internalRange;

    const [open, setOpen] = useState(false);
    const [hoverDate, setHoverDate] = useState<Date | null>(null);
    // Selection state: null = nothing selected, "start" = start picked, waiting for end
    const [selecting, setSelecting] = useState<"start" | null>(null);
    const [pendingStart, setPendingStart] = useState<Date | null>(null);

    const today = new Date();
    const [leftYear, setLeftYear] = useState(
      range.start?.getFullYear() ?? today.getFullYear(),
    );
    const [leftMonth, setLeftMonth] = useState(
      range.start?.getMonth() ?? today.getMonth(),
    );

    const containerRef = useRef<HTMLDivElement>(null);

    const localeData = LOCALE_DATA[locale];

    const presets = useMemo(() => {
      if (presetsProp) return presetsProp;
      return getDefaultPresets(locale);
    }, [presetsProp, locale]);

    const showPresets = showPresetsProp ?? presets.length > 0;

    // Right calendar is always one month ahead of left
    const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
    const rightMonth = leftMonth === 11 ? 0 : leftMonth + 1;

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
          setSelecting(null);
          setPendingStart(null);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const setRange = useCallback(
      (newRange: DateRange) => {
        if (!isControlled) setInternalRange(newRange);
        onChange?.(newRange);
      },
      [isControlled, onChange],
    );

    const handleDayClick = useCallback(
      (date: Date) => {
        if (selecting === null || selecting === undefined) {
          // First click: set start
          setPendingStart(date);
          setSelecting("start");
        } else {
          // Second click: set end
          let start = pendingStart!;
          let end = date;
          // Auto-swap if end < start
          if (end < start) {
            [start, end] = [end, start];
          }
          setRange({ start, end });
          setSelecting(null);
          setPendingStart(null);
          setOpen(false);
        }
      },
      [selecting, pendingStart, setRange],
    );

    const handlePresetClick = useCallback(
      (preset: DateRangePreset) => {
        setRange(preset.range);
        if (preset.range.start) {
          setLeftYear(preset.range.start.getFullYear());
          setLeftMonth(preset.range.start.getMonth());
        }
        setSelecting(null);
        setPendingStart(null);
        setOpen(false);
      },
      [setRange],
    );

    const handleClear = useCallback(
      (e: React.MouseEvent) => {
        e.stopPropagation();
        setRange({ start: null, end: null });
        setSelecting(null);
        setPendingStart(null);
      },
      [setRange],
    );

    const prevMonth = () => {
      if (leftMonth === 0) {
        setLeftMonth(11);
        setLeftYear((y) => y - 1);
      } else {
        setLeftMonth((m) => m - 1);
      }
    };

    const nextMonth = () => {
      if (leftMonth === 11) {
        setLeftMonth(0);
        setLeftYear((y) => y + 1);
      } else {
        setLeftMonth((m) => m + 1);
      }
    };

    const isDateDisabled = (date: Date) => {
      if (minDate && startOfDay(date) < startOfDay(minDate)) return true;
      if (maxDate && startOfDay(date) > startOfDay(maxDate)) return true;
      return false;
    };

    const isOutsideMonth = (date: Date, month: number) =>
      date.getMonth() !== month;

    // Determine range highlight state for a day
    const getDayState = (date: Date) => {
      const d = startOfDay(date);

      // During selection (first click done, hovering)
      if (selecting === "start" && pendingStart) {
        const s = startOfDay(pendingStart);
        const h = hoverDate ? startOfDay(hoverDate) : null;

        if (isSameDay(d, s)) return "rangeStart";
        if (h) {
          const lo = s < h ? s : h;
          const hi = s < h ? h : s;
          if (isSameDay(d, lo)) return "rangeStart";
          if (isSameDay(d, hi)) return "rangeEnd";
          if (d > lo && d < hi) return "inRange";
        }
        return null;
      }

      // Committed range
      if (range.start && range.end) {
        const s = startOfDay(range.start);
        const e = startOfDay(range.end);
        if (isSameDay(d, s) && isSameDay(d, e)) return "rangeStartEnd";
        if (isSameDay(d, s)) return "rangeStart";
        if (isSameDay(d, e)) return "rangeEnd";
        if (d > s && d < e) return "inRange";
      }

      return null;
    };

    const triggerText = useMemo(() => {
      if (range.start && range.end) {
        return `${formatDate(range.start, fmt)} ~ ${formatDate(range.end, fmt)}`;
      }
      if (range.start) {
        return `${formatDate(range.start, fmt)} ~`;
      }
      return null;
    }, [range, fmt]);

    const hasValue = range.start !== null || range.end !== null;

    const iconSize = size === "sm" ? 14 : 16;

    const renderCalendar = (year: number, month: number, side: "left" | "right") => {
      const days = getDaysInMonth(year, month);

      return (
        <div className={styles.calendar}>
          <div className={styles.calendarHeader}>
            {side === "left" ? (
              <button
                type="button"
                className={styles.navBtn}
                onClick={prevMonth}
                aria-label={locale === "ko" ? "이전 달" : "Previous month"}
              >
                <ChevronLeft size={16} />
              </button>
            ) : (
              <span className={styles.navBtnHidden} style={{ width: 28 }} />
            )}
            <span className={styles.monthLabel}>
              {localeData.formatMonth(year, month)}
            </span>
            {side === "right" ? (
              <button
                type="button"
                className={styles.navBtn}
                onClick={nextMonth}
                aria-label={locale === "ko" ? "다음 달" : "Next month"}
              >
                <ChevronRight size={16} />
              </button>
            ) : (
              <span className={styles.navBtnHidden} style={{ width: 28 }} />
            )}
          </div>

          <div className={styles.dayGrid}>
            {localeData.days.map((d) => (
              <div key={d} className={styles.dayName}>
                {d}
              </div>
            ))}
            {days.map((date, idx) => {
              const outside = isOutsideMonth(date, month);
              const dayDisabled = isDateDisabled(date);
              const today_ = isToday(date) && !outside;
              const state = outside ? null : getDayState(date);

              const classNames = [
                styles.day,
                outside ? styles.outside : "",
                dayDisabled ? styles.disabled : "",
                today_ && state !== "rangeStart" && state !== "rangeEnd" && state !== "rangeStartEnd"
                  ? styles.today
                  : "",
                state === "inRange" ? styles.inRange : "",
                state === "rangeStart" ? styles.rangeStart : "",
                state === "rangeEnd" ? styles.rangeEnd : "",
                state === "rangeStartEnd"
                  ? `${styles.rangeStart} ${styles.rangeEnd}`
                  : "",
              ]
                .filter(Boolean)
                .join(" ");

              return (
                <button
                  key={idx}
                  type="button"
                  className={classNames}
                  onClick={() => !dayDisabled && !outside && handleDayClick(date)}
                  onMouseEnter={() => {
                    if (selecting === "start" && !outside && !dayDisabled) {
                      setHoverDate(date);
                    }
                  }}
                  disabled={dayDisabled || outside}
                  aria-label={formatDate(date, "YYYY-MM-DD")}
                  tabIndex={outside || dayDisabled ? -1 : 0}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      );
    };

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={[styles.root, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Trigger */}
        <div
          className={[
            styles.trigger,
            styles[size],
            error ? styles.error : "",
            disabled ? styles.disabled : "",
            open ? styles.focused : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => !disabled && setOpen((v) => !v)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={triggerText ?? placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              !disabled && setOpen((v) => !v);
            }
            if (e.key === "Escape") {
              setOpen(false);
              setSelecting(null);
              setPendingStart(null);
            }
          }}
        >
          <Calendar size={iconSize} className={styles.calIcon} />
          <span className={triggerText ? styles.dateText : styles.placeholder}>
            {triggerText ?? placeholder}
          </span>
          {hasValue && !disabled && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={handleClear}
              aria-label={locale === "ko" ? "날짜 초기화" : "Clear dates"}
              tabIndex={-1}
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div className={styles.dropdown} role="dialog" aria-label={locale === "ko" ? "날짜 범위 선택" : "Date range picker"}>
            <div className={styles.dropdownInner}>
              {/* Presets */}
              {showPresets && (
                <div className={styles.presets}>
                  {presets.map((preset, idx) => {
                    const isActive =
                      range.start &&
                      range.end &&
                      preset.range.start &&
                      preset.range.end &&
                      rangesEqual(range, preset.range);
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={[styles.presetBtn, isActive ? styles.active : ""]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => handlePresetClick(preset)}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Calendars */}
              <div className={styles.calendars}>
                {renderCalendar(leftYear, leftMonth, "left")}
                {renderCalendar(rightYear, rightMonth, "right")}
              </div>
            </div>
          </div>
        )}

        {/* Helper text */}
        {helperText && (
          <p
            className={[styles.helperText, error ? styles.errorHelper : ""]
              .filter(Boolean)
              .join(" ")}
            role={error ? "alert" : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

DateRangePicker.displayName = "DateRangePicker";
