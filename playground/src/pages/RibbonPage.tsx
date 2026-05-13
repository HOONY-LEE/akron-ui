import { Ribbon, Card } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function RibbonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Ribbon</h1>
        <p className="page-description">
          모서리 리본 컴포넌트. 카드나 이미지 위에 신상품, 할인, 베타 등의 상태를 표시할 때 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
  <Ribbon label="NEW">
    <div style={{ width: 160, height: 120, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
      카드
    </div>
  </Ribbon>
  <Ribbon label="SALE" color="danger">
    <div style={{ width: 160, height: 120, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
      카드
    </div>
  </Ribbon>
  <Ribbon label="BETA" color="warning">
    <div style={{ width: 160, height: 120, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
      카드
    </div>
  </Ribbon>
</div>`}
          scope={{ Ribbon }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  {["primary", "success", "warning", "danger", "info", "neutral"].map(color => (
    <Ribbon key={color} label={color.toUpperCase()} color={color}>
      <div style={{ width: 120, height: 100, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 10 }} />
    </Ribbon>
  ))}
</div>`}
          scope={{ Ribbon }}
        />
      </section>

      <section className="docs-section" id="placement">
        <h2 className="section-title">위치</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24 }}>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>top-right (기본)</p>
    <Ribbon label="RIGHT" placement="top-right">
      <div style={{ width: 160, height: 120, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 12 }} />
    </Ribbon>
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>top-left</p>
    <Ribbon label="LEFT" placement="top-left" color="success">
      <div style={{ width: 160, height: 120, background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 12 }} />
    </Ribbon>
  </div>
</div>`}
          scope={{ Ribbon }}
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
              <tr><td>label</td><td>string</td><td>필수</td><td>리본에 표시할 텍스트</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'</td><td>'primary'</td><td>리본 색상</td></tr>
              <tr><td>placement</td><td>'top-left' | 'top-right'</td><td>'top-right'</td><td>리본 위치</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>리본이 붙을 컨테이너</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
