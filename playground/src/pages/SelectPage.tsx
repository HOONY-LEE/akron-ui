import { Select } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const deptOptions = [
  { value: "hr", label: "인사팀" },
  { value: "dev", label: "개발팀" },
  { value: "design", label: "디자인팀" },
  { value: "marketing", label: "마케팅팀" },
  { value: "sales", label: "영업팀" },
];

export function SelectPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Select</h1>
        <p className="page-description">
          드롭다운 선택 컴포넌트. 옵션 목록에서 하나를 선택합니다.
          그룹핑, 에러 상태, 라벨, 도움말 텍스트를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState("");
  return (
    <div style={{ width: 240 }}>
      <Select
        label="부서"
        value={value}
        onValueChange={setValue}
        placeholder="부서를 선택하세요"
        options={[
          { value: "hr", label: "인사팀" },
          { value: "dev", label: "개발팀" },
          { value: "design", label: "디자인팀" },
          { value: "marketing", label: "마케팅팀" },
        ]}
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Select }}
          noInline
        />
      </section>

      <section className="docs-section" id="helper">
        <h2 className="section-title">도움말 / 에러</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, width: 240 }}>
  <Select
    label="상태"
    helperText="현재 근무 상태를 선택하세요."
    defaultValue="active"
    options={[
      { value: "active", label: "재직 중" },
      { value: "leave", label: "휴직" },
      { value: "resigned", label: "퇴사" },
    ]}
  />
  <Select
    label="직급"
    error
    errorMessage="필수 항목입니다."
    placeholder="직급 선택"
    options={[
      { value: "staff", label: "사원" },
      { value: "senior", label: "대리" },
      { value: "manager", label: "과장" },
    ]}
  />
</div>`}
          scope={{ Select }}
        />
      </section>

      <section className="docs-section" id="groups">
        <h2 className="section-title">그룹 옵션</h2>
        <p className="section-desc">
          <code className="inline-code">label</code>과 <code className="inline-code">options</code>를 가진 객체를 전달하면 그룹이 형성됩니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ width: 240 }}>
  <Select
    label="카테고리"
    placeholder="선택하세요"
    options={[
      {
        label: "개발",
        options: [
          { value: "fe", label: "프론트엔드" },
          { value: "be", label: "백엔드" },
          { value: "devops", label: "DevOps" },
        ],
      },
      {
        label: "디자인",
        options: [
          { value: "ui", label: "UI/UX" },
          { value: "graphic", label: "그래픽" },
        ],
      },
    ]}
  />
</div>`}
          scope={{ Select }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}>
  {["sm", "md", "lg"].map((size) => (
    <Select
      key={size}
      size={size}
      placeholder={size + " 크기"}
      defaultValue="a"
      options={[
        { value: "a", label: "옵션 A" },
        { value: "b", label: "옵션 B" },
      ]}
    />
  ))}
</div>`}
          scope={{ Select }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 240 }}>
  <Select
    disabled
    placeholder="비활성화"
    options={[{ value: "a", label: "옵션 A" }]}
  />
  <Select
    disabled
    defaultValue="a"
    options={[{ value: "a", label: "선택된 상태 + 비활성화" }]}
  />
</div>`}
          scope={{ Select }}
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
              <tr><td>options</td><td>SelectItem[]</td><td>-</td><td>옵션 목록 (SelectOption 또는 SelectGroup)</td></tr>
              <tr><td>value</td><td>string</td><td>-</td><td>선택된 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본 선택값 (비제어)</td></tr>
              <tr><td>onValueChange</td><td>(value: string) =&gt; void</td><td>-</td><td>변경 핸들러</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'선택하세요'</td><td>플레이스홀더</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
