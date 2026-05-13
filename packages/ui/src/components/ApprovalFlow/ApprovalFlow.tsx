import React, { forwardRef } from "react";
import { Check, X, Clock, ChevronRight, User } from "lucide-react";
import styles from "./ApprovalFlow.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApprovalStatus = "approved" | "rejected" | "pending" | "current" | "skipped";
export type ApprovalFlowDirection = "horizontal" | "vertical";

export interface ApprovalStep {
  id: string;
  /** 결재자 이름 */
  name: string;
  /** 직함/역할 */
  title?: string;
  /** 결재 상태 */
  status: ApprovalStatus;
  /** 결재 일시 */
  date?: string;
  /** 코멘트 */
  comment?: string;
  /** 아바타 URL */
  avatar?: string;
}

export interface ApprovalFlowProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 결재 단계 목록 */
  steps: ApprovalStep[];
  /** 방향 */
  direction?: ApprovalFlowDirection;
  /** 단계 클릭 콜백 */
  onStepClick?: (step: ApprovalStep) => void;
  /** 컴팩트 모드 */
  compact?: boolean;
}

// ─── Status helpers ───────────────────────────────────────────────────────────

const STATUS_ICON: Record<ApprovalStatus, React.ReactNode> = {
  approved: <Check size={14} />,
  rejected: <X size={14} />,
  pending: <Clock size={14} />,
  current: <Clock size={14} />,
  skipped: <ChevronRight size={14} />,
};

const STATUS_LABEL: Record<ApprovalStatus, string> = {
  approved: "승인",
  rejected: "반려",
  pending: "대기",
  current: "진행 중",
  skipped: "건너뜀",
};

// ─── Component ────────────────────────────────────────────────────────────────

export const ApprovalFlow = forwardRef<HTMLDivElement, ApprovalFlowProps>(
  (
    {
      steps,
      direction = "horizontal",
      onStepClick,
      compact = false,
      className,
      ...rest
    },
    ref
  ) => {
    const rootCls = [
      styles.root,
      styles[direction],
      compact && styles.compact,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} role="list" {...rest}>
        {steps.map((step, i) => (
          <React.Fragment key={step.id}>
            {/* Connector */}
            {i > 0 && <div className={styles.connector} aria-hidden="true" />}

            {/* Step */}
            <div
              className={[styles.step, styles[`status_${step.status}`]]
                .filter(Boolean)
                .join(" ")}
              role="listitem"
              onClick={() => onStepClick?.(step)}
              tabIndex={onStepClick ? 0 : undefined}
              onKeyDown={(e) => {
                if ((e.key === "Enter" || e.key === " ") && onStepClick) {
                  e.preventDefault();
                  onStepClick(step);
                }
              }}
            >
              {/* Avatar / icon */}
              <div className={styles.avatarWrapper}>
                {step.avatar ? (
                  <img src={step.avatar} alt={step.name} className={styles.avatarImg} />
                ) : (
                  <div className={styles.avatarFallback}>
                    <User size={16} />
                  </div>
                )}
                <span className={styles.statusBadge}>
                  {STATUS_ICON[step.status]}
                </span>
              </div>

              {/* Info */}
              <div className={styles.info}>
                <span className={styles.name}>{step.name}</span>
                {step.title && <span className={styles.title}>{step.title}</span>}
                <span className={styles.statusText}>
                  {STATUS_LABEL[step.status]}
                  {step.date && ` · ${step.date}`}
                </span>
                {step.comment && !compact && (
                  <span className={styles.comment}>"{step.comment}"</span>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    );
  }
);

ApprovalFlow.displayName = "ApprovalFlow";
