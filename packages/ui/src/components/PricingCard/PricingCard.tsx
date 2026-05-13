import React, { forwardRef } from "react";
import { Check, X, Minus } from "lucide-react";
import styles from "./PricingCard.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PricingCardVariant = "default" | "featured" | "outline";

export interface PricingFeature {
  text: string;
  included?: boolean | "partial";
  tooltip?: string;
}

export interface PricingCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** 플랜 이름 */
  name: string;
  /** 가격 (숫자 또는 문자열) */
  price: number | string;
  /** 통화 기호 */
  currency?: string;
  /** 청구 주기 텍스트 */
  period?: string;
  /** 설명 */
  description?: string;
  /** 배지 텍스트 (예: "가장 인기") */
  badge?: string;
  /** 기능 목록 */
  features?: PricingFeature[];
  /** CTA 버튼 텍스트 */
  ctaLabel?: string;
  /** CTA 클릭 핸들러 */
  onCtaClick?: () => void;
  /** CTA 비활성화 */
  ctaDisabled?: boolean;
  /** 변형 */
  variant?: PricingCardVariant;
  /** 헤더 아이콘 */
  icon?: React.ReactNode;
}

// ─── Feature row icon ─────────────────────────────────────────────────────────

function FeatureIcon({ included }: { included?: boolean | "partial" }) {
  if (included === false)
    return (
      <span className={[styles.featureIcon, styles.featureNo].join(" ")}>
        <X size={13} />
      </span>
    );
  if (included === "partial")
    return (
      <span className={[styles.featureIcon, styles.featurePartial].join(" ")}>
        <Minus size={13} />
      </span>
    );
  return (
    <span className={[styles.featureIcon, styles.featureYes].join(" ")}>
      <Check size={13} />
    </span>
  );
}

// ─── PricingCard ──────────────────────────────────────────────────────────────

export const PricingCard = forwardRef<HTMLDivElement, PricingCardProps>(
  (
    {
      name,
      price,
      currency = "₩",
      period = "/ 월",
      description,
      badge,
      features = [],
      ctaLabel = "시작하기",
      onCtaClick,
      ctaDisabled = false,
      variant = "default",
      icon,
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.root,
      styles[`variant-${variant}`],
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const priceFormatted =
      typeof price === "number"
        ? price === 0
          ? "무료"
          : price.toLocaleString("ko-KR")
        : price;

    return (
      <div ref={ref} className={classes} {...props}>
        {/* Badge */}
        {badge && <div className={styles.badge}>{badge}</div>}

        {/* Header */}
        <div className={styles.header}>
          {icon && <div className={styles.icon}>{icon}</div>}
          <div className={styles.planName}>{name}</div>
          {description && (
            <div className={styles.description}>{description}</div>
          )}
        </div>

        {/* Price */}
        <div className={styles.priceArea}>
          {typeof price === "number" && price !== 0 ? (
            <>
              <span className={styles.currency}>{currency}</span>
              <span className={styles.price}>{priceFormatted}</span>
              <span className={styles.period}>{period}</span>
            </>
          ) : (
            <span className={styles.price}>{priceFormatted}</span>
          )}
        </div>

        {/* CTA */}
        <button
          type="button"
          className={[
            styles.cta,
            variant === "featured" ? styles.ctaFeatured : styles.ctaDefault,
          ].join(" ")}
          onClick={onCtaClick}
          disabled={ctaDisabled}
        >
          {ctaLabel}
        </button>

        {/* Feature divider */}
        {features.length > 0 && <div className={styles.divider} />}

        {/* Features */}
        {features.length > 0 && (
          <ul className={styles.featureList}>
            {features.map((f, i) => (
              <li key={i} className={styles.feature}>
                <FeatureIcon included={f.included !== false ? f.included ?? true : false} />
                <span
                  className={[
                    styles.featureText,
                    f.included === false && styles.featureTextNo,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {f.text}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  },
);

PricingCard.displayName = "PricingCard";
