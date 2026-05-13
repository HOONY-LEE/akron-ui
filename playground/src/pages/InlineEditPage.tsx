import { InlineEdit } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function InlineEditPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">InlineEdit</h1>
        <p className="page-description">
          인라인 편집 컴포넌트. 클릭하면 바로 편집 가능한 텍스트 필드로 전환됩니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [name, setName] = React.useState("홍길동");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ark-color-text-tertiary)" }}>이름: </p>
      <InlineEdit
        value={name}
        onChange={setName}
        onConfirm={v => console.log("저장:", v)}
      />
    </div>
  );
}`}
          scope={{ InlineEdit }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <InlineEdit defaultValue="Small 텍스트" size="sm" />
  <InlineEdit defaultValue="Medium 텍스트" size="md" />
  <InlineEdit defaultValue="Large 텍스트" size="lg" />
</div>`}
          scope={{ InlineEdit }}
        />
      </section>

      <section className="docs-section" id="textarea">
        <h2 className="section-title">멀티라인 (textarea)</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [bio, setBio] = React.useState("React 개발자입니다. 컴포넌트 라이브러리 제작을 좋아합니다.");
  return (
    <div style={{ maxWidth: 400 }}>
      <InlineEdit
        as="textarea"
        value={bio}
        onChange={setBio}
        placeholder="자기 소개를 입력하세요"
      />
    </div>
  );
}`}
          scope={{ InlineEdit }}
        />
      </section>

      <section className="docs-section" id="empty">
        <h2 className="section-title">빈 값 및 비활성화</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <InlineEdit defaultValue="" emptyText="클릭하여 추가" placeholder="내용 입력…" />
  <InlineEdit defaultValue="비활성화된 텍스트" disabled />
  <InlineEdit defaultValue="아이콘 없이" showEditIcon={false} />
</div>`}
          scope={{ InlineEdit }}
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
              <tr><td>value</td><td>string</td><td>-</td><td>현재 값 (controlled)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>''</td><td>초기 값 (uncontrolled)</td></tr>
              <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>-</td><td>값 변경 핸들러</td></tr>
              <tr><td>onConfirm</td><td>(value: string) =&gt; void</td><td>-</td><td>편집 확인 핸들러</td></tr>
              <tr><td>onCancel</td><td>(original: string) =&gt; void</td><td>-</td><td>편집 취소 핸들러</td></tr>
              <tr><td>as</td><td>'input' | 'textarea'</td><td>'input'</td><td>입력 타입</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>showEditIcon</td><td>boolean</td><td>true</td><td>편집 아이콘 표시</td></tr>
              <tr><td>emptyText</td><td>string</td><td>'—'</td><td>빈 값일 때 표시 텍스트</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'클릭하여 편집'</td><td>placeholder 텍스트</td></tr>
              <tr><td>maxLength</td><td>number</td><td>-</td><td>최대 입력 길이</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
