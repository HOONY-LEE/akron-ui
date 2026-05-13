import React, { forwardRef, useRef, useState } from "react";
import { X } from "lucide-react";
import styles from "./TagInput.module.css";

export type TagInputSize = "sm" | "md" | "lg";

export interface TagInputProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 현재 태그 목록 (제어 모드) */
  value?: string[];
  /** 기본 태그 목록 (비제어 모드) */
  defaultValue?: string[];
  /** 태그 목록 변경 핸들러 */
  onChange?: (tags: string[]) => void;
  /** 플레이스홀더 */
  placeholder?: string;
  /** 최대 태그 수 */
  maxTags?: number;
  /** 태그 추가 트리거 키 */
  addKeys?: string[];
  /** 중복 허용 */
  allowDuplicates?: boolean;
  /** 태그 유효성 검사 */
  validate?: (tag: string) => boolean | string;
  /** 크기 */
  size?: TagInputSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 라벨 */
  label?: string;
  /** 도움말 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 태그 색상 */
  tagColor?: "neutral" | "primary" | "success" | "warning" | "error";
  className?: string;
}

export const TagInput = forwardRef<HTMLDivElement, TagInputProps>(
  (
    {
      value,
      defaultValue = [],
      onChange,
      placeholder,
      maxTags,
      addKeys = ["Enter", ","],
      allowDuplicates = false,
      validate,
      size = "md",
      disabled = false,
      readOnly = false,
      label,
      helperText,
      errorMessage,
      tagColor = "neutral",
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string[]>(defaultValue);
    const [inputVal, setInputVal] = useState("");
    const [validationError, setValidationError] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    const tags = isControlled ? value! : internal;

    const commit = (newTags: string[]) => {
      if (!isControlled) setInternal(newTags);
      onChange?.(newTags);
    };

    const addTag = (raw: string) => {
      const tag = raw.trim();
      if (!tag) return;
      if (!allowDuplicates && tags.includes(tag)) {
        setValidationError("이미 추가된 태그입니다");
        return;
      }
      if (maxTags && tags.length >= maxTags) {
        setValidationError(`최대 ${maxTags}개까지 추가할 수 있습니다`);
        return;
      }
      if (validate) {
        const result = validate(tag);
        if (result === false) {
          setValidationError("유효하지 않은 태그입니다");
          return;
        }
        if (typeof result === "string") {
          setValidationError(result);
          return;
        }
      }
      setValidationError("");
      commit([...tags, tag]);
      setInputVal("");
    };

    const removeTag = (idx: number) => {
      commit(tags.filter((_, i) => i !== idx));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (addKeys.includes(e.key)) {
        e.preventDefault();
        addTag(inputVal);
      } else if (e.key === "Backspace" && !inputVal && tags.length > 0) {
        removeTag(tags.length - 1);
      }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const v = e.target.value;
      // auto-add on comma if comma is addKey
      if (addKeys.includes(",") && v.endsWith(",")) {
        addTag(v.slice(0, -1));
        return;
      }
      setInputVal(v);
      setValidationError("");
    };

    const handleBlur = () => {
      if (inputVal.trim()) {
        addTag(inputVal);
      }
    };

    const handleWrapperClick = () => {
      inputRef.current?.focus();
    };

    const interactive = !disabled && !readOnly;
    const hasError = !!errorMessage || !!validationError;
    const shownError = errorMessage || validationError;
    const atMax = !!(maxTags && tags.length >= maxTags);

    const wrapperCls = [
      styles.wrapper,
      styles[size],
      hasError ? styles.error : "",
      disabled ? styles.disabled : "",
      readOnly ? styles.readOnly : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperCls} style={style} {...rest}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.field} onClick={handleWrapperClick}>
          {tags.map((tag, idx) => (
            <span key={idx} className={[styles.tag, styles[`tag-${tagColor}`]].join(" ")}>
              <span className={styles.tagLabel}>{tag}</span>
              {interactive && (
                <button
                  type="button"
                  className={styles.tagRemove}
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTag(idx);
                  }}
                  tabIndex={-1}
                  aria-label={`${tag} 삭제`}
                >
                  <X size={10} />
                </button>
              )}
            </span>
          ))}
          {interactive && !atMax && (
            <input
              ref={inputRef}
              type="text"
              className={styles.input}
              value={inputVal}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
              placeholder={tags.length === 0 ? placeholder : undefined}
              disabled={disabled}
            />
          )}
        </div>
        {!hasError && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
        {hasError && (
          <span className={styles.errorMessage}>{shownError}</span>
        )}
      </div>
    );
  },
);

TagInput.displayName = "TagInput";
