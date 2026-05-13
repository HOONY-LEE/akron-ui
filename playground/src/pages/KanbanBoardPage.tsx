import { KanbanBoard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function KanbanBoardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">KanbanBoard</h1>
        <p className="page-description">
          칸반 보드 컴포넌트. 컬럼 간 드래그 앤 드롭으로 카드를 이동할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`() => {
  const [columns, setColumns] = React.useState([
    {
      id: "todo",
      title: "할 일",
      color: "var(--ark-color-gray-400)",
      cards: [
        { id: "1", title: "프로젝트 기획서 작성", description: "Q3 프로젝트 기획서를 작성합니다.", labels: [{ text: "기획" }] },
        { id: "2", title: "디자인 리뷰", labels: [{ text: "urgent", color: "var(--ark-color-warning-500)" }] },
      ],
    },
    {
      id: "in-progress",
      title: "진행 중",
      color: "var(--ark-color-primary-500)",
      cards: [
        { id: "3", title: "API 엔드포인트 개발", description: "사용자 인증 API 구현", labels: [{ text: "feature" }] },
      ],
    },
    {
      id: "done",
      title: "완료",
      color: "var(--ark-color-success-500)",
      cards: [
        { id: "4", title: "DB 스키마 설계", labels: [{ text: "done" }] },
      ],
    },
  ]);
  return (
    <KanbanBoard
      columns={columns}
      onChange={setColumns}
      onCardClick={(card) => alert(card.title)}
      onAddCard={(colId) => alert("카드 추가: " + colId)}
    />
  );
}`}
          scope={{ KanbanBoard, React }}
        />
      </section>

      <section className="docs-section" id="no-add">
        <h2 className="section-title">추가 버튼 숨김</h2>
        <LiveCodeBlock
          code={`<KanbanBoard
  showAddButton={false}
  columns={[
    {
      id: "backlog",
      title: "백로그",
      cards: [
        { id: "a", title: "성능 최적화" },
        { id: "b", title: "접근성 개선" },
      ],
    },
    {
      id: "sprint",
      title: "스프린트",
      cards: [
        { id: "c", title: "로그인 UI 리뉴얼", labels: [{ text: "feature" }] },
      ],
    },
  ]}
/>`}
          scope={{ KanbanBoard }}
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
              <tr><td>columns</td><td>KanbanColumn[]</td><td>필수</td><td>컬럼 목록</td></tr>
              <tr><td>onChange</td><td>(columns) =&gt; void</td><td>-</td><td>카드 이동 콜백</td></tr>
              <tr><td>onCardClick</td><td>(card, columnId) =&gt; void</td><td>-</td><td>카드 클릭 콜백</td></tr>
              <tr><td>onAddCard</td><td>(columnId) =&gt; void</td><td>-</td><td>카드 추가 클릭</td></tr>
              <tr><td>columnMinWidth</td><td>number</td><td>280</td><td>컬럼 최소 너비(px)</td></tr>
              <tr><td>showAddButton</td><td>boolean</td><td>true</td><td>카드 추가 버튼 표시</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>KanbanColumn</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>컬럼 제목 (필수)</td></tr>
              <tr><td>cards</td><td>KanbanCard[]</td><td>카드 목록 (필수)</td></tr>
              <tr><td>color</td><td>string</td><td>헤더 색상 바</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>KanbanCard</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>카드 제목 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>카드 설명</td></tr>
              <tr><td>labels</td><td>KanbanLabel[]</td><td>라벨 태그</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>커스텀 footer</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
