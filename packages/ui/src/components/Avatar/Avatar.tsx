import { forwardRef, useState } from "react";
import styles from "./Avatar.module.css";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type AvatarShape = "circle" | "square";
export type AvatarStatusColor = "online" | "offline" | "away" | "busy";

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 이미지 URL */
  src?: string;
  /** 이미지 alt 텍스트 */
  alt?: string;
  /** 이니셜 (src 없을 때 표시) */
  name?: string;
  /** 크기 */
  size?: AvatarSize;
  /** 모양 */
  shape?: AvatarShape;
  /** 상태 표시 점 */
  status?: AvatarStatusColor;
  /** 배경 색상 (커스텀 CSS 색상값) */
  bgColor?: string;
  className?: string;
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const AUTO_COLORS = [
  "var(--ark-color-primary-500)",
  "var(--ark-color-success-500)",
  "var(--ark-color-warning-500)",
  "var(--ark-color-error-500)",
  "var(--ark-color-info-500)",
];

function nameToColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AUTO_COLORS[Math.abs(hash) % AUTO_COLORS.length];
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      alt,
      name,
      size = "md",
      shape = "circle",
      status,
      bgColor,
      className,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;
    const initials = name ? getInitials(name) : null;
    const autoColor = name ? nameToColor(name) : undefined;

    return (
      <span
        ref={ref}
        className={[
          styles.avatar,
          styles[size],
          styles[shape],
          status ? styles.hasStatus : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt ?? name ?? "avatar"}
            className={styles.img}
            onError={() => setImgError(true)}
          />
        ) : (
          <span
            className={styles.fallback}
            style={{
              backgroundColor: bgColor ?? autoColor ?? "var(--ark-color-gray-400)",
            }}
          >
            {initials ?? <DefaultIcon />}
          </span>
        )}

        {status && (
          <span className={[styles.status, styles[status]].join(" ")} />
        )}
      </span>
    );
  },
);

Avatar.displayName = "Avatar";

function DefaultIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: "60%", height: "60%" }}>
      <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
    </svg>
  );
}

/* ── AvatarGroup ── */
export interface AvatarGroupProps {
  /** Avatar 엘리먼트 목록 */
  children: React.ReactNode;
  /** 최대 표시 개수 */
  max?: number;
  /** 크기 */
  size?: AvatarSize;
  className?: string;
}

export function AvatarGroup({ children, max, size = "md", className }: AvatarGroupProps) {
  const childArray = Array.isArray(children)
    ? children
    : children
    ? [children]
    : [];

  const visible = max != null ? childArray.slice(0, max) : childArray;
  const overflowCount = max != null ? Math.max(0, childArray.length - max) : 0;

  return (
    <span
      className={[styles.group, className ?? ""].filter(Boolean).join(" ")}
    >
      {visible.map((child, i) => (
        <span key={i} className={styles.groupItem}>
          {child}
        </span>
      ))}
      {overflowCount > 0 && (
        <span className={[styles.avatar, styles.overflow, styles[size], styles.circle].join(" ")}>
          <span
            className={styles.fallback}
            style={{ backgroundColor: "var(--ark-color-gray-300)", color: "var(--ark-color-gray-700)" }}
          >
            +{overflowCount}
          </span>
        </span>
      )}
    </span>
  );
}
