import { forwardRef, useEffect, useRef, useCallback } from "react";
import styles from "./Chat.module.css";

export interface ChatMessageListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** ChatMessage / ChatDateDivider / ChatTypingIndicator */
  children: React.ReactNode;
  /** 새 메시지 추가 시 자동 스크롤 (기본 true) */
  autoScroll?: boolean;
}

export const ChatMessageList = forwardRef<HTMLDivElement, ChatMessageListProps>(
  ({ autoScroll = true, className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const endRef = useRef<HTMLDivElement>(null);

    // Merge refs
    const setRef = useCallback(
      (node: HTMLDivElement | null) => {
        (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    useEffect(() => {
      if (autoScroll && endRef.current) {
        endRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, [children, autoScroll]);

    return (
      <div
        ref={setRef}
        className={[styles.messageList, className].filter(Boolean).join(" ")}
        {...props}
      >
        {children}
        <div ref={endRef} style={{ height: 0, flexShrink: 0 }} />
      </div>
    );
  },
);

ChatMessageList.displayName = "ChatMessageList";
