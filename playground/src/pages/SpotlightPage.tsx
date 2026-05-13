import { Spotlight } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const ITEMS = [
  { id: "home",      label: "홈",            description: "메인 대시보드로 이동", type: "page",    group: "페이지" },
  { id: "settings",  label: "설정",          description: "앱 설정 페이지",       type: "setting", group: "페이지" },
  { id: "profile",   label: "내 프로필",     description: "프로필 편집 페이지",   type: "page",    group: "페이지" },
  { id: "dark",      label: "다크모드 전환", description: "테마 변경",             type: "action",  group: "액션",  shortcut: ["⌘", "D"] },
  { id: "new-doc",   label: "새 문서 만들기", description: "빈 문서 생성",          type: "action",  group: "액션" },
  { id: "help",      label: "도움말 열기",   description: "키보드 단축키 보기",   type: "action",  group: "액션",  shortcut: ["⌘", "?"] },
  { id: "readme",    label: "README.md",     description: "/docs/README.md",       type: "file" },
  { id: "config",    label: "config.ts",     description: "/src/config.ts",        type: "file" },
];

export function SpotlightPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Spotlight</h1>
        <p className="page-description">
          전역 검색 / 명령어 팔레트 오버레이 컴포넌트. 키보드 방향키로 탐색하고 Enter로 선택합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`() => {
  const [open, setOpen] = React.useState(false);
  const items = [
    { id: "home",     label: "홈",           description: "메인 페이지로 이동",   type: "page",   group: "페이지" },
    { id: "settings", label: "설정",         description: "앱 설정",              type: "setting",group: "페이지" },
    { id: "dark",     label: "다크모드 전환",description: "테마 변경",            type: "action", group: "액션", shortcut: ["⌘","D"] },
    { id: "help",     label: "도움말",       description: "단축키 도움말",        type: "action", group: "액션", shortcut: ["⌘","?"] },
    { id: "readme",   label: "README.md",    description: "/docs/README.md",      type: "file" },
    { id: "config",   label: "config.ts",    description: "/src/config.ts",       type: "file" },
  ];
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "8px 16px", borderRadius: 8,
          border: "1px solid var(--ark-color-border)",
          background: "var(--ark-color-gray-50)",
          cursor: "pointer", fontSize: 14,
          color: "var(--ark-color-text-secondary)",
        }}
      >
        🔍 검색하기... <span style={{ marginLeft: "auto", fontSize: 12 }}>⌘K</span>
      </button>
      <Spotlight
        open={open}
        onClose={() => setOpen(false)}
        items={items}
        onSelect={(item) => alert("선택됨: " + item.label)}
      />
    </>
  );
}`}
          scope={{ Spotlight, React }}
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
              <tr><td>items</td><td>SpotlightItem[]</td><td>필수</td><td>검색 항목 목록</td></tr>
              <tr><td>onSelect</td><td>(item) =&gt; void</td><td>-</td><td>항목 선택 콜백</td></tr>
              <tr><td>onSearch</td><td>(query) =&gt; void</td><td>-</td><td>검색어 변경 콜백</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'검색 또는 명령어 입력...'</td><td>입력 플레이스홀더</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'결과가 없습니다'</td><td>빈 결과 메시지</td></tr>
              <tr><td>maxResults</td><td>number</td><td>8</td><td>최대 결과 수</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>SpotlightItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>표시 이름 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>부가 설명</td></tr>
              <tr><td>type</td><td>'page' | 'action' | 'file' | 'setting' | 'recent'</td><td>아이콘 타입</td></tr>
              <tr><td>group</td><td>string</td><td>카테고리 그룹 이름</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>커스텀 아이콘</td></tr>
              <tr><td>shortcut</td><td>string[]</td><td>단축키 힌트 (예: ['⌘', 'K'])</td></tr>
              <tr><td>keywords</td><td>string[]</td><td>검색 키워드</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
