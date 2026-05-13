import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
  useId,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Search, Hash, ArrowRight, ChevronRight } from "lucide-react";
import styles from "./CommandPalette.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommandItem {
  /** 고유 식별자 */
  id: string;
  /** 표시 레이블 */
  label: string;
  /** 부가 설명 */
  description?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 단축키 표시 (e.g. ["⌘", "K"]) */
  shortcut?: string[];
  /** 그룹명 */
  group?: string;
  /** 실행 핸들러 */
  onSelect?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 키워드 (검색에만 사용, 표시 안 됨) */
  keywords?: string[];
}

export interface CommandGroup {
  label: string;
  items: CommandItem[];
}

export interface CommandPaletteProps {
  /** 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 커맨드 항목 목록 */
  items: CommandItem[];
  /** placeholder */
  placeholder?: string;
  /** 검색 결과 없을 때 메시지 */
  emptyMessage?: string;
  /** 외부 검색 핸들러 (서버사이드) */
  onSearch?: (query: string) => void;
  /** 로딩 상태 */
  loading?: boolean;
  /** 최근 사용 항목 ID 목록 */
  recentIds?: string[];
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CommandPalette = forwardRef<HTMLDivElement, CommandPaletteProps>(
  (
    {
      open,
      onOpenChange,
      items,
      placeholder = "명령어 검색...",
      emptyMessage = "결과 없음",
      onSearch,
      loading = false,
      recentIds = [],
    },
    ref,
  ) => {
    const inputId = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const [query, setQuery] = useState("");
    const [highlightedId, setHighlightedId] = useState<string | null>(null);

    // Filter items
    const filteredItems =
      query.trim() === ""
        ? items
        : items.filter((item) => {
            const q = query.toLowerCase();
            return (
              item.label.toLowerCase().includes(q) ||
              item.description?.toLowerCase().includes(q) ||
              item.keywords?.some((k) => k.toLowerCase().includes(q))
            );
          });

    // Build grouped list
    const grouped = filteredItems.reduce<{ label: string | null; items: CommandItem[] }[]>(
      (acc, item) => {
        // When query is empty, show recents first
        const groupLabel =
          query.trim() === "" && recentIds.includes(item.id)
            ? "최근 사용"
            : (item.group ?? null);

        const existing = acc.find((g) => g.label === groupLabel);
        if (existing) {
          existing.items.push(item);
        } else {
          acc.push({ label: groupLabel, items: [item] });
        }
        return acc;
      },
      [],
    );

    // "최근 사용" group first
    const sortedGrouped = [
      ...grouped.filter((g) => g.label === "최근 사용"),
      ...grouped.filter((g) => g.label !== "최근 사용"),
    ];

    const flatItems = sortedGrouped.flatMap((g) => g.items);

    // Initialize highlight to first item
    useEffect(() => {
      if (flatItems.length > 0) {
        setHighlightedId(flatItems[0].id);
      } else {
        setHighlightedId(null);
      }
    }, [query, open]);

    // Reset on close
    useEffect(() => {
      if (!open) {
        setQuery("");
        setHighlightedId(null);
      } else {
        // Focus input when opened
        requestAnimationFrame(() => {
          inputRef.current?.focus();
        });
      }
    }, [open]);

    const handleSelect = useCallback(
      (item: CommandItem) => {
        if (item.disabled) return;
        item.onSelect?.();
        onOpenChange(false);
      },
      [onOpenChange],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        const enabledItems = flatItems.filter((i) => !i.disabled);
        const currentIdx = enabledItems.findIndex((i) => i.id === highlightedId);

        switch (e.key) {
          case "ArrowDown": {
            e.preventDefault();
            const nextIdx = (currentIdx + 1) % enabledItems.length;
            setHighlightedId(enabledItems[nextIdx]?.id ?? null);
            break;
          }
          case "ArrowUp": {
            e.preventDefault();
            const prevIdx =
              currentIdx <= 0 ? enabledItems.length - 1 : currentIdx - 1;
            setHighlightedId(enabledItems[prevIdx]?.id ?? null);
            break;
          }
          case "Enter": {
            e.preventDefault();
            const item = enabledItems.find((i) => i.id === highlightedId);
            if (item) handleSelect(item);
            break;
          }
          case "Escape": {
            onOpenChange(false);
            break;
          }
        }
      },
      [flatItems, highlightedId, handleSelect, onOpenChange],
    );

    // Scroll highlighted item into view
    useEffect(() => {
      if (!listRef.current || !highlightedId) return;
      const el = listRef.current.querySelector<HTMLElement>(
        `[data-item-id="${highlightedId}"]`,
      );
      el?.scrollIntoView({ block: "nearest" });
    }, [highlightedId]);

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content
            ref={ref}
            className={styles.content}
            aria-label="명령어 팔레트"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className={styles.searchRow}>
              <Search size={16} className={styles.searchIcon} />
              <input
                ref={inputRef}
                id={inputId}
                type="text"
                className={styles.searchInput}
                placeholder={placeholder}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  onSearch?.(e.target.value);
                }}
                autoComplete="off"
                spellCheck={false}
              />
              <kbd className={styles.escKey}>ESC</kbd>
            </div>

            <div className={styles.divider} />

            {/* Items */}
            <div ref={listRef} className={styles.listWrapper} role="listbox">
              {loading ? (
                <div className={styles.empty}>검색 중...</div>
              ) : flatItems.length === 0 ? (
                <div className={styles.empty}>{emptyMessage}</div>
              ) : (
                sortedGrouped.map((group) => (
                  <div key={group.label ?? "__no-group__"} className={styles.group}>
                    {group.label && (
                      <div className={styles.groupLabel}>
                        <Hash size={11} />
                        {group.label}
                      </div>
                    )}
                    {group.items.map((item) => {
                      const isHighlighted = item.id === highlightedId;
                      return (
                        <div
                          key={item.id}
                          data-item-id={item.id}
                          role="option"
                          aria-selected={isHighlighted}
                          aria-disabled={item.disabled}
                          className={[
                            styles.item,
                            isHighlighted ? styles.highlighted : "",
                            item.disabled ? styles.itemDisabled : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => handleSelect(item)}
                          onMouseEnter={() => setHighlightedId(item.id)}
                        >
                          {item.icon && (
                            <span className={styles.itemIcon}>{item.icon}</span>
                          )}
                          <span className={styles.itemContent}>
                            <span className={styles.itemLabel}>{item.label}</span>
                            {item.description && (
                              <span className={styles.itemDesc}>
                                {item.description}
                              </span>
                            )}
                          </span>
                          <span className={styles.itemRight}>
                            {item.shortcut && (
                              <span className={styles.shortcut}>
                                {item.shortcut.map((k, i) => (
                                  <kbd key={i} className={styles.kbdKey}>{k}</kbd>
                                ))}
                              </span>
                            )}
                            {isHighlighted && !item.shortcut && (
                              <ChevronRight size={14} className={styles.enterHint} />
                            )}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className={styles.footer}>
              <span className={styles.hint}>
                <kbd className={styles.kbdKey}>↑</kbd>
                <kbd className={styles.kbdKey}>↓</kbd>
                탐색
              </span>
              <span className={styles.hint}>
                <kbd className={styles.kbdKey}>↵</kbd>
                실행
              </span>
              <span className={styles.hint}>
                <kbd className={styles.kbdKey}>ESC</kbd>
                닫기
              </span>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

CommandPalette.displayName = "CommandPalette";
