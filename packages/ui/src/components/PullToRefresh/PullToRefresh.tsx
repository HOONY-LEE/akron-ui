import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
} from "react";
import { Loader2 } from "lucide-react";
import styles from "./PullToRefresh.module.css";

export interface PullToRefreshProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 새로고침 콜백 (Promise 반환 시 완료 후 자동 리셋) */
  onRefresh: () => void | Promise<void>;
  /** 새로고침 중 여부 (controlled) */
  refreshing?: boolean;
  /** 당김 임계값 (px, 기본 60) */
  threshold?: number;
  /** 최대 당김 거리 (px, 기본 120) */
  maxPull?: number;
  /** 비활성화 */
  disabled?: boolean;
  /** 커스텀 인디케이터 */
  indicator?: ReactNode;
  /** 당기는 중 텍스트 */
  pullText?: string;
  /** 놓으면 새로고침 텍스트 */
  releaseText?: string;
  /** 새로고침 중 텍스트 */
  refreshingText?: string;
  /** children */
  children: ReactNode;
}

type PullState = "idle" | "pulling" | "ready" | "refreshing";

export const PullToRefresh = forwardRef<HTMLDivElement, PullToRefreshProps>(
  (
    {
      onRefresh,
      refreshing: controlledRefreshing,
      threshold = 60,
      maxPull = 120,
      disabled,
      indicator,
      pullText = "당겨서 새로고침",
      releaseText = "놓으면 새로고침",
      refreshingText = "새로고침 중...",
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [pullState, setPullState] = useState<PullState>("idle");
    const [pullDistance, setPullDistance] = useState(0);
    const [internalRefreshing, setInternalRefreshing] = useState(false);
    const startYRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const pullingRef = useRef(false);

    const isRefreshing =
      controlledRefreshing !== undefined
        ? controlledRefreshing
        : internalRefreshing;

    useEffect(() => {
      if (!isRefreshing && pullState === "refreshing") {
        setPullState("idle");
        setPullDistance(0);
      }
    }, [isRefreshing, pullState]);

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled || isRefreshing) return;
        const container = containerRef.current;
        if (!container || container.scrollTop > 0) return;
        startYRef.current = e.touches[0].clientY;
        pullingRef.current = true;
      },
      [disabled, isRefreshing],
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (!pullingRef.current || disabled || isRefreshing) return;
        const container = containerRef.current;
        if (!container) return;

        // Only pull when scrolled to top
        if (container.scrollTop > 0) {
          pullingRef.current = false;
          setPullDistance(0);
          setPullState("idle");
          return;
        }

        const dy = e.touches[0].clientY - startYRef.current;
        if (dy < 0) return;

        // Resistance curve
        const distance = Math.min(maxPull, dy * 0.5);
        setPullDistance(distance);
        setPullState(distance >= threshold ? "ready" : "pulling");
      },
      [disabled, isRefreshing, maxPull, threshold],
    );

    const handleTouchEnd = useCallback(async () => {
      if (!pullingRef.current) return;
      pullingRef.current = false;

      if (pullState === "ready") {
        setPullState("refreshing");
        setPullDistance(threshold);

        if (controlledRefreshing === undefined) {
          setInternalRefreshing(true);
          try {
            await onRefresh();
          } finally {
            setInternalRefreshing(false);
          }
        } else {
          onRefresh();
        }
      } else {
        setPullState("idle");
        setPullDistance(0);
      }
    }, [pullState, threshold, controlledRefreshing, onRefresh]);

    const progress = Math.min(1, pullDistance / threshold);

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...props}
      >
        {/* Indicator */}
        <div
          className={[
            styles.indicator,
            pullState === "refreshing" && styles.refreshing,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{ height: pullDistance }}
        >
          <div
            className={styles.indicatorInner}
            style={{
              opacity: pullState === "refreshing" ? 1 : progress,
              transform: `rotate(${progress * 360}deg)`,
            }}
          >
            {indicator ?? (
              <div className={styles.defaultIndicator}>
                <Loader2
                  size={20}
                  className={
                    pullState === "refreshing" ? styles.spinning : undefined
                  }
                />
                <span className={styles.indicatorText}>
                  {pullState === "refreshing"
                    ? refreshingText
                    : pullState === "ready"
                      ? releaseText
                      : pullText}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div
          ref={containerRef}
          className={[
            styles.content,
            pullState === "pulling" || pullState === "ready"
              ? styles.pulling
              : undefined,
          ]
            .filter(Boolean)
            .join(" ")}
          style={{
            transform:
              pullDistance > 0
                ? `translateY(${pullDistance}px)`
                : undefined,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {children}
        </div>
      </div>
    );
  },
);

PullToRefresh.displayName = "PullToRefresh";
