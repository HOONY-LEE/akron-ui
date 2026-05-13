import React, { forwardRef } from "react";
import styles from "./DataCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type DataCardSize = "sm" | "md" | "lg";
export type DataCardVariant = "default" | "outlined" | "filled";

export interface DataCardField {
  /** 라벨 */
  label: string;
  /** 값 */
  value: React.ReactNode;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  /** 아이콘 */
  icon?: React.ReactNode;
}

export interface DataCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 카드 제목 */
  title?: string;
  /** 부제목 */
  subtitle?: string;
  /** 헤더 우측 액션 */
  headerAction?: React.ReactNode;
  /** 필드 목록 */
  fields: DataCardField[];
  /** 크기 */
  size?: DataCardSize;
  /** 변형 */
  variant?: DataCardVariant;
  /** 컬럼 개수 */
  columns?: number;
  /** footer */
  footer?: React.ReactNode;
  /** 구분선 표시 */
  divider?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const DataCard = forwardRef<HTMLDivElement, DataCardProps>(
  (
    {
      title,
      subtitle,
      headerAction,
      fields,
      size = "md",
      variant = "default",
      columns = 2,
      footer,
      divider = false,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const rootCls = [
      styles.root,
      styles[size],
      styles[variant],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={rootCls}
        style={{
          ...style,
          "--data-card-columns": columns,
        } as React.CSSProperties}
        {...rest}
      >
        {/* Header */}
        {(title || subtitle || headerAction) && (
          <div className={styles.header}>
            <div className={styles.headerText}>
              {title && <h3 className={styles.title}>{title}</h3>}
              {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
            </div>
            {headerAction && (
              <div className={styles.headerAction}>{headerAction}</div>
            )}
          </div>
        )}

        {/* Fields */}
        <div className={[styles.fields, divider && styles.fieldsDivider].filter(Boolean).join(" ")}>
          {fields.map((field, i) => (
            <div
              key={i}
              className={[styles.field, field.fullWidth && styles.fieldFull]
                .filter(Boolean)
                .join(" ")}
            >
              <dt className={styles.fieldLabel}>
                {field.icon && <span className={styles.fieldIcon}>{field.icon}</span>}
                {field.label}
              </dt>
              <dd className={styles.fieldValue}>{field.value}</dd>
            </div>
          ))}
        </div>

        {/* Footer */}
        {footer && <div className={styles.footer}>{footer}</div>}
      </div>
    );
  }
);

DataCard.displayName = "DataCard";
