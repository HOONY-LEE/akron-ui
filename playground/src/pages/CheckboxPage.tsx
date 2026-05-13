import { Checkbox } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CheckboxPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Checkbox</h1>
        <p className="page-description">
          체크박스 입력 컴포넌트. 단일 또는 그룹으로 사용하며 폼 내 다중 선택에 활용합니다.
          라벨, 보조 텍스트, 에러 상태, 불확정(indeterminate) 상태를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          <code className="inline-code">label</code> prop으로 라벨을 설정합니다.
        </p>
        <LiveCodeBlock
          code={`function Demo() {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      id="agree"
      label="이용약관에 동의합니다"
      checked={checked}
      onCheckedChange={setChecked}
    />
  );
}
render(<Demo />)`}
          scope={{ Checkbox }}
          noInline
        />
      </section>

      <section className="docs-section" id="description">
        <h2 className="section-title">보조 텍스트</h2>
        <p className="section-desc">
          <code className="inline-code">description</code> prop으로 추가 설명을 표시합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Checkbox
    id="cb1"
    label="마케팅 정보 수신 동의"
    description="이메일, SMS로 이벤트 및 혜택 정보를 받겠습니다."
    defaultChecked
  />
  <Checkbox
    id="cb2"
    label="개인정보 처리 동의"
    description="수집된 정보는 서비스 제공 목적으로만 사용됩니다."
  />
</div>`}
          scope={{ Checkbox }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Checkbox id="sm" size="sm" label="Small" defaultChecked />
  <Checkbox id="md" size="md" label="Medium (기본값)" defaultChecked />
  <Checkbox id="lg" size="lg" label="Large" defaultChecked />
</div>`}
          scope={{ Checkbox }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <p className="section-desc">
          disabled, error, indeterminate 상태를 지원합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Checkbox id="s1" label="기본" />
  <Checkbox id="s2" label="선택됨" defaultChecked />
  <Checkbox id="s3" label="Indeterminate" checked="indeterminate" />
  <Checkbox id="s4" label="비활성화" disabled />
  <Checkbox id="s5" label="비활성화 + 선택" disabled defaultChecked />
  <Checkbox
    id="s6"
    label="에러 상태"
    error
    errorMessage="필수 항목입니다."
  />
</div>`}
          scope={{ Checkbox }}
        />
      </section>

      <section className="docs-section" id="group">
        <h2 className="section-title">체크박스 그룹</h2>
        <p className="section-desc">
          전체 선택/해제 패턴과 indeterminate 상태 활용 예시입니다.
        </p>
        <LiveCodeBlock
          code={`function Demo() {
  const items = ["항목 1", "항목 2", "항목 3"];
  const [checked, setChecked] = useState([false, false, false]);

  const allChecked = checked.every(Boolean);
  const someChecked = checked.some(Boolean);
  const parentState = allChecked ? true : someChecked ? "indeterminate" : false;

  const toggleAll = () => {
    setChecked(checked.fill(!allChecked));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Checkbox
        id="all"
        label="전체 선택"
        checked={parentState}
        onCheckedChange={toggleAll}
      />
      <div style={{ paddingLeft: 24, display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item, i) => (
          <Checkbox
            key={i}
            id={"item" + i}
            label={item}
            checked={checked[i]}
            onCheckedChange={(val) => {
              const next = [...checked];
              next[i] = Boolean(val);
              setChecked(next);
            }}
          />
        ))}
      </div>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Checkbox }}
          noInline
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
              <tr><td>checked</td><td>boolean | "indeterminate"</td><td>-</td><td>체크 상태 (제어)</td></tr>
              <tr><td>defaultChecked</td><td>boolean</td><td>-</td><td>기본 체크 상태 (비제어)</td></tr>
              <tr><td>onCheckedChange</td><td>(checked: boolean | "indeterminate") =&gt; void</td><td>-</td><td>상태 변경 핸들러</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>보조 설명 텍스트</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>id</td><td>string</td><td>-</td><td>label 연결용 고유 id</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
