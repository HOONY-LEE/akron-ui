import { GradientText } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function GradientTextPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">GradientText</h1>
        <p className="page-description">
          그라디언트 색상 텍스트 컴포넌트. 히어로 섹션, 강조 텍스트, 브랜딩 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="presets">
        <h2 className="section-title">프리셋</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="primary">Primary Gradient</GradientText>
  </h2>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="sunset">Sunset Gradient</GradientText>
  </h2>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="ocean">Ocean Gradient</GradientText>
  </h2>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="forest">Forest Gradient</GradientText>
  </h2>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="candy">Candy Gradient</GradientText>
  </h2>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText preset="mono">Mono Gradient</GradientText>
  </h2>
</div>`}
          scope={{ GradientText }}
        />
      </section>

      <section className="docs-section" id="animate">
        <h2 className="section-title">애니메이션</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
    <GradientText preset="sunset" animate>
      Animated Shimmer Text
    </GradientText>
  </h2>
  <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
    <GradientText preset="ocean" animate>
      Beautiful Ocean Effect
    </GradientText>
  </h2>
</div>`}
          scope={{ GradientText }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 그라디언트</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <h2 style={{ fontSize: 32, fontWeight: 700, margin: 0 }}>
    <GradientText gradient="linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3)">
      Rainbow Text Effect
    </GradientText>
  </h2>
  <p style={{ fontSize: 18, margin: 0 }}>
    일반 텍스트와 함께{" "}
    <GradientText preset="candy" animate>그라디언트 강조</GradientText>를
    조합해서 사용할 수도 있습니다.
  </p>
</div>`}
          scope={{ GradientText }}
        />
      </section>

      <section className="docs-section" id="as-element">
        <h2 className="section-title">HTML 태그 변경</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <GradientText as="h1" preset="primary" style={{ fontSize: 40, fontWeight: 800, margin: 0 }}>
    H1 Heading
  </GradientText>
  <GradientText as="p" preset="ocean" style={{ fontSize: 16 }}>
    단락 텍스트에도 적용 가능합니다.
  </GradientText>
  <GradientText as="span" preset="sunset" style={{ fontSize: 14, fontWeight: 600 }}>
    인라인 span 태그
  </GradientText>
</div>`}
          scope={{ GradientText }}
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
              <tr><td>preset</td><td>'primary' | 'secondary' | 'sunset' | 'ocean' | 'forest' | 'candy' | 'mono'</td><td>'primary'</td><td>그라디언트 프리셋</td></tr>
              <tr><td>gradient</td><td>string</td><td>-</td><td>커스텀 CSS 그라디언트 문자열</td></tr>
              <tr><td>animate</td><td>boolean</td><td>false</td><td>shimmer 애니메이션 활성화</td></tr>
              <tr><td>as</td><td>keyof JSX.IntrinsicElements</td><td>'span'</td><td>렌더링할 HTML 태그</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>텍스트 내용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
