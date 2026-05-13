import { Kbd, KbdShortcut } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function KbdPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Kbd</h1>
        <p className="page-description">
          키보드 단축키 표시 컴포넌트. 키캡 스타일로 단축키를 시각적으로 표현합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
  <Kbd>Enter</Kbd>
  <Kbd>Esc</Kbd>
  <Kbd>Tab</Kbd>
  <Kbd>Space</Kbd>
  <Kbd>⌘</Kbd>
  <Kbd>⇧</Kbd>
  <Kbd>⌥</Kbd>
  <Kbd>⌃</Kbd>
  <Kbd>Delete</Kbd>
  <Kbd>F1</Kbd>
</div>`}
          scope={{ Kbd }}
        />
      </section>

      <section className="docs-section" id="shortcut">
        <h2 className="section-title">KbdShortcut</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>복사</span>
      <KbdShortcut keys={["⌘", "C"]} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>붙여넣기</span>
      <KbdShortcut keys={["⌘", "V"]} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>저장</span>
      <KbdShortcut keys={["⌘", "S"]} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>찾기</span>
      <KbdShortcut keys={["⌘", "K"]} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>실행취소</span>
      <KbdShortcut keys={["⌘", "Z"]} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", minWidth: 100 }}>전체선택</span>
      <KbdShortcut keys={["⌘", "A"]} />
    </div>
  </div>
</div>`}
          scope={{ Kbd, KbdShortcut }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>default</span>
    <KbdShortcut keys={["⌘", "K"]} variant="default" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>outline</span>
    <KbdShortcut keys={["⌘", "K"]} variant="outline" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>filled</span>
    <KbdShortcut keys={["⌘", "K"]} variant="filled" />
  </div>
</div>`}
          scope={{ Kbd, KbdShortcut }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>sm</span>
    <KbdShortcut keys={["⌘", "K"]} size="sm" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>md</span>
    <KbdShortcut keys={["⌘", "K"]} size="md" />
  </div>
  <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>lg</span>
    <KbdShortcut keys={["⌘", "K"]} size="lg" />
  </div>
</div>`}
          scope={{ Kbd, KbdShortcut }}
        />
      </section>

      <section className="docs-section" id="in-context">
        <h2 className="section-title">컨텍스트 내 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 360 }}>
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    background: "var(--ark-color-surface-hover)",
    border: "1px solid var(--ark-color-border)"
  }}>
    <span style={{ fontSize: 13 }}>저장</span>
    <KbdShortcut keys={["⌘", "S"]} size="sm" />
  </div>
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    background: "var(--ark-color-surface-hover)",
    border: "1px solid var(--ark-color-border)"
  }}>
    <span style={{ fontSize: 13 }}>검색 열기</span>
    <KbdShortcut keys={["⌘", "K"]} size="sm" />
  </div>
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    background: "var(--ark-color-surface-hover)",
    border: "1px solid var(--ark-color-border)"
  }}>
    <span style={{ fontSize: 13 }}>새 탭</span>
    <KbdShortcut keys={["⌘", "T"]} size="sm" />
  </div>
  <div style={{
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "8px 12px",
    borderRadius: 6,
    background: "var(--ark-color-surface-hover)",
    border: "1px solid var(--ark-color-border)"
  }}>
    <span style={{ fontSize: 13 }}>전체 화면</span>
    <KbdShortcut keys={["⌃", "⌘", "F"]} size="sm" />
  </div>
</div>`}
          scope={{ Kbd, KbdShortcut }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Kbd Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'outline' | 'filled'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>키 텍스트</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>KbdShortcut Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>keys</td><td>string[]</td><td>필수</td><td>키 배열 (예: ["⌘", "K"])</td></tr>
              <tr><td>separator</td><td>ReactNode</td><td>'+'</td><td>키 간 구분자</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'outline' | 'filled'</td><td>'default'</td><td>변형</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
