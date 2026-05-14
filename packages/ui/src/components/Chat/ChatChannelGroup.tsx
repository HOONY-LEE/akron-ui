import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatChannelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그룹 라벨 (예: "채널", "다이렉트 메시지") */
  label?: string;
  /** ChatChannelItem 목록 */
  children: React.ReactNode;
}

export const ChatChannelGroup = forwardRef<HTMLDivElement, ChatChannelGroupProps>(
  ({ label, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.channelGroup, className].filter(Boolean).join(" ")}
        {...props}
      >
        {label && <div className={styles.channelGroupLabel}>{label}</div>}
        {children}
      </div>
    );
  },
);

ChatChannelGroup.displayName = "ChatChannelGroup";
