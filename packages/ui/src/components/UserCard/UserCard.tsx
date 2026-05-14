import { forwardRef, useState } from "react";
import { Mail, Phone, MapPin, Building, ExternalLink } from "lucide-react";
import styles from "./UserCard.module.css";

export type UserCardSize = "sm" | "md" | "lg";
export type UserCardVariant = "default" | "compact" | "horizontal";

export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 사용자 이름 */
  name: string;
  /** 직책/역할 */
  role?: string;
  /** 부서 */
  department?: string;
  /** 이메일 */
  email?: string;
  /** 전화번호 */
  phone?: string;
  /** 위치 */
  location?: string;
  /** 아바타 이미지 URL */
  avatar?: string;
  /** 온라인 상태 */
  status?: "online" | "offline" | "away" | "busy";
  /** 카드 크기 */
  size?: UserCardSize;
  /** 카드 레이아웃 변형 */
  variant?: UserCardVariant;
  /** 이메일 클릭 핸들러 */
  onEmailClick?: () => void;
  /** 전화 클릭 핸들러 */
  onPhoneClick?: () => void;
  /** 하단 액션 영역 */
  actions?: React.ReactNode;
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

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const ICON_SIZES: Record<UserCardSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export const UserCard = forwardRef<HTMLDivElement, UserCardProps>(
  (
    {
      name,
      role,
      department,
      email,
      phone,
      location,
      avatar,
      status,
      size = "md",
      variant = "default",
      onEmailClick,
      onPhoneClick,
      actions,
      className,
      ...rest
    },
    ref,
  ) => {
    const [imgError, setImgError] = useState(false);
    const showImage = avatar && !imgError;
    const initials = getInitials(name);
    const autoColor = nameToColor(name);
    const iconSize = ICON_SIZES[size];

    const hasContactInfo = email || phone || location || department;

    const statusClass = status
      ? styles[
          `status${status.charAt(0).toUpperCase() + status.slice(1)}` as keyof typeof styles
        ]
      : "";

    return (
      <div
        ref={ref}
        className={[
          styles.root,
          styles[variant],
          styles[size],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        <div className={styles.avatarWrapper}>
          {showImage ? (
            <img
              src={avatar}
              alt={name}
              className={styles.avatar}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              className={styles.initials}
              style={{ backgroundColor: autoColor }}
            >
              {initials}
            </div>
          )}
          {status && (
            <span
              className={[styles.statusDot, statusClass]
                .filter(Boolean)
                .join(" ")}
            />
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          {role && <span className={styles.role}>{role}</span>}
          {variant !== "compact" && department && (
            <span className={styles.department}>{department}</span>
          )}
        </div>

        {variant !== "compact" && hasContactInfo && (
          <ul className={styles.contactList}>
            {email && (
              <li
                className={[
                  styles.contactItem,
                  onEmailClick ? styles.clickable : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={onEmailClick}
                role={onEmailClick ? "button" : undefined}
                tabIndex={onEmailClick ? 0 : undefined}
                onKeyDown={
                  onEmailClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onEmailClick();
                        }
                      }
                    : undefined
                }
              >
                <Mail size={iconSize} className={styles.contactIcon} />
                <span>{email}</span>
              </li>
            )}
            {phone && (
              <li
                className={[
                  styles.contactItem,
                  onPhoneClick ? styles.clickable : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={onPhoneClick}
                role={onPhoneClick ? "button" : undefined}
                tabIndex={onPhoneClick ? 0 : undefined}
                onKeyDown={
                  onPhoneClick
                    ? (e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          onPhoneClick();
                        }
                      }
                    : undefined
                }
              >
                <Phone size={iconSize} className={styles.contactIcon} />
                <span>{phone}</span>
              </li>
            )}
            {location && (
              <li className={styles.contactItem}>
                <MapPin size={iconSize} className={styles.contactIcon} />
                <span>{location}</span>
              </li>
            )}
            {department && (
              <li className={styles.contactItem}>
                <Building size={iconSize} className={styles.contactIcon} />
                <span>{department}</span>
              </li>
            )}
          </ul>
        )}

        {variant !== "compact" && actions && (
          <div className={styles.actions}>{actions}</div>
        )}
      </div>
    );
  },
);

UserCard.displayName = "UserCard";
