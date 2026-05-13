import { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Carousel.module.css";

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 슬라이드 목록 */
  children: React.ReactNode[];
  /** 자동 재생 (ms, 0이면 비활성) */
  autoPlay?: number;
  /** 루프 여부 */
  loop?: boolean;
  /** 인디케이터 표시 */
  showIndicators?: boolean;
  /** 이전/다음 버튼 표시 */
  showArrows?: boolean;
  /** 현재 슬라이드 (제어 모드) */
  activeIndex?: number;
  /** 슬라이드 변경 핸들러 */
  onIndexChange?: (index: number) => void;
  className?: string;
}

export const Carousel = forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      children,
      autoPlay = 0,
      loop = true,
      showIndicators = true,
      showArrows = true,
      activeIndex: controlledIndex,
      onIndexChange,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledIndex !== undefined;
    const [internalIndex, setInternalIndex] = useState(0);
    const index = isControlled ? controlledIndex : internalIndex;
    const total = children.length;
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const goTo = useCallback(
      (next: number) => {
        let resolved = next;
        if (loop) {
          resolved = ((next % total) + total) % total;
        } else {
          resolved = Math.max(0, Math.min(total - 1, next));
        }
        if (!isControlled) setInternalIndex(resolved);
        onIndexChange?.(resolved);
      },
      [total, loop, isControlled, onIndexChange],
    );

    const prev = () => goTo(index - 1);
    const next = () => goTo(index + 1);

    // Auto play
    useEffect(() => {
      if (!autoPlay) return;
      timerRef.current = setInterval(() => goTo(index + 1), autoPlay);
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, [autoPlay, index, goTo]);

    const canPrev = loop || index > 0;
    const canNext = loop || index < total - 1;

    return (
      <div
        ref={ref}
        className={[styles.carousel, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {/* Track */}
        <div className={styles.track}>
          <div
            className={styles.slides}
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {children.map((child, idx) => (
              <div
                key={idx}
                className={styles.slide}
                aria-hidden={idx !== index}
              >
                {child}
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {showArrows && (
          <>
            <button
              type="button"
              className={[styles.arrow, styles.arrowLeft].join(" ")}
              onClick={prev}
              disabled={!canPrev}
              aria-label="이전 슬라이드"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              className={[styles.arrow, styles.arrowRight].join(" ")}
              onClick={next}
              disabled={!canNext}
              aria-label="다음 슬라이드"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}

        {/* Indicators */}
        {showIndicators && total > 1 && (
          <div className={styles.indicators} role="tablist" aria-label="슬라이드 목록">
            {Array.from({ length: total }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={idx === index}
                aria-label={`슬라이드 ${idx + 1}`}
                className={[styles.dot, idx === index ? styles.dotActive : ""]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>
        )}
      </div>
    );
  },
);

Carousel.displayName = "Carousel";
