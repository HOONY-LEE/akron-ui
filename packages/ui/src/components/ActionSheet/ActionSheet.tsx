import { forwardRef, useCallback, useEffect, type ReactNode } from "react";
import styles from "./ActionSheet.module.css";

export interface ActionSheetAction {
  /** 고유 키 */
  key: string;
  /** 라벨 텍스트 */
  label: string;
  /** 아이콘 */
  icon?: ReactNode;
  /** 파괴적 액션 (빨간색) */
  destructive?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 클릭 콜백 */
  onClick?: () => void;
}

export interface ActionSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 열림 여부 */
  open: boolean;
  /** 닫기 콜백 */
  onClose: () => void;
  /** 제목 */
  title?: ReactNode;
  /** 설명 텍스트 */
  description?: ReactNode;
  /** 액션 목록 */
  actions: ActionSheetAction[];
  /** 취소 버튼 라벨 (false로 숨기기) */
  cancelLabel?: string | false;
  /** 오버레이 클릭 시 닫기 (기본 true) */
  closeOnOverlay?: boolean;
}

export const ActionSheet = forwardRef<HTMLDivElement, ActionSheetProps>(
  (
    {
      open,
      onClose,
      title,
      description,
      actions,
      cancelLabel = "취소",
      closeOnOverlay = true,
      className,
      ...props
    },
    ref,
  ) => {
    // ESC key
    useEffect(() => {
      if (!open) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [open, onClose]);

    // Prevent body scroll
    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    const handleOverlayClick = useCallback(() => {
      if (closeOnOverlay) onClose();
    }, [closeOnOverlay, onClose]);

    const handleActionClick = useCallback(
      (action: ActionSheetAction) => {
        if (action.disabled) return;
        action.onClick?.();
        onClose();
      },
      [onClose],
    );

    if (!open) return null;

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        role="dialog"
        aria-modal="true"
        {...props}
      >
        <div className={styles.overlay} onClick={handleOverlayClick} />

        <div className={styles.container}>
          {/* Action group */}
          <div className={styles.group}>
            {(title || description) && (
              <div className={styles.header}>
                {title && <div className={styles.title}>{title}</div>}
                {description && (
                  <div className={styles.description}>{description}</div>
                )}
              </div>
            )}

            {actions.map((action, i) => (
              <button
                key={action.key}
                type="button"
                className={[
                  styles.action,
                  action.destructive && styles.destructive,
                  i === 0 && !title && !description && styles.firstAction,
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => handleActionClick(action)}
                disabled={action.disabled}
              >
                {action.icon && (
                  <span className={styles.actionIcon}>{action.icon}</span>
                )}
                <span>{action.label}</span>
              </button>
            ))}
          </div>

          {/* Cancel button */}
          {cancelLabel !== false && (
            <div className={styles.group}>
              <button
                type="button"
                className={[styles.action, styles.cancel].join(" ")}
                onClick={onClose}
              >
                {cancelLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  },
);

ActionSheet.displayName = "ActionSheet";
