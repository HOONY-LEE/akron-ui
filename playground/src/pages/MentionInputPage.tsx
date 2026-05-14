import { MentionInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const sampleUsers = [
  { id: "1", name: "김철수" },
  { id: "2", name: "이영희" },
  { id: "3", name: "박민수" },
  { id: "4", name: "정수진" },
  { id: "5", name: "최동훈" },
  { id: "6", name: "한지은" },
];

export function MentionInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MentionInput</h1>
        <p className="page-description">
          멘션 입력 컴포넌트. @를 입력하면 사용자 목록에서 선택하여 태그할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<MentionInput
  users={sampleUsers}
  placeholder="@를 입력하여 멘션하세요..."
  onChange={(value, mentions) => console.log(value, mentions)}
/>`}
          scope={{ MentionInput, sampleUsers }}
        />
      </section>

      <section className="docs-section" id="multiline">
        <h2 className="section-title">멀티라인</h2>
        <LiveCodeBlock
          code={`<MentionInput
  multiline
  rows={4}
  users={sampleUsers}
  placeholder="여러 줄 입력이 가능합니다. @를 입력해보세요..."
/>`}
          scope={{ MentionInput, sampleUsers }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <MentionInput size="sm" users={sampleUsers} placeholder="sm 크기" />
  <MentionInput size="md" users={sampleUsers} placeholder="md 크기" />
  <MentionInput size="lg" users={sampleUsers} placeholder="lg 크기" />
</div>`}
          scope={{ MentionInput, sampleUsers }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <MentionInput users={sampleUsers} error helperText="필수 입력 항목입니다" />
  <MentionInput users={sampleUsers} disabled placeholder="비활성화" />
</div>`}
          scope={{ MentionInput, sampleUsers }}
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
              <tr><td>users</td><td>MentionUser[]</td><td>필수</td><td>멘션 가능한 사용자 목록</td></tr>
              <tr><td>value</td><td>string</td><td>-</td><td>값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본값</td></tr>
              <tr><td>onChange</td><td>(value, mentions) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>trigger</td><td>string</td><td>'@'</td><td>트리거 문자</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>placeholder</td><td>string</td><td>-</td><td>플레이스홀더</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말</td></tr>
              <tr><td>multiline</td><td>boolean</td><td>false</td><td>멀티라인 모드</td></tr>
              <tr><td>rows</td><td>number</td><td>3</td><td>멀티라인 행 수</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>MentionUser</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 ID (필수)</td></tr>
              <tr><td>name</td><td>string</td><td>이름 (필수)</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 URL</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
