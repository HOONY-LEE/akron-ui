import React, { forwardRef } from "react";
import styles from "./DescriptionList.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DescriptionListSize = "sm" | "md" | "lg";
export type DescriptionListLayout = "vertical" | "horizontal" | "grid";

export interface DescriptionItem {
  /** 키 / 라벨 */
  term: string;
  /** 값 */
  detail: React.ReactNode;
  /** 부가 아이콘 */
  icon?: React.ReactNode;
}

export interface DescriptionListProps
  extends React.HTMLAttributes<HTMLDListElement> {
  /** 항목 목록 */
  items: DescriptionItem[];
  /** 레이아웃 */
  layout?: DescriptionListLayout;
  /** 크기 */
  size?: DescriptionListSize;
  /** 구분선 표시 */
  divider?: boolean;
  /** 그리드 컬럼 수 (layout="grid"일 때) */
  columns?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DescriptionList = forwardRef<HTMLDListElement, DescriptionListProps>(
  (
    {
      items,
      layout = "vertical",
      size = "md",
      divider = false,
      columns = 2,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const rootCls = [
      styles.root,
      styles[layout],
      styles[size],
      divider && styles.divider,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <dl
        ref={ref}
        className={rootCls}
        style={{
          ...style,
          ...(layout === "grid"
            ? ({ "--dl-columns": columns } as React.CSSProperties)
            : {}),
        }}
        {...rest}
      >
        {items.map((item, i) => (
          <div key={i} className={styles.item}>
            <dt className={styles.term}>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              {item.term}
            </dt>
            <dd className={styles.detail}>{item.detail}</dd>
          </div>
        ))}
      </dl>
    );
  }
);

DescriptionList.displayName = "DescriptionList";
