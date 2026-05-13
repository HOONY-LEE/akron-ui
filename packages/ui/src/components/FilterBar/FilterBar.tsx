import React, { forwardRef, useState, useCallback } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import styles from "./FilterBar.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterField {
  /** 필드 키 */
  key: string;
  /** 표시 라벨 */
  label: string;
  /** 필드 타입 */
  type: "text" | "select" | "date";
  /** select 옵션 */
  options?: FilterOption[];
  /** 플레이스홀더 */
  placeholder?: string;
}

export interface FilterValues {
  [key: string]: string;
}

export interface FilterBarProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 필터 필드 목록 */
  fields: FilterField[];
  /** 현재 필터 값 */
  values?: FilterValues;
  /** 필터 변경 콜백 */
  onChange?: (values: FilterValues) => void;
  /** 검색 클릭 콜백 */
  onSearch?: (values: FilterValues) => void;
  /** 초기화 콜백 */
  onReset?: () => void;
  /** 검색 입력 표시 여부 */
  showSearch?: boolean;
  /** 검색 플레이스홀더 */
  searchPlaceholder?: string;
  /** 검색어 키 */
  searchKey?: string;
  /** 컴팩트 모드 */
  compact?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FilterBar = forwardRef<HTMLDivElement, FilterBarProps>(
  (
    {
      fields,
      values: valuesProp,
      onChange,
      onSearch,
      onReset,
      showSearch = true,
      searchPlaceholder = "검색...",
      searchKey = "_search",
      compact = false,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valuesProp !== undefined;
    const [internalValues, setInternalValues] = useState<FilterValues>({});
    const currentValues = isControlled ? valuesProp : internalValues;

    const updateValue = useCallback(
      (key: string, value: string) => {
        const next = { ...currentValues, [key]: value };
        if (!value) delete next[key];
        if (!isControlled) setInternalValues(next);
        onChange?.(next);
      },
      [currentValues, isControlled, onChange]
    );

    const handleReset = useCallback(() => {
      if (!isControlled) setInternalValues({});
      onChange?.({});
      onReset?.();
    }, [isControlled, onChange, onReset]);

    const handleSearch = useCallback(() => {
      onSearch?.(currentValues);
    }, [currentValues, onSearch]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
      },
      [handleSearch]
    );

    const hasActiveFilters = Object.keys(currentValues).length > 0;

    const rootCls = [
      styles.root,
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        {/* Search input */}
        {showSearch && (
          <div className={styles.searchWrapper}>
            <Search size={16} className={styles.searchIcon} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder={searchPlaceholder}
              value={currentValues[searchKey] || ""}
              onChange={(e) => updateValue(searchKey, e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        )}

        {/* Filter fields */}
        <div className={styles.filters}>
          <SlidersHorizontal size={16} className={styles.filterIcon} />
          {fields.map((field) => {
            if (field.type === "select") {
              return (
                <select
                  key={field.key}
                  className={styles.filterSelect}
                  value={currentValues[field.key] || ""}
                  onChange={(e) => updateValue(field.key, e.target.value)}
                  aria-label={field.label}
                >
                  <option value="">{field.label}</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              );
            }

            if (field.type === "date") {
              return (
                <input
                  key={field.key}
                  type="date"
                  className={styles.filterInput}
                  value={currentValues[field.key] || ""}
                  onChange={(e) => updateValue(field.key, e.target.value)}
                  aria-label={field.label}
                />
              );
            }

            return (
              <input
                key={field.key}
                type="text"
                className={styles.filterInput}
                placeholder={field.placeholder || field.label}
                value={currentValues[field.key] || ""}
                onChange={(e) => updateValue(field.key, e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label={field.label}
              />
            );
          })}
        </div>

        {/* Actions */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.searchButton}
            onClick={handleSearch}
          >
            검색
          </button>
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.resetButton}
              onClick={handleReset}
            >
              <X size={14} />
              초기화
            </button>
          )}
        </div>
      </div>
    );
  }
);

FilterBar.displayName = "FilterBar";
