import React, { forwardRef, useState } from "react";
import { Cookie, X } from "lucide-react";
import styles from "./CookieConsent.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CookieConsentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 제목 */
  title?: string;
  /** 설명 메시지 */
  message?: string;
  /** 수락 버튼 텍스트 */
  acceptLabel?: string;
  /** 거부 버튼 텍스트 */
  declineLabel?: string;
  /** 설정 버튼 텍스트 */
  settingsLabel?: string;
  /** 수락 핸들러 */
  onAccept?: () => void;
  /** 거부 핸들러 */
  onDecline?: () => void;
  /** 설정 핸들러 */
  onSettings?: () => void;
  /** 위치 */
  position?: "bottom" | "bottom-left" | "bottom-right" | "top";
  /** 변형 */
  variant?: "banner" | "card";
  /** 아이콘 표시 */
  showIcon?: boolean;
  /** 닫기 버튼 표시 */
  showCloseButton?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const CookieConsent = forwardRef<HTMLDivElement, CookieConsentProps>(
  (
    {
      title = "쿠키 사용 안내",
      message = "이 웹사이트는 최적의 경험을 제공하기 위해 쿠키를 사용합니다.",
      acceptLabel = "수락",
      declineLabel = "거부",
      settingsLabel,
      onAccept,
      onDecline,
      onSettings,
      position = "bottom",
      variant = "banner",
      showIcon = true,
      showCloseButton = false,
      className,
      ...rest
    },
    ref
  ) => {
    const [dismissed, setDismissed] = useState(false);

    if (dismissed) return null;

    const handleAccept = () => {
      onAccept?.();
      setDismissed(true);
    };

    const handleDecline = () => {
      onDecline?.();
      setDismissed(true);
    };

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[position]} ${styles[variant]} ${className ?? ""}`}
        role="dialog"
        aria-label="쿠키 동의"
        {...rest}
      >
        <div className={styles.content}>
          {showIcon && (
            <span className={styles.icon}>
              <Cookie size={24} />
            </span>
          )}
          <div className={styles.textBlock}>
            {title && <h4 className={styles.title}>{title}</h4>}
            <p className={styles.message}>{message}</p>
          </div>
        </div>

        <div className={styles.actions}>
          {settingsLabel && onSettings && (
            <button type="button" className={styles.settingsBtn} onClick={onSettings}>
              {settingsLabel}
            </button>
          )}
          {onDecline && (
            <button type="button" className={styles.declineBtn} onClick={handleDecline}>
              {declineLabel}
            </button>
          )}
          <button type="button" className={styles.acceptBtn} onClick={handleAccept}>
            {acceptLabel}
          </button>
        </div>

        {showCloseButton && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => setDismissed(true)}
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  }
);

CookieConsent.displayName = "CookieConsent";
