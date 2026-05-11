import { useState, useCallback, useRef, useEffect } from "react";
import { CodeBlock } from "../components/CodeBlock";

/* ── Color math utilities ── */

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700] as const;

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l * 100];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return [h * 360, s * 100, l * 100];
}

function hexToHsv(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  const v = max;
  const s = max === 0 ? 0 : d / max;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
    else if (max === g) h = ((b - r) / d + 2) / 6;
    else h = ((r - g) / d + 4) / 6;
  }
  return [h * 360, s * 100, v * 100];
}

function hsvToHex(h: number, s: number, v: number): string {
  s /= 100; v /= 100;
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hslToHex(h: number, s: number, l: number): string {
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));
  const s1 = s / 100, l1 = l / 100;
  const c = (1 - Math.abs(2 * l1 - 1)) * s1;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l1 - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60) { r = c; g = x; }
  else if (h < 120) { r = x; g = c; }
  else if (h < 180) { g = c; b = x; }
  else if (h < 240) { g = x; b = c; }
  else if (h < 300) { r = x; b = c; }
  else { r = c; b = x; }
  const toHex = (n: number) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function getLuminance(hex: string): number {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return (r * 299 + g * 587 + b * 114) / 1000;
}

/* ── Palette generation ── */

const LIGHT_LIGHTNESS: Record<number, number> = {
  50: 95, 100: 90, 200: 82, 300: 70, 400: 55, 500: 0, 600: -12, 700: -22,
};
const LIGHT_SATURATION: Record<number, number> = {
  50: -40, 100: -30, 200: -15, 300: -5, 400: 5, 500: 0, 600: 5, 700: 5,
};

function generateLightPalette(baseHex: string): { shade: number; hex: string }[] {
  const [h, s, l] = hexToHsl(baseHex);
  return SHADE_KEYS.map((shade) => {
    if (shade === 500) return { shade, hex: baseHex.toUpperCase() };
    const lOff = LIGHT_LIGHTNESS[shade];
    const sOff = LIGHT_SATURATION[shade];
    const newL = shade < 500 ? l + (lOff / 100) * (100 - l) : l + (lOff / 100) * l;
    return { shade, hex: hslToHex(h, s + sOff, Math.max(0, Math.min(100, newL))) };
  });
}

function generateDarkPalette(baseHex: string): { shade: number; hex: string }[] {
  const [h, s, l] = hexToHsl(baseHex);

  // dark-500: ensure minimum lightness of 60% for visibility on dark backgrounds
  const dark500L = Math.max(65, l > 55 ? l + 15 : 100 - l + 10);
  const dark500S = Math.min(s, 80);
  const dark500Hex = hslToHex(h, dark500S, dark500L);

  // shade mapping for dark mode (inverted: 50 is darkest, 700 is lightest)
  const darkShades: Record<number, { lOff: number; sOff: number }> = {
    50:  { lOff: -50, sOff: -20 },
    100: { lOff: -42, sOff: -15 },
    200: { lOff: -32, sOff: -8 },
    300: { lOff: -20, sOff: -3 },
    400: { lOff: -8,  sOff: 0 },
    500: { lOff: 0,   sOff: 0 },
    600: { lOff: 10,  sOff: -10 },
    700: { lOff: 18,  sOff: -20 },
  };

  return SHADE_KEYS.map((shade) => {
    if (shade === 500) return { shade, hex: dark500Hex };
    const { lOff, sOff } = darkShades[shade];
    const newL = Math.max(0, Math.min(100, dark500L + lOff));
    const newS = Math.max(0, Math.min(100, dark500S + sOff));
    return { shade, hex: hslToHex(h, newS, newL) };
  });
}

function applyPalettes(
  lightPalette: { shade: number; hex: string }[],
  darkPalette: { shade: number; hex: string }[],
) {
  // Inject a stylesheet — NOT inline styles — so [data-theme="dark"] selector
  // can override correctly when theme is toggled.
  let styleEl = document.getElementById("akron-dynamic-primary");
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "akron-dynamic-primary";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = [
    `:root { ${lightPalette.map(({ shade, hex }) => `--ark-color-primary-${shade}: ${hex};`).join(" ")} }`,
    `[data-theme="dark"] { ${darkPalette.map(({ shade, hex }) => `--ark-color-primary-${shade}: ${hex};`).join(" ")} }`,
  ].join("\n");
}

/* ── Figma-style Color Picker ── */

function FigmaColorPicker({
  color,
  onChange,
}: {
  color: string;
  onChange: (hex: string) => void;
}) {
  const [hsv, setHsv] = useState<[number, number, number]>(() => hexToHsv(color));
  // Track the last hex we emitted so the parent→prop→useEffect loop doesn't
  // overwrite the picker state with a round-tripped (possibly slightly different) value.
  const lastEmittedRef = useRef(color.toUpperCase());
  const satPanelRef = useRef<HTMLDivElement>(null);
  const hueBarRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef<"sat" | "hue" | null>(null);

  useEffect(() => {
    const upper = color.toUpperCase();
    if (upper !== lastEmittedRef.current) {
      // Color changed externally (e.g. preset click) — sync picker state.
      lastEmittedRef.current = upper;
      setHsv(hexToHsv(color));
    }
  }, [color]);

  const emitColor = useCallback(
    (h: number, s: number, v: number) => {
      const hex = hsvToHex(h, s, v);
      lastEmittedRef.current = hex;
      setHsv([h, s, v]);
      onChange(hex);
    },
    [onChange],
  );

  const handleSatMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      const rect = satPanelRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      emitColor(hsv[0], x * 100, (1 - y) * 100);
    },
    [hsv, emitColor],
  );

  const handleHueMove = useCallback(
    (e: MouseEvent | React.MouseEvent) => {
      const rect = hueBarRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      emitColor(x * 360, hsv[1], hsv[2]);
    },
    [hsv, emitColor],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (draggingRef.current === "sat") handleSatMove(e);
      else if (draggingRef.current === "hue") handleHueMove(e);
    };
    const onUp = () => { draggingRef.current = null; };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [handleSatMove, handleHueMove]);

  const [h, s, v] = hsv;
  const currentHex = hsvToHex(h, s, v);
  const pureHue = hsvToHex(h, 100, 100);

  return (
    <div
      style={{
        width: 260,
        padding: 12,
        borderRadius: 10,
        border: "1px solid var(--docs-border)",
        backgroundColor: "var(--docs-bg-subtle)",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        userSelect: "none",
      }}
    >
      {/* Saturation / Brightness panel */}
      <div
        ref={satPanelRef}
        onMouseDown={(e) => {
          draggingRef.current = "sat";
          handleSatMove(e);
        }}
        style={{
          position: "relative",
          width: "100%",
          height: 160,
          borderRadius: 6,
          cursor: "crosshair",
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, ${pureHue})`,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${s}%`,
            top: `${100 - v}%`,
            width: 14,
            height: 14,
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.3)",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hue bar */}
      <div
        ref={hueBarRef}
        onMouseDown={(e) => {
          draggingRef.current = "hue";
          handleHueMove(e);
        }}
        style={{
          position: "relative",
          width: "100%",
          height: 14,
          borderRadius: 7,
          cursor: "pointer",
          background:
            "linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: `${(h / 360) * 100}%`,
            top: "50%",
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "2px solid #fff",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.2), 0 1px 3px rgba(0,0,0,0.3)",
            transform: "translate(-50%, -50%)",
            backgroundColor: pureHue,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hex input + preview — derived directly from HSV, no separate state */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            backgroundColor: currentHex,
            border: "1px solid var(--docs-border)",
            flexShrink: 0,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          <span
            style={{
              fontSize: 13,
              color: "var(--docs-text-tertiary)",
              fontFamily: "'SF Mono', 'Fira Code', monospace",
            }}
          >
            #
          </span>
          <input
            type="text"
            value={currentHex.replace("#", "")}
            onChange={(e) => {
              const raw = e.target.value.replace(/[^0-9A-Fa-f]/g, "").slice(0, 6);
              if (raw.length === 6) {
                const hex = "#" + raw.toUpperCase();
                lastEmittedRef.current = hex;
                setHsv(hexToHsv(hex));
                onChange(hex);
              }
            }}
            style={{
              flex: 1,
              padding: "5px 8px",
              fontSize: 13,
              fontFamily: "'SF Mono', 'Fira Code', monospace",
              border: "1px solid var(--docs-border)",
              borderRadius: 5,
              backgroundColor: "var(--docs-bg)",
              color: "var(--docs-text)",
              outline: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Apple System Color Presets (HIG 공식 자료) ── */

function rgbHex(r: number, g: number, b: number): string {
  return "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase();
}

const APPLE_PRESETS = [
  { name: "red",    label: "빨간색",  light: rgbHex(255,56,60),   dark: rgbHex(255,66,69),   lightHC: rgbHex(233,21,45),  darkHC: rgbHex(255,97,101)  },
  { name: "orange", label: "주황색",  light: rgbHex(255,141,40),  dark: rgbHex(255,146,48),  lightHC: rgbHex(197,83,0),   darkHC: rgbHex(255,160,86)  },
  { name: "yellow", label: "노란색",  light: rgbHex(255,204,0),   dark: rgbHex(255,214,0),   lightHC: rgbHex(161,106,0),  darkHC: rgbHex(254,223,67)  },
  { name: "green",  label: "초록색",  light: rgbHex(52,199,89),   dark: rgbHex(48,209,88),   lightHC: rgbHex(0,137,50),   darkHC: rgbHex(74,217,104)  },
  { name: "mint",   label: "민트색",  light: rgbHex(0,200,179),   dark: rgbHex(0,218,195),   lightHC: rgbHex(0,133,117),  darkHC: rgbHex(84,223,203)  },
  { name: "teal",   label: "청록색",  light: rgbHex(0,195,208),   dark: rgbHex(0,210,224),   lightHC: rgbHex(0,129,152),  darkHC: rgbHex(59,221,236)  },
  { name: "cyan",   label: "사이안색", light: rgbHex(0,192,232),   dark: rgbHex(60,211,254),  lightHC: rgbHex(0,126,174),  darkHC: rgbHex(109,217,255) },
  { name: "blue",   label: "파란색",  light: rgbHex(0,136,255),   dark: rgbHex(0,145,255),   lightHC: rgbHex(30,110,244), darkHC: rgbHex(92,184,255)  },
  { name: "indigo", label: "남색",    light: rgbHex(97,85,245),   dark: rgbHex(109,124,255), lightHC: rgbHex(86,74,222),  darkHC: rgbHex(167,170,255) },
  { name: "purple", label: "보라색",  light: rgbHex(203,48,224),  dark: rgbHex(219,52,242),  lightHC: rgbHex(176,47,194), darkHC: rgbHex(234,141,255) },
  { name: "pink",   label: "분홍색",  light: rgbHex(255,45,85),   dark: rgbHex(255,55,95),   lightHC: rgbHex(231,18,77),  darkHC: rgbHex(255,138,196) },
  { name: "brown",  label: "갈색",    light: rgbHex(172,127,94),  dark: rgbHex(183,138,102), lightHC: rgbHex(149,109,81), darkHC: rgbHex(219,166,121) },
];

/* ── Page ── */

const DEFAULT_COLOR = "#FF383C"; // 빨간색 기본 라이트 (Apple HIG)

export function ColorsPage() {
  const [baseColor, setBaseColor] = useState(DEFAULT_COLOR);
  const [lightPalette, setLightPalette] = useState(() => generateLightPalette(DEFAULT_COLOR));
  const [darkPalette, setDarkPalette] = useState(() => generateDarkPalette(DEFAULT_COLOR));

  // Apply palette on first render so dark mode works immediately without interaction.
  useEffect(() => {
    applyPalettes(generateLightPalette(DEFAULT_COLOR), generateDarkPalette(DEFAULT_COLOR));
  }, []);

  const handleColorChange = useCallback((hex: string) => {
    setBaseColor(hex);
    const lp = generateLightPalette(hex);
    const dp = generateDarkPalette(hex);
    setLightPalette(lp);
    setDarkPalette(dp);
    applyPalettes(lp, dp);
  }, []);

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Colors</h1>
        <p className="page-description">
          Akron UI의 색상 시스템입니다. CSS 변수 기반 토큰으로 관리되며,
          다크모드 전환 시 자동으로 대응합니다.
        </p>
      </header>

      <section className="docs-section" id="primary">
        <h2 className="section-title">Primary</h2>
        <p className="section-desc">
          브랜드 색상입니다. Primary-500 색상을 선택하면 라이트/다크 모드 팔레트가 자동 생성됩니다.
          다크모드에서는 명도와 채도를 보정하여 어두운 배경에서도 가시성을 확보합니다.
        </p>

        <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 28, alignItems: "flex-start" }}>
          <FigmaColorPicker color={baseColor} onChange={handleColorChange} />
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "var(--docs-text-tertiary)", letterSpacing: "0.03em" }}>
              System Colors
            </span>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 8 }}>
              {APPLE_PRESETS.map((p) => {
                const isSelected = baseColor.toUpperCase() === p.light.toUpperCase();
                return (
                  <button
                    key={p.name}
                    title={`${p.label} (${p.name})`}
                    onClick={() => handleColorChange(p.light)}
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      backgroundColor: p.light,
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                      transition: "transform 150ms ease, box-shadow 150ms ease",
                      transform: isSelected ? "scale(1.1)" : "scale(1)",
                      boxShadow: isSelected
                        ? `0 0 0 2.5px var(--docs-bg), 0 0 0 5px ${p.light}`
                        : "0 1px 3px rgba(0,0,0,0.15)",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = "scale(1.08)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected) e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>

        <h3 className="section-subtitle" style={{ marginTop: 0 }}>Light Mode</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {lightPalette.map((c) => (
            <ColorSwatch key={c.shade} token={`primary-${c.shade}`} value={c.hex} />
          ))}
        </div>

        <h3 className="section-subtitle">Dark Mode</h3>
        <p className="section-desc" style={{ marginBottom: 12 }}>
          어두운 배경에서의 가시성을 위해 명도가 자동으로 보정된 팔레트입니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {darkPalette.map((c) => (
            <DarkSwatchPreview key={c.shade} shade={c.shade} hex={c.hex} />
          ))}
        </div>

        <PaletteCopyBlock lightPalette={lightPalette} darkPalette={darkPalette} />
      </section>

      <section className="docs-section" id="gray">
        <h2 className="section-title">Gray</h2>
        <p className="section-desc">
          텍스트, 배경, 보더 등 UI 전반에 사용하는 중립 색상입니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {([
            { token: "gray-50", value: "#F9FAFB" },
            { token: "gray-100", value: "#F3F4F6" },
            { token: "gray-200", value: "#E5E7EB" },
            { token: "gray-300", value: "#D1D5DB" },
            { token: "gray-400", value: "#9CA3AF" },
            { token: "gray-500", value: "#6B7280" },
            { token: "gray-600", value: "#4B5563" },
            { token: "gray-700", value: "#374151" },
            { token: "gray-800", value: "#1F2937" },
            { token: "gray-900", value: "#111827" },
          ] as const).map((c) => (
            <ColorSwatch key={c.token} token={c.token} value={c.value} />
          ))}
        </div>
      </section>

      <section className="docs-section" id="semantic">
        <h2 className="section-title">Semantic</h2>
        <p className="section-desc">
          성공, 경고, 에러, 정보 등 의미를 전달하는 시맨틱 색상입니다.
        </p>
        <h3 className="section-subtitle">Success</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12, marginBottom: 24 }}>
          <ColorSwatch token="success-50" value="#F0FDF4" />
          <ColorSwatch token="success-500" value="#22C55E" />
          <ColorSwatch token="success-600" value="#16A34A" />
        </div>
        <h3 className="section-subtitle">Warning</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12, marginBottom: 24 }}>
          <ColorSwatch token="warning-50" value="#FFFBEB" />
          <ColorSwatch token="warning-500" value="#F59E0B" />
          <ColorSwatch token="warning-600" value="#D97706" />
        </div>
        <h3 className="section-subtitle">Error</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12, marginBottom: 24 }}>
          <ColorSwatch token="error-50" value="#FEF2F2" />
          <ColorSwatch token="error-500" value="#EF4444" />
          <ColorSwatch token="error-600" value="#DC2626" />
        </div>
        <h3 className="section-subtitle">Info</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          <ColorSwatch token="info-50" value="#EFF6FF" />
          <ColorSwatch token="info-500" value="#3B82F6" />
          <ColorSwatch token="info-600" value="#2563EB" />
        </div>
      </section>

      <section className="docs-section" id="surface">
        <h2 className="section-title">Surface & Text</h2>
        <p className="section-desc">
          배경, 텍스트, 보더에 사용하는 시맨틱 토큰입니다.
          다크모드에서 자동으로 적절한 값으로 전환됩니다.
        </p>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>Light</th><th>Dark</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr>
                <td>--ark-color-bg</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#FFFFFF")} /> #FFFFFF</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#1E1E1E")} /> #1E1E1E</span></td>
                <td>기본 배경</td>
              </tr>
              <tr>
                <td>--ark-color-bg-subtle</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#F9FAFB")} /> #F9FAFB</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#262626")} /> #262626</span></td>
                <td>보조 배경</td>
              </tr>
              <tr>
                <td>--ark-color-text</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#111827")} /> #111827</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#E0E0E0")} /> #E0E0E0</span></td>
                <td>기본 텍스트</td>
              </tr>
              <tr>
                <td>--ark-color-text-secondary</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#6B7280")} /> #6B7280</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#A0A0A0")} /> #A0A0A0</span></td>
                <td>보조 텍스트</td>
              </tr>
              <tr>
                <td>--ark-color-border</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#E5E7EB")} /> #E5E7EB</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#383838")} /> #383838</span></td>
                <td>기본 보더</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>

        <h3 className="section-subtitle" style={{ marginTop: 0 }}>1. 토큰 CSS 가져오기</h3>
        <p className="section-desc">
          패키지 설치 후 글로벌 진입점에서 토큰 CSS를 한 번만 import합니다.
        </p>
        <CodeBlock>{`// main.tsx (또는 App.tsx)
import "@sunghoon_lee/akron-ui/tokens";`}</CodeBlock>

        <h3 className="section-subtitle">2. Primary 색상 커스터마이징</h3>
        <p className="section-desc">
          위 <strong>Primary 색상 빌더</strong>에서 색상을 선택하고 "CSS 복사"를 눌러
          글로벌 스타일시트에 붙여넣으면 끝입니다.
          <code className="inline-code">--ark-color-primary-500</code> 하나만 바꿔도 되지만,
          50~700 전체를 오버라이드해야 버튼·배지·포커스링 등 모든 컴포넌트에 일관되게 적용됩니다.
        </p>
        <CodeBlock>{`/* global.css */
:root {
  --ark-color-primary-50:  #FFF0F0;
  --ark-color-primary-100: #FFD6D7;
  --ark-color-primary-200: #FFACAE;
  --ark-color-primary-300: #FF7D80;
  --ark-color-primary-400: #FF5457;
  --ark-color-primary-500: #FF383C;  /* 브랜드 대표 색상 */
  --ark-color-primary-600: #E01F23;
  --ark-color-primary-700: #B51518;
}

[data-theme="dark"] {
  /* 다크모드용 — 명도 보정된 값 */
  --ark-color-primary-500: #FF8587;
  /* … 나머지 shade */
}`}</CodeBlock>

        <h3 className="section-subtitle">3. 컴포넌트에서 변수 직접 사용</h3>
        <p className="section-desc">
          커스텀 컴포넌트에서도 동일한 토큰을 참조하면 테마 전환이 자동으로 적용됩니다.
        </p>
        <CodeBlock>{`.my-button {
  background: var(--ark-color-primary-500);
  color: var(--ark-color-text-inverse);
}

.my-button:hover {
  background: var(--ark-color-primary-600);
}

.my-card {
  background: var(--ark-color-bg);
  border: 1px solid var(--ark-color-border);
  color: var(--ark-color-text);
}`}</CodeBlock>
      </section>
    </>
  );
}

/* ── Shared sub-components ── */

function dotStyle(color: string): React.CSSProperties {
  return {
    display: "inline-block",
    width: 12,
    height: 12,
    borderRadius: "50%",
    backgroundColor: color,
    border: "1px solid var(--ark-color-border)",
    flexShrink: 0,
  };
}

function ColorSwatch({ token, value }: { token: string; value: string }) {
  const isDark = getLuminance(value) < 0.5;
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--ark-color-border)" }}>
      <div
        style={{
          backgroundColor: `var(--ark-color-${token})`,
          height: 64,
          display: "flex",
          alignItems: "flex-end",
          padding: "0 8px 6px",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: isDark ? "#fff" : "#111827", opacity: 0.8 }}>
          {value}
        </span>
      </div>
      <div style={{ padding: "8px 10px", fontSize: 12, color: "var(--ark-color-text-secondary)" }}>
        {token}
      </div>
    </div>
  );
}

function DarkSwatchPreview({ shade, hex }: { shade: number; hex: string }) {
  const isDark = getLuminance(hex) < 0.5;
  return (
    <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid var(--docs-border)" }}>
      <div
        style={{
          backgroundColor: hex,
          height: 64,
          display: "flex",
          alignItems: "flex-end",
          padding: "0 8px 6px",
          background: `linear-gradient(135deg, #1e1e1e 0%, #1e1e1e 30%, ${hex} 30%)`,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, color: isDark ? "#fff" : "#111827", opacity: 0.8 }}>
          {hex}
        </span>
      </div>
      <div style={{ padding: "8px 10px", fontSize: 12, color: "var(--ark-color-text-secondary)", backgroundColor: "var(--docs-bg)" }}>
        primary-{shade}
      </div>
    </div>
  );
}

function PaletteCopyBlock({
  lightPalette,
  darkPalette,
}: {
  lightPalette: { shade: number; hex: string }[];
  darkPalette: { shade: number; hex: string }[];
}) {
  const [copied, setCopied] = useState(false);

  const cssCode = [
    `/* 프로젝트의 글로벌 CSS 파일에 추가하세요 */`,
    `:root {`,
    ...lightPalette.map(({ shade, hex }) => `  --ark-color-primary-${shade}: ${hex};`),
    `}`,
    ``,
    `[data-theme="dark"] {`,
    ...darkPalette.map(({ shade, hex }) => `  --ark-color-primary-${shade}: ${hex};`),
    `}`,
  ].join("\n");

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ marginTop: 32 }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 12,
      }}>
        <div>
          <h3 className="section-subtitle" style={{ margin: 0 }}>내 프로젝트에 적용하기</h3>
          <p style={{ fontSize: 13, color: "var(--docs-text-secondary)", marginTop: 6 }}>
            아래 CSS를 프로젝트의 글로벌 스타일시트에 붙여넣으면 됩니다.
            컴포넌트는 이 변수를 자동으로 참조합니다.
          </p>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{
          background: "var(--docs-code-bg)",
          borderRadius: 10,
          padding: "16px 20px",
          fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
          fontSize: 13,
          lineHeight: 1.7,
          overflowX: "auto",
          border: "1px solid var(--docs-border)",
        }}>
          <pre style={{ margin: 0 }}>
            {lightPalette.map(({ shade, hex }) => {
              const hexColor = getLuminance(hex) > 0.6 ? "var(--docs-text-secondary)" : hex;
              return (
                <div key={shade}>
                  <span style={{ color: "var(--docs-text-tertiary)" }}>{"  "}--ark-color-primary-</span>
                  <span style={{ color: "var(--docs-accent)" }}>{shade}</span>
                  <span style={{ color: "var(--docs-text-tertiary)" }}>: </span>
                  <span style={{ color: hexColor, fontWeight: 500 }}>{hex}</span>
                  <span style={{ color: "var(--docs-text-tertiary)" }}>;</span>
                </div>
              );
            })}
          </pre>
        </div>

        <button
          onClick={handleCopy}
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 12px",
            fontSize: 12,
            fontWeight: 600,
            color: copied ? "var(--ark-color-success-600)" : "var(--docs-text-secondary)",
            background: "var(--docs-bg)",
            border: "1px solid var(--docs-border)",
            borderRadius: 6,
            cursor: "pointer",
            transition: "all 150ms ease",
          }}
        >
          {copied ? "✓ 복사됨" : "CSS 복사"}
        </button>
      </div>

      <p style={{ fontSize: 13, color: "var(--docs-text-tertiary)", marginTop: 10 }}>
        라이트/다크 모드 변수가 모두 포함됩니다.
        <code style={{
          background: "var(--docs-code-bg)", padding: "1px 5px",
          borderRadius: 3, fontSize: 12, marginLeft: 4,
        }}>tokens.css</code>
        {" "}import 이후 이 CSS를 추가하면 됩니다.
      </p>
    </div>
  );
}
