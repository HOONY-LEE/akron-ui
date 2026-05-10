import { forwardRef, type HTMLAttributes } from "react";
import styles from "./PageContainer.module.css";

export type ContainerSize = "sm" | "md" | "lg" | "xl" | "full";

export interface PageContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
}

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ size = "lg", className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.container, styles[size], className ?? ""]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </div>
  ),
);

PageContainer.displayName = "PageContainer";
