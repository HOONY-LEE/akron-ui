import { forwardRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Calendar.module.css";

export type CalendarView = "month" | "week";

export interface CalendarEvent {
  /** 이벤트 ID */
  id: string;
  /** 제목 */
  title: string;
  /** 날짜 (YYYY-MM-DD) */
  date: string;
  /** 색상 */
  color?: string;
  /** 클릭 핸들러 */
  onClick?: () => void;
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "onChange"> {
  /** 이벤트 목록 */
  events?: CalendarEvent[];
  /** 현재 날짜 (제어 모드) */
  value?: Date;
  /** 기본 날짜 */
  defaultValue?: Date;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date) => void;
  /** 날짜 클릭 핸들러 */
  onDateClick?: (date: Date) => void;
  /** 뷰 모드 */
  view?: CalendarView;
  /** 뷰 변경 핸들러 */
  onViewChange?: (view: CalendarView) => void;
  className?: string;
}

const DAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];

function toDateStr(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function isToday(date: Date): boolean {
  const t = new Date();
  return date.getDate() === t.getDate() && date.getMonth() === t.getMonth() && date.getFullYear() === t.getFullYear();
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
    days.push(new Date(year, month + 1, days.length - daysInMonth - firstDay + 1));
  }
  return days;
}

function getWeekDays(date: Date): Date[] {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    return day;
  });
}

export const Calendar = forwardRef<HTMLDivElement, CalendarProps>(
  (
    {
      events = [],
      value,
      defaultValue,
      onChange,
      onDateClick,
      view: controlledView,
      onViewChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const today = new Date();
    const isControlled = value !== undefined;
    const [internalDate, setInternalDate] = useState<Date>(defaultValue ?? today);
    const current = isControlled ? value! : internalDate;

    const [viewYear, setViewYear] = useState(current.getFullYear());
    const [viewMonth, setViewMonth] = useState(current.getMonth());

    const isViewControlled = controlledView !== undefined;
    const [internalView, setInternalView] = useState<CalendarView>("month");
    const view = isViewControlled ? controlledView! : internalView;

    const setView = (v: CalendarView) => {
      if (!isViewControlled) setInternalView(v);
      onViewChange?.(v);
    };

    const prevPeriod = () => {
      if (view === "month") {
        if (viewMonth === 0) { setViewMonth(11); setViewYear((y) => y - 1); }
        else setViewMonth((m) => m - 1);
      } else {
        const d = new Date(current);
        d.setDate(d.getDate() - 7);
        if (!isControlled) setInternalDate(d);
        onChange?.(d);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    };

    const nextPeriod = () => {
      if (view === "month") {
        if (viewMonth === 11) { setViewMonth(0); setViewYear((y) => y + 1); }
        else setViewMonth((m) => m + 1);
      } else {
        const d = new Date(current);
        d.setDate(d.getDate() + 7);
        if (!isControlled) setInternalDate(d);
        onChange?.(d);
        setViewYear(d.getFullYear());
        setViewMonth(d.getMonth());
      }
    };

    const goToday = () => {
      const t = new Date();
      if (!isControlled) setInternalDate(t);
      onChange?.(t);
      setViewYear(t.getFullYear());
      setViewMonth(t.getMonth());
    };

    const handleDateClick = (date: Date) => {
      if (!isControlled) setInternalDate(date);
      onChange?.(date);
      onDateClick?.(date);
    };

    const eventsMap = new Map<string, CalendarEvent[]>();
    events.forEach((ev) => {
      const list = eventsMap.get(ev.date) ?? [];
      list.push(ev);
      eventsMap.set(ev.date, list);
    });

    const days = view === "month"
      ? getDaysInMonth(viewYear, viewMonth)
      : getWeekDays(current);

    const headerLabel = view === "month"
      ? `${viewYear}년 ${MONTHS[viewMonth]}`
      : (() => {
          const weekDays = getWeekDays(current);
          const start = weekDays[0];
          const end = weekDays[6];
          return `${start.getFullYear()}년 ${MONTHS[start.getMonth()]} ${start.getDate()}일 – ${end.getDate()}일`;
        })();

    return (
      <div
        ref={ref}
        className={[styles.calendar, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Toolbar */}
        <div className={styles.toolbar}>
          <div className={styles.navGroup}>
            <button type="button" className={styles.navBtn} onClick={prevPeriod} aria-label="이전">
              <ChevronLeft size={16} />
            </button>
            <span className={styles.headerLabel}>{headerLabel}</span>
            <button type="button" className={styles.navBtn} onClick={nextPeriod} aria-label="다음">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className={styles.toolbarRight}>
            <button type="button" className={styles.todayBtn} onClick={goToday}>
              오늘
            </button>
            <div className={styles.viewToggle}>
              {(["month", "week"] as CalendarView[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  className={[styles.viewBtn, view === v ? styles.viewBtnActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setView(v)}
                >
                  {v === "month" ? "월" : "주"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Day headers */}
        <div className={styles.dayHeaders}>
          {DAYS.map((d, i) => (
            <div
              key={d}
              className={[styles.dayHeader, i === 0 ? styles.sun : i === 6 ? styles.sat : ""]
                .filter(Boolean)
                .join(" ")}
            >
              {d}
            </div>
          ))}
        </div>

        {/* Grid */}
        <div className={[styles.grid, view === "week" ? styles.weekGrid : ""].filter(Boolean).join(" ")}>
          {days.map((date, idx) => {
            const dateStr = toDateStr(date);
            const dayEvents = eventsMap.get(dateStr) ?? [];
            const outside = view === "month" && date.getMonth() !== viewMonth;
            const today_ = isToday(date);
            const isSun = date.getDay() === 0;
            const isSat = date.getDay() === 6;

            return (
              <div
                key={idx}
                className={[
                  styles.dayCell,
                  outside ? styles.outsideDay : "",
                  today_ ? styles.todayCell : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleDateClick(date)}
              >
                <span
                  className={[
                    styles.dayNum,
                    isSun ? styles.sun : isSat ? styles.sat : "",
                    today_ ? styles.todayNum : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {date.getDate()}
                </span>
                <div className={styles.events}>
                  {dayEvents.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      className={styles.event}
                      style={{ backgroundColor: ev.color ?? "var(--ark-color-primary-500)" }}
                      onClick={(e) => { e.stopPropagation(); ev.onClick?.(); }}
                      title={ev.title}
                    >
                      {ev.title}
                    </div>
                  ))}
                  {dayEvents.length > 3 && (
                    <div className={styles.moreEvents}>+{dayEvents.length - 3}</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

Calendar.displayName = "Calendar";
