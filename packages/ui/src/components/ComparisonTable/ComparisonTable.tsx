import React, { forwardRef } from "react";
import { Check, X, Minus } from "lucide-react";
import styles from "./ComparisonTable.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ComparisonColumn {
  /** 고유 ID */
  id: string;
  /** 열 제목 */
  title: string;
  /** 부제목 */
  subtitle?: string;
  /** 강조 표시 */
  highlighted?: boolean;
  /** 가격 문자열 */
  price?: string;
  /** 가격 기간 */
  pricePeriod?: string;
  /** CTA 버튼 텍스트 */
  ctaLabel?: string;
}

export type CellValue = boolean | string | number;

export interface ComparisonRow {
  /** 기능 이름 */
  feature: string;
  /** 기능 설명 */
  description?: string;
  /** 카테고리 (그룹핑) */
  category?: string;
  /** 각 열의 값 */
  values: Record<string, CellValue>;
}

export interface ComparisonTableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 비교 열 목록 */
  columns: ComparisonColumn[];
  /** 비교 행 목록 */
  rows: ComparisonRow[];
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 스트라이프 행 */
  striped?: boolean;
  /** CTA 클릭 핸들러 */
  onCtaClick?: (columnId: string) => void;
  /** 기능 열 제목 */
  featureColumnTitle?: string;
  /** 고정 기능 열 */
  stickyFeatureColumn?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ComparisonTable = forwardRef<HTMLDivElement, ComparisonTableProps>(
  (
    {
      columns,
      rows,
      size = "md",
      striped = false,
      onCtaClick,
      featureColumnTitle = "기능",
      stickyFeatureColumn = false,
      className,
      ...rest
    },
    ref
  ) => {
    // Group rows by category
    const categories = new Map<string, ComparisonRow[]>();
    const uncategorized: ComparisonRow[] = [];
    for (const row of rows) {
      if (row.category) {
        const list = categories.get(row.category) || [];
        list.push(row);
        categories.set(row.category, list);
      } else {
        uncategorized.push(row);
      }
    }

    function renderCell(value: CellValue) {
      if (typeof value === "boolean") {
        return value ? (
          <Check size={16} className={styles.checkIcon} />
        ) : (
          <X size={16} className={styles.xIcon} />
        );
      }
      if (value === null || value === undefined) {
        return <Minus size={16} className={styles.minusIcon} />;
      }
      return <span>{String(value)}</span>;
    }

    function renderRows(rowList: ComparisonRow[], startIdx: number) {
      return rowList.map((row, i) => (
        <tr
          key={row.feature}
          className={striped && (startIdx + i) % 2 === 1 ? styles.striped : ""}
        >
          <td className={`${styles.featureCell} ${stickyFeatureColumn ? styles.sticky : ""}`}>
            <div className={styles.featureName}>{row.feature}</div>
            {row.description && (
              <div className={styles.featureDesc}>{row.description}</div>
            )}
          </td>
          {columns.map((col) => (
            <td
              key={col.id}
              className={`${styles.valueCell} ${col.highlighted ? styles.highlighted : ""}`}
            >
              {renderCell(row.values[col.id])}
            </td>
          ))}
        </tr>
      ));
    }

    let rowIndex = 0;

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              {/* Header row */}
              <tr>
                <th className={`${styles.featureHeader} ${stickyFeatureColumn ? styles.sticky : ""}`}>
                  {featureColumnTitle}
                </th>
                {columns.map((col) => (
                  <th
                    key={col.id}
                    className={`${styles.columnHeader} ${col.highlighted ? styles.highlighted : ""}`}
                  >
                    <div className={styles.headerContent}>
                      <span className={styles.columnTitle}>{col.title}</span>
                      {col.subtitle && (
                        <span className={styles.columnSubtitle}>{col.subtitle}</span>
                      )}
                      {col.price && (
                        <div className={styles.priceBlock}>
                          <span className={styles.price}>{col.price}</span>
                          {col.pricePeriod && (
                            <span className={styles.pricePeriod}>{col.pricePeriod}</span>
                          )}
                        </div>
                      )}
                      {col.ctaLabel && (
                        <button
                          type="button"
                          className={`${styles.ctaBtn} ${col.highlighted ? styles.ctaPrimary : ""}`}
                          onClick={() => onCtaClick?.(col.id)}
                        >
                          {col.ctaLabel}
                        </button>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {uncategorized.length > 0 && (
                <>
                  {renderRows(uncategorized, rowIndex)}
                  {(() => { rowIndex += uncategorized.length; return null; })()}
                </>
              )}
              {Array.from(categories.entries()).map(([cat, catRows]) => {
                const startIdx = rowIndex;
                rowIndex += catRows.length;
                return (
                  <React.Fragment key={cat}>
                    <tr className={styles.categoryRow}>
                      <td colSpan={columns.length + 1} className={styles.categoryCell}>
                        {cat}
                      </td>
                    </tr>
                    {renderRows(catRows, startIdx)}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
);

ComparisonTable.displayName = "ComparisonTable";
