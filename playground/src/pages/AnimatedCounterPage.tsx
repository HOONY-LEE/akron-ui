import { AnimatedCounter } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AnimatedCounterPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">AnimatedCounter</h1>
        <p className="page-description">
          숫자가 부드럽게 카운팅되는 애니메이션 컴포넌트. 통계, 대시보드, 히어로 섹션에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 32, fontSize: 40, fontWeight: 700 }}>
  <AnimatedCounter to={1200} />
  <AnimatedCounter to={42000} />
  <AnimatedCounter to={99.9} decimals={1} />
</div>`}
          scope={{ AnimatedCounter }}
        />
      </section>

      <section className="docs-section" id="prefix-suffix">
        <h2 className="section-title">접두사 / 접미사</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, fontSize: 32, fontWeight: 700, flexWrap: "wrap" }}>
  <AnimatedCounter to={4900000} prefix="₩" separator="," />
  <AnimatedCounter to={98.6} suffix="%" decimals={1} />
  <AnimatedCounter to={4.8} prefix="★ " decimals={1} suffix=" / 5" />
</div>`}
          scope={{ AnimatedCounter }}
        />
      </section>

      <section className="docs-section" id="easing">
        <h2 className="section-title">이징 비교</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  {["linear", "easeOut", "easeInOut", "spring"].map(e => (
    <div key={e} style={{ display: "flex", gap: 16, alignItems: "center" }}>
      <span style={{ width: 80, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>{e}</span>
      <AnimatedCounter to={1000} easing={e} duration={2000} style={{ fontSize: 24, fontWeight: 700 }} />
    </div>
  ))}
</div>`}
          scope={{ AnimatedCounter }}
        />
      </section>

      <section className="docs-section" id="stat-cards">
        <h2 className="section-title">통계 카드 예시</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  {[
    { label: "총 사용자", to: 128400, prefix: "", suffix: "명", sep: "," },
    { label: "월간 방문", to: 3200000, prefix: "", suffix: "", sep: "," },
    { label: "만족도", to: 97.3, prefix: "", suffix: "%", dec: 1, sep: "" },
    { label: "평균 응답", to: 42, prefix: "", suffix: "ms", sep: "" },
  ].map(({ label, to, prefix, suffix, sep, dec }) => (
    <div key={label} style={{
      padding: "20px 24px",
      background: "var(--ark-color-primary-50)",
      borderRadius: 12,
      minWidth: 140,
    }}>
      <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 4 }}>{label}</div>
      <AnimatedCounter
        to={to} prefix={prefix} suffix={suffix} separator={sep}
        decimals={dec ?? 0}
        style={{ fontSize: 28, fontWeight: 700, color: "var(--ark-color-primary-500)" }}
      />
    </div>
  ))}
</div>`}
          scope={{ AnimatedCounter }}
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
              <tr><td>to</td><td>number</td><td>필수</td><td>목표 값</td></tr>
              <tr><td>from</td><td>number</td><td>0</td><td>시작 값</td></tr>
              <tr><td>duration</td><td>number</td><td>1500</td><td>애니메이션 지속 시간 (ms)</td></tr>
              <tr><td>decimals</td><td>number</td><td>0</td><td>소수점 자릿수</td></tr>
              <tr><td>easing</td><td>'linear' | 'easeOut' | 'easeInOut' | 'spring'</td><td>'easeOut'</td><td>이징 함수</td></tr>
              <tr><td>prefix</td><td>string</td><td>''</td><td>접두사 (예: '₩', '$')</td></tr>
              <tr><td>suffix</td><td>string</td><td>''</td><td>접미사 (예: '%', '명')</td></tr>
              <tr><td>separator</td><td>string</td><td>-</td><td>천 단위 구분자. 미지정 시 로케일 기반</td></tr>
              <tr><td>formatValue</td><td>(value: number) =&gt; string</td><td>-</td><td>커스텀 포맷 함수</td></tr>
              <tr><td>startOnView</td><td>boolean</td><td>false</td><td>뷰포트 진입 시 애니메이션 시작</td></tr>
              <tr><td>onComplete</td><td>() =&gt; void</td><td>-</td><td>애니메이션 완료 콜백</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
