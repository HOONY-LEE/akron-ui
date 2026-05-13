import { forwardRef } from "react";
import { Check, X } from "lucide-react";
import styles from "./Stepper.module.css";

export type StepStatus = "completed" | "active" | "error" | "pending";
export type StepperOrientation = "horizontal" | "vertical";

export interface StepItem {
  /** 단계 제목 */
  title: string;
  /** 단계 설명 */
  description?: string;
  /** 상태 (기본: pending) */
  status?: StepStatus;
}

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 단계 목록 */
  steps: StepItem[];
  /** 현재 활성 단계 (0-based) */
  activeStep?: number;
  /** 방향 */
  orientation?: StepperOrientation;
  className?: string;
}

function StepIcon({ index, status }: { index: number; status: StepStatus }) {
  if (status === "completed") return <Check size={14} strokeWidth={2.5} />;
  if (status === "error") return <X size={14} strokeWidth={2.5} />;
  return <span>{index + 1}</span>;
}

export const Stepper = forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      activeStep = 0,
      orientation = "horizontal",
      className,
      ...rest
    },
    ref,
  ) => {
    const resolvedSteps = steps.map((step, idx) => {
      let status: StepStatus = step.status ?? "pending";
      if (!step.status) {
        if (idx < activeStep) status = "completed";
        else if (idx === activeStep) status = "active";
      }
      return { ...step, status };
    });

    return (
      <div
        ref={ref}
        className={[
          styles.stepper,
          styles[orientation],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-label="진행 단계"
        {...rest}
      >
        {resolvedSteps.map((step, idx) => {
          const isLast = idx === resolvedSteps.length - 1;
          return (
            <div key={idx} className={[styles.step, styles[step.status]].join(" ")}>
              <div className={styles.indicator}>
                <div className={styles.circle}>
                  <StepIcon index={idx} status={step.status} />
                </div>
                {!isLast && <div className={styles.connector} />}
              </div>
              <div className={styles.content}>
                <div className={styles.title}>{step.title}</div>
                {step.description && (
                  <div className={styles.description}>{step.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Stepper.displayName = "Stepper";
