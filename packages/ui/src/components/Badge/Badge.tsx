import { forwardRef } from "react";
import styles from "./Badge.module.css";

export type BadgeVariant = "solid" | "subtle" | "outline";
export type BadgeColor =
  | "primary"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 시각적 스타일 */
  variant?: BadgeVariant;
  /** 색상 테마 */
  color?: BadgeColor;
  /** 크기 */
  size?: BadgeSize;
  /** 점(dot) 표시 */
  dot?: boolean;
  /** 카운트 숫자 (숫자가 99 초과하면 "99+" 표시) */
  count?: number;
  /** count 최대값 (기본 99) */
  maxCount?: number;
  children?: React.ReactNode;
  className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = "subtle",
      color = "neutral",
      size = "md",
      dot = false,
      count,
      maxCount = 99,
      children,
      className,
      ...rest
    },
    ref,
  ) => {
    const displayCount =
      count != null
        ? count > maxCount
          ? `${maxCount}+`
          : String(count)
        : undefined;

    return (
      <span
        ref={ref}
        className={[
          styles.badge,
          styles[variant],
          styles[color],
          styles[size],
          dot ? styles.dot : "",
          count != null ? styles.count : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {dot ? null : displayCount ?? children}
      </span>
    );
  },
);

Badge.displayName = "Badge";
