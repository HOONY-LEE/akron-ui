import { CronBuilder } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CronBuilderPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CronBuilder</h1>
        <p className="page-description">
          크론 표현식 빌더 컴포넌트. 스케줄링을 위한 크론 표현식을 시각적으로 구성합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<CronBuilder
  defaultValue="*/5 * * * *"
  onChange={(cron) => console.log("크론:", cron)}
/>`}
          scope={{ CronBuilder }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [cron, setCron] = React.useState("0 9 * * 1-5");
  return (
    <div>
      <CronBuilder value={cron} onChange={setCron} />
      <p style={{ marginTop: 12, color: "var(--ark-color-text-secondary)" }}>
        현재 값: <code>{cron}</code>
      </p>
    </div>
  );
}`}
          scope={{ CronBuilder }}
        />
      </section>

      <section className="docs-section" id="options">
        <h2 className="section-title">옵션</h2>
        <LiveCodeBlock
          code={`<CronBuilder
  defaultValue="0 0 1 * *"
  showExpression={false}
  showPreview
  size="sm"
/>`}
          scope={{ CronBuilder }}
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
              <tr><td>value</td><td>string</td><td>-</td><td>크론 표현식 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본 표현식</td></tr>
              <tr><td>onChange</td><td>(cron) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showExpression</td><td>boolean</td><td>true</td><td>크론 표현식 표시</td></tr>
              <tr><td>showPreview</td><td>boolean</td><td>true</td><td>읽기 쉬운 미리보기</td></tr>
              <tr><td>locale</td><td>'ko' | 'en'</td><td>'ko'</td><td>로케일</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
