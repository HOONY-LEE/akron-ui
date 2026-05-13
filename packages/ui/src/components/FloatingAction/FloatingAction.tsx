import { forwardRef, useState } from "react";
import { Plus, X } from "lucide-react";
import styles from "./FloatingAction.module.css";

export type FabSize = "sm" | "md" | "lg";
export type FabPosition = "bottom-right" | "bottom-left" | "top-right" | "top-left";

export interface FabAction {
  /** 액션 레이블 */
  label: string;
  /** 아이콘 */
  icon: React.ReactNode;
  /** 클릭 핸들러 */
  onClick: () => void;
  /** 비활성화 */
  disabled?: boolean;
}

export interface FloatingActionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** 메인 버튼 아이콘 (기본: Plus, 열리면 X) */
  icon?: React.ReactNode;
  /** 서브 액션 목록 (없으면 단순 버튼) */
  actions?: FabAction[];
  /** 크기 */
  size?: FabSize;
  /** 위치 */
  position?: FabPosition;
  /** 툴팁 레이블 (서브 액션이 없을 때) */
  label?: string;
  className?: string;
}

export const FloatingAction = forwardRef<HTMLButtonElement, FloatingActionProps>(
  (
    {
      icon,
      actions,
      size = "md",
      position = "bottom-right",
      label,
      onClick,
      className,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const hasActions = actions && actions.length > 0;

    const handleMainClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (hasActions) {
        setOpen((prev) => !prev);
      } else {
        onClick?.(e);
      }
    };

    const handleActionClick = (action: FabAction) => {
      action.onClick();
      setOpen(false);
    };

    return (
      <div
        className={[
          styles.wrapper,
          styles[position],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {/* Sub actions */}
        {hasActions && open && (
          <div className={styles.actions}>
            {[...actions].reverse().map((action, idx) => (
              <div key={idx} className={styles.actionItem}>
                <span className={styles.actionLabel}>{action.label}</span>
                <button
                  type="button"
                  className={[styles.fab, styles.actionBtn, styles[size]].join(" ")}
                  onClick={() => handleActionClick(action)}
                  disabled={action.disabled}
                  aria-label={action.label}
                >
                  {action.icon}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Main FAB */}
        <button
          ref={ref}
          type="button"
          className={[styles.fab, styles.main, styles[size], open ? styles.open : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={handleMainClick}
          aria-label={label ?? (hasActions ? (open ? "메뉴 닫기" : "메뉴 열기") : undefined)}
          aria-expanded={hasActions ? open : undefined}
          {...rest}
        >
          {hasActions ? (
            open ? <X size={size === "sm" ? 18 : size === "lg" ? 26 : 22} /> : (icon ?? <Plus size={size === "sm" ? 18 : size === "lg" ? 26 : 22} />)
          ) : (
            icon ?? <Plus size={size === "sm" ? 18 : size === "lg" ? 26 : 22} />
          )}
        </button>
      </div>
    );
  },
);

FloatingAction.displayName = "FloatingAction";
