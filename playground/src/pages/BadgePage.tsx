import { Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BadgePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Badge</h1>
        <p className="page-description">
          뱃지 컴포넌트. 상태, 카테고리, 알림 개수 등을 시각적으로 표시합니다.
          다양한 변형(solid, subtle, outline)과 색상 테마를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형 (Variant)</h2>
        <p className="section-desc">
          <code className="inline-code">variant</code>: <code className="inline-code">solid</code> | <code className="inline-code">subtle</code> | <code className="inline-code">outline</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
  <Badge variant="solid">Solid</Badge>
  <Badge variant="subtle">Subtle</Badge>
  <Badge variant="outline">Outline</Badge>
</div>`}
          scope={{ Badge }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상 (Color)</h2>
        <p className="section-desc">
          <code className="inline-code">color</code>: <code className="inline-code">primary</code> | <code className="inline-code">success</code> | <code className="inline-code">warning</code> | <code className="inline-code">error</code> | <code className="inline-code">info</code> | <code className="inline-code">neutral</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  {["solid", "subtle", "outline"].map((variant) => (
    <div key={variant} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
      {["primary", "success", "warning", "error", "info", "neutral"].map((color) => (
        <Badge key={color} variant={variant} color={color}>
          {color}
        </Badge>
      ))}
    </div>
  ))}
</div>`}
          scope={{ Badge }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
  <Badge size="sm" color="primary">Small</Badge>
  <Badge size="md" color="primary">Medium</Badge>
  <Badge size="lg" color="primary">Large</Badge>
</div>`}
          scope={{ Badge }}
        />
      </section>

      <section className="docs-section" id="dot">
        <h2 className="section-title">점 (Dot)</h2>
        <p className="section-desc">
          <code className="inline-code">dot</code> prop으로 텍스트 없이 작은 점만 표시합니다. 상태 표시에 유용합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  {["primary", "success", "warning", "error", "info", "neutral"].map((color) => (
    <div key={color} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 14 }}>
      <Badge dot color={color} />
      <span>{color}</span>
    </div>
  ))}
</div>`}
          scope={{ Badge }}
        />
      </section>

      <section className="docs-section" id="count">
        <h2 className="section-title">숫자 카운트</h2>
        <p className="section-desc">
          <code className="inline-code">count</code> prop으로 숫자를 표시합니다. <code className="inline-code">maxCount</code> 초과 시 "99+" 형태로 표시됩니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Badge count={3} color="error" variant="solid" />
  <Badge count={12} color="error" variant="solid" />
  <Badge count={100} color="error" variant="solid" />
  <Badge count={100} maxCount={999} color="primary" variant="solid" />
</div>`}
          scope={{ Badge }}
        />
      </section>

      <section className="docs-section" id="inline">
        <h2 className="section-title">인라인 사용</h2>
        <p className="section-desc">텍스트 또는 UI 요소와 나란히 배치하는 예시입니다.</p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 15, fontWeight: 600 }}>
    받은 메시지
    <Badge count={5} color="error" variant="solid" size="sm" />
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
    <span>재직 중</span>
    <Badge color="success" variant="subtle">Active</Badge>
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
    <span>결제 대기</span>
    <Badge color="warning" variant="solid">Pending</Badge>
  </div>
</div>`}
          scope={{ Badge }}
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
              <tr><td>variant</td><td>'solid' | 'subtle' | 'outline'</td><td>'subtle'</td><td>시각적 스타일</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral'</td><td>'neutral'</td><td>색상 테마</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>dot</td><td>boolean</td><td>false</td><td>점(dot) 형태로 표시</td></tr>
              <tr><td>count</td><td>number</td><td>-</td><td>숫자 카운트</td></tr>
              <tr><td>maxCount</td><td>number</td><td>99</td><td>count 최대 표시 값</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
