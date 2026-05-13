import { ReadingProgress } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ReadingProgressPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ReadingProgress</h1>
        <p className="page-description">
          읽기 진행률 바 컴포넌트. 블로그 포스트, 문서 페이지에서 스크롤 위치를 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`// 페이지 상단에 고정된 진행률 바 (실제로는 window 스크롤을 추적)
<ReadingProgress />

// 색상 변경
<ReadingProgress color="success" />

// 그라디언트
<ReadingProgress color="gradient" height={4} />`}
          scope={{ ReadingProgress }}
        />
      </section>

      <section className="docs-section" id="custom-container">
        <h2 className="section-title">스크롤 컨테이너 내에서</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const containerRef = React.useRef(null);
  return (
    <div style={{ position: "relative" }}>
      <ReadingProgress
        scrollContainer={containerRef}
        placement="top"
        color="primary"
        style={{ position: "absolute" }}
      />
      <div
        ref={containerRef}
        style={{ height: 300, overflow: "auto", border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 16, paddingTop: 8 }}
      >
        {Array.from({ length: 40 }, (_, i) => (
          <p key={i} style={{ margin: "8px 0" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Paragraphs {i + 1}.
          </p>
        ))}
      </div>
    </div>
  );
}`}
          scope={{ ReadingProgress }}
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
              <tr><td>height</td><td>number</td><td>3</td><td>진행 바 두께 (px)</td></tr>
              <tr><td>placement</td><td>'top' | 'bottom'</td><td>'top'</td><td>화면 고정 위치</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'danger' | 'gradient'</td><td>'primary'</td><td>색상</td></tr>
              <tr><td>progressColor</td><td>string</td><td>-</td><td>커스텀 색상 (CSS 값)</td></tr>
              <tr><td>scrollContainer</td><td>RefObject&lt;HTMLElement&gt;</td><td>-</td><td>스크롤 컨테이너 (기본: window)</td></tr>
              <tr><td>zIndex</td><td>number</td><td>1000</td><td>z-index</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
