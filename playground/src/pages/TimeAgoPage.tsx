import { TimeAgo } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TimeAgoPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TimeAgo</h1>
        <p className="page-description">
          상대적 시간 표시 컴포넌트. "방금 전", "3시간 전"처럼 현재 시각 기준의 경과 시간을 표시하며 자동으로 업데이트됩니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <TimeAgo date={new Date(Date.now() - 5000)} />
  <TimeAgo date={new Date(Date.now() - 45000)} />
  <TimeAgo date={new Date(Date.now() - 5 * 60 * 1000)} />
  <TimeAgo date={new Date(Date.now() - 3 * 60 * 60 * 1000)} />
  <TimeAgo date={new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)} />
  <TimeAgo date={new Date(Date.now() - 40 * 24 * 60 * 60 * 1000)} />
</div>`}
          scope={{ TimeAgo }}
        />
      </section>

      <section className="docs-section" id="locale">
        <h2 className="section-title">로케일</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <div>
    <strong>한국어:</strong>
    <TimeAgo date={new Date(Date.now() - 2 * 60 * 60 * 1000)} locale="ko" />
  </div>
  <div>
    <strong>English:</strong>
    <TimeAgo date={new Date(Date.now() - 2 * 60 * 60 * 1000)} locale="en" />
  </div>
</div>`}
          scope={{ TimeAgo }}
        />
      </section>

      <section className="docs-section" id="future">
        <h2 className="section-title">미래 시간</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <TimeAgo date={new Date(Date.now() + 30 * 1000)} locale="ko" />
  <TimeAgo date={new Date(Date.now() + 10 * 60 * 1000)} locale="ko" />
  <TimeAgo date={new Date(Date.now() + 5 * 60 * 60 * 1000)} locale="ko" />
  <TimeAgo date={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} locale="ko" />
</div>`}
          scope={{ TimeAgo }}
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
              <tr><td>date</td><td>Date | string | number</td><td>필수</td><td>기준 날짜/시각</td></tr>
              <tr><td>locale</td><td>'ko' | 'en'</td><td>'ko'</td><td>표시 언어</td></tr>
              <tr><td>updateInterval</td><td>number</td><td>30000</td><td>자동 업데이트 간격(ms), 0이면 비활성화</td></tr>
              <tr><td>showTitle</td><td>boolean</td><td>true</td><td>호버 시 절대 시간 툴팁 표시</td></tr>
              <tr><td>hideSuffix</td><td>boolean</td><td>false</td><td>suffix 숨김 (현재 미사용)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
