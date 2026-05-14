import { FormWizard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FormWizardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FormWizard</h1>
        <p className="page-description">
          멀티 스텝 폼 위자드 컴포넌트. 복잡한 양식을 단계별로 나누어 입력합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<FormWizard
  steps={[
    {
      title: "기본 정보",
      description: "이름과 이메일을 입력하세요",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label>이름<br /><input type="text" placeholder="홍길동" style={{ width: "100%", padding: 8 }} /></label>
          <label>이메일<br /><input type="email" placeholder="user@example.com" style={{ width: "100%", padding: 8 }} /></label>
        </div>
      ),
    },
    {
      title: "부서 선택",
      description: "소속 부서를 선택하세요",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label><input type="radio" name="dept" /> 개발팀</label>
          <label><input type="radio" name="dept" /> 디자인팀</label>
          <label><input type="radio" name="dept" /> 마케팅팀</label>
        </div>
      ),
    },
    {
      title: "확인",
      content: <p>입력한 정보를 확인하고 완료 버튼을 눌러주세요.</p>,
    },
  ]}
  onComplete={() => alert("완료!")}
/>`}
          scope={{ FormWizard }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 레이아웃</h2>
        <LiveCodeBlock
          code={`<FormWizard
  variant="vertical"
  steps={[
    { title: "1단계", content: <p>첫 번째 단계입니다.</p> },
    { title: "2단계", content: <p>두 번째 단계입니다.</p> },
    { title: "3단계", content: <p>세 번째 단계입니다.</p> },
  ]}
  onComplete={() => alert("완료!")}
/>`}
          scope={{ FormWizard }}
        />
      </section>

      <section className="docs-section" id="with-cancel">
        <h2 className="section-title">취소 버튼</h2>
        <LiveCodeBlock
          code={`<FormWizard
  showCancel
  steps={[
    { title: "단계 1", content: <p>첫 번째 단계</p> },
    { title: "단계 2", content: <p>두 번째 단계</p> },
    { title: "단계 3", content: <p>세 번째 단계</p> },
  ]}
  onCancel={() => alert("취소됨")}
  onComplete={() => alert("완료!")}
/>`}
          scope={{ FormWizard }}
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
              <tr><td>steps</td><td>WizardStep[]</td><td>필수</td><td>단계 목록</td></tr>
              <tr><td>activeStep</td><td>number</td><td>-</td><td>현재 단계 (제어)</td></tr>
              <tr><td>defaultStep</td><td>number</td><td>0</td><td>초기 단계</td></tr>
              <tr><td>onChange</td><td>(step) =&gt; void</td><td>-</td><td>단계 변경 콜백</td></tr>
              <tr><td>onComplete</td><td>() =&gt; void</td><td>-</td><td>완료 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>레이아웃</td></tr>
              <tr><td>showStepNumbers</td><td>boolean</td><td>true</td><td>단계 번호 표시</td></tr>
              <tr><td>allowStepClick</td><td>boolean</td><td>true</td><td>완료된 단계 클릭 허용</td></tr>
              <tr><td>showCancel</td><td>boolean</td><td>false</td><td>취소 버튼 표시</td></tr>
              <tr><td>onCancel</td><td>() =&gt; void</td><td>-</td><td>취소 콜백</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>WizardStep</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>단계 제목 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>단계 설명</td></tr>
              <tr><td>content</td><td>ReactNode</td><td>단계 내용 (필수)</td></tr>
              <tr><td>optional</td><td>boolean</td><td>선택적 단계</td></tr>
              <tr><td>validate</td><td>() =&gt; boolean | Promise&lt;boolean&gt;</td><td>유효성 검증 함수</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
