import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatChannelListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 상단 헤더 (제목, 검색 등) */
  header?: React.ReactNode;
  /** 하단 푸터 */
  footer?: React.ReactNode;
  /** ChatChannelGroup / ChatChannelItem 목록 */
  children: React.ReactNode;
}

export const ChatChannelList = forwardRef<HTMLDivElement, ChatChannelListProps>(
  ({ header, footer, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.channelList, className].filter(Boolean).join(" ")}
        {...props}
      >
        {header && <div className={styles.channelListHeader}>{header}</div>}
        <div className={styles.channelListBody}>{children}</div>
        {footer && <div className={styles.channelListFooter}>{footer}</div>}
      </div>
    );
  },
);

ChatChannelList.displayName = "ChatChannelList";
