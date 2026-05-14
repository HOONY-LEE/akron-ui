import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ChatChannelList + ChatRoom을 자식으로 받습니다 */
  children: React.ReactNode;
}

export const ChatLayout = forwardRef<HTMLDivElement, ChatLayoutProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.layout, className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatLayout.displayName = "ChatLayout";
