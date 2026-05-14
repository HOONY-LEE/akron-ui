import React, { forwardRef, useCallback } from "react";
import { Check } from "lucide-react";
import styles from "./GridList.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface GridListItem {
  /** 고유 ID */
  id: string;
  /** 라벨 */
  label: string;
  /** 설명 */
  description?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 비활성화 */
  disabled?: boolean;
}

export interface GridListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 항목 목록 */
  items: GridListItem[];
  /** 선택된 ID 목록 */
  value?: string[];
  /** 열 수 */
  columns?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 다중 선택 허용 */
  multiple?: boolean;
  /** 변경 핸들러 */
  onChange?: (selected: string[]) => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const GridList = forwardRef<HTMLDivElement, GridListProps>(
  (
    {
      items,
      value = [],
      columns = 3,
      size = "md",
      multiple = false,
      onChange,
      className,
      ...rest
    },
    ref
  ) => {
    const handleSelect = useCallback(
      (id: string) => {
        if (multiple) {
          const next = value.includes(id)
            ? value.filter((v) => v !== id)
            : [...value, id];
          onChange?.(next);
        } else {
          onChange?.(value.includes(id) ? [] : [id]);
        }
      },
      [value, multiple, onChange]
    );

    return (
      <div
        ref={ref}
        className={`${styles.grid} ${styles[size]} ${className ?? ""}`}
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        role="listbox"
        aria-multiselectable={multiple}
        {...rest}
      >
        {items.map((item) => {
          const isSelected = value.includes(item.id);
          return (
            <div
              key={item.id}
              role="option"
              aria-selected={isSelected}
              aria-disabled={item.disabled}
              tabIndex={item.disabled ? -1 : 0}
              className={`${styles.item} ${isSelected ? styles.selected : ""} ${item.disabled ? styles.disabled : ""}`}
              onClick={() => !item.disabled && handleSelect(item.id)}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && !item.disabled) {
                  e.preventDefault();
                  handleSelect(item.id);
                }
              }}
            >
              {isSelected && (
                <span className={styles.check}><Check size={12} /></span>
              )}
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.label}>{item.label}</span>
              {item.description && (
                <span className={styles.description}>{item.description}</span>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

GridList.displayName = "GridList";
