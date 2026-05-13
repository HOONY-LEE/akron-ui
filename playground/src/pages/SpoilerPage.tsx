import { useState } from "react";
import { Spoiler } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SpoilerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Spoiler</h1>
        <p className="page-description">
          스포일러/블러 공개 컴포넌트. 콘텐츠를 blur 처리하고 클릭 또는 hover 시 공개합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Spoiler>
  <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8 }}>
    이 내용은 처음에 숨겨져 있습니다. "내용 보기" 버튼을 클릭하면 공개됩니다.
    스포일러 또는 답변 공개 등 다양한 용도로 활용할 수 있습니다.
  </p>
</Spoiler>`}
          scope={{ Spoiler }}
        />
      </section>

      <section className="docs-section" id="hover">
        <h2 className="section-title">Hover 공개</h2>
        <LiveCodeBlock
          code={`<Spoiler revealOnHover>
  <div style={{ padding: 16, background: "var(--ark-color-surface-hover)", borderRadius: 8 }}>
    <p style={{ margin: 0, fontSize: 14 }}>마우스를 올리면 내용이 공개됩니다.</p>
    <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
      이 모드에서는 마우스를 떼면 다시 숨겨집니다.
    </p>
  </div>
</Spoiler>`}
          scope={{ Spoiler }}
        />
      </section>

      <section className="docs-section" id="blur-amount">
        <h2 className="section-title">블러 강도</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  {["sm", "md", "lg"].map((blur) => (
    <div key={blur} style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", minWidth: 30 }}>{blur}</span>
      <Spoiler blurAmount={blur} style={{ flex: 1 }}>
        <p style={{ margin: 0, fontSize: 14 }}>블러 강도 {blur} 예시 — 클릭하면 공개됩니다.</p>
      </Spoiler>
    </div>
  ))}
</div>`}
          scope={{ Spoiler }}
        />
      </section>

      <section className="docs-section" id="rich-content">
        <h2 className="section-title">복잡한 콘텐츠</h2>
        <LiveCodeBlock
          code={`<Spoiler showLabel="정답 보기" hideLabel="정답 숨기기">
  <div style={{
    padding: 16,
    borderRadius: 8,
    background: "color-mix(in srgb, var(--ark-color-success) 10%, transparent)",
    border: "1px solid color-mix(in srgb, var(--ark-color-success) 30%, transparent)",
  }}>
    <p style={{ margin: 0, fontWeight: 600, color: "var(--ark-color-success)" }}>정답: React</p>
    <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
      React는 Facebook(현 Meta)이 2013년에 오픈소스로 공개한 UI 라이브러리입니다.
    </p>
  </div>
</Spoiler>`}
          scope={{ Spoiler }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setOpen(true)}
          style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)", color: "var(--ark-color-text-primary)", fontSize: 13 }}
        >공개</button>
        <button
          onClick={() => setOpen(false)}
          style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)", color: "var(--ark-color-text-primary)", fontSize: 13 }}
        >숨기기</button>
        <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", display: "flex", alignItems: "center" }}>
          현재: {open ? "공개" : "숨김"}
        </span>
      </div>
      <Spoiler open={open} onOpenChange={setOpen}>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.8 }}>
          외부 버튼으로 공개 여부를 제어하는 예시입니다.
        </p>
      </Spoiler>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Spoiler, useState }}
          noInline
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
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>숨길 콘텐츠</td></tr>
              <tr><td>showLabel</td><td>string</td><td>'내용 보기'</td><td>공개 버튼 레이블</td></tr>
              <tr><td>hideLabel</td><td>string</td><td>'숨기기'</td><td>숨김 버튼 레이블</td></tr>
              <tr><td>defaultOpen</td><td>boolean</td><td>false</td><td>초기 공개 여부</td></tr>
              <tr><td>open</td><td>boolean</td><td>-</td><td>제어 모드 공개 여부</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>-</td><td>상태 변경 콜백</td></tr>
              <tr><td>revealOnHover</td><td>boolean</td><td>false</td><td>hover 시 공개</td></tr>
              <tr><td>blurAmount</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>블러 강도</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
