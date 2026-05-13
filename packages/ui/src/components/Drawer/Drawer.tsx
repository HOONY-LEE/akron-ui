import { forwardRef, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import styles from "./Drawer.module.css";

export type DrawerPlacement = "left" | "right" | "top" | "bottom";
export type DrawerSize = "sm" | "md" | "lg" | "full";

export interface DrawerProps {
  /** 열림 상태 */
  open: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 열리는 방향 */
  placement?: DrawerPlacement;
  /** 크기 */
  size?: DrawerSize;
  /** 제목 */
  title?: string;
  /** 설명 */
  description?: string;
  /** 닫기 버튼 표시 */
  showClose?: boolean;
  /** 오버레이 클릭으로 닫기 */
  closeOnOverlay?: boolean;
  /** 드로어 내용 */
  children: ReactNode;
  /** 드로어 하단 고정 영역 (액션 버튼 등) */
  footer?: ReactNode;
  className?: string;
}

export const Drawer = forwardRef<HTMLDivElement, DrawerProps>(
  (
    {
      open,
      onOpenChange,
      placement = "right",
      size = "md",
      title,
      description,
      showClose = true,
      closeOnOverlay = true,
      children,
      footer,
      className,
    },
    ref,
  ) => {
    const isVertical = placement === "top" || placement === "bottom";

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay
            className={styles.overlay}
            onClick={closeOnOverlay ? undefined : (e) => e.stopPropagation()}
          />
          <Dialog.Content
            ref={ref}
            className={[
              styles.drawer,
              styles[placement],
              styles[`size-${size}`],
              isVertical ? styles.vertical : styles.horizontal,
              className ?? "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-describedby={description ? undefined : undefined}
          >
            {/* Header */}
            {(title || showClose) && (
              <div className={styles.header}>
                <div className={styles.headerContent}>
                  {title && (
                    <Dialog.Title className={styles.title}>{title}</Dialog.Title>
                  )}
                  {description && (
                    <Dialog.Description className={styles.description}>
                      {description}
                    </Dialog.Description>
                  )}
                </div>
                {showClose && (
                  <Dialog.Close asChild>
                    <button className={styles.closeBtn} aria-label="닫기">
                      <X size={16} />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            )}

            {/* Body */}
            <div className={styles.body}>{children}</div>

            {/* Footer */}
            {footer && <div className={styles.footer}>{footer}</div>}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
);

Drawer.displayName = "Drawer";
