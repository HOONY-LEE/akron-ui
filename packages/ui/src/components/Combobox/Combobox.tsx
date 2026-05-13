import React, { forwardRef, useState, useRef, useEffect, useId, useCallback } from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Check, X, Search } from "lucide-react";
import styles from "./Combobox.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ComboboxSize = "sm" | "md" | "lg";

export interface ComboboxOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxGroup {
  label: string;
  options: ComboboxOption[];
}

export interface ComboboxProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 옵션 목록 */
  options: ComboboxOption[];
  /** 선택된 값 (제어) */
  value?: string | null;
  /** 초기 값 (비제어) */
  defaultValue?: string;
  /** 선택 변경 핸들러 */
  onChange?: (value: string | null) => void;
  /** 입력 텍스트 변경 핸들러 */
  onInputChange?: (text: string) => void;
  /** placeholder */
  placeholder?: string;
  /** 검색 placeholder */
  searchPlaceholder?: string;
  /** 크기 */
  size?: ComboboxSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 라벨 */
  label?: string;
  /** 필수 표시 */
  required?: boolean;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 외부 검색(서버사이드) 모드: true이면 내부 필터링 안 함 */
  externalFilter?: boolean;
  /** 선택 초기화 가능 여부 */
  clearable?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 검색 결과 없을 때 메시지 */
  emptyMessage?: string;
  /** 커스텀 옵션 렌더러 */
  renderOption?: (option: ComboboxOption) => React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Combobox = forwardRef<HTMLDivElement, ComboboxProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue,
      onChange,
      onInputChange,
      placeholder = "선택하세요",
      searchPlaceholder = "검색...",
      size = "md",
      disabled = false,
      error = false,
      errorMessage,
      label,
      required,
      helperText,
      externalFilter = false,
      clearable = false,
      loading = false,
      emptyMessage = "결과 없음",
      renderOption,
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    // Controlled / uncontrolled
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string | null>(
      defaultValue ?? null,
    );
    const selectedValue = isControlled ? (valueProp ?? null) : internalValue;

    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

    // Selected option
    const selectedOption = options.find((o) => o.value === selectedValue) ?? null;

    // Filtered options
    const filteredOptions = externalFilter
      ? options
      : inputText.trim() === ""
        ? options
        : options.filter(
            (o) =>
              o.label.toLowerCase().includes(inputText.toLowerCase()) ||
              o.description?.toLowerCase().includes(inputText.toLowerCase()),
          );

    // Group options
    const groups = filteredOptions.reduce<{ label: string | null; options: ComboboxOption[] }[]>(
      (acc, opt) => {
        const groupLabel = opt.group ?? null;
        const existing = acc.find((g) => g.label === groupLabel);
        if (existing) {
          existing.options.push(opt);
        } else {
          acc.push({ label: groupLabel, options: [opt] });
        }
        return acc;
      },
      [],
    );

    // Flat list for keyboard nav
    const flatOptions = filteredOptions;

    // Sync inputText when closed / value changes
    useEffect(() => {
      if (!open) {
        setInputText("");
        setHighlightedIndex(-1);
      }
    }, [open]);

    useEffect(() => {
      if (open && inputRef.current) {
        inputRef.current.focus();
      }
    }, [open]);

    const handleSelect = useCallback(
      (opt: ComboboxOption) => {
        if (opt.disabled) return;
        const newValue = opt.value === selectedValue ? null : opt.value;
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
        setOpen(false);
      },
      [isControlled, onChange, selectedValue],
    );

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!isControlled) setInternalValue(null);
      onChange?.(null);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const text = e.target.value;
      setInputText(text);
      setHighlightedIndex(0);
      onInputChange?.(text);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
          e.preventDefault();
          setOpen(true);
        }
        return;
      }

      const enabledOptions = flatOptions.filter((o) => !o.disabled);
      const enabledIdx = enabledOptions.map((o) => flatOptions.indexOf(o));

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const nextEnabled = enabledIdx.find((i) => i > prev);
            return nextEnabled !== undefined ? nextEnabled : enabledIdx[0] ?? -1;
          });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          setHighlightedIndex((prev) => {
            const prevEnabled = [...enabledIdx].reverse().find((i) => i < prev);
            return prevEnabled !== undefined
              ? prevEnabled
              : enabledIdx[enabledIdx.length - 1] ?? -1;
          });
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (highlightedIndex >= 0 && flatOptions[highlightedIndex]) {
            handleSelect(flatOptions[highlightedIndex]);
          }
          break;
        }
        case "Escape": {
          setOpen(false);
          break;
        }
        case "Tab": {
          setOpen(false);
          break;
        }
      }
    };

    // Scroll highlighted option into view
    useEffect(() => {
      if (listRef.current && highlightedIndex >= 0) {
        const item = listRef.current.children[highlightedIndex] as HTMLElement;
        item?.scrollIntoView?.({ block: "nearest" });
      }
    }, [highlightedIndex]);

    const showClear = clearable && selectedValue && !disabled;

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {label && (
          <label className={styles.label} htmlFor={id}>
            {label}
            {required && <span className={styles.required}>*</span>}
          </label>
        )}

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              id={id}
              type="button"
              disabled={disabled}
              aria-haspopup="listbox"
              aria-expanded={open}
              onKeyDown={handleKeyDown}
              className={[
                styles.trigger,
                styles[size],
                error ? styles.errorState : "",
                disabled ? styles.disabled : "",
                open ? styles.open : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={[styles.triggerText, !selectedOption ? styles.placeholder : ""].filter(Boolean).join(" ")}>
                {selectedOption ? selectedOption.label : placeholder}
              </span>
              <span className={styles.triggerIcons}>
                {showClear && (
                  <span
                    className={styles.clearBtn}
                    role="button"
                    tabIndex={-1}
                    aria-label="초기화"
                    onClick={handleClear}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") handleClear(e as unknown as React.MouseEvent);
                    }}
                  >
                    <X size={14} />
                  </span>
                )}
                <ChevronDown
                  size={16}
                  className={[styles.chevron, open ? styles.chevronOpen : ""].filter(Boolean).join(" ")}
                />
              </span>
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={styles.content}
              align="start"
              sideOffset={4}
              style={{ width: "var(--radix-popover-trigger-width)" }}
              onKeyDown={handleKeyDown}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/* Search input */}
              <div className={styles.searchWrapper}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={inputText}
                  onChange={handleInputChange}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* Options list */}
              {loading ? (
                <div className={styles.empty}>로딩 중...</div>
              ) : filteredOptions.length === 0 ? (
                <div className={styles.empty}>{emptyMessage}</div>
              ) : (
                <ul ref={listRef} className={styles.list} role="listbox">
                  {groups.map((group) => (
                    <React.Fragment key={group.label ?? "__no-group__"}>
                      {group.label && (
                        <li className={styles.groupLabel}>{group.label}</li>
                      )}
                      {group.options.map((opt) => {
                        const flatIdx = flatOptions.indexOf(opt);
                        const isSelected = opt.value === selectedValue;
                        const isHighlighted = flatIdx === highlightedIndex;
                        return (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={opt.disabled}
                            className={[
                              styles.option,
                              isSelected ? styles.selected : "",
                              isHighlighted ? styles.highlighted : "",
                              opt.disabled ? styles.optionDisabled : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => handleSelect(opt)}
                            onMouseEnter={() => setHighlightedIndex(flatIdx)}
                          >
                            <span className={styles.optionContent}>
                              {renderOption ? (
                                renderOption(opt)
                              ) : (
                                <>
                                  <span className={styles.optionLabel}>{opt.label}</span>
                                  {opt.description && (
                                    <span className={styles.optionDesc}>{opt.description}</span>
                                  )}
                                </>
                              )}
                            </span>
                            {isSelected && (
                              <Check size={14} className={styles.checkIcon} />
                            )}
                          </li>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </ul>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {(errorMessage || helperText) && (
          <p className={[styles.helperText, error ? styles.errorText : ""].filter(Boolean).join(" ")}>
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  },
);

Combobox.displayName = "Combobox";
