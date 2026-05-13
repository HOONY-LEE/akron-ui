import { ProgressRing } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ProgressRingPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ProgressRing</h1>
        <p className="page-description">
          원형 진행률 표시 컴포넌트. 업로드 진행률, 점수, 통계 수치를 시각적으로 표현합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <ProgressRing value={25} />
  <ProgressRing value={50} />
  <ProgressRing value={75} />
  <ProgressRing value={100} />
</div>`}
          scope={{ ProgressRing }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <ProgressRing value={72} color="primary" />
  <ProgressRing value={85} color="success" />
  <ProgressRing value={60} color="warning" />
  <ProgressRing value={40} color="danger" />
  <ProgressRing value={55} color="info" />
</div>`}
          scope={{ ProgressRing }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <ProgressRing value={68} size="xs" />
  <ProgressRing value={68} size="sm" />
  <ProgressRing value={68} size="md" />
  <ProgressRing value={68} size="lg" />
  <ProgressRing value={68} size="xl" />
</div>`}
          scope={{ ProgressRing }}
        />
      </section>

      <section className="docs-section" id="custom-label">
        <h2 className="section-title">커스텀 레이블</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <ProgressRing value={87} size="lg" label={
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 22, fontWeight: 700 }}>87</div>
      <div style={{ fontSize: 10, color: "var(--ark-color-text-tertiary)" }}>점수</div>
    </div>
  } />
  <ProgressRing value={45} size="lg" color="success" label={
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 700 }}>45%</div>
      <div style={{ fontSize: 10, color: "var(--ark-color-text-tertiary)" }}>완료</div>
    </div>
  } />
  <ProgressRing value={100} size="lg" color="success" label="✓" hideLabel={false} />
</div>`}
          scope={{ ProgressRing }}
        />
      </section>

      <section className="docs-section" id="interactive">
        <h2 className="section-title">인터랙티브</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = React.useState(65);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <ProgressRing value={value} size="xl" color={value >= 80 ? "success" : value >= 50 ? "primary" : "danger"} />
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={e => setValue(Number(e.target.value))}
        style={{ width: 200 }}
      />
    </div>
  );
}`}
          scope={{ ProgressRing }}
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
              <tr><td>value</td><td>number</td><td>필수</td><td>진행률 (0–100)</td></tr>
              <tr><td>size</td><td>'xs' | 'sm' | 'md' | 'lg' | 'xl'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'danger' | 'info'</td><td>'primary'</td><td>색상</td></tr>
              <tr><td>strokeWidth</td><td>number</td><td>size별 자동</td><td>링 두께</td></tr>
              <tr><td>label</td><td>ReactNode</td><td>퍼센트 텍스트</td><td>중앙 레이블</td></tr>
              <tr><td>hideLabel</td><td>boolean</td><td>false</td><td>레이블 숨김</td></tr>
              <tr><td>trackColor</td><td>string</td><td>-</td><td>트랙 색상 오버라이드</td></tr>
              <tr><td>progressColor</td><td>string</td><td>-</td><td>진행 색상 오버라이드</td></tr>
              <tr><td>animate</td><td>boolean</td><td>true</td><td>마운트 시 애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
