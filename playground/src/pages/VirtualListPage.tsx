import { VirtualList } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function VirtualListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">VirtualList</h1>
        <p className="page-description">
          가상화 리스트 컴포넌트. 대량의 데이터를 효율적으로 렌더링합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const items = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: "항목 #" + (i + 1),
    value: Math.floor(Math.random() * 1000),
  }));

  return (
    <VirtualList
      items={items}
      height={300}
      itemHeight={40}
      getItemKey={(item) => item.id}
      renderItem={(item, index) => (
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 16px",
          height: 40,
          borderBottom: "1px solid var(--ark-color-border)",
        }}>
          <span>{item.name}</span>
          <span style={{ color: "var(--ark-color-text-secondary)" }}>{item.value}</span>
        </div>
      )}
    />
  );
}`}
          scope={{ VirtualList }}
        />
      </section>

      <section className="docs-section" id="end-reached">
        <h2 className="section-title">끝 도달 감지</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const items = Array.from({ length: 100 }, (_, i) => "항목 " + (i + 1));
  return (
    <VirtualList
      items={items}
      height={200}
      itemHeight={36}
      onEndReached={() => console.log("끝에 도달했습니다!")}
      endReachedThreshold={100}
      renderItem={(item) => (
        <div style={{ padding: "8px 16px", height: 36, borderBottom: "1px solid var(--ark-color-border)" }}>
          {item}
        </div>
      )}
    />
  );
}`}
          scope={{ VirtualList }}
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
              <tr><td>items</td><td>T[]</td><td>필수</td><td>데이터 배열</td></tr>
              <tr><td>itemHeight</td><td>number</td><td>필수</td><td>항목 높이 (px)</td></tr>
              <tr><td>height</td><td>number | string</td><td>필수</td><td>컨테이너 높이</td></tr>
              <tr><td>width</td><td>number | string</td><td>'100%'</td><td>컨테이너 너비</td></tr>
              <tr><td>overscan</td><td>number</td><td>5</td><td>추가 렌더링 항목 수</td></tr>
              <tr><td>renderItem</td><td>(item, index) =&gt; ReactNode</td><td>필수</td><td>항목 렌더러</td></tr>
              <tr><td>onEndReached</td><td>() =&gt; void</td><td>-</td><td>끝 도달 콜백</td></tr>
              <tr><td>endReachedThreshold</td><td>number</td><td>200</td><td>끝 도달 임계값 (px)</td></tr>
              <tr><td>getItemKey</td><td>(item, index) =&gt; string | number</td><td>-</td><td>항목 키 추출</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'항목이 없습니다.'</td><td>빈 상태 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
