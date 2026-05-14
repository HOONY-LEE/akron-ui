import React, { forwardRef } from "react";
import styles from "./AvatarStack.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AvatarStackItem {
  /** 이름 */
  name: string;
  /** 이미지 URL */
  src?: string;
  /** 배경 색상 (이미지 없을 때) */
  color?: string;
}

export interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 아바타 목록 */
  items: AvatarStackItem[];
  /** 최대 표시 수 */
  max?: number;
  /** 크기 */
  size?: "sm" | "md" | "lg" | "xl";
  /** 겹침 정도 (px) */
  overlap?: number;
  /** 나머지 인원 클릭 핸들러 */
  onOverflowClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

const sizeMap = { sm: 28, md: 36, lg: 44, xl: 56 };

// ─── Component ────────────────────────────────────────────────────────────────

export const AvatarStack = forwardRef<HTMLDivElement, AvatarStackProps>(
  (
    {
      items,
      max = 5,
      size = "md",
      overlap,
      onOverflowClick,
      className,
      ...rest
    },
    ref
  ) => {
    const avatarSize = sizeMap[size];
    const effectiveOverlap = overlap ?? Math.round(avatarSize * 0.3);
    const visibleItems = items.slice(0, max);
    const overflowCount = items.length - max;

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        {visibleItems.map((item, i) => (
          <div
            key={i}
            className={styles.avatar}
            style={{
              width: avatarSize,
              height: avatarSize,
              marginLeft: i > 0 ? -effectiveOverlap : 0,
              zIndex: visibleItems.length - i,
            }}
            title={item.name}
          >
            {item.src ? (
              <img src={item.src} alt={item.name} className={styles.avatarImg} />
            ) : (
              <span
                className={styles.avatarInitials}
                style={{ backgroundColor: item.color || "var(--akron-primary)" }}
              >
                {getInitials(item.name)}
              </span>
            )}
          </div>
        ))}

        {overflowCount > 0 && (
          <button
            type="button"
            className={styles.overflow}
            style={{
              width: avatarSize,
              height: avatarSize,
              marginLeft: -effectiveOverlap,
              zIndex: 0,
            }}
            onClick={onOverflowClick}
            title={`${overflowCount}명 더`}
          >
            +{overflowCount}
          </button>
        )}
      </div>
    );
  }
);

AvatarStack.displayName = "AvatarStack";
