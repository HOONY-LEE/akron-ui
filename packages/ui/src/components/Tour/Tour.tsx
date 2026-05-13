import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Tour.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TourStep {
  /** 타겟 요소의 CSS 선택자 (없으면 화면 중앙 표시) */
  target?: string;
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 추가 콘텐츠 */
  content?: React.ReactNode;
  /** 팝오버 위치 */
  placement?: "top" | "bottom" | "left" | "right" | "center";
}

export interface TourProps {
  /** 투어 단계 목록 */
  steps: TourStep[];
  /** 투어 진행 여부 */
  open: boolean;
  /** 투어 상태 변경 핸들러 */
  onOpenChange: (open: boolean) => void;
  /** 현재 단계 인덱스 (제어) */
  currentStep?: number;
  /** 단계 변경 핸들러 */
  onStepChange?: (step: number) => void;
  /** 완료 핸들러 */
  onComplete?: () => void;
  /** 다음 버튼 레이블 */
  nextLabel?: string;
  /** 이전 버튼 레이블 */
  prevLabel?: string;
  /** 완료 버튼 레이블 */
  completeLabel?: string;
  /** 건너뛰기 버튼 표시 */
  showSkip?: boolean;
  /** 스포트라이트 padding (px) */
  spotlightPadding?: number;
}

// ─── Spotlight rect ───────────────────────────────────────────────────────────

interface SpotRect {
  top: number;
  left: number;
  width: number;
  height: number;
}

function getTargetRect(selector: string, padding: number): SpotRect | null {
  const el = document.querySelector<HTMLElement>(selector);
  if (!el) return null;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top - padding,
    left: rect.left - padding,
    width: rect.width + padding * 2,
    height: rect.height + padding * 2,
  };
}

// Compute tooltip position relative to viewport
function computeTooltipPos(
  spot: SpotRect | null,
  placement: TourStep["placement"],
  tooltipW: number,
  tooltipH: number,
): { top: number; left: number } {
  if (!spot || placement === "center") {
    return {
      top: window.innerHeight / 2 - tooltipH / 2,
      left: window.innerWidth / 2 - tooltipW / 2,
    };
  }

  const gap = 12;
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let top = 0;
  let left = 0;

  switch (placement) {
    case "bottom":
      top = spot.top + spot.height + gap;
      left = spot.left + spot.width / 2 - tooltipW / 2;
      break;
    case "top":
      top = spot.top - tooltipH - gap;
      left = spot.left + spot.width / 2 - tooltipW / 2;
      break;
    case "right":
      top = spot.top + spot.height / 2 - tooltipH / 2;
      left = spot.left + spot.width + gap;
      break;
    case "left":
      top = spot.top + spot.height / 2 - tooltipH / 2;
      left = spot.left - tooltipW - gap;
      break;
    default: // auto: prefer bottom
      top = spot.top + spot.height + gap;
      left = spot.left + spot.width / 2 - tooltipW / 2;
  }

  // Clamp to viewport with 16px margin
  left = Math.max(16, Math.min(left, vw - tooltipW - 16));
  top = Math.max(16, Math.min(top, vh - tooltipH - 16));

  return { top, left };
}

// ─── Tour ─────────────────────────────────────────────────────────────────────

export const Tour = forwardRef<HTMLDivElement, TourProps>(
  (
    {
      steps,
      open,
      onOpenChange,
      currentStep: currentStepProp,
      onStepChange,
      onComplete,
      nextLabel = "다음",
      prevLabel = "이전",
      completeLabel = "완료",
      showSkip = true,
      spotlightPadding = 8,
    },
    ref,
  ) => {
    const isControlled = currentStepProp !== undefined;
    const [internalStep, setInternalStep] = useState(0);
    const step = isControlled ? (currentStepProp ?? 0) : internalStep;

    const [spotRect, setSpotRect] = useState<SpotRect | null>(null);
    const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
    const tooltipRef = useRef<HTMLDivElement>(null);

    const currentStepData = steps[step];

    const setStep = useCallback(
      (s: number) => {
        if (!isControlled) setInternalStep(s);
        onStepChange?.(s);
      },
      [isControlled, onStepChange],
    );

    const updatePositions = useCallback(() => {
      if (!open || !currentStepData) return;

      const spot = currentStepData.target
        ? getTargetRect(currentStepData.target, spotlightPadding)
        : null;
      setSpotRect(spot);

      const tw = tooltipRef.current?.offsetWidth ?? 320;
      const th = tooltipRef.current?.offsetHeight ?? 180;
      const pos = computeTooltipPos(
        spot,
        currentStepData.placement ?? (spot ? "bottom" : "center"),
        tw,
        th,
      );
      setTooltipPos(pos);

      // Scroll target into view
      if (currentStepData.target) {
        const el = document.querySelector<HTMLElement>(currentStepData.target);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, [open, currentStepData, spotlightPadding]);

    useEffect(() => {
      if (!open) {
        setInternalStep(0);
        return;
      }
      // Small delay to let layout settle
      const timer = setTimeout(updatePositions, 50);
      return () => clearTimeout(timer);
    }, [open, step, updatePositions]);

    useEffect(() => {
      window.addEventListener("resize", updatePositions);
      return () => window.removeEventListener("resize", updatePositions);
    }, [updatePositions]);

    const handleNext = () => {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        onComplete?.();
        onOpenChange(false);
      }
    };

    const handlePrev = () => {
      if (step > 0) setStep(step - 1);
    };

    const handleSkip = () => {
      onOpenChange(false);
    };

    if (!open || !currentStepData) return null;

    const isFirst = step === 0;
    const isLast = step === steps.length - 1;

    return (
      <>
        {/* Backdrop with spotlight cutout */}
        <div
          className={styles.backdrop}
          onClick={handleSkip}
        >
          {spotRect && (
            <div
              className={styles.spotlight}
              style={{
                top: spotRect.top,
                left: spotRect.left,
                width: spotRect.width,
                height: spotRect.height,
              }}
            />
          )}
        </div>

        {/* Tooltip */}
        <div
          ref={(node) => {
            (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
          }}
          className={styles.tooltip}
          style={{
            top: tooltipPos.top,
            left: tooltipPos.left,
          }}
          role="dialog"
          aria-label={`투어 ${step + 1}/${steps.length}: ${currentStepData.title}`}
        >
          {/* Header */}
          <div className={styles.tooltipHeader}>
            <span className={styles.stepPill}>
              {step + 1} / {steps.length}
            </span>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={handleSkip}
              aria-label="투어 닫기"
            >
              <X size={14} />
            </button>
          </div>

          {/* Content */}
          <div className={styles.tooltipBody}>
            <h3 className={styles.tooltipTitle}>{currentStepData.title}</h3>
            {currentStepData.description && (
              <p className={styles.tooltipDesc}>{currentStepData.description}</p>
            )}
            {currentStepData.content}
          </div>

          {/* Footer */}
          <div className={styles.tooltipFooter}>
            <div className={styles.footerLeft}>
              {showSkip && !isLast && (
                <button
                  type="button"
                  className={styles.skipBtn}
                  onClick={handleSkip}
                >
                  건너뛰기
                </button>
              )}
            </div>
            <div className={styles.footerDots}>
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className={[styles.dot, i === step ? styles.dotActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => setStep(i)}
                  aria-label={`${i + 1}단계로 이동`}
                />
              ))}
            </div>
            <div className={styles.footerNav}>
              {!isFirst && (
                <button
                  type="button"
                  className={styles.navBtn}
                  onClick={handlePrev}
                >
                  <ChevronLeft size={14} />
                  {prevLabel}
                </button>
              )}
              <button
                type="button"
                className={[styles.navBtn, styles.navBtnPrimary]
                  .filter(Boolean)
                  .join(" ")}
                onClick={handleNext}
              >
                {isLast ? completeLabel : nextLabel}
                {!isLast && <ChevronRight size={14} />}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  },
);

Tour.displayName = "Tour";
