import React, { forwardRef, useState } from "react";
import { ChevronRight, ChevronLeft, ChevronsRight, ChevronsLeft, Search } from "lucide-react";
import styles from "./TransferList.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TransferListItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TransferListProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 왼쪽(출처) 목록 아이템 */
  sourceItems?: TransferListItem[];
  /** 오른쪽(대상) 목록 아이템 */
  targetItems?: TransferListItem[];
  /** 변경 핸들러 */
  onChange?: (source: TransferListItem[], target: TransferListItem[]) => void;
  /** 왼쪽 목록 제목 */
  sourceTitle?: string;
  /** 오른쪽 목록 제목 */
  targetTitle?: string;
  /** 검색 활성화 */
  searchable?: boolean;
  /** 높이 */
  listHeight?: number | string;
}

// ─── TransferList ─────────────────────────────────────────────────────────────

export const TransferList = forwardRef<HTMLDivElement, TransferListProps>(
  (
    {
      sourceItems: sourceItemsProp = [],
      targetItems: targetItemsProp = [],
      onChange,
      sourceTitle = "선택 가능",
      targetTitle = "선택됨",
      searchable = false,
      listHeight = 240,
      className,
      ...props
    },
    ref,
  ) => {
    const [sourceItems, setSourceItems] = useState(sourceItemsProp);
    const [targetItems, setTargetItems] = useState(targetItemsProp);
    const [sourceSelected, setSourceSelected] = useState<Set<string>>(new Set());
    const [targetSelected, setTargetSelected] = useState<Set<string>>(new Set());
    const [sourceSearch, setSourceSearch] = useState("");
    const [targetSearch, setTargetSearch] = useState("");

    const emit = (src: TransferListItem[], tgt: TransferListItem[]) => {
      onChange?.(src, tgt);
    };

    const toggleSource = (value: string) => {
      setSourceSelected((prev) => {
        const next = new Set(prev);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      });
    };

    const toggleTarget = (value: string) => {
      setTargetSelected((prev) => {
        const next = new Set(prev);
        next.has(value) ? next.delete(value) : next.add(value);
        return next;
      });
    };

    // Move selected from source → target
    const moveToTarget = () => {
      const moving = sourceItems.filter(
        (i) => sourceSelected.has(i.value) && !i.disabled,
      );
      const remaining = sourceItems.filter((i) => !sourceSelected.has(i.value));
      const newTarget = [...targetItems, ...moving];
      setSourceItems(remaining);
      setTargetItems(newTarget);
      setSourceSelected(new Set());
      emit(remaining, newTarget);
    };

    // Move selected from target → source
    const moveToSource = () => {
      const moving = targetItems.filter(
        (i) => targetSelected.has(i.value) && !i.disabled,
      );
      const remaining = targetItems.filter((i) => !targetSelected.has(i.value));
      const newSource = [...sourceItems, ...moving];
      setTargetItems(remaining);
      setSourceItems(newSource);
      setTargetSelected(new Set());
      emit(newSource, remaining);
    };

    // Move all source → target
    const moveAllToTarget = () => {
      const moveable = sourceItems.filter((i) => !i.disabled);
      const locked = sourceItems.filter((i) => i.disabled);
      const newTarget = [...targetItems, ...moveable];
      setSourceItems(locked);
      setTargetItems(newTarget);
      setSourceSelected(new Set());
      emit(locked, newTarget);
    };

    // Move all target → source
    const moveAllToSource = () => {
      const moveable = targetItems.filter((i) => !i.disabled);
      const locked = targetItems.filter((i) => i.disabled);
      const newSource = [...sourceItems, ...moveable];
      setTargetItems(locked);
      setSourceItems(newSource);
      setTargetSelected(new Set());
      emit(newSource, locked);
    };

    const filteredSource = sourceItems.filter((i) =>
      i.label.toLowerCase().includes(sourceSearch.toLowerCase()),
    );
    const filteredTarget = targetItems.filter((i) =>
      i.label.toLowerCase().includes(targetSearch.toLowerCase()),
    );

    const canMoveToTarget =
      sourceSelected.size > 0 &&
      [...sourceSelected].some(
        (v) => !sourceItems.find((i) => i.value === v)?.disabled,
      );
    const canMoveToSource =
      targetSelected.size > 0 &&
      [...targetSelected].some(
        (v) => !targetItems.find((i) => i.value === v)?.disabled,
      );

    const classes = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Source list */}
        <ListPanel
          title={sourceTitle}
          items={filteredSource}
          selected={sourceSelected}
          onToggle={toggleSource}
          search={searchable ? sourceSearch : undefined}
          onSearchChange={setSourceSearch}
          height={listHeight}
          count={sourceItems.length}
        />

        {/* Transfer buttons */}
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.ctrl}
            onClick={moveAllToTarget}
            disabled={sourceItems.filter((i) => !i.disabled).length === 0}
            title="모두 이동"
          >
            <ChevronsRight size={16} />
          </button>
          <button
            type="button"
            className={[styles.ctrl, styles.ctrlPrimary].join(" ")}
            onClick={moveToTarget}
            disabled={!canMoveToTarget}
            title="선택 이동"
          >
            <ChevronRight size={16} />
          </button>
          <button
            type="button"
            className={[styles.ctrl, styles.ctrlPrimary].join(" ")}
            onClick={moveToSource}
            disabled={!canMoveToSource}
            title="선택 되돌리기"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            type="button"
            className={styles.ctrl}
            onClick={moveAllToSource}
            disabled={targetItems.filter((i) => !i.disabled).length === 0}
            title="모두 되돌리기"
          >
            <ChevronsLeft size={16} />
          </button>
        </div>

        {/* Target list */}
        <ListPanel
          title={targetTitle}
          items={filteredTarget}
          selected={targetSelected}
          onToggle={toggleTarget}
          search={searchable ? targetSearch : undefined}
          onSearchChange={setTargetSearch}
          height={listHeight}
          count={targetItems.length}
        />
      </div>
    );
  },
);

TransferList.displayName = "TransferList";

// ─── ListPanel ────────────────────────────────────────────────────────────────

interface ListPanelProps {
  title: string;
  items: TransferListItem[];
  selected: Set<string>;
  onToggle: (value: string) => void;
  search?: string;
  onSearchChange: (v: string) => void;
  height: number | string;
  count: number;
}

function ListPanel({
  title,
  items,
  selected,
  onToggle,
  search,
  onSearchChange,
  height,
  count,
}: ListPanelProps) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{title}</span>
        <span className={styles.panelCount}>{count}</span>
      </div>
      {search !== undefined && (
        <div className={styles.searchWrap}>
          <Search size={13} className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="검색…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      )}
      <div className={styles.list} style={{ height }}>
        {items.length === 0 ? (
          <div className={styles.empty}>없음</div>
        ) : (
          items.map((item) => (
            <label
              key={item.value}
              className={[
                styles.item,
                selected.has(item.value) && styles.itemSelected,
                item.disabled && styles.itemDisabled,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={selected.has(item.value)}
                onChange={() => !item.disabled && onToggle(item.value)}
                disabled={item.disabled}
              />
              <span className={styles.itemLabel}>{item.label}</span>
            </label>
          ))
        )}
      </div>
    </div>
  );
}
