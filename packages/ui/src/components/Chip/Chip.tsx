import { forwardRef } from "react";
import { X } from "lucide-react";
import styles from "./Chip.module.css";

export type ChipSize = "sm" | "md" | "lg";
export type ChipColor = "primary" | "success" | "warning" | "error" | "neutral";

export interface ChipProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "onClick" | "onSelect"> {
  /** 칩 레이블 */
  label: string;
  /** 선택 상태 */
  selected?: boolean;
  /** 선택 토글 핸들러 */
  onSelect?: (selected: boolean) => void;
  /** 삭제 버튼 표시 */
  deletable?: boolean;
  /** 삭제 핸들러 */
  onDelete?: () => void;
  /** 크기 */
  size?: ChipSize;
  /** 색상 테마 */
  color?: ChipColor;
  /** 비활성화 */
  disabled?: boolean;
  className?: string;
}

export const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      label,
      selected = false,
      onSelect,
      deletable = false,
      onDelete,
      size = "md",
      color = "neutral",
      disabled = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const handleClick = () => {
      if (!disabled && onSelect) {
        onSelect(!selected);
      }
    };

    const handleDelete = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onDelete) {
        onDelete();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };

    const isClickable = Boolean(onSelect);

    return (
      <span
        ref={ref}
        role={isClickable ? "checkbox" : undefined}
        aria-checked={isClickable ? selected : undefined}
        aria-disabled={disabled ? true : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        onClick={isClickable ? handleClick : undefined}
        onKeyDown={isClickable ? handleKeyDown : undefined}
        className={[
          styles.chip,
          styles[size],
          styles[color],
          selected ? styles.selected : "",
          disabled ? styles.disabled : "",
          isClickable ? styles.clickable : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className={styles.label}>{label}</span>
        {deletable && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
            disabled={disabled}
            aria-label={`${label} 삭제`}
            tabIndex={-1}
          >
            <X size={size === "sm" ? 10 : size === "lg" ? 14 : 12} />
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";
