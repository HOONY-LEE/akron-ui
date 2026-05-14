import { DonutChart } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DonutChartPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DonutChart</h1>
        <p className="page-description">
          도넛/파이 차트 컴포넌트. 비율 데이터를 시각적으로 표현합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<DonutChart
  data={[
    { name: "데스크톱", value: 5400 },
    { name: "모바일", value: 3200 },
    { name: "태블릿", value: 1200 },
    { name: "기타", value: 400 },
  ]}
/>`}
          scope={{ DonutChart }}
        />
      </section>

      <section className="docs-section" id="pie">
        <h2 className="section-title">파이 차트</h2>
        <LiveCodeBlock
          code={`<DonutChart
  data={[
    { name: "완료", value: 65 },
    { name: "진행 중", value: 25 },
    { name: "대기", value: 10 },
  ]}
  thickness={1}
  valueFormatter={(v, total) => Math.round((v / total) * 100) + "%"}
/>`}
          scope={{ DonutChart }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>
  <DonutChart
    size="sm"
    data={[
      { name: "A", value: 60 },
      { name: "B", value: 40 },
    ]}
    showLegend={false}
  />
  <DonutChart
    size="md"
    data={[
      { name: "A", value: 60 },
      { name: "B", value: 40 },
    ]}
    showLegend={false}
  />
  <DonutChart
    size="lg"
    data={[
      { name: "A", value: 60 },
      { name: "B", value: 40 },
    ]}
    showLegend={false}
  />
</div>`}
          scope={{ DonutChart }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 색상 & 라벨</h2>
        <LiveCodeBlock
          code={`<DonutChart
  data={[
    { name: "매출", value: 45000000, color: "var(--ark-color-success-500)" },
    { name: "비용", value: 32000000, color: "var(--ark-color-error-500)" },
    { name: "이익", value: 13000000, color: "var(--ark-color-primary-500)" },
  ]}
  label="총 수익"
  valueFormatter={(v) => "₩" + (v / 10000).toLocaleString() + "만"}
  legendPosition="right"
/>`}
          scope={{ DonutChart }}
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
              <tr><td>data</td><td>DonutChartItem[]</td><td>필수</td><td>데이터 항목</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>thickness</td><td>number</td><td>0.3</td><td>두께 비율 (0-1, 1=파이)</td></tr>
              <tr><td>showLabel</td><td>boolean</td><td>true</td><td>중앙 라벨 표시</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>커스텀 중앙 라벨</td></tr>
              <tr><td>valueFormatter</td><td>(value, total) =&gt; string</td><td>-</td><td>값 포맷터</td></tr>
              <tr><td>animate</td><td>boolean</td><td>true</td><td>애니메이션</td></tr>
              <tr><td>showLegend</td><td>boolean</td><td>true</td><td>범례 표시</td></tr>
              <tr><td>legendPosition</td><td>'bottom' | 'right'</td><td>'bottom'</td><td>범례 위치</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>DonutChartItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>name</td><td>string</td><td>항목 이름 (필수)</td></tr>
              <tr><td>value</td><td>number</td><td>값 (필수)</td></tr>
              <tr><td>color</td><td>string</td><td>개별 색상</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
