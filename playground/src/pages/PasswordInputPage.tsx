import { useState } from "react";
import { PasswordInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PasswordInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PasswordInput</h1>
        <p className="page-description">
          비밀번호 입력 컴포넌트. 표시/숨김 토글과 선택적 비밀번호 강도 표시를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
  <PasswordInput label="비밀번호" placeholder="비밀번호를 입력하세요" />
  <PasswordInput label="비밀번호 확인" placeholder="비밀번호를 다시 입력하세요" />
</div>`}
          scope={{ PasswordInput }}
        />
      </section>

      <section className="docs-section" id="strength">
        <h2 className="section-title">비밀번호 강도 표시</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [password, setPassword] = useState("");
  return (
    <div style={{ maxWidth: 320 }}>
      <PasswordInput
        label="새 비밀번호"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showStrength
        hint="대소문자, 숫자, 특수문자를 포함하면 강도가 높아집니다"
        fullWidth
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ PasswordInput, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
  <PasswordInput size="sm" placeholder="Small" />
  <PasswordInput size="md" placeholder="Medium (기본)" />
  <PasswordInput size="lg" placeholder="Large" />
</div>`}
          scope={{ PasswordInput }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
  <PasswordInput label="기본" placeholder="일반 상태" />
  <PasswordInput
    label="오류"
    placeholder="비밀번호 입력"
    error="비밀번호가 일치하지 않습니다"
    defaultValue="wrongpassword"
  />
  <PasswordInput
    label="도움말"
    placeholder="최소 8자 이상"
    hint="영문, 숫자, 특수문자를 조합하세요"
  />
  <PasswordInput label="비활성화" placeholder="비활성화" disabled defaultValue="password123" />
</div>`}
          scope={{ PasswordInput }}
        />
      </section>

      <section className="docs-section" id="no-toggle">
        <h2 className="section-title">토글 없음</h2>
        <LiveCodeBlock
          code={`<div style={{ maxWidth: 320 }}>
  <PasswordInput
    label="비밀번호"
    placeholder="비밀번호 입력"
    showToggle={false}
  />
</div>`}
          scope={{ PasswordInput }}
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
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>입력 크기</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>레이블</td></tr>
              <tr><td>error</td><td>string</td><td>-</td><td>오류 메시지</td></tr>
              <tr><td>hint</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>전체 너비</td></tr>
              <tr><td>showToggle</td><td>boolean</td><td>true</td><td>표시/숨김 토글 버튼</td></tr>
              <tr><td>showStrength</td><td>boolean</td><td>false</td><td>비밀번호 강도 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
