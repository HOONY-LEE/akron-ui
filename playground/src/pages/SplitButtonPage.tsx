import { SplitButton } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SplitButtonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">SplitButton</h1>
        <p className="page-description">
          분할 버튼. 기본 액션 버튼과 드롭다운 메뉴를 하나로 결합한 컴포넌트입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  <SplitButton
    items={[
      { key: "save-draft", label: "임시 저장" },
      { key: "save-copy", label: "복사본 저장" },
      { key: "export", label: "내보내기", divider: true },
    ]}
    onItemClick={(key) => alert(key)}
  >
    저장
  </SplitButton>

  <SplitButton
    variant="outline"
    items={[
      { key: "edit", label: "편집" },
      { key: "duplicate", label: "복제" },
      { key: "delete", label: "삭제", divider: true, danger: true },
    ]}
    onItemClick={(key) => alert(key)}
  >
    작업
  </SplitButton>
</div>`}
          scope={{ SplitButton }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
  {["primary", "secondary", "outline", "ghost", "danger"].map((v) => (
    <SplitButton
      key={v}
      variant={v}
      items={[
        { key: "option1", label: "옵션 1" },
        { key: "option2", label: "옵션 2" },
      ]}
      onItemClick={() => {}}
    >
      {v}
    </SplitButton>
  ))}
</div>`}
          scope={{ SplitButton }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
  <SplitButton
    size="sm"
    items={[{ key: "a", label: "Small 옵션" }]}
    onItemClick={() => {}}
  >
    Small
  </SplitButton>
  <SplitButton
    size="md"
    items={[{ key: "a", label: "Medium 옵션" }]}
    onItemClick={() => {}}
  >
    Medium
  </SplitButton>
  <SplitButton
    size="lg"
    items={[{ key: "a", label: "Large 옵션" }]}
    onItemClick={() => {}}
  >
    Large
  </SplitButton>
</div>`}
          scope={{ SplitButton }}
        />
      </section>

      <section className="docs-section" id="placement">
        <h2 className="section-title">드롭다운 위치</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12 }}>
  <SplitButton
    placement="bottom-end"
    items={[
      { key: "a", label: "옵션 A" },
      { key: "b", label: "옵션 B" },
    ]}
    onItemClick={() => {}}
  >
    우측 정렬 (기본)
  </SplitButton>
  <SplitButton
    placement="bottom-start"
    variant="outline"
    items={[
      { key: "a", label: "옵션 A" },
      { key: "b", label: "옵션 B" },
    ]}
    onItemClick={() => {}}
  >
    좌측 정렬
  </SplitButton>
</div>`}
          scope={{ SplitButton }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <SplitButton
    loading
    items={[{ key: "a", label: "옵션" }]}
    onItemClick={() => {}}
  >
    로딩 중
  </SplitButton>
  <SplitButton
    disabled
    items={[{ key: "a", label: "옵션" }]}
    onItemClick={() => {}}
  >
    비활성화
  </SplitButton>
</div>`}
          scope={{ SplitButton }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">SplitButton Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>기본 버튼 레이블</td></tr>
              <tr><td>items</td><td>SplitButtonItem[]</td><td>필수</td><td>드롭다운 항목</td></tr>
              <tr><td>onItemClick</td><td>(key: string) =&gt; void</td><td>-</td><td>항목 클릭 핸들러</td></tr>
              <tr><td>variant</td><td>'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'</td><td>'primary'</td><td>버튼 변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>로딩 상태</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>전체 너비</td></tr>
              <tr><td>placement</td><td>'bottom-start' | 'bottom-end'</td><td>'bottom-end'</td><td>드롭다운 위치</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>SplitButtonItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>key</td><td>string</td><td>고유 키 (onItemClick 인자)</td></tr>
              <tr><td>label</td><td>ReactNode</td><td>항목 레이블</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>divider</td><td>boolean</td><td>이 항목 위에 구분선 표시</td></tr>
              <tr><td>danger</td><td>boolean</td><td>위험 스타일 (빨간 텍스트)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
