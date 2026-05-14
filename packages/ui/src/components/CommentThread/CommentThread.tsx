import React, { forwardRef, useState, useCallback } from "react";
import styles from "./CommentThread.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CommentItem {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string | Date;
  replies?: CommentItem[];
  isEdited?: boolean;
}

export type CommentThreadSize = "sm" | "md";

export interface CommentThreadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 댓글 목록 */
  comments: CommentItem[];
  /** 크기 */
  size?: CommentThreadSize;
  /** 최대 중첩 깊이 (기본 3) */
  maxDepth?: number;
  /** 답글 버튼 표시 여부 (기본 true) */
  showReplyButton?: boolean;
  /** 타임스탬프 표시 여부 (기본 true) */
  showTimestamp?: boolean;
  /** 답글 작성 콜백 */
  onReply?: (parentId: string, content: string) => void;
  /** 댓글 수정 콜백 */
  onEdit?: (commentId: string, content: string) => void;
  /** 댓글 삭제 콜백 */
  onDelete?: (commentId: string) => void;
  /** 답글 입력 placeholder */
  replyPlaceholder?: string;
  /** 댓글 없을 때 메시지 */
  emptyMessage?: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash);
}

const AVATAR_COLORS = [
  "var(--ark-color-primary-500)",
  "var(--ark-color-success-500)",
  "var(--ark-color-warning-500)",
  "var(--ark-color-error-500)",
  "var(--ark-color-info-500)",
  "var(--ark-color-primary-600)",
  "var(--ark-color-success-600)",
  "var(--ark-color-warning-600)",
];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[hashCode(name) % AVATAR_COLORS.length];
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatRelativeTime(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);

  if (diffSec < 60) return "방금";
  if (diffMin < 60) return `${diffMin}분 전`;
  if (diffHour < 24) return `${diffHour}시간 전`;
  if (diffDay < 30) return `${diffDay}일 전`;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

// ─── Comment sub-component ────────────────────────────────────────────────────

interface CommentNodeProps {
  comment: CommentItem;
  depth: number;
  maxDepth: number;
  showReplyButton: boolean;
  showTimestamp: boolean;
  onReply?: (parentId: string, content: string) => void;
  onEdit?: (commentId: string, content: string) => void;
  onDelete?: (commentId: string) => void;
  replyPlaceholder: string;
}

function CommentNode({
  comment,
  depth,
  maxDepth,
  showReplyButton,
  showTimestamp,
  onReply,
  onEdit,
  onDelete,
  replyPlaceholder,
}: CommentNodeProps) {
  const [replying, setReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(comment.content);

  const handleSubmitReply = useCallback(() => {
    const trimmed = replyText.trim();
    if (!trimmed || !onReply) return;
    onReply(comment.id, trimmed);
    setReplyText("");
    setReplying(false);
  }, [replyText, onReply, comment.id]);

  const handleSubmitEdit = useCallback(() => {
    const trimmed = editText.trim();
    if (!trimmed || !onEdit) return;
    onEdit(comment.id, trimmed);
    setEditing(false);
  }, [editText, onEdit, comment.id]);

  const handleCancelReply = useCallback(() => {
    setReplyText("");
    setReplying(false);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditText(comment.content);
    setEditing(false);
  }, [comment.content]);

  const canNest = depth < maxDepth;

  return (
    <div>
      <div className={styles.comment}>
        {/* Avatar */}
        <div className={styles.avatar}>
          {comment.avatar ? (
            <img
              className={styles.avatarImg}
              src={comment.avatar}
              alt={comment.author}
            />
          ) : (
            <div
              className={styles.initials}
              style={{ backgroundColor: getAvatarColor(comment.author) }}
            >
              {getInitials(comment.author)}
            </div>
          )}
        </div>

        {/* Content */}
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.author}>{comment.author}</span>
            {showTimestamp && (
              <span className={styles.timestamp}>
                {formatRelativeTime(comment.timestamp)}
              </span>
            )}
            {comment.isEdited && (
              <span className={styles.edited}>(수정됨)</span>
            )}
          </div>

          {editing ? (
            <div className={styles.replyBox}>
              <textarea
                className={styles.replyTextarea}
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
              <div className={styles.replyActions}>
                <button
                  type="button"
                  className={styles.replyCancelBtn}
                  onClick={handleCancelEdit}
                >
                  취소
                </button>
                <button
                  type="button"
                  className={styles.replySubmitBtn}
                  onClick={handleSubmitEdit}
                  disabled={!editText.trim()}
                >
                  저장
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.body}>{comment.content}</div>
          )}

          {/* Action buttons */}
          {!editing && (
            <div className={styles.actions}>
              {showReplyButton && canNest && onReply && (
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => setReplying((v) => !v)}
                >
                  답글
                </button>
              )}
              {onEdit && (
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => {
                    setEditText(comment.content);
                    setEditing(true);
                  }}
                >
                  수정
                </button>
              )}
              {onDelete && (
                <button
                  type="button"
                  className={styles.actionBtn}
                  onClick={() => onDelete(comment.id)}
                >
                  삭제
                </button>
              )}
            </div>
          )}

          {/* Inline reply box */}
          {replying && (
            <div className={styles.replyBox}>
              <textarea
                className={styles.replyTextarea}
                placeholder={replyPlaceholder}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                autoFocus
              />
              <div className={styles.replyActions}>
                <button
                  type="button"
                  className={styles.replyCancelBtn}
                  onClick={handleCancelReply}
                >
                  취소
                </button>
                <button
                  type="button"
                  className={styles.replySubmitBtn}
                  onClick={handleSubmitReply}
                  disabled={!replyText.trim()}
                >
                  답글 작성
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Nested replies */}
      {comment.replies && comment.replies.length > 0 && canNest && (
        <div className={styles.replies}>
          {comment.replies.map((reply) => (
            <CommentNode
              key={reply.id}
              comment={reply}
              depth={depth + 1}
              maxDepth={maxDepth}
              showReplyButton={showReplyButton}
              showTimestamp={showTimestamp}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              replyPlaceholder={replyPlaceholder}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── CommentThread ────────────────────────────────────────────────────────────

export const CommentThread = forwardRef<HTMLDivElement, CommentThreadProps>(
  (
    {
      comments,
      size = "md",
      maxDepth = 3,
      showReplyButton = true,
      showTimestamp = true,
      onReply,
      onEdit,
      onDelete,
      replyPlaceholder = "답글 작성...",
      emptyMessage = "댓글이 없습니다.",
      className,
      ...props
    },
    ref,
  ) => {
    const rootClass = [styles.root, size === "sm" && styles.sm, className]
      .filter(Boolean)
      .join(" ");

    if (comments.length === 0) {
      return (
        <div ref={ref} className={rootClass} {...props}>
          <div className={styles.empty}>{emptyMessage}</div>
        </div>
      );
    }

    return (
      <div ref={ref} className={rootClass} {...props}>
        {comments.map((comment) => (
          <CommentNode
            key={comment.id}
            comment={comment}
            depth={0}
            maxDepth={maxDepth}
            showReplyButton={showReplyButton}
            showTimestamp={showTimestamp}
            onReply={onReply}
            onEdit={onEdit}
            onDelete={onDelete}
            replyPlaceholder={replyPlaceholder}
          />
        ))}
      </div>
    );
  },
);

CommentThread.displayName = "CommentThread";
