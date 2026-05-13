import { JsonViewer } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const SAMPLE_DATA = {
  name: "Akron UI",
  version: "2.0.0",
  components: ["Button", "Input", "Card", "Modal"],
  config: {
    theme: "light",
    colors: {
      primary: "#4F46E5",
      success: "#22C55E",
    },
    features: {
      darkMode: true,
      animations: true,
      a11y: true,
    },
  },
  stats: {
    totalComponents: 50,
    stars: 1200,
    downloads: 42000,
  },
  nullable: null,
  active: true,
};

export function JsonViewerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">JsonViewer</h1>
        <p className="page-description">
          인터랙티브 JSON 트리 뷰어. 중첩된 객체와 배열을 펼치고 접을 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<JsonViewer data={{
  name: "Akron UI",
  version: "2.0.0",
  components: ["Button", "Input", "Card", "Modal"],
  config: {
    theme: "light",
    colors: { primary: "#4F46E5", success: "#22C55E" },
    features: { darkMode: true, animations: true, a11y: true },
  },
  stats: { totalComponents: 50, stars: 1200 },
  nullable: null,
  active: true,
}} />`}
          scope={{ JsonViewer }}
        />
      </section>

      <section className="docs-section" id="expand">
        <h2 className="section-title">전체 펼침</h2>
        <LiveCodeBlock
          code={`<JsonViewer
  data={{ a: { b: { c: { d: "깊은 중첩값" } } } }}
  defaultExpandDepth={Infinity}
  rootName="deep"
/>`}
          scope={{ JsonViewer }}
        />
      </section>

      <section className="docs-section" id="array">
        <h2 className="section-title">배열 데이터</h2>
        <LiveCodeBlock
          code={`<JsonViewer
  data={[
    { id: 1, name: "Alice", role: "admin",  active: true  },
    { id: 2, name: "Bob",   role: "user",   active: false },
    { id: 3, name: "Carol", role: "editor", active: true  },
  ]}
  rootName="users"
  defaultExpandDepth={2}
/>`}
          scope={{ JsonViewer }}
        />
      </section>

      <section className="docs-section" id="options">
        <h2 className="section-title">옵션</h2>
        <LiveCodeBlock
          code={`<JsonViewer
  data={{ key: "value", count: 42, flag: true }}
  rootName={false}
  showItemCount={false}
  fontSize="xs"
  maxHeight={150}
/>`}
          scope={{ JsonViewer }}
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
              <tr><td>data</td><td>unknown</td><td>필수</td><td>표시할 JSON 데이터</td></tr>
              <tr><td>defaultExpandDepth</td><td>number</td><td>1</td><td>초기 펼침 깊이 (Infinity = 전체)</td></tr>
              <tr><td>indent</td><td>number</td><td>16</td><td>들여쓰기 px</td></tr>
              <tr><td>maxHeight</td><td>number | string</td><td>400</td><td>최대 높이</td></tr>
              <tr><td>fontSize</td><td>'xs' | 'sm' | 'md'</td><td>'sm'</td><td>폰트 크기</td></tr>
              <tr><td>rootName</td><td>string | false</td><td>'root'</td><td>루트 노드 이름. false면 숨김</td></tr>
              <tr><td>showItemCount</td><td>boolean</td><td>true</td><td>접힌 노드에 아이템 수 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
