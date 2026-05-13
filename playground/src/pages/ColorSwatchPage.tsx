import { ColorSwatch } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ColorSwatchPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ColorSwatch</h1>
        <p className="page-description">
          색상 팔레트 컴포넌트. 색상 목록을 시각적으로 표시하며, 클릭 시 색상 코드를 복사합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ColorSwatch
  colors={["#EF4444", "#F59E0B", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899"]}
  columns={6}
/>`}
          scope={{ ColorSwatch }}
        />
      </section>

      <section className="docs-section" id="labeled">
        <h2 className="section-title">라벨 있는 팔레트</h2>
        <LiveCodeBlock
          code={`<ColorSwatch
  size="lg"
  columns={5}
  colors={[
    { color: "#4F46E5", label: "Primary", description: "500" },
    { color: "#22C55E", label: "Success", description: "500" },
    { color: "#F59E0B", label: "Warning", description: "500" },
    { color: "#EF4444", label: "Error", description: "500" },
    { color: "#3B82F6", label: "Info", description: "500" },
  ]}
/>`}
          scope={{ ColorSwatch }}
        />
      </section>

      <section className="docs-section" id="circle">
        <h2 className="section-title">원형</h2>
        <LiveCodeBlock
          code={`() => {
  const [selected, setSelected] = React.useState("#4F46E5");
  return (
    <ColorSwatch
      shape="circle"
      size="md"
      columns={8}
      selected={selected}
      onSelect={setSelected}
      showLabel={false}
      colors={["#4F46E5","#7C3AED","#EC4899","#EF4444","#F59E0B","#22C55E","#06B6D4","#6B7280"]}
    />
  );
}`}
          scope={{ ColorSwatch, React }}
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
              <tr><td>colors</td><td>(string | ColorSwatchItem)[]</td><td>필수</td><td>색상 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>shape</td><td>'square' | 'circle'</td><td>'square'</td><td>모양</td></tr>
              <tr><td>copyOnClick</td><td>boolean</td><td>true</td><td>클릭 시 복사</td></tr>
              <tr><td>showLabel</td><td>boolean</td><td>true</td><td>라벨 표시</td></tr>
              <tr><td>onSelect</td><td>(color: string) =&gt; void</td><td>-</td><td>선택 콜백</td></tr>
              <tr><td>selected</td><td>string</td><td>-</td><td>선택된 색상</td></tr>
              <tr><td>columns</td><td>number</td><td>auto-fill</td><td>컬럼 수</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
