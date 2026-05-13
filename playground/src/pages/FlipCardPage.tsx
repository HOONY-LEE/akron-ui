import { FlipCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FlipCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FlipCard</h1>
        <p className="page-description">
          3D 뒤집기 카드 컴포넌트. 호버 또는 클릭 시 앞면/뒷면이 3D 회전 애니메이션으로 전환됩니다.
        </p>
      </header>

      <section className="docs-section" id="hover">
        <h2 className="section-title">호버 뒤집기 (기본)</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <FlipCard
    height={200}
    style={{ width: 200 }}
    front={
      <div style={{ height: "100%", background: "var(--ark-color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18, fontWeight: 700 }}>
        앞면 (hover)
      </div>
    }
    back={
      <div style={{ height: "100%", background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
        <div style={{ fontSize: 24 }}>🎉</div>
        <div style={{ fontSize: 14, fontWeight: 600 }}>뒷면입니다!</div>
      </div>
    }
  />
</div>`}
          scope={{ FlipCard }}
        />
      </section>

      <section className="docs-section" id="click">
        <h2 className="section-title">클릭 뒤집기</h2>
        <LiveCodeBlock
          code={`<FlipCard
  trigger="click"
  height={180}
  style={{ width: 240 }}
  front={
    <div style={{ height: "100%", background: "linear-gradient(135deg, #667eea, #764ba2)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 13, opacity: 0.8 }}>클릭하면 뒤집힙니다</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>플래시 카드</div>
    </div>
  }
  back={
    <div style={{ height: "100%", background: "linear-gradient(135deg, #f97316, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexDirection: "column", gap: 8 }}>
      <div style={{ fontSize: 13, opacity: 0.8 }}>다시 클릭하면 원래대로</div>
      <div style={{ fontSize: 20, fontWeight: 700 }}>뒷면 내용</div>
    </div>
  }
/>`}
          scope={{ FlipCard }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">세로 방향</h2>
        <LiveCodeBlock
          code={`<FlipCard
  direction="vertical"
  height={160}
  style={{ width: 200 }}
  front={
    <div style={{ height: "100%", background: "var(--ark-color-surface-strong)", border: "1px solid var(--ark-color-border)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600 }}>
      위로 뒤집기 ↑
    </div>
  }
  back={
    <div style={{ height: "100%", background: "var(--ark-color-primary)", borderRadius: 16, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 600 }}>
      뒷면
    </div>
  }
/>`}
          scope={{ FlipCard }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [flipped, setFlipped] = React.useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
      <button
        onClick={() => setFlipped(v => !v)}
        style={{ padding: "8px 16px", borderRadius: 8, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)" }}
      >
        {flipped ? "앞면으로" : "뒷면으로"}
      </button>
      <FlipCard
        flipped={flipped}
        onFlipChange={setFlipped}
        height={160}
        style={{ width: 200 }}
        front={
          <div style={{ height: "100%", background: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
            앞
          </div>
        }
        back={
          <div style={{ height: "100%", background: "#22c55e", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>
            뒤
          </div>
        }
      />
    </div>
  );
}`}
          scope={{ FlipCard }}
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
              <tr><td>front</td><td>ReactNode</td><td>필수</td><td>앞면 콘텐츠</td></tr>
              <tr><td>back</td><td>ReactNode</td><td>필수</td><td>뒷면 콘텐츠</td></tr>
              <tr><td>direction</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>뒤집기 방향</td></tr>
              <tr><td>trigger</td><td>'hover' | 'click'</td><td>'hover'</td><td>뒤집기 트리거</td></tr>
              <tr><td>flipped</td><td>boolean</td><td>-</td><td>외부 제어: 뒤집힘 상태</td></tr>
              <tr><td>onFlipChange</td><td>(flipped: boolean) =&gt; void</td><td>-</td><td>뒤집힘 상태 변경 핸들러</td></tr>
              <tr><td>duration</td><td>number</td><td>600</td><td>애니메이션 시간 (ms)</td></tr>
              <tr><td>height</td><td>number | string</td><td>200</td><td>카드 높이 (반드시 지정)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
