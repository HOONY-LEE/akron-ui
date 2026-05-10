import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  clickable?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ clickable = false, className, children, ...rest }, ref) => {
    const cls = [
      styles.card,
      clickable ? styles.clickable : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={cls}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

Card.displayName = "Card";
