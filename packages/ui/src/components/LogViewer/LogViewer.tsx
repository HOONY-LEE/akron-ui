import React, { forwardRef, useEffect, useRef } from "react";
import styles from "./LogViewer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type LogLevel = "info" | "warn" | "error" | "debug" | "success" | "plain";

export interface LogEntry {
  id?: string | number;
  level?: LogLevel;
  timestamp?: Date | string;
  message: string;
  /** 추가 메타 데이터 (JSON 표시용) */
  meta?: unknown;
}

export interface LogViewerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 로그 항목 목록 */
  entries: LogEntry[];
  /** 최대 높이 (px 또는 CSS 값) */
  maxHeight?: number | string;
  /** 타임스탬프 표시 여부 */
  showTimestamp?: boolean;
  /** 레벨 뱃지 표시 여부 */
  showLevel?: boolean;
  /** 새 항목 추가 시 자동 스크롤 */
  autoScroll?: boolean;
  /** 타임스탬프 포맷 함수 */
  formatTimestamp?: (ts: Date) => string;
  /** 줄 번호 표시 */
  showLineNumbers?: boolean;
  /** 폰트 크기 */
  fontSize?: "xs" | "sm" | "md";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toDate(ts: Date | string): Date {
  return ts instanceof Date ? ts : new Date(ts);
}

function defaultFormatTimestamp(ts: Date): string {
  const h = String(ts.getHours()).padStart(2, "0");
  const m = String(ts.getMinutes()).padStart(2, "0");
  const s = String(ts.getSeconds()).padStart(2, "0");
  const ms = String(ts.getMilliseconds()).padStart(3, "0");
  return `${h}:${m}:${s}.${ms}`;
}

const LEVEL_LABELS: Record<LogLevel, string> = {
  info:    "INFO",
  warn:    "WARN",
  error:   "ERR ",
  debug:   "DBG ",
  success: "OK  ",
  plain:   "    ",
};

// ─── LogViewer ────────────────────────────────────────────────────────────────

export const LogViewer = forwardRef<HTMLDivElement, LogViewerProps>(
  (
    {
      entries,
      maxHeight = 320,
      showTimestamp = true,
      showLevel = true,
      autoScroll = true,
      formatTimestamp = defaultFormatTimestamp,
      showLineNumbers = false,
      fontSize = "sm",
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!autoScroll) return;
      bottomRef.current?.scrollIntoView({ block: "nearest" });
    }, [entries, autoScroll]);

    const maxHeightValue = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    const classes = [
      styles.root,
      styles[`font-${fontSize}`],
      className,
    ].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ "--log-max-height": maxHeightValue, ...style } as React.CSSProperties}
        {...props}
      >
        <div className={styles.scroll} ref={scrollRef}>
          {entries.length === 0 ? (
            <div className={styles.empty}>로그가 없습니다.</div>
          ) : (
            entries.map((entry, i) => {
              const level = entry.level ?? "plain";
              const ts = entry.timestamp ? toDate(typeof entry.timestamp === "string" ? entry.timestamp : entry.timestamp.toString()) : null;

              return (
                <div
                  key={entry.id ?? i}
                  className={[styles.line, styles[`level-${level}`]].join(" ")}
                >
                  {showLineNumbers && (
                    <span className={styles.lineNumber}>{i + 1}</span>
                  )}
                  {showTimestamp && ts && (
                    <span className={styles.timestamp}>{formatTimestamp(ts)}</span>
                  )}
                  {showLevel && level !== "plain" && (
                    <span className={[styles.badge, styles[`badge-${level}`]].join(" ")}>
                      {LEVEL_LABELS[level]}
                    </span>
                  )}
                  <span className={styles.message}>{entry.message}</span>
                  {entry.meta !== undefined && (
                    <span className={styles.meta}>
                      {" " + JSON.stringify(entry.meta)}
                    </span>
                  )}
                </div>
              );
            })
          )}
          <div ref={bottomRef} />
        </div>
      </div>
    );
  },
);

LogViewer.displayName = "LogViewer";
