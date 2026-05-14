import React, { forwardRef, useMemo } from "react";
import styles from "./TagCloud.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TagCloudItem {
  /** 태그 텍스트 */
  label: string;
  /** 가중치 (빈도) */
  weight: number;
  /** 클릭 시 전달될 데이터 */
  data?: unknown;
  /** 색상 */
  color?: string;
}

export interface TagCloudProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onClick"> {
  /** 태그 목록 */
  tags: TagCloudItem[];
  /** 최소 폰트 크기 (px) */
  minFontSize?: number;
  /** 최대 폰트 크기 (px) */
  maxFontSize?: number;
  /** 태그 클릭 핸들러 */
  onClick?: (tag: TagCloudItem) => void;
  /** 태그 간 간격 */
  gap?: number;
  /** 정렬 기준 */
  sortBy?: "alphabetical" | "weight" | "random" | "none";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const TagCloud = forwardRef<HTMLDivElement, TagCloudProps>(
  (
    {
      tags,
      minFontSize = 12,
      maxFontSize = 36,
      onClick,
      gap = 8,
      sortBy = "none",
      className,
      ...rest
    },
    ref
  ) => {
    const sortedTags = useMemo(() => {
      const arr = [...tags];
      switch (sortBy) {
        case "alphabetical":
          return arr.sort((a, b) => a.label.localeCompare(b.label));
        case "weight":
          return arr.sort((a, b) => b.weight - a.weight);
        case "random":
          return arr.sort(() => Math.random() - 0.5);
        default:
          return arr;
      }
    }, [tags, sortBy]);

    const minWeight = useMemo(() => Math.min(...tags.map((t) => t.weight)), [tags]);
    const maxWeight = useMemo(() => Math.max(...tags.map((t) => t.weight)), [tags]);

    const getFontSize = (weight: number): number => {
      if (maxWeight === minWeight) return (minFontSize + maxFontSize) / 2;
      const ratio = (weight - minWeight) / (maxWeight - minWeight);
      return minFontSize + ratio * (maxFontSize - minFontSize);
    };

    const getOpacity = (weight: number): number => {
      if (maxWeight === minWeight) return 1;
      const ratio = (weight - minWeight) / (maxWeight - minWeight);
      return 0.5 + ratio * 0.5;
    };

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${className ?? ""}`}
        style={{ gap: `${gap}px` }}
        {...rest}
      >
        {sortedTags.map((tag, i) => {
          const fontSize = getFontSize(tag.weight);
          const opacity = getOpacity(tag.weight);

          return (
            <button
              key={`${tag.label}-${i}`}
              type="button"
              className={styles.tag}
              style={{
                fontSize: `${fontSize}px`,
                opacity,
                color: tag.color || undefined,
              }}
              onClick={() => onClick?.(tag)}
              title={`${tag.label}: ${tag.weight}`}
            >
              {tag.label}
            </button>
          );
        })}
      </div>
    );
  }
);

TagCloud.displayName = "TagCloud";
