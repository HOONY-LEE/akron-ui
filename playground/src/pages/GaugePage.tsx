import { Gauge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function GaugePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Gauge</h1>
        <p className="page-description">
          원형 게이지 컴포넌트. 속도계, CPU/메모리 사용률, 점수 등을 시각적으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <Gauge value={30} label="CPU" />
  <Gauge value={65} label="메모리" />
  <Gauge value={85} label="디스크" />
</div>`}
          scope={{ Gauge }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <Gauge value={72} size="sm" label="sm" />
  <Gauge value={72} size="md" label="md" />
  <Gauge value={72} size="lg" label="lg" />
  <Gauge value={72} size="xl" label="xl" />
</div>`}
          scope={{ Gauge }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <Gauge value={75} color="primary"  label="primary" />
  <Gauge value={75} color="success"  label="success" />
  <Gauge value={75} color="warning"  label="warning" />
  <Gauge value={75} color="danger"   label="danger"  />
</div>`}
          scope={{ Gauge }}
        />
      </section>

      <section className="docs-section" id="auto-color">
        <h2 className="section-title">자동 색상 (auto)</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <Gauge value={20}  color="auto" label="위험" />
  <Gauge value={55}  color="auto" label="경고" />
  <Gauge value={90}  color="auto" label="정상" />
</div>`}
          scope={{ Gauge }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 포맷 및 최솟/최댓값</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
  <Gauge
    value={4200}
    min={0}
    max={8000}
    size="lg"
    color="primary"
    label="RPM"
    formatValue={(v) => v.toLocaleString()}
    showMinMax
  />
  <Gauge
    value={37}
    min={0}
    max={100}
    size="lg"
    color="success"
    label="점수"
    formatValue={(_, pct) => \`\${pct}%\`}
  />
</div>`}
          scope={{ Gauge }}
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
              <tr><td>value</td><td>number</td><td>필수</td><td>현재 값</td></tr>
              <tr><td>min</td><td>number</td><td>0</td><td>최솟값</td></tr>
              <tr><td>max</td><td>number</td><td>100</td><td>최댓값</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg' | 'xl'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'danger' | 'auto'</td><td>'primary'</td><td>색상. auto는 값에 따라 자동 변경</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>중앙 하단 레이블</td></tr>
              <tr><td>showValue</td><td>boolean</td><td>true</td><td>중앙 값 표시</td></tr>
              <tr><td>showMinMax</td><td>boolean</td><td>false</td><td>최솟값/최댓값 표시</td></tr>
              <tr><td>formatValue</td><td>(value, percent) =&gt; string</td><td>-</td><td>값 포맷 함수</td></tr>
              <tr><td>thickness</td><td>number</td><td>size 따라</td><td>호 두께 (px)</td></tr>
              <tr><td>animated</td><td>boolean</td><td>true</td><td>진입 애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
