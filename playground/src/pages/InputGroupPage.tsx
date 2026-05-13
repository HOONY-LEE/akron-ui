import { useState } from "react";
import { InputGroup, InputGroupAddon, Input, Button, Select } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Search, AtSign, Link, Copy } from "lucide-react";

export function InputGroupPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">InputGroup</h1>
        <p className="page-description">
          입력 그룹. Input 앞뒤에 텍스트, 아이콘, 버튼 등의 어돈을 붙여 복합 입력 필드를 구성합니다.
        </p>
      </header>

      <section className="docs-section" id="text-addon">
        <h2 className="section-title">텍스트 어돈</h2>
        <LiveCodeBlock
          code={`function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <InputGroup prepend={<InputGroupAddon>https://</InputGroupAddon>}>
        <Input placeholder="example.com" />
      </InputGroup>
      <InputGroup append={<InputGroupAddon>.com</InputGroupAddon>}>
        <Input placeholder="도메인 이름" />
      </InputGroup>
      <InputGroup
        prepend={<InputGroupAddon>₩</InputGroupAddon>}
        append={<InputGroupAddon>원</InputGroupAddon>}
      >
        <Input placeholder="금액" type="number" />
      </InputGroup>
    </div>
  );
}
render(<Demo />)`}
          scope={{ InputGroup, InputGroupAddon, Input, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="icon-addon">
        <h2 className="section-title">아이콘 어돈</h2>
        <LiveCodeBlock
          code={`function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <InputGroup prepend={<InputGroupAddon><Search size={14} /></InputGroupAddon>}>
        <Input placeholder="검색어 입력" />
      </InputGroup>
      <InputGroup prepend={<InputGroupAddon><AtSign size={14} /></InputGroupAddon>}>
        <Input placeholder="이메일 주소" />
      </InputGroup>
      <InputGroup prepend={<InputGroupAddon><Link size={14} /></InputGroupAddon>}>
        <Input placeholder="URL" />
      </InputGroup>
    </div>
  );
}
render(<Demo />)`}
          scope={{ InputGroup, InputGroupAddon, Input, useState, Search, AtSign, Link }}
          noInline
        />
      </section>

      <section className="docs-section" id="button-addon">
        <h2 className="section-title">버튼 어돈</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("https://example.com/share/abc123");

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
      <InputGroup append={
        <Button size="sm" variant="outline" onClick={handleCopy}>
          <Copy size={14} />
          {copied ? "복사됨" : "복사"}
        </Button>
      }>
        <Input value={url} onChange={e => setUrl(e.target.value)} readOnly />
      </InputGroup>
      <InputGroup append={
        <Button size="sm">검색</Button>
      }>
        <Input placeholder="검색어 입력" />
      </InputGroup>
    </div>
  );
}
render(<Demo />)`}
          scope={{ InputGroup, InputGroupAddon, Input, Button, useState, Copy }}
          noInline
        />
      </section>

      <section className="docs-section" id="select-addon">
        <h2 className="section-title">셀렉트 어돈</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [unit, setUnit] = useState("px");
  return (
    <div style={{ maxWidth: 320 }}>
      <InputGroup append={
        <Select
          options={[
            { value: "px", label: "px" },
            { value: "%", label: "%" },
            { value: "em", label: "em" },
            { value: "rem", label: "rem" },
          ]}
          value={unit}
          onChange={setUnit}
          size="sm"
          style={{ border: "none", borderRadius: 0, background: "transparent", minHeight: "unset" }}
        />
      }>
        <Input placeholder="값 입력" type="number" />
      </InputGroup>
    </div>
  );
}
render(<Demo />)`}
          scope={{ InputGroup, InputGroupAddon, Input, Button, Select, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`function Demo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <InputGroup prepend={<InputGroupAddon>https://</InputGroupAddon>}>
        <Input placeholder="일반 상태" />
      </InputGroup>
      <InputGroup error prepend={<InputGroupAddon>https://</InputGroupAddon>}>
        <Input placeholder="에러 상태" error />
      </InputGroup>
      <InputGroup disabled prepend={<InputGroupAddon>https://</InputGroupAddon>}>
        <Input placeholder="비활성화" disabled />
      </InputGroup>
    </div>
  );
}
render(<Demo />)`}
          scope={{ InputGroup, InputGroupAddon, Input, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">InputGroup Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>prepend</td><td>ReactNode</td><td>-</td><td>좌측 어돈</td></tr>
              <tr><td>append</td><td>ReactNode</td><td>-</td><td>우측 어돈</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태 (빨간 테두리)</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>전체 너비</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          <code className="inline-code">InputGroupAddon</code> — 텍스트/아이콘 어돈에 일관된 패딩/스타일을 적용하는 헬퍼 컴포넌트
        </p>
      </section>
    </>
  );
}
