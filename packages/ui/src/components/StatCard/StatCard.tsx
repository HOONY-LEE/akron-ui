import React, { forwardRef } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import styles from "./StatCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatCardTrend = "up" | "down" | "neutral";
export type StatCardSize = "sm" | "md" | "lg";
export type StatCardVariant = "default" | "filled" | "outline";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 제목 */
  title: string;
  /** 값 */
  value: string | number;
  /** 단위 (e.g. "원", "%", "명") */
  unit?: string;
  /** 트렌드 방향 */
  trend?: StatCardTrend;
  /** 트렌드 값 텍스트 (e.g. "+12.5%") */
  trendLabel?: string;
  /** 비교 설명 (e.g. "지난주 대비") */
  trendDesc?: string;
  /** 아이콘 */
  icon?: React.ReactNode;
  /** 아이콘 배경 색 (CSS 색상 값 또는 'primary'|'success'|'warning'|'error') */
  iconColor?: "primary" | "success" | "warning" | "error" | string;
  /** 추가 설명 */
  description?: string;
  /** 크기 */
  size?: StatCardSize;
  /** 변형 */
  variant?: StatCardVariant;
  /** 로딩 */
  loading?: boolean;
  /** 클릭 가능 */
  clickable?: boolean;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const StatCard = forwardRef<HTMLDivElement, StatCardProps>(
  (
    {
      title,
      value,
      unit,
      trend,
      trendLabel,
      trendDesc,
      icon,
      iconColor = "primary",
      description,
      size = "md",
      variant = "default",
      loading = false,
      clickable = false,
      className,
      ...rest
    },
    ref,
  ) => {
    const trendIcon = trend === "up"
      ? <TrendingUp size={13} />
      : trend === "down"
        ? <TrendingDown size={13} />
        : <Minus size={13} />;

    const isSemanticColor = ["primary", "success", "warning", "error"].includes(
      iconColor,
    );

    return (
      <div
        ref={ref}
        className={[
          styles.card,
          styles[size],
          styles[variant],
          clickable ? styles.clickable : "",
          loading ? styles.loading : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {/* Header row */}
        <div className={styles.header}>
          <span className={styles.title}>{title}</span>
          {icon && (
            <span
              className={[
                styles.iconBox,
                isSemanticColor ? styles[`icon_${iconColor}`] : "",
              ]
                .filter(Boolean)
                .join(" ")}
              style={!isSemanticColor ? { background: iconColor } : undefined}
            >
              {icon}
            </span>
          )}
        </div>

        {/* Value */}
        <div className={styles.valueRow}>
          {loading ? (
            <span className={styles.skeleton} />
          ) : (
            <>
              <span className={styles.value}>{value}</span>
              {unit && <span className={styles.unit}>{unit}</span>}
            </>
          )}
        </div>

        {/* Trend */}
        {(trend || trendLabel) && !loading && (
          <div className={styles.trendRow}>
            <span
              className={[
                styles.trendBadge,
                trend === "up" ? styles.trendUp : "",
                trend === "down" ? styles.trendDown : "",
                trend === "neutral" ? styles.trendNeutral : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {trendIcon}
              {trendLabel && <span>{trendLabel}</span>}
            </span>
            {trendDesc && <span className={styles.trendDesc}>{trendDesc}</span>}
          </div>
        )}

        {/* Description */}
        {description && !loading && (
          <p className={styles.description}>{description}</p>
        )}
      </div>
    );
  },
);

StatCard.displayName = "StatCard";
