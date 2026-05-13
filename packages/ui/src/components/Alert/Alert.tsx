import { forwardRef } from "react";
import { Info, CheckCircle2, AlertTriangle, XCircle, X } from "lucide-react";
import styles from "./Alert.module.css";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 알림 유형 */
  variant?: AlertVariant;
  /** 제목 */
  title?: string;
  /** 설명 텍스트 (또는 children 사용) */
  description?: React.ReactNode;
  /** 아이콘 표시 여부 */
  showIcon?: boolean;
  /** 닫기 버튼 표시 */
  closable?: boolean;
  /** 닫기 핸들러 */
  onClose?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const ICONS: Record<AlertVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: XCircle,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      variant = "info",
      title,
      description,
      showIcon = true,
      closable = false,
      onClose,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const Icon = ICONS[variant];

    return (
      <div
        ref={ref}
        role="alert"
        className={[styles.alert, styles[variant], className ?? ""]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {showIcon && (
          <span className={styles.icon} aria-hidden="true">
            <Icon size={18} />
          </span>
        )}

        <div className={styles.body}>
          {title && <div className={styles.title}>{title}</div>}
          {(description ?? children) && (
            <div className={styles.description}>{description ?? children}</div>
          )}
        </div>

        {closable && (
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="닫기"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

Alert.displayName = "Alert";
