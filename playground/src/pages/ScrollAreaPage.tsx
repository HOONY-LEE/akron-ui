import { ScrollArea } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ScrollAreaPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ScrollArea</h1>
        <p className="page-description">
          커스텀 스크롤바 영역. hover 시 얇고 세련된 스크롤바를 표시하는 래퍼 컴포넌트입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용 (수직)</h2>
        <LiveCodeBlock
          code={`<ScrollArea maxHeight={200} style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 12 }}>
  {Array.from({ length: 20 }, (_, i) => (
    <div key={i} style={{ padding: "6px 0", borderBottom: "1px solid var(--ark-color-border-subtle)", fontSize: 13 }}>
      항목 {i + 1} — 스크롤 영역 내 콘텐츠입니다
    </div>
  ))}
</ScrollArea>`}
          scope={{ ScrollArea }}
        />
      </section>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 스크롤</h2>
        <LiveCodeBlock
          code={`<ScrollArea orientation="horizontal" style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 12 }}>
  <div style={{ display: "flex", gap: 8, width: "max-content" }}>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        style={{
          minWidth: 100,
          height: 80,
          background: "var(--ark-color-surface-hover)",
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 13,
          color: "var(--ark-color-text-secondary)",
          flexShrink: 0,
        }}
      >
        카드 {i + 1}
      </div>
    ))}
  </div>
</ScrollArea>`}
          scope={{ ScrollArea }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">스크롤바 크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  {["sm", "md", "lg"].map((size) => (
    <div key={size}>
      <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 6 }}>{size}</p>
      <ScrollArea
        maxHeight={120}
        scrollbarSize={size}
        alwaysVisible
        style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 12 }}
      >
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} style={{ padding: "4px 0", fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
            항목 {i + 1}
          </div>
        ))}
      </ScrollArea>
    </div>
  ))}
</div>`}
          scope={{ ScrollArea }}
        />
      </section>

      <section className="docs-section" id="always-visible">
        <h2 className="section-title">항상 표시</h2>
        <LiveCodeBlock
          code={`<ScrollArea
  maxHeight={160}
  alwaysVisible
  style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 12 }}
>
  {Array.from({ length: 15 }, (_, i) => (
    <div key={i} style={{ padding: "5px 0", fontSize: 13 }}>
      항목 {i + 1}
    </div>
  ))}
</ScrollArea>`}
          scope={{ ScrollArea }}
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
              <tr><td>orientation</td><td>'vertical' | 'horizontal' | 'both'</td><td>'vertical'</td><td>스크롤 방향</td></tr>
              <tr><td>maxHeight</td><td>string | number</td><td>-</td><td>최대 높이</td></tr>
              <tr><td>maxWidth</td><td>string | number</td><td>-</td><td>최대 너비</td></tr>
              <tr><td>height</td><td>string | number</td><td>-</td><td>고정 높이</td></tr>
              <tr><td>width</td><td>string | number</td><td>-</td><td>고정 너비</td></tr>
              <tr><td>scrollbarSize</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>스크롤바 굵기</td></tr>
              <tr><td>alwaysVisible</td><td>boolean</td><td>false</td><td>스크롤바 항상 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
