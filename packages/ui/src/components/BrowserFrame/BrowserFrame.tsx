import React, { forwardRef } from "react";
import { Globe, Lock, RotateCw, ArrowLeft, ArrowRight } from "lucide-react";
import styles from "./BrowserFrame.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BrowserFrameProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 주소 표시줄 URL */
  url?: string;
  /** 변형 */
  variant?: "chrome" | "safari" | "minimal";
  /** 다크 프레임 */
  dark?: boolean;
  /** 그림자 */
  shadow?: boolean;
  /** 내용 */
  children: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const BrowserFrame = forwardRef<HTMLDivElement, BrowserFrameProps>(
  (
    {
      url = "https://example.com",
      variant = "chrome",
      dark = false,
      shadow = true,
      children,
      className,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[variant]} ${dark ? styles.dark : ""} ${
          shadow ? styles.shadow : ""
        } ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.toolbar}>
          <div className={styles.trafficLights}>
            <span className={`${styles.dot} ${styles.close}`} />
            <span className={`${styles.dot} ${styles.minimize}`} />
            <span className={`${styles.dot} ${styles.maximize}`} />
          </div>

          {variant !== "minimal" && (
            <>
              {variant === "chrome" && (
                <div className={styles.navButtons}>
                  <ArrowLeft size={14} className={styles.navIcon} />
                  <ArrowRight size={14} className={styles.navIcon} />
                  <RotateCw size={13} className={styles.navIcon} />
                </div>
              )}
              <div className={styles.addressBar}>
                {variant === "safari" ? (
                  <Globe size={12} className={styles.lockIcon} />
                ) : (
                  <Lock size={12} className={styles.lockIcon} />
                )}
                <span className={styles.url}>{url}</span>
              </div>
            </>
          )}
        </div>

        <div className={styles.content}>{children}</div>
      </div>
    );
  }
);

BrowserFrame.displayName = "BrowserFrame";
