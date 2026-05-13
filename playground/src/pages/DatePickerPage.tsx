import { useState } from "react";
import { DatePicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DatePickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DatePicker</h1>
        <p className="page-description">
          날짜 선택 컴포넌트. 캘린더 팝업 UI를 통해 날짜를 선택합니다.
          최소/최대 날짜 제한, 비활성 날짜, 날짜 형식 커스터마이징을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<DatePicker
  label="날짜 선택"
  helperText="클릭하여 날짜를 선택하세요"
  style={{ maxWidth: 280 }}
/>`}
          scope={{ DatePicker }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [date, setDate] = useState(new Date());
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
      <DatePicker
        label="날짜"
        value={date}
        onChange={setDate}
      />
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        선택됨: {date?.toLocaleDateString("ko-KR")}
      </span>
    </div>
  );
}
render(<Demo />)`}
          scope={{ DatePicker, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="min-max">
        <h2 className="section-title">최소/최대 날짜</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 280 }}>
  <DatePicker
    label="오늘 이후만 선택 가능"
    minDate={new Date()}
  />
  <DatePicker
    label="오늘 이전만 선택 가능"
    maxDate={new Date()}
  />
</div>`}
          scope={{ DatePicker }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
  <DatePicker size="sm" placeholder="Small" />
  <DatePicker size="md" placeholder="Medium (기본)" />
  <DatePicker size="lg" placeholder="Large" />
</div>`}
          scope={{ DatePicker }}
        />
      </section>

      <section className="docs-section" id="format">
        <h2 className="section-title">날짜 형식 커스터마이징</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 280 }}>
  <DatePicker
    label="기본 형식 (YYYY.MM.DD)"
    defaultValue={new Date()}
  />
  <DatePicker
    label="커스텀 형식"
    defaultValue={new Date()}
    formatDate={(d) => d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
  />
</div>`}
          scope={{ DatePicker }}
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
              <tr><td>value</td><td>Date | null</td><td>-</td><td>선택된 날짜 (제어)</td></tr>
              <tr><td>defaultValue</td><td>Date | null</td><td>-</td><td>기본 날짜</td></tr>
              <tr><td>onChange</td><td>(date: Date | null) =&gt; void</td><td>-</td><td>날짜 변경 핸들러</td></tr>
              <tr><td>minDate</td><td>Date</td><td>-</td><td>최소 날짜</td></tr>
              <tr><td>maxDate</td><td>Date</td><td>-</td><td>최대 날짜</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>formatDate</td><td>(date: Date) =&gt; string</td><td>YYYY.MM.DD</td><td>날짜 형식</td></tr>
              <tr><td>clearable</td><td>boolean</td><td>true</td><td>지우기 버튼</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'날짜 선택'</td><td>플레이스홀더</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
