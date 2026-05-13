import { NumberTicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function NumberTickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">NumberTicker</h1>
        <p className="page-description">
          애니메이션 숫자 카운터. 목표 값까지 부드럽게 애니메이션되며, 뷰포트 진입 시 자동 시작을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 40, alignItems: "center", flexWrap: "wrap" }}>
  <div style={{ textAlign: "center" }}>
    <NumberTicker value={12847} style={{ fontSize: 36, fontWeight: 700 }} />
    <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginTop: 4 }}>사용자 수</div>
  </div>
  <div style={{ textAlign: "center" }}>
    <NumberTicker value={98.5} decimalPlaces={1} suffix="%" style={{ fontSize: 36, fontWeight: 700, color: "var(--ark-color-success)" }} />
    <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginTop: 4 }}>만족도</div>
  </div>
  <div style={{ textAlign: "center" }}>
    <NumberTicker value={42500000} prefix="₩" style={{ fontSize: 36, fontWeight: 700 }} />
    <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginTop: 4 }}>월 매출</div>
  </div>
</div>`}
          scope={{ NumberTicker }}
        />
      </section>

      <section className="docs-section" id="easing">
        <h2 className="section-title">Easing</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
  {["linear", "easeOut", "easeInOut"].map((easing) => (
    <div key={easing} style={{ textAlign: "center" }}>
      <NumberTicker value={1000} easing={easing} style={{ fontSize: 28, fontWeight: 700 }} />
      <div style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginTop: 4 }}>{easing}</div>
    </div>
  ))}
</div>`}
          scope={{ NumberTicker }}
        />
      </section>

      <section className="docs-section" id="format">
        <h2 className="section-title">숫자 포맷</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 140 }}>천 단위 구분자</span>
    <NumberTicker value={1234567} thousandSeparator="," style={{ fontSize: 20, fontWeight: 600 }} />
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 140 }}>소수점 2자리</span>
    <NumberTicker value={3.14159} decimalPlaces={2} style={{ fontSize: 20, fontWeight: 600 }} />
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 140 }}>접두사 + 접미사</span>
    <NumberTicker value={99.9} decimalPlaces={1} prefix="약 " suffix="%" style={{ fontSize: 20, fontWeight: 600 }} />
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 140 }}>유럽식 포맷</span>
    <NumberTicker value={1234567.89} decimalPlaces={2} thousandSeparator="." decimalSeparator="," style={{ fontSize: 20, fontWeight: 600 }} />
  </div>
</div>`}
          scope={{ NumberTicker }}
        />
      </section>

      <section className="docs-section" id="in-stat-card">
        <h2 className="section-title">대시보드 활용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
  {[
    { label: "방문자", value: 28934, suffix: "명", color: "var(--ark-color-primary)" },
    { label: "전환율", value: 4.7, decimalPlaces: 1, suffix: "%", color: "var(--ark-color-success)" },
    { label: "평균 체류", value: 3.2, decimalPlaces: 1, suffix: "분", color: "var(--ark-color-warning)" },
  ].map(({ label, value, decimalPlaces = 0, suffix, color }) => (
    <div
      key={label}
      style={{
        padding: 20,
        borderRadius: 12,
        border: "1px solid var(--ark-color-border)",
        background: "var(--ark-color-surface)",
      }}
    >
      <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>{label}</div>
      <NumberTicker
        value={value}
        decimalPlaces={decimalPlaces}
        suffix={suffix}
        duration={1800}
        style={{ fontSize: 28, fontWeight: 700, color }}
      />
    </div>
  ))}
</div>`}
          scope={{ NumberTicker }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>number</td><td>필수</td><td>목표 값</td></tr>
              <tr><td>decimalPlaces</td><td>number</td><td>0</td><td>소수점 자릿수</td></tr>
              <tr><td>thousandSeparator</td><td>string</td><td>','</td><td>천 단위 구분자</td></tr>
              <tr><td>decimalSeparator</td><td>string</td><td>'.'</td><td>소수점 기호</td></tr>
              <tr><td>prefix</td><td>string</td><td>''</td><td>앞 접두사 (예: '₩', '$')</td></tr>
              <tr><td>suffix</td><td>string</td><td>''</td><td>뒤 접미사 (예: '%', '명')</td></tr>
              <tr><td>duration</td><td>number</td><td>1500</td><td>애니메이션 지속시간 (ms)</td></tr>
              <tr><td>delay</td><td>number</td><td>0</td><td>시작 지연 (ms)</td></tr>
              <tr><td>startValue</td><td>number</td><td>0</td><td>시작 값</td></tr>
              <tr><td>easing</td><td>'linear' | 'easeOut' | 'easeInOut'</td><td>'easeOut'</td><td>Easing 함수</td></tr>
              <tr><td>animateOnView</td><td>boolean</td><td>true</td><td>뷰포트 진입 시 애니메이션 시작</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
