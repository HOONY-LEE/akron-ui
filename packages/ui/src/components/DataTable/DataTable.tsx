import React, { forwardRef, useState, useMemo, useCallback } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./DataTable.module.css";

export type SortDirection = "asc" | "desc";

export interface DataTableColumn<T = Record<string, unknown>> {
  /** 컬럼 키 */
  key: string;
  /** 헤더 레이블 */
  header: string;
  /** 셀 렌더러 */
  cell?: (value: unknown, row: T, rowIndex: number) => React.ReactNode;
  /** 정렬 가능 */
  sortable?: boolean;
  /** 필터 가능 */
  filterable?: boolean;
  /** 컬럼 너비 */
  width?: string | number;
  /** 정렬 함수 */
  sortFn?: (a: T, b: T, direction: SortDirection) => number;
  /** 필터 함수 */
  filterFn?: (value: unknown, filterText: string) => boolean;
  /** 텍스트 정렬 */
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T = Record<string, unknown>>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 데이터 목록 */
  data: T[];
  /** 컬럼 정의 */
  columns: DataTableColumn<T>[];
  /** 전체 검색 활성화 */
  searchable?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 페이지 크기 */
  pageSize?: number;
  /** 페이지 크기 선택 옵션 */
  pageSizeOptions?: number[];
  /** 체크박스 선택 */
  selectable?: boolean;
  /** 선택된 행 인덱스 */
  selectedRows?: number[];
  /** 선택 변경 핸들러 */
  onSelectionChange?: (indices: number[]) => void;
  /** 행 클릭 핸들러 */
  onRowClick?: (row: T, index: number) => void;
  /** 빈 상태 메시지 */
  emptyMessage?: React.ReactNode;
  /** 로딩 상태 */
  loading?: boolean;
  /** 줄무늬 행 */
  striped?: boolean;
  /** 호버 효과 */
  hoverable?: boolean;
  /** 조밀한 행 */
  dense?: boolean;
  /** 최대 높이 */
  maxHeight?: string | number;
  className?: string;
}

function defaultFilterFn(value: unknown, filterText: string): boolean {
  if (value == null) return false;
  return String(value).toLowerCase().includes(filterText.toLowerCase());
}

function defaultSortFn<T>(key: string, a: T, b: T, direction: SortDirection): number {
  const aVal = (a as Record<string, unknown>)[key];
  const bVal = (b as Record<string, unknown>)[key];
  if (aVal == null && bVal == null) return 0;
  if (aVal == null) return direction === "asc" ? -1 : 1;
  if (bVal == null) return direction === "asc" ? 1 : -1;

  const aNum = Number(aVal);
  const bNum = Number(bVal);
  if (!isNaN(aNum) && !isNaN(bNum)) {
    return direction === "asc" ? aNum - bNum : bNum - aNum;
  }
  const aStr = String(aVal).toLowerCase();
  const bStr = String(bVal).toLowerCase();
  const cmp = aStr < bStr ? -1 : aStr > bStr ? 1 : 0;
  return direction === "asc" ? cmp : -cmp;
}

export const DataTable = forwardRef(
  <T extends Record<string, unknown>>(
    {
      data,
      columns,
      searchable = true,
      searchPlaceholder = "검색...",
      pageSize: initialPageSize = 10,
      pageSizeOptions = [10, 20, 50, 100],
      selectable = false,
      selectedRows,
      onSelectionChange,
      onRowClick,
      emptyMessage = "데이터가 없습니다",
      loading = false,
      striped = false,
      hoverable = true,
      dense = false,
      maxHeight,
      className,
      style,
      ...rest
    }: DataTableProps<T>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    const [searchText, setSearchText] = useState("");
    const [sortKey, setSortKey] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<SortDirection>("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(initialPageSize);
    const [internalSelected, setInternalSelected] = useState<number[]>([]);

    const selected = selectedRows ?? internalSelected;
    const setSelected = useCallback(
      (indices: number[]) => {
        setInternalSelected(indices);
        onSelectionChange?.(indices);
      },
      [onSelectionChange],
    );

    // Filter
    const filtered = useMemo(() => {
      if (!searchText) return data;
      return data.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          const fn = col.filterFn ?? defaultFilterFn;
          return (col.filterable !== false) && fn(value, searchText);
        }),
      );
    }, [data, searchText, columns]);

    // Sort
    const sorted = useMemo(() => {
      if (!sortKey) return filtered;
      const col = columns.find((c) => c.key === sortKey);
      return [...filtered].sort((a, b) => {
        if (col?.sortFn) return col.sortFn(a, b, sortDir);
        return defaultSortFn(sortKey, a, b, sortDir);
      });
    }, [filtered, sortKey, sortDir, columns]);

    // Reset to page 1 when filter/sort changes
    const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
    const safePage = Math.min(currentPage, totalPages);

    const paginated = useMemo(() => {
      const start = (safePage - 1) * pageSize;
      return sorted.slice(start, start + pageSize);
    }, [sorted, safePage, pageSize]);

    const handleSort = (key: string) => {
      if (sortKey === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      } else {
        setSortKey(key);
        setSortDir("asc");
      }
      setCurrentPage(1);
    };

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(e.target.value);
      setCurrentPage(1);
    };

    const handleSelectAll = () => {
      if (selected.length === paginated.length) {
        setSelected([]);
      } else {
        setSelected(paginated.map((_, i) => (safePage - 1) * pageSize + i));
      }
    };

    const handleSelectRow = (absIdx: number) => {
      if (selected.includes(absIdx)) {
        setSelected(selected.filter((i) => i !== absIdx));
      } else {
        setSelected([...selected, absIdx]);
      }
    };

    const wrapperCls = [styles.wrapper, className ?? ""].filter(Boolean).join(" ");
    const tableBodyCls = [
      styles.tableBody,
      striped ? styles.striped : "",
      hoverable ? styles.hoverable : "",
      dense ? styles.dense : "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperCls} style={style} {...rest}>
        {/* Toolbar */}
        {searchable && (
          <div className={styles.toolbar}>
            <div className={styles.searchWrap}>
              <Search size={14} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchText}
                onChange={handleSearch}
              />
            </div>
            {selectable && selected.length > 0 && (
              <span className={styles.selectionInfo}>{selected.length}개 선택됨</span>
            )}
          </div>
        )}

        {/* Table */}
        <div
          className={styles.tableWrap}
          style={maxHeight ? { maxHeight, overflow: "auto" } : undefined}
        >
          <table className={styles.table}>
            <thead className={styles.thead}>
              <tr>
                {selectable && (
                  <th className={[styles.th, styles.checkboxTh].join(" ")}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={paginated.length > 0 && selected.length === paginated.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                )}
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={[
                      styles.th,
                      col.sortable ? styles.sortable : "",
                      col.align ? styles[`align-${col.align}`] : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    style={{ width: col.width }}
                    onClick={col.sortable ? () => handleSort(col.key) : undefined}
                  >
                    <span className={styles.thContent}>
                      {col.header}
                      {col.sortable && (
                        <span className={styles.sortIcon}>
                          {sortKey === col.key ? (
                            sortDir === "asc" ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )
                          ) : (
                            <ChevronsUpDown size={14} className={styles.sortIconInactive} />
                          )}
                        </span>
                      )}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className={tableBodyCls}>
              {loading ? (
                <tr>
                  <td
                    className={styles.emptyCell}
                    colSpan={columns.length + (selectable ? 1 : 0)}
                  >
                    <div className={styles.loadingSpinner} />
                  </td>
                </tr>
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    className={styles.emptyCell}
                    colSpan={columns.length + (selectable ? 1 : 0)}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, rowIdx) => {
                  const absIdx = (safePage - 1) * pageSize + rowIdx;
                  const isSelected = selected.includes(absIdx);
                  return (
                    <tr
                      key={absIdx}
                      className={[
                        styles.tr,
                        isSelected ? styles.selectedRow : "",
                        onRowClick ? styles.clickable : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => onRowClick?.(row, absIdx)}
                    >
                      {selectable && (
                        <td className={[styles.td, styles.checkboxTd].join(" ")}>
                          <input
                            type="checkbox"
                            className={styles.checkbox}
                            checked={isSelected}
                            onChange={() => handleSelectRow(absIdx)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </td>
                      )}
                      {columns.map((col) => {
                        const value = row[col.key];
                        return (
                          <td
                            key={col.key}
                            className={[
                              styles.td,
                              col.align ? styles[`align-${col.align}`] : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {col.cell ? col.cell(value, row, absIdx) : (value as React.ReactNode)}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className={styles.pagination}>
          <div className={styles.paginationInfo}>
            <span className={styles.totalInfo}>
              총 {sorted.length}개
              {searchText && ` (전체 ${data.length}개 중)`}
            </span>
            <select
              className={styles.pageSizeSelect}
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {pageSizeOptions.map((s) => (
                <option key={s} value={s}>
                  {s}개씩
                </option>
              ))}
            </select>
          </div>
          <div className={styles.paginationNav}>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage(1)}
              disabled={safePage <= 1}
              aria-label="첫 페이지"
            >
              «
            </button>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              aria-label="이전 페이지"
            >
              <ChevronLeft size={14} />
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let page: number;
              if (totalPages <= 5) {
                page = i + 1;
              } else if (safePage <= 3) {
                page = i + 1;
              } else if (safePage >= totalPages - 2) {
                page = totalPages - 4 + i;
              } else {
                page = safePage - 2 + i;
              }
              return (
                <button
                  key={page}
                  className={[styles.pageBtn, page === safePage ? styles.activePageBtn : ""].join(" ")}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              aria-label="다음 페이지"
            >
              <ChevronRight size={14} />
            </button>
            <button
              className={styles.pageBtn}
              onClick={() => setCurrentPage(totalPages)}
              disabled={safePage >= totalPages}
              aria-label="마지막 페이지"
            >
              »
            </button>
          </div>
        </div>
      </div>
    );
  },
) as <T extends Record<string, unknown>>(
  props: DataTableProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(DataTable as { displayName?: string }).displayName = "DataTable";
