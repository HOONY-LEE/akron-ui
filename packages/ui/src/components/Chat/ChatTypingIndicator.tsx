import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatTypingIndicatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 타이핑 중인 사용자 이름(들) */
  names?: string[];
}

export const ChatTypingIndicator = forwardRef<HTMLDivElement, ChatTypingIndicatorProps>(
  ({ names, className, ...props }, ref) => {
    const text = names?.length
      ? names.length === 1
        ? `${names[0]}님이 입력 중...`
        : `${names[0]}님 외 ${names.length - 1}명이 입력 중...`
      : "입력 중...";

    return (
      <div
        ref={ref}
        className={[styles.typingIndicator, className].filter(Boolean).join(" ")}
        {...props}
      >
        <span className={styles.typingDots}>
          <span className={styles.typingDot} />
          <span className={styles.typingDot} />
          <span className={styles.typingDot} />
        </span>
        <span className={styles.typingText}>{text}</span>
      </div>
    );
  },
);

ChatTypingIndicator.displayName = "ChatTypingIndicator";
