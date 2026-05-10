import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import styles from "./Header.module.css";

export interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: ReactNode;
  nav?: ReactNode;
  actions?: ReactNode;
  height?: number;
  sticky?: boolean;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ logo, nav, actions, height = 56, sticky = false, className, children, style, ...rest }, ref) => {
    const vars = { "--header-height": `${height}px` } as CSSProperties;

    return (
      <header
        ref={ref}
        className={[styles.header, sticky ? styles.sticky : "", className ?? ""]
          .filter(Boolean)
          .join(" ")}
        style={{ ...vars, ...style }}
        {...rest}
      >
        {logo && <div className={styles.logo}>{logo}</div>}
        {nav && <nav className={styles.nav}>{nav}</nav>}
        {children}
        {actions && <div className={styles.actions}>{actions}</div>}
      </header>
    );
  },
);

Header.displayName = "Header";
