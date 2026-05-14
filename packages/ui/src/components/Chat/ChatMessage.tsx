import { forwardRef } from "react";
import styles from "./Chat.module.css";

export type ChatMessageVariant = "default" | "ai" | "system";
export type ChatMessageSide = "left" | "right";

export interface ChatMessageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아바타 (예: <Avatar name="홍길동" size="sm" />) */
  avatar?: React.ReactNode;
  /** 발신자 이름 */
  name?: string;
  /** AI 레이블 (variant="ai" 일 때 표시, 기본 "AI 어시스턴트") */
  aiLabel?: string;
  /** 타임스탬프 */
  timestamp?: React.ReactNode;
  /** 메시지 상태 아이콘 (읽음 체크 등) */
  status?: React.ReactNode;
  /** 메시지 변형 */
  variant?: ChatMessageVariant;
  /** 메시지 위치 (left = 수신, right = 발신) */
  side?: ChatMessageSide;
  /** 호버 시 표시되는 액션 (이모지 반응, 답장 등) */
  actions?: React.ReactNode;
  /** 메시지 내용 */
  children: React.ReactNode;
}

export const ChatMessage = forwardRef<HTMLDivElement, ChatMessageProps>(
  (
    {
      avatar,
      name,
      aiLabel = "AI 어시스턴트",
      timestamp,
      status,
      variant = "default",
      side = "left",
      actions,
      className,
      children,
      ...props
    },
    ref,
  ) => {
    // System messages don't use side
    if (variant === "system") {
      return (
        <div
          ref={ref}
          className={[styles.message, styles.messageSystem, className].filter(Boolean).join(" ")}
          {...props}
        >
          <div className={styles.messageBubble}>{children}</div>
        </div>
      );
    }

    const classes = [
      styles.message,
      side === "left" ? styles.messageSideLeft : styles.messageSideRight,
      variant === "default" ? styles.messageDefault : "",
      variant === "ai" ? styles.messageAi : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {avatar && <div className={styles.messageAvatar}>{avatar}</div>}

        <div className={styles.messageContent}>
          {/* Name + timestamp (shown for left side or always if name exists) */}
          {(name || (timestamp && side === "left")) && (
            <div className={styles.messageMeta}>
              {name && <span className={styles.messageName}>{name}</span>}
              {timestamp && side === "left" && (
                <span className={styles.messageTimestamp}>{timestamp}</span>
              )}
            </div>
          )}

          {/* Bubble */}
          <div className={styles.messageBubble}>
            {variant === "ai" && <span className={styles.messageAiLabel}>{aiLabel}</span>}
            {children}
          </div>

          {/* Footer: timestamp for right side + status */}
          {((timestamp && side === "right") || status) && (
            <div className={styles.messageFooter}>
              {timestamp && side === "right" && (
                <span className={styles.messageTimestamp}>{timestamp}</span>
              )}
              {status && <span className={styles.messageStatus}>{status}</span>}
            </div>
          )}
        </div>

        {/* Hover actions */}
        {actions && <div className={styles.messageActions}>{actions}</div>}
      </div>
    );
  },
);

ChatMessage.displayName = "ChatMessage";
