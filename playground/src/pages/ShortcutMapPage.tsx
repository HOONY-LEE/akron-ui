import { ShortcutMap } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ShortcutMapPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ShortcutMap</h1>
        <p className="page-description">
          키보드 단축키 레퍼런스 컴포넌트. 앱의 단축키 목록을 테이블, 그리드, 리스트 형태로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="table">
        <h2 className="section-title">테이블 레이아웃 (기본)</h2>
        <LiveCodeBlock
          code={`<ShortcutMap
  groups={[
    {
      title: "일반",
      shortcuts: [
        { label: "검색 열기", keys: ["⌘", "K"], description: "스포트라이트 검색" },
        { label: "새 문서", keys: ["⌘", "N"] },
        { label: "저장", keys: ["⌘", "S"] },
        { label: "실행 취소", keys: ["⌘", "Z"] },
      ],
    },
    {
      title: "편집",
      shortcuts: [
        { label: "전체 선택", keys: ["⌘", "A"] },
        { label: "복사", keys: ["⌘", "C"] },
        { label: "붙여넣기", keys: ["⌘", "V"] },
        { label: "찾기 및 바꾸기", keys: ["⌘", "⇧", "H"] },
      ],
    },
  ]}
/>`}
          scope={{ ShortcutMap }}
        />
      </section>

      <section className="docs-section" id="grid">
        <h2 className="section-title">그리드 레이아웃</h2>
        <LiveCodeBlock
          code={`<ShortcutMap
  layout="grid"
  groups={[
    {
      title: "빠른 액션",
      shortcuts: [
        { label: "검색", keys: ["⌘", "K"] },
        { label: "저장", keys: ["⌘", "S"] },
        { label: "닫기", keys: ["⌘", "W"] },
        { label: "새 탭", keys: ["⌘", "T"] },
        { label: "실행", keys: ["⌘", "↵"] },
        { label: "설정", keys: ["⌘", ","] },
      ],
    },
  ]}
/>`}
          scope={{ ShortcutMap }}
        />
      </section>

      <section className="docs-section" id="list">
        <h2 className="section-title">리스트 레이아웃</h2>
        <LiveCodeBlock
          code={`<ShortcutMap
  layout="list"
  size="sm"
  groups={[
    {
      title: "네비게이션",
      shortcuts: [
        { label: "홈으로 이동", keys: ["⌘", "⇧", "H"] },
        { label: "뒤로 가기", keys: ["⌘", "["] },
        { label: "앞으로 가기", keys: ["⌘", "]"] },
        { label: "사이드바 토글", keys: ["⌘", "B"] },
      ],
    },
  ]}
/>`}
          scope={{ ShortcutMap }}
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
              <tr><td>groups</td><td>ShortcutGroup[]</td><td>필수</td><td>단축키 그룹 목록</td></tr>
              <tr><td>layout</td><td>'table' | 'grid' | 'list'</td><td>'table'</td><td>레이아웃</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>ShortcutGroup</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>그룹 제목 (필수)</td></tr>
              <tr><td>shortcuts</td><td>ShortcutEntry[]</td><td>단축키 목록 (필수)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>ShortcutEntry</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>액션 이름 (필수)</td></tr>
              <tr><td>keys</td><td>string[]</td><td>단축키 조합 (필수, 예: ['⌘', 'K'])</td></tr>
              <tr><td>description</td><td>string</td><td>부가 설명</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
