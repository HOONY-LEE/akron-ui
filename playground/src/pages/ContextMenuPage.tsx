import { useState } from "react";
import { ContextMenu } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Copy, Edit, Trash, Share, Download, Star, FileText } from "lucide-react";

export function ContextMenuPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ContextMenu</h1>
        <p className="page-description">
          우클릭 컨텍스트 메뉴. 영역을 우클릭하면 메뉴가 표시됩니다.
          서브메뉴, 체크 항목, 구분선, 레이블 그룹을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [lastAction, setLastAction] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ContextMenu
        items={[
          { label: "복사", icon: <Copy size={14} />, shortcut: "⌘C", onClick: () => setLastAction("복사") },
          { label: "편집", icon: <Edit size={14} />, onClick: () => setLastAction("편집") },
          { label: "공유", icon: <Share size={14} />, onClick: () => setLastAction("공유") },
          { type: "separator" },
          { label: "삭제", icon: <Trash size={14} />, danger: true, onClick: () => setLastAction("삭제") },
        ]}
      >
        <div
          style={{
            padding: "48px 24px",
            border: "2px dashed var(--ark-color-border)",
            borderRadius: 8,
            textAlign: "center",
            color: "var(--ark-color-text-secondary)",
            fontSize: 13,
            cursor: "context-menu",
          }}
        >
          여기를 우클릭하세요
        </div>
      </ContextMenu>
      {lastAction && (
        <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
          마지막 액션: <b>{lastAction}</b>
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ ContextMenu, Copy, Edit, Trash, Share, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="submenu">
        <h2 className="section-title">서브메뉴</h2>
        <LiveCodeBlock
          code={`<ContextMenu
  items={[
    { label: "열기", icon: <FileText size={14} />, onClick: () => {} },
    {
      label: "내보내기",
      icon: <Download size={14} />,
      children: [
        { label: "PDF로 저장", onClick: () => {} },
        { label: "Excel로 저장", onClick: () => {} },
        { label: "CSV로 저장", onClick: () => {} },
      ],
    },
    { type: "separator" },
    { label: "즐겨찾기 추가", icon: <Star size={14} />, onClick: () => {} },
  ]}
>
  <div
    style={{
      padding: "48px 24px",
      border: "2px dashed var(--ark-color-border)",
      borderRadius: 8,
      textAlign: "center",
      color: "var(--ark-color-text-secondary)",
      fontSize: 13,
      cursor: "context-menu",
    }}
  >
    서브메뉴 — 우클릭
  </div>
</ContextMenu>`}
          scope={{ ContextMenu, FileText, Download, Star }}
        />
      </section>

      <section className="docs-section" id="label-group">
        <h2 className="section-title">레이블 그룹</h2>
        <LiveCodeBlock
          code={`<ContextMenu
  items={[
    { type: "label", label: "파일" },
    { label: "새 파일", onClick: () => {} },
    { label: "파일 열기", onClick: () => {} },
    { type: "separator" },
    { type: "label", label: "편집" },
    { label: "복사", shortcut: "⌘C", onClick: () => {} },
    { label: "붙여넣기", shortcut: "⌘V", onClick: () => {} },
    { label: "잘라내기", shortcut: "⌘X", onClick: () => {} },
  ]}
>
  <div
    style={{
      padding: "48px 24px",
      border: "2px dashed var(--ark-color-border)",
      borderRadius: 8,
      textAlign: "center",
      color: "var(--ark-color-text-secondary)",
      fontSize: 13,
      cursor: "context-menu",
    }}
  >
    레이블 그룹 — 우클릭
  </div>
</ContextMenu>`}
          scope={{ ContextMenu }}
        />
      </section>

      <section className="docs-section" id="checkbox-items">
        <h2 className="section-title">체크 항목</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(true);
  return (
    <ContextMenu
      items={[
        { type: "label", label: "텍스트 서식" },
        { label: "굵게", checked: bold, onClick: () => setBold(!bold) },
        { label: "기울임", checked: italic, onClick: () => setItalic(!italic) },
        { label: "밑줄", checked: false, disabled: true, onClick: () => {} },
      ]}
    >
      <div
        style={{
          padding: "48px 24px",
          border: "2px dashed var(--ark-color-border)",
          borderRadius: 8,
          textAlign: "center",
          color: "var(--ark-color-text-secondary)",
          fontSize: 13,
          cursor: "context-menu",
          fontWeight: bold ? "bold" : "normal",
          fontStyle: italic ? "italic" : "normal",
        }}
      >
        체크 항목 — 우클릭
      </div>
    </ContextMenu>
  );
}
render(<Demo />)`}
          scope={{ ContextMenu, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">ContextMenu Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>children</td><td>ReactNode</td><td>우클릭 트리거 영역 (필수)</td></tr>
              <tr><td>items</td><td>ContextMenuEntry[]</td><td>메뉴 항목 목록 (필수)</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>열림 상태 변경 핸들러</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>ContextMenuItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>레이블 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>아이콘</td></tr>
              <tr><td>onClick</td><td>() =&gt; void</td><td>클릭 핸들러</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>danger</td><td>boolean</td><td>위험 액션 (빨간 텍스트)</td></tr>
              <tr><td>shortcut</td><td>string</td><td>단축키 표시</td></tr>
              <tr><td>checked</td><td>boolean</td><td>체크 상태 (체크 마크 표시)</td></tr>
              <tr><td>children</td><td>ContextMenuItem[]</td><td>서브메뉴</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          구분선: <code className="inline-code">{`{ type: "separator" }`}</code> &nbsp;|&nbsp;
          레이블: <code className="inline-code">{`{ type: "label", label: "..." }`}</code>
        </p>
      </section>
    </>
  );
}
