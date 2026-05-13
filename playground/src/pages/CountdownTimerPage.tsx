import { CountdownTimer } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

// Target: 3 days from now for demo
const threeDaysFromNow = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);

export function CountdownTimerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CountdownTimer</h1>
        <p className="page-description">
          카운트다운 타이머 컴포넌트. 이벤트 마감, 출시 예정일, 한정 세일 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<CountdownTimer targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} />`}
          scope={{ CountdownTimer }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>default</p>
    <CountdownTimer targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} variant="default" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>card</p>
    <CountdownTimer targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} variant="card" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>minimal</p>
    <CountdownTimer targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} variant="minimal" showLabels={false} />
  </div>
</div>`}
          scope={{ CountdownTimer }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>sm</p>
    <CountdownTimer targetDate={new Date(Date.now() + 5 * 60 * 60 * 1000)} size="sm" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>md (기본)</p>
    <CountdownTimer targetDate={new Date(Date.now() + 5 * 60 * 60 * 1000)} size="md" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>lg</p>
    <CountdownTimer targetDate={new Date(Date.now() + 5 * 60 * 60 * 1000)} size="lg" variant="card" />
  </div>
</div>`}
          scope={{ CountdownTimer }}
        />
      </section>

      <section className="docs-section" id="custom-labels">
        <h2 className="section-title">커스텀 레이블</h2>
        <LiveCodeBlock
          code={`<CountdownTimer
  targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)}
  variant="card"
  size="lg"
  labels={{ days: "DAYS", hours: "HRS", minutes: "MIN", seconds: "SEC" }}
/>`}
          scope={{ CountdownTimer }}
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
              <tr><td>targetDate</td><td>Date | number</td><td>필수</td><td>카운트다운 목표 일시</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'card' | 'minimal'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>showDays</td><td>boolean</td><td>true</td><td>일(Days) 표시 여부</td></tr>
              <tr><td>showLabels</td><td>boolean</td><td>true</td><td>레이블 표시 여부</td></tr>
              <tr><td>separator</td><td>string</td><td>':'</td><td>구분자 문자</td></tr>
              <tr><td>onComplete</td><td>() =&gt; void</td><td>-</td><td>카운트다운 종료 콜백</td></tr>
              <tr><td>labels</td><td>{`{ days?, hours?, minutes?, seconds? }`}</td><td>-</td><td>커스텀 레이블</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
