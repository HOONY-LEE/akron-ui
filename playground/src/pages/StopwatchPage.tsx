import { Stopwatch } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function StopwatchPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Stopwatch</h1>
        <p className="page-description">
          스톱워치 컴포넌트. 시간 측정과 랩 기록을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Stopwatch
  onLap={(lap) => console.log("랩:", lap)}
/>`}
          scope={{ Stopwatch }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
  <Stopwatch size="sm" showLaps={false} />
  <Stopwatch size="lg" showLaps={false} />
</div>`}
          scope={{ Stopwatch }}
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
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showLaps</td><td>boolean</td><td>true</td><td>랩 기능 활성화</td></tr>
              <tr><td>onChange</td><td>(elapsed) =&gt; void</td><td>-</td><td>시간 변경 핸들러</td></tr>
              <tr><td>onLap</td><td>(lap) =&gt; void</td><td>-</td><td>랩 추가 핸들러</td></tr>
              <tr><td>onReset</td><td>() =&gt; void</td><td>-</td><td>리셋 핸들러</td></tr>
              <tr><td>autoStart</td><td>boolean</td><td>false</td><td>자동 시작</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
