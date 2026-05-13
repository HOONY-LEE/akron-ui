import React, { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./SplitButton.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SplitButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type SplitButtonSize = "sm" | "md" | "lg";

export interface SplitButtonItem {
  /** 고유 키 */
  key: string;
  /** 레이블 */
  label: React.ReactNode;
  /** 비활성화 */
  disabled?: boolean;
  /** 구분선 (이 항목 위) */
  divider?: boolean;
  /** 위험 스타일 */
  danger?: boolean;
}

export interface SplitButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** 기본 버튼 레이블 */
  children: React.ReactNode;
  /** 드롭다운 아이템 목록 */
  items: SplitButtonItem[];
  /** 아이템 클릭 핸들러 */
  onItemClick?: (key: string) => void;
  /** 버튼 변형 */
  variant?: SplitButtonVariant;
  /** 버튼 크기 */
  size?: SplitButtonSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 드롭다운 위치 */
  placement?: "bottom-start" | "bottom-end";
}

// ─── SplitButton ──────────────────────────────────────────────────────────────

export const SplitButton = forwardRef<HTMLDivElement, SplitButtonProps>(
  (
    {
      children,
      items,
      onItemClick,
      variant = "primary",
      size = "md",
      disabled = false,
      loading = false,
      fullWidth = false,
      placement = "bottom-end",
      onClick,
      className,
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open]);

    const handleItemClick = useCallback(
      (item: SplitButtonItem) => {
        if (item.disabled) return;
        onItemClick?.(item.key);
        setOpen(false);
      },
      [onItemClick],
    );

    const rootClass = [
      styles.root,
      styles[`variant-${variant}`],
      styles[`size-${size}`],
      fullWidth && styles.fullWidth,
      (disabled || loading) && styles.disabled,
      open && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }} className={rootClass}>
        {/* Main button */}
        <button
          type="button"
          className={styles.mainBtn}
          disabled={disabled || loading}
          onClick={onClick}
          {...props}
        >
          {loading && (
            <span className={styles.spinner} aria-hidden="true" />
          )}
          {children}
        </button>

        {/* Divider */}
        <span className={styles.divider} aria-hidden="true" />

        {/* Caret button */}
        <button
          type="button"
          className={styles.caretBtn}
          disabled={disabled || loading}
          onClick={() => setOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-label="추가 옵션"
        >
          <ChevronDown
            size={size === "sm" ? 12 : size === "lg" ? 16 : 14}
            className={[styles.caret, open && styles.caretOpen].filter(Boolean).join(" ")}
          />
        </button>

        {/* Dropdown */}
        {open && (
          <div
            ref={dropdownRef}
            className={[
              styles.dropdown,
              placement === "bottom-start" ? styles.dropdownStart : styles.dropdownEnd,
            ]
              .filter(Boolean)
              .join(" ")}
            role="menu"
          >
            {items.map((item) => (
              <React.Fragment key={item.key}>
                {item.divider && <div className={styles.dropdownDivider} role="separator" />}
                <button
                  type="button"
                  role="menuitem"
                  className={[
                    styles.dropdownItem,
                    item.disabled && styles.dropdownItemDisabled,
                    item.danger && styles.dropdownItemDanger,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={item.disabled}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    );
  },
);

SplitButton.displayName = "SplitButton";
