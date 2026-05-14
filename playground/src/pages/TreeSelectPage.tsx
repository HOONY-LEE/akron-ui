import { TreeSelect } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TreeSelectPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TreeSelect</h1>
        <p className="page-description">
          트리 구조 드롭다운 선택 컴포넌트. 부서, 카테고리 등 계층 데이터를 선택합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = React.useState(null);

  return (
    <TreeSelect
      nodes={[
        { id: "dev", label: "개발팀", children: [
          { id: "fe", label: "프론트엔드" },
          { id: "be", label: "백엔드" },
          { id: "devops", label: "DevOps" },
        ]},
        { id: "design", label: "디자인팀", children: [
          { id: "ux", label: "UX 디자인" },
          { id: "ui", label: "UI 디자인" },
        ]},
        { id: "pm", label: "기획팀" },
        { id: "qa", label: "QA팀" },
      ]}
      value={value}
      onChange={(id) => setValue(id)}
      placeholder="부서를 선택하세요"
      searchable
      clearable
    />
  );
}`}
          scope={{ TreeSelect }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 300 }}>
  <TreeSelect
    size="sm"
    nodes={[{ id: "1", label: "Small" }, { id: "2", label: "옵션 2" }]}
    placeholder="Small"
  />
  <TreeSelect
    size="md"
    nodes={[{ id: "1", label: "Medium" }, { id: "2", label: "옵션 2" }]}
    placeholder="Medium"
  />
  <TreeSelect
    size="lg"
    nodes={[{ id: "1", label: "Large" }, { id: "2", label: "옵션 2" }]}
    placeholder="Large"
  />
</div>`}
          scope={{ TreeSelect }}
        />
      </section>

      <section className="docs-section" id="expand-all">
        <h2 className="section-title">전체 확장</h2>
        <LiveCodeBlock
          code={`<TreeSelect
  expandAll
  nodes={[
    { id: "asia", label: "아시아", children: [
      { id: "kr", label: "한국" },
      { id: "jp", label: "일본" },
      { id: "cn", label: "중국" },
    ]},
    { id: "eu", label: "유럽", children: [
      { id: "de", label: "독일" },
      { id: "fr", label: "프랑스" },
    ]},
  ]}
  placeholder="지역 선택"
/>`}
          scope={{ TreeSelect }}
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
              <tr><td>nodes</td><td>TreeSelectNode[]</td><td>필수</td><td>트리 노드 목록</td></tr>
              <tr><td>value</td><td>string | null</td><td>-</td><td>선택된 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string | null</td><td>null</td><td>기본 선택 값</td></tr>
              <tr><td>onChange</td><td>(id, node) =&gt; void</td><td>-</td><td>변경 핸들러</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'선택하세요'</td><td>플레이스홀더</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>searchable</td><td>boolean</td><td>false</td><td>검색 활성화</td></tr>
              <tr><td>clearable</td><td>boolean</td><td>false</td><td>선택 해제 허용</td></tr>
              <tr><td>expandAll</td><td>boolean</td><td>false</td><td>전체 확장</td></tr>
              <tr><td>defaultExpandedIds</td><td>string[]</td><td>[]</td><td>기본 확장 노드 ID</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
