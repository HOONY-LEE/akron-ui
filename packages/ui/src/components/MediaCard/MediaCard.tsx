import React, { forwardRef } from "react";
import styles from "./MediaCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type MediaCardOrientation = "vertical" | "horizontal";
export type MediaCardSize = "sm" | "md" | "lg";

export interface MediaCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 미디어 요소 (img, video, AspectRatio 등) */
  media: React.ReactNode;
  /** 카드 제목 */
  title: React.ReactNode;
  /** 부제목 / 설명 */
  description?: React.ReactNode;
  /** 배지 / 태그 (미디어 위에 오버레이) */
  badge?: React.ReactNode;
  /** 제목 위 메타 정보 (날짜, 카테고리 등) */
  meta?: React.ReactNode;
  /** 하단 액션 (버튼, 링크 등) */
  footer?: React.ReactNode;
  /** 레이아웃 방향 */
  orientation?: MediaCardOrientation;
  /** 카드 크기 */
  size?: MediaCardSize;
  /** hover 효과 */
  hoverable?: boolean;
  /** 클릭 핸들러 */
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  /** 이미지 비율 (vertical 모드에서만 작동) */
  mediaRatio?: "video" | "square" | "portrait" | number;
}

// ─── MediaCard ────────────────────────────────────────────────────────────────

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(
  (
    {
      media,
      title,
      description,
      badge,
      meta,
      footer,
      orientation = "vertical",
      size = "md",
      hoverable = false,
      onClick,
      mediaRatio = "video",
      className,
      ...props
    },
    ref,
  ) => {
    const ratioMap: Record<string, number> = {
      video: 16 / 9,
      square: 1,
      portrait: 3 / 4,
    };

    const ratio =
      typeof mediaRatio === "string"
        ? (ratioMap[mediaRatio] ?? 16 / 9)
        : mediaRatio;

    const paddingTop = orientation === "vertical" ? `${(1 / ratio) * 100}%` : undefined;

    const classes = [
      styles.root,
      styles[`orientation-${orientation}`],
      styles[`size-${size}`],
      hoverable && styles.hoverable,
      onClick && styles.clickable,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={classes}
        onClick={onClick}
        role={onClick ? "button" : undefined}
        tabIndex={onClick ? 0 : undefined}
        onKeyDown={
          onClick
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") onClick(e as never);
              }
            : undefined
        }
        {...props}
      >
        {/* Media area */}
        <div
          className={styles.mediaWrap}
          style={paddingTop ? { paddingTop } : undefined}
        >
          <div className={orientation === "vertical" ? styles.mediaInner : styles.mediaInnerH}>
            {media}
          </div>
          {badge && <div className={styles.badge}>{badge}</div>}
        </div>

        {/* Content area */}
        <div className={styles.content}>
          {meta && <div className={styles.meta}>{meta}</div>}
          <div className={styles.title}>{title}</div>
          {description && <div className={styles.description}>{description}</div>}
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    );
  },
);

MediaCard.displayName = "MediaCard";
