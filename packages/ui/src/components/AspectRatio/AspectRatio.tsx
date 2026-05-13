import React, { forwardRef } from "react";
import styles from "./AspectRatio.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AspectRatioProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * 가로:세로 비율. 숫자(예: 16/9) 또는 미리 정의된 문자열
   * @default 1
   */
  ratio?: number | "square" | "video" | "portrait" | "wide" | "ultrawide";
  /** 자식 요소 */
  children: React.ReactNode;
}

const RATIO_MAP: Record<string, number> = {
  square: 1,
  video: 16 / 9,
  portrait: 3 / 4,
  wide: 21 / 9,
  ultrawide: 32 / 9,
};

// ─── AspectRatio ──────────────────────────────────────────────────────────────

export const AspectRatio = forwardRef<HTMLDivElement, AspectRatioProps>(
  ({ ratio = 1, className, style, children, ...props }, ref) => {
    const numericRatio =
      typeof ratio === "string" ? (RATIO_MAP[ratio] ?? 1) : ratio;

    const paddingTop = `${(1 / numericRatio) * 100}%`;

    return (
      <div
        ref={ref}
        className={[styles.root, className].filter(Boolean).join(" ")}
        style={{ ...style, "--aspect-padding": paddingTop } as React.CSSProperties}
        {...props}
      >
        <div className={styles.inner}>{children}</div>
      </div>
    );
  },
);

AspectRatio.displayName = "AspectRatio";
