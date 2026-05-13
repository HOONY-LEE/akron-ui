import { useState } from "react";
import { Calendar } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

function getTodayStr() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function getDateStr(offset: number) {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function CalendarPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Calendar</h1>
        <p className="page-description">
          캘린더 뷰 UI 컴포넌트. 월간/주간 보기를 지원하며 이벤트를 표시합니다.
          이벤트 데이터는 prop으로 전달받아 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Calendar style={{ height: 480 }} />`}
          scope={{ Calendar }}
        />
      </section>

      <section className="docs-section" id="events">
        <h2 className="section-title">이벤트 표시</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const today = getTodayStr();
  const events = [
    { id: "1", title: "팀 미팅", date: today, color: "var(--ark-color-primary-500)" },
    { id: "2", title: "점심 약속", date: today, color: "var(--ark-color-success-500)" },
    { id: "3", title: "기획 검토", date: getDateStr(1), color: "var(--ark-color-warning-500)" },
    { id: "4", title: "디자인 리뷰", date: getDateStr(2), color: "var(--ark-color-info-500)" },
    { id: "5", title: "스프린트 종료", date: getDateStr(5), color: "var(--ark-color-error-500)" },
    { id: "6", title: "주간 회의", date: getDateStr(-2), color: "var(--ark-color-primary-500)" },
  ];

  return (
    <Calendar
      events={events}
      style={{ height: 480 }}
    />
  );
}
render(<Demo />)`}
          scope={{ Calendar, useState, getTodayStr, getDateStr }}
          noInline
        />
      </section>

      <section className="docs-section" id="week-view">
        <h2 className="section-title">주간 보기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const events = [
    { id: "1", title: "팀 미팅", date: getTodayStr(), color: "var(--ark-color-primary-500)" },
    { id: "2", title: "코드 리뷰", date: getDateStr(1), color: "var(--ark-color-success-500)" },
    { id: "3", title: "배포", date: getDateStr(3), color: "var(--ark-color-error-500)" },
  ];

  return (
    <Calendar
      view="week"
      events={events}
      style={{ height: 300 }}
    />
  );
}
render(<Demo />)`}
          scope={{ Calendar, useState, getTodayStr, getDateStr }}
          noInline
        />
      </section>

      <section className="docs-section" id="click">
        <h2 className="section-title">날짜 클릭</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Calendar
        onDateClick={(date) => setSelected(date.toLocaleDateString("ko-KR"))}
        style={{ height: 400 }}
      />
      {selected && (
        <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
          선택된 날짜: {selected}
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Calendar, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Calendar Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>events</td><td>CalendarEvent[]</td><td>[]</td><td>이벤트 목록</td></tr>
              <tr><td>value</td><td>Date</td><td>-</td><td>현재 날짜 (제어)</td></tr>
              <tr><td>onChange</td><td>(date: Date) =&gt; void</td><td>-</td><td>날짜 변경 핸들러</td></tr>
              <tr><td>onDateClick</td><td>(date: Date) =&gt; void</td><td>-</td><td>날짜 클릭 핸들러</td></tr>
              <tr><td>view</td><td>'month' | 'week'</td><td>'month'</td><td>뷰 모드</td></tr>
              <tr><td>onViewChange</td><td>(view) =&gt; void</td><td>-</td><td>뷰 변경 핸들러</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>CalendarEvent</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>이벤트 ID (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>제목 (필수)</td></tr>
              <tr><td>date</td><td>string (YYYY-MM-DD)</td><td>날짜 (필수)</td></tr>
              <tr><td>color</td><td>string</td><td>배경 색상</td></tr>
              <tr><td>onClick</td><td>() =&gt; void</td><td>클릭 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
