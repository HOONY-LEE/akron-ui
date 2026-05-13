import { forwardRef } from "react";
import styles from "./Timeline.module.css";

export type TimelineItemStatus = "completed" | "active" | "pending" | "error";

export interface TimelineItem {
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 시간/날짜 레이블 */
  time?: string;
  /** 상태 */
  status?: TimelineItemStatus;
  /** 커스텀 아이콘 */
  icon?: React.ReactNode;
}

export interface TimelineProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 타임라인 아이템 목록 */
  items: TimelineItem[];
  className?: string;
}

export const Timeline = forwardRef<HTMLDivElement, TimelineProps>(
  ({ items, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={[styles.timeline, className ?? ""].filter(Boolean).join(" ")}
        {...rest}
      >
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const status = item.status ?? "pending";

          return (
            <div key={idx} className={[styles.item, styles[status]].join(" ")}>
              {/* Left side: dot + connector */}
              <div className={styles.track}>
                <div className={styles.dot}>
                  {item.icon ?? null}
                </div>
                {!isLast && <div className={styles.connector} />}
              </div>

              {/* Right side: content */}
              <div className={styles.content}>
                <div className={styles.header}>
                  <span className={styles.title}>{item.title}</span>
                  {item.time && <span className={styles.time}>{item.time}</span>}
                </div>
                {item.description && (
                  <div className={styles.description}>{item.description}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  },
);

Timeline.displayName = "Timeline";
