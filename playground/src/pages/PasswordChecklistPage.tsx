import { PasswordChecklist } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PasswordChecklistPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PasswordChecklist</h1>
        <p className="page-description">
          비밀번호 규칙 체크리스트 컴포넌트. 비밀번호 강도를 시각적으로 안내합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [password, setPassword] = React.useState("");

  return (
    <div style={{ maxWidth: 360 }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        style={{ width: "100%", padding: "8px 12px", marginBottom: 12, border: "1px solid #ddd", borderRadius: 6 }}
      />
      <PasswordChecklist password={password} />
    </div>
  );
}`}
          scope={{ PasswordChecklist }}
        />
      </section>

      <section className="docs-section" id="custom-rules">
        <h2 className="section-title">커스텀 규칙</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [password, setPassword] = React.useState("");

  return (
    <div style={{ maxWidth: 360 }}>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호를 입력하세요"
        style={{ width: "100%", padding: "8px 12px", marginBottom: 12, border: "1px solid #ddd", borderRadius: 6 }}
      />
      <PasswordChecklist
        password={password}
        rules={[
          { id: "len", label: "10자 이상", validate: (p) => p.length >= 10 },
          { id: "no-space", label: "공백 없음", validate: (p) => !/\\s/.test(p) },
          { id: "mixed", label: "영문 + 숫자 조합", validate: (p) => /[a-zA-Z]/.test(p) && /\\d/.test(p) },
        ]}
      />
    </div>
  );
}`}
          scope={{ PasswordChecklist }}
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
              <tr><td>password</td><td>string</td><td>필수</td><td>비밀번호</td></tr>
              <tr><td>rules</td><td>PasswordRule[]</td><td>기본 5가지</td><td>규칙 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>onAllPassed</td><td>(passed) =&gt; void</td><td>-</td><td>모두 통과 콜백</td></tr>
              <tr><td>minLength</td><td>number</td><td>8</td><td>최소 길이 (기본 규칙용)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
