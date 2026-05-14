import { TimeSlotPicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TimeSlotPickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TimeSlotPicker</h1>
        <p className="page-description">
          시간 슬롯 선택 컴포넌트. 회의 예약이나 일정 설정에 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<TimeSlotPicker
  startHour={9}
  endHour={18}
  interval={30}
  onChange={(selected) => console.log("선택:", selected)}
/>`}
          scope={{ TimeSlotPicker }}
        />
      </section>

      <section className="docs-section" id="multiple">
        <h2 className="section-title">다중 선택</h2>
        <LiveCodeBlock
          code={`<TimeSlotPicker
  multiple
  startHour={9}
  endHour={13}
  interval={30}
  columns={6}
  disabledSlots={["10:00", "10:30", "12:00"]}
  onChange={(selected) => console.log("선택:", selected)}
/>`}
          scope={{ TimeSlotPicker }}
        />
      </section>

      <section className="docs-section" id="custom-slots">
        <h2 className="section-title">커스텀 슬롯</h2>
        <LiveCodeBlock
          code={`<TimeSlotPicker
  slots={[
    { time: "09:00", label: "오전 1교시" },
    { time: "10:00", label: "오전 2교시" },
    { time: "11:00", label: "오전 3교시" },
    { time: "13:00", label: "오후 1교시" },
    { time: "14:00", label: "오후 2교시" },
    { time: "15:00", label: "오후 3교시", available: false },
    { time: "16:00", label: "오후 4교시" },
  ]}
  columns={4}
  onChange={(selected) => console.log("선택:", selected)}
/>`}
          scope={{ TimeSlotPicker }}
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
              <tr><td>slots</td><td>TimeSlot[]</td><td>자동 생성</td><td>시간 슬롯 목록</td></tr>
              <tr><td>startHour</td><td>number</td><td>9</td><td>시작 시간</td></tr>
              <tr><td>endHour</td><td>number</td><td>18</td><td>종료 시간</td></tr>
              <tr><td>interval</td><td>number</td><td>30</td><td>간격 (분)</td></tr>
              <tr><td>value</td><td>string[]</td><td>-</td><td>선택 값 (제어)</td></tr>
              <tr><td>onChange</td><td>(selected) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>multiple</td><td>boolean</td><td>false</td><td>다중 선택</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>columns</td><td>number</td><td>4</td><td>열 수</td></tr>
              <tr><td>disabledSlots</td><td>string[]</td><td>-</td><td>비활성 슬롯</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
