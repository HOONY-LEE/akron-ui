import { forwardRef, useMemo } from "react";
import styles from "./HeatMap.module.css";

export type HeatMapColor = "green" | "blue" | "purple" | "orange";

export interface HeatMapValue {
  /** Date string in YYYY-MM-DD format */
  date: string;
  /** Numeric value for this date */
  value: number;
}

export interface HeatMapProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "data" | "color"> {
  /** Array of date-value pairs */
  data: HeatMapValue[];
  /** Start date of the heatmap range (defaults to 1 year ago) */
  startDate?: Date;
  /** End date of the heatmap range (defaults to today) */
  endDate?: Date;
  /** Color palette */
  color?: HeatMapColor;
  /** Size of each cell in px */
  cellSize?: number;
  /** Gap between cells in px */
  cellGap?: number;
  /** Show month labels at the top */
  showMonthLabels?: boolean;
  /** Show day-of-week labels on the left */
  showDayLabels?: boolean;
  /** Color for cells with no data */
  emptyColor?: string;
  /** Custom tooltip formatter */
  tooltipFormatter?: (date: string, value: number) => string;
  /** Click handler for cells */
  onCellClick?: (date: string, value: number) => void;
}

/* ------------------------------------------------------------------ */
/* Color maps — each palette has 4 intensity levels.                  */
/* Uses CSS variables from tokens.css where available, with fallbacks */
/* for palettes that don't have all shades defined in tokens.         */
/* ------------------------------------------------------------------ */

const COLOR_MAP: Record<HeatMapColor, [string, string, string, string]> = {
  green: [
    "var(--ark-heatmap-green-1, #dcfce7)",
    "var(--ark-heatmap-green-2, #86efac)",
    "var(--ark-heatmap-green-3, var(--ark-color-success-500))",
    "var(--ark-heatmap-green-4, #15803d)",
  ],
  blue: [
    "var(--ark-heatmap-blue-1, var(--ark-color-primary-100))",
    "var(--ark-heatmap-blue-2, var(--ark-color-primary-300))",
    "var(--ark-heatmap-blue-3, var(--ark-color-primary-500))",
    "var(--ark-heatmap-blue-4, var(--ark-color-primary-700))",
  ],
  purple: [
    "var(--ark-heatmap-purple-1, #f3e8ff)",
    "var(--ark-heatmap-purple-2, #c084fc)",
    "var(--ark-heatmap-purple-3, #9333ea)",
    "var(--ark-heatmap-purple-4, #6b21a8)",
  ],
  orange: [
    "var(--ark-heatmap-orange-1, #fef3c7)",
    "var(--ark-heatmap-orange-2, #fcd34d)",
    "var(--ark-heatmap-orange-3, var(--ark-color-warning-500))",
    "var(--ark-heatmap-orange-4, #b45309)",
  ],
};

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const DAY_LABELS: [number, string][] = [
  [1, "Mon"],
  [3, "Wed"],
  [5, "Fri"],
];

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/** Return a new Date set to the Sunday at or before `d`. */
function startOfWeek(d: Date): Date {
  const clone = new Date(d);
  clone.setDate(clone.getDate() - clone.getDay());
  return clone;
}

/** Get the number of weeks between two dates (Sunday-aligned). */
function weeksBetween(start: Date, end: Date): number {
  const s = startOfWeek(start);
  const e = startOfWeek(end);
  return Math.floor((e.getTime() - s.getTime()) / (7 * 86400000)) + 1;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export const HeatMap = forwardRef<HTMLDivElement, HeatMapProps>(
  function HeatMap(
    {
      data,
      startDate,
      endDate,
      color = "green",
      cellSize = 12,
      cellGap = 2,
      showMonthLabels = true,
      showDayLabels = true,
      emptyColor = "var(--ark-color-bg-muted)",
      tooltipFormatter,
      onCellClick,
      className,
      style,
      ...rest
    },
    ref,
  ) {
    const end = useMemo(() => endDate ?? new Date(), [endDate]);
    const start = useMemo(() => {
      if (startDate) return startDate;
      const d = new Date(end);
      d.setFullYear(d.getFullYear() - 1);
      d.setDate(d.getDate() + 1); // exclusive start
      return d;
    }, [startDate, end]);

    /* Build lookup map */
    const valueMap = useMemo(() => {
      const map = new Map<string, number>();
      for (const entry of data) {
        map.set(entry.date, entry.value);
      }
      return map;
    }, [data]);

    /* Compute quartile thresholds */
    const thresholds = useMemo(() => {
      const vals = data.map((d) => d.value).filter((v) => v > 0);
      if (vals.length === 0) return [1, 2, 3, 4];
      vals.sort((a, b) => a - b);
      const q1 = vals[Math.floor(vals.length * 0.25)] ?? 1;
      const q2 = vals[Math.floor(vals.length * 0.5)] ?? q1;
      const q3 = vals[Math.floor(vals.length * 0.75)] ?? q2;
      return [q1, q2, q3];
    }, [data]);

    const colors = COLOR_MAP[color];

    function getColor(value: number): string {
      if (value <= 0) return emptyColor;
      if (value < thresholds[0]) return colors[0];
      if (value < thresholds[1]) return colors[1];
      if (value < thresholds[2]) return colors[2];
      return colors[3];
    }

    /* Layout calculations */
    const weekStart = startOfWeek(start);
    const totalWeeks = weeksBetween(start, end);
    const step = cellSize + cellGap;

    const labelOffsetX = showDayLabels ? 28 : 0;
    const labelOffsetY = showMonthLabels ? 16 : 0;

    const svgWidth = labelOffsetX + totalWeeks * step;
    const svgHeight = labelOffsetY + 7 * step;

    /* Build cells */
    const cells: {
      key: string;
      x: number;
      y: number;
      date: string;
      value: number;
      fill: string;
    }[] = [];

    const cursor = new Date(weekStart);
    for (let week = 0; week < totalWeeks; week++) {
      for (let day = 0; day < 7; day++) {
        const dateStr = formatDate(cursor);
        if (cursor >= start && cursor <= end) {
          const value = valueMap.get(dateStr) ?? 0;
          cells.push({
            key: dateStr,
            x: labelOffsetX + week * step,
            y: labelOffsetY + day * step,
            date: dateStr,
            value,
            fill: getColor(value),
          });
        }
        cursor.setDate(cursor.getDate() + 1);
      }
    }

    /* Month labels */
    const monthLabels: { x: number; label: string }[] = [];
    if (showMonthLabels) {
      const seen = new Set<string>();
      const cur = new Date(weekStart);
      for (let week = 0; week < totalWeeks; week++) {
        // Check the first day of this week column
        const key = `${cur.getFullYear()}-${cur.getMonth()}`;
        if (!seen.has(key) && cur >= start) {
          seen.add(key);
          monthLabels.push({
            x: labelOffsetX + week * step,
            label: MONTH_LABELS[cur.getMonth()],
          });
        }
        cur.setDate(cur.getDate() + 7);
      }
    }

    const isClickable = !!onCellClick;

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        style={style}
        {...rest}
      >
        <svg
          className={styles.svg}
          width={svgWidth}
          height={svgHeight}
          role="img"
          aria-label="Heatmap calendar"
        >
          {/* Month labels */}
          {monthLabels.map((m) => (
            <text
              key={`month-${m.x}`}
              className={styles.monthLabel}
              x={m.x}
              y={labelOffsetY - 4}
              textAnchor="start"
            >
              {m.label}
            </text>
          ))}

          {/* Day labels */}
          {showDayLabels &&
            DAY_LABELS.map(([row, label]) => (
              <text
                key={`day-${row}`}
                className={styles.dayLabel}
                x={labelOffsetX - 6}
                y={labelOffsetY + row * step + cellSize * 0.8}
                textAnchor="end"
              >
                {label}
              </text>
            ))}

          {/* Cells */}
          {cells.map((cell) => (
            <rect
              key={cell.key}
              className={[
                styles.cell,
                isClickable ? styles.clickable : "",
              ]
                .filter(Boolean)
                .join(" ")}
              x={cell.x}
              y={cell.y}
              width={cellSize}
              height={cellSize}
              rx={2}
              ry={2}
              fill={cell.fill}
              tabIndex={isClickable ? 0 : undefined}
              onClick={
                onCellClick
                  ? () => onCellClick(cell.date, cell.value)
                  : undefined
              }
              onKeyDown={
                onCellClick
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onCellClick(cell.date, cell.value);
                      }
                    }
                  : undefined
              }
            >
              <title>
                {tooltipFormatter
                  ? tooltipFormatter(cell.date, cell.value)
                  : `${cell.date}: ${cell.value}`}
              </title>
            </rect>
          ))}
        </svg>
      </div>
    );
  },
);
