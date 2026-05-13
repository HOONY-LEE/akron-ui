import { SearchHighlight } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SearchHighlightPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">SearchHighlight</h1>
        <p className="page-description">
          텍스트 내 검색어를 하이라이트하는 컴포넌트. 검색 결과 표시에 유용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<SearchHighlight
  text="Akron UI는 React 기반의 컴포넌트 라이브러리입니다. UI 개발을 빠르게 도와줍니다."
  query="UI"
/>`}
          scope={{ SearchHighlight }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <SearchHighlight text="Yellow 하이라이트 텍스트입니다" query="하이라이트" color="yellow" />
  <SearchHighlight text="Blue 하이라이트 텍스트입니다" query="하이라이트" color="blue" />
  <SearchHighlight text="Green 하이라이트 텍스트입니다" query="하이라이트" color="green" />
  <SearchHighlight text="Red 하이라이트 텍스트입니다" query="하이라이트" color="red" />
  <SearchHighlight text="Purple 하이라이트 텍스트입니다" query="하이라이트" color="purple" />
</div>`}
          scope={{ SearchHighlight }}
        />
      </section>

      <section className="docs-section" id="interactive">
        <h2 className="section-title">인터랙티브 검색</h2>
        <LiveCodeBlock
          code={`() => {
  const [query, setQuery] = React.useState("React");
  const sampleText = "Akron UI는 React와 TypeScript로 개발된 컴포넌트 라이브러리입니다. React의 최신 기능을 활용하여 개발 생산성을 높입니다.";
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="검색어 입력..."
        style={{
          padding: "8px 12px", borderRadius: 6,
          border: "1px solid var(--ark-color-border)",
          marginBottom: 12, width: "100%", fontSize: 14,
        }}
      />
      <SearchHighlight text={sampleText} query={query} color="blue" as="p" />
    </div>
  );
}`}
          scope={{ SearchHighlight, React }}
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
              <tr><td>text</td><td>string</td><td>필수</td><td>전체 텍스트</td></tr>
              <tr><td>query</td><td>string</td><td>필수</td><td>검색어</td></tr>
              <tr><td>color</td><td>'yellow' | 'blue' | 'green' | 'red' | 'purple'</td><td>'yellow'</td><td>하이라이트 색상</td></tr>
              <tr><td>caseSensitive</td><td>boolean</td><td>false</td><td>대소문자 구분</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>as</td><td>'span' | 'p' | 'div'</td><td>'span'</td><td>렌더링 태그</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
