import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import styles from "./LayoutSidebar.module.css";

export interface LayoutSidebarProps extends HTMLAttributes<HTMLDivElement> {
  header?: ReactNode;
  footer?: ReactNode;
  collapsed?: boolean;
  onCollapse?: () => void;
  onExpand?: () => void;
}

export const LayoutSidebar = forwardRef<HTMLDivElement, LayoutSidebarProps>(
  ({ header, footer, collapsed = false, onCollapse, onExpand, className, children, ...rest }, ref) => {
    const CollapseIcon = collapsed ? ChevronsRight : ChevronsLeft;
    const collapseLabel = collapsed ? "사이드바 펼치기" : "사이드바 접기";
    const handleToggle = collapsed ? onExpand : onCollapse;

    return (
      <div
        ref={ref}
        className={[styles.sidebar, collapsed ? styles.sidebarCollapsed : "", className ?? ""]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {(header || handleToggle) && (
          <div className={styles.sidebarHeader}>
            {header && <div className={styles.headerContent}>{header}</div>}
            {handleToggle && (
              <button
                className={styles.collapseBtn}
                onClick={handleToggle}
                aria-label={collapseLabel}
              >
                <CollapseIcon size={18} />
              </button>
            )}
          </div>
        )}
        <div className={styles.sidebarContent}>{children}</div>
        {footer && <div className={styles.sidebarFooter}>{footer}</div>}
      </div>
    );
  },
);
LayoutSidebar.displayName = "LayoutSidebar";

export interface SidebarGroupProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
}

export const SidebarGroup = forwardRef<HTMLDivElement, SidebarGroupProps>(
  ({ label, className, children, ...rest }, ref) => (
    <div
      ref={ref}
      className={[styles.group, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {label && <div className={styles.groupLabel}>{label}</div>}
      {children}
    </div>
  ),
);
SidebarGroup.displayName = "SidebarGroup";

export interface SidebarItemProps extends HTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  icon?: ReactNode;
  tooltip?: string;
}

export const SidebarItem = forwardRef<HTMLButtonElement, SidebarItemProps>(
  ({ active = false, icon, tooltip, className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={[styles.item, active ? styles.itemActive : "", className ?? ""]
        .filter(Boolean)
        .join(" ")}
      data-tooltip={tooltip}
      {...rest}
    >
      <span className={styles.itemContent}>
        {icon && <span className={styles.itemIcon}>{icon}</span>}
        <span className={styles.itemLabel}>{children}</span>
      </span>
    </button>
  ),
);
SidebarItem.displayName = "SidebarItem";
