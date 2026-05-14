import { PinBoard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PinBoardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PinBoard</h1>
        <p className="page-description">
          핀 보드 컴포넌트. 드래그 가능한 스티키 노트를 자유롭게 배치합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [items, setItems] = React.useState([
    { id: "1", content: "회의 안건 정리하기", color: "yellow", x: 20, y: 20 },
    { id: "2", content: "디자인 리뷰 피드백 반영", color: "green", x: 240, y: 30 },
    { id: "3", content: "API 문서 업데이트", color: "blue", x: 460, y: 20 },
    { id: "4", content: "배포 체크리스트 확인", color: "pink", x: 100, y: 200 },
    { id: "5", content: "팀 회고 준비", color: "purple", x: 350, y: 190, pinned: true, author: "김철수" },
  ]);

  return (
    <PinBoard
      items={items}
      onChange={setItems}
      onItemDelete={(id) => setItems(items.filter(item => item.id !== id))}
      minHeight={400}
    />
  );
}`}
          scope={{ PinBoard }}
        />
      </section>

      <section className="docs-section" id="readonly">
        <h2 className="section-title">읽기 전용</h2>
        <LiveCodeBlock
          code={`<PinBoard
  readOnly
  minHeight={300}
  items={[
    { id: "1", content: "완료된 작업 1", color: "green", x: 20, y: 20, author: "이영희" },
    { id: "2", content: "완료된 작업 2", color: "green", x: 240, y: 30, author: "박민수" },
    { id: "3", content: "진행 중인 작업", color: "orange", x: 460, y: 20 },
  ]}
/>`}
          scope={{ PinBoard }}
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
              <tr><td>items</td><td>PinItem[]</td><td>필수</td><td>핀 항목 목록</td></tr>
              <tr><td>onChange</td><td>(items) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>onItemClick</td><td>(item) =&gt; void</td><td>-</td><td>항목 클릭 콜백</td></tr>
              <tr><td>onItemDelete</td><td>(id) =&gt; void</td><td>-</td><td>항목 삭제 콜백</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
              <tr><td>minHeight</td><td>number</td><td>500</td><td>최소 높이</td></tr>
              <tr><td>showGrid</td><td>boolean</td><td>true</td><td>격자 배경 표시</td></tr>
              <tr><td>gridSize</td><td>number</td><td>20</td><td>격자 간격</td></tr>
              <tr><td>snapToGrid</td><td>boolean</td><td>false</td><td>격자에 맞춤</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>PinItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 ID (필수)</td></tr>
              <tr><td>content</td><td>string</td><td>내용 (필수)</td></tr>
              <tr><td>color</td><td>'yellow' | 'green' | 'blue' | 'pink' | 'purple' | 'orange'</td><td>색상</td></tr>
              <tr><td>x</td><td>number</td><td>X 위치 (필수)</td></tr>
              <tr><td>y</td><td>number</td><td>Y 위치 (필수)</td></tr>
              <tr><td>width</td><td>number</td><td>너비 (기본 200)</td></tr>
              <tr><td>height</td><td>number</td><td>높이 (기본 150)</td></tr>
              <tr><td>pinned</td><td>boolean</td><td>고정 여부</td></tr>
              <tr><td>author</td><td>string</td><td>작성자</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
