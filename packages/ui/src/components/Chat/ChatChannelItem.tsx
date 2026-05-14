import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatChannelItemProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 채널 아이콘 (예: <Hash />, <Bot />) */
  icon?: React.ReactNode;
  /** 채널 / 사용자 이름 */
  name: string;
  /** 마지막 메시지 미리보기 */
  preview?: string;
  /** 마지막 메시지 시간 */
  timestamp?: string;
  /** 읽지 않은 메시지 수 */
  unreadCount?: number;
  /** 현재 선택된 채널 */
  active?: boolean;
  /** DM에서 온라인 상태 표시 */
  online?: boolean;
}

export const ChatChannelItem = forwardRef<HTMLButtonElement, ChatChannelItemProps>(
  (
    {
      icon,
      name,
      preview,
      timestamp,
      unreadCount,
      active,
      online,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.channelItem,
      active && styles.channelItemActive,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button ref={ref} className={classes} type="button" {...props}>
        {icon && (
          <span className={[styles.channelItemIcon, online ? styles.channelItemOnline : ""].filter(Boolean).join(" ")}>
            {icon}
          </span>
        )}
        <span className={styles.channelItemBody}>
          <span className={styles.channelItemName}>{name}</span>
          {preview && <span className={styles.channelItemPreview}>{preview}</span>}
        </span>
        {(timestamp || (unreadCount != null && unreadCount > 0)) && (
          <span className={styles.channelItemMeta}>
            {timestamp && <span className={styles.channelItemTime}>{timestamp}</span>}
            {unreadCount != null && unreadCount > 0 && (
              <span className={styles.channelItemBadge}>{unreadCount > 99 ? "99+" : unreadCount}</span>
            )}
          </span>
        )}
      </button>
    );
  },
);

ChatChannelItem.displayName = "ChatChannelItem";
