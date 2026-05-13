import React, { forwardRef } from "react";
import { Inbox } from "lucide-react";
import styles from "./EmptyState.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type EmptyStateSize = "sm" | "md" | "lg";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아이콘 (기본: Inbox) */
  icon?: React.ReactNode;
  /** 제목 */
  title?: string;
  /** 설명 */
  description?: string;
  /** 액션 버튼/요소 */
  action?: React.ReactNode;
  /** 크기 */
  size?: EmptyStateSize;
  /** 테두리 표시 */
  bordered?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  (
    {
      icon,
      title = "데이터 없음",
      description,
      action,
      size = "md",
      bordered = false,
      className,
      children,
      ...rest
    },
    ref,
  ) => {
    const defaultIcon = <Inbox strokeWidth={1.5} />;

    return (
      <div
        ref={ref}
        className={[
          styles.root,
          styles[size],
          bordered ? styles.bordered : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className={styles.iconWrapper}>
          {icon ?? defaultIcon}
        </span>
        {title && <p className={styles.title}>{title}</p>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
        {action && <div className={styles.action}>{action}</div>}
      </div>
    );
  },
);

EmptyState.displayName = "EmptyState";
