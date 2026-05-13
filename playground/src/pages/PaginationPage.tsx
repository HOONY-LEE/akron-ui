import { Pagination } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PaginationPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Pagination</h1>
        <p className="page-description">
          페이지네이션 컴포넌트. 대량의 데이터를 페이지 단위로 탐색합니다.
          자동 줄임표(…) 처리와 키보드 접근성을 기본 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [page, setPage] = useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <Pagination page={page} totalPages={10} onPageChange={setPage} />
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        현재 페이지: {page}
      </span>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Pagination }}
          noInline
        />
      </section>

      <section className="docs-section" id="dots">
        <h2 className="section-title">줄임표 처리</h2>
        <p className="section-desc">
          페이지 수가 많을 때 자동으로 줄임표(…)를 표시합니다.
          <code className="inline-code">siblingCount</code>로 현재 페이지 주변에 표시할 번호 수를 조정합니다.
        </p>
        <LiveCodeBlock
          code={`function Demo() {
  const [page, setPage] = useState(7);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
      <Pagination page={page} totalPages={20} onPageChange={setPage} siblingCount={1} />
      <Pagination page={page} totalPages={20} onPageChange={setPage} siblingCount={2} />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Pagination }}
          noInline
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <p className="section-desc">
          <code className="inline-code">variant</code>: <code className="inline-code">outline</code> | <code className="inline-code">ghost</code> | <code className="inline-code">solid</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
  <Pagination page={3} totalPages={8} onPageChange={() => {}} variant="outline" />
  <Pagination page={3} totalPages={8} onPageChange={() => {}} variant="ghost" />
  <Pagination page={3} totalPages={8} onPageChange={() => {}} variant="solid" />
</div>`}
          scope={{ Pagination }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-start" }}>
  <Pagination page={3} totalPages={8} onPageChange={() => {}} size="sm" />
  <Pagination page={3} totalPages={8} onPageChange={() => {}} size="md" />
  <Pagination page={3} totalPages={8} onPageChange={() => {}} size="lg" />
</div>`}
          scope={{ Pagination }}
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
              <tr><td>page</td><td>number</td><td>-</td><td>현재 페이지 (1-based, 필수)</td></tr>
              <tr><td>totalPages</td><td>number</td><td>-</td><td>전체 페이지 수 (필수)</td></tr>
              <tr><td>onPageChange</td><td>(page: number) =&gt; void</td><td>-</td><td>페이지 변경 핸들러 (필수)</td></tr>
              <tr><td>siblingCount</td><td>number</td><td>1</td><td>현재 페이지 주변 표시 번호 수</td></tr>
              <tr><td>variant</td><td>'outline' | 'ghost' | 'solid'</td><td>'outline'</td><td>시각적 변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>hideArrows</td><td>boolean</td><td>false</td><td>이전/다음 화살표 숨김</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
