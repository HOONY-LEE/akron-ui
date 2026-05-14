import { Sparkline } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SparklinePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Sparkline</h1>
        <p className="page-description">
          미니 인라인 차트 컴포넌트. 대시보드나 테이블 셀 안에서 트렌드를 간결하게 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="line">
        <h2 className="section-title">라인 차트</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <Sparkline data={[5, 10, 5, 20, 8, 15, 25, 18, 30, 22]} />
  <Sparkline data={[30, 25, 20, 18, 22, 15, 10, 8, 5, 3]} color="var(--ark-color-error-500)" />
  <Sparkline data={[10, 15, 8, 20, 12, 18, 25, 20, 30, 28]} color="var(--ark-color-success-500)" showDots />
</div>`}
          scope={{ Sparkline }}
        />
      </section>

      <section className="docs-section" id="area">
        <h2 className="section-title">영역 차트</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <Sparkline variant="area" data={[5, 12, 8, 20, 15, 25, 18, 30, 22, 28]} />
  <Sparkline variant="area" data={[20, 15, 25, 10, 18, 8, 22, 12, 5, 15]} color="var(--ark-color-warning-500)" fillOpacity={0.2} />
</div>`}
          scope={{ Sparkline }}
        />
      </section>

      <section className="docs-section" id="bar">
        <h2 className="section-title">바 차트</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <Sparkline variant="bar" data={[5, 10, 15, 8, 20, 12, 18]} />
  <Sparkline variant="bar" data={[20, 15, 10, 18, 5, 12, 8]} color="var(--ark-color-success-500)" />
</div>`}
          scope={{ Sparkline }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <Sparkline data={[5, 10, 15, 8, 20]} width={80} height={24} />
  <Sparkline data={[5, 10, 15, 8, 20]} width={120} height={32} />
  <Sparkline data={[5, 10, 15, 8, 20]} width={200} height={48} />
</div>`}
          scope={{ Sparkline }}
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
              <tr><td>data</td><td>number[]</td><td>필수</td><td>값 배열</td></tr>
              <tr><td>variant</td><td>'line' | 'area' | 'bar'</td><td>'line'</td><td>차트 유형</td></tr>
              <tr><td>color</td><td>string</td><td>primary-500</td><td>색상</td></tr>
              <tr><td>width</td><td>number</td><td>120</td><td>너비 (px)</td></tr>
              <tr><td>height</td><td>number</td><td>32</td><td>높이 (px)</td></tr>
              <tr><td>strokeWidth</td><td>number</td><td>2</td><td>선 두께</td></tr>
              <tr><td>showDots</td><td>boolean</td><td>false</td><td>점 표시</td></tr>
              <tr><td>fillOpacity</td><td>number</td><td>0.1</td><td>영역 투명도</td></tr>
              <tr><td>curveType</td><td>'linear' | 'monotone'</td><td>'monotone'</td><td>곡선 유형</td></tr>
              <tr><td>animate</td><td>boolean</td><td>true</td><td>애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
