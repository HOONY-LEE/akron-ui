import { useState } from "react";
import { MultiSelect } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function MultiSelectPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MultiSelect</h1>
        <p className="page-description">
          다중 선택 드롭다운. 체크박스로 여러 옵션을 선택하고 태그로 표시합니다.
          전체 선택, 그룹, 최대 선택 수 제한을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [values, setValues] = useState([]);
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "solid", label: "SolidJS" },
  ];
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        label="사용 기술"
        options={options}
        value={values}
        onChange={setValues}
        placeholder="기술 스택 선택"
      />
      <p style={{ marginTop: 8, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        선택: {values.length > 0 ? values.join(", ") : "없음"}
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ MultiSelect, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="select-all">
        <h2 className="section-title">전체 선택</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [values, setValues] = useState([]);
  const options = [
    { value: "mon", label: "월요일" },
    { value: "tue", label: "화요일" },
    { value: "wed", label: "수요일" },
    { value: "thu", label: "목요일" },
    { value: "fri", label: "금요일" },
  ];
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        label="요일"
        options={options}
        value={values}
        onChange={setValues}
        placeholder="요일 선택"
        showSelectAll
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ MultiSelect, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="groups">
        <h2 className="section-title">그룹</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [values, setValues] = useState([]);
  const options = [
    { value: "js", label: "JavaScript", group: "웹" },
    { value: "ts", label: "TypeScript", group: "웹" },
    { value: "css", label: "CSS", group: "웹" },
    { value: "py", label: "Python", group: "백엔드" },
    { value: "go", label: "Go", group: "백엔드" },
    { value: "java", label: "Java", group: "백엔드" },
  ];
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        label="언어"
        options={options}
        value={values}
        onChange={setValues}
        placeholder="언어 선택"
        showSelectAll
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ MultiSelect, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="max-select">
        <h2 className="section-title">최대 선택 수</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [values, setValues] = useState([]);
  const options = [
    { value: "a", label: "옵션 A" },
    { value: "b", label: "옵션 B" },
    { value: "c", label: "옵션 C" },
    { value: "d", label: "옵션 D" },
    { value: "e", label: "옵션 E" },
  ];
  return (
    <div style={{ maxWidth: 360 }}>
      <MultiSelect
        label="최대 2개 선택"
        options={options}
        value={values}
        onChange={setValues}
        placeholder="선택 (최대 2개)"
        maxSelect={2}
        helperText="최대 2개까지 선택할 수 있습니다."
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ MultiSelect, useState }}
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
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }}>
      <MultiSelect options={options} helperText="도움말 텍스트입니다." placeholder="일반" />
      <MultiSelect options={options} error errorMessage="하나 이상 선택해야 합니다." placeholder="에러" />
      <MultiSelect options={options} disabled placeholder="비활성화" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ MultiSelect, useState }}
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
              <tr><td>options</td><td>MultiSelectOption[]</td><td>필수</td><td>옵션 목록</td></tr>
              <tr><td>value</td><td>string[]</td><td>-</td><td>선택된 값 배열 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string[]</td><td>[]</td><td>초기 선택 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(values: string[]) =&gt; void</td><td>-</td><td>선택 변경 핸들러</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'선택하세요'</td><td>플레이스홀더</td></tr>
              <tr><td>searchPlaceholder</td><td>string</td><td>'검색...'</td><td>검색 입력 플레이스홀더</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
              <tr><td>required</td><td>boolean</td><td>-</td><td>필수 표시</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>maxTagsShown</td><td>number</td><td>3</td><td>태그 최대 표시 수 (초과 시 +N)</td></tr>
              <tr><td>showSelectAll</td><td>boolean</td><td>false</td><td>전체 선택 버튼 표시</td></tr>
              <tr><td>maxSelect</td><td>number</td><td>-</td><td>최대 선택 수 제한</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'결과 없음'</td><td>결과 없을 때 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
