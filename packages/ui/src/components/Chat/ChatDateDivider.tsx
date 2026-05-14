import { forwardRef } from "react";
import styles from "./Chat.module.css";

export interface ChatDateDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 날짜 텍스트 (예: "2024년 1월 15일 월요일", "오늘") */
  label: string;
}

export const ChatDateDivider = forwardRef<HTMLDivElement, ChatDateDividerProps>(
  ({ label, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.dateDivider, className].filter(Boolean).join(" ")}
        {...props}
      >
        <span className={styles.dateDividerLine} />
        <span className={styles.dateDividerLabel}>{label}</span>
        <span className={styles.dateDividerLine} />
      </div>
    );
  },
);

ChatDateDivider.displayName = "ChatDateDivider";
