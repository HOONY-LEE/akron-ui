import React, { forwardRef, useState } from "react";
import { Eye } from "lucide-react";
import styles from "./Spoiler.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface SpoilerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 스포일러 안의 내용 */
  children: React.ReactNode;
  /** 공개 버튼 레이블 */
  showLabel?: string;
  /** 숨김 버튼 레이블 */
  hideLabel?: string;
  /** 처음부터 공개 상태로 시작 */
  defaultOpen?: boolean;
  /** 제어 모드: 현재 공개 여부 */
  open?: boolean;
  /** 상태 변경 콜백 */
  onOpenChange?: (open: boolean) => void;
  /** hover로 공개 (클릭 대신) */
  revealOnHover?: boolean;
  /** 블러 강도 */
  blurAmount?: "sm" | "md" | "lg";
}

// ─── Spoiler ──────────────────────────────────────────────────────────────────

export const Spoiler = forwardRef<HTMLDivElement, SpoilerProps>(
  (
    {
      children,
      showLabel = "내용 보기",
      hideLabel = "숨기기",
      defaultOpen = false,
      open: openProp,
      onOpenChange,
      revealOnHover = false,
      blurAmount = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = openProp !== undefined;
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isOpen = isControlled ? openProp! : internalOpen;

    const toggle = () => {
      if (!isControlled) setInternalOpen((v) => !v);
      onOpenChange?.(!isOpen);
    };

    const classes = [
      styles.root,
      !isOpen && styles[`blur-${blurAmount}`],
      revealOnHover && !isOpen && styles.hoverReveal,
      isOpen && styles.open,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={styles.wrapper} {...props}>
        <div
          className={classes}
          onMouseEnter={revealOnHover ? () => { if (!isControlled) setInternalOpen(true); onOpenChange?.(true); } : undefined}
          onMouseLeave={revealOnHover ? () => { if (!isControlled) setInternalOpen(false); onOpenChange?.(false); } : undefined}
        >
          {children}

          {/* Click overlay — only when not hover mode */}
          {!isOpen && !revealOnHover && (
            <button
              type="button"
              className={styles.revealBtn}
              onClick={toggle}
              aria-label={showLabel}
            >
              <Eye size={16} />
              <span>{showLabel}</span>
            </button>
          )}
        </div>

        {/* Hide button below content */}
        {isOpen && !revealOnHover && (
          <button
            type="button"
            className={styles.hideBtn}
            onClick={toggle}
          >
            {hideLabel}
          </button>
        )}
      </div>
    );
  },
);

Spoiler.displayName = "Spoiler";
