import React, { forwardRef, useState, useRef, useEffect } from "react";
import { Check, X, Pencil } from "lucide-react";
import styles from "./InlineEdit.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type InlineEditAs = "input" | "textarea";
export type InlineEditSize = "sm" | "md" | "lg";

export interface InlineEditProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 현재 값 (controlled) */
  value?: string;
  /** 초기 값 (uncontrolled) */
  defaultValue?: string;
  /** 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 편집 확인 핸들러 (저장) */
  onConfirm?: (value: string) => void;
  /** 편집 취소 핸들러 */
  onCancel?: (original: string) => void;
  /** 비활성화 */
  disabled?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 입력 타입 */
  as?: InlineEditAs;
  /** 크기 */
  size?: InlineEditSize;
  /** 편집 아이콘 표시 */
  showEditIcon?: boolean;
  /** 빈 값일 때 표시할 텍스트 */
  emptyText?: string;
  /** 최대 길이 */
  maxLength?: number;
}

// ─── InlineEdit ───────────────────────────────────────────────────────────────

export const InlineEdit = forwardRef<HTMLDivElement, InlineEditProps>(
  (
    {
      value: valueProp,
      defaultValue = "",
      onChange,
      onConfirm,
      onCancel,
      disabled = false,
      placeholder = "클릭하여 편집",
      as = "input",
      size = "md",
      showEditIcon = true,
      emptyText = "—",
      maxLength,
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(
      isControlled ? valueProp! : defaultValue,
    );
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState("");
    const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

    // sync controlled value
    useEffect(() => {
      if (isControlled) setInternalValue(valueProp!);
    }, [isControlled, valueProp]);

    const currentValue = isControlled ? valueProp! : internalValue;

    const startEdit = () => {
      if (disabled) return;
      setDraft(currentValue);
      setEditing(true);
    };

    useEffect(() => {
      if (editing) {
        inputRef.current?.focus();
        if (as === "input") {
          (inputRef.current as HTMLInputElement)?.select();
        }
      }
    }, [editing, as]);

    const confirm = () => {
      if (!editing) return;
      setEditing(false);
      if (!isControlled) setInternalValue(draft);
      onChange?.(draft);
      onConfirm?.(draft);
    };

    const cancel = () => {
      if (!editing) return;
      setEditing(false);
      onCancel?.(currentValue);
    };

    const handleKeyDown = (
      e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      if (e.key === "Enter" && as === "input") {
        e.preventDefault();
        confirm();
      } else if (e.key === "Escape") {
        e.preventDefault();
        cancel();
      } else if (e.key === "Enter" && e.ctrlKey && as === "textarea") {
        e.preventDefault();
        confirm();
      }
    };

    const classes = [
      styles.root,
      styles[`size-${size}`],
      editing && styles.editing,
      disabled && styles.disabled,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const InputTag = as;

    return (
      <div ref={ref} className={classes} {...props}>
        {editing ? (
          <div className={styles.editWrap}>
            <InputTag
              ref={inputRef}
              className={[styles.input, as === "textarea" && styles.textarea]
                .filter(Boolean)
                .join(" ")}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={confirm}
              placeholder={placeholder}
              maxLength={maxLength}
              rows={as === "textarea" ? 3 : undefined}
            />
            <div className={styles.actions}>
              <button
                type="button"
                className={[styles.actionBtn, styles.confirmBtn].join(" ")}
                onMouseDown={(e) => {
                  e.preventDefault(); // prevent blur
                  confirm();
                }}
                aria-label="확인"
              >
                <Check size={14} />
              </button>
              <button
                type="button"
                className={[styles.actionBtn, styles.cancelBtn].join(" ")}
                onMouseDown={(e) => {
                  e.preventDefault();
                  cancel();
                }}
                aria-label="취소"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className={styles.displayBtn}
            onClick={startEdit}
            disabled={disabled}
            aria-label="편집"
          >
            <span className={currentValue ? styles.displayText : styles.emptyText}>
              {currentValue || emptyText}
            </span>
            {showEditIcon && !disabled && (
              <span className={styles.editIcon}>
                <Pencil size={12} />
              </span>
            )}
          </button>
        )}
      </div>
    );
  },
);

InlineEdit.displayName = "InlineEdit";
