import { forwardRef } from "react";
import { LayoutGrid, List } from "lucide-react";
import styles from "./ListView.module.css";

export type ListViewMode = "list" | "grid";

export interface ListViewProps<T = unknown> extends React.HTMLAttributes<HTMLDivElement> {
  /** 표시할 데이터 */
  items: T[];
  /** 카드 렌더러 */
  renderCard: (item: T, index: number) => React.ReactNode;
  /** 행 렌더러 */
  renderRow: (item: T, index: number) => React.ReactNode;
  /** 현재 모드 */
  mode?: ListViewMode;
  /** 모드 변경 핸들러 */
  onModeChange?: (mode: ListViewMode) => void;
  /** 그리드 컬럼 수 */
  gridCols?: 2 | 3 | 4;
  /** 툴바 우측에 추가할 요소 */
  toolbar?: React.ReactNode;
  /** 빈 상태 표시 */
  empty?: React.ReactNode;
  className?: string;
}

function ListViewInner<T>(
  {
    items,
    renderCard,
    renderRow,
    mode = "list",
    onModeChange,
    gridCols = 3,
    toolbar,
    empty,
    className,
    ...rest
  }: ListViewProps<T>,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={[styles.listView, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {/* Toolbar */}
      <div className={styles.toolbar}>
        {toolbar && <div className={styles.toolbarLeft}>{toolbar}</div>}
        <div className={styles.toggleGroup}>
          <button
            type="button"
            className={[styles.toggleBtn, mode === "list" ? styles.toggleBtnActive : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onModeChange?.("list")}
            aria-label="리스트 뷰"
            aria-pressed={mode === "list"}
          >
            <List size={16} />
          </button>
          <button
            type="button"
            className={[styles.toggleBtn, mode === "grid" ? styles.toggleBtnActive : ""]
              .filter(Boolean)
              .join(" ")}
            onClick={() => onModeChange?.("grid")}
            aria-label="그리드 뷰"
            aria-pressed={mode === "grid"}
          >
            <LayoutGrid size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      {items.length === 0 ? (
        <div className={styles.empty}>{empty ?? "데이터가 없습니다."}</div>
      ) : mode === "grid" ? (
        <div className={[styles.grid, styles[`cols${gridCols}`]].join(" ")}>
          {items.map((item, idx) => renderCard(item, idx))}
        </div>
      ) : (
        <div className={styles.list}>
          {items.map((item, idx) => renderRow(item, idx))}
        </div>
      )}
    </div>
  );
}

export const ListView = forwardRef(ListViewInner) as <T = unknown>(
  props: ListViewProps<T> & { ref?: React.ForwardedRef<HTMLDivElement> },
) => React.ReactElement;

(ListView as React.FC).displayName = "ListView";
