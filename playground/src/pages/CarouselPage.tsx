import { useState } from "react";
import { Carousel } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CarouselPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Carousel</h1>
        <p className="page-description">
          캐러셀/슬라이더 컴포넌트. 이미지나 콘텐츠를 슬라이드 형태로 표시합니다.
          자동 재생, 루프, 인디케이터, 이전/다음 버튼을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Carousel style={{ maxWidth: 480 }}>
  {["#4F46E5", "#22C55E", "#F59E0B", "#EF4444"].map((color, i) => (
    <div
      key={i}
      style={{
        height: 200,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 24,
        fontWeight: 700,
        borderRadius: 8,
      }}
    >
      슬라이드 {i + 1}
    </div>
  ))}
</Carousel>`}
          scope={{ Carousel }}
        />
      </section>

      <section className="docs-section" id="auto-play">
        <h2 className="section-title">자동 재생</h2>
        <LiveCodeBlock
          code={`<Carousel autoPlay={2000} style={{ maxWidth: 480 }}>
  {["#4F46E5", "#22C55E", "#F59E0B"].map((color, i) => (
    <div
      key={i}
      style={{
        height: 160,
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontSize: 20,
        fontWeight: 600,
        borderRadius: 8,
      }}
    >
      슬라이드 {i + 1}
    </div>
  ))}
</Carousel>`}
          scope={{ Carousel }}
        />
      </section>

      <section className="docs-section" id="no-loop">
        <h2 className="section-title">루프 없음</h2>
        <LiveCodeBlock
          code={`<Carousel loop={false} style={{ maxWidth: 480 }}>
  {["첫 번째", "두 번째", "세 번째"].map((text, i) => (
    <div
      key={i}
      style={{
        height: 140,
        background: "var(--ark-color-bg-muted)",
        border: "1px solid var(--ark-color-border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 16,
        fontWeight: 500,
        borderRadius: 8,
      }}
    >
      {text} 슬라이드
    </div>
  ))}
</Carousel>`}
          scope={{ Carousel }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [index, setIndex] = useState(0);
  const items = ["첫 번째", "두 번째", "세 번째", "네 번째"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Carousel activeIndex={index} onIndexChange={setIndex} style={{ maxWidth: 480 }}>
        {items.map((text, i) => (
          <div
            key={i}
            style={{
              height: 140,
              background: "var(--ark-color-primary-50)",
              border: "2px solid var(--ark-color-primary-500)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 8,
              color: "var(--ark-color-primary-600)",
            }}
          >
            {text}
          </div>
        ))}
      </Carousel>
      <div style={{ display: "flex", gap: 8 }}>
        {items.map((text, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              border: "1px solid var(--ark-color-border)",
              background: index === i ? "var(--ark-color-primary-500)" : "transparent",
              color: index === i ? "white" : "var(--ark-color-text)",
              cursor: "pointer",
              fontSize: 13,
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Carousel, useState }}
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
              <tr><td>children</td><td>ReactNode[]</td><td>-</td><td>슬라이드 목록 (필수)</td></tr>
              <tr><td>autoPlay</td><td>number</td><td>0</td><td>자동 재생 간격 (ms, 0이면 비활성)</td></tr>
              <tr><td>loop</td><td>boolean</td><td>true</td><td>루프 여부</td></tr>
              <tr><td>showIndicators</td><td>boolean</td><td>true</td><td>인디케이터 표시</td></tr>
              <tr><td>showArrows</td><td>boolean</td><td>true</td><td>이전/다음 버튼 표시</td></tr>
              <tr><td>activeIndex</td><td>number</td><td>-</td><td>현재 슬라이드 (제어 모드)</td></tr>
              <tr><td>onIndexChange</td><td>(index: number) =&gt; void</td><td>-</td><td>슬라이드 변경 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
