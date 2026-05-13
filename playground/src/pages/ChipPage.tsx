import { useState } from "react";
import { Chip } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ChipPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Chip</h1>
        <p className="page-description">
          칩/태그 컴포넌트. 선택 가능하고 삭제 버튼을 포함할 수 있습니다.
          필터, 태그, 카테고리 선택 등 다양한 용도로 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <Chip label="React" />
  <Chip label="TypeScript" />
  <Chip label="CSS Modules" />
</div>`}
          scope={{ Chip }}
        />
      </section>

      <section className="docs-section" id="selectable">
        <h2 className="section-title">선택 가능</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const tags = ["React", "Vue", "Angular", "Svelte", "Solid"];
  const [selected, setSelected] = useState(["React"]);

  const toggle = (tag) => {
    setSelected((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          selected={selected.includes(tag)}
          onSelect={() => toggle(tag)}
          color="primary"
        />
      ))}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Chip, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="deletable">
        <h2 className="section-title">삭제 가능</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [tags, setTags] = useState(["디자인", "개발", "마케팅", "기획"]);
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {tags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          deletable
          onDelete={() => setTags((prev) => prev.filter((t) => t !== tag))}
        />
      ))}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Chip, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
  <Chip label="Neutral" color="neutral" />
  <Chip label="Primary" color="primary" />
  <Chip label="Success" color="success" />
  <Chip label="Warning" color="warning" />
  <Chip label="Error" color="error" />
</div>`}
          scope={{ Chip }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 8 }}>
  <Chip label="Small" size="sm" />
  <Chip label="Medium" size="md" />
  <Chip label="Large" size="lg" />
</div>`}
          scope={{ Chip }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8 }}>
  <Chip label="기본" disabled />
  <Chip label="선택됨" selected disabled />
  <Chip label="삭제 가능" deletable disabled />
</div>`}
          scope={{ Chip }}
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
              <tr><td>label</td><td>string</td><td>-</td><td>칩 텍스트 (필수)</td></tr>
              <tr><td>selected</td><td>boolean</td><td>false</td><td>선택 상태</td></tr>
              <tr><td>onSelect</td><td>(selected: boolean) =&gt; void</td><td>-</td><td>선택 토글 핸들러</td></tr>
              <tr><td>deletable</td><td>boolean</td><td>false</td><td>삭제 버튼 표시</td></tr>
              <tr><td>onDelete</td><td>() =&gt; void</td><td>-</td><td>삭제 클릭 핸들러</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>color</td><td>'neutral' | 'primary' | 'success' | 'warning' | 'error'</td><td>'neutral'</td><td>색상 테마</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
