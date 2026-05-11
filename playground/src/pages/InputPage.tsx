import { Input } from "@sunghoon_lee/akron-ui";
import { CodeBlock } from "../components/CodeBlock";

export function InputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Input</h1>
        <p className="page-description">
          사용자로부터 텍스트 데이터를 입력받는 필드입니다. 라벨, 도움말, 에러 메시지를 포함할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">label</code> prop으로 라벨을 지정합니다.
          placeholder는 라벨을 대체하지 않으며, 보조 힌트로만 사용합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box vertical">
          <Input label="이름" placeholder="홍길동" />
          <Input label="이메일" type="email" placeholder="name@company.com" />
        </div>
        <CodeBlock>{`<Input label="이름" placeholder="홍길동" />
<Input label="이메일" type="email" placeholder="name@company.com" />`}</CodeBlock>
      </section>

      <section className="docs-section" id="sizes">
        <h3 className="section-subtitle">크기 조정하기</h3>
        <p className="section-desc">
          <code className="inline-code">inputSize</code> prop으로 3가지 크기를 지정할 수 있습니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box vertical">
          <Input inputSize="sm" placeholder="Small" />
          <Input inputSize="md" placeholder="Medium (기본)" />
          <Input inputSize="lg" placeholder="Large" />
        </div>
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <p className="section-desc">
          기본, 에러, 비활성 상태를 지원합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box vertical">
          <Input label="기본" placeholder="기본 상태" />
          <Input label="에러" errorMessage="필수 입력 항목입니다." />
          <Input label="비활성" placeholder="수정 불가" disabled />
        </div>
      </section>

      <section className="docs-section" id="labels">
        <h2 className="section-title">라벨 & 도움말</h2>
        <p className="section-desc">
          <code className="inline-code">helperText</code>로 보조 설명을,
          <code className="inline-code">errorMessage</code>로 에러 메시지를 표시합니다.
          에러 메시지가 있으면 도움말 대신 에러가 표시됩니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box vertical">
          <Input label="부서명" helperText="소속 부서를 입력하세요." placeholder="개발팀" />
          <Input label="사원번호" errorMessage="유효하지 않은 사원번호입니다." />
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>label</td>
                <td>string</td>
                <td>-</td>
                <td>입력 필드 라벨</td>
              </tr>
              <tr>
                <td>inputSize</td>
                <td>'sm' | 'md' | 'lg'</td>
                <td>'md'</td>
                <td>입력 필드 크기</td>
              </tr>
              <tr>
                <td>helperText</td>
                <td>string</td>
                <td>-</td>
                <td>보조 설명 텍스트</td>
              </tr>
              <tr>
                <td>errorMessage</td>
                <td>string</td>
                <td>-</td>
                <td>에러 메시지 (표시 시 에러 스타일 적용)</td>
              </tr>
              <tr>
                <td>type</td>
                <td>'text' | 'password' | 'email' | 'number'</td>
                <td>'text'</td>
                <td>HTML input type</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>비활성 상태</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
