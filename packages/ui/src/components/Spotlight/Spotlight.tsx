import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { Search, X, ArrowRight, Hash, File, Settings, Star } from "lucide-react";
import styles from "./Spotlight.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SpotlightItemType = "page" | "action" | "file" | "setting" | "recent";

export interface SpotlightItem {
  id: string;
  label: string;
  description?: string;
  type?: SpotlightItemType;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 카테고리 그룹 이름 */
  group?: string;
  /** 단축키 힌트 */
  shortcut?: string[];
  keywords?: string[];
}

export interface SpotlightProps {
  /** 열림 상태 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 전체 아이템 목록 */
  items: SpotlightItem[];
  /** 아이템 선택 콜백 */
  onSelect?: (item: SpotlightItem) => void;
  /** 검색어 변경 콜백 */
  onSearch?: (query: string) => void;
  /** 검색 플레이스홀더 */
  placeholder?: string;
  /** 빈 결과 메시지 */
  emptyMessage?: string;
  /** 최대 결과 수 */
  maxResults?: number;
}

// ─── Icon by type ─────────────────────────────────────────────────────────────

function TypeIcon({ type }: { type?: SpotlightItemType }) {
  const size = 14;
  switch (type) {
    case "page":    return <Hash size={size} />;
    case "file":    return <File size={size} />;
    case "setting": return <Settings size={size} />;
    case "recent":  return <Star size={size} />;
    case "action":
    default:        return <ArrowRight size={size} />;
  }
}

// ─── Simple fuzzy search ──────────────────────────────────────────────────────

function matches(item: SpotlightItem, query: string): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  const haystack = [
    item.label,
    item.description,
    item.group,
    ...(item.keywords ?? []),
  ].filter(Boolean).join(" ").toLowerCase();
  return haystack.includes(q);
}

// ─── Spotlight ────────────────────────────────────────────────────────────────

export const Spotlight = forwardRef<HTMLDivElement, SpotlightProps>(
  (
    {
      open,
      onClose,
      items,
      onSelect,
      onSearch,
      placeholder = "검색 또는 명령어 입력...",
      emptyMessage = "결과가 없습니다",
      maxResults = 8,
    },
    ref,
  ) => {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    // Filter items
    const filtered = items.filter(it => matches(it, query)).slice(0, maxResults);

    // Group items
    const groups: { name: string; items: SpotlightItem[] }[] = [];
    const ungrouped: SpotlightItem[] = [];
    for (const item of filtered) {
      if (item.group) {
        const g = groups.find(g => g.name === item.group);
        if (g) g.items.push(item);
        else groups.push({ name: item.group, items: [item] });
      } else {
        ungrouped.push(item);
      }
    }

    // Flat ordered list for keyboard nav
    const flat = [
      ...ungrouped,
      ...groups.flatMap(g => g.items),
    ];

    const handleSelect = useCallback(
      (item: SpotlightItem) => {
        onSelect?.(item);
        onClose();
        setQuery("");
        setActiveIndex(0);
      },
      [onSelect, onClose],
    );

    // Focus input when opened
    useEffect(() => {
      if (open) {
        setQuery("");
        setActiveIndex(0);
        setTimeout(() => inputRef.current?.focus(), 10);
      }
    }, [open]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(i => Math.min(i + 1, flat.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(i => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && flat[activeIndex]) {
        handleSelect(flat[activeIndex]);
      }
    };

    // Scroll active item into view
    useEffect(() => {
      const item = listRef.current?.querySelector(`[data-active="true"]`) as HTMLElement | null;
      item?.scrollIntoView({ block: "nearest" });
    }, [activeIndex]);

    if (!open) return null;

    const renderItem = (item: SpotlightItem, globalIdx: number) => {
      const isActive = globalIdx === activeIndex;
      return (
        <div
          key={item.id}
          data-active={isActive}
          className={[styles.item, isActive ? styles.itemActive : ""].join(" ")}
          onClick={() => handleSelect(item)}
          onMouseEnter={() => setActiveIndex(globalIdx)}
          role="option"
          aria-selected={isActive}
        >
          <span className={styles.itemIcon}>
            {item.icon ?? <TypeIcon type={item.type} />}
          </span>
          <span className={styles.itemContent}>
            <span className={styles.itemLabel}>{item.label}</span>
            {item.description && (
              <span className={styles.itemDescription}>{item.description}</span>
            )}
          </span>
          {item.shortcut && item.shortcut.length > 0 && (
            <span className={styles.shortcut}>
              {item.shortcut.map((k, ki) => (
                <kbd key={ki} className={styles.kbd}>{k}</kbd>
              ))}
            </span>
          )}
        </div>
      );
    };

    let itemIdx = 0;

    return (
      <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal>
        <div
          ref={ref}
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={handleKeyDown}
        >
          {/* Search input */}
          <div className={styles.inputRow}>
            <Search size={16} className={styles.searchIcon} />
            <input
              ref={inputRef}
              className={styles.input}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActiveIndex(0);
                onSearch?.(e.target.value);
              }}
              placeholder={placeholder}
              autoComplete="off"
              spellCheck={false}
            />
            {query && (
              <button
                className={styles.clearBtn}
                onClick={() => { setQuery(""); setActiveIndex(0); inputRef.current?.focus(); }}
                tabIndex={-1}
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Results */}
          <div ref={listRef} className={styles.list} role="listbox">
            {flat.length === 0 ? (
              <div className={styles.empty}>{emptyMessage}</div>
            ) : (
              <>
                {ungrouped.map((item) => renderItem(item, itemIdx++))}
                {groups.map((group) => (
                  <div key={group.name} className={styles.group}>
                    <div className={styles.groupLabel}>{group.name}</div>
                    {group.items.map((item) => renderItem(item, itemIdx++))}
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer hint */}
          <div className={styles.footer}>
            <span><kbd className={styles.kbd}>↑↓</kbd> 이동</span>
            <span><kbd className={styles.kbd}>↵</kbd> 선택</span>
            <span><kbd className={styles.kbd}>Esc</kbd> 닫기</span>
          </div>
        </div>
      </div>
    );
  },
);

Spotlight.displayName = "Spotlight";
