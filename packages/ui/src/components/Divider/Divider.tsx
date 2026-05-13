import { forwardRef } from "react";
import styles from "./Divider.module.css";

export type DividerOrientation = "horizontal" | "vertical";
export type DividerVariant = "solid" | "dashed" | "dotted";

export interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 방향 */
  orientation?: DividerOrientation;
  /** 스타일 */
  variant?: DividerVariant;
  /** 레이블 텍스트 */
  label?: string;
  /** 레이블 위치 (horizontal만 해당) */
  labelPosition?: "start" | "center" | "end";
  className?: string;
}

export const Divider = forwardRef<HTMLDivElement, DividerProps>(
  (
    {
      orientation = "horizontal",
      variant = "solid",
      label,
      labelPosition = "center",
      className,
      ...rest
    },
    ref,
  ) => {
    const isHorizontal = orientation === "horizontal";

    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation={orientation}
        className={[
          styles.divider,
          styles[orientation],
          styles[variant],
          label ? styles.hasLabel : "",
          label ? styles[`label-${labelPosition}`] : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {label && isHorizontal && (
          <span className={styles.label}>{label}</span>
        )}
      </div>
    );
  },
);

Divider.displayName = "Divider";
