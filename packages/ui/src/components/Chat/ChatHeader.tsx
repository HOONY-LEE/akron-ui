import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 채널 아이콘 */
  icon?: React.ReactNode;
  /** 채널 / 대화 이름 */
  title: string;
  /** 부가 정보 (멤버 수, 온라인 상태 등) */
  subtitle?: string;
  /** 우측 액션 버튼들 */
  actions?: React.ReactNode;
}

export const ChatHeader = forwardRef<HTMLDivElement, ChatHeaderProps>(
  ({ icon, title, subtitle, actions, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.header, className].filter(Boolean).join(" ")}
        {...props}
      >
        {icon && <span className={styles.headerIcon}>{icon}</span>}
        <div className={styles.headerInfo}>
          <div className={styles.headerTitle}>{title}</div>
          {subtitle && <div className={styles.headerSubtitle}>{subtitle}</div>}
        </div>
        {actions && <div className={styles.headerActions}>{actions}</div>}
      </div>
    );
  },
);

ChatHeader.displayName = "ChatHeader";
