import { useState } from "react";
import { FormField, FormLabel, FormDescription, FormMessage, FormGroup, Input, Textarea, Select, Checkbox, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FormPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Form</h1>
        <p className="page-description">
          폼 레이아웃 헬퍼 컴포넌트. <code className="inline-code">FormField</code>와 함께
          레이블, 설명, 에러 메시지를 일관된 구조로 구성합니다.
          라디오 그룹, 체크박스 그룹 등에 <code className="inline-code">FormGroup</code>을 사용하세요.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
  <FormField>
    <FormLabel>이름</FormLabel>
    <Input placeholder="홍길동" />
  </FormField>
  <FormField>
    <FormLabel>이메일</FormLabel>
    <FormDescription>업무용 이메일을 입력하세요.</FormDescription>
    <Input type="email" placeholder="user@example.com" />
  </FormField>
</div>`}
          scope={{ FormField, FormLabel, FormDescription, Input }}
        />
      </section>

      <section className="docs-section" id="required">
        <h2 className="section-title">필수 필드</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
  <FormField required>
    <FormLabel>이름</FormLabel>
    <Input placeholder="필수 입력" />
  </FormField>
  <FormField required>
    <FormLabel>비밀번호</FormLabel>
    <Input type="password" placeholder="8자 이상 입력" />
    <FormDescription>영문, 숫자, 특수문자를 포함해야 합니다.</FormDescription>
  </FormField>
</div>`}
          scope={{ FormField, FormLabel, FormDescription, Input }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 상태</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState("");
  const [touched, setTouched] = useState(false);
  const hasError = touched && value.length < 3;

  return (
    <div style={{ maxWidth: 400 }}>
      <FormField error={hasError}>
        <FormLabel>사용자명</FormLabel>
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="최소 3자 이상"
          error={hasError}
        />
        <FormMessage error={hasError ? "사용자명은 3자 이상이어야 합니다." : ""}>
          {!hasError && "아이디로 사용될 이름입니다."}
        </FormMessage>
      </FormField>
    </div>
  );
}
render(<Demo />)`}
          scope={{ FormField, FormLabel, FormMessage, Input, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="group">
        <h2 className="section-title">FormGroup</h2>
        <LiveCodeBlock
          code={`<div style={{ maxWidth: 480 }}>
  <FormGroup legend="알림 설정">
    <FormField>
      <Checkbox label="이메일 알림" description="중요한 업데이트를 이메일로 받습니다" defaultChecked />
    </FormField>
    <FormField>
      <Checkbox label="SMS 알림" description="긴급 공지를 문자로 받습니다" />
    </FormField>
    <FormField>
      <Checkbox label="마케팅 수신 동의" description="이벤트 및 프로모션 정보를 받습니다" />
    </FormField>
  </FormGroup>
</div>`}
          scope={{ FormField, FormGroup, Checkbox }}
        />
      </section>

      <section className="docs-section" id="complete-form">
        <h2 className="section-title">전체 폼 예시</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
      style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 480 }}
    >
      <FormField required>
        <FormLabel>이름</FormLabel>
        <Input placeholder="홍길동" />
      </FormField>
      <FormField required>
        <FormLabel>이메일</FormLabel>
        <Input type="email" placeholder="user@example.com" />
      </FormField>
      <FormField>
        <FormLabel>부서</FormLabel>
        <Select
          placeholder="부서 선택"
          options={[
            { label: "개발팀", value: "dev" },
            { label: "디자인팀", value: "design" },
            { label: "마케팅팀", value: "marketing" },
          ]}
        />
      </FormField>
      <FormField>
        <FormLabel>자기소개</FormLabel>
        <FormDescription>간략한 소개를 작성해 주세요 (선택)</FormDescription>
        <Textarea placeholder="안녕하세요..." rows={3} />
      </FormField>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <Button type="button" variant="ghost">취소</Button>
        <Button type="submit">제출</Button>
      </div>
      {submitted && (
        <p style={{ fontSize: 13, color: "var(--ark-color-success-500)", margin: 0 }}>
          ✓ 폼이 제출되었습니다
        </p>
      )}
    </form>
  );
}
render(<Demo />)`}
          scope={{ FormField, FormLabel, FormDescription, FormMessage, Input, Textarea, Select, Checkbox, Button, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">FormField Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>required</td><td>boolean</td><td>false</td><td>필수 여부 (레이블에 * 표시)</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>id</td><td>string</td><td>자동 생성</td><td>필드 고유 ID</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>FormMessage Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>error</td><td>string</td><td>에러 메시지 텍스트 (지정 시 빨간색)</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>힌트 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
