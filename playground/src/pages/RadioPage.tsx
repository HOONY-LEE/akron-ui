import { Radio, RadioGroup } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function RadioPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Radio</h1>
        <p className="page-description">
          라디오 버튼 컴포넌트. 여러 옵션 중 하나를 선택할 때 사용합니다.
          <code className="inline-code">RadioGroup</code>으로 그룹을 구성하거나,
          <code className="inline-code">Radio</code>를 단독으로 배치합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          <code className="inline-code">RadioGroup</code>에 <code className="inline-code">options</code> 배열을 전달합니다.
        </p>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState("email");
  return (
    <RadioGroup
      value={value}
      onValueChange={setValue}
      options={[
        { value: "email", label: "이메일" },
        { value: "sms", label: "SMS" },
        { value: "push", label: "앱 푸시" },
      ]}
    />
  );
}
render(<Demo />)`}
          scope={{ RadioGroup }}
          noInline
        />
      </section>

      <section className="docs-section" id="description">
        <h2 className="section-title">보조 텍스트</h2>
        <p className="section-desc">
          각 옵션에 <code className="inline-code">description</code>을 추가할 수 있습니다.
        </p>
        <LiveCodeBlock
          code={`<RadioGroup
  defaultValue="standard"
  options={[
    { value: "standard", label: "표준 배송", description: "3~5 영업일 이내 배송" },
    { value: "express", label: "빠른 배송", description: "1~2 영업일 이내 배송" },
    { value: "same", label: "당일 배송", description: "오전 10시 이전 주문 시 당일 배송", disabled: true },
  ]}
/>`}
          scope={{ RadioGroup }}
        />
      </section>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">가로 방향</h2>
        <p className="section-desc">
          <code className="inline-code">direction="horizontal"</code>으로 가로 배치합니다.
        </p>
        <LiveCodeBlock
          code={`<RadioGroup
  defaultValue="monthly"
  direction="horizontal"
  options={[
    { value: "monthly", label: "월간" },
    { value: "quarterly", label: "분기" },
    { value: "yearly", label: "연간" },
  ]}
/>`}
          scope={{ RadioGroup }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  {["sm", "md", "lg"].map((size) => (
    <RadioGroup
      key={size}
      defaultValue="a"
      size={size}
      direction="horizontal"
      options={[
        { value: "a", label: size + " 옵션 A" },
        { value: "b", label: size + " 옵션 B" },
      ]}
    />
  ))}
</div>`}
          scope={{ RadioGroup }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 상태</h2>
        <LiveCodeBlock
          code={`<RadioGroup
  error
  errorMessage="하나를 선택해주세요."
  options={[
    { value: "a", label: "옵션 A" },
    { value: "b", label: "옵션 B" },
  ]}
/>`}
          scope={{ RadioGroup }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">RadioGroup Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>options</td><td>RadioOption[]</td><td>-</td><td>옵션 목록</td></tr>
              <tr><td>value</td><td>string</td><td>-</td><td>선택된 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본 선택값 (비제어)</td></tr>
              <tr><td>onValueChange</td><td>(value: string) =&gt; void</td><td>-</td><td>변경 핸들러</td></tr>
              <tr><td>direction</td><td>'vertical' | 'horizontal'</td><td>'vertical'</td><td>배치 방향</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>전체 비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle">RadioOption</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>string</td><td>옵션 값</td></tr>
              <tr><td>label</td><td>string</td><td>표시 라벨</td></tr>
              <tr><td>description</td><td>string</td><td>보조 텍스트 (선택)</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>개별 비활성화 (선택)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
