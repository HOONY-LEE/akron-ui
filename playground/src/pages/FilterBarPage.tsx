import { FilterBar } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FilterBarPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FilterBar</h1>
        <p className="page-description">
          검색/필터 툴바 컴포넌트. 텍스트 검색, 셀렉트 필터, 날짜 필터를 하나의 바에 구성합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`() => {
  const [values, setValues] = React.useState({});
  return (
    <FilterBar
      values={values}
      onChange={setValues}
      onSearch={(v) => alert(JSON.stringify(v, null, 2))}
      fields={[
        {
          key: "status",
          label: "상태",
          type: "select",
          options: [
            { value: "active", label: "활성" },
            { value: "inactive", label: "비활성" },
            { value: "pending", label: "대기" },
          ],
        },
        {
          key: "department",
          label: "부서",
          type: "select",
          options: [
            { value: "dev", label: "개발팀" },
            { value: "design", label: "디자인팀" },
            { value: "pm", label: "기획팀" },
          ],
        },
        { key: "startDate", label: "시작일", type: "date" },
      ]}
    />
  );
}`}
          scope={{ FilterBar, React }}
        />
      </section>

      <section className="docs-section" id="compact">
        <h2 className="section-title">컴팩트 모드</h2>
        <LiveCodeBlock
          code={`<FilterBar
  compact
  fields={[
    {
      key: "type",
      label: "유형",
      type: "select",
      options: [
        { value: "all", label: "전체" },
        { value: "notice", label: "공지" },
        { value: "event", label: "이벤트" },
      ],
    },
  ]}
  onSearch={(v) => alert(JSON.stringify(v))}
/>`}
          scope={{ FilterBar }}
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
              <tr><td>fields</td><td>FilterField[]</td><td>필수</td><td>필터 필드 목록</td></tr>
              <tr><td>values</td><td>FilterValues</td><td>-</td><td>현재 필터 값 (controlled)</td></tr>
              <tr><td>onChange</td><td>(values) =&gt; void</td><td>-</td><td>필터 변경 콜백</td></tr>
              <tr><td>onSearch</td><td>(values) =&gt; void</td><td>-</td><td>검색 클릭 콜백</td></tr>
              <tr><td>onReset</td><td>() =&gt; void</td><td>-</td><td>초기화 콜백</td></tr>
              <tr><td>showSearch</td><td>boolean</td><td>true</td><td>검색 입력 표시</td></tr>
              <tr><td>searchPlaceholder</td><td>string</td><td>'검색...'</td><td>검색 플레이스홀더</td></tr>
              <tr><td>compact</td><td>boolean</td><td>false</td><td>컴팩트 모드</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
