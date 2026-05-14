import React, { forwardRef } from "react";
import { Info, HelpCircle, AlertCircle } from "lucide-react";
import styles from "./InfoTip.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface InfoTipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 툴팁 내용 */
  content: string;
  /** 함께 표시할 라벨 */
  label?: string;
  /** 아이콘 종류 */
  icon?: "info" | "help" | "alert";
  /** 아이콘 크기 (px) */
  iconSize?: number;
}

const iconMap = { info: Info, help: HelpCircle, alert: AlertCircle };

// ─── Component ────────────────────────────────────────────────────────────────

export const InfoTip = forwardRef<HTMLSpanElement, InfoTipProps>(
  (
    {
      content,
      label,
      icon = "info",
      iconSize = 16,
      className,
      ...rest
    },
    ref
  ) => {
    const IconComp = iconMap[icon];

    return (
      <span ref={ref} className={`${styles.wrapper} ${className ?? ""}`} {...rest}>
        {label && <span className={styles.label}>{label}</span>}
        <button type="button" className={styles.trigger} tabIndex={0} aria-label={content}>
          <IconComp size={iconSize} />
        </button>
        <span className={styles.tooltip} role="tooltip">{content}</span>
      </span>
    );
  }
);

InfoTip.displayName = "InfoTip";
