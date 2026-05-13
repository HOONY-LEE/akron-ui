import { CurrencyInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CurrencyInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CurrencyInput</h1>
        <p className="page-description">
          통화 형식의 숫자 입력 컴포넌트. 포커스 시 원시 숫자를 편집하고, 블러
          시 통화 형식으로 자동 포맷팅합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`() => {
  const [value, setValue] = React.useState(1500000);
  return (
    <div style={{ maxWidth: 300 }}>
      <CurrencyInput
        value={value}
        onChange={setValue}
        placeholder="금액 입력"
      />
      <p style={{ fontSize: 14, color: "var(--ark-color-text-secondary)", marginTop: 8 }}>
        값: {value !== null ? value.toLocaleString() : "null"}원
      </p>
    </div>
  );
}`}
          scope={{ CurrencyInput, React }}
        />
      </section>

      <section className="docs-section" id="currencies">
        <h2 className="section-title">다양한 통화</h2>
        <LiveCodeBlock
          code={`() => {
  const currencies = ["KRW", "USD", "EUR", "JPY", "GBP", "CNY"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
      {currencies.map((c) => (
        <CurrencyInput key={c} currency={c} defaultValue={1234.56} />
      ))}
    </div>
  );
}`}
          scope={{ CurrencyInput, React }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
  <CurrencyInput size="sm" defaultValue={10000} placeholder="sm" />
  <CurrencyInput size="md" defaultValue={10000} placeholder="md" />
  <CurrencyInput size="lg" defaultValue={10000} placeholder="lg" />
</div>`}
          scope={{ CurrencyInput }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 300 }}>
  <CurrencyInput defaultValue={50000} error placeholder="에러 상태" />
  <CurrencyInput defaultValue={50000} disabled placeholder="비활성화" />
</div>`}
          scope={{ CurrencyInput }}
        />
      </section>

      <section className="docs-section" id="minmax">
        <h2 className="section-title">최소/최대 값</h2>
        <LiveCodeBlock
          code={`() => {
  const [value, setValue] = React.useState(0);
  return (
    <div style={{ maxWidth: 300 }}>
      <CurrencyInput
        value={value}
        onChange={(v) => setValue(v ?? 0)}
        min={0}
        max={1000000}
        placeholder="0 ~ 1,000,000"
      />
      <p style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", marginTop: 4 }}>
        범위: 0 ~ 1,000,000
      </p>
    </div>
  );
}`}
          scope={{ CurrencyInput, React }}
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
              <tr><td>value</td><td>number | null</td><td>-</td><td>숫자 값 (controlled)</td></tr>
              <tr><td>defaultValue</td><td>number | null</td><td>null</td><td>기본 값</td></tr>
              <tr><td>onChange</td><td>(value: number | null) =&gt; void</td><td>-</td><td>값 변경 콜백</td></tr>
              <tr><td>currency</td><td>'KRW' | 'USD' | 'EUR' | 'JPY' | 'GBP' | 'CNY'</td><td>'KRW'</td><td>통화 코드</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>min</td><td>number</td><td>-</td><td>최솟값</td></tr>
              <tr><td>max</td><td>number</td><td>-</td><td>최댓값</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>symbolPosition</td><td>'prefix' | 'suffix'</td><td>'prefix'</td><td>통화 기호 위치</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
