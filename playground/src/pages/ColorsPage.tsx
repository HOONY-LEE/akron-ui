export function ColorsPage() {
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
          브랜드 색상입니다. 주요 액션 버튼, 링크, 강조 요소에 사용합니다.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 12 }}>
          {([
            { token: "primary-50", value: "#EEF2FF" },
            { token: "primary-100", value: "#E0E7FF" },
            { token: "primary-200", value: "#C7D2FE" },
            { token: "primary-300", value: "#A5B4FC" },
            { token: "primary-400", value: "#818CF8" },
            { token: "primary-500", value: "#4F46E5" },
            { token: "primary-600", value: "#4338CA" },
            { token: "primary-700", value: "#3730A3" },
          ] as const).map((c) => (
            <ColorSwatch key={c.token} token={c.token} value={c.value} />
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
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#0F172A")} /> #0F172A</span></td>
                <td>기본 배경</td>
              </tr>
              <tr>
                <td>--ark-color-bg-subtle</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#F9FAFB")} /> #F9FAFB</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#1E293B")} /> #1E293B</span></td>
                <td>보조 배경</td>
              </tr>
              <tr>
                <td>--ark-color-text</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#111827")} /> #111827</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#F9FAFB")} /> #F9FAFB</span></td>
                <td>기본 텍스트</td>
              </tr>
              <tr>
                <td>--ark-color-text-secondary</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#6B7280")} /> #6B7280</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#9CA3AF")} /> #9CA3AF</span></td>
                <td>보조 텍스트</td>
              </tr>
              <tr>
                <td>--ark-color-border</td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#E5E7EB")} /> #E5E7EB</span></td>
                <td><span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}><span style={dotStyle("#334155")} /> #334155</span></td>
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
        <div className="code-block">
          <code>{`.my-component {
  color: var(--ark-color-text);
  background: var(--ark-color-bg);
  border: 1px solid var(--ark-color-border);
}

.my-button {
  background: var(--ark-color-primary-500);
  color: var(--ark-color-text-inverse);
}`}</code>
        </div>
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
