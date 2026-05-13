import { ToggleGroup } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline } from "lucide-react";

export function ToggleGroupPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ToggleGroup</h1>
        <p className="page-description">
          토글 버튼 그룹 컴포넌트. 단일 선택 또는 다중 선택 모드를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="single">
        <h2 className="section-title">단일 선택</h2>
        <LiveCodeBlock
          code={`() => {
  const [value, setValue] = React.useState("center");
  return (
    <ToggleGroup
      value={value}
      onChange={setValue}
      items={[
        { value: "left", label: "왼쪽", icon: <AlignLeft size={16} /> },
        { value: "center", label: "가운데", icon: <AlignCenter size={16} /> },
        { value: "right", label: "오른쪽", icon: <AlignRight size={16} /> },
      ]}
    />
  );
}`}
          scope={{ ToggleGroup, React, AlignLeft, AlignCenter, AlignRight }}
        />
      </section>

      <section className="docs-section" id="multiple">
        <h2 className="section-title">다중 선택</h2>
        <LiveCodeBlock
          code={`() => {
  const [value, setValue] = React.useState(["bold"]);
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onChange={setValue}
      variant="outline"
      items={[
        { value: "bold", icon: <Bold size={16} /> },
        { value: "italic", icon: <Italic size={16} /> },
        { value: "underline", icon: <Underline size={16} /> },
      ]}
    />
  );
}`}
          scope={{ ToggleGroup, React, Bold, Italic, Underline }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <div>
    <strong>Default</strong>
    <ToggleGroup
      defaultValue="a"
      items={[
        { value: "a", label: "옵션 A" },
        { value: "b", label: "옵션 B" },
        { value: "c", label: "옵션 C" },
      ]}
    />
  </div>
  <div>
    <strong>Outline</strong>
    <ToggleGroup
      variant="outline"
      defaultValue="a"
      items={[
        { value: "a", label: "옵션 A" },
        { value: "b", label: "옵션 B" },
        { value: "c", label: "옵션 C" },
      ]}
    />
  </div>
  <div>
    <strong>Ghost</strong>
    <ToggleGroup
      variant="ghost"
      defaultValue="a"
      items={[
        { value: "a", label: "옵션 A" },
        { value: "b", label: "옵션 B" },
        { value: "c", label: "옵션 C" },
      ]}
    />
  </div>
</div>`}
          scope={{ ToggleGroup }}
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
              <tr><td>items</td><td>ToggleGroupItem[]</td><td>필수</td><td>토글 항목</td></tr>
              <tr><td>type</td><td>'single' | 'multiple'</td><td>'single'</td><td>선택 타입</td></tr>
              <tr><td>value</td><td>string | string[]</td><td>-</td><td>선택 값 (controlled)</td></tr>
              <tr><td>defaultValue</td><td>string | string[]</td><td>-</td><td>기본 선택 값</td></tr>
              <tr><td>onChange</td><td>(value) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'outline' | 'ghost'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>전체 비활성화</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>전체 너비 채우기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
