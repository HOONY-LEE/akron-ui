import React, { forwardRef } from "react";
import { Clock, MapPin } from "lucide-react";
import styles from "./EventCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 제목 */
  title: string;
  /** 날짜 */
  date: Date;
  /** 시간 텍스트 (예: "14:00 - 15:30") */
  time?: string;
  /** 장소 */
  location?: string;
  /** 설명 */
  description?: string;
  /** 날짜 사이드바 색상 */
  color?: string;
  /** 크기 */
  size?: "sm" | "md" | "lg";
}

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

// ─── Component ────────────────────────────────────────────────────────────────

export const EventCard = forwardRef<HTMLDivElement, EventCardProps>(
  (
    {
      title,
      date,
      time,
      location,
      description,
      color = "var(--akron-primary)",
      size = "md",
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <div
          className={styles.dateSidebar}
          style={{ backgroundColor: color, color: "white" }}
        >
          <span className={styles.dateMonth}>{MONTHS[date.getMonth()]}</span>
          <span className={styles.dateDay}>{date.getDate()}</span>
        </div>
        <div className={styles.content}>
          <h4 className={styles.title}>{title}</h4>
          <div className={styles.meta}>
            {time && (
              <span className={styles.metaItem}>
                <Clock size={13} /> {time}
              </span>
            )}
            {location && (
              <span className={styles.metaItem}>
                <MapPin size={13} /> {location}
              </span>
            )}
          </div>
          {description && <p className={styles.description}>{description}</p>}
        </div>
      </div>
    );
  }
);

EventCard.displayName = "EventCard";
