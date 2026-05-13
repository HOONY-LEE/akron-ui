import React, { forwardRef, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Bell, Check, CheckCheck, Trash2, X } from "lucide-react";
import styles from "./NotificationCenter.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = "info" | "success" | "warning" | "error";

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time?: string;
  type?: NotificationType;
  read?: boolean;
  icon?: React.ReactNode;
  avatar?: string;
  onClick?: () => void;
}

export interface NotificationCenterProps {
  /** 알림 목록 */
  notifications: NotificationItem[];
  /** 읽음 처리 핸들러 */
  onMarkAsRead?: (id: string) => void;
  /** 전체 읽음 처리 핸들러 */
  onMarkAllAsRead?: () => void;
  /** 삭제 핸들러 */
  onDelete?: (id: string) => void;
  /** 전체 삭제 핸들러 */
  onClearAll?: () => void;
  /** 알림 패널 제목 */
  title?: string;
  /** 커스텀 트리거 */
  trigger?: React.ReactNode;
  /** 알림 없을 때 메시지 */
  emptyMessage?: string;
  /** 최대 높이 */
  maxHeight?: number | string;
}

// ─── Type colors ─────────────────────────────────────────────────────────────

const TYPE_DOT_CLASS: Record<NotificationType, string> = {
  info: styles.dotInfo,
  success: styles.dotSuccess,
  warning: styles.dotWarning,
  error: styles.dotError,
};

// ─── NotificationCenter ───────────────────────────────────────────────────────

export const NotificationCenter = forwardRef<HTMLDivElement, NotificationCenterProps>(
  (
    {
      notifications,
      onMarkAsRead,
      onMarkAllAsRead,
      onDelete,
      onClearAll,
      title = "알림",
      trigger,
      emptyMessage = "새로운 알림이 없습니다",
      maxHeight = 400,
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const unreadCount = notifications.filter((n) => !n.read).length;

    const defaultTrigger = (
      <button type="button" className={styles.bellBtn} aria-label="알림">
        <Bell size={20} />
        {unreadCount > 0 && (
          <span className={styles.badge}>
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>
    );

    return (
      <div ref={ref}>
        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            {trigger ?? defaultTrigger}
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={styles.content}
              align="end"
              sideOffset={8}
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {/* Header */}
              <div className={styles.header}>
                <div className={styles.headerLeft}>
                  <span className={styles.headerTitle}>{title}</span>
                  {unreadCount > 0 && (
                    <span className={styles.unreadPill}>{unreadCount}</span>
                  )}
                </div>
                <div className={styles.headerActions}>
                  {unreadCount > 0 && onMarkAllAsRead && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      title="전체 읽음"
                      onClick={onMarkAllAsRead}
                    >
                      <CheckCheck size={14} />
                    </button>
                  )}
                  {notifications.length > 0 && onClearAll && (
                    <button
                      type="button"
                      className={styles.actionBtn}
                      title="전체 삭제"
                      onClick={onClearAll}
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>

              {/* List */}
              <div
                className={styles.list}
                style={{ maxHeight }}
              >
                {notifications.length === 0 ? (
                  <div className={styles.empty}>
                    <Bell size={32} strokeWidth={1.5} />
                    <span>{emptyMessage}</span>
                  </div>
                ) : (
                  notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={[
                        styles.item,
                        !notif.read ? styles.unread : "",
                        notif.onClick ? styles.clickable : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={() => {
                        notif.onClick?.();
                        if (!notif.read) onMarkAsRead?.(notif.id);
                      }}
                    >
                      {/* Left: avatar or type dot */}
                      <div className={styles.itemLeft}>
                        {notif.avatar ? (
                          <img
                            src={notif.avatar}
                            alt=""
                            className={styles.avatar}
                          />
                        ) : notif.icon ? (
                          <span
                            className={[
                              styles.iconWrapper,
                              notif.type ? styles[`icon_${notif.type}`] : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          >
                            {notif.icon}
                          </span>
                        ) : (
                          <span
                            className={[
                              styles.dot,
                              notif.type
                                ? TYPE_DOT_CLASS[notif.type]
                                : styles.dotInfo,
                            ]
                              .filter(Boolean)
                              .join(" ")}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className={styles.itemContent}>
                        <div className={styles.itemHeader}>
                          <span className={styles.itemTitle}>{notif.title}</span>
                          {notif.time && (
                            <span className={styles.itemTime}>{notif.time}</span>
                          )}
                        </div>
                        {notif.description && (
                          <span className={styles.itemDesc}>
                            {notif.description}
                          </span>
                        )}
                      </div>

                      {/* Right actions */}
                      <div
                        className={styles.itemActions}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {!notif.read && onMarkAsRead && (
                          <button
                            type="button"
                            className={styles.itemActionBtn}
                            title="읽음 처리"
                            onClick={() => onMarkAsRead(notif.id)}
                          >
                            <Check size={12} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            type="button"
                            className={styles.itemActionBtn}
                            title="삭제"
                            onClick={() => onDelete(notif.id)}
                          >
                            <X size={12} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    );
  },
);

NotificationCenter.displayName = "NotificationCenter";
