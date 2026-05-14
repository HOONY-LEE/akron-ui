import React, { forwardRef, useState, useCallback } from "react";
import { ThumbsUp, ThumbsDown, Send, X } from "lucide-react";
import styles from "./FeedbackWidget.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type FeedbackRating = "positive" | "negative" | null;

export interface FeedbackData {
  rating: FeedbackRating;
  comment: string;
}

export interface FeedbackWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onSubmit"> {
  /** 제목 */
  title?: string;
  /** 질문 텍스트 */
  question?: string;
  /** 제출 핸들러 */
  onSubmit?: (data: FeedbackData) => void;
  /** 코멘트 입력 표시 */
  showComment?: boolean;
  /** 코멘트 플레이스홀더 */
  commentPlaceholder?: string;
  /** 제출 후 감사 메시지 */
  thankYouMessage?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 변형 */
  variant?: "inline" | "card";
  /** 닫기 가능 */
  dismissible?: boolean;
  /** 닫기 핸들러 */
  onDismiss?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const FeedbackWidget = forwardRef<HTMLDivElement, FeedbackWidgetProps>(
  (
    {
      title,
      question = "이 내용이 도움이 되었나요?",
      onSubmit,
      showComment = true,
      commentPlaceholder = "의견을 남겨주세요 (선택)",
      thankYouMessage = "피드백을 보내주셔서 감사합니다!",
      size = "md",
      variant = "card",
      dismissible = false,
      onDismiss,
      className,
      ...rest
    },
    ref
  ) => {
    const [rating, setRating] = useState<FeedbackRating>(null);
    const [comment, setComment] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = useCallback(() => {
      if (rating === null) return;
      onSubmit?.({ rating, comment });
      setSubmitted(true);
    }, [rating, comment, onSubmit]);

    const handleRating = useCallback(
      (value: FeedbackRating) => {
        setRating(value);
        if (!showComment) {
          onSubmit?.({ rating: value, comment: "" });
          setSubmitted(true);
        }
      },
      [showComment, onSubmit]
    );

    if (submitted) {
      return (
        <div
          ref={ref}
          className={`${styles.wrapper} ${styles[variant]} ${styles[size]} ${styles.submitted} ${className ?? ""}`}
          {...rest}
        >
          <p className={styles.thankYou}>{thankYouMessage}</p>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[variant]} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        {dismissible && (
          <button type="button" className={styles.dismissBtn} onClick={onDismiss}>
            <X size={14} />
          </button>
        )}

        {title && <h4 className={styles.title}>{title}</h4>}

        <p className={styles.question}>{question}</p>

        <div className={styles.ratingRow}>
          <button
            type="button"
            className={`${styles.ratingBtn} ${rating === "positive" ? styles.activePositive : ""}`}
            onClick={() => handleRating("positive")}
            title="도움이 됐어요"
          >
            <ThumbsUp size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
          </button>
          <button
            type="button"
            className={`${styles.ratingBtn} ${rating === "negative" ? styles.activeNegative : ""}`}
            onClick={() => handleRating("negative")}
            title="도움이 안 됐어요"
          >
            <ThumbsDown size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
          </button>
        </div>

        {showComment && rating !== null && (
          <div className={styles.commentSection}>
            <textarea
              className={styles.commentInput}
              placeholder={commentPlaceholder}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
            />
            <button
              type="button"
              className={styles.submitBtn}
              onClick={handleSubmit}
            >
              <Send size={14} />
              <span>보내기</span>
            </button>
          </div>
        )}
      </div>
    );
  }
);

FeedbackWidget.displayName = "FeedbackWidget";
