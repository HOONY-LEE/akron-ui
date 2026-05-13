import { useState } from "react";
import { Highlight } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function HighlightPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Highlight</h1>
        <p className="page-description">
          텍스트 강조 컴포넌트. 검색 결과나 키워드를 시각적으로 하이라이트합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Highlight highlight="React">
    React는 사용자 인터페이스를 만들기 위한 JavaScript 라이브러리입니다.
  </Highlight>
  <Highlight highlight="UI 컴포넌트">
    재사용 가능한 UI 컴포넌트를 만들어 효율적으로 개발하세요.
  </Highlight>
</div>`}
          scope={{ Highlight }}
        />
      </section>

      <section className="docs-section" id="multiple">
        <h2 className="section-title">복수 키워드</h2>
        <LiveCodeBlock
          code={`<Highlight highlight={["React", "JavaScript", "컴포넌트"]}>
  React는 Facebook이 만든 JavaScript 라이브러리로, 재사용 가능한 UI 컴포넌트를 만드는 데 사용됩니다.
</Highlight>`}
          scope={{ Highlight }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 14 }}>
  <Highlight highlight="yellow" color="yellow">yellow 색상으로 강조합니다</Highlight>
  <Highlight highlight="primary" color="primary">primary 색상으로 강조합니다</Highlight>
  <Highlight highlight="success" color="success">success 색상으로 강조합니다</Highlight>
  <Highlight highlight="warning" color="warning">warning 색상으로 강조합니다</Highlight>
  <Highlight highlight="error" color="error">error 색상으로 강조합니다</Highlight>
</div>`}
          scope={{ Highlight }}
        />
      </section>

      <section className="docs-section" id="search">
        <h2 className="section-title">검색 결과 활용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [query, setQuery] = useState("React");

  const items = [
    "React는 Facebook이 개발한 UI 라이브러리입니다.",
    "Vue.js는 점진적으로 채택 가능한 JavaScript 프레임워크입니다.",
    "Angular는 Google이 만든 TypeScript 기반 프레임워크입니다.",
    "Svelte는 컴파일 타임에 최적화되는 React 대안 프레임워크입니다.",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{
          padding: "8px 12px",
          border: "1px solid var(--ark-color-border)",
          borderRadius: 6,
          fontSize: 14,
          outline: "none",
          background: "var(--ark-color-surface)",
          color: "var(--ark-color-text-primary)",
        }}
      />
      {items.map((text, i) => (
        <div
          key={i}
          style={{
            padding: "10px 14px",
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            fontSize: 14,
            lineHeight: 1.6,
          }}
        >
          <Highlight highlight={query} color="primary">
            {text}
          </Highlight>
        </div>
      ))}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Highlight, useState }}
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
              <tr><td>children</td><td>string</td><td>필수</td><td>전체 텍스트 문자열</td></tr>
              <tr><td>highlight</td><td>string | string[]</td><td>필수</td><td>강조할 쿼리</td></tr>
              <tr><td>color</td><td>'yellow' | 'primary' | 'success' | 'warning' | 'error' | string</td><td>'yellow'</td><td>강조 배경색</td></tr>
              <tr><td>ignoreCase</td><td>boolean</td><td>true</td><td>대소문자 무시 여부</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
