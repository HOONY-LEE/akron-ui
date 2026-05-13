import { useState } from "react";
import { OTPInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function OTPInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">OTPInput</h1>
        <p className="page-description">
          인증코드 입력 필드. 자릿수별 개별 셀, 자동 포커스 이동, 붙여넣기 지원.
          숫자/영문/영숫자 타입을 선택할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [code, setCode] = useState("");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <OTPInput
        label="인증번호"
        helperText="이메일로 발송된 6자리 코드를 입력하세요"
        onChange={setCode}
        onComplete={(v) => alert("완료: " + v)}
      />
      {code && (
        <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
          입력 중: {code}
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ OTPInput, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="types">
        <h2 className="section-title">입력 타입</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <OTPInput label="숫자 (기본)" type="numeric" length={6} />
  <OTPInput label="영문" type="alpha" length={4} />
  <OTPInput label="영숫자" type="alphanumeric" length={8} />
</div>`}
          scope={{ OTPInput }}
        />
      </section>

      <section className="docs-section" id="separator">
        <h2 className="section-title">구분자</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <OTPInput label="2자리 구분" length={6} separator={2} />
  <OTPInput label="3자리 구분" length={9} separator={3} />
</div>`}
          scope={{ OTPInput }}
        />
      </section>

      <section className="docs-section" id="mask">
        <h2 className="section-title">마스킹</h2>
        <LiveCodeBlock
          code={`<OTPInput
  label="비밀번호 입력"
  length={4}
  mask
  helperText="PIN 번호를 입력하세요"
/>`}
          scope={{ OTPInput }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <OTPInput size="sm" length={6} />
  <OTPInput size="md" length={6} />
  <OTPInput size="lg" length={6} />
</div>`}
          scope={{ OTPInput }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 상태</h2>
        <LiveCodeBlock
          code={`<OTPInput
  label="인증번호"
  defaultValue="123456"
  errorMessage="인증번호가 일치하지 않습니다"
/>`}
          scope={{ OTPInput }}
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
              <tr><td>length</td><td>number</td><td>6</td><td>OTP 자릿수</td></tr>
              <tr><td>value</td><td>string</td><td>-</td><td>현재 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>""</td><td>기본 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>-</td><td>값 변경 핸들러</td></tr>
              <tr><td>onComplete</td><td>(value: string) =&gt; void</td><td>-</td><td>완료 핸들러</td></tr>
              <tr><td>type</td><td>'numeric' | 'alpha' | 'alphanumeric'</td><td>'numeric'</td><td>입력 타입</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>mask</td><td>boolean</td><td>false</td><td>비밀번호 마스킹</td></tr>
              <tr><td>separator</td><td>number</td><td>-</td><td>구분자 위치 (N칸마다)</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
