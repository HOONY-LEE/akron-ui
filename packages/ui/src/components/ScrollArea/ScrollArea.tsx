import React, { forwardRef } from "react";
import styles from "./ScrollArea.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ScrollAreaOrientation = "vertical" | "horizontal" | "both";
export type ScrollAreaScrollbarSize = "sm" | "md" | "lg";

export interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 스크롤 방향 */
  orientation?: ScrollAreaOrientation;
  /** 최대 높이 */
  maxHeight?: string | number;
  /** 최대 너비 */
  maxWidth?: string | number;
  /** 높이 */
  height?: string | number;
  /** 너비 */
  width?: string | number;
  /** 스크롤바 크기 */
  scrollbarSize?: ScrollAreaScrollbarSize;
  /** 스크롤바 항상 표시 (false면 hover 시만) */
  alwaysVisible?: boolean;
  /** 내부 콘텐츠 */
  children: React.ReactNode;
}

// ─── ScrollArea ───────────────────────────────────────────────────────────────

export const ScrollArea = forwardRef<HTMLDivElement, ScrollAreaProps>(
  (
    {
      orientation = "vertical",
      maxHeight,
      maxWidth,
      height,
      width,
      scrollbarSize = "md",
      alwaysVisible = false,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const overflowX =
      orientation === "horizontal" || orientation === "both" ? "auto" : "hidden";
    const overflowY =
      orientation === "vertical" || orientation === "both" ? "auto" : "hidden";

    const inlineStyle: React.CSSProperties = {
      maxHeight,
      maxWidth,
      height,
      width,
      overflowX,
      overflowY,
      ...style,
    };

    const classes = [
      styles.scrollArea,
      styles[`scrollbar-${scrollbarSize}`],
      alwaysVisible && styles.alwaysVisible,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} style={inlineStyle} {...props}>
        {children}
      </div>
    );
  },
);

ScrollArea.displayName = "ScrollArea";
