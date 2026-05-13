import React, { forwardRef } from "react";
import styles from "./StickyNote.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StickyNoteColor =
  | "yellow"
  | "pink"
  | "blue"
  | "green"
  | "purple"
  | "orange";

export type StickyNoteSize = "sm" | "md" | "lg";

export interface StickyNoteProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 색상 */
  color?: StickyNoteColor;
  /** 크기 */
  size?: StickyNoteSize;
  /** 제목 */
  title?: string;
  /** 접힌 모서리 효과 */
  foldedCorner?: boolean;
  /** 살짝 기울임 */
  rotate?: number;
  /** 그림자 */
  shadow?: boolean;
  children: React.ReactNode;
}

// ─── StickyNote ───────────────────────────────────────────────────────────────

export const StickyNote = forwardRef<HTMLDivElement, StickyNoteProps>(
  (
    {
      color = "yellow",
      size = "md",
      title,
      foldedCorner = true,
      rotate = 0,
      shadow = true,
      className,
      style,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.root,
      styles[`color-${color}`],
      styles[`size-${size}`],
      foldedCorner && styles.folded,
      shadow && styles.shadow,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inlineStyle: React.CSSProperties = {
      ...style,
      transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
    };

    return (
      <div ref={ref} className={classes} style={inlineStyle} {...props}>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
        {foldedCorner && <div className={styles.corner} aria-hidden="true" />}
      </div>
    );
  },
);

StickyNote.displayName = "StickyNote";
