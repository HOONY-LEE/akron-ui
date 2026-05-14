import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatRoomProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ChatHeader + ChatMessageList + ChatInput */
  children: React.ReactNode;
}

export const ChatRoom = forwardRef<HTMLDivElement, ChatRoomProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.room, className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
      </div>
    );
  },
);

ChatRoom.displayName = "ChatRoom";
