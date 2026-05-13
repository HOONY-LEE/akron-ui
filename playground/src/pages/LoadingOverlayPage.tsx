import { useState } from "react";
import { LoadingOverlay } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function LoadingOverlayPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">LoadingOverlay</h1>
        <p className="page-description">
          로딩 오버레이. 부모 컨테이너를 덮어 로딩 상태를 표시합니다. position: relative인 부모 내에 배치하세요.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [loading, setLoading] = useState(false);

  const handleLoad = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div>
      <div style={{ position: "relative", padding: 32, border: "1px solid var(--ark-color-border)", borderRadius: 12 }}>
        <h3 style={{ margin: "0 0 8px", fontSize: 16 }}>데이터 영역</h3>
        <p style={{ margin: 0, color: "var(--ark-color-text-secondary)", fontSize: 14 }}>
          버튼을 누르면 2초간 로딩 오버레이가 표시됩니다.
        </p>
        <LoadingOverlay visible={loading} />
      </div>
      <button
        style={{
          marginTop: 12,
          padding: "8px 16px",
          background: "var(--ark-color-primary)",
          color: "var(--ark-color-primary-foreground)",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onClick={handleLoad}
        disabled={loading}
      >
        {loading ? "로딩 중..." : "로딩 시작"}
      </button>
    </div>
  );
}
render(<Demo />)`}
          scope={{ LoadingOverlay, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  {["spinner", "dots", "pulse"].map((variant) => (
    <div key={variant} style={{ position: "relative", width: 160, height: 100, border: "1px solid var(--ark-color-border)", borderRadius: 8 }}>
      <LoadingOverlay visible variant={variant} />
      <span style={{ position: "absolute", bottom: 8, left: 0, right: 0, textAlign: "center", fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>{variant}</span>
    </div>
  ))}
</div>`}
          scope={{ LoadingOverlay }}
        />
      </section>

      <section className="docs-section" id="with-label">
        <h2 className="section-title">레이블</h2>
        <LiveCodeBlock
          code={`<div style={{ position: "relative", height: 120, border: "1px solid var(--ark-color-border)", borderRadius: 8 }}>
  <LoadingOverlay visible label="데이터를 불러오는 중..." />
</div>`}
          scope={{ LoadingOverlay }}
        />
      </section>

      <section className="docs-section" id="blur">
        <h2 className="section-title">Blur 효과</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [loading, setLoading] = useState(true);
  return (
    <div>
      <div style={{ position: "relative", padding: 24, border: "1px solid var(--ark-color-border)", borderRadius: 12 }}>
        <p style={{ margin: 0, fontSize: 14 }}>이 콘텐츠는 blur 효과로 흐려집니다.</p>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <LoadingOverlay visible={loading} blur label="처리 중..." />
      </div>
      <button
        style={{ marginTop: 12, padding: "6px 14px", borderRadius: 6, cursor: "pointer", border: "1px solid var(--ark-color-border)" }}
        onClick={() => setLoading(v => !v)}
      >
        {loading ? "숨기기" : "표시"}
      </button>
    </div>
  );
}
render(<Demo />)`}
          scope={{ LoadingOverlay, useState }}
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
              <tr><td>visible</td><td>boolean</td><td>필수</td><td>오버레이 표시 여부</td></tr>
              <tr><td>variant</td><td>'spinner' | 'dots' | 'pulse'</td><td>'spinner'</td><td>로딩 인디케이터 종류</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>로딩 텍스트</td></tr>
              <tr><td>blur</td><td>boolean</td><td>false</td><td>배경 blur 효과</td></tr>
              <tr><td>opacity</td><td>number</td><td>0.6</td><td>배경 불투명도 (0~1)</td></tr>
              <tr><td>zIndex</td><td>number</td><td>10</td><td>z-index 값</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          💡 부모 요소에 <code className="inline-code">position: relative</code>가 필요합니다.
        </p>
      </section>
    </>
  );
}
