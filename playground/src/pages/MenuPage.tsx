import { Menu, Button } from "@sunghoon_lee/akron-ui";
import { User, Settings, LogOut, Copy, Trash2, Edit2, Share2 } from "lucide-react";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function MenuPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Menu</h1>
        <p className="page-description">
          드롭다운 메뉴 컴포넌트. 버튼 클릭 시 컨텍스트 메뉴 또는 액션 메뉴를 표시합니다.
          아이콘, 단축키, 구분선, 위험 액션, 서브메뉴를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Menu
  trigger={<Button variant="outline">메뉴 열기</Button>}
  items={[
    { label: "프로필 보기", icon: <User size={14} /> },
    { label: "설정", icon: <Settings size={14} /> },
    { type: "separator" },
    { label: "로그아웃", icon: <LogOut size={14} /> },
  ]}
/>`}
          scope={{ Menu, Button, User, Settings, LogOut }}
        />
      </section>

      <section className="docs-section" id="danger">
        <h2 className="section-title">위험 액션</h2>
        <LiveCodeBlock
          code={`<Menu
  trigger={<Button variant="outline">더보기</Button>}
  items={[
    { label: "복사", icon: <Copy size={14} /> },
    { label: "이름 변경", icon: <Edit2 size={14} /> },
    { label: "공유", icon: <Share2 size={14} /> },
    { type: "separator" },
    { label: "삭제", icon: <Trash2 size={14} />, danger: true },
  ]}
/>`}
          scope={{ Menu, Button, Copy, Edit2, Share2, Trash2 }}
        />
      </section>

      <section className="docs-section" id="shortcut">
        <h2 className="section-title">단축키</h2>
        <LiveCodeBlock
          code={`<Menu
  trigger={<Button variant="outline">편집</Button>}
  items={[
    { label: "실행 취소", shortcut: "⌘Z" },
    { label: "다시 실행", shortcut: "⌘⇧Z" },
    { type: "separator" },
    { label: "오려두기", shortcut: "⌘X" },
    { label: "복사", shortcut: "⌘C" },
    { label: "붙여넣기", shortcut: "⌘V" },
    { type: "separator" },
    { label: "전체 선택", shortcut: "⌘A" },
  ]}
/>`}
          scope={{ Menu, Button }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화 항목</h2>
        <LiveCodeBlock
          code={`<Menu
  trigger={<Button variant="outline">액션</Button>}
  items={[
    { label: "편집", icon: <Edit2 size={14} /> },
    { label: "공유", icon: <Share2 size={14} />, disabled: true },
    { label: "삭제", icon: <Trash2 size={14} />, danger: true, disabled: true },
  ]}
/>`}
          scope={{ Menu, Button, Edit2, Share2, Trash2 }}
        />
      </section>

      <section className="docs-section" id="placement">
        <h2 className="section-title">위치</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12 }}>
  <Menu
    trigger={<Button variant="outline" size="sm">좌측 정렬</Button>}
    placement="bottom-start"
    items={[
      { label: "항목 1" },
      { label: "항목 2" },
      { label: "항목 3" },
    ]}
  />
  <Menu
    trigger={<Button variant="outline" size="sm">우측 정렬</Button>}
    placement="bottom-end"
    items={[
      { label: "항목 1" },
      { label: "항목 2" },
      { label: "항목 3" },
    ]}
  />
</div>`}
          scope={{ Menu, Button }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Menu Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>items</td><td>MenuEntry[]</td><td>-</td><td>메뉴 아이템 목록 (필수)</td></tr>
              <tr><td>trigger</td><td>ReactElement</td><td>-</td><td>트리거 요소 (필수)</td></tr>
              <tr><td>placement</td><td>'bottom-start' | 'bottom-end' | 'top-start' | 'top-end'</td><td>'bottom-start'</td><td>메뉴 위치</td></tr>
              <tr><td>open</td><td>boolean</td><td>-</td><td>열림 상태 제어</td></tr>
              <tr><td>defaultOpen</td><td>boolean</td><td>false</td><td>기본 열림 여부</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>-</td><td>열림 상태 변경 핸들러</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>MenuItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>항목 텍스트 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>왼쪽 아이콘</td></tr>
              <tr><td>onClick</td><td>() =&gt; void</td><td>클릭 핸들러</td></tr>
              <tr><td>shortcut</td><td>string</td><td>단축키 표시</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>danger</td><td>boolean</td><td>위험 스타일 (빨간색)</td></tr>
              <tr><td>selected</td><td>boolean</td><td>선택 상태 (체크마크)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
