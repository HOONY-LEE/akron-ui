import {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Bell, BellOff, Check, Settings, X } from "lucide-react";
import styles from "./NotificationBell.module.css";

export interface NotificationBellItem {
  id: string;
  title: string;
  message?: string;
  timestamp: string | Date;
  read?: boolean;
  type?: "info" | "success" | "warning" | "error";
  icon?: ReactNode;
  onClick?: () => void;
}

export type NotificationBellSize = "sm" | "md" | "lg";

export interface NotificationBellProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  count?: number;
  maxCount?: number;
  notifications?: NotificationBellItem[];
  size?: NotificationBellSize;
  onMarkAllRead?: () => void;
  onClear?: () => void;
  onSettingsClick?: () => void;
  showDropdown?: boolean;
  onDropdownChange?: (open: boolean) => void;
  emptyMessage?: string;
  title?: string;
  muted?: boolean;
}

const iconSizeMap: Record<NotificationBellSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

function formatRelativeTime(date: string | Date): string {
  const now = Date.now();
  const target = new Date(date).getTime();
  const diff = now - target;
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return new Date(date).toLocaleDateString();
}

export const NotificationBell = forwardRef<
  HTMLDivElement,
  NotificationBellProps
>(
  (
    {
      count = 0,
      maxCount = 99,
      notifications = [],
      size = "md",
      onMarkAllRead,
      onClear,
      onSettingsClick,
      showDropdown: controlledOpen,
      onDropdownChange,
      emptyMessage = "알림이 없습니다.",
      title = "알림",
      muted = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = controlledOpen !== undefined;
    const [internalOpen, setInternalOpen] = useState(false);
    const open = isControlled ? controlledOpen : internalOpen;

    const rootRef = useRef<HTMLDivElement>(null);

    const setOpen = useCallback(
      (next: boolean) => {
        if (!isControlled) setInternalOpen(next);
        onDropdownChange?.(next);
      },
      [isControlled, onDropdownChange],
    );

    const toggleDropdown = useCallback(() => {
      setOpen(!open);
    }, [open, setOpen]);

    /* close on outside click */
    useEffect(() => {
      if (!open) return;
      const handler = (e: MouseEvent) => {
        if (
          rootRef.current &&
          !rootRef.current.contains(e.target as Node)
        ) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, setOpen]);

    /* close on Escape */
    useEffect(() => {
      if (!open) return;
      const handler = (e: KeyboardEvent) => {
        if (e.key === "Escape") setOpen(false);
      };
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }, [open, setOpen]);

    const displayCount =
      count > maxCount ? `${maxCount}+` : String(count);
    const BellIcon = muted ? BellOff : Bell;
    const iconPx = iconSizeMap[size];

    const rootCls = [styles.root, className ?? ""]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        <div ref={rootRef}>
          <button
            type="button"
            className={`${styles.button} ${styles[size]}`}
            onClick={toggleDropdown}
            aria-label={title}
            aria-expanded={open}
            aria-haspopup="true"
          >
            <BellIcon size={iconPx} />
            {count > 0 && (
              <span className={`${styles.badge} ${styles.pulse}`}>
                {displayCount}
              </span>
            )}
          </button>

          {open && (
            <div className={styles.dropdown} role="menu">
              {/* Header */}
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>{title}</span>
                <div className={styles.headerActions}>
                  {onMarkAllRead && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      onClick={onMarkAllRead}
                    >
                      <Check size={12} style={{ marginRight: 4 }} />
                      모두 읽음
                    </button>
                  )}
                  {onSettingsClick && (
                    <button
                      type="button"
                      className={styles.settingsBtn}
                      onClick={onSettingsClick}
                      aria-label="알림 설정"
                    >
                      <Settings size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* Notification list */}
              {notifications.length > 0 ? (
                <div className={styles.notificationList}>
                  {notifications.map((item) => (
                    <div
                      key={item.id}
                      className={`${styles.notification}${
                        !item.read ? ` ${styles.unread}` : ""
                      }`}
                      role="menuitem"
                      tabIndex={0}
                      onClick={() => item.onClick?.()}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          item.onClick?.();
                        }
                      }}
                    >
                      {item.icon ? (
                        <span className={styles.typeDot}>{item.icon}</span>
                      ) : (
                        item.type && (
                          <span
                            className={`${styles.typeDot} ${
                              styles[item.type]
                            }`}
                          />
                        )
                      )}
                      <div className={styles.notifContent}>
                        <p className={styles.notifTitle}>{item.title}</p>
                        {item.message && (
                          <p className={styles.notifMessage}>
                            {item.message}
                          </p>
                        )}
                        <p className={styles.notifTime}>
                          {formatRelativeTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.empty}>{emptyMessage}</div>
              )}

              {/* Footer */}
              {onClear && notifications.length > 0 && (
                <div className={styles.footer}>
                  <button
                    type="button"
                    className={styles.actionBtn}
                    onClick={onClear}
                  >
                    <X size={12} style={{ marginRight: 4 }} />
                    모두 지우기
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  },
);

NotificationBell.displayName = "NotificationBell";
