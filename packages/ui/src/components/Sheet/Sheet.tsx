import { forwardRef, useState, useCallback, useRef } from "react";
import styles from "./Sheet.module.css";

export interface SheetColumn<T = Record<string, unknown>> {
  /** 컬럼 키 */
  key: string;
  /** 헤더 레이블 */
  label: string;
  /** 컬럼 너비 */
  width?: number;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 정렬 가능 */
  sortable?: boolean;
  /** 값 렌더러 */
  render?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** 타입 */
  type?: "text" | "number";
}

export interface SheetProps<T extends Record<string, unknown> = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 컬럼 정의 */
  columns: SheetColumn<T>[];
  /** 데이터 */
  data: T[];
  /** 데이터 변경 핸들러 */
  onChange?: (data: T[]) => void;
  /** 행 높이 */
  rowHeight?: number;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 최대 높이 */
  maxHeight?: string | number;
  className?: string;
}

type CellPos = { row: number; col: number } | null;

function SheetInner<T extends Record<string, unknown>>(
  {
    columns,
    data,
    onChange,
    rowHeight = 36,
    readOnly = false,
    maxHeight = 480,
    className,
    ...rest
  }: SheetProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  const [selectedCell, setSelectedCell] = useState<CellPos>(null);
  const [editingCell, setEditingCell] = useState<CellPos>(null);
  const [editValue, setEditValue] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const inputRef = useRef<HTMLInputElement>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortKey) return 0;
    const av = a[sortKey];
    const bv = b[sortKey];
    const cmp = String(av ?? "").localeCompare(String(bv ?? ""), undefined, { numeric: true });
    return sortDir === "asc" ? cmp : -cmp;
  });

  const handleCellClick = (row: number, col: number) => {
    setSelectedCell({ row, col });
    if (editingCell) commitEdit();
  };

  const handleCellDoubleClick = (row: number, col: number) => {
    if (readOnly || columns[col].readOnly) return;
    const colKey = columns[col].key;
    const val = String(sortedData[row]?.[colKey] ?? "");
    setEditingCell({ row, col });
    setEditValue(val);
    setTimeout(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    }, 0);
  };

  const commitEdit = useCallback(() => {
    if (!editingCell || !onChange) return;
    const { row, col } = editingCell;
    const colKey = columns[col].key;
    const newData = sortedData.map((r, i) =>
      i === row ? { ...r, [colKey]: editValue } : r,
    ) as T[];
    onChange(newData);
    setEditingCell(null);
  }, [editingCell, editValue, columns, sortedData, onChange]);

  const handleSort = (col: SheetColumn<T>) => {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  };

  const maxH = typeof maxHeight === "number" ? `${maxHeight}px` : maxHeight;

  return (
    <div
      ref={ref}
      className={[styles.sheet, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      <div className={styles.tableWrapper} style={{ maxHeight: maxH }}>
        <table className={styles.table}>
          {/* Header */}
          <thead className={styles.thead}>
            <tr>
              <th className={[styles.th, styles.rowNumTh].join(" ")}>#</th>
              {columns.map((col, colIdx) => (
                <th
                  key={col.key}
                  className={[
                    styles.th,
                    col.sortable ? styles.sortable : "",
                    sortKey === col.key ? styles.sorted : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ width: col.width }}
                  onClick={() => handleSort(col)}
                  aria-sort={
                    sortKey === col.key
                      ? sortDir === "asc"
                        ? "ascending"
                        : "descending"
                      : undefined
                  }
                >
                  {col.label}
                  {col.sortable && (
                    <span className={styles.sortIcon} aria-hidden="true">
                      {sortKey === col.key ? (sortDir === "asc" ? " ↑" : " ↓") : " ↕"}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {sortedData.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className={
                  selectedCell?.row === rowIdx ? styles.selectedRow : undefined
                }
              >
                <td className={[styles.td, styles.rowNum].join(" ")} style={{ height: rowHeight }}>
                  {rowIdx + 1}
                </td>
                {columns.map((col, colIdx) => {
                  const isEditing =
                    editingCell?.row === rowIdx && editingCell?.col === colIdx;
                  const isSelected =
                    selectedCell?.row === rowIdx && selectedCell?.col === colIdx;
                  const val = row[col.key];

                  return (
                    <td
                      key={col.key}
                      className={[
                        styles.td,
                        isSelected ? styles.selectedCell : "",
                        col.readOnly || readOnly ? styles.readOnly : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={{ height: rowHeight }}
                      onClick={() => handleCellClick(rowIdx, colIdx)}
                      onDoubleClick={() => handleCellDoubleClick(rowIdx, colIdx)}
                    >
                      {isEditing ? (
                        <input
                          ref={inputRef}
                          className={styles.cellInput}
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={commitEdit}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") commitEdit();
                            if (e.key === "Escape") setEditingCell(null);
                          }}
                          type={col.type === "number" ? "number" : "text"}
                        />
                      ) : col.render ? (
                        col.render(val, row, rowIdx)
                      ) : (
                        <span className={styles.cellValue}>{String(val ?? "")}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
            {sortedData.length === 0 && (
              <tr>
                <td
                  className={styles.emptyCell}
                  colSpan={columns.length + 1}
                >
                  데이터가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export const Sheet = forwardRef(SheetInner) as <T extends Record<string, unknown> = Record<string, unknown>>(
  props: SheetProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(Sheet as React.FC).displayName = "Sheet";
