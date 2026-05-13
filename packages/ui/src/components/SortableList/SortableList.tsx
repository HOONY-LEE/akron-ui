import React, { forwardRef, useState, useRef, useCallback } from "react";
import { GripVertical } from "lucide-react";
import styles from "./SortableList.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SortableItem {
  /** 고유 식별자 */
  id: string | number;
  /** 표시 텍스트 */
  label: string;
  /** 부가 설명 */
  description?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
}

export type SortableListSize = "sm" | "md" | "lg";
export type SortableListVariant = "default" | "card" | "minimal";

export interface SortableListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 항목 목록 */
  items: SortableItem[];
  /** 순서 변경 콜백 — 새 배열 반환 */
  onChange?: (items: SortableItem[]) => void;
  /** 크기 */
  size?: SortableListSize;
  /** 변형 */
  variant?: SortableListVariant;
  /** 드래그 핸들 표시 여부 */
  showHandle?: boolean;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 커스텀 렌더 함수 */
  renderItem?: (
    item: SortableItem,
    index: number,
    dragHandleProps: Record<string, unknown>
  ) => React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const SortableList = forwardRef<HTMLDivElement, SortableListProps>(
  (
    {
      items,
      onChange,
      size = "md",
      variant = "default",
      showHandle = true,
      disabled = false,
      renderItem,
      className,
      ...rest
    },
    ref
  ) => {
    const [dragIndex, setDragIndex] = useState<number | null>(null);
    const [overIndex, setOverIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // ── Drag handlers ──
    const handleDragStart = useCallback(
      (e: React.DragEvent, index: number) => {
        if (disabled || items[index]?.disabled) {
          e.preventDefault();
          return;
        }
        setDragIndex(index);
        e.dataTransfer.effectAllowed = "move";
        // Transparent drag image (we show our own visual feedback)
        const el = e.currentTarget as HTMLElement;
        e.dataTransfer.setDragImage(el, 0, 0);
      },
      [disabled, items]
    );

    const handleDragOver = useCallback(
      (e: React.DragEvent, index: number) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
        setOverIndex(index);
      },
      []
    );

    const handleDragEnd = useCallback(() => {
      if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
        const next = [...items];
        const [moved] = next.splice(dragIndex, 1);
        next.splice(overIndex, 0, moved);
        onChange?.(next);
      }
      setDragIndex(null);
      setOverIndex(null);
    }, [dragIndex, overIndex, items, onChange]);

    const handleDragLeave = useCallback(() => {
      setOverIndex(null);
    }, []);

    // ── Keyboard reorder ──
    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, index: number) => {
        if (disabled || items[index]?.disabled) return;

        let newIndex: number | null = null;

        if (e.key === "ArrowUp" && index > 0) {
          e.preventDefault();
          newIndex = index - 1;
        } else if (e.key === "ArrowDown" && index < items.length - 1) {
          e.preventDefault();
          newIndex = index + 1;
        }

        if (newIndex !== null) {
          const next = [...items];
          const [moved] = next.splice(index, 1);
          next.splice(newIndex, 0, moved);
          onChange?.(next);

          // Focus the moved item after re-render
          requestAnimationFrame(() => {
            const container = containerRef.current;
            if (!container) return;
            const el = container.querySelectorAll<HTMLElement>(
              "[data-sortable-item]"
            )[newIndex!];
            el?.focus();
          });
        }
      },
      [disabled, items, onChange]
    );

    const rootCls = [
      styles.root,
      styles[size],
      styles[variant],
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const dragHandleProps = (index: number) => ({
      draggable: !disabled && !items[index]?.disabled,
      onDragStart: (e: React.DragEvent) => handleDragStart(e, index),
      onDragOver: (e: React.DragEvent) => handleDragOver(e, index),
      onDragEnd: handleDragEnd,
      onDragLeave: handleDragLeave,
    });

    return (
      <div
        ref={(node) => {
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={rootCls}
        role="listbox"
        aria-label="sortable list"
        {...rest}
      >
        {items.map((item, index) => {
          const isDragging = dragIndex === index;
          const isOver =
            overIndex === index && dragIndex !== null && dragIndex !== index;
          const isItemDisabled = disabled || !!item.disabled;

          const itemCls = [
            styles.item,
            isDragging && styles.dragging,
            isOver && styles.over,
            isItemDisabled && styles.itemDisabled,
          ]
            .filter(Boolean)
            .join(" ");

          if (renderItem) {
            return (
              <div
                key={item.id}
                className={itemCls}
                data-sortable-item
                role="option"
                aria-selected={false}
                tabIndex={isItemDisabled ? -1 : 0}
                onKeyDown={(e) => handleKeyDown(e, index)}
                {...dragHandleProps(index)}
              >
                {renderItem(item, index, dragHandleProps(index))}
              </div>
            );
          }

          return (
            <div
              key={item.id}
              className={itemCls}
              data-sortable-item
              role="option"
              aria-selected={false}
              tabIndex={isItemDisabled ? -1 : 0}
              draggable={!isItemDisabled}
              onDragStart={(e) => handleDragStart(e, index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              onDragLeave={handleDragLeave}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              {showHandle && (
                <span className={styles.handle} aria-hidden="true">
                  <GripVertical />
                </span>
              )}
              <div className={styles.content}>
                <span className={styles.label}>{item.label}</span>
                {item.description && (
                  <span className={styles.description}>{item.description}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

SortableList.displayName = "SortableList";
