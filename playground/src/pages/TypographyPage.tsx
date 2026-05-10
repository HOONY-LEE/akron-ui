export function TypographyPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Typography</h1>
        <p className="page-description">
          Akron UI의 타이포그래피 시스템입니다. Pretendard 폰트를 기본으로 사용하며,
          크기·굵기·행간을 CSS 변수로 관리합니다.
        </p>
      </header>

      <section className="docs-section" id="font-family">
        <h2 className="section-title">폰트 패밀리</h2>
        <p className="section-desc">
          Pretendard를 기본 폰트로 사용합니다. 시스템 폰트를 폴백으로 지정하여
          로딩 실패 시에도 일관된 경험을 제공합니다.
        </p>
        <div className="code-block">
          <code>{`--ark-font-family: 'Pretendard', -apple-system, BlinkMacSystemFont,
  'Segoe UI', Roboto, sans-serif;`}</code>
        </div>
      </section>

      <section className="docs-section" id="font-size">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          6단계 크기 스케일을 제공합니다. 본문에는 <code className="inline-code">md(16px)</code>,
          보조 텍스트에는 <code className="inline-code">sm(14px)</code>을 사용합니다.
        </p>
        <div className="preview-box left" style={{ flexDirection: "column", gap: 0, alignItems: "stretch" }}>
          {([
            { token: "xs", size: "12px" },
            { token: "sm", size: "14px" },
            { token: "md", size: "16px" },
            { token: "lg", size: "18px" },
            { token: "xl", size: "20px" },
            { token: "2xl", size: "24px" },
          ] as const).map((item) => (
            <div
              key={item.token}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid var(--ark-color-border)",
              }}
            >
              <span style={{ fontSize: `var(--ark-font-size-${item.token})`, fontWeight: 500 }}>
                다람쥐 헌 쳇바퀴에 타고파 — The quick brown fox
              </span>
              <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", whiteSpace: "nowrap", marginLeft: 16 }}>
                {item.token} · {item.size}
              </span>
            </div>
          ))}
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 24 }}>
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>값</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-font-size-xs</td><td>12px</td><td>캡션, 보조 라벨</td></tr>
              <tr><td>--ark-font-size-sm</td><td>14px</td><td>보조 텍스트, 버튼(sm)</td></tr>
              <tr><td>--ark-font-size-md</td><td>16px</td><td>본문 텍스트</td></tr>
              <tr><td>--ark-font-size-lg</td><td>18px</td><td>소제목</td></tr>
              <tr><td>--ark-font-size-xl</td><td>20px</td><td>제목</td></tr>
              <tr><td>--ark-font-size-2xl</td><td>24px</td><td>페이지 제목</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="font-weight">
        <h2 className="section-title">굵기</h2>
        <p className="section-desc">
          4단계 굵기를 제공합니다. 제목에는 <code className="inline-code">bold(700)</code>,
          강조 텍스트에는 <code className="inline-code">semibold(600)</code>를 사용합니다.
        </p>
        <div className="preview-box left" style={{ flexDirection: "column", gap: 0, alignItems: "stretch" }}>
          {([
            { token: "regular", weight: 400 },
            { token: "medium", weight: 500 },
            { token: "semibold", weight: 600 },
            { token: "bold", weight: 700 },
          ] as const).map((item) => (
            <div
              key={item.token}
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                padding: "14px 0",
                borderBottom: "1px solid var(--ark-color-border)",
              }}
            >
              <span style={{ fontSize: 16, fontWeight: item.weight }}>
                기업용 그룹웨어 — Enterprise Groupware
              </span>
              <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", whiteSpace: "nowrap", marginLeft: 16 }}>
                {item.token} · {item.weight}
              </span>
            </div>
          ))}
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 24 }}>
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>값</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-font-weight-regular</td><td>400</td><td>본문 텍스트</td></tr>
              <tr><td>--ark-font-weight-medium</td><td>500</td><td>라벨, 내비게이션</td></tr>
              <tr><td>--ark-font-weight-semibold</td><td>600</td><td>강조 텍스트, 서브 타이틀</td></tr>
              <tr><td>--ark-font-weight-bold</td><td>700</td><td>제목, 헤더</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="line-height">
        <h2 className="section-title">행간</h2>
        <p className="section-desc">
          3단계 행간을 제공합니다. 본문에는 <code className="inline-code">normal(1.5)</code>을 기본으로 사용합니다.
        </p>
        <div className="preview-box left" style={{ flexDirection: "column", gap: 24, alignItems: "stretch" }}>
          {([
            { token: "tight", value: 1.25 },
            { token: "normal", value: 1.5 },
            { token: "relaxed", value: 1.75 },
          ] as const).map((item) => (
            <div key={item.token}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>
                {item.token} · {item.value}
              </div>
              <p style={{ fontSize: 14, lineHeight: item.value, color: "var(--ark-color-text)", margin: 0, maxWidth: 560 }}>
                Akron UI는 기업용 그룹웨어/ERP 제품에 최적화된 디자인 시스템입니다.
                일관된 토큰 시스템으로 빠르고 체계적인 UI 개발을 지원합니다.
                접근성과 다크모드를 기본으로 제공합니다.
              </p>
            </div>
          ))}
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 24 }}>
          <table className="props-table">
            <thead>
              <tr><th>토큰</th><th>값</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>--ark-line-height-tight</td><td>1.25</td><td>제목, 짧은 텍스트</td></tr>
              <tr><td>--ark-line-height-normal</td><td>1.5</td><td>본문 텍스트</td></tr>
              <tr><td>--ark-line-height-relaxed</td><td>1.75</td><td>긴 본문, 설명 텍스트</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <div className="code-block">
          <code>{`.page-title {
  font-size: var(--ark-font-size-2xl);
  font-weight: var(--ark-font-weight-bold);
  line-height: var(--ark-line-height-tight);
}

.body-text {
  font-size: var(--ark-font-size-md);
  font-weight: var(--ark-font-weight-regular);
  line-height: var(--ark-line-height-normal);
}

.caption {
  font-size: var(--ark-font-size-xs);
  color: var(--ark-color-text-secondary);
}`}</code>
        </div>
      </section>
    </>
  );
}
