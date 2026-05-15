import { forwardRef } from "react";
import styles from "./EditorTabs.module.css";

export type EditorTabsSize = "sm" | "md" | "lg";

/* ── Tab item type ── */
export interface EditorTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  closable?: boolean;
  modified?: boolean;
}

/* ── Root ── */
export interface EditorTabsProps {
  /** 탭 목록 */
  tabs: EditorTab[];
  /** 현재 활성 탭 ID */
  activeId?: string;
  /** 탭 선택 핸들러 */
  onTabChange?: (id: string) => void;
  /** 탭 닫기 핸들러 */
  onTabClose?: (id: string) => void;
  /** 새 탭 추가 핸들러 (제공 시 + 버튼 표시) */
  onTabAdd?: () => void;
  /** 크기 */
  size?: EditorTabsSize;
  /** 전체 너비 사용 */
  fullWidth?: boolean;
  className?: string;
}

export const EditorTabs = forwardRef<HTMLDivElement, EditorTabsProps>(
  (
    {
      tabs,
      activeId,
      onTabChange,
      onTabClose,
      onTabAdd,
      size = "md",
      fullWidth = false,
      className,
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="tablist"
        className={[
          styles.root,
          styles[size],
          fullWidth ? styles.fullWidth : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.list}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeId;
            const closable = tab.closable !== false;

            return (
              <button
                key={tab.id}
                role="tab"
                type="button"
                aria-selected={isActive}
                data-state={isActive ? "active" : "inactive"}
                className={styles.tab}
                onClick={() => onTabChange?.(tab.id)}
              >
                {tab.icon && (
                  <span className={styles.icon} aria-hidden="true">
                    {tab.icon}
                  </span>
                )}
                <span className={styles.label}>{tab.label}</span>
                {tab.modified && (
                  <span className={styles.dot} aria-label="수정됨" />
                )}
                {closable && onTabClose && (
                  <span
                    role="button"
                    tabIndex={-1}
                    aria-label={`${tab.label} 닫기`}
                    className={styles.close}
                    onClick={(e) => {
                      e.stopPropagation();
                      onTabClose(tab.id);
                    }}
                  >
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    >
                      <line x1="4" y1="4" x2="10" y2="10" />
                      <line x1="10" y1="4" x2="4" y2="10" />
                    </svg>
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {onTabAdd && (
          <button
            type="button"
            aria-label="새 탭 추가"
            className={styles.addBtn}
            onClick={onTabAdd}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            >
              <line x1="7" y1="3" x2="7" y2="11" />
              <line x1="3" y1="7" x2="11" y2="7" />
            </svg>
          </button>
        )}
      </div>
    );
  },
);

EditorTabs.displayName = "EditorTabs";
