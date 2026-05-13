import { MasonryGrid } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const HEIGHTS = [160, 240, 180, 120, 200, 140, 280, 160, 220, 130, 190, 250];
const COLORS = [
  "linear-gradient(135deg, #6366f1, #8b5cf6)",
  "linear-gradient(135deg, #06b6d4, #0ea5e9)",
  "linear-gradient(135deg, #f59e0b, #ef4444)",
  "linear-gradient(135deg, #10b981, #059669)",
  "linear-gradient(135deg, #ec4899, #8b5cf6)",
  "linear-gradient(135deg, #f97316, #fbbf24)",
  "linear-gradient(135deg, #14b8a6, #3b82f6)",
  "linear-gradient(135deg, #84cc16, #22c55e)",
  "linear-gradient(135deg, #d946ef, #6366f1)",
  "linear-gradient(135deg, #fb7185, #f97316)",
  "linear-gradient(135deg, #38bdf8, #818cf8)",
  "linear-gradient(135deg, #a3e635, #4ade80)",
];

export function MasonryGridPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MasonryGrid</h1>
        <p className="page-description">
          메이슨리 그리드 레이아웃. CSS columns를 활용한 Pinterest 스타일 격자 배치입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<MasonryGrid columns={3} gap={12}>
  {[160, 240, 180, 120, 200, 140, 280, 160, 220].map((height, i) => (
    <div
      key={i}
      style={{
        height,
        borderRadius: 8,
        background: [
          "linear-gradient(135deg, #6366f1, #8b5cf6)",
          "linear-gradient(135deg, #06b6d4, #0ea5e9)",
          "linear-gradient(135deg, #f59e0b, #ef4444)",
          "linear-gradient(135deg, #10b981, #059669)",
          "linear-gradient(135deg, #ec4899, #8b5cf6)",
        ][i % 5],
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      {height}px
    </div>
  ))}
</MasonryGrid>`}
          scope={{ MasonryGrid }}
        />
      </section>

      <section className="docs-section" id="columns">
        <h2 className="section-title">열 수</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  {[2, 3, 4].map((cols) => (
    <div key={cols}>
      <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>{cols}열</p>
      <MasonryGrid columns={cols} gap={8}>
        {[80, 120, 100, 90, 110, 80].map((h, i) => (
          <div key={i} style={{ height: h, borderRadius: 6, background: "var(--ark-color-surface-hover)", border: "1px solid var(--ark-color-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>{h}px</div>
        ))}
      </MasonryGrid>
    </div>
  ))}
</div>`}
          scope={{ MasonryGrid }}
        />
      </section>

      <section className="docs-section" id="cards">
        <h2 className="section-title">카드 그리드</h2>
        <LiveCodeBlock
          code={`<MasonryGrid columns={3} gap={16}>
  {[
    { title: "디자인 시스템", desc: "일관된 UI를 만드는 핵심 도구입니다.", height: 120 },
    { title: "컴포넌트 라이브러리", desc: "재사용 가능한 UI 블록을 모아 개발 생산성을 높입니다. 다양한 프로젝트에서 활용할 수 있는 컴포넌트들을 제공합니다.", height: 180 },
    { title: "접근성", desc: "모든 사용자가 동등하게 접근할 수 있는 인터페이스를 만드세요.", height: 140 },
    { title: "반응형 디자인", desc: "모바일부터 데스크탑까지.", height: 100 },
    { title: "다크 모드", desc: "라이트/다크 테마를 자동으로 지원합니다. CSS 변수를 활용하여 손쉽게 전환할 수 있습니다.", height: 160 },
    { title: "CSS 변수", desc: "디자인 토큰으로 일관된 스타일링.", height: 110 },
  ].map(({ title, desc }, i) => (
    <div
      key={i}
      style={{
        padding: 16,
        borderRadius: 10,
        border: "1px solid var(--ark-color-border)",
        background: "var(--ark-color-surface)",
      }}
    >
      <h4 style={{ margin: "0 0 8px", fontSize: 14, fontWeight: 600 }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>{desc}</p>
    </div>
  ))}
</MasonryGrid>`}
          scope={{ MasonryGrid }}
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
              <tr><td>columns</td><td>number | {'{ sm?, md?, lg?, xl? }'}</td><td>3</td><td>열 수 (반응형 객체 가능)</td></tr>
              <tr><td>gap</td><td>number | string</td><td>16</td><td>열 간격</td></tr>
              <tr><td>rowGap</td><td>number | string</td><td>-</td><td>행 간격 (없으면 gap과 동일)</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          반응형 예시: <code className="inline-code">{'columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}'}</code>
        </p>
      </section>
    </>
  );
}
