import React, { forwardRef, useState, useCallback } from "react";
import { Check, Copy } from "lucide-react";
import styles from "./ColorSwatch.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorSwatchSize = "sm" | "md" | "lg";
export type ColorSwatchShape = "square" | "circle";

export interface ColorSwatchItem {
  color: string;
  label?: string;
  description?: string;
}

export interface ColorSwatchProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** 색상 목록 (문자열 배열 또는 ColorSwatchItem 배열) */
  colors: (string | ColorSwatchItem)[];
  /** 크기 */
  size?: ColorSwatchSize;
  /** 모양 */
  shape?: ColorSwatchShape;
  /** 클릭 시 복사 활성화 */
  copyOnClick?: boolean;
  /** 라벨 표시 여부 */
  showLabel?: boolean;
  /** 선택 콜백 */
  onSelect?: (color: string) => void;
  /** 현재 선택된 색상 */
  selected?: string;
  /** 컬럼 개수 */
  columns?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function normalize(item: string | ColorSwatchItem): ColorSwatchItem {
  return typeof item === "string" ? { color: item } : item;
}

function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  if (c.length < 6) return true;
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.65;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const ColorSwatch = forwardRef<HTMLDivElement, ColorSwatchProps>(
  (
    {
      colors,
      size = "md",
      shape = "square",
      copyOnClick = true,
      showLabel = true,
      onSelect,
      selected,
      columns,
      className,
      style,
      ...rest
    },
    ref
  ) => {
    const [copiedColor, setCopiedColor] = useState<string | null>(null);

    const handleClick = useCallback(
      async (color: string) => {
        onSelect?.(color);
        if (copyOnClick) {
          try {
            await navigator.clipboard.writeText(color);
            setCopiedColor(color);
            setTimeout(() => setCopiedColor(null), 1500);
          } catch {
            // clipboard not available
          }
        }
      },
      [copyOnClick, onSelect]
    );

    const rootCls = [styles.root, styles[size], styles[shape], className]
      .filter(Boolean)
      .join(" ");

    return (
      <div
        ref={ref}
        className={rootCls}
        style={{
          ...style,
          ...(columns ? { "--swatch-columns": columns } as React.CSSProperties : {}),
        }}
        role="listbox"
        aria-label="color palette"
        {...rest}
      >
        {colors.map((raw, i) => {
          const item = normalize(raw);
          const isCopied = copiedColor === item.color;
          const isSelected = selected === item.color;
          const light = isLightColor(item.color);

          return (
            <button
              key={`${item.color}-${i}`}
              type="button"
              className={[
                styles.swatch,
                isSelected && styles.selected,
              ]
                .filter(Boolean)
                .join(" ")}
              style={{ background: item.color }}
              onClick={() => handleClick(item.color)}
              role="option"
              aria-selected={isSelected}
              aria-label={item.label || item.color}
              title={item.color}
            >
              {/* Check / copy icon */}
              <span
                className={styles.icon}
                style={{ color: light ? "#000" : "#fff" }}
              >
                {isCopied ? <Check size={14} /> : isSelected ? <Check size={14} /> : null}
              </span>

              {/* Label below */}
              {showLabel && (item.label || item.description) && (
                <div className={styles.info}>
                  {item.label && <span className={styles.label}>{item.label}</span>}
                  {item.description && (
                    <span className={styles.description}>{item.description}</span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    );
  }
);

ColorSwatch.displayName = "ColorSwatch";
