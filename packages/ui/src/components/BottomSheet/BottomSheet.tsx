import {
  forwardRef,
  useEffect,
  useRef,
  useCallback,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import styles from "./BottomSheet.module.css";

export type BottomSheetSize = "sm" | "md" | "lg" | "full";

export interface BottomSheetProps extends HTMLAttributes<HTMLDivElement> {
  open: boolean;
  onClose: () => void;
  size?: BottomSheetSize;
  title?: string;
  showHandle?: boolean;
  showClose?: boolean;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  children: ReactNode;
  footer?: ReactNode;
}

export const BottomSheet = forwardRef<HTMLDivElement, BottomSheetProps>(
  (
    {
      open,
      onClose,
      size = "md",
      title,
      showHandle = true,
      showClose = true,
      closeOnOverlay = true,
      closeOnEscape = true,
      children,
      footer,
      className,
      ...rest
    },
    ref,
  ) => {
    const sheetRef = useRef<HTMLDivElement>(null);
    const dragStartY = useRef(0);
    const dragCurrentY = useRef(0);
    const isDragging = useRef(false);
    const [dragging, setDragging] = useState(false);
    const [visible, setVisible] = useState(false);

    // Manage mount/unmount with animation
    useEffect(() => {
      if (open) {
        setVisible(true);
      }
    }, [open]);

    const handleTransitionEnd = useCallback(() => {
      if (!open) {
        setVisible(false);
      }
    }, [open]);

    // Close on Escape
    useEffect(() => {
      if (!open || !closeOnEscape) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [open, closeOnEscape, onClose]);

    // Focus trap
    useEffect(() => {
      if (!open) return;
      const sheet = sheetRef.current;
      if (!sheet) return;

      const focusable = sheet.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Focus first element
      requestAnimationFrame(() => first?.focus());

      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== "Tab") return;
        if (focusable.length === 0) {
          e.preventDefault();
          return;
        }
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      };

      document.addEventListener("keydown", handleTab);
      return () => document.removeEventListener("keydown", handleTab);
    }, [open]);

    // Prevent body scroll when open
    useEffect(() => {
      if (!open) return;
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }, [open]);

    // ── Drag logic ──
    const handleDragStart = useCallback((clientY: number) => {
      isDragging.current = true;
      dragStartY.current = clientY;
      dragCurrentY.current = clientY;
      setDragging(true);
    }, []);

    const handleDragMove = useCallback((clientY: number) => {
      if (!isDragging.current) return;
      dragCurrentY.current = clientY;
      const delta = Math.max(0, clientY - dragStartY.current);
      const sheet = sheetRef.current;
      if (sheet) {
        sheet.style.transform = `translateY(${delta}px)`;
      }
    }, []);

    const handleDragEnd = useCallback(() => {
      if (!isDragging.current) return;
      isDragging.current = false;
      setDragging(false);

      const sheet = sheetRef.current;
      if (!sheet) return;

      const delta = dragCurrentY.current - dragStartY.current;
      const sheetHeight = sheet.offsetHeight;

      sheet.style.transform = "";

      if (delta > sheetHeight * 0.3) {
        onClose();
      }
    }, [onClose]);

    // Touch events
    const onTouchStart = useCallback(
      (e: React.TouchEvent) => handleDragStart(e.touches[0].clientY),
      [handleDragStart],
    );
    const onTouchMove = useCallback(
      (e: React.TouchEvent) => handleDragMove(e.touches[0].clientY),
      [handleDragMove],
    );
    const onTouchEnd = useCallback(() => handleDragEnd(), [handleDragEnd]);

    // Mouse events
    useEffect(() => {
      if (!dragging) return;
      const onMouseMove = (e: MouseEvent) => handleDragMove(e.clientY);
      const onMouseUp = () => handleDragEnd();
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      return () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      };
    }, [dragging, handleDragMove, handleDragEnd]);

    const onMouseDown = useCallback(
      (e: React.MouseEvent) => {
        e.preventDefault();
        handleDragStart(e.clientY);
      },
      [handleDragStart],
    );

    if (!visible) return null;

    const overlayClasses = [styles.overlay, open ? styles.open : ""]
      .filter(Boolean)
      .join(" ");

    const sheetClasses = [
      styles.sheet,
      styles[size],
      open ? styles.open : "",
      dragging ? styles.dragging : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const headerClasses = [
      styles.header,
      !showHandle ? styles.headerNoHandle : "",
    ]
      .filter(Boolean)
      .join(" ");

    const showHeader = title || showClose;

    return createPortal(
      <>
        <div
          className={overlayClasses}
          onClick={closeOnOverlay ? onClose : undefined}
          aria-hidden="true"
        />
        <div
          ref={(node) => {
            (sheetRef as React.MutableRefObject<HTMLDivElement | null>).current =
              node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={sheetClasses}
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onTransitionEnd={handleTransitionEnd}
          {...rest}
        >
          {showHandle && (
            <div
              className={styles.handleArea}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              onMouseDown={onMouseDown}
            >
              <div className={styles.handle} />
            </div>
          )}

          {showHeader && (
            <div className={headerClasses}>
              <span className={styles.title}>{title}</span>
              {showClose && (
                <button
                  type="button"
                  className={styles.closeBtn}
                  onClick={onClose}
                  aria-label="Close"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          )}

          <div className={styles.content}>{children}</div>

          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </>,
      document.body,
    );
  },
);

BottomSheet.displayName = "BottomSheet";
