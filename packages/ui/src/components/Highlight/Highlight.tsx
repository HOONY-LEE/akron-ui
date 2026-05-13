import React, { forwardRef } from "react";
import styles from "./Highlight.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HighlightColor =
  | "yellow"
  | "primary"
  | "success"
  | "warning"
  | "error"
  | string;

export interface HighlightProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 하이라이트할 텍스트가 포함된 전체 문자열 */
  children: string;
  /** 강조할 쿼리 문자열 또는 배열 */
  highlight: string | string[];
  /** 강조 색상 */
  color?: HighlightColor;
  /** 대소문자 무시 여부 */
  ignoreCase?: boolean;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function splitWithHighlight(
  text: string,
  queries: string[],
  ignoreCase: boolean,
): Array<{ text: string; highlighted: boolean }> {
  const nonEmpty = queries.filter((q) => q.trim().length > 0);
  if (nonEmpty.length === 0) return [{ text, highlighted: false }];

  const pattern = nonEmpty.map(escapeRegex).join("|");
  const flags = ignoreCase ? "gi" : "g";
  const regex = new RegExp(`(${pattern})`, flags);

  const parts = text.split(regex);
  return parts.map((part) => ({
    text: part,
    highlighted: regex.test(part),
  }));
}

const COLOR_MAP: Record<string, string> = {
  yellow: "var(--ark-highlight-yellow, #fff3b0)",
  primary: "color-mix(in srgb, var(--ark-color-primary) 20%, transparent)",
  success: "color-mix(in srgb, var(--ark-color-success) 20%, transparent)",
  warning: "color-mix(in srgb, var(--ark-color-warning) 20%, transparent)",
  error: "color-mix(in srgb, var(--ark-color-error) 20%, transparent)",
};

// ─── Highlight ────────────────────────────────────────────────────────────────

export const Highlight = forwardRef<HTMLSpanElement, HighlightProps>(
  (
    {
      children,
      highlight,
      color = "yellow",
      ignoreCase = true,
      className,
      ...props
    },
    ref,
  ) => {
    const queries = Array.isArray(highlight) ? highlight : [highlight];
    const parts = splitWithHighlight(children, queries, ignoreCase);

    const bgColor = COLOR_MAP[color] ?? color;

    return (
      <span
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...props}
      >
        {parts.map((part, i) =>
          part.highlighted ? (
            <mark
              key={i}
              className={styles.mark}
              style={{ "--highlight-bg": bgColor } as React.CSSProperties}
            >
              {part.text}
            </mark>
          ) : (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          ),
        )}
      </span>
    );
  },
);

Highlight.displayName = "Highlight";
