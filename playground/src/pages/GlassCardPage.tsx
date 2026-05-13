import { GlassCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function GlassCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">GlassCard</h1>
        <p className="page-description">
          글래스모피즘 카드 컴포넌트. 배경 이미지나 그라디언트 위에서 반투명한 유리 효과를 제공합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ padding: 32, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", borderRadius: 16 }}>
  <GlassCard style={{ maxWidth: 320 }}>
    <h3 style={{ margin: "0 0 8px", color: "#fff" }}>글래스 카드</h3>
    <p style={{ margin: 0, color: "rgba(255,255,255,0.8)", fontSize: 14 }}>
      배경이 투명하게 비쳐보이는 글래스모피즘 스타일의 카드입니다.
    </p>
  </GlassCard>
</div>`}
          scope={{ GlassCard }}
        />
      </section>

      <section className="docs-section" id="blur">
        <h2 className="section-title">블러 강도</h2>
        <LiveCodeBlock
          code={`<div style={{ padding: 32, background: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
  {["sm", "md", "lg", "xl"].map(blur => (
    <GlassCard key={blur} blur={blur} style={{ flex: "1 1 140px", minWidth: 0 }}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "#fff", marginBottom: 4 }}>{blur}</div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>blur-{blur}</div>
    </GlassCard>
  ))}
</div>`}
          scope={{ GlassCard }}
        />
      </section>

      <section className="docs-section" id="hoverable">
        <h2 className="section-title">호버 효과</h2>
        <LiveCodeBlock
          code={`<div style={{ padding: 32, background: "linear-gradient(135deg, #06b6d4, #3b82f6)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
  {["카드 A", "카드 B", "카드 C"].map(name => (
    <GlassCard key={name} hoverable style={{ flex: "1 1 140px" }}>
      <div style={{ fontWeight: 600, color: "#fff", marginBottom: 4 }}>{name}</div>
      <div style={{ fontSize: 12, color: "rgba(255,255,255,0.75)" }}>호버해보세요</div>
    </GlassCard>
  ))}
</div>`}
          scope={{ GlassCard }}
        />
      </section>

      <section className="docs-section" id="border">
        <h2 className="section-title">테두리</h2>
        <LiveCodeBlock
          code={`<div style={{ padding: 32, background: "linear-gradient(135deg, #10b981, #3b82f6)", borderRadius: 16, display: "flex", gap: 16, flexWrap: "wrap" }}>
  <GlassCard border="none" style={{ flex: "1 1 140px" }}>
    <div style={{ color: "#fff", fontSize: 12 }}>border: none</div>
  </GlassCard>
  <GlassCard border="subtle" style={{ flex: "1 1 140px" }}>
    <div style={{ color: "#fff", fontSize: 12 }}>border: subtle</div>
  </GlassCard>
  <GlassCard border="visible" style={{ flex: "1 1 140px" }}>
    <div style={{ color: "#fff", fontSize: 12 }}>border: visible</div>
  </GlassCard>
</div>`}
          scope={{ GlassCard }}
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
              <tr><td>blur</td><td>'sm' | 'md' | 'lg' | 'xl'</td><td>'md'</td><td>블러 강도</td></tr>
              <tr><td>border</td><td>'none' | 'subtle' | 'visible'</td><td>'subtle'</td><td>테두리 스타일</td></tr>
              <tr><td>shadow</td><td>boolean</td><td>true</td><td>그림자 표시</td></tr>
              <tr><td>hoverable</td><td>boolean</td><td>false</td><td>호버 효과 활성화</td></tr>
              <tr><td>opacity</td><td>number</td><td>15</td><td>배경 불투명도 (0-100)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
