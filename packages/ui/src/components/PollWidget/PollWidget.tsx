import React, { forwardRef, useMemo } from "react";
import { Check } from "lucide-react";
import styles from "./PollWidget.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PollOption {
  /** 고유 ID */
  id: string;
  /** 옵션 레이블 */
  label: string;
  /** 득표 수 */
  votes: number;
}

export interface PollWidgetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 투표 제목 */
  title: string;
  /** 투표 설명 */
  description?: string;
  /** 투표 옵션 목록 */
  options: PollOption[];
  /** 현재 사용자가 투표한 옵션 ID */
  votedOptionId?: string | null;
  /** 투표 핸들러 */
  onVote?: (optionId: string) => void;
  /** 결과 표시 여부 (투표 후 표시) */
  showResults?: boolean;
  /** 복수 선택 허용 */
  multiSelect?: boolean;
  /** 복수 선택 시 선택된 ID 목록 */
  votedOptionIds?: string[];
  /** 닫힌 투표 (투표 불가) */
  closed?: boolean;
  /** 총 투표자 수 (자동 계산) */
  totalVoters?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const PollWidget = forwardRef<HTMLDivElement, PollWidgetProps>(
  (
    {
      title,
      description,
      options,
      votedOptionId,
      onVote,
      showResults: showResultsProp,
      multiSelect = false,
      votedOptionIds = [],
      closed = false,
      totalVoters: totalVotersProp,
      size = "md",
      className,
      ...rest
    },
    ref
  ) => {
    const hasVoted = multiSelect
      ? votedOptionIds.length > 0
      : votedOptionId != null;

    const showResults = showResultsProp ?? hasVoted ?? closed;

    const totalVotes = useMemo(
      () => options.reduce((sum, opt) => sum + opt.votes, 0),
      [options]
    );

    const totalVoters = totalVotersProp ?? totalVotes;

    const maxVotes = useMemo(
      () => Math.max(...options.map((o) => o.votes), 1),
      [options]
    );

    const isSelected = (id: string) => {
      if (multiSelect) return votedOptionIds.includes(id);
      return votedOptionId === id;
    };

    const handleOptionClick = (optionId: string) => {
      if (closed) return;
      onVote?.(optionId);
    };

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${closed ? styles.closed : ""} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>

        <div className={styles.options}>
          {options.map((option) => {
            const pct = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
            const isWinner = option.votes === maxVotes && totalVotes > 0;
            const selected = isSelected(option.id);

            return (
              <button
                key={option.id}
                type="button"
                className={`${styles.option} ${selected ? styles.selected : ""} ${
                  showResults && isWinner ? styles.winner : ""
                }`}
                onClick={() => handleOptionClick(option.id)}
                disabled={closed}
              >
                <div className={styles.optionContent}>
                  <span className={styles.optionLabel}>
                    {selected && <Check size={14} className={styles.checkIcon} />}
                    {option.label}
                  </span>
                  {showResults && (
                    <span className={styles.voteInfo}>
                      <span className={styles.voteCount}>{option.votes}</span>
                      <span className={styles.votePct}>{pct.toFixed(0)}%</span>
                    </span>
                  )}
                </div>
                {showResults && (
                  <div className={styles.barTrack}>
                    <div
                      className={`${styles.barFill} ${isWinner ? styles.winnerFill : ""}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        <div className={styles.footer}>
          <span className={styles.totalVoters}>
            {totalVoters}명 참여
          </span>
          {closed && <span className={styles.closedBadge}>종료됨</span>}
        </div>
      </div>
    );
  }
);

PollWidget.displayName = "PollWidget";
