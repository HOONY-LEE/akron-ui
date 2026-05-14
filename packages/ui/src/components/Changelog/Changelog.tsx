import React, { forwardRef } from "react";
import { Tag, Bug, Zap, Trash2, AlertTriangle, Plus } from "lucide-react";
import styles from "./Changelog.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ChangeType = "added" | "changed" | "fixed" | "removed" | "deprecated" | "security";

export interface ChangelogEntry {
  /** 변경 유형 */
  type: ChangeType;
  /** 변경 설명 */
  description: string;
}

export interface ChangelogRelease {
  /** 버전 */
  version: string;
  /** 릴리스 날짜 */
  date: string;
  /** 변경 내역 목록 */
  changes: ChangelogEntry[];
  /** 현재 버전 표시 */
  current?: boolean;
}

export interface ChangelogProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 릴리스 목록 */
  releases: ChangelogRelease[];
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 아이콘 표시 */
  showIcons?: boolean;
  /** 배지 색상 표시 */
  showBadges?: boolean;
}

const typeConfig: Record<ChangeType, { label: string; icon: React.ElementType }> = {
  added: { label: "추가", icon: Plus },
  changed: { label: "변경", icon: Zap },
  fixed: { label: "수정", icon: Bug },
  removed: { label: "삭제", icon: Trash2 },
  deprecated: { label: "지원 종료", icon: AlertTriangle },
  security: { label: "보안", icon: AlertTriangle },
};

// ─── Component ────────────────────────────────────────────────────────────────

export const Changelog = forwardRef<HTMLDivElement, ChangelogProps>(
  (
    {
      releases,
      size = "md",
      showIcons = true,
      showBadges = true,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        {releases.map((release, idx) => (
          <div key={release.version} className={styles.release}>
            <div className={styles.releaseHeader}>
              <div className={styles.versionRow}>
                <Tag size={14} className={styles.tagIcon} />
                <span className={styles.version}>{release.version}</span>
                {release.current && (
                  <span className={styles.currentBadge}>최신</span>
                )}
              </div>
              <span className={styles.date}>{release.date}</span>
            </div>

            <div className={styles.changeList}>
              {release.changes.map((change, i) => {
                const config = typeConfig[change.type];
                const Icon = config.icon;

                return (
                  <div key={i} className={styles.changeItem}>
                    {showBadges && (
                      <span className={`${styles.badge} ${styles[`badge-${change.type}`]}`}>
                        {showIcons && <Icon size={12} />}
                        {config.label}
                      </span>
                    )}
                    <span className={styles.changeDesc}>{change.description}</span>
                  </div>
                );
              })}
            </div>

            {idx < releases.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    );
  }
);

Changelog.displayName = "Changelog";
