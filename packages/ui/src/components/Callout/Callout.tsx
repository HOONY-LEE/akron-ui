import React, { forwardRef } from "react";
import { Info, AlertTriangle, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import styles from "./Callout.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CalloutVariant = "info" | "warning" | "success" | "error" | "tip";

export interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 변형 */
  variant?: CalloutVariant;
  /** 제목 */
  title?: string;
  /** 아이콘 오버라이드 */
  icon?: React.ReactNode;
  /** 아이콘 숨김 */
  hideIcon?: boolean;
  children: React.ReactNode;
}

// ─── Default icons ────────────────────────────────────────────────────────────

const DEFAULT_ICONS: Record<CalloutVariant, React.ReactElement> = {
  info: <Info size={16} />,
  warning: <AlertTriangle size={16} />,
  success: <CheckCircle size={16} />,
  error: <XCircle size={16} />,
  tip: <Lightbulb size={16} />,
};

// ─── Callout ──────────────────────────────────────────────────────────────────

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  (
    {
      variant = "info",
      title,
      icon,
      hideIcon = false,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [styles.root, styles[`variant-${variant}`], className]
      .filter(Boolean)
      .join(" ");

    const iconEl = icon ?? DEFAULT_ICONS[variant];

    return (
      <div ref={ref} role="note" className={classes} {...props}>
        {!hideIcon && <span className={styles.icon}>{iconEl}</span>}
        <div className={styles.body}>
          {title && <div className={styles.title}>{title}</div>}
          <div className={styles.content}>{children}</div>
        </div>
      </div>
    );
  },
);

Callout.displayName = "Callout";
