import React, { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./HoverCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type HoverCardPlacement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "right";

export interface HoverCardProps {
  /** 호버 트리거 요소 */
  trigger: React.ReactNode;
  /** 카드 내용 */
  children: React.ReactNode;
  /** 카드 위치 */
  placement?: HoverCardPlacement;
  /** 열기 지연 (ms) */
  openDelay?: number;
  /** 닫기 지연 (ms) */
  closeDelay?: number;
  /** 카드 최소 너비 */
  width?: number | string;
  /** 비활성화 */
  disabled?: boolean;
}

// ─── HoverCard ────────────────────────────────────────────────────────────────

export const HoverCard: React.FC<HoverCardProps> = ({
  trigger,
  children,
  placement = "bottom",
  openDelay = 200,
  closeDelay = 100,
  width = 280,
  disabled = false,
}) => {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout>>(null!);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>(null!);

  const clearTimers = () => {
    if (openTimerRef.current) clearTimeout(openTimerRef.current);
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
  };

  const computePos = useCallback(() => {
    const triggerEl = triggerRef.current;
    const cardEl = cardRef.current;
    if (!triggerEl) return;

    const tr = triggerEl.getBoundingClientRect();
    const cw = (cardEl?.offsetWidth ?? (typeof width === "number" ? width : 280));
    const ch = cardEl?.offsetHeight ?? 120;
    const gap = 8;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top = 0;
    let left = 0;

    switch (placement) {
      case "top":
        top = tr.top - ch - gap;
        left = tr.left + tr.width / 2 - cw / 2;
        break;
      case "top-start":
        top = tr.top - ch - gap;
        left = tr.left;
        break;
      case "top-end":
        top = tr.top - ch - gap;
        left = tr.right - cw;
        break;
      case "bottom-start":
        top = tr.bottom + gap;
        left = tr.left;
        break;
      case "bottom-end":
        top = tr.bottom + gap;
        left = tr.right - cw;
        break;
      case "left":
        top = tr.top + tr.height / 2 - ch / 2;
        left = tr.left - cw - gap;
        break;
      case "right":
        top = tr.top + tr.height / 2 - ch / 2;
        left = tr.right + gap;
        break;
      default: // bottom
        top = tr.bottom + gap;
        left = tr.left + tr.width / 2 - cw / 2;
        break;
    }

    // Clamp
    left = Math.max(8, Math.min(left, vw - cw - 8));
    top = Math.max(8, Math.min(top, vh - ch - 8));

    setPos({ top, left });
  }, [placement, width]);

  const handleOpen = useCallback(() => {
    if (disabled) return;
    clearTimers();
    openTimerRef.current = setTimeout(() => {
      setOpen(true);
      // Re-compute after render
      requestAnimationFrame(computePos);
    }, openDelay);
  }, [disabled, openDelay, computePos]);

  const handleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => setOpen(false), closeDelay);
  }, [closeDelay]);

  useEffect(() => () => clearTimers(), []);

  // Update position on scroll/resize while open
  useEffect(() => {
    if (!open) return;
    computePos();
    window.addEventListener("scroll", computePos, true);
    window.addEventListener("resize", computePos);
    return () => {
      window.removeEventListener("scroll", computePos, true);
      window.removeEventListener("resize", computePos);
    };
  }, [open, computePos]);

  return (
    <>
      <span
        ref={triggerRef}
        className={styles.trigger}
        onMouseEnter={handleOpen}
        onMouseLeave={handleClose}
        onFocus={handleOpen}
        onBlur={handleClose}
        tabIndex={disabled ? undefined : 0}
      >
        {trigger}
      </span>

      {open && createPortal(
        <div
          ref={cardRef}
          className={styles.card}
          style={{
            top: pos.top,
            left: pos.left,
            width,
          }}
          onMouseEnter={handleOpen}
          onMouseLeave={handleClose}
          role="tooltip"
        >
          {children}
        </div>,
        document.body,
      )}
    </>
  );
};

HoverCard.displayName = "HoverCard";
