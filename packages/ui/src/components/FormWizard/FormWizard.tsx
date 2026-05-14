import {
  forwardRef,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./FormWizard.module.css";

export interface WizardStep {
  title: string;
  description?: string;
  content: ReactNode;
  optional?: boolean;
  validate?: () => boolean | Promise<boolean>;
}

export type FormWizardSize = "sm" | "md" | "lg";
export type FormWizardVariant = "horizontal" | "vertical";

export interface FormWizardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onChange"> {
  steps: WizardStep[];
  activeStep?: number;
  defaultStep?: number;
  onChange?: (step: number) => void;
  onComplete?: () => void;
  size?: FormWizardSize;
  variant?: FormWizardVariant;
  showStepNumbers?: boolean;
  allowStepClick?: boolean;
  nextLabel?: string;
  prevLabel?: string;
  completeLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  showCancel?: boolean;
}

const iconSize: Record<FormWizardSize, number> = { sm: 12, md: 14, lg: 16 };
const chevronSize: Record<FormWizardSize, number> = { sm: 14, md: 16, lg: 18 };

export const FormWizard = forwardRef<HTMLDivElement, FormWizardProps>(
  (
    {
      steps,
      activeStep: controlledStep,
      defaultStep = 0,
      onChange,
      onComplete,
      size = "md",
      variant = "horizontal",
      showStepNumbers = true,
      allowStepClick = true,
      nextLabel = "다음",
      prevLabel = "이전",
      completeLabel = "완료",
      cancelLabel = "취소",
      onCancel,
      showCancel = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledStep !== undefined;
    const [internalStep, setInternalStep] = useState(defaultStep);
    const currentStep = isControlled ? controlledStep : internalStep;
    const [direction, setDirection] = useState<"forward" | "backward">(
      "forward",
    );
    const [animationKey, setAnimationKey] = useState(0);
    const [completedSteps, setCompletedSteps] = useState<Set<number>>(
      () => new Set(),
    );
    const isValidatingRef = useRef(false);

    // Sync completed steps when controlled step changes
    useEffect(() => {
      setCompletedSteps((prev) => {
        const next = new Set(prev);
        for (let i = 0; i < currentStep; i++) {
          next.add(i);
        }
        return next;
      });
    }, [currentStep]);

    const goToStep = useCallback(
      (step: number) => {
        if (step === currentStep) return;
        setDirection(step > currentStep ? "forward" : "backward");
        setAnimationKey((k) => k + 1);
        if (!isControlled) {
          setInternalStep(step);
        }
        onChange?.(step);
      },
      [currentStep, isControlled, onChange],
    );

    const handleNext = useCallback(async () => {
      if (isValidatingRef.current) return;

      const step = steps[currentStep];
      if (step.validate) {
        isValidatingRef.current = true;
        try {
          const valid = await step.validate();
          if (!valid) return;
        } finally {
          isValidatingRef.current = false;
        }
      }

      setCompletedSteps((prev) => new Set(prev).add(currentStep));

      if (currentStep === steps.length - 1) {
        onComplete?.();
      } else {
        goToStep(currentStep + 1);
      }
    }, [currentStep, steps, goToStep, onComplete]);

    const handlePrev = useCallback(() => {
      if (currentStep > 0) {
        goToStep(currentStep - 1);
      }
    }, [currentStep, goToStep]);

    const handleStepClick = useCallback(
      (index: number) => {
        if (!allowStepClick) return;
        if (!completedSteps.has(index) && index !== currentStep) return;
        goToStep(index);
      },
      [allowStepClick, completedSteps, currentStep, goToStep],
    );

    const getStepStatus = (index: number) => {
      if (completedSteps.has(index) && index !== currentStep) return "completed";
      if (index === currentStep) return "active";
      return "upcoming";
    };

    const isLastStep = currentStep === steps.length - 1;

    const rootCls = [styles.root, styles[variant], styles[size], className ?? ""]
      .filter(Boolean)
      .join(" ");

    const renderStepIndicator = () => {
      const elements: ReactNode[] = [];

      steps.forEach((step, index) => {
        const status = getStepStatus(index);
        const canClick =
          allowStepClick &&
          (completedSteps.has(index) || index === currentStep);

        if (index > 0) {
          const connectorCls = [
            styles.connector,
            completedSteps.has(index) ? styles.completed : "",
          ]
            .filter(Boolean)
            .join(" ");
          elements.push(
            <div key={`connector-${index}`} className={connectorCls} />,
          );
        }

        const stepCls = [styles.step, canClick ? styles.clickable : ""]
          .filter(Boolean)
          .join(" ");

        const numberCls = [styles.stepNumber, styles[status]].join(" ");
        const titleCls = [
          styles.stepTitle,
          status === "upcoming" ? styles.upcoming : "",
        ]
          .filter(Boolean)
          .join(" ");

        elements.push(
          <div
            key={`step-${index}`}
            className={stepCls}
            role="button"
            tabIndex={canClick ? 0 : -1}
            aria-current={status === "active" ? "step" : undefined}
            onClick={() => handleStepClick(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleStepClick(index);
              }
            }}
          >
            <div className={numberCls}>
              {status === "completed" ? (
                <Check size={iconSize[size]} strokeWidth={2.5} />
              ) : showStepNumbers ? (
                <span>{index + 1}</span>
              ) : null}
            </div>
            <div className={styles.stepText}>
              <span className={titleCls}>{step.title}</span>
              {step.description && (
                <span className={styles.stepDescription}>
                  {step.description}
                </span>
              )}
            </div>
          </div>,
        );
      });

      return <div className={styles.stepIndicator}>{elements}</div>;
    };

    const contentCls = [
      styles.content,
      direction === "forward" ? styles.slideInRight : styles.slideInLeft,
    ].join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        {renderStepIndicator()}

        <div className={styles.contentArea}>
          <div key={animationKey} className={contentCls}>
            {steps[currentStep]?.content}
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerLeft}>
            {showCancel && onCancel && (
              <button
                type="button"
                className={`${styles.navButton} ${styles.cancelButton}`}
                onClick={onCancel}
              >
                {cancelLabel}
              </button>
            )}
          </div>
          <div className={styles.footerRight}>
            <button
              type="button"
              className={styles.navButton}
              disabled={currentStep === 0}
              onClick={handlePrev}
            >
              <ChevronLeft size={chevronSize[size]} />
              {prevLabel}
            </button>
            <button
              type="button"
              className={`${styles.navButton} ${styles.navButtonPrimary}`}
              onClick={handleNext}
            >
              {isLastStep ? completeLabel : nextLabel}
              {!isLastStep && <ChevronRight size={chevronSize[size]} />}
            </button>
          </div>
        </div>
      </div>
    );
  },
);

FormWizard.displayName = "FormWizard";
