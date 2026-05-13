import { forwardRef } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import styles from "./Pagination.module.css";

export type PaginationSize = "sm" | "md" | "lg";
export type PaginationVariant = "outline" | "ghost" | "solid";

export interface PaginationProps {
  /** 현재 페이지 (1-based) */
  page: number;
  /** 전체 페이지 수 */
  totalPages: number;
  /** 페이지 변경 핸들러 */
  onPageChange: (page: number) => void;
  /** 표시할 페이지 번호 개수 */
  siblingCount?: number;
  /** 크기 */
  size?: PaginationSize;
  /** 변형 */
  variant?: PaginationVariant;
  /** 이전/다음 버튼 숨김 */
  hideArrows?: boolean;
  className?: string;
}

/** Generates the pagination range with dots */
function usePaginationRange(
  page: number,
  totalPages: number,
  siblingCount: number,
): (number | "dots")[] {
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const totalButtons = siblingCount * 2 + 5; // siblings + current + 2 edges + 2 dots

  if (totalPages <= totalButtons) {
    return range(1, totalPages);
  }

  const leftSibling = Math.max(page - siblingCount, 1);
  const rightSibling = Math.min(page + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftCount = 3 + siblingCount * 2;
    return [...range(1, leftCount), "dots", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightCount = 3 + siblingCount * 2;
    return [1, "dots", ...range(totalPages - rightCount + 1, totalPages)];
  }

  return [1, "dots", ...range(leftSibling, rightSibling), "dots", totalPages];
}

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      page,
      totalPages,
      onPageChange,
      siblingCount = 1,
      size = "md",
      variant = "outline",
      hideArrows = false,
      className,
    },
    ref,
  ) => {
    const paginationRange = usePaginationRange(page, totalPages, siblingCount);

    if (totalPages <= 1) return null;

    return (
      <nav
        ref={ref}
        aria-label="페이지네이션"
        className={[
          styles.nav,
          styles[size],
          styles[variant],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {!hideArrows && (
          <button
            className={[styles.btn, styles.arrow].join(" ")}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
            aria-label="이전 페이지"
          >
            <ChevronLeft />
          </button>
        )}

        {paginationRange.map((item, i) =>
          item === "dots" ? (
            <span key={`dots-${i}`} className={styles.dots}>
              <MoreHorizontal />
            </span>
          ) : (
            <button
              key={item}
              className={[styles.btn, page === item ? styles.active : ""].join(" ")}
              onClick={() => onPageChange(item)}
              aria-label={`${item} 페이지`}
              aria-current={page === item ? "page" : undefined}
            >
              {item}
            </button>
          ),
        )}

        {!hideArrows && (
          <button
            className={[styles.btn, styles.arrow].join(" ")}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= totalPages}
            aria-label="다음 페이지"
          >
            <ChevronRight />
          </button>
        )}
      </nav>
    );
  },
);

Pagination.displayName = "Pagination";
