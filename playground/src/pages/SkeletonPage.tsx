import { Skeleton } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SkeletonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Skeleton</h1>
        <p className="page-description">
          로딩 플레이스홀더 컴포넌트. 콘텐츠가 로드되기 전 레이아웃 구조를 시각적으로 표시합니다.
          pulse 애니메이션으로 로딩 상태를 직관적으로 전달합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
  <Skeleton variant="text" />
  <Skeleton variant="text" width="80%" />
  <Skeleton variant="text" width="60%" />
</div>`}
          scope={{ Skeleton }}
        />
      </section>

      <section className="docs-section" id="shapes">
        <h2 className="section-title">모양</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 16 }}>
  <Skeleton variant="circle" width={48} height={48} />
  <Skeleton variant="rect" width={120} height={80} />
  <Skeleton variant="text" width={160} height={16} />
</div>`}
          scope={{ Skeleton }}
        />
      </section>

      <section className="docs-section" id="card-placeholder">
        <h2 className="section-title">카드 플레이스홀더</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16 }}>
  {[1, 2].map((i) => (
    <div
      key={i}
      style={{
        width: 200,
        padding: 16,
        border: "1px solid var(--ark-color-border)",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <Skeleton variant="rect" width="100%" height={120} />
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Skeleton variant="circle" width={36} height={36} />
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
          <Skeleton variant="text" />
          <Skeleton variant="text" width="70%" />
        </div>
      </div>
    </div>
  ))}
</div>`}
          scope={{ Skeleton }}
        />
      </section>

      <section className="docs-section" id="no-animation">
        <h2 className="section-title">애니메이션 없음</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 280 }}>
  <Skeleton variant="text" animated={false} />
  <Skeleton variant="text" width="75%" animated={false} />
</div>`}
          scope={{ Skeleton }}
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
              <tr><td>variant</td><td>'text' | 'circle' | 'rect'</td><td>'rect'</td><td>모양</td></tr>
              <tr><td>width</td><td>string | number</td><td>-</td><td>가로 크기</td></tr>
              <tr><td>height</td><td>string | number</td><td>-</td><td>세로 크기</td></tr>
              <tr><td>animated</td><td>boolean</td><td>true</td><td>pulse 애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
