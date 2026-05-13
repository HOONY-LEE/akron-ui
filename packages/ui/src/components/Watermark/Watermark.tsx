import React, { forwardRef, useMemo } from "react";
import styles from "./Watermark.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface WatermarkProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 워터마크 텍스트 */
  text: string;
  /** 부가 텍스트 (두 번째 줄) */
  subText?: string;
  /** 폰트 크기 (px) */
  fontSize?: number;
  /** 회전 각도 (deg) */
  rotate?: number;
  /** 간격 (px) */
  gap?: number;
  /** 투명도 (0~1) */
  opacity?: number;
  /** 색상 */
  color?: string;
  /** 워터마크 비활성화 */
  disabled?: boolean;
  children?: React.ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Watermark = forwardRef<HTMLDivElement, WatermarkProps>(
  (
    {
      text,
      subText,
      fontSize = 16,
      rotate = -22,
      gap = 100,
      opacity = 0.08,
      color,
      disabled = false,
      children,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const svgDataUrl = useMemo(() => {
      if (disabled) return "";

      const cellW = gap + fontSize * text.length * 0.7;
      const cellH = gap + fontSize * (subText ? 3 : 1.5);
      const lines = [text];
      if (subText) lines.push(subText);

      const textColor = color || "currentColor";

      const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="${cellW}" height="${cellH}">
          <text
            x="50%" y="50%"
            text-anchor="middle"
            dominant-baseline="middle"
            font-family="Pretendard, -apple-system, sans-serif"
            font-size="${fontSize}"
            fill="${textColor}"
            opacity="${opacity}"
            transform="rotate(${rotate}, ${cellW / 2}, ${cellH / 2})"
          >${lines
            .map(
              (line, i) =>
                `<tspan x="50%" dy="${i === 0 ? 0 : fontSize * 1.4}">${escapeXml(line)}</tspan>`
            )
            .join("")}</text>
        </svg>
      `.trim();

      return `url("data:image/svg+xml,${encodeURIComponent(svgContent)}")`;
    }, [text, subText, fontSize, rotate, gap, opacity, color, disabled]);

    const rootCls = [styles.root, className].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={rootCls} style={style} {...rest}>
        {children}
        {!disabled && (
          <div
            className={styles.overlay}
            style={{ backgroundImage: svgDataUrl }}
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

Watermark.displayName = "Watermark";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
