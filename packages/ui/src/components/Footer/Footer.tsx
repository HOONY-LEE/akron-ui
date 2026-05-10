import { forwardRef, type HTMLAttributes } from "react";
import styles from "./Footer.module.css";

export interface FooterProps extends HTMLAttributes<HTMLElement> {}

export const Footer = forwardRef<HTMLElement, FooterProps>(
  ({ className, children, ...rest }, ref) => (
    <footer
      ref={ref}
      className={[styles.footer, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </footer>
  ),
);

Footer.displayName = "Footer";
