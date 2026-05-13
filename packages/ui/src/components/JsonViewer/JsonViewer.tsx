import React, { forwardRef, useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import styles from "./JsonViewer.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface JsonViewerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 표시할 JSON 데이터 */
  data: unknown;
  /** 초기 펼침 깊이 (0 = 최상위만, Infinity = 전체 펼침) */
  defaultExpandDepth?: number;
  /** 들여쓰기 (px) */
  indent?: number;
  /** 최대 높이 */
  maxHeight?: number | string;
  /** 폰트 크기 */
  fontSize?: "xs" | "sm" | "md";
  /** 루트 이름 */
  rootName?: string | false;
  /** 배열/객체 아이템 수 표시 */
  showItemCount?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

type JsonType = "string" | "number" | "boolean" | "null" | "array" | "object" | "undefined";

function getType(val: unknown): JsonType {
  if (val === null) return "null";
  if (val === undefined) return "undefined";
  if (Array.isArray(val)) return "array";
  return typeof val as JsonType;
}

function renderPrimitive(val: unknown, type: JsonType): React.ReactNode {
  switch (type) {
    case "string":    return <span className={styles.string}>"{String(val)}"</span>;
    case "number":    return <span className={styles.number}>{String(val)}</span>;
    case "boolean":   return <span className={styles.boolean}>{String(val)}</span>;
    case "null":      return <span className={styles.null}>null</span>;
    case "undefined": return <span className={styles.null}>undefined</span>;
    default:          return null;
  }
}

// ─── JsonNode (recursive) ────────────────────────────────────────────────────

interface JsonNodeProps {
  name: string | number | false;
  value: unknown;
  depth: number;
  defaultExpandDepth: number;
  indent: number;
  showItemCount: boolean;
  isLast: boolean;
}

function JsonNode({
  name,
  value,
  depth,
  defaultExpandDepth,
  indent,
  showItemCount,
  isLast,
}: JsonNodeProps) {
  const type = getType(value);
  const isExpandable = type === "object" || type === "array";
  const [expanded, setExpanded] = useState(depth < defaultExpandDepth);

  if (!isExpandable) {
    return (
      <div className={styles.line} style={{ paddingLeft: depth * indent }}>
        {name !== false && (
          <span className={styles.key}>
            {typeof name === "number" ? name : `"${name}"`}
            <span className={styles.colon}>: </span>
          </span>
        )}
        {renderPrimitive(value, type)}
        {!isLast && <span className={styles.comma}>,</span>}
      </div>
    );
  }

  const isArray = type === "array";
  const entries = isArray
    ? (value as unknown[]).map((v, i) => [i, v] as [number, unknown])
    : Object.entries(value as Record<string, unknown>);
  const openBracket = isArray ? "[" : "{";
  const closeBracket = isArray ? "]" : "}";
  const count = entries.length;

  return (
    <div className={styles.node}>
      {/* Header line */}
      <div
        className={[styles.line, styles.expandable].join(" ")}
        style={{ paddingLeft: depth * indent }}
        onClick={() => setExpanded(e => !e)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setExpanded(x => !x); }}
        aria-expanded={expanded}
      >
        <span className={styles.toggle}>
          {expanded
            ? <ChevronDown size={12} className={styles.chevron} />
            : <ChevronRight size={12} className={styles.chevron} />}
        </span>
        {name !== false && (
          <span className={styles.key}>
            {typeof name === "number" ? name : `"${name}"`}
            <span className={styles.colon}>: </span>
          </span>
        )}
        <span className={styles.bracket}>{openBracket}</span>
        {!expanded && (
          <>
            {showItemCount && count > 0 && (
              <span className={styles.count}>{count} {isArray ? "items" : "keys"}</span>
            )}
            <span className={styles.bracket}>…{closeBracket}</span>
          </>
        )}
        {expanded && count === 0 && <span className={styles.bracket}>{closeBracket}</span>}
        {!isLast && !expanded && <span className={styles.comma}>,</span>}
      </div>

      {/* Children */}
      {expanded && count > 0 && (
        <>
          {entries.map(([k, v], i) => (
            <JsonNode
              key={String(k)}
              name={k}
              value={v}
              depth={depth + 1}
              defaultExpandDepth={defaultExpandDepth}
              indent={indent}
              showItemCount={showItemCount}
              isLast={i === entries.length - 1}
            />
          ))}
          <div className={styles.line} style={{ paddingLeft: depth * indent }}>
            <span className={styles.bracket}>{closeBracket}</span>
            {!isLast && <span className={styles.comma}>,</span>}
          </div>
        </>
      )}
    </div>
  );
}

// ─── JsonViewer ───────────────────────────────────────────────────────────────

export const JsonViewer = forwardRef<HTMLDivElement, JsonViewerProps>(
  (
    {
      data,
      defaultExpandDepth = 1,
      indent = 16,
      maxHeight = 400,
      fontSize = "sm",
      rootName = "root",
      showItemCount = true,
      className,
      style,
      ...props
    },
    ref,
  ) => {
    const maxHeightValue = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

    const classes = [styles.root, styles[`font-${fontSize}`], className].filter(Boolean).join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        style={{ "--json-max-height": maxHeightValue, ...style } as React.CSSProperties}
        {...props}
      >
        <div className={styles.scroll}>
          <JsonNode
            name={rootName}
            value={data}
            depth={0}
            defaultExpandDepth={defaultExpandDepth}
            indent={indent}
            showItemCount={showItemCount}
            isLast={true}
          />
        </div>
      </div>
    );
  },
);

JsonViewer.displayName = "JsonViewer";
