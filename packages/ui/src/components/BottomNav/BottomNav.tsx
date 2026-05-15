import { forwardRef, type ReactNode } from "react";
import styles from "./BottomNav.module.css";

export interface BottomNavItem {
  /** 고유 키 */
  key: string;
  /** 탭 라벨 */
  label: string;
  /** 아이콘 */
  icon: ReactNode;
  /** 활성 상태 아이콘 (없으면 icon 사용) */
  activeIcon?: ReactNode;
  /** 뱃지 (숫자 또는 dot) */
  badge?: number | boolean;
}

export interface BottomNavProps extends Omit<React.HTMLAttributes<HTMLElement>, "onChange"> {
  /** 탭 항목 목록 */
  items: BottomNavItem[];
  /** 현재 선택된 탭 키 */
  value?: string;
  /** 탭 변경 콜백 */
  onChange?: (key: string) => void;
  /** 라벨 항상 표시 (기본: true) */
  showLabels?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 고정 위치 사용 (기본: true) */
  fixed?: boolean;
  /** safe area 하단 패딩 적용 (기본: true) */
  safeArea?: boolean;
}

export const BottomNav = forwardRef<HTMLElement, BottomNavProps>(
  (
    {
      items,
      value,
      onChange,
      showLabels = true,
      disabled,
      fixed = true,
      safeArea = true,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <nav
        ref={ref}
        className={[
          styles.root,
          fixed && styles.fixed,
          safeArea && styles.safeArea,
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        role="tablist"
        {...props}
      >
        {items.map((item) => {
          const isActive = value === item.key;
          const icon = isActive && item.activeIcon ? item.activeIcon : item.icon;

          return (
            <button
              key={item.key}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={[styles.item, isActive && styles.active]
                .filter(Boolean)
                .join(" ")}
              onClick={() => !disabled && onChange?.(item.key)}
              disabled={disabled}
            >
              <span className={styles.iconWrap}>
                {icon}
                {item.badge !== undefined && item.badge !== false && (
                  <span
                    className={[
                      styles.badge,
                      typeof item.badge === "boolean" && styles.badgeDot,
                    ]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    {typeof item.badge === "number"
                      ? item.badge > 99
                        ? "99+"
                        : item.badge
                      : null}
                  </span>
                )}
              </span>
              {showLabels && (
                <span className={styles.label}>{item.label}</span>
              )}
            </button>
          );
        })}
      </nav>
    );
  },
);

BottomNav.displayName = "BottomNav";
