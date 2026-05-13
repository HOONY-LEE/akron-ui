import { StatusDot } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function StatusDotPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">StatusDot</h1>
        <p className="page-description">
          상태 표시 점 컴포넌트. 온라인/오프라인, 서비스 상태 등을 색상 점으로 간결하게 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <StatusDot color="success" label="온라인" />
  <StatusDot color="warning" label="자리 비움" />
  <StatusDot color="error" label="오프라인" />
  <StatusDot color="info" label="회의 중" />
  <StatusDot color="gray" label="알 수 없음" />
  <StatusDot color="primary" label="활성" />
</div>`}
          scope={{ StatusDot }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <StatusDot size="xs" color="success" label="xs" />
  <StatusDot size="sm" color="success" label="sm" />
  <StatusDot size="md" color="success" label="md" />
  <StatusDot size="lg" color="success" label="lg" />
</div>`}
          scope={{ StatusDot }}
        />
      </section>

      <section className="docs-section" id="pulse">
        <h2 className="section-title">펄스 애니메이션</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 24 }}>
  <StatusDot color="success" pulse label="실시간" />
  <StatusDot color="error" pulse label="장애 발생" />
  <StatusDot color="primary" pulse label="처리 중" />
</div>`}
          scope={{ StatusDot }}
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
              <tr><td>color</td><td>'success' | 'warning' | 'error' | 'info' | 'gray' | 'primary'</td><td>'gray'</td><td>색상</td></tr>
              <tr><td>size</td><td>'xs' | 'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>pulse</td><td>boolean</td><td>false</td><td>펄스 애니메이션</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
