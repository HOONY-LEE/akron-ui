import { ResizablePanels } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ResizablePanelsPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ResizablePanels</h1>
        <p className="page-description">
          드래그로 크기를 조절할 수 있는 분할 패널 레이아웃 컴포넌트. 수평/수직 분할을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 분할 (기본)</h2>
        <LiveCodeBlock
          fullWidth
          code={`<div style={{ height: 440, border: "1px solid var(--ark-color-border)", borderRadius: 10, overflow: "hidden" }}>
  <ResizablePanels
    first={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>왼쪽 패널</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
          구분선을 드래그하여 크기를 조절하세요.<br />
          키보드 방향키도 사용할 수 있습니다.
        </p>
      </div>
    }
    second={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>오른쪽 패널</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
          두 번째 패널입니다.<br />
          각 패널에 자유롭게 콘텐츠를 배치할 수 있습니다.
        </p>
      </div>
    }
  />
</div>`}
          scope={{ ResizablePanels }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 분할</h2>
        <LiveCodeBlock
          fullWidth
          code={`<div style={{ height: 440, border: "1px solid var(--ark-color-border)", borderRadius: 10, overflow: "hidden" }}>
  <ResizablePanels
    direction="vertical"
    defaultSize={40}
    first={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>상단 패널</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
          수직 방향으로 분할된 패널입니다. 구분선을 위아래로 드래그하세요.
        </p>
      </div>
    }
    second={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>하단 패널</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
          하단 패널입니다.
        </p>
      </div>
    }
  />
</div>`}
          scope={{ ResizablePanels }}
        />
      </section>

      <section className="docs-section" id="min-max">
        <h2 className="section-title">최소/최대 크기 제한</h2>
        <LiveCodeBlock
          fullWidth
          code={`<div style={{ height: 440, border: "1px solid var(--ark-color-border)", borderRadius: 10, overflow: "hidden" }}>
  <ResizablePanels
    defaultSize={30}
    minSize={20}
    maxSize={70}
    first={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>최소 20% / 최대 70%</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
          이 패널은 전체 너비의 20%~70% 범위 내에서만 조절됩니다.
        </p>
      </div>
    }
    second={
      <div style={{ padding: 24, height: "100%", boxSizing: "border-box" }}>
        <strong style={{ fontSize: 15 }}>두 번째 패널</strong>
        <p style={{ margin: "10px 0 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
          반대편 패널도 자동으로 제한됩니다.
        </p>
      </div>
    }
  />
</div>`}
          scope={{ ResizablePanels }}
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
              <tr><td>first</td><td>ReactNode</td><td>필수</td><td>첫 번째 패널 내용</td></tr>
              <tr><td>second</td><td>ReactNode</td><td>필수</td><td>두 번째 패널 내용</td></tr>
              <tr><td>direction</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>분할 방향</td></tr>
              <tr><td>defaultSize</td><td>number</td><td>50</td><td>초기 첫 번째 패널 크기 (%)</td></tr>
              <tr><td>minSize</td><td>number</td><td>10</td><td>최소 크기 (%)</td></tr>
              <tr><td>maxSize</td><td>number</td><td>90</td><td>최대 크기 (%)</td></tr>
              <tr><td>size</td><td>number</td><td>-</td><td>controlled 크기 (%)</td></tr>
              <tr><td>onSizeChange</td><td>(size: number) =&gt; void</td><td>-</td><td>크기 변경 콜백</td></tr>
              <tr><td>handleSize</td><td>number</td><td>4</td><td>구분자 두께 (px)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
