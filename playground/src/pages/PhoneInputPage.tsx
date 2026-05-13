import { useState } from "react";
import { PhoneInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PhoneInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PhoneInput</h1>
        <p className="page-description">
          전화번호 입력 필드. 국가코드 선택과 번호 포맷팅을 지원합니다.
          드롭다운에서 국가를 선택하면 자동으로 국가 전화 코드가 적용됩니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<PhoneInput
  label="전화번호"
  placeholder="010-0000-0000"
  helperText="국가코드를 포함한 전화번호를 입력하세요"
  style={{ maxWidth: 360 }}
/>`}
          scope={{ PhoneInput }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">국가코드 제어</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [country, setCountry] = useState("KR");
  const [value, setValue] = useState("");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <PhoneInput
        label="전화번호"
        countryCode={country}
        onCountryChange={(c) => setCountry(c.code)}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="번호를 입력하세요"
      />
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        선택된 국가: {country}
      </span>
    </div>
  );
}
render(<Demo />)`}
          scope={{ PhoneInput, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
  <PhoneInput size="sm" placeholder="Small" />
  <PhoneInput size="md" placeholder="Medium (기본)" />
  <PhoneInput size="lg" placeholder="Large" />
</div>`}
          scope={{ PhoneInput }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 상태</h2>
        <LiveCodeBlock
          code={`<PhoneInput
  label="전화번호"
  errorMessage="올바른 전화번호 형식이 아닙니다."
  style={{ maxWidth: 360 }}
/>`}
          scope={{ PhoneInput }}
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
              <tr><td>countryCode</td><td>string</td><td>'KR'</td><td>선택된 국가코드</td></tr>
              <tr><td>onCountryChange</td><td>(code: CountryCode) =&gt; void</td><td>-</td><td>국가 변경 핸들러</td></tr>
              <tr><td>countries</td><td>CountryCode[]</td><td>10개 국가</td><td>국가 목록 커스터마이징</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
