import React, { forwardRef } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AlertTriangle, CheckCircle, Info, Trash2 } from "lucide-react";
import styles from "./ConfirmDialog.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ConfirmDialogVariant = "default" | "danger" | "warning" | "info" | "success";

export interface ConfirmDialogProps {
  /** 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 제목 */
  title: string;
  /** 설명 텍스트 */
  description?: string;
  /** 확인 버튼 텍스트 */
  confirmLabel?: string;
  /** 취소 버튼 텍스트 */
  cancelLabel?: string;
  /** 다이얼로그 변형 */
  variant?: ConfirmDialogVariant;
  /** 확인 버튼 비활성화 */
  confirmDisabled?: boolean;
  /** 로딩 상태 */
  loading?: boolean;
  /** 확인 클릭 핸들러 */
  onConfirm: () => void;
  /** 취소 클릭 핸들러 */
  onCancel?: () => void;
  /** 추가 내용 */
  children?: React.ReactNode;
}

// ─── Icons per variant ────────────────────────────────────────────────────────

const VARIANT_ICONS: Record<ConfirmDialogVariant, React.ReactNode> = {
  default: null,
  danger: <Trash2 size={20} />,
  warning: <AlertTriangle size={20} />,
  info: <Info size={20} />,
  success: <CheckCircle size={20} />,
};

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

export const ConfirmDialog = forwardRef<HTMLDivElement, ConfirmDialogProps>(
  (
    {
      open,
      onOpenChange,
      title,
      description,
      confirmLabel = "확인",
      cancelLabel = "취소",
      variant = "default",
      confirmDisabled = false,
      loading = false,
      onConfirm,
      onCancel,
      children,
    },
    ref,
  ) => {
    const icon = VARIANT_ICONS[variant];

    const handleCancel = () => {
      onCancel?.();
      onOpenChange(false);
    };

    const handleConfirm = () => {
      onConfirm();
    };

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content ref={ref} className={styles.content}>
            {/* Icon */}
            {icon && (
              <div className={[styles.iconWrap, styles[`icon-${variant}`]].join(" ")}>
                {icon}
              </div>
            )}

            {/* Header */}
            <div className={styles.header}>
              <Dialog.Title className={styles.title}>{title}</Dialog.Title>
              {description && (
                <Dialog.Description className={styles.description}>
                  {description}
                </Dialog.Description>
              )}
            </div>

            {/* Body */}
            {children && <div className={styles.body}>{children}</div>}

            {/* Footer */}
            <div className={styles.footer}>
              <button
                type="button"
                className={styles.cancelBtn}
                onClick={handleCancel}
                disabled={loading}
              >
                {cancelLabel}
              </button>
              <button
                type="button"
                className={[
                  styles.confirmBtn,
                  styles[`confirm-${variant}`],
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={handleConfirm}
                disabled={confirmDisabled || loading}
                aria-busy={loading}
              >
                {loading && <span className={styles.spinner} aria-hidden="true" />}
                {confirmLabel}
              </button>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

ConfirmDialog.displayName = "ConfirmDialog";
