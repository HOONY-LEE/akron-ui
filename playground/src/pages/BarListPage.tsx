import { BarList } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BarListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">BarList</h1>
        <p className="page-description">
          수평 바 차트 리스트 컴포넌트. 항목별 값을 시각적으로 비교할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<BarList
  data={[
    { name: "Google", value: 45600 },
    { name: "직접 방문", value: 32100 },
    { name: "네이버", value: 28300 },
    { name: "Twitter/X", value: 15200 },
    { name: "기타", value: 8700 },
  ]}
/>`}
          scope={{ BarList }}
        />
      </section>

      <section className="docs-section" id="colored">
        <h2 className="section-title">커스텀 색상</h2>
        <LiveCodeBlock
          code={`<BarList
  data={[
    { name: "완료", value: 234, color: "var(--ark-color-success-500)" },
    { name: "진행 중", value: 145, color: "var(--ark-color-primary-500)" },
    { name: "대기", value: 89, color: "var(--ark-color-warning-500)" },
    { name: "실패", value: 23, color: "var(--ark-color-error-500)" },
  ]}
/>`}
          scope={{ BarList }}
        />
      </section>

      <section className="docs-section" id="formatter">
        <h2 className="section-title">값 포맷터</h2>
        <LiveCodeBlock
          code={`<BarList
  data={[
    { name: "매출", value: 45200000 },
    { name: "비용", value: 32100000 },
    { name: "이익", value: 13100000 },
  ]}
  valueFormatter={(v) => "₩" + v.toLocaleString()}
  color="var(--ark-color-success-500)"
/>`}
          scope={{ BarList }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <strong>sm</strong>
    <BarList size="sm" data={[{ name: "항목 A", value: 100 }, { name: "항목 B", value: 60 }]} />
  </div>
  <div>
    <strong>md</strong>
    <BarList size="md" data={[{ name: "항목 A", value: 100 }, { name: "항목 B", value: 60 }]} />
  </div>
  <div>
    <strong>lg</strong>
    <BarList size="lg" data={[{ name: "항목 A", value: 100 }, { name: "항목 B", value: 60 }]} />
  </div>
</div>`}
          scope={{ BarList }}
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
              <tr><td>data</td><td>BarListItem[]</td><td>필수</td><td>항목 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>valueFormatter</td><td>(value: number) =&gt; string</td><td>toLocaleString</td><td>값 포맷터</td></tr>
              <tr><td>sortOrder</td><td>'ascending' | 'descending' | 'none'</td><td>'descending'</td><td>정렬</td></tr>
              <tr><td>maxValue</td><td>number</td><td>자동</td><td>최대값</td></tr>
              <tr><td>onItemClick</td><td>(item) =&gt; void</td><td>-</td><td>클릭 콜백</td></tr>
              <tr><td>color</td><td>string</td><td>primary-500</td><td>기본 색상</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>BarListItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>name</td><td>string</td><td>라벨 (필수)</td></tr>
              <tr><td>value</td><td>number</td><td>값 (필수)</td></tr>
              <tr><td>color</td><td>string</td><td>개별 색상</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>아이콘</td></tr>
              <tr><td>href</td><td>string</td><td>링크 URL</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
