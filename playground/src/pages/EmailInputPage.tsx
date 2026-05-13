import { EmailInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function EmailInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">EmailInput</h1>
        <p className="page-description">
          이메일 주소 입력 필드. 실시간 유효성 검증과 시각적 피드백을 제공합니다.
          유효한 이메일 형식일 때 초록색, 잘못된 형식일 때 빨간색으로 표시됩니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<EmailInput
  label="이메일"
  placeholder="user@example.com"
  helperText="업무용 이메일 주소를 입력하세요"
  style={{ maxWidth: 360 }}
/>`}
          scope={{ EmailInput }}
        />
      </section>

      <section className="docs-section" id="validation">
        <h2 className="section-title">실시간 유효성 검증</h2>
        <p className="section-desc">
          입력 중 실시간으로 이메일 형식을 검증합니다. <code className="inline-code">validateOnChange={"{false}"}</code>를 설정하면 포커스 아웃 시에만 검증합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 360 }}>
  <EmailInput
    placeholder="실시간 검증"
    validateOnChange
  />
  <EmailInput
    placeholder="포커스 아웃 후 검증"
    validateOnChange={false}
  />
</div>`}
          scope={{ EmailInput }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
  <EmailInput size="sm" placeholder="Small" />
  <EmailInput size="md" placeholder="Medium (기본)" />
  <EmailInput size="lg" placeholder="Large" />
</div>`}
          scope={{ EmailInput }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 메시지</h2>
        <LiveCodeBlock
          code={`<EmailInput
  label="이메일"
  errorMessage="이미 사용 중인 이메일 주소입니다."
  defaultValue="taken@example.com"
  style={{ maxWidth: 360 }}
/>`}
          scope={{ EmailInput }}
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
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>레이블</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>validateOnChange</td><td>boolean</td><td>true</td><td>실시간 유효성 검증</td></tr>
              <tr><td>validate</td><td>(value: string) =&gt; boolean</td><td>이메일 형식 검사</td><td>커스텀 유효성 검증</td></tr>
              <tr><td>showValidIcon</td><td>boolean</td><td>true</td><td>유효성 아이콘 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
