import React, {
  forwardRef,
  useState,
  useRef,
  useEffect,
  useId,
  useCallback,
} from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, X, Check, Search, CheckSquare } from "lucide-react";
import styles from "./MultiSelect.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MultiSelectSize = "sm" | "md" | "lg";

export interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}

export interface MultiSelectProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 옵션 목록 */
  options: MultiSelectOption[];
  /** 선택된 값 배열 (제어) */
  value?: string[];
  /** 초기 선택 값 (비제어) */
  defaultValue?: string[];
  /** 선택 변경 핸들러 */
  onChange?: (values: string[]) => void;
  /** placeholder */
  placeholder?: string;
  /** 검색 placeholder */
  searchPlaceholder?: string;
  /** 크기 */
  size?: MultiSelectSize;
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
  /** 태그 표시 최대 개수 (초과 시 "+N" 표시) */
  maxTagsShown?: number;
  /** 전체 선택/해제 버튼 표시 */
  showSelectAll?: boolean;
  /** 검색 결과 없을 때 메시지 */
  emptyMessage?: string;
  /** 최대 선택 수 */
  maxSelect?: number;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const MultiSelect = forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      value: valueProp,
      defaultValue = [],
      onChange,
      placeholder = "선택하세요",
      searchPlaceholder = "검색...",
      size = "md",
      disabled = false,
      error = false,
      errorMessage,
      label,
      required,
      helperText,
      maxTagsShown = 3,
      showSelectAll = false,
      emptyMessage = "결과 없음",
      maxSelect,
      className,
      ...rest
    },
    ref,
  ) => {
    const id = useId();
    const inputRef = useRef<HTMLInputElement>(null);

    // Controlled / uncontrolled
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string[]>(defaultValue);
    const selectedValues = isControlled ? (valueProp ?? []) : internalValue;

    const [open, setOpen] = useState(false);
    const [inputText, setInputText] = useState("");

    const filteredOptions =
      inputText.trim() === ""
        ? options
        : options.filter(
            (o) =>
              o.label.toLowerCase().includes(inputText.toLowerCase()) ||
              o.description?.toLowerCase().includes(inputText.toLowerCase()),
          );

    // Group options
    const groups = filteredOptions.reduce<
      { label: string | null; options: MultiSelectOption[] }[]
    >((acc, opt) => {
      const groupLabel = opt.group ?? null;
      const existing = acc.find((g) => g.label === groupLabel);
      if (existing) {
        existing.options.push(opt);
      } else {
        acc.push({ label: groupLabel, options: [opt] });
      }
      return acc;
    }, []);

    useEffect(() => {
      if (!open) setInputText("");
    }, [open]);

    useEffect(() => {
      if (open && inputRef.current) inputRef.current.focus();
    }, [open]);

    const setValues = useCallback(
      (next: string[]) => {
        if (!isControlled) setInternalValue(next);
        onChange?.(next);
      },
      [isControlled, onChange],
    );

    const handleToggle = useCallback(
      (opt: MultiSelectOption) => {
        if (opt.disabled) return;
        const isSelected = selectedValues.includes(opt.value);
        if (!isSelected && maxSelect && selectedValues.length >= maxSelect) return;
        const next = isSelected
          ? selectedValues.filter((v) => v !== opt.value)
          : [...selectedValues, opt.value];
        setValues(next);
      },
      [maxSelect, selectedValues, setValues],
    );

    const handleRemoveTag = (value: string, e: React.MouseEvent) => {
      e.stopPropagation();
      setValues(selectedValues.filter((v) => v !== value));
    };

    const handleSelectAll = () => {
      const enabledValues = options
        .filter((o) => !o.disabled)
        .map((o) => o.value);
      const allSelected = enabledValues.every((v) => selectedValues.includes(v));
      setValues(allSelected ? [] : enabledValues);
    };

    const handleClearAll = (e: React.MouseEvent) => {
      e.stopPropagation();
      setValues([]);
    };

    // Selected option labels
    const selectedOptions = selectedValues
      .map((v) => options.find((o) => o.value === v))
      .filter(Boolean) as MultiSelectOption[];

    const shownTags = selectedOptions.slice(0, maxTagsShown);
    const extraCount = selectedOptions.length - shownTags.length;

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
              <span className={styles.tagsArea}>
                {selectedOptions.length === 0 ? (
                  <span className={styles.placeholder}>{placeholder}</span>
                ) : (
                  <>
                    {shownTags.map((opt) => (
                      <span key={opt.value} className={styles.tag}>
                        {opt.label}
                        {!disabled && (
                          <span
                            className={styles.tagRemove}
                            role="button"
                            tabIndex={-1}
                            aria-label={`${opt.label} 제거`}
                            onClick={(e) => handleRemoveTag(opt.value, e)}
                          >
                            <X size={10} />
                          </span>
                        )}
                      </span>
                    ))}
                    {extraCount > 0 && (
                      <span className={styles.extraCount}>+{extraCount}</span>
                    )}
                  </>
                )}
              </span>
              <span className={styles.triggerIcons}>
                {selectedOptions.length > 0 && !disabled && (
                  <span
                    className={styles.clearBtn}
                    role="button"
                    tabIndex={-1}
                    aria-label="전체 초기화"
                    onClick={handleClearAll}
                  >
                    <X size={14} />
                  </span>
                )}
                <ChevronDown
                  size={16}
                  className={[styles.chevron, open ? styles.chevronOpen : ""]
                    .filter(Boolean)
                    .join(" ")}
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
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/* Search */}
              <div className={styles.searchWrapper}>
                <Search size={14} className={styles.searchIcon} />
                <input
                  ref={inputRef}
                  type="text"
                  className={styles.searchInput}
                  placeholder={searchPlaceholder}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  autoComplete="off"
                  spellCheck={false}
                />
              </div>

              {/* Select all */}
              {showSelectAll && (
                <div className={styles.selectAllRow} onClick={handleSelectAll}>
                  <span className={styles.selectAllCheck}>
                    {options.filter((o) => !o.disabled).every((o) =>
                      selectedValues.includes(o.value),
                    ) ? (
                      <Check size={13} />
                    ) : (
                      <CheckSquare size={13} />
                    )}
                  </span>
                  <span className={styles.selectAllLabel}>전체 선택</span>
                  {selectedValues.length > 0 && (
                    <span className={styles.selectCount}>
                      {selectedValues.length}개 선택됨
                    </span>
                  )}
                </div>
              )}

              {/* Options */}
              {filteredOptions.length === 0 ? (
                <div className={styles.empty}>{emptyMessage}</div>
              ) : (
                <ul className={styles.list} role="listbox" aria-multiselectable="true">
                  {groups.map((group) => (
                    <React.Fragment key={group.label ?? "__no-group__"}>
                      {group.label && (
                        <li className={styles.groupLabel}>{group.label}</li>
                      )}
                      {group.options.map((opt) => {
                        const isSelected = selectedValues.includes(opt.value);
                        const isMaxReached =
                          !!maxSelect &&
                          selectedValues.length >= maxSelect &&
                          !isSelected;
                        return (
                          <li
                            key={opt.value}
                            role="option"
                            aria-selected={isSelected}
                            aria-disabled={opt.disabled || isMaxReached}
                            className={[
                              styles.option,
                              isSelected ? styles.selected : "",
                              opt.disabled || isMaxReached ? styles.optionDisabled : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onClick={() => handleToggle(opt)}
                          >
                            <span
                              className={[
                                styles.checkbox,
                                isSelected ? styles.checkboxChecked : "",
                              ]
                                .filter(Boolean)
                                .join(" ")}
                            >
                              {isSelected && <Check size={11} />}
                            </span>
                            <span className={styles.optionContent}>
                              <span className={styles.optionLabel}>{opt.label}</span>
                              {opt.description && (
                                <span className={styles.optionDesc}>
                                  {opt.description}
                                </span>
                              )}
                            </span>
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
          <p
            className={[
              styles.helperText,
              error ? styles.errorText : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  },
);

MultiSelect.displayName = "MultiSelect";
