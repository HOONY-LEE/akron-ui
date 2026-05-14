import { forwardRef, type ReactNode } from "react";
import styles from "./RichTextPreview.module.css";

export type RichTextPreviewSize = "sm" | "md" | "lg";

export interface RichTextPreviewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 마크다운 형식의 텍스트 */
  content: string;
  /** 글자 크기 */
  size?: RichTextPreviewSize;
  /** 최대 줄 수 (미지정 시 제한 없음) */
  maxLines?: number;
  /** 더 보기 버튼 라벨 */
  showMoreLabel?: string;
  /** 더 보기 클릭 핸들러 */
  onShowMore?: () => void;
  /** 링크 target 속성 */
  linkTarget?: "_blank" | "_self";
  /** 축약 모드 (줄간격/마진 축소) */
  compact?: boolean;
}

/* ────────────────────────────────────────────
 * Inline parser: bold, italic, code, links
 * ──────────────────────────────────────────── */

interface InlineToken {
  type: "text" | "bold" | "italic" | "code" | "link";
  content: string;
  href?: string;
  children?: InlineToken[];
}

function tokenizeInline(text: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  let i = 0;

  while (i < text.length) {
    // Inline code: `...`
    if (text[i] === "`") {
      const end = text.indexOf("`", i + 1);
      if (end !== -1) {
        tokens.push({ type: "code", content: text.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }

    // Link: [text](url)
    if (text[i] === "[") {
      const closeBracket = text.indexOf("]", i + 1);
      if (closeBracket !== -1 && text[closeBracket + 1] === "(") {
        const closeParen = text.indexOf(")", closeBracket + 2);
        if (closeParen !== -1) {
          const linkText = text.slice(i + 1, closeBracket);
          const href = text.slice(closeBracket + 2, closeParen);
          tokens.push({
            type: "link",
            content: linkText,
            href,
            children: tokenizeInline(linkText),
          });
          i = closeParen + 1;
          continue;
        }
      }
    }

    // Bold: **...**
    if (text[i] === "*" && text[i + 1] === "*") {
      const end = text.indexOf("**", i + 2);
      if (end !== -1) {
        tokens.push({
          type: "bold",
          content: text.slice(i + 2, end),
          children: tokenizeInline(text.slice(i + 2, end)),
        });
        i = end + 2;
        continue;
      }
    }

    // Italic: *...*
    if (text[i] === "*" && text[i + 1] !== "*") {
      const end = findSingleAsteriskEnd(text, i + 1);
      if (end !== -1) {
        tokens.push({
          type: "italic",
          content: text.slice(i + 1, end),
          children: tokenizeInline(text.slice(i + 1, end)),
        });
        i = end + 1;
        continue;
      }
    }

    // Plain text: accumulate until next special char
    let j = i + 1;
    while (j < text.length && !isSpecialChar(text, j)) {
      j++;
    }
    tokens.push({ type: "text", content: text.slice(i, j) });
    i = j;
  }

  return tokens;
}

function findSingleAsteriskEnd(text: string, start: number): number {
  for (let i = start; i < text.length; i++) {
    if (text[i] === "*" && text[i + 1] !== "*") {
      return i;
    }
  }
  return -1;
}

function isSpecialChar(text: string, i: number): boolean {
  const ch = text[i];
  if (ch === "`") return true;
  if (ch === "[") return true;
  if (ch === "*") return true;
  return false;
}

function renderInlineTokens(
  tokens: InlineToken[],
  linkTarget: "_blank" | "_self"
): ReactNode[] {
  return tokens.map((token, idx) => {
    switch (token.type) {
      case "text":
        return <span key={idx}>{token.content}</span>;
      case "code":
        return (
          <code key={idx} className={styles.code}>
            {token.content}
          </code>
        );
      case "bold":
        return (
          <strong key={idx} className={styles.strong}>
            {token.children
              ? renderInlineTokens(token.children, linkTarget)
              : token.content}
          </strong>
        );
      case "italic":
        return (
          <em key={idx}>
            {token.children
              ? renderInlineTokens(token.children, linkTarget)
              : token.content}
          </em>
        );
      case "link":
        return (
          <a
            key={idx}
            href={token.href}
            target={linkTarget}
            rel={linkTarget === "_blank" ? "noopener noreferrer" : undefined}
            className={styles.link}
          >
            {token.children
              ? renderInlineTokens(token.children, linkTarget)
              : token.content}
          </a>
        );
      default:
        return <span key={idx}>{token.content}</span>;
    }
  });
}

function renderInline(
  text: string,
  linkTarget: "_blank" | "_self"
): ReactNode[] {
  return renderInlineTokens(tokenizeInline(text), linkTarget);
}

/* ────────────────────────────────────────────
 * Block parser: headings, lists, blockquotes, hr, paragraphs
 * ──────────────────────────────────────────── */

interface BlockNode {
  type:
    | "heading"
    | "ul"
    | "ol"
    | "blockquote"
    | "hr"
    | "paragraph";
  level?: number; // heading level 1-3
  children: string[]; // raw text lines
}

function parseBlocks(content: string): BlockNode[] {
  const lines = content.split("\n");
  const blocks: BlockNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line — skip
    if (trimmed === "") {
      i++;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: "hr", children: [] });
      i++;
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        children: [headingMatch[2]],
      });
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*]\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^[-*]\s+/, ""));
        i++;
      }
      blocks.push({ type: "ul", children: items });
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ""));
        i++;
      }
      blocks.push({ type: "ol", children: items });
      continue;
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ""));
        i++;
      }
      blocks.push({ type: "blockquote", children: quoteLines });
      continue;
    }

    // Paragraph — collect consecutive non-special lines
    const paraLines: string[] = [trimmed];
    i++;
    while (i < lines.length) {
      const next = lines[i].trim();
      if (
        next === "" ||
        /^---+$/.test(next) ||
        /^#{1,3}\s+/.test(next) ||
        /^[-*]\s+/.test(next) ||
        /^\d+\.\s+/.test(next) ||
        next.startsWith(">")
      ) {
        break;
      }
      paraLines.push(next);
      i++;
    }
    blocks.push({ type: "paragraph", children: paraLines });
  }

  return blocks;
}

function renderBlocks(
  blocks: BlockNode[],
  linkTarget: "_blank" | "_self"
): ReactNode[] {
  return blocks.map((block, idx) => {
    switch (block.type) {
      case "hr":
        return <hr key={idx} className={styles.hr} />;

      case "heading": {
        const content = renderInline(block.children[0], linkTarget);
        if (block.level === 1)
          return (
            <h1 key={idx} className={styles.heading1}>
              {content}
            </h1>
          );
        if (block.level === 2)
          return (
            <h2 key={idx} className={styles.heading2}>
              {content}
            </h2>
          );
        return (
          <h3 key={idx} className={styles.heading3}>
            {content}
          </h3>
        );
      }

      case "ul":
        return (
          <ul key={idx} className={styles.list}>
            {block.children.map((item, li) => (
              <li key={li} className={styles.listItem}>
                {renderInline(item, linkTarget)}
              </li>
            ))}
          </ul>
        );

      case "ol":
        return (
          <ol key={idx} className={styles.list}>
            {block.children.map((item, li) => (
              <li key={li} className={styles.listItem}>
                {renderInline(item, linkTarget)}
              </li>
            ))}
          </ol>
        );

      case "blockquote":
        return (
          <blockquote key={idx} className={styles.blockquote}>
            {block.children.map((line, li) => (
              <span key={li}>
                {renderInline(line, linkTarget)}
                {li < block.children.length - 1 && <br />}
              </span>
            ))}
          </blockquote>
        );

      case "paragraph":
        return (
          <p key={idx} className={styles.paragraph}>
            {block.children.map((line, li) => (
              <span key={li}>
                {renderInline(line, linkTarget)}
                {li < block.children.length - 1 && <br />}
              </span>
            ))}
          </p>
        );

      default:
        return null;
    }
  });
}

/* ────────────────────────────────────────────
 * Component
 * ──────────────────────────────────────────── */

export const RichTextPreview = forwardRef<HTMLDivElement, RichTextPreviewProps>(
  (
    {
      content,
      size = "md",
      maxLines,
      showMoreLabel = "더 보기",
      onShowMore,
      linkTarget = "_blank",
      compact = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const blocks = parseBlocks(content);

    const rootClasses = [
      styles.root,
      styles[size],
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const clampStyle =
      maxLines != null
        ? { WebkitLineClamp: maxLines, ...style }
        : style;

    const contentClasses = maxLines != null ? styles.clamped : undefined;

    return (
      <div ref={ref} className={rootClasses} {...rest}>
        <div className={contentClasses} style={clampStyle}>
          {renderBlocks(blocks, linkTarget)}
        </div>
        {maxLines != null && onShowMore && (
          <button
            type="button"
            className={styles.showMore}
            onClick={onShowMore}
          >
            {showMoreLabel}
          </button>
        )}
      </div>
    );
  }
);

RichTextPreview.displayName = "RichTextPreview";
