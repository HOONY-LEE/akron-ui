import { StatsGrid } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function StatsGridPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">StatsGrid</h1>
        <p className="page-description">
          통계 대시보드 그리드 컴포넌트. 주요 지표를 그리드로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<StatsGrid
  columns={4}
  variant="bordered"
  items={[
    { id: "revenue", label: "매출", value: "₩12.4M", change: 12.5, changeLabel: "전월 대비" },
    { id: "users", label: "사용자", value: "8,429", change: 5.2, changeLabel: "전월 대비" },
    { id: "orders", label: "주문", value: "1,234", change: -2.1, changeLabel: "전월 대비" },
    { id: "conversion", label: "전환율", value: "3.2", suffix: "%", change: 0.8, changeLabel: "전월 대비" },
  ]}
/>`}
          scope={{ StatsGrid }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <StatsGrid
    variant="filled"
    columns={3}
    items={[
      { id: "1", label: "총 방문", value: "45.2K", change: 8.3 },
      { id: "2", label: "페이지뷰", value: "128K", change: 12.1 },
      { id: "3", label: "이탈률", value: "32.4", suffix: "%", change: -4.2 },
    ]}
  />
</div>`}
          scope={{ StatsGrid }}
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
              <tr><td>items</td><td>StatItem[]</td><td>필수</td><td>통계 항목 목록</td></tr>
              <tr><td>columns</td><td>number</td><td>4</td><td>열 수</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'bordered' | 'filled'</td><td>'default'</td><td>변형</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
