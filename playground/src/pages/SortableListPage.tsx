import { SortableList } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SortableListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">SortableList</h1>
        <p className="page-description">
          드래그 앤 드롭으로 항목 순서를 변경하는 리스트 컴포넌트. 키보드
          방향키로도 순서 변경이 가능합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`() => {
  const [items, setItems] = React.useState([
    { id: "1", label: "프로젝트 기획", description: "요구사항 분석 및 기획서 작성" },
    { id: "2", label: "디자인", description: "UI/UX 디자인 작업" },
    { id: "3", label: "프론트엔드 개발", description: "React 컴포넌트 구현" },
    { id: "4", label: "백엔드 개발", description: "API 서버 구현" },
    { id: "5", label: "테스트", description: "통합 테스트 및 QA" },
  ]);
  return (
    <SortableList
      items={items}
      onChange={setItems}
    />
  );
}`}
          scope={{ SortableList, React }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`() => {
  const [items, setItems] = React.useState([
    { id: "a", label: "항목 A" },
    { id: "b", label: "항목 B" },
    { id: "c", label: "항목 C" },
  ]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <strong>Card</strong>
        <SortableList items={items} onChange={setItems} variant="card" />
      </div>
      <div>
        <strong>Minimal</strong>
        <SortableList items={items} onChange={setItems} variant="minimal" />
      </div>
    </div>
  );
}`}
          scope={{ SortableList, React }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`() => {
  const items = [
    { id: "1", label: "Small 항목" },
    { id: "2", label: "Medium 항목" },
    { id: "3", label: "Large 항목" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <strong>sm</strong>
        <SortableList items={items} size="sm" variant="card" />
      </div>
      <div>
        <strong>md (기본)</strong>
        <SortableList items={items} size="md" variant="card" />
      </div>
      <div>
        <strong>lg</strong>
        <SortableList items={items} size="lg" variant="card" />
      </div>
    </div>
  );
}`}
          scope={{ SortableList, React }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<SortableList
  variant="card"
  items={[
    { id: "1", label: "이동 가능" },
    { id: "2", label: "비활성화 항목", disabled: true },
    { id: "3", label: "이동 가능" },
  ]}
/>`}
          scope={{ SortableList }}
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
              <tr><td>items</td><td>SortableItem[]</td><td>필수</td><td>항목 목록</td></tr>
              <tr><td>onChange</td><td>(items) =&gt; void</td><td>-</td><td>순서 변경 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'card' | 'minimal'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>showHandle</td><td>boolean</td><td>true</td><td>드래그 핸들 표시</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>전체 비활성화</td></tr>
              <tr><td>renderItem</td><td>(item, index, handleProps) =&gt; ReactNode</td><td>-</td><td>커스텀 렌더</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>SortableItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string | number</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>표시 텍스트 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>부가 설명</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>항목 비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
