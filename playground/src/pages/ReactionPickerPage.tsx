import { ReactionPicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ReactionPickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ReactionPicker</h1>
        <p className="page-description">
          이모지 리액션 선택기 컴포넌트. 게시물이나 댓글에 리액션을 추가합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [reactions, setReactions] = React.useState([
    { emoji: "👍", count: 12, active: true },
    { emoji: "❤️", count: 5 },
    { emoji: "🎉", count: 3 },
    { emoji: "😄", count: 1 },
  ]);

  const handleChange = (emoji, active) => {
    setReactions(prev => {
      const existing = prev.find(r => r.emoji === emoji);
      if (existing) {
        return prev.map(r =>
          r.emoji === emoji
            ? { ...r, count: active ? r.count + 1 : r.count - 1, active }
            : r
        ).filter(r => r.count > 0);
      }
      return [...prev, { emoji, count: 1, active: true }];
    });
  };

  return (
    <ReactionPicker
      reactions={reactions}
      onChange={handleChange}
    />
  );
}`}
          scope={{ ReactionPicker }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <ReactionPicker
    size="sm"
    reactions={[{ emoji: "👍", count: 3, active: true }, { emoji: "❤️", count: 1 }]}
  />
  <ReactionPicker
    size="md"
    reactions={[{ emoji: "👍", count: 3, active: true }, { emoji: "❤️", count: 1 }]}
  />
  <ReactionPicker
    size="lg"
    reactions={[{ emoji: "👍", count: 3, active: true }, { emoji: "❤️", count: 1 }]}
  />
</div>`}
          scope={{ ReactionPicker }}
        />
      </section>

      <section className="docs-section" id="readonly">
        <h2 className="section-title">읽기 전용</h2>
        <LiveCodeBlock
          code={`<ReactionPicker
  readOnly
  reactions={[
    { emoji: "👍", count: 24 },
    { emoji: "❤️", count: 18 },
    { emoji: "🚀", count: 7 },
    { emoji: "🔥", count: 5 },
  ]}
/>`}
          scope={{ ReactionPicker }}
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
              <tr><td>reactions</td><td>Reaction[]</td><td>필수</td><td>반응 목록</td></tr>
              <tr><td>onChange</td><td>(emoji, active) =&gt; void</td><td>-</td><td>반응 변경 핸들러</td></tr>
              <tr><td>availableEmojis</td><td>string[]</td><td>기본 16개</td><td>선택 가능 이모지</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
              <tr><td>showAddButton</td><td>boolean</td><td>true</td><td>추가 버튼 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
