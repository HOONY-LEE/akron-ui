import React, { forwardRef, useMemo } from "react";
import styles from "./SearchHighlight.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SearchHighlightColor = "yellow" | "blue" | "green" | "red" | "purple";

export interface SearchHighlightProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  /** 전체 텍스트 */
  text: string;
  /** 검색어 (하이라이트할 텍스트) */
  query: string;
  /** 하이라이트 색상 */
  color?: SearchHighlightColor;
  /** 대소문자 구분 여부 */
  caseSensitive?: boolean;
  /** 하이라이트 비활성화 */
  disabled?: boolean;
  /** 렌더링 태그 */
  as?: "span" | "p" | "div";
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface TextPart {
  text: string;
  highlighted: boolean;
}

function splitByQuery(
  text: string,
  query: string,
  caseSensitive: boolean
): TextPart[] {
  if (!query) return [{ text, highlighted: false }];

  const flags = caseSensitive ? "g" : "gi";
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, flags);
  const parts = text.split(regex);

  return parts
    .filter((p) => p !== "")
    .map((part) => ({
      text: part,
      highlighted: caseSensitive
        ? part === query
        : part.toLowerCase() === query.toLowerCase(),
    }));
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SearchHighlight = forwardRef<HTMLSpanElement, SearchHighlightProps>(
  (
    {
      text,
      query,
      color = "yellow",
      caseSensitive = false,
      disabled = false,
      as: Tag = "span",
      className,
      ...rest
    },
    ref
  ) => {
    const parts = useMemo(
      () => (disabled ? [{ text, highlighted: false }] : splitByQuery(text, query, caseSensitive)),
      [text, query, caseSensitive, disabled]
    );

    const rootCls = [styles.root, className].filter(Boolean).join(" ");

    return (
      <Tag ref={ref as any} className={rootCls} {...rest}>
        {parts.map((part, i) =>
          part.highlighted ? (
            <mark key={i} className={[styles.mark, styles[color]].join(" ")}>
              {part.text}
            </mark>
          ) : (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          )
        )}
      </Tag>
    );
  }
);

SearchHighlight.displayName = "SearchHighlight";
