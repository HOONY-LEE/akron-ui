import { FloatingAction } from "@sunghoon_lee/akron-ui";
import { Edit2, Camera, FileText, Link, Plus } from "lucide-react";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FloatingActionPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FloatingAction</h1>
        <p className="page-description">
          플로팅 액션 버튼(FAB). 화면 위에 떠 있는 주요 액션 버튼입니다.
          단순 버튼 또는 서브 액션 메뉴를 포함한 확장형 FAB을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          아래 예제는 <code className="inline-code">position</code>이 제거된 인라인 렌더링입니다.
          실제 사용 시 <code className="inline-code">position</code> prop으로 화면 고정 위치를 지정하세요.
        </p>
        <LiveCodeBlock
          code={`<div style={{ position: "relative", height: 120, display: "flex", alignItems: "center", justifyContent: "center" }}>
  <FloatingAction
    label="새 항목 추가"
    style={{ position: "relative", bottom: "auto", right: "auto" }}
    onClick={() => alert("클릭!")}
  />
</div>`}
          scope={{ FloatingAction }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 16, padding: "20px 0" }}>
  {["sm", "md", "lg"].map((size) => (
    <FloatingAction
      key={size}
      size={size}
      style={{ position: "relative", bottom: "auto", right: "auto" }}
      label={size}
    />
  ))}
</div>`}
          scope={{ FloatingAction }}
        />
      </section>

      <section className="docs-section" id="actions">
        <h2 className="section-title">서브 액션</h2>
        <p className="section-desc">
          <code className="inline-code">actions</code>를 제공하면 클릭 시 서브 액션 버튼이 펼쳐집니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ position: "relative", height: 240, display: "flex", alignItems: "flex-end", justifyContent: "flex-end", paddingBottom: 16 }}>
  <FloatingAction
    style={{ position: "relative", bottom: "auto", right: "auto" }}
    actions={[
      { label: "글 작성", icon: <Edit2 size={16} />, onClick: () => alert("글 작성") },
      { label: "사진 업로드", icon: <Camera size={16} />, onClick: () => alert("사진 업로드") },
      { label: "파일 첨부", icon: <FileText size={16} />, onClick: () => alert("파일 첨부") },
      { label: "링크 추가", icon: <Link size={16} />, onClick: () => alert("링크 추가") },
    ]}
  />
</div>`}
          scope={{ FloatingAction, Edit2, Camera, FileText, Link }}
        />
      </section>

      <section className="docs-section" id="custom-icon">
        <h2 className="section-title">커스텀 아이콘</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center", padding: "8px 0" }}>
  <FloatingAction
    icon={<Edit2 size={22} />}
    label="글쓰기"
    style={{ position: "relative", bottom: "auto", right: "auto" }}
  />
  <FloatingAction
    icon={<Camera size={22} />}
    label="사진 촬영"
    size="sm"
    style={{ position: "relative", bottom: "auto", right: "auto" }}
  />
</div>`}
          scope={{ FloatingAction, Edit2, Camera }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">FloatingAction Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>icon</td><td>ReactNode</td><td>Plus</td><td>버튼 아이콘</td></tr>
              <tr><td>actions</td><td>FabAction[]</td><td>-</td><td>서브 액션 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>position</td><td>'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'</td><td>'bottom-right'</td><td>화면 고정 위치</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>접근성 레이블</td></tr>
              <tr><td>onClick</td><td>React.MouseEventHandler</td><td>-</td><td>클릭 핸들러 (actions 없을 때)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>FabAction</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>레이블 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>아이콘 (필수)</td></tr>
              <tr><td>onClick</td><td>() =&gt; void</td><td>클릭 핸들러 (필수)</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
