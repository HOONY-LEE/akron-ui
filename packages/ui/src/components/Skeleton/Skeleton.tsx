import { forwardRef } from "react";
import styles from "./Skeleton.module.css";

export type SkeletonVariant = "text" | "circle" | "rect";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 가로 크기 */
  width?: string | number;
  /** 세로 크기 */
  height?: string | number;
  /** 모양 (text: 둥근 직사각형, circle: 원형, rect: 직사각형) */
  variant?: SkeletonVariant;
  /** 애니메이션 비활성화 */
  animated?: boolean;
  className?: string;
}

function toSize(val: string | number | undefined): string | undefined {
  if (val == null) return undefined;
  return typeof val === "number" ? `${val}px` : val;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    {
      width,
      height,
      variant = "rect",
      animated = true,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        aria-hidden="true"
        className={[
          styles.skeleton,
          styles[variant],
          animated ? styles.animated : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        style={{
          width: toSize(width),
          height: toSize(height),
          ...style,
        }}
        {...rest}
      />
    );
  },
);

Skeleton.displayName = "Skeleton";
