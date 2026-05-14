import { forwardRef } from "react";
import { Check, Clock, AlertCircle, Loader2 } from "lucide-react";
import styles from "./ProgressTracker.module.css";

export type PhaseStatus =
  | "completed"
  | "in-progress"
  | "upcoming"
  | "delayed"
  | "blocked";

export interface TrackerPhase {
  id: string;
  label: string;
  description?: string;
  status: PhaseStatus;
  /** 0-100 for in-progress phases */
  progress?: number;
  startDate?: string;
  endDate?: string;
  assignee?: string;
}

export type ProgressTrackerVariant = "horizontal" | "vertical";
export type ProgressTrackerSize = "sm" | "md" | "lg";

export interface ProgressTrackerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  phases: TrackerPhase[];
  /** default 'horizontal' */
  variant?: ProgressTrackerVariant;
  size?: ProgressTrackerSize;
  /** show progress percentage for in-progress, default true */
  showProgress?: boolean;
  /** default false */
  showDates?: boolean;
  /** default false */
  showAssignee?: boolean;
  onPhaseClick?: (phase: TrackerPhase) => void;
}

const statusStyleMap: Record<PhaseStatus, string> = {
  completed: styles.completed,
  "in-progress": styles.inProgress,
  upcoming: styles.upcoming,
  delayed: styles.delayed,
  blocked: styles.blocked,
};

const iconSizeMap: Record<ProgressTrackerSize, number> = {
  sm: 12,
  md: 16,
  lg: 20,
};

function PhaseIcon({
  status,
  size,
}: {
  status: PhaseStatus;
  size: ProgressTrackerSize;
}) {
  const iconSize = iconSizeMap[size];
  switch (status) {
    case "completed":
      return <Check size={iconSize} strokeWidth={2.5} />;
    case "in-progress":
      return (
        <Loader2 size={iconSize} strokeWidth={2.5} className={styles.spin} />
      );
    case "delayed":
      return <AlertCircle size={iconSize} strokeWidth={2.5} />;
    case "blocked":
      return <AlertCircle size={iconSize} strokeWidth={2.5} />;
    case "upcoming":
    default:
      return <Clock size={iconSize} strokeWidth={2.5} />;
  }
}

export const ProgressTracker = forwardRef<HTMLDivElement, ProgressTrackerProps>(
  (
    {
      phases,
      variant = "horizontal",
      size = "md",
      showProgress = true,
      showDates = false,
      showAssignee = false,
      onPhaseClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const clickable = !!onPhaseClick;

    return (
      <div
        ref={ref}
        className={[
          styles.root,
          styles[variant],
          styles[size],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {phases.map((phase, idx) => {
          const isLast = idx === phases.length - 1;

          return (
            <div key={phase.id} className={styles.phaseWrapper}>
              {/* Phase node */}
              <div
                className={[
                  styles.phase,
                  statusStyleMap[phase.status],
                  clickable ? styles.clickable : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => onPhaseClick?.(phase)}
                role={clickable ? "button" : undefined}
                tabIndex={clickable ? 0 : undefined}
                onKeyDown={
                  clickable
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onPhaseClick?.(phase);
                        }
                      }
                    : undefined
                }
              >
                <div
                  className={[
                    styles.phaseIcon,
                    statusStyleMap[phase.status],
                  ].join(" ")}
                >
                  <PhaseIcon status={phase.status} size={size} />
                </div>

                <div className={styles.phaseContent}>
                  <span className={styles.phaseLabel}>{phase.label}</span>

                  {phase.description && (
                    <span className={styles.phaseDesc}>
                      {phase.description}
                    </span>
                  )}

                  {showProgress &&
                    phase.status === "in-progress" &&
                    phase.progress != null && (
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${Math.min(100, Math.max(0, phase.progress))}%` }}
                        />
                      </div>
                    )}

                  {showProgress &&
                    phase.status === "in-progress" &&
                    phase.progress != null && (
                      <span className={styles.progressText}>
                        {Math.round(phase.progress)}%
                      </span>
                    )}

                  {showDates && (phase.startDate || phase.endDate) && (
                    <span className={styles.phaseDates}>
                      {phase.startDate}
                      {phase.startDate && phase.endDate && " – "}
                      {phase.endDate}
                    </span>
                  )}

                  {showAssignee && phase.assignee && (
                    <span className={styles.phaseAssignee}>
                      {phase.assignee}
                    </span>
                  )}
                </div>
              </div>

              {/* Connector */}
              {!isLast && (
                <div
                  className={[
                    styles.connector,
                    phase.status === "completed"
                      ? styles.connectorCompleted
                      : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              )}
            </div>
          );
        })}
      </div>
    );
  },
);

ProgressTracker.displayName = "ProgressTracker";
