import { forwardRef, useState, useRef, useEffect } from "react";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import styles from "./DatePicker.module.css";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerProps {
  /** 선택된 날짜 (제어 모드) */
  value?: Date | null;
  /** 기본 날짜 */
  defaultValue?: Date | null;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date | null) => void;
  /** 최소 날짜 */
  minDate?: Date;
  /** 최대 날짜 */
  maxDate?: Date;
  /** 비활성화 날짜 판별 함수 */
  disableDate?: (date: Date) => boolean;
  /** 날짜 형식 표시 함수 */
  formatDate?: (date: Date) => string;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 크기 */
  size?: DatePickerSize;
  /** 레이블 */
  label?: string;
  /** 도움말 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 지우기 버튼 */
  clearable?: boolean;
  className?: string;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function defaultFormat(date: Date): string {
  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

function getDaysInMonth(year: number, month: number): Date[] {
  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days: Date[] = [];
  // Pad start
  for (let i = 0; i < firstDay; i++) {
    const d = new Date(year, month, 1 - (firstDay - i));
    days.push(d);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(year, month, i));
  }
  // Pad end to complete grid
  while (days.length % 7 !== 0) {
    days.push(new Date(year, month + 1, days.length - daysInMonth - firstDay + 1));
  }
  return days;
}

const HEIGHT: Record<DatePickerSize, string> = { sm: "32px", md: "40px", lg: "48px" };
const FONT: Record<DatePickerSize, string> = { sm: "13px", md: "14px", lg: "15px" };

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      minDate,
      maxDate,
      disableDate,
      formatDate = defaultFormat,
      placeholder = "날짜 선택",
      size = "md",
      label,
      helperText,
      errorMessage,
      disabled = false,
      clearable = true,
      className,
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internalDate, setInternalDate] = useState<Date | null>(defaultValue ?? null);
    const selected = isControlled ? value : internalDate;

    const today = new Date();
    const [viewYear, setViewYear] = useState(selected?.getFullYear() ?? today.getFullYear());
    const [viewMonth, setViewMonth] = useState(selected?.getMonth() ?? today.getMonth());
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    const setDate = (date: Date | null) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
      if (date) setOpen(false);
    };

    const prevMonth = () => {
      if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
      else setViewMonth((m) => m - 1);
    };

    const nextMonth = () => {
      if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
      else setViewMonth((m) => m + 1);
    };

    const days = getDaysInMonth(viewYear, viewMonth);

    const isDisabled = (date: Date) => {
      if (minDate && date < minDate) return true;
      if (maxDate && date > maxDate) return true;
      if (disableDate?.(date)) return true;
      return false;
    };

    const isOutsideMonth = (date: Date) => date.getMonth() !== viewMonth;

    const inputId = `datepicker-${Math.random().toString(36).slice(2)}`;

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}
      >
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}

        {/* Trigger */}
        <div
          className={[
            styles.trigger,
            styles[size],
            errorMessage ? styles.error : "",
            disabled ? styles.disabled : "",
            open ? styles.focused : "",
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ height: HEIGHT[size], fontSize: FONT[size] }}
          onClick={() => !disabled && setOpen((v) => !v)}
          role="button"
          tabIndex={disabled ? -1 : 0}
          id={inputId}
          aria-haspopup="dialog"
          aria-expanded={open}
          aria-label={selected ? formatDate(selected) : placeholder}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); !disabled && setOpen((v) => !v); }
            if (e.key === "Escape") setOpen(false);
          }}
        >
          <Calendar size={size === "sm" ? 14 : 16} className={styles.calIcon} />
          <span className={selected ? styles.dateText : styles.placeholder}>
            {selected ? formatDate(selected) : placeholder}
          </span>
          {clearable && selected && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={(e) => { e.stopPropagation(); setDate(null); }}
              aria-label="날짜 초기화"
              tabIndex={-1}
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Calendar popup */}
        {open && (
          <div className={styles.calendar} role="dialog" aria-label="달력">
            {/* Header */}
            <div className={styles.calHeader}>
              <button type="button" className={styles.navBtn} onClick={prevMonth} aria-label="이전 달">
                <ChevronLeft size={16} />
              </button>
              <span className={styles.monthLabel}>
                {viewYear}년 {MONTHS[viewMonth]}
              </span>
              <button type="button" className={styles.navBtn} onClick={nextMonth} aria-label="다음 달">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Day labels */}
            <div className={styles.dayRow}>
              {DAYS.map((d, i) => (
                <div key={d} className={[styles.dayLabel, i === 0 ? styles.sun : i === 6 ? styles.sat : ""].filter(Boolean).join(" ")}>
                  {d}
                </div>
              ))}
            </div>

            {/* Days grid */}
            <div className={styles.daysGrid}>
              {days.map((date, idx) => {
                const outside = isOutsideMonth(date);
                const disabled_ = isDisabled(date);
                const isSelected = selected ? isSameDay(date, selected) : false;
                const today_ = isToday(date);
                const isSun = date.getDay() === 0;
                const isSat = date.getDay() === 6;

                return (
                  <button
                    key={idx}
                    type="button"
                    className={[
                      styles.dayBtn,
                      outside ? styles.outside : "",
                      disabled_ ? styles.dayDisabled : "",
                      isSelected ? styles.selected : "",
                      today_ && !isSelected ? styles.today : "",
                      isSun && !outside ? styles.sun : "",
                      isSat && !outside ? styles.sat : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => !disabled_ && setDate(date)}
                    disabled={disabled_}
                    aria-label={defaultFormat(date)}
                    aria-pressed={isSelected}
                    aria-current={today_ ? "date" : undefined}
                    tabIndex={outside || disabled_ ? -1 : 0}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Today button */}
            <div className={styles.calFooter}>
              <button
                type="button"
                className={styles.todayBtn}
                onClick={() => { setViewYear(today.getFullYear()); setViewMonth(today.getMonth()); setDate(new Date()); }}
              >
                오늘
              </button>
            </div>
          </div>
        )}

        {errorMessage ? (
          <p className={styles.errorText} role="alert">{errorMessage}</p>
        ) : helperText ? (
          <p className={styles.helperText}>{helperText}</p>
        ) : null}
      </div>
    );
  },
);

DatePicker.displayName = "DatePicker";
