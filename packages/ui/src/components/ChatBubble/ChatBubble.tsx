import React, { forwardRef } from "react";
import styles from "./ChatBubble.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChatBubbleSide = "left" | "right";
export type ChatBubbleVariant = "filled" | "outline" | "ghost";

export interface ChatBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 발신자 측 (left = 수신, right = 발신) */
  side?: ChatBubbleSide;
  /** 아바타 요소 */
  avatar?: React.ReactNode;
  /** 발신자 이름 */
  name?: string;
  /** 타임스탬프 */
  timestamp?: React.ReactNode;
  /** 메시지 상태 아이콘 (읽음 체크 등) */
  status?: React.ReactNode;
  /** 말풍선 변형 */
  variant?: ChatBubbleVariant;
  /** 메시지 내용 */
  children: React.ReactNode;
}

// ─── ChatBubble ───────────────────────────────────────────────────────────────

export const ChatBubble = forwardRef<HTMLDivElement, ChatBubbleProps>(
  (
    {
      side = "left",
      avatar,
      name,
      timestamp,
      status,
      variant = "filled",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.root,
      styles[`side-${side}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const bubbleClass = [
      styles.bubble,
      styles[`variant-${variant}`],
      styles[`bubble-${side}`],
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Avatar */}
        {avatar && side === "left" && (
          <div className={styles.avatar}>{avatar}</div>
        )}

        {/* Content area */}
        <div className={styles.contentWrap}>
          {/* Name / timestamp header */}
          {(name || (timestamp && side === "left")) && (
            <div className={styles.header}>
              {name && <span className={styles.name}>{name}</span>}
              {timestamp && side === "left" && (
                <span className={styles.timestamp}>{timestamp}</span>
              )}
            </div>
          )}

          {/* Bubble */}
          <div className={bubbleClass}>
            <div className={styles.message}>{children}</div>
          </div>

          {/* Footer: timestamp (right side) + status */}
          {(timestamp && side === "right") || status ? (
            <div className={styles.footer}>
              {timestamp && side === "right" && (
                <span className={styles.timestamp}>{timestamp}</span>
              )}
              {status && <span className={styles.status}>{status}</span>}
            </div>
          ) : null}
        </div>

        {/* Avatar right side */}
        {avatar && side === "right" && (
          <div className={styles.avatar}>{avatar}</div>
        )}
      </div>
    );
  },
);

ChatBubble.displayName = "ChatBubble";
