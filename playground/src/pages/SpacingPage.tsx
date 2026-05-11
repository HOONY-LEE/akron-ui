import { CodeBlock } from "../components/CodeBlock";

export function SpacingPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Spacing</h1>
        <p className="page-description">
          Akron UI의 간격 시스템입니다. 4px 기반 스케일로 여백과 패딩을 일관되게 관리합니다.
        </p>
      </header>

      <section className="docs-section" id="scale">
        <h2 className="section-title">스케일</h2>
        <p className="section-desc">
          4px 단위 기반의 간격 스케일입니다. 컴포넌트 내부 패딩부터 레이아웃 간격까지 다양하게 활용합니다.
        </p>
        <div className="preview-box left" style={{ flexDirection: "column", gap: 0, alignItems: "stretch" }}>
          {([
            { token: "0", px: 0 },
            { token: "1", px: 4 },
            { token: "2", px: 8 },
            { token: "3", px: 12 },
            { token: "4", px: 16 },
            { token: "5", px: 20 },
            { token: "6", px: 24 },
            { token: "8", px: 32 },
            { token: "10", px: 40 },
            { token: "12", px: 48 },
            { token: "16", px: 64 },
          ] as const).map((item) => (
            <div
              key={item.token}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "10px 0",
                borderBottom: "1px solid var(--ark-color-border)",
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-color-text-secondary)", width: 100, flexShrink: 0 }}>
                spacing-{item.token}
              </span>
              <div
                style={{
                  width: item.px,
                  height: 20,
                  backgroundColor: "var(--ark-color-primary-400)",
                  borderRadius: 3,
                  opacity: 0.7,
                  flexShrink: 0,
                  minWidth: item.px === 0 ? 2 : undefined,
                }}
              />
              <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>
                {item.px}px
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="docs-section" id="tokens">
        <h2 className="section-title">토큰 레퍼런스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>값</th><th>용도 예시</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-spacing-0</td><td>0</td><td>간격 초기화</td></tr>
              <tr><td>--ark-spacing-1</td><td>4px</td><td>아이콘-텍스트 간격</td></tr>
              <tr><td>--ark-spacing-2</td><td>8px</td><td>버튼 내부 패딩, 인라인 요소 간격</td></tr>
              <tr><td>--ark-spacing-3</td><td>12px</td><td>카드 내부 패딩 (sm)</td></tr>
              <tr><td>--ark-spacing-4</td><td>16px</td><td>카드 내부 패딩 (md), 섹션 내 요소 간격</td></tr>
              <tr><td>--ark-spacing-5</td><td>20px</td><td>카드 내부 패딩 (lg)</td></tr>
              <tr><td>--ark-spacing-6</td><td>24px</td><td>섹션 간 간격, 페이지 좌우 패딩</td></tr>
              <tr><td>--ark-spacing-8</td><td>32px</td><td>대형 섹션 간격</td></tr>
              <tr><td>--ark-spacing-10</td><td>40px</td><td>페이지 상하 패딩</td></tr>
              <tr><td>--ark-spacing-12</td><td>48px</td><td>페이지 섹션 간격</td></tr>
              <tr><td>--ark-spacing-16</td><td>64px</td><td>대형 레이아웃 간격</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="radius">
        <h2 className="section-title">Border Radius</h2>
        <p className="section-desc">
          모서리 둥글기를 위한 토큰입니다. 컴포넌트의 크기에 맞게 적절한 값을 선택합니다.
        </p>
        <div className="preview-box left" style={{ gap: 20, flexWrap: "wrap" }}>
          {([
            { token: "none", value: "0" },
            { token: "sm", value: "4px" },
            { token: "md", value: "6px" },
            { token: "lg", value: "8px" },
            { token: "xl", value: "12px" },
            { token: "full", value: "9999px" },
          ] as const).map((item) => (
            <div key={item.token} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  backgroundColor: "var(--ark-color-primary-100)",
                  border: "2px solid var(--ark-color-primary-400)",
                  borderRadius: `var(--ark-radius-${item.token})`,
                  marginBottom: 8,
                }}
              />
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ark-color-text)" }}>{item.token}</div>
              <div style={{ fontSize: 11, color: "var(--ark-color-text-secondary)" }}>{item.value}</div>
            </div>
          ))}
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 24 }}>
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>값</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-radius-none</td><td>0</td><td>각진 요소</td></tr>
              <tr><td>--ark-radius-sm</td><td>4px</td><td>뱃지, 태그</td></tr>
              <tr><td>--ark-radius-md</td><td>6px</td><td>버튼, 인풋</td></tr>
              <tr><td>--ark-radius-lg</td><td>8px</td><td>카드, 모달</td></tr>
              <tr><td>--ark-radius-xl</td><td>12px</td><td>대형 컨테이너</td></tr>
              <tr><td>--ark-radius-full</td><td>9999px</td><td>원형 아바타, 필 버튼</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="shadow">
        <h2 className="section-title">Shadows</h2>
        <p className="section-desc">
          입체감과 계층 구조를 표현하는 그림자 토큰입니다.
        </p>
        <div className="preview-box left" style={{ gap: 32, flexWrap: "wrap" }}>
          {([
            { token: "sm", label: "Small" },
            { token: "md", label: "Medium" },
            { token: "lg", label: "Large" },
          ] as const).map((item) => (
            <div key={item.token} style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 100,
                  height: 72,
                  backgroundColor: "var(--ark-color-bg)",
                  boxShadow: `var(--ark-shadow-${item.token})`,
                  borderRadius: 8,
                  marginBottom: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  color: "var(--ark-color-text-secondary)",
                }}
              >
                {item.token}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>{item.label}</div>
            </div>
          ))}
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 24 }}>
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-shadow-sm</td><td>버튼, 인풋 등 기본 요소</td></tr>
              <tr><td>--ark-shadow-md</td><td>카드, 드롭다운</td></tr>
              <tr><td>--ark-shadow-lg</td><td>모달, 팝오버</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <CodeBlock>{`.my-card {
  padding: var(--ark-spacing-5);
  border-radius: var(--ark-radius-lg);
  box-shadow: var(--ark-shadow-md);
}

.section {
  margin-bottom: var(--ark-spacing-8);
}

.inline-items {
  display: flex;
  gap: var(--ark-spacing-2);
}`}</CodeBlock>
      </section>
    </>
  );
}
