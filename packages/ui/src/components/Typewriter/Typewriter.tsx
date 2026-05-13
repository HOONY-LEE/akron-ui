import React, { forwardRef, useState, useEffect, useRef } from "react";
import styles from "./Typewriter.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type TypewriterTag =
  | "span"
  | "p"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "div";

export interface TypewriterProps
  extends React.HTMLAttributes<HTMLElement> {
  /** 타이핑할 텍스트 또는 텍스트 배열 */
  words: string | string[];
  /** 타이핑 속도 (ms/character) */
  typingSpeed?: number;
  /** 삭제 속도 (ms/character) */
  deletingSpeed?: number;
  /** 다음 단어 전 대기 시간 (ms) */
  pauseAfterTyping?: number;
  /** 완료 후 대기 시간 (ms) */
  pauseAfterDeleting?: number;
  /** 반복 여부 */
  loop?: boolean;
  /** 커서 표시 */
  showCursor?: boolean;
  /** 커서 문자 */
  cursor?: string;
  /** 완료 콜백 */
  onComplete?: () => void;
  /** 렌더링 태그 */
  as?: TypewriterTag;
  children?: never;
}

// ─── Typewriter ───────────────────────────────────────────────────────────────

export const Typewriter = forwardRef<HTMLElement, TypewriterProps>(
  (
    {
      words,
      typingSpeed = 60,
      deletingSpeed = 35,
      pauseAfterTyping = 1500,
      pauseAfterDeleting = 400,
      loop = true,
      showCursor = true,
      cursor = "|",
      onComplete,
      as: Tag = "span",
      className,
      ...props
    },
    ref,
  ) => {
    const wordList = Array.isArray(words) ? words : [words];

    const [displayText, setDisplayText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [wordIndex, setWordIndex] = useState(0);
    const [isDone, setIsDone] = useState(false);

    const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

    useEffect(() => {
      if (isDone) return;

      const currentWord = wordList[wordIndex];

      const tick = () => {
        if (!isDeleting) {
          // Typing
          if (displayText.length < currentWord.length) {
            setDisplayText(currentWord.slice(0, displayText.length + 1));
            timeoutRef.current = setTimeout(tick, typingSpeed);
          } else {
            // Finished typing this word
            const isLastWord = wordIndex === wordList.length - 1;
            if (isLastWord && !loop) {
              setIsDone(true);
              onComplete?.();
              return;
            }
            timeoutRef.current = setTimeout(() => {
              if (wordList.length > 1) {
                setIsDeleting(true);
              } else {
                // Single word, loop: reset
                setDisplayText("");
              }
            }, pauseAfterTyping);
          }
        } else {
          // Deleting
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
            timeoutRef.current = setTimeout(tick, deletingSpeed);
          } else {
            setIsDeleting(false);
            setWordIndex((i) => (i + 1) % wordList.length);
            timeoutRef.current = setTimeout(tick, pauseAfterDeleting);
          }
        }
      };

      timeoutRef.current = setTimeout(tick, typingSpeed);
      return () => clearTimeout(timeoutRef.current);
    }, [
      displayText,
      isDeleting,
      wordIndex,
      isDone,
      wordList,
      typingSpeed,
      deletingSpeed,
      pauseAfterTyping,
      pauseAfterDeleting,
      loop,
      onComplete,
    ]);

    const classes = [styles.root, className].filter(Boolean).join(" ");

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const TagComponent = Tag as any;

    return (
      <TagComponent ref={ref} className={classes} {...props}>
        {displayText}
        {showCursor && (
          <span
            className={[styles.cursor, isDone && styles.cursorStatic]
              .filter(Boolean)
              .join(" ")}
            aria-hidden="true"
          >
            {cursor}
          </span>
        )}
      </TagComponent>
    );
  },
);

Typewriter.displayName = "Typewriter";
