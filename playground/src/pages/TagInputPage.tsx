import { useState } from "react";
import { TagInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TagInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TagInput</h1>
        <p className="page-description">
          태그 입력 필드. Enter 또는 쉼표로 태그를 추가하고, Backspace로 삭제합니다.
          최대 개수 제한, 중복 방지, 커스텀 유효성 검증을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [tags, setTags] = useState(["React", "TypeScript"]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 480 }}>
      <TagInput
        label="기술 스택"
        helperText="Enter 또는 쉼표로 태그를 추가하세요"
        value={tags}
        onChange={setTags}
        placeholder="태그 입력..."
      />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        태그: {tags.join(", ")}
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ TagInput, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">태그 색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
  <TagInput tagColor="neutral" defaultValue={["태그1", "태그2"]} label="Neutral (기본)" />
  <TagInput tagColor="primary" defaultValue={["태그1", "태그2"]} label="Primary" />
  <TagInput tagColor="success" defaultValue={["태그1", "태그2"]} label="Success" />
  <TagInput tagColor="warning" defaultValue={["태그1", "태그2"]} label="Warning" />
  <TagInput tagColor="error"   defaultValue={["태그1", "태그2"]} label="Error" />
</div>`}
          scope={{ TagInput }}
        />
      </section>

      <section className="docs-section" id="validation">
        <h2 className="section-title">유효성 검증</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
  <TagInput
    label="이메일 태그"
    placeholder="이메일 주소 입력..."
    validate={(tag) => {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(tag)) {
        return "올바른 이메일 형식이 아닙니다";
      }
      return true;
    }}
    helperText="이메일 형식만 입력 가능합니다"
  />
  <TagInput
    label="최대 3개"
    maxTags={3}
    defaultValue={["A", "B"]}
    helperText="최대 3개까지 추가할 수 있습니다"
  />
</div>`}
          scope={{ TagInput }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
  <TagInput size="sm" defaultValue={["Small"]} placeholder="Small" />
  <TagInput size="md" defaultValue={["Medium"]} placeholder="Medium (기본)" />
  <TagInput size="lg" defaultValue={["Large"]} placeholder="Large" />
</div>`}
          scope={{ TagInput }}
        />
      </section>

      <section className="docs-section" id="readonly">
        <h2 className="section-title">읽기 전용 / 비활성화</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
  <TagInput
    label="읽기 전용"
    readOnly
    defaultValue={["React", "Vue", "Angular"]}
  />
  <TagInput
    label="비활성화"
    disabled
    defaultValue={["React", "Vue"]}
  />
</div>`}
          scope={{ TagInput }}
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
              <tr><td>value</td><td>string[]</td><td>-</td><td>태그 목록 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string[]</td><td>[]</td><td>기본 태그 목록 (비제어)</td></tr>
              <tr><td>onChange</td><td>(tags: string[]) =&gt; void</td><td>-</td><td>변경 핸들러</td></tr>
              <tr><td>placeholder</td><td>string</td><td>-</td><td>플레이스홀더</td></tr>
              <tr><td>maxTags</td><td>number</td><td>-</td><td>최대 태그 수</td></tr>
              <tr><td>addKeys</td><td>string[]</td><td>['Enter', ',']</td><td>태그 추가 트리거 키</td></tr>
              <tr><td>allowDuplicates</td><td>boolean</td><td>false</td><td>중복 허용</td></tr>
              <tr><td>validate</td><td>(tag: string) =&gt; boolean | string</td><td>-</td><td>유효성 검증 함수</td></tr>
              <tr><td>tagColor</td><td>'neutral' | 'primary' | 'success' | 'warning' | 'error'</td><td>'neutral'</td><td>태그 색상</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
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
