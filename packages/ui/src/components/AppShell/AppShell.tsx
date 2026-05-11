import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from "react";
import styles from "./AppShell.module.css";

export interface AppShellProps extends HTMLAttributes<HTMLDivElement> {
  sidebar?: ReactNode;
  sidebarWidth?: number;
  sidebarCollapsed?: boolean;
  sidebarOpen?: boolean;
  onSidebarClose?: () => void;
}

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      sidebar,
      sidebarWidth = 260,
      sidebarCollapsed = false,
      sidebarOpen = false,
      onSidebarClose,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) => {
    const vars = {
      "--app-shell-sidebar-width": `${sidebarWidth}px`,
    } as CSSProperties;

    const shellClasses = [
      styles.shell,
      !sidebar ? styles.noSidebar : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={shellClasses} style={{ ...vars, ...style }} {...rest}>
        {sidebar && (
          <>
            <aside
              className={[
                styles.aside,
                sidebarCollapsed ? styles.asideCollapsed : "",
                sidebarOpen ? styles.asideOpen : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {sidebar}
            </aside>
            {sidebarOpen && onSidebarClose && (
              <div
                className={styles.overlay}
                onClick={onSidebarClose}
                aria-hidden="true"
              />
            )}
          </>
        )}

        <div
          data-appshell-body
          className={[
            styles.body,
            sidebar && sidebarCollapsed ? styles.bodyCollapsed : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {children}
        </div>
      </div>
    );
  },
);

AppShell.displayName = "AppShell";
