import React, { forwardRef, useState, useRef, useEffect } from "react";
import { SmilePlus } from "lucide-react";
import styles from "./ReactionPicker.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Reaction {
  /** 이모지 */
  emoji: string;
  /** 라벨 (접근성) */
  label?: string;
  /** 반응 수 */
  count: number;
  /** 현재 사용자가 반응했는지 */
  active?: boolean;
}

export interface ReactionPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 반응 목록 */
  reactions: Reaction[];
  /** 반응 변경 핸들러 */
  onChange?: (emoji: string, active: boolean) => void;
  /** 선택 가능한 이모지 목록 */
  availableEmojis?: string[];
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 읽기 전용 */
  readOnly?: boolean;
  /** 추가 버튼 표시 */
  showAddButton?: boolean;
  /** 최대 표시 이모지 수 (피커에서) */
  maxPickerEmojis?: number;
}

const DEFAULT_EMOJIS = [
  "👍", "👎", "❤️", "😄", "😮", "😢", "🎉", "🚀",
  "👀", "🔥", "💯", "✅", "❌", "⭐", "💡", "🤔",
];

// ─── Component ────────────────────────────────────────────────────────────────

export const ReactionPicker = forwardRef<HTMLDivElement, ReactionPickerProps>(
  (
    {
      reactions,
      onChange,
      availableEmojis = DEFAULT_EMOJIS,
      size = "md",
      readOnly = false,
      showAddButton = true,
      maxPickerEmojis = 16,
      className,
      ...rest
    },
    ref
  ) => {
    const [pickerOpen, setPickerOpen] = useState(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      function handleClickOutside(e: MouseEvent) {
        if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
          setPickerOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleReactionClick = (emoji: string, currentActive: boolean) => {
      if (readOnly) return;
      onChange?.(emoji, !currentActive);
    };

    const handlePickerSelect = (emoji: string) => {
      if (readOnly) return;
      const existing = reactions.find((r) => r.emoji === emoji);
      onChange?.(emoji, !(existing?.active));
      setPickerOpen(false);
    };

    const displayEmojis = availableEmojis.slice(0, maxPickerEmojis);

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.reactionList}>
          {reactions
            .filter((r) => r.count > 0)
            .map((reaction) => (
              <button
                key={reaction.emoji}
                type="button"
                className={`${styles.reactionChip} ${reaction.active ? styles.active : ""}`}
                onClick={() => handleReactionClick(reaction.emoji, !!reaction.active)}
                disabled={readOnly}
                title={reaction.label || reaction.emoji}
              >
                <span className={styles.emoji}>{reaction.emoji}</span>
                <span className={styles.count}>{reaction.count}</span>
              </button>
            ))}

          {showAddButton && !readOnly && (
            <div className={styles.addWrapper} ref={pickerRef}>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() => setPickerOpen(!pickerOpen)}
                title="리액션 추가"
              >
                <SmilePlus size={size === "sm" ? 14 : size === "lg" ? 20 : 16} />
              </button>

              {pickerOpen && (
                <div className={styles.picker}>
                  <div className={styles.pickerGrid}>
                    {displayEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={styles.pickerEmoji}
                        onClick={() => handlePickerSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

ReactionPicker.displayName = "ReactionPicker";
