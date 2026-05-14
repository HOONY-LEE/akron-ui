import { DateRangePicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DateRangePickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DateRangePicker</h1>
        <p className="page-description">
          날짜 범위 선택 컴포넌트. 대시보드와 리포트에서 기간을 설정합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<DateRangePicker
  onChange={(range) => console.log(range)}
/>`}
          scope={{ DateRangePicker }}
        />
      </section>

      <section className="docs-section" id="presets">
        <h2 className="section-title">프리셋</h2>
        <LiveCodeBlock
          code={`<DateRangePicker
  presets={[
    { label: "오늘", range: { start: new Date(), end: new Date() } },
    { label: "최근 7일", range: { start: new Date(Date.now() - 7 * 86400000), end: new Date() } },
    { label: "최근 30일", range: { start: new Date(Date.now() - 30 * 86400000), end: new Date() } },
    { label: "이번 달", range: { start: new Date(new Date().getFullYear(), new Date().getMonth(), 1), end: new Date() } },
  ]}
  onChange={(range) => console.log(range)}
/>`}
          scope={{ DateRangePicker }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <DateRangePicker size="sm" placeholder="sm 크기" />
  <DateRangePicker size="md" placeholder="md 크기" />
  <DateRangePicker size="lg" placeholder="lg 크기" />
</div>`}
          scope={{ DateRangePicker }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <DateRangePicker error helperText="날짜를 선택해주세요" />
  <DateRangePicker disabled />
</div>`}
          scope={{ DateRangePicker }}
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
              <tr><td>value</td><td>DateRange</td><td>-</td><td>선택된 범위 (제어)</td></tr>
              <tr><td>defaultValue</td><td>DateRange</td><td>-</td><td>기본 범위</td></tr>
              <tr><td>onChange</td><td>(range) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'날짜 범위 선택'</td><td>플레이스홀더</td></tr>
              <tr><td>minDate</td><td>Date</td><td>-</td><td>최소 날짜</td></tr>
              <tr><td>maxDate</td><td>Date</td><td>-</td><td>최대 날짜</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말/에러 텍스트</td></tr>
              <tr><td>presets</td><td>DateRangePreset[]</td><td>-</td><td>프리셋 목록</td></tr>
              <tr><td>locale</td><td>'ko' | 'en'</td><td>'ko'</td><td>로케일</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
