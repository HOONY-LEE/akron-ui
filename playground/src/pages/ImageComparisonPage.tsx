import { ImageComparison } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ImageComparisonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ImageComparison</h1>
        <p className="page-description">
          이미지 비교 슬라이더 컴포넌트. Before/After 이미지를 드래그하여 비교할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ImageComparison
  before="https://picsum.photos/id/10/800/400"
  after="https://picsum.photos/id/11/800/400"
  height={300}
/>`}
          scope={{ ImageComparison }}
        />
      </section>

      <section className="docs-section" id="labels">
        <h2 className="section-title">커스텀 라벨</h2>
        <LiveCodeBlock
          code={`<ImageComparison
  before="https://picsum.photos/id/15/800/400"
  after="https://picsum.photos/id/16/800/400"
  beforeLabel="원본"
  afterLabel="편집됨"
  defaultPosition={30}
  height={300}
/>`}
          scope={{ ImageComparison }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">Controlled</h2>
        <LiveCodeBlock
          code={`() => {
  const [pos, setPos] = React.useState(50);
  return (
    <div>
      <ImageComparison
        before="https://picsum.photos/id/20/800/400"
        after="https://picsum.photos/id/21/800/400"
        position={pos}
        onChange={setPos}
        height={300}
      />
      <p style={{ textAlign: "center", marginTop: 8, fontSize: 14 }}>
        위치: {Math.round(pos)}%
      </p>
    </div>
  );
}`}
          scope={{ ImageComparison, React }}
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
              <tr><td>before</td><td>string</td><td>필수</td><td>Before 이미지 URL</td></tr>
              <tr><td>after</td><td>string</td><td>필수</td><td>After 이미지 URL</td></tr>
              <tr><td>beforeLabel</td><td>string</td><td>'Before'</td><td>Before 라벨</td></tr>
              <tr><td>afterLabel</td><td>string</td><td>'After'</td><td>After 라벨</td></tr>
              <tr><td>defaultPosition</td><td>number</td><td>50</td><td>초기 위치 (0~100)</td></tr>
              <tr><td>position</td><td>number</td><td>-</td><td>위치 (controlled)</td></tr>
              <tr><td>onChange</td><td>(pos: number) =&gt; void</td><td>-</td><td>위치 변경 콜백</td></tr>
              <tr><td>orientation</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>방향</td></tr>
              <tr><td>height</td><td>number | string</td><td>400</td><td>높이</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
