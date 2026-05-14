import React, { forwardRef } from "react";
import { ExternalLink } from "lucide-react";
import styles from "./LinkPreview.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LinkPreviewProps
  extends Omit<React.HTMLAttributes<HTMLAnchorElement>, "title"> {
  /** URL */
  url: string;
  /** 제목 */
  title: string;
  /** 설명 */
  description?: string;
  /** 이미지 URL */
  imageUrl?: string;
  /** 사이트 이름 */
  siteName?: string;
  /** 파비콘 URL */
  faviconUrl?: string;
  /** 새 탭에서 열기 */
  openInNewTab?: boolean;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 레이아웃 */
  layout?: "horizontal" | "vertical";
}

// ─── Component ────────────────────────────────────────────────────────────────

export const LinkPreview = forwardRef<HTMLAnchorElement, LinkPreviewProps>(
  (
    {
      url,
      title,
      description,
      imageUrl,
      siteName,
      faviconUrl,
      openInNewTab = true,
      size = "md",
      layout = "horizontal",
      className,
      ...rest
    },
    ref
  ) => {
    const hostname = (() => {
      try {
        return new URL(url).hostname;
      } catch {
        return url;
      }
    })();

    return (
      <a
        ref={ref}
        href={url}
        target={openInNewTab ? "_blank" : undefined}
        rel={openInNewTab ? "noopener noreferrer" : undefined}
        className={`${styles.wrapper} ${styles[size]} ${styles[layout]} ${className ?? ""}`}
        {...rest}
      >
        {imageUrl && (
          <div className={styles.imageContainer}>
            <img src={imageUrl} alt={title} className={styles.image} />
          </div>
        )}
        <div className={styles.content}>
          <div className={styles.meta}>
            {faviconUrl && (
              <img src={faviconUrl} alt="" className={styles.favicon} />
            )}
            <span className={styles.siteName}>{siteName || hostname}</span>
            <ExternalLink size={12} className={styles.externalIcon} />
          </div>
          <h4 className={styles.title}>{title}</h4>
          {description && <p className={styles.description}>{description}</p>}
          <span className={styles.url}>{url}</span>
        </div>
      </a>
    );
  }
);

LinkPreview.displayName = "LinkPreview";
