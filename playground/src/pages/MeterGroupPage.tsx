import { MeterGroup } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function MeterGroupPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MeterGroup</h1>
        <p className="page-description">
          다중 세그먼트 스택 바 컴포넌트. 스토리지 사용량, 예산 분배, 인구 통계 등을 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<MeterGroup
  items={[
    { label: "사진",   value: 45 },
    { label: "동영상", value: 30 },
    { label: "문서",   value: 15 },
    { label: "기타",   value: 10 },
  ]}
  showPercent
/>`}
          scope={{ MeterGroup }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  {["sm", "md", "lg"].map(size => (
    <div key={size}>
      <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--ark-color-text-secondary)" }}>{size}</p>
      <MeterGroup
        size={size}
        items={[
          { label: "사용됨", value: 72 },
          { label: "예약됨", value: 15 },
          { label: "여유",   value: 13 },
        ]}
        legend="none"
      />
    </div>
  ))}
</div>`}
          scope={{ MeterGroup }}
        />
      </section>

      <section className="docs-section" id="storage">
        <h2 className="section-title">스토리지 사용량 예시</h2>
        <LiveCodeBlock
          code={`<div style={{ padding: 20, border: "1px solid var(--ark-color-border)", borderRadius: 12 }}>
  <p style={{ margin: "0 0 12px", fontWeight: 600 }}>스토리지 사용량 (256 GB 중 189 GB)</p>
  <MeterGroup
    items={[
      { label: "시스템",   value: 45, color: "var(--ark-color-primary-500)" },
      { label: "앱",       value: 62, color: "var(--ark-color-warning-500)" },
      { label: "사진",     value: 55, color: "var(--ark-color-success-500)" },
      { label: "문서",     value: 20, color: "#8b5cf6" },
      { label: "기타",     value: 7,  color: "var(--ark-color-gray-400)" },
    ]}
    total={256}
    unit=" GB"
    showValue
    size="lg"
  />
</div>`}
          scope={{ MeterGroup }}
        />
      </section>

      <section className="docs-section" id="right-legend">
        <h2 className="section-title">우측 레전드</h2>
        <LiveCodeBlock
          code={`<MeterGroup
  items={[
    { label: "완료",   value: 68 },
    { label: "진행 중", value: 22 },
    { label: "대기",   value: 10 },
  ]}
  legend="right"
  showPercent
  size="md"
/>`}
          scope={{ MeterGroup }}
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
              <tr><td>items</td><td>MeterItem[]</td><td>필수</td><td>세그먼트 목록</td></tr>
              <tr><td>total</td><td>number</td><td>items 합산</td><td>기준 합산값 (100% 기준)</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>바 두께</td></tr>
              <tr><td>legend</td><td>'none' | 'bottom' | 'right'</td><td>'bottom'</td><td>레전드 위치</td></tr>
              <tr><td>showPercent</td><td>boolean</td><td>true</td><td>퍼센트 표시</td></tr>
              <tr><td>showValue</td><td>boolean</td><td>false</td><td>실제 값 표시</td></tr>
              <tr><td>unit</td><td>string</td><td>''</td><td>값 단위 (예: ' GB')</td></tr>
              <tr><td>formatValue</td><td>(value, percent) =&gt; string</td><td>-</td><td>커스텀 포맷 함수</td></tr>
              <tr><td>animated</td><td>boolean</td><td>true</td><td>진입 애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
