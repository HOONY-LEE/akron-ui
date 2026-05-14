import { useState } from "react";
import { BottomSheet } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BottomSheetPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">BottomSheet</h1>
        <p className="page-description">
          하단 시트 컴포넌트. 모바일 친화적인 오버레이로 콘텐츠를 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: "8px 16px" }}>
        열기
      </button>
      <BottomSheet open={open} onClose={() => setOpen(false)} title="바텀 시트">
        <p>하단에서 올라오는 시트입니다.</p>
        <p>드래그 핸들을 아래로 끌어서 닫을 수 있습니다.</p>
      </BottomSheet>
    </>
  );
}`}
          scope={{ BottomSheet }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [size, setSize] = React.useState(null);
  return (
    <>
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setSize("sm")} style={{ padding: "8px 16px" }}>sm</button>
        <button onClick={() => setSize("md")} style={{ padding: "8px 16px" }}>md</button>
        <button onClick={() => setSize("lg")} style={{ padding: "8px 16px" }}>lg</button>
        <button onClick={() => setSize("full")} style={{ padding: "8px 16px" }}>full</button>
      </div>
      <BottomSheet open={!!size} onClose={() => setSize(null)} size={size || "md"} title={size + " 크기"}>
        <p>크기: {size}</p>
        <p>sm=30%, md=50%, lg=75%, full=95% 높이</p>
      </BottomSheet>
    </>
  );
}`}
          scope={{ BottomSheet }}
        />
      </section>

      <section className="docs-section" id="footer">
        <h2 className="section-title">푸터</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} style={{ padding: "8px 16px" }}>
        푸터 포함 시트
      </button>
      <BottomSheet
        open={open}
        onClose={() => setOpen(false)}
        title="확인"
        footer={
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button onClick={() => setOpen(false)} style={{ padding: "8px 16px" }}>취소</button>
            <button onClick={() => setOpen(false)} style={{ padding: "8px 16px", background: "var(--ark-color-primary-500)", color: "white", border: "none", borderRadius: 6 }}>확인</button>
          </div>
        }
      >
        <p>하단에 고정된 푸터 영역이 있습니다.</p>
      </BottomSheet>
    </>
  );
}`}
          scope={{ BottomSheet }}
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
              <tr><td>open</td><td>boolean</td><td>필수</td><td>열림 상태</td></tr>
              <tr><td>onClose</td><td>() =&gt; void</td><td>필수</td><td>닫기 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg' | 'full'</td><td>'md'</td><td>최대 높이</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>제목</td></tr>
              <tr><td>showHandle</td><td>boolean</td><td>true</td><td>드래그 핸들 표시</td></tr>
              <tr><td>showClose</td><td>boolean</td><td>true</td><td>닫기 버튼 표시</td></tr>
              <tr><td>closeOnOverlay</td><td>boolean</td><td>true</td><td>오버레이 클릭 닫기</td></tr>
              <tr><td>closeOnEscape</td><td>boolean</td><td>true</td><td>ESC 키 닫기</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>-</td><td>하단 고정 영역</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
