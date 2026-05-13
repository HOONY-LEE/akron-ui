import React, { forwardRef, useState } from "react";
import { Copy, Check, Terminal, ChevronDown, ChevronUp } from "lucide-react";
import styles from "./CodeSnippet.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CodeSnippetVariant = "filled" | "outline" | "minimal";

export interface CodeSnippetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "onCopy"> {
  /** 코드 내용 */
  code: string;
  /** 언어 레이블 */
  language?: string;
  /** 파일명 */
  filename?: string;
  /** 복사 버튼 표시 */
  showCopy?: boolean;
  /** 줄 번호 표시 */
  showLineNumbers?: boolean;
  /** 최대 표시 줄 수 (초과 시 펼치기) */
  maxLines?: number;
  /** 변형 */
  variant?: CodeSnippetVariant;
  /** 복사 완료 콜백 */
  onCopy?: (code: string) => void;
}

// ─── CodeSnippet ──────────────────────────────────────────────────────────────

export const CodeSnippet = forwardRef<HTMLDivElement, CodeSnippetProps>(
  (
    {
      code,
      language,
      filename,
      showCopy = true,
      showLineNumbers = false,
      maxLines,
      variant = "filled",
      onCopy,
      className,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = useState(false);
    const [expanded, setExpanded] = useState(false);

    const lines = code.split("\n");
    const isTruncated = maxLines !== undefined && lines.length > maxLines;
    const displayLines =
      isTruncated && !expanded ? lines.slice(0, maxLines) : lines;
    const displayCode = displayLines.join("\n");

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        onCopy?.(code);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // clipboard not available
      }
    };

    const classes = [styles.root, styles[`variant-${variant}`], className]
      .filter(Boolean)
      .join(" ");

    const header = filename || language;

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Header bar */}
        {header && (
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <Terminal size={13} className={styles.headerIcon} />
              <span className={styles.headerText}>{filename ?? language}</span>
            </div>
            {showCopy && (
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label="코드 복사"
              >
                {copied ? <Check size={13} /> : <Copy size={13} />}
                <span>{copied ? "복사됨" : "복사"}</span>
              </button>
            )}
          </div>
        )}

        {/* Code area */}
        <div className={styles.codeWrap}>
          {showLineNumbers && (
            <div className={styles.lineNumbers} aria-hidden="true">
              {displayLines.map((_, i) => (
                <span key={i} className={styles.lineNum}>
                  {i + 1}
                </span>
              ))}
            </div>
          )}
          <pre className={styles.pre}>
            <code className={styles.code}>{displayCode}</code>
          </pre>
          {!header && showCopy && (
            <button
              type="button"
              className={styles.floatingCopyBtn}
              onClick={handleCopy}
              aria-label="코드 복사"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          )}
        </div>

        {/* Expand/collapse */}
        {isTruncated && (
          <button
            type="button"
            className={styles.expandBtn}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? (
              <>
                <ChevronUp size={13} />
                접기
              </>
            ) : (
              <>
                <ChevronDown size={13} />
                {lines.length - maxLines!}줄 더 보기
              </>
            )}
          </button>
        )}
      </div>
    );
  },
);

CodeSnippet.displayName = "CodeSnippet";
