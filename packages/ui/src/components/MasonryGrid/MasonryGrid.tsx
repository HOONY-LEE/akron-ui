import React, { forwardRef } from "react";
import styles from "./MasonryGrid.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface MasonryGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 열 수 또는 반응형 열 수 */
  columns?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  /** 열 간격 (px 또는 CSS 값) */
  gap?: number | string;
  /** 행 간격 (없으면 gap과 동일) */
  rowGap?: number | string;
  /** 자식 요소 */
  children: React.ReactNode;
}

// ─── MasonryGrid ──────────────────────────────────────────────────────────────

export const MasonryGrid = forwardRef<HTMLDivElement, MasonryGridProps>(
  (
    {
      columns = 3,
      gap = 16,
      rowGap,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const gapVal = typeof gap === "number" ? `${gap}px` : gap;
    const rowGapVal = rowGap
      ? typeof rowGap === "number"
        ? `${rowGap}px`
        : rowGap
      : gapVal;

    const getColCount = (cols: typeof columns, breakpoint: string): number | undefined => {
      if (typeof cols === "number") return cols;
      return cols[breakpoint as keyof typeof cols];
    };

    const colCount = typeof columns === "number" ? columns : (columns.lg ?? columns.md ?? columns.sm ?? 3);
    const smCols = typeof columns === "object" ? columns.sm : undefined;
    const mdCols = typeof columns === "object" ? columns.md : undefined;
    const lgCols = typeof columns === "object" ? columns.lg : undefined;
    const xlCols = typeof columns === "object" ? columns.xl : undefined;

    const inlineStyle: React.CSSProperties = {
      "--masonry-cols": colCount,
      "--masonry-gap": gapVal,
      "--masonry-row-gap": rowGapVal,
      "--masonry-cols-sm": smCols ?? colCount,
      "--masonry-cols-md": mdCols ?? colCount,
      "--masonry-cols-lg": lgCols ?? colCount,
      "--masonry-cols-xl": xlCols ?? colCount,
      ...style,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={[
          styles.grid,
          typeof columns === "object" && styles.responsive,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        style={inlineStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);

MasonryGrid.displayName = "MasonryGrid";
