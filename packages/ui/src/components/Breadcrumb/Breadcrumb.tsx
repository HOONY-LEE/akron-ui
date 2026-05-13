import { forwardRef } from "react";
import { ChevronRight, MoreHorizontal } from "lucide-react";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  /** 레이블 */
  label: string;
  /** 링크 href (없으면 현재 페이지) */
  href?: string;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent) => void;
}

export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> {
  /** 경로 아이템 목록 */
  items: BreadcrumbItem[];
  /** 구분자 (기본: ChevronRight 아이콘) */
  separator?: React.ReactNode;
  /** 최대 표시 개수 (초과 시 "..." 처리) */
  maxItems?: number;
  className?: string;
}

export const Breadcrumb = forwardRef<HTMLElement, BreadcrumbProps>(
  (
    {
      items,
      separator,
      maxItems,
      className,
      ...rest
    },
    ref,
  ) => {
    const sep = separator ?? <ChevronRight size={14} className={styles.chevron} />;

    let displayItems = items;
    let collapsed = false;

    if (maxItems && items.length > maxItems) {
      collapsed = true;
      displayItems = [
        items[0],
        { label: "...", href: undefined },
        ...items.slice(-(maxItems - 1)),
      ];
    }

    return (
      <nav
        ref={ref}
        aria-label="Breadcrumb"
        className={[styles.breadcrumb, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        <ol className={styles.list}>
          {displayItems.map((item, idx) => {
            const isLast = idx === displayItems.length - 1;
            const isEllipsis = item.label === "...";

            return (
              <li key={idx} className={styles.item}>
                {isEllipsis ? (
                  <span className={styles.ellipsis} aria-hidden="true">
                    <MoreHorizontal size={14} />
                  </span>
                ) : isLast ? (
                  <span className={styles.current} aria-current="page">
                    {item.label}
                  </span>
                ) : item.href ? (
                  <a
                    href={item.href}
                    className={styles.link}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </a>
                ) : (
                  <button
                    type="button"
                    className={styles.link}
                    onClick={item.onClick}
                  >
                    {item.label}
                  </button>
                )}
                {!isLast && (
                  <span className={styles.separator} aria-hidden="true">
                    {sep}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  },
);

Breadcrumb.displayName = "Breadcrumb";
