import React, { forwardRef, useState, useRef, useEffect, useCallback } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Check, ChevronDown } from "lucide-react";
import styles from "./ColorPicker.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ColorPickerSize = "sm" | "md" | "lg";

export interface ColorPickerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** 현재 색상 값 (hex: "#rrggbb" 또는 "transparent") */
  value?: string;
  /** 초기 색상 (비제어) */
  defaultValue?: string;
  /** 색상 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 사전 정의 스와치 */
  swatches?: string[];
  /** 스와치만 표시 (hex/hsv 편집기 숨김) */
  swatchesOnly?: boolean;
  /** 크기 */
  size?: ColorPickerSize;
  /** 비활성화 */
  disabled?: boolean;
  /** 라벨 */
  label?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 투명도 없음 (선택지에서 transparent 제거) */
  disableAlpha?: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isValidHex(hex: string): boolean {
  return /^#[0-9a-fA-F]{6}$/.test(hex);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

function hexToHsl(hex: string): { h: number; s: number; l: number } | null {
  const rgb = hexToRgb(hex);
  if (!rgb) return null;
  const r = rgb.r / 255, g = rgb.g / 255, b = rgb.b / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

const DEFAULT_SWATCHES = [
  "#ef4444", "#f97316", "#eab308", "#22c55e",
  "#14b8a6", "#3b82f6", "#8b5cf6", "#ec4899",
  "#64748b", "#1e293b", "#ffffff", "#000000",
];

// ─── ColorCanvas ─────────────────────────────────────────────────────────────

interface ColorCanvasProps {
  hue: number; // 0-360
  saturation: number; // 0-100
  lightness: number; // 0-100
  onChange: (s: number, l: number) => void;
}

function ColorCanvas({ hue, saturation, lightness, onChange }: ColorCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getSlCoords = useCallback(
    (clientX: number, clientY: number) => {
      if (!canvasRef.current) return;
      const rect = canvasRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (clientY - rect.top) / rect.height));
      // x → saturation (0-100), y → lightness (100-0)
      onChange(Math.round(x * 100), Math.round((1 - y) * 100));
    },
    [onChange],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    getSlCoords(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      getSlCoords(e.clientX, e.clientY);
    };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [getSlCoords]);

  // Pointer position
  const pointerX = saturation;
  const pointerY = 100 - lightness;

  return (
    <div
      ref={canvasRef}
      className={styles.canvas}
      style={{ background: `hsl(${hue}, 100%, 50%)` }}
      onMouseDown={handleMouseDown}
    >
      <div className={styles.canvasWhite} />
      <div className={styles.canvasBlack} />
      <div
        className={styles.canvasPointer}
        style={{
          left: `${pointerX}%`,
          top: `${pointerY}%`,
          background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
        }}
      />
    </div>
  );
}

// ─── HueSlider ────────────────────────────────────────────────────────────────

interface HueSliderProps {
  hue: number;
  onChange: (hue: number) => void;
}

function HueSlider({ hue, onChange }: HueSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const getHue = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onChange(Math.round(x * 360));
    },
    [onChange],
  );

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    getHue(e.clientX);
  };

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      getHue(e.clientX);
    };
    const handleUp = () => { dragging.current = false; };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [getHue]);

  return (
    <div ref={trackRef} className={styles.hueTrack} onMouseDown={handleMouseDown}>
      <div
        className={styles.hueThumb}
        style={{ left: `${(hue / 360) * 100}%` }}
      />
    </div>
  );
}

// ─── ColorPicker ─────────────────────────────────────────────────────────────

export const ColorPicker = forwardRef<HTMLDivElement, ColorPickerProps>(
  (
    {
      value: valueProp,
      defaultValue = "#3b82f6",
      onChange,
      swatches = DEFAULT_SWATCHES,
      swatchesOnly = false,
      size = "md",
      disabled = false,
      label,
      error = false,
      errorMessage,
      helperText,
      disableAlpha = true,
      className,
      ...rest
    },
    ref,
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState(defaultValue);
    const color = isControlled ? (valueProp ?? "#3b82f6") : internalValue;

    const [open, setOpen] = useState(false);
    const [hexInput, setHexInput] = useState(color);

    // HSL from hex for the canvas/sliders
    const hsl = isValidHex(color) ? hexToHsl(color) : null;
    const [hue, setHue] = useState(hsl?.h ?? 220);
    const [sat, setSat] = useState(hsl?.s ?? 80);
    const [lit, setLit] = useState(hsl?.l ?? 60);

    useEffect(() => {
      setHexInput(color);
      const h = isValidHex(color) ? hexToHsl(color) : null;
      if (h) { setHue(h.h); setSat(h.s); setLit(h.l); }
    }, [color, open]);

    const setColor = useCallback(
      (val: string) => {
        if (!isControlled) setInternalValue(val);
        onChange?.(val);
      },
      [isControlled, onChange],
    );

    const handleHslChange = useCallback(
      (h: number, s: number, l: number) => {
        // Convert hsl → hex
        const c = l / 100, x = s / 100;
        const q = c < 0.5 ? c * (1 + x) : c + x - c * x;
        const p = 2 * c - q;
        const hk = h / 360;
        const toRgb = (t: number) => {
          let tc = t < 0 ? t + 1 : t > 1 ? t - 1 : t;
          if (tc < 1 / 6) return p + (q - p) * 6 * tc;
          if (tc < 1 / 2) return q;
          if (tc < 2 / 3) return p + (q - p) * (2 / 3 - tc) * 6;
          return p;
        };
        const r = Math.round(toRgb(hk + 1 / 3) * 255);
        const g = Math.round(toRgb(hk) * 255);
        const b = Math.round(toRgb(hk - 1 / 3) * 255);
        const hex = rgbToHex(r, g, b);
        setColor(hex);
      },
      [setColor],
    );

    const handleCanvasChange = (s: number, l: number) => {
      setSat(s); setLit(l);
      handleHslChange(hue, s, l);
    };

    const handleHueChange = (h: number) => {
      setHue(h);
      handleHslChange(h, sat, lit);
    };

    const handleHexInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setHexInput(val);
      const normalized = val.startsWith("#") ? val : `#${val}`;
      if (isValidHex(normalized)) setColor(normalized);
    };

    const displayColor = color === "transparent" ? "transparent" : color;
    const isTransparent = color === "transparent";

    return (
      <div
        ref={ref}
        className={[styles.wrapper, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {label && <label className={styles.label}>{label}</label>}

        <Popover.Root open={open} onOpenChange={setOpen}>
          <Popover.Trigger asChild>
            <button
              type="button"
              disabled={disabled}
              className={[
                styles.trigger,
                styles[size],
                error ? styles.errorState : "",
                disabled ? styles.disabled : "",
                open ? styles.open : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span
                className={[styles.swatch, isTransparent ? styles.transparent : ""]
                  .filter(Boolean)
                  .join(" ")}
                style={isTransparent ? {} : { background: displayColor }}
              />
              <span className={styles.hexLabel}>{color}</span>
              <ChevronDown
                size={14}
                className={[styles.chevron, open ? styles.chevronOpen : ""]
                  .filter(Boolean)
                  .join(" ")}
              />
            </button>
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              className={styles.content}
              sideOffset={6}
              align="start"
              onOpenAutoFocus={(e) => e.preventDefault()}
            >
              {!swatchesOnly && (
                <>
                  <ColorCanvas
                    hue={hue}
                    saturation={sat}
                    lightness={lit}
                    onChange={(s, l) => handleCanvasChange(s, l)}
                  />
                  <HueSlider hue={hue} onChange={handleHueChange} />
                  <div className={styles.hexRow}>
                    <span
                      className={[styles.previewSwatch, isTransparent ? styles.transparent : ""]
                        .filter(Boolean)
                        .join(" ")}
                      style={isTransparent ? {} : { background: color }}
                    />
                    <input
                      type="text"
                      className={styles.hexInput}
                      value={hexInput}
                      onChange={handleHexInput}
                      maxLength={7}
                      spellCheck={false}
                    />
                  </div>
                </>
              )}

              {swatches.length > 0 && (
                <div className={styles.swatchGrid}>
                  {swatches.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={[
                        styles.swatchBtn,
                        s === "transparent" ? styles.transparent : "",
                        s === color ? styles.swatchSelected : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      style={s === "transparent" ? {} : { background: s }}
                      onClick={() => setColor(s)}
                      title={s}
                    >
                      {s === color && <Check size={10} className={styles.swatchCheck} />}
                    </button>
                  ))}
                </div>
              )}
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>

        {(errorMessage || helperText) && (
          <p
            className={[styles.helperText, error ? styles.errorText : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {error ? errorMessage : helperText}
          </p>
        )}
      </div>
    );
  },
);

ColorPicker.displayName = "ColorPicker";
