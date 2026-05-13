import { forwardRef } from "react";
import styles from "./Spinner.module.css";

export type SpinnerSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SpinnerColor = "primary" | "current" | "white";

export interface SpinnerProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 크기 */
  size?: SpinnerSize;
  /** 색상 */
  color?: SpinnerColor;
  /** 접근성 레이블 */
  label?: string;
  className?: string;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  (
    { size = "md", color = "primary", label = "로딩 중", className, ...rest },
    ref,
  ) => {
    return (
      <span
        ref={ref}
        role="status"
        aria-label={label}
        className={[
          styles.spinner,
          styles[size],
          styles[color],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <span className={styles.sr}>{label}</span>
      </span>
    );
  },
);

Spinner.displayName = "Spinner";
