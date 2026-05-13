import { BackToTop } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BackToTopPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">BackToTop</h1>
        <p className="page-description">
          맨 위로 이동 버튼 컴포넌트. 스크롤 임계값을 초과하면 자동으로 나타납니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`// 기본 (화면 우하단에 고정, 300px 스크롤 후 표시)
<BackToTop />

// 임계값 변경
<BackToTop threshold={100} />

// 레이블과 함께
<BackToTop label="맨 위로" size="lg" />`}
          scope={{ BackToTop }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  {/* 인라인 데모용 - position static override */}
  {[
    { variant: "filled", label: "filled" },
    { variant: "outline", label: "outline" },
    { variant: "ghost", label: "ghost" },
  ].map(({ variant, label }) => (
    <button
      key={variant}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        width: 44,
        height: 44,
        borderRadius: "50%",
        border: variant === "outline" ? "1px solid var(--ark-color-border)" : "none",
        background: variant === "filled" ? "var(--ark-color-primary)" : variant === "ghost" ? "rgba(0,0,0,0.05)" : "transparent",
        color: variant === "filled" ? "#fff" : "var(--ark-color-text-primary)",
        cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 18,
      }}
      title={label}
    >
      ↑
    </button>
  ))}
</div>`}
          scope={{ BackToTop }}
        />
      </section>

      <section className="docs-section" id="positions">
        <h2 className="section-title">위치 옵션</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <tbody>
              <tr>
                <td><code>bottom-right</code></td>
                <td>화면 오른쪽 하단 (기본)</td>
              </tr>
              <tr>
                <td><code>bottom-left</code></td>
                <td>화면 왼쪽 하단</td>
              </tr>
              <tr>
                <td><code>bottom-center</code></td>
                <td>화면 하단 중앙</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>threshold</td><td>number</td><td>300</td><td>버튼 표시 시작 스크롤 위치 (px)</td></tr>
              <tr><td>position</td><td>'bottom-right' | 'bottom-left' | 'bottom-center'</td><td>'bottom-right'</td><td>화면 고정 위치</td></tr>
              <tr><td>variant</td><td>'filled' | 'outline' | 'ghost'</td><td>'filled'</td><td>버튼 변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>버튼 크기</td></tr>
              <tr><td>behavior</td><td>ScrollBehavior</td><td>'smooth'</td><td>스크롤 동작</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>ArrowUp 아이콘</td><td>커스텀 아이콘</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>버튼 레이블 텍스트</td></tr>
              <tr><td>offsetX</td><td>number</td><td>24</td><td>가로 오프셋 (px)</td></tr>
              <tr><td>offsetY</td><td>number</td><td>24</td><td>세로 오프셋 (px)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
