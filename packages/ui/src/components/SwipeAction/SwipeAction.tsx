import {
  forwardRef,
  useState,
  useRef,
  useCallback,
  type ReactNode,
} from "react";
import styles from "./SwipeAction.module.css";

export interface SwipeActionButton {
  /** 고유 키 */
  key: string;
  /** 라벨 텍스트 */
  label: string;
  /** 아이콘 */
  icon?: ReactNode;
  /** 배경색 */
  color?: "primary" | "error" | "warning" | "success" | "gray";
  /** 클릭 콜백 */
  onClick?: () => void;
}

export interface SwipeActionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  /** 왼쪽으로 스와이프 시 나타나는 버튼 (우측에 표시) */
  rightActions?: SwipeActionButton[];
  /** 오른쪽으로 스와이프 시 나타나는 버튼 (좌측에 표시) */
  leftActions?: SwipeActionButton[];
  /** 비활성화 */
  disabled?: boolean;
  /** 자동으로 닫히는 임계값 (px, 기본 80) */
  threshold?: number;
  /** 스와이프 후 자동 닫기 */
  autoClose?: boolean;
  /** children */
  children: ReactNode;
}

export const SwipeAction = forwardRef<HTMLDivElement, SwipeActionProps>(
  (
    {
      rightActions = [],
      leftActions = [],
      disabled,
      threshold = 80,
      autoClose = true,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const [offsetX, setOffsetX] = useState(0);
    const [swiping, setSwiping] = useState(false);
    const startXRef = useRef(0);
    const startYRef = useRef(0);
    const currentOffsetRef = useRef(0);
    const isSwipingRef = useRef(false);
    const directionLockedRef = useRef<"x" | "y" | null>(null);

    const rightWidth = rightActions.length * 72;
    const leftWidth = leftActions.length * 72;

    const handleTouchStart = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        startXRef.current = e.touches[0].clientX;
        startYRef.current = e.touches[0].clientY;
        isSwipingRef.current = false;
        directionLockedRef.current = null;
      },
      [disabled],
    );

    const handleTouchMove = useCallback(
      (e: React.TouchEvent) => {
        if (disabled) return;
        const dx = e.touches[0].clientX - startXRef.current;
        const dy = e.touches[0].clientY - startYRef.current;

        // Lock direction on first significant move
        if (!directionLockedRef.current) {
          if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
            directionLockedRef.current =
              Math.abs(dx) > Math.abs(dy) ? "x" : "y";
          }
        }

        if (directionLockedRef.current !== "x") return;

        if (!isSwipingRef.current) {
          isSwipingRef.current = true;
          setSwiping(true);
        }

        let newOffset = currentOffsetRef.current + dx;

        // Clamp
        if (rightActions.length === 0 && newOffset < 0) newOffset = 0;
        if (leftActions.length === 0 && newOffset > 0) newOffset = 0;
        newOffset = Math.max(-rightWidth, Math.min(leftWidth, newOffset));

        // Rubber-band resistance beyond bounds
        if (newOffset < -rightWidth) {
          newOffset = -rightWidth + (newOffset + rightWidth) * 0.3;
        }
        if (newOffset > leftWidth) {
          newOffset = leftWidth + (newOffset - leftWidth) * 0.3;
        }

        setOffsetX(newOffset);
      },
      [disabled, rightActions.length, leftActions.length, rightWidth, leftWidth],
    );

    const handleTouchEnd = useCallback(() => {
      if (!isSwipingRef.current) return;
      setSwiping(false);

      let snapTo = 0;
      if (offsetX < -threshold && rightActions.length > 0) {
        snapTo = -rightWidth;
      } else if (offsetX > threshold && leftActions.length > 0) {
        snapTo = leftWidth;
      }

      currentOffsetRef.current = snapTo;
      setOffsetX(snapTo);
    }, [offsetX, threshold, rightActions.length, leftActions.length, rightWidth, leftWidth]);

    const close = useCallback(() => {
      currentOffsetRef.current = 0;
      setOffsetX(0);
    }, []);

    const handleActionClick = useCallback(
      (action: SwipeActionButton) => {
        action.onClick?.();
        if (autoClose) close();
      },
      [autoClose, close],
    );

    const renderActions = (
      actions: SwipeActionButton[],
      side: "left" | "right",
    ) => (
      <div
        className={[styles.actions, styles[`actions-${side}`]]
          .filter(Boolean)
          .join(" ")}
      >
        {actions.map((action) => (
          <button
            key={action.key}
            type="button"
            className={[
              styles.actionBtn,
              styles[`color-${action.color || "gray"}`],
            ].join(" ")}
            onClick={() => handleActionClick(action)}
          >
            {action.icon && (
              <span className={styles.actionIcon}>{action.icon}</span>
            )}
            <span className={styles.actionLabel}>{action.label}</span>
          </button>
        ))}
      </div>
    );

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        {...props}
      >
        {leftActions.length > 0 && renderActions(leftActions, "left")}
        {rightActions.length > 0 && renderActions(rightActions, "right")}

        <div
          className={[styles.content, swiping && styles.swiping]
            .filter(Boolean)
            .join(" ")}
          style={{ transform: `translateX(${offsetX}px)` }}
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

SwipeAction.displayName = "SwipeAction";
