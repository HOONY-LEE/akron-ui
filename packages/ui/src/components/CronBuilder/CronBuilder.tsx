import { forwardRef, useState, useCallback, useMemo } from "react";
import { Clock } from "lucide-react";
import styles from "./CronBuilder.module.css";

export type CronBuilderSize = "sm" | "md";

export interface CronBuilderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** cron expression (e.g. "0 * * * *") */
  value?: string;
  /** default cron expression for uncontrolled mode */
  defaultValue?: string;
  /** called when cron expression changes */
  onChange?: (cron: string) => void;
  /** size variant */
  size?: CronBuilderSize;
  /** show the raw cron expression (default true) */
  showExpression?: boolean;
  /** show human-readable preview (default true) */
  showPreview?: boolean;
  /** locale for preview text */
  locale?: "ko" | "en";
}

/* ── Cron helpers ── */

interface CronFields {
  minute: string;
  hour: string;
  dom: string;
  month: string;
  dow: string;
}

function parseCron(expr: string): CronFields {
  const parts = expr.trim().split(/\s+/);
  return {
    minute: parts[0] ?? "*",
    hour: parts[1] ?? "*",
    dom: parts[2] ?? "*",
    month: parts[3] ?? "*",
    dow: parts[4] ?? "*",
  };
}

function buildCron(fields: CronFields): string {
  return `${fields.minute} ${fields.hour} ${fields.dom} ${fields.month} ${fields.dow}`;
}

/* ── Field type detection ── */

type FieldMode = "every" | "interval" | "specific";

function getFieldMode(val: string): FieldMode {
  if (val === "*") return "every";
  if (val.startsWith("*/")) return "interval";
  return "specific";
}

function getIntervalValue(val: string): number {
  if (val.startsWith("*/")) return parseInt(val.slice(2), 10) || 1;
  return 1;
}

function getSpecificValues(val: string): number[] {
  if (val === "*" || val.startsWith("*/")) return [];
  const result: number[] = [];
  for (const part of val.split(",")) {
    const trimmed = part.trim();
    if (trimmed.includes("-")) {
      const [start, end] = trimmed.split("-").map(Number);
      for (let i = start; i <= end; i++) result.push(i);
    } else {
      const n = parseInt(trimmed, 10);
      if (!isNaN(n)) result.push(n);
    }
  }
  return result;
}

function specificToString(values: number[]): string {
  if (values.length === 0) return "*";
  return [...values].sort((a, b) => a - b).join(",");
}

/* ── Human-readable preview ── */

const KO_DOW = ["일", "월", "화", "수", "목", "금", "토"];
const EN_DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const KO_MONTH = [
  "", "1월", "2월", "3월", "4월", "5월", "6월",
  "7월", "8월", "9월", "10월", "11월", "12월",
];
const EN_MONTH = [
  "", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function cronToHuman(expr: string, locale: "ko" | "en"): string {
  const f = parseCron(expr);
  const ko = locale === "ko";

  // Presets
  if (f.minute === "*" && f.hour === "*" && f.dom === "*" && f.month === "*" && f.dow === "*") {
    return ko ? "매분" : "Every minute";
  }

  if (f.minute.startsWith("*/") && f.hour === "*" && f.dom === "*" && f.month === "*" && f.dow === "*") {
    const n = getIntervalValue(f.minute);
    return ko ? `매 ${n}분마다` : `Every ${n} minutes`;
  }

  if (f.minute === "0" && f.hour.startsWith("*/") && f.dom === "*" && f.month === "*" && f.dow === "*") {
    const n = getIntervalValue(f.hour);
    return ko ? `매 ${n}시간마다` : `Every ${n} hours`;
  }

  const parts: string[] = [];

  // Month
  if (f.month !== "*") {
    const months = getSpecificValues(f.month);
    const monthNames = ko ? KO_MONTH : EN_MONTH;
    if (months.length > 0) {
      parts.push(months.map((m) => monthNames[m]).join(", "));
    }
  }

  // Day of month
  if (f.dom !== "*") {
    const days = getSpecificValues(f.dom);
    if (days.length > 0) {
      parts.push(ko ? `${days.join(", ")}일` : `day ${days.join(", ")}`);
    }
  } else if (f.month !== "*") {
    parts.push(ko ? "매일" : "every day");
  }

  // Day of week
  if (f.dow !== "*") {
    const dows = getSpecificValues(f.dow);
    const dowNames = ko ? KO_DOW : EN_DOW;
    if (dows.length > 0) {
      // Check for weekdays (1-5)
      if (dows.length === 5 && [1, 2, 3, 4, 5].every((d) => dows.includes(d))) {
        parts.push(ko ? "평일" : "weekdays");
      } else if (dows.length === 2 && [0, 6].every((d) => dows.includes(d))) {
        parts.push(ko ? "주말" : "weekends");
      } else {
        parts.push(dows.map((d) => dowNames[d]).join(", "));
      }
    }
  }

  // Time
  if (f.hour !== "*" && f.minute !== "*") {
    const hours = getSpecificValues(f.hour);
    const mins = getSpecificValues(f.minute);
    if (hours.length > 0 && mins.length > 0) {
      const h = hours[0];
      const m = mins[0];
      if (ko) {
        const period = h < 12 ? "오전" : "오후";
        const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
        if (h === 0 && m === 0) {
          parts.push("자정");
        } else if (m === 0) {
          parts.push(`${period} ${displayH}시`);
        } else {
          parts.push(`${period} ${displayH}시 ${m}분`);
        }
      } else {
        const period = h < 12 ? "AM" : "PM";
        const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
        if (h === 0 && m === 0) {
          parts.push("midnight");
        } else {
          parts.push(`${displayH}:${String(m).padStart(2, "0")} ${period}`);
        }
      }
    }
  } else if (f.hour !== "*") {
    const hours = getSpecificValues(f.hour);
    if (hours.length > 0) {
      const h = hours[0];
      if (ko) {
        const period = h < 12 ? "오전" : "오후";
        const displayH = h === 0 ? 12 : h > 12 ? h - 12 : h;
        parts.push(`${period} ${displayH}시`);
      } else {
        parts.push(`${h}:00`);
      }
    }
  }

  if (parts.length === 0) {
    return ko ? "커스텀 스케줄" : "Custom schedule";
  }

  // Prefix
  if (f.month === "*" && f.dom === "*" && f.dow === "*") {
    const prefix = ko ? "매일 " : "Daily at ";
    return prefix + parts.join(" ");
  }

  if (f.month === "*" && f.dom === "*" && f.dow !== "*") {
    const prefix = ko ? "매주 " : "Weekly on ";
    return prefix + parts.join(" ");
  }

  if (f.month === "*" && f.dom !== "*") {
    const prefix = ko ? "매월 " : "Monthly on ";
    return prefix + parts.join(" ");
  }

  return parts.join(" ");
}

/* ── Presets ── */

interface Preset {
  labelKo: string;
  labelEn: string;
  cron: string;
}

const PRESETS: Preset[] = [
  { labelKo: "매분", labelEn: "Every min", cron: "* * * * *" },
  { labelKo: "매 5분", labelEn: "Every 5 min", cron: "*/5 * * * *" },
  { labelKo: "매 15분", labelEn: "Every 15 min", cron: "*/15 * * * *" },
  { labelKo: "매시간", labelEn: "Hourly", cron: "0 * * * *" },
  { labelKo: "매일 자정", labelEn: "Daily midnight", cron: "0 0 * * *" },
  { labelKo: "매주 월요일", labelEn: "Weekly Monday", cron: "0 0 * * 1" },
  { labelKo: "매월 1일", labelEn: "Monthly 1st", cron: "0 0 1 * *" },
];

/* ── Component ── */

export const CronBuilder = forwardRef<HTMLDivElement, CronBuilderProps>(
  (
    {
      value,
      defaultValue = "* * * * *",
      onChange,
      size = "md",
      showExpression = true,
      showPreview = true,
      locale = "ko",
      className,
      ...rest
    },
    ref
  ) => {
    const [internal, setInternal] = useState(defaultValue);
    const cron = value ?? internal;
    const fields = useMemo(() => parseCron(cron), [cron]);

    const updateCron = useCallback(
      (newCron: string) => {
        if (value === undefined) setInternal(newCron);
        onChange?.(newCron);
      },
      [value, onChange]
    );

    const updateField = useCallback(
      (field: keyof CronFields, val: string) => {
        const next = { ...parseCron(cron), [field]: val };
        updateCron(buildCron(next));
      },
      [cron, updateCron]
    );

    const ko = locale === "ko";

    /* ── Minute controls ── */
    const minuteMode = getFieldMode(fields.minute);
    const minuteInterval = getIntervalValue(fields.minute);
    const minuteSpecific = getSpecificValues(fields.minute);

    /* ── Hour controls ── */
    const hourMode = getFieldMode(fields.hour);
    const hourInterval = getIntervalValue(fields.hour);
    const hourSpecific = getSpecificValues(fields.hour);

    /* ── DOM controls ── */
    const domMode = getFieldMode(fields.dom);
    const domSpecific = getSpecificValues(fields.dom);

    /* ── Month controls ── */
    const monthMode = getFieldMode(fields.month);
    const monthSpecific = getSpecificValues(fields.month);

    /* ── DOW controls ── */
    const dowMode = getFieldMode(fields.dow);
    const dowSpecific = getSpecificValues(fields.dow);

    const dowLabels = ko ? KO_DOW : EN_DOW;
    const monthLabels = ko ? KO_MONTH : EN_MONTH;

    const rootClass = [styles.root, styles[size], className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={rootClass} {...rest}>
        {/* Presets */}
        <div className={styles.presets}>
          {PRESETS.map((p) => (
            <button
              key={p.cron}
              type="button"
              className={`${styles.presetBtn}${cron === p.cron ? ` ${styles.active}` : ""}`}
              onClick={() => updateCron(p.cron)}
            >
              {ko ? p.labelKo : p.labelEn}
            </button>
          ))}
        </div>

        {/* Fields */}
        <div className={styles.fields}>
          {/* Minute */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{ko ? "분" : "Minute"}</span>
            <div className={styles.fieldControl}>
              <select
                className={styles.select}
                value={minuteMode}
                onChange={(e) => {
                  const mode = e.target.value as FieldMode;
                  if (mode === "every") updateField("minute", "*");
                  else if (mode === "interval") updateField("minute", "*/5");
                  else updateField("minute", "0");
                }}
              >
                <option value="every">{ko ? "매분" : "Every"}</option>
                <option value="interval">{ko ? "매 N분" : "Every N min"}</option>
                <option value="specific">{ko ? "지정" : "Specific"}</option>
              </select>

              {minuteMode === "interval" && (
                <select
                  className={styles.select}
                  value={minuteInterval}
                  onChange={(e) => updateField("minute", `*/${e.target.value}`)}
                >
                  {[1, 2, 3, 5, 10, 15, 20, 30].map((n) => (
                    <option key={n} value={n}>
                      {n}{ko ? "분" : " min"}
                    </option>
                  ))}
                </select>
              )}

              {minuteMode === "specific" && (
                <select
                  className={styles.select}
                  multiple
                  value={minuteSpecific.map(String)}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (o) =>
                      parseInt(o.value, 10)
                    );
                    updateField("minute", specificToString(selected));
                  }}
                  style={{ minHeight: 60 }}
                >
                  {Array.from({ length: 60 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Hour */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{ko ? "시" : "Hour"}</span>
            <div className={styles.fieldControl}>
              <select
                className={styles.select}
                value={hourMode}
                onChange={(e) => {
                  const mode = e.target.value as FieldMode;
                  if (mode === "every") updateField("hour", "*");
                  else if (mode === "interval") updateField("hour", "*/2");
                  else updateField("hour", "0");
                }}
              >
                <option value="every">{ko ? "매시간" : "Every"}</option>
                <option value="interval">{ko ? "매 N시간" : "Every N hrs"}</option>
                <option value="specific">{ko ? "지정" : "Specific"}</option>
              </select>

              {hourMode === "interval" && (
                <select
                  className={styles.select}
                  value={hourInterval}
                  onChange={(e) => updateField("hour", `*/${e.target.value}`)}
                >
                  {[1, 2, 3, 4, 6, 8, 12].map((n) => (
                    <option key={n} value={n}>
                      {n}{ko ? "시간" : " hrs"}
                    </option>
                  ))}
                </select>
              )}

              {hourMode === "specific" && (
                <select
                  className={styles.select}
                  multiple
                  value={hourSpecific.map(String)}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, (o) =>
                      parseInt(o.value, 10)
                    );
                    updateField("hour", specificToString(selected));
                  }}
                  style={{ minHeight: 60 }}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i}>
                      {i}{ko ? "시" : ""}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Day of Month */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{ko ? "일" : "Day"}</span>
            <div className={styles.fieldControl}>
              <select
                className={styles.select}
                value={domMode === "every" ? "every" : "specific"}
                onChange={(e) => {
                  if (e.target.value === "every") updateField("dom", "*");
                  else updateField("dom", "1");
                }}
              >
                <option value="every">{ko ? "매일" : "Every day"}</option>
                <option value="specific">{ko ? "지정" : "Specific"}</option>
              </select>
            </div>
            {domMode === "specific" && (
              <div style={{ gridColumn: "1 / -1" }}>
                <div className={`${styles.checkboxGrid} ${styles.monthDays}`}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((d) => (
                    <label key={d} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={domSpecific.includes(d)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...domSpecific, d]
                            : domSpecific.filter((v) => v !== d);
                          updateField("dom", next.length === 0 ? "*" : specificToString(next));
                        }}
                      />
                      {d}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Month */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{ko ? "월" : "Month"}</span>
            <div className={styles.fieldControl}>
              <select
                className={styles.select}
                value={monthMode === "every" ? "every" : "specific"}
                onChange={(e) => {
                  if (e.target.value === "every") updateField("month", "*");
                  else updateField("month", "1");
                }}
              >
                <option value="every">{ko ? "매월" : "Every month"}</option>
                <option value="specific">{ko ? "지정" : "Specific"}</option>
              </select>
            </div>
            {monthMode === "specific" && (
              <div style={{ gridColumn: "1 / -1" }}>
                <div className={`${styles.checkboxGrid} ${styles.months}`}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <label key={m} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={monthSpecific.includes(m)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...monthSpecific, m]
                            : monthSpecific.filter((v) => v !== m);
                          updateField("month", next.length === 0 ? "*" : specificToString(next));
                        }}
                      />
                      {monthLabels[m]}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Day of Week */}
          <div className={styles.field}>
            <span className={styles.fieldLabel}>{ko ? "요일" : "Weekday"}</span>
            <div className={styles.fieldControl}>
              <select
                className={styles.select}
                value={dowMode === "every" ? "every" : "specific"}
                onChange={(e) => {
                  if (e.target.value === "every") updateField("dow", "*");
                  else updateField("dow", "1");
                }}
              >
                <option value="every">{ko ? "매주" : "Every day"}</option>
                <option value="specific">{ko ? "지정" : "Specific"}</option>
              </select>
            </div>
            {dowMode === "specific" && (
              <div style={{ gridColumn: "1 / -1" }}>
                <div className={`${styles.checkboxGrid} ${styles.days}`}>
                  {dowLabels.map((label, i) => (
                    <label key={i} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={dowSpecific.includes(i)}
                        onChange={(e) => {
                          const next = e.target.checked
                            ? [...dowSpecific, i]
                            : dowSpecific.filter((v) => v !== i);
                          updateField("dow", next.length === 0 ? "*" : specificToString(next));
                        }}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Expression */}
        {showExpression && <div className={styles.expression}>{cron}</div>}

        {/* Preview */}
        {showPreview && (
          <div className={styles.preview}>
            <Clock size={size === "sm" ? 14 : 16} />
            <span>{cronToHuman(cron, locale)}</span>
          </div>
        )}
      </div>
    );
  }
);

CronBuilder.displayName = "CronBuilder";
