import { PollWidget } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PollWidgetPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PollWidget</h1>
        <p className="page-description">
          투표/설문 위젯 컴포넌트. 팀 투표나 간단한 설문을 생성합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [votedId, setVotedId] = React.useState(null);
  const [options, setOptions] = React.useState([
    { id: "1", label: "React", votes: 42 },
    { id: "2", label: "Vue", votes: 28 },
    { id: "3", label: "Svelte", votes: 15 },
    { id: "4", label: "Angular", votes: 12 },
  ]);

  const handleVote = (optionId) => {
    if (votedId) return;
    setVotedId(optionId);
    setOptions(prev =>
      prev.map(o => o.id === optionId ? { ...o, votes: o.votes + 1 } : o)
    );
  };

  return (
    <PollWidget
      title="가장 좋아하는 프레임워크는?"
      description="하나를 선택해주세요"
      options={options}
      votedOptionId={votedId}
      onVote={handleVote}
    />
  );
}`}
          scope={{ PollWidget }}
        />
      </section>

      <section className="docs-section" id="closed">
        <h2 className="section-title">종료된 투표</h2>
        <LiveCodeBlock
          code={`<PollWidget
  title="점심 메뉴 투표"
  closed
  showResults
  options={[
    { id: "1", label: "한식", votes: 8 },
    { id: "2", label: "중식", votes: 5 },
    { id: "3", label: "일식", votes: 12 },
    { id: "4", label: "양식", votes: 3 },
  ]}
  votedOptionId="3"
  totalVoters={25}
/>`}
          scope={{ PollWidget }}
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
              <tr><td>title</td><td>string</td><td>필수</td><td>투표 제목</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>투표 설명</td></tr>
              <tr><td>options</td><td>PollOption[]</td><td>필수</td><td>옵션 목록</td></tr>
              <tr><td>votedOptionId</td><td>string | null</td><td>-</td><td>투표한 옵션 ID</td></tr>
              <tr><td>onVote</td><td>(optionId) =&gt; void</td><td>-</td><td>투표 핸들러</td></tr>
              <tr><td>showResults</td><td>boolean</td><td>투표 후 표시</td><td>결과 표시 여부</td></tr>
              <tr><td>closed</td><td>boolean</td><td>false</td><td>종료된 투표</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
