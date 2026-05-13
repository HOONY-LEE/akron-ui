import React, { forwardRef } from "react";
import { Check } from "lucide-react";
import styles from "./StepIndicator.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepIndicatorSize = "sm" | "md" | "lg";
export type StepIndicatorVariant = "dots" | "numbers" | "icons";

export interface StepIndicatorStep {
  label?: string;
  icon?: React.ReactNode;
}

export interface StepIndicatorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 총 단계 수 또는 단계 배열 */
  steps: number | StepIndicatorStep[];
  /** 현재 단계 (0-based) */
  currentStep: number;
  /** 크기 */
  size?: StepIndicatorSize;
  /** 변형 */
  variant?: StepIndicatorVariant;
  /** 연결선 표시 */
  showConnector?: boolean;
  /** 완료된 단계 클릭 핸들러 */
  onStepClick?: (index: number) => void;
}

// ─── StepIndicator ────────────────────────────────────────────────────────────

export const StepIndicator = forwardRef<HTMLDivElement, StepIndicatorProps>(
  (
    {
      steps,
      currentStep,
      size = "md",
      variant = "dots",
      showConnector = true,
      onStepClick,
      className,
      ...props
    },
    ref,
  ) => {
    const stepList: StepIndicatorStep[] =
      typeof steps === "number"
        ? Array.from({ length: steps }, (_, i) => ({ label: String(i + 1) }))
        : steps;

    const classes = [
      styles.root,
      styles[`size-${size}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={classes} role="list" {...props}>
        {stepList.map((step, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          const isClickable = onStepClick && i <= currentStep;

          const dotClass = [
            styles.dot,
            isCompleted && styles.completed,
            isActive && styles.active,
            isClickable && styles.clickable,
          ]
            .filter(Boolean)
            .join(" ");

          return (
            <React.Fragment key={i}>
              <div className={styles.step} role="listitem">
                <button
                  type="button"
                  className={dotClass}
                  onClick={() => isClickable && onStepClick(i)}
                  disabled={!isClickable}
                  aria-current={isActive ? "step" : undefined}
                  aria-label={step.label ? `${step.label} 단계` : `단계 ${i + 1}`}
                  tabIndex={isClickable ? 0 : -1}
                >
                  {isCompleted ? (
                    <Check strokeWidth={3} />
                  ) : variant === "numbers" ? (
                    <span>{i + 1}</span>
                  ) : variant === "icons" && step.icon ? (
                    step.icon
                  ) : null}
                </button>
                {step.label && (
                  <span className={[
                    styles.label,
                    isActive && styles.labelActive,
                    isCompleted && styles.labelCompleted,
                  ].filter(Boolean).join(" ")}>
                    {step.label}
                  </span>
                )}
              </div>

              {/* Connector */}
              {showConnector && i < stepList.length - 1 && (
                <div
                  className={[
                    styles.connector,
                    isCompleted && styles.connectorCompleted,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  },
);

StepIndicator.displayName = "StepIndicator";
