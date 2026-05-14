import { forwardRef, useMemo, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  MessageSquare,
  UserPlus,
  RefreshCw,
  Upload,
} from "lucide-react";
import styles from "./ActivityFeed.module.css";

export type ActivityType =
  | "create"
  | "update"
  | "delete"
  | "comment"
  | "assign"
  | "status"
  | "upload"
  | "custom";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  user: string;
  avatar?: string;
  message: string;
  detail?: string;
  timestamp: string | Date;
  icon?: React.ReactNode;
}

export type ActivityFeedSize = "sm" | "md";

export interface ActivityFeedProps
  extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
  size?: ActivityFeedSize;
  /** Show connecting vertical line. Default true */
  showTimeline?: boolean;
  /** Show avatar. Default true */
  showAvatar?: boolean;
  /** Limit displayed items */
  maxItems?: number;
  onItemClick?: (item: ActivityItem) => void;
  /** Empty state message. Default '활동 내역이 없습니다.' */
  emptyMessage?: string;
  /** Group items by date. Default false */
  groupByDate?: boolean;
}

/* ── Helpers ── */

const ICON_MAP: Record<Exclude<ActivityType, "custom">, React.ReactNode> = {
  create: <Plus />,
  update: <Edit2 />,
  delete: <Trash2 />,
  comment: <MessageSquare />,
  assign: <UserPlus />,
  status: <RefreshCw />,
  upload: <Upload />,
};

const COLOR_MAP: Record<
  Exclude<ActivityType, "custom">,
  string
> = {
  create: styles.colorSuccess,
  update: styles.colorPrimary,
  delete: styles.colorError,
  comment: styles.colorInfo,
  assign: styles.colorWarning,
  status: styles.colorPrimary,
  upload: styles.colorInfo,
};

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) return "방금";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;

  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}.${m}.${d}`;
}

function toDate(ts: string | Date): Date {
  return ts instanceof Date ? ts : new Date(ts);
}

function getDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getDateLabel(dateKey: string): string {
  const today = new Date();
  const todayKey = getDateKey(today);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayKey = getDateKey(yesterday);

  if (dateKey === todayKey) return "오늘";
  if (dateKey === yesterdayKey) return "어제";
  return dateKey.replace(/-/g, ".");
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

/* ── Component ── */

export const ActivityFeed = forwardRef<HTMLDivElement, ActivityFeedProps>(
  (
    {
      items,
      size = "md",
      showTimeline = true,
      showAvatar = true,
      maxItems,
      onItemClick,
      emptyMessage = "활동 내역이 없습니다.",
      groupByDate = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const [expanded, setExpanded] = useState(false);

    const visibleItems = useMemo(() => {
      if (!maxItems || expanded) return items;
      return items.slice(0, maxItems);
    }, [items, maxItems, expanded]);

    const hiddenCount = maxItems && !expanded ? Math.max(0, items.length - maxItems) : 0;

    const grouped = useMemo(() => {
      if (!groupByDate) return null;
      const map = new Map<string, ActivityItem[]>();
      for (const item of visibleItems) {
        const key = getDateKey(toDate(item.timestamp));
        const arr = map.get(key);
        if (arr) arr.push(item);
        else map.set(key, [item]);
      }
      return map;
    }, [groupByDate, visibleItems]);

    if (items.length === 0) {
      return (
        <div
          ref={ref}
          className={[styles.root, className].filter(Boolean).join(" ")}
          {...rest}
        >
          <div className={styles.empty}>{emptyMessage}</div>
        </div>
      );
    }

    const renderItem = (item: ActivityItem, idx: number, total: number) => {
      const isLast = idx === total - 1 && hiddenCount === 0;
      const date = toDate(item.timestamp);
      const iconNode =
        item.type === "custom" ? item.icon ?? <Plus /> : ICON_MAP[item.type];
      const colorClass =
        item.type === "custom" ? styles.colorPrimary : COLOR_MAP[item.type];

      return (
        <div
          key={item.id}
          className={[styles.item, onItemClick ? styles.clickable : ""]
            .filter(Boolean)
            .join(" ")}
          onClick={onItemClick ? () => onItemClick(item) : undefined}
          role={onItemClick ? "button" : undefined}
          tabIndex={onItemClick ? 0 : undefined}
          onKeyDown={
            onItemClick
              ? (e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onItemClick(item);
                  }
                }
              : undefined
          }
        >
          {/* Timeline track */}
          {showTimeline && (
            <div className={styles.timeline}>
              <div className={[styles.iconDot, colorClass].join(" ")}>
                {iconNode}
              </div>
              {!isLast && <div className={styles.timelineConnector} />}
            </div>
          )}

          {/* Avatar */}
          {showAvatar && (
            <div className={styles.avatar}>
              {item.avatar ? (
                <img
                  className={styles.avatarImg}
                  src={item.avatar}
                  alt={item.user}
                />
              ) : (
                getInitials(item.user)
              )}
            </div>
          )}

          {/* Content */}
          <div className={styles.content}>
            <div className={styles.contentHeader}>
              <span className={styles.user}>{item.user}</span>
              <span className={styles.timestamp}>{getRelativeTime(date)}</span>
            </div>
            <span className={styles.message}>{item.message}</span>
            {item.detail && (
              <span className={styles.detail}>{item.detail}</span>
            )}
          </div>
        </div>
      );
    };

    const rootCls = [
      styles.root,
      size === "sm" ? styles.sm : "",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        {grouped
          ? Array.from(grouped.entries()).map(([dateKey, groupItems]) => (
              <div key={dateKey} className={styles.dateGroup}>
                <div className={styles.dateGroupLabel}>
                  {getDateLabel(dateKey)}
                </div>
                {groupItems.map((item, idx) =>
                  renderItem(item, idx, groupItems.length),
                )}
              </div>
            ))
          : visibleItems.map((item, idx) =>
              renderItem(item, idx, visibleItems.length),
            )}

        {hiddenCount > 0 && (
          <button
            type="button"
            className={styles.showMore}
            onClick={() => setExpanded(true)}
          >
            {hiddenCount}개 더 보기
          </button>
        )}
      </div>
    );
  },
);

ActivityFeed.displayName = "ActivityFeed";
