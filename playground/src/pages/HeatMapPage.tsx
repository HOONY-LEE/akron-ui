import { HeatMap } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

function generateSampleData() {
  const data = [];
  const end = new Date();
  const start = new Date();
  start.setFullYear(start.getFullYear() - 1);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    if (Math.random() > 0.3) {
      data.push({
        date: d.toISOString().split("T")[0],
        value: Math.floor(Math.random() * 20),
      });
    }
  }
  return data;
}

const sampleData = generateSampleData();

export function HeatMapPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">HeatMap</h1>
        <p className="page-description">
          캘린더 히트맵 컴포넌트. GitHub 기여도 그래프처럼 날짜별 데이터 밀도를 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<HeatMap data={sampleData} />`}
          scope={{ HeatMap, sampleData }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <HeatMap data={sampleData} color="green" />
  <HeatMap data={sampleData} color="blue" />
  <HeatMap data={sampleData} color="purple" />
  <HeatMap data={sampleData} color="orange" />
</div>`}
          scope={{ HeatMap, sampleData }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 설정</h2>
        <LiveCodeBlock
          code={`<HeatMap
  data={sampleData}
  cellSize={14}
  cellGap={3}
  color="blue"
  tooltipFormatter={(date, value) => date + ": " + value + "건"}
/>`}
          scope={{ HeatMap, sampleData }}
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
              <tr><td>data</td><td>HeatMapValue[]</td><td>필수</td><td>날짜별 값 배열</td></tr>
              <tr><td>startDate</td><td>Date</td><td>1년 전</td><td>시작 날짜</td></tr>
              <tr><td>endDate</td><td>Date</td><td>오늘</td><td>종료 날짜</td></tr>
              <tr><td>color</td><td>'green' | 'blue' | 'purple' | 'orange'</td><td>'green'</td><td>색상 팔레트</td></tr>
              <tr><td>cellSize</td><td>number</td><td>12</td><td>셀 크기 (px)</td></tr>
              <tr><td>cellGap</td><td>number</td><td>2</td><td>셀 간격 (px)</td></tr>
              <tr><td>showMonthLabels</td><td>boolean</td><td>true</td><td>월 라벨 표시</td></tr>
              <tr><td>showDayLabels</td><td>boolean</td><td>true</td><td>요일 라벨 표시</td></tr>
              <tr><td>emptyColor</td><td>string</td><td>bg-muted</td><td>빈 셀 색상</td></tr>
              <tr><td>tooltipFormatter</td><td>(date, value) =&gt; string</td><td>-</td><td>툴팁 포맷터</td></tr>
              <tr><td>onCellClick</td><td>(date, value) =&gt; void</td><td>-</td><td>셀 클릭 콜백</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>HeatMapValue</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>date</td><td>string</td><td>날짜 (YYYY-MM-DD)</td></tr>
              <tr><td>value</td><td>number</td><td>값</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
