import React, { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import styles from "./ReadMore.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ReadMoreProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 내용 */
  children: React.ReactNode;
  /** 최대 줄 수 */
  maxLines?: number;
  /** 최대 높이 (px) */
  maxHeight?: number;
  /** 펼침 상태 (제어) */
  expanded?: boolean;
  /** 기본 펼침 상태 (비제어) */
  defaultExpanded?: boolean;
  /** 상태 변경 핸들러 */
  onExpandedChange?: (expanded: boolean) => void;
  /** 더보기 버튼 텍스트 */
  moreLabel?: string;
  /** 접기 버튼 텍스트 */
  lessLabel?: string;
  /** 그라데이션 오버레이 표시 */
  showGradient?: boolean;
  /** 애니메이션 활성화 */
  animated?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ReadMore = forwardRef<HTMLDivElement, ReadMoreProps>(
  (
    {
      children,
      maxLines,
      maxHeight = 120,
      expanded: expandedProp,
      defaultExpanded = false,
      onExpandedChange,
      moreLabel = "더보기",
      lessLabel = "접기",
      showGradient = true,
      animated = true,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = expandedProp !== undefined;
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const expanded = isControlled ? expandedProp : internalExpanded;

    const contentRef = useRef<HTMLDivElement>(null);
    const [needsClamp, setNeedsClamp] = useState(false);
    const [fullHeight, setFullHeight] = useState<number>(0);

    const checkClamp = useCallback(() => {
      if (!contentRef.current) return;
      const el = contentRef.current;
      const scrollH = el.scrollHeight;
      setFullHeight(scrollH);

      if (maxLines) {
        const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 20;
        setNeedsClamp(scrollH > lineHeight * maxLines + 2);
      } else {
        setNeedsClamp(scrollH > maxHeight);
      }
    }, [maxLines, maxHeight]);

    useEffect(() => {
      checkClamp();
      const observer = new ResizeObserver(checkClamp);
      if (contentRef.current) observer.observe(contentRef.current);
      return () => observer.disconnect();
    }, [checkClamp, children]);

    const toggleExpanded = () => {
      const next = !expanded;
      if (!isControlled) setInternalExpanded(next);
      onExpandedChange?.(next);
    };

    const clampStyle: React.CSSProperties = {};
    if (!expanded && needsClamp) {
      if (maxLines) {
        clampStyle.display = "-webkit-box";
        clampStyle.WebkitLineClamp = maxLines;
        clampStyle.WebkitBoxOrient = "vertical" as const;
        clampStyle.overflow = "hidden";
      } else {
        clampStyle.maxHeight = `${maxHeight}px`;
        clampStyle.overflow = "hidden";
      }
    }
    if (expanded && animated) {
      clampStyle.maxHeight = `${fullHeight}px`;
    }

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.contentWrapper}>
          <div
            ref={contentRef}
            className={`${styles.content} ${animated ? styles.animated : ""}`}
            style={clampStyle}
          >
            {children}
          </div>
          {!expanded && needsClamp && showGradient && !maxLines && (
            <div className={styles.gradient} />
          )}
        </div>

        {needsClamp && (
          <button
            type="button"
            className={styles.toggleBtn}
            onClick={toggleExpanded}
          >
            <span>{expanded ? lessLabel : moreLabel}</span>
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        )}
      </div>
    );
  }
);

ReadMore.displayName = "ReadMore";
