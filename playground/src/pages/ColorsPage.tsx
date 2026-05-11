import { useState, useCallback } from "react";
import { CodeBlock } from "../components/CodeBlock";

const SHADE_KEYS = [50, 100, 200, 300, 400, 500, 600, 700] as const;

const LIGHTNESS_MAP: Record<number, number> = {
  50: 95, 100: 90, 200: 82, 300: 70, 400: 55, 500: 0, 600: -12, 700: -22,
};

const SATURATION_MAP: Record<number, number> = {
  50: -40, 100: -30, 200: -15, 300: -5, 400: 5, 500: 0, 600: 5, 700: 5,
};

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
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function generatePalette(baseHex: string): { shade: number; hex: string }[] {
  const [h, s, l] = hexToHsl(baseHex);
  return SHADE_KEYS.map((shade) => {
    if (shade === 500) return { shade, hex: baseHex.toUpperCase() };
    const lOffset = LIGHTNESS_MAP[shade];
    const sOffset = SATURATION_MAP[shade];
    const newL = shade < 500 ? l + (lOffset / 100) * (100 - l) : l + (lOffset / 100) * l;
    const newS = s + sOffset;
    return { shade, hex: hslToHex(h, newS, Math.max(0, Math.min(100, newL))) };
  });
}

function applyPalette(palette: { shade: number; hex: string }[]) {
  const root = document.documentElement;
  palette.forEach(({ shade, hex }) => {
    root.style.setProperty(`--ark-color-primary-${shade}`, hex);
  });
}

export function ColorsPage() {
  const [baseColor, setBaseColor] = useState("#4F46E5");
  const [palette, setPalette] = useState(() => generatePalette("#4F46E5"));

  const handleColorChange = useCallback((hex: string) => {
    setBaseColor(hex);
    const newPalette = generatePalette(hex);
    setPalette(newPalette);
    applyPalette(newPalette);
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
          브랜드 색상입니다. Primary-500 색상을 선택하면 나머지 팔레트가 자동으로 생성됩니다.
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
          <label
            htmlFor="primary-picker"
            style={{ fontSize: 14, fontWeight: 600, color: "var(--docs-text-secondary)" }}
          >
            Primary-500
          </label>
          <input
            id="primary-picker"
            type="color"
            value={baseColor}
            onChange={(e) => handleColorChange(e.target.value)}
            style={{
              width: 40,
              height: 40,
              border: "2px solid var(--docs-border)",
              borderRadius: 8,
              cursor: "pointer",
              padding: 2,
              backgroundColor: "transparent",
            }}
          />
          <input
            type="text"
            value={baseColor.toUpperCase()}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9A-Fa-f]{6}$/.test(v)) handleColorChange(v);
              else setBaseColor(v);
            }}
            onBlur={() => {
              if (!/^#[0-9A-Fa-f]{6}$/.test(baseColor)) setBaseColor("#4F46E5");
            }}
            style={{
              width: 90,
              padding: "6px 10px",
              fontSize: 13,
              fontFamily: "'SF Mono', 'Fira Code', 'Consolas', monospace",
              border: "1px solid var(--docs-border)",
              borderRadius: 6,
              backgroundColor: "var(--docs-bg-subtle)",
              color: "var(--docs-text)",
            }}
          />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {palette.map((c) => (
            <ColorSwatch key={c.shade} token={`primary-${c.shade}`} value={c.hex} />
          ))}
        </div>
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
        <p className="section-desc">
          CSS 변수를 직접 참조하여 사용합니다.
        </p>
        <CodeBlock>{`.my-component {
  color: var(--ark-color-text);
  background: var(--ark-color-bg);
  border: 1px solid var(--ark-color-border);
}

.my-button {
  background: var(--ark-color-primary-500);
  color: var(--ark-color-text-inverse);
}`}</CodeBlock>
      </section>
    </>
  );
}

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
  const isDark = isColorDark(value);
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

function isColorDark(hex: string): boolean {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return (r * 299 + g * 587 + b * 114) / 1000 < 128;
}
