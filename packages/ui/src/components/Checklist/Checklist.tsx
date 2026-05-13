import React, { forwardRef, useState } from "react";
import { Check, Minus } from "lucide-react";
import styles from "./Checklist.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ChecklistItem {
  id: string | number;
  label: string;
  checked?: boolean;
  description?: string;
  disabled?: boolean;
}

export type ChecklistSize = "sm" | "md" | "lg";
export type ChecklistVariant = "default" | "card" | "minimal";

export interface ChecklistProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultChecked"> {
  /** 항목 목록 */
  items: ChecklistItem[];
  /** controlled 체크 상태 (id 집합) */
  checked?: Set<string | number>;
  /** 기본 체크 상태 (id 집합) */
  defaultChecked?: Set<string | number>;
  /** 변경 콜백 */
  onChange?: (checked: Set<string | number>, item: ChecklistItem, next: boolean) => void;
  /** 크기 */
  size?: ChecklistSize;
  /** 변형 */
  variant?: ChecklistVariant;
  /** 진행도 표시 */
  showProgress?: boolean;
  /** 완료 메시지 */
  completeMessage?: string;
}

// ─── Checklist ────────────────────────────────────────────────────────────────

export const Checklist = forwardRef<HTMLDivElement, ChecklistProps>(
  (
    {
      items,
      checked: checkedProp,
      defaultChecked,
      onChange,
      size = "md",
      variant = "default",
      showProgress = false,
      completeMessage = "모두 완료! 🎉",
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = checkedProp !== undefined;
    const [internalChecked, setInternalChecked] = useState<Set<string | number>>(
      () => defaultChecked ?? new Set(),
    );
    const checkedSet = isControlled ? checkedProp! : internalChecked;

    const toggle = (item: ChecklistItem) => {
      if (item.disabled) return;
      const next = !checkedSet.has(item.id);
      const newSet = new Set(checkedSet);
      if (next) newSet.add(item.id);
      else newSet.delete(item.id);

      if (!isControlled) setInternalChecked(newSet);
      onChange?.(newSet, item, next);
    };

    const checkedCount = items.filter(it => checkedSet.has(it.id)).length;
    const total = items.length;
    const percent = total === 0 ? 0 : Math.round((checkedCount / total) * 100);
    const allDone = checkedCount === total && total > 0;

    const classes = [
      styles.root,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {showProgress && (
          <div className={styles.progress}>
            <div className={styles.progressHeader}>
              <span className={styles.progressLabel}>
                {allDone ? completeMessage : `${checkedCount} / ${total} 완료`}
              </span>
              <span className={styles.progressPct}>{percent}%</span>
            </div>
            <div className={styles.progressBar}>
              <div
                className={[styles.progressFill, allDone ? styles.progressDone : ""].join(" ")}
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>
        )}

        <ul className={styles.list} role="list">
          {items.map((item) => {
            const isChecked = checkedSet.has(item.id);
            return (
              <li
                key={item.id}
                className={[
                  styles.item,
                  isChecked ? styles.itemChecked : "",
                  item.disabled ? styles.itemDisabled : "",
                ].filter(Boolean).join(" ")}
                onClick={() => toggle(item)}
                role="checkbox"
                aria-checked={isChecked}
                aria-disabled={item.disabled}
                tabIndex={item.disabled ? -1 : 0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(item);
                  }
                }}
              >
                <span className={[styles.checkbox, isChecked ? styles.checkboxChecked : ""].join(" ")}>
                  {isChecked && <Check size={size === "sm" ? 10 : size === "md" ? 12 : 14} strokeWidth={3} />}
                </span>
                <span className={styles.content}>
                  <span className={styles.label}>{item.label}</span>
                  {item.description && (
                    <span className={styles.description}>{item.description}</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);

Checklist.displayName = "Checklist";
