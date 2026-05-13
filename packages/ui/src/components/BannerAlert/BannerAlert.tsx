import React, { forwardRef, useState } from "react";
import { X, Info, AlertTriangle, CheckCircle, AlertCircle, Megaphone } from "lucide-react";
import styles from "./BannerAlert.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type BannerAlertVariant = "info" | "success" | "warning" | "error" | "announcement";

export interface BannerAlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 변형 */
  variant?: BannerAlertVariant;
  /** 메시지 */
  message: React.ReactNode;
  /** 부가 설명 */
  description?: React.ReactNode;
  /** 닫기 버튼 표시 */
  dismissible?: boolean;
  /** 닫힘 콜백 */
  onDismiss?: () => void;
  /** CTA 버튼 레이블 */
  actionLabel?: string;
  /** CTA 클릭 */
  onAction?: () => void;
  /** 아이콘 숨김 */
  hideIcon?: boolean;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
  /** 최상단 고정 */
  sticky?: boolean;
}

// ─── Variant map ──────────────────────────────────────────────────────────────

const VARIANT_ICONS: Record<BannerAlertVariant, React.ReactNode> = {
  info:         <Info size={16} />,
  success:      <CheckCircle size={16} />,
  warning:      <AlertTriangle size={16} />,
  error:        <AlertCircle size={16} />,
  announcement: <Megaphone size={16} />,
};

// ─── BannerAlert ──────────────────────────────────────────────────────────────

export const BannerAlert = forwardRef<HTMLDivElement, BannerAlertProps>(
  (
    {
      variant = "info",
      message,
      description,
      dismissible = true,
      onDismiss,
      actionLabel,
      onAction,
      hideIcon = false,
      icon,
      sticky = false,
      className,
      ...props
    },
    ref,
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleDismiss = () => {
      setDismissed(true);
      onDismiss?.();
    };

    const classes = [
      styles.root,
      styles[`variant-${variant}`],
      sticky ? styles.sticky : "",
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} role="alert" {...props}>
        <div className={styles.inner}>
          {/* Icon */}
          {!hideIcon && (
            <span className={styles.icon}>{icon ?? VARIANT_ICONS[variant]}</span>
          )}

          {/* Content */}
          <div className={styles.content}>
            <span className={styles.message}>{message}</span>
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </div>

          {/* Action + Dismiss */}
          <div className={styles.actions}>
            {actionLabel && onAction && (
              <button className={styles.actionBtn} onClick={onAction}>
                {actionLabel}
              </button>
            )}
            {dismissible && (
              <button
                className={styles.closeBtn}
                onClick={handleDismiss}
                aria-label="닫기"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  },
);

BannerAlert.displayName = "BannerAlert";
