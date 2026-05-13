import { Watermark } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function WatermarkPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Watermark</h1>
        <p className="page-description">
          페이지 워터마크 오버레이 컴포넌트. 콘텐츠 위에 반복 텍스트 워터마크를 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Watermark text="사내 기밀">
  <div style={{
    padding: 40,
    background: "var(--ark-color-bg-subtle)",
    borderRadius: 8,
    minHeight: 200,
  }}>
    <h3 style={{ margin: 0 }}>기밀 문서</h3>
    <p>이 문서는 사내 기밀로 분류되어 있습니다. 외부 유출 시 법적 책임을 질 수 있습니다.</p>
  </div>
</Watermark>`}
          scope={{ Watermark }}
        />
      </section>

      <section className="docs-section" id="multi-line">
        <h2 className="section-title">두 줄 워터마크</h2>
        <LiveCodeBlock
          code={`<Watermark text="Confidential" subText="2026-05-14">
  <div style={{
    padding: 40,
    background: "var(--ark-color-bg-subtle)",
    borderRadius: 8,
    minHeight: 200,
  }}>
    <h3 style={{ margin: 0 }}>보고서</h3>
    <p>날짜와 함께 워터마크를 표시하여 문서의 출처를 추적할 수 있습니다.</p>
  </div>
</Watermark>`}
          scope={{ Watermark }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 설정</h2>
        <LiveCodeBlock
          code={`<Watermark text="DRAFT" fontSize={24} rotate={-30} opacity={0.12} gap={150}>
  <div style={{
    padding: 40,
    background: "var(--ark-color-bg-subtle)",
    borderRadius: 8,
    minHeight: 200,
  }}>
    <h3 style={{ margin: 0 }}>초안 문서</h3>
    <p>더 큰 폰트, 다른 각도, 더 진한 투명도로 설정된 워터마크입니다.</p>
  </div>
</Watermark>`}
          scope={{ Watermark }}
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
              <tr><td>text</td><td>string</td><td>필수</td><td>워터마크 텍스트</td></tr>
              <tr><td>subText</td><td>string</td><td>-</td><td>부가 텍스트 (두 번째 줄)</td></tr>
              <tr><td>fontSize</td><td>number</td><td>16</td><td>폰트 크기(px)</td></tr>
              <tr><td>rotate</td><td>number</td><td>-22</td><td>회전 각도(deg)</td></tr>
              <tr><td>gap</td><td>number</td><td>100</td><td>간격(px)</td></tr>
              <tr><td>opacity</td><td>number</td><td>0.08</td><td>투명도 (0~1)</td></tr>
              <tr><td>color</td><td>string</td><td>currentColor</td><td>색상</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
