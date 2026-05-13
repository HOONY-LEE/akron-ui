import { useState } from "react";
import { Combobox } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ComboboxPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Combobox</h1>
        <p className="page-description">
          검색 가능한 자동완성 셀렉트. 텍스트 검색으로 옵션을 필터링하고
          키보드 네비게이션, 그룹, 초기화 버튼을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "SolidJS" },
  ];
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="프레임워크"
        options={options}
        value={value}
        onChange={setValue}
        placeholder="프레임워크 선택"
        clearable
      />
      {value && (
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          선택: {value}
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Combobox, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="groups">
        <h2 className="section-title">그룹</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "js", label: "JavaScript", group: "웹" },
    { value: "ts", label: "TypeScript", group: "웹" },
    { value: "py", label: "Python", group: "백엔드" },
    { value: "go", label: "Go", group: "백엔드" },
    { value: "rust", label: "Rust", group: "시스템" },
    { value: "cpp", label: "C++", group: "시스템" },
  ];
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="언어"
        options={options}
        value={value}
        onChange={setValue}
        placeholder="언어 선택"
        clearable
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Combobox, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="description">
        <h2 className="section-title">설명 포함 옵션</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(null);
  const options = [
    { value: "basic", label: "기본 플랜", description: "월 9,900원 · 5GB" },
    { value: "pro", label: "프로 플랜", description: "월 29,900원 · 50GB" },
    { value: "enterprise", label: "엔터프라이즈", description: "별도 문의 · 무제한" },
  ];
  return (
    <div style={{ maxWidth: 320 }}>
      <Combobox
        label="요금제"
        options={options}
        value={value}
        onChange={setValue}
        placeholder="요금제 선택"
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Combobox, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const options = [
    { value: "a", label: "옵션 A" },
    { value: "b", label: "옵션 B" },
    { value: "c", label: "옵션 C" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <Combobox size="sm" options={options} placeholder="Small" />
      <Combobox size="md" options={options} placeholder="Medium (기본)" />
      <Combobox size="lg" options={options} placeholder="Large" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Combobox, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const options = [
    { value: "a", label: "옵션 A" },
    { value: "b", label: "옵션 B" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 320 }}>
      <Combobox options={options} helperText="도움말 텍스트가 표시됩니다." placeholder="일반" />
      <Combobox options={options} error errorMessage="필수 항목입니다." placeholder="에러 상태" />
      <Combobox options={options} disabled placeholder="비활성화" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Combobox, useState }}
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
              <tr><td>options</td><td>ComboboxOption[]</td><td>필수</td><td>옵션 목록</td></tr>
              <tr><td>value</td><td>string | null</td><td>-</td><td>선택된 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>초기 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: string | null) =&gt; void</td><td>-</td><td>선택 변경 핸들러</td></tr>
              <tr><td>onInputChange</td><td>(text: string) =&gt; void</td><td>-</td><td>검색 텍스트 변경</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'선택하세요'</td><td>선택 전 플레이스홀더</td></tr>
              <tr><td>searchPlaceholder</td><td>string</td><td>'검색...'</td><td>검색 입력 플레이스홀더</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
              <tr><td>required</td><td>boolean</td><td>-</td><td>필수 표시</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>clearable</td><td>boolean</td><td>false</td><td>초기화 버튼 표시</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>로딩 상태</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'결과 없음'</td><td>검색 결과 없을 때 메시지</td></tr>
              <tr><td>externalFilter</td><td>boolean</td><td>false</td><td>서버사이드 필터링 (내부 필터 비활성)</td></tr>
              <tr><td>renderOption</td><td>(opt) =&gt; ReactNode</td><td>-</td><td>커스텀 옵션 렌더러</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>ComboboxOption</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>string</td><td>옵션 값 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>옵션 레이블 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>부가 설명</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>group</td><td>string</td><td>그룹명</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
