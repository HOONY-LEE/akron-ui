import { CopyButton } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CopyButtonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CopyButton</h1>
        <p className="page-description">
          클립보드 복사 버튼. 복사 후 아이콘이 체크마크로 교체되어 성공을 시각적으로 알립니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
  <CopyButton value="복사할 텍스트 예시" />
  <CopyButton value="https://example.com" variant="outline" />
  <CopyButton value="filled 버튼" variant="filled" />
</div>`}
          scope={{ CopyButton }}
        />
      </section>

      <section className="docs-section" id="with-label">
        <h2 className="section-title">레이블 포함</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
  <CopyButton
    value="복사할 텍스트"
    iconOnly={false}
    label="복사"
    copiedLabel="복사됨!"
    variant="outline"
  />
  <CopyButton
    value="npm install @sunghoon_lee/akron-ui"
    iconOnly={false}
    label="명령어 복사"
    copiedLabel="복사됨 ✓"
    variant="filled"
  />
</div>`}
          scope={{ CopyButton }}
        />
      </section>

      <section className="docs-section" id="in-context">
        <h2 className="section-title">코드 블록 내 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const code = "npm install @sunghoon_lee/akron-ui";
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      background: "var(--ark-color-surface-strong)",
      borderRadius: 8,
      border: "1px solid var(--ark-color-border)",
      maxWidth: 420,
    }}>
      <code style={{
        fontSize: 13,
        fontFamily: "monospace",
        color: "var(--ark-color-text-primary)",
      }}>
        {code}
      </code>
      <CopyButton value={code} size="sm" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ CopyButton }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
  <CopyButton value="small" size="sm" variant="outline" />
  <CopyButton value="medium" size="md" variant="outline" />
  <CopyButton value="large" size="lg" variant="outline" />
</div>`}
          scope={{ CopyButton }}
        />
      </section>

      <section className="docs-section" id="timeout">
        <h2 className="section-title">커스텀 타임아웃</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, flexDirection: "column", maxWidth: 300 }}>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", flex: 1 }}>1초 후 복귀</span>
    <CopyButton value="1초" timeout={1000} variant="outline" iconOnly={false} label="복사" copiedLabel="완료!" />
  </div>
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", flex: 1 }}>5초 후 복귀</span>
    <CopyButton value="5초" timeout={5000} variant="outline" iconOnly={false} label="복사" copiedLabel="완료!" />
  </div>
</div>`}
          scope={{ CopyButton }}
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
              <tr><td>value</td><td>string</td><td>필수</td><td>복사할 텍스트</td></tr>
              <tr><td>timeout</td><td>number</td><td>2000</td><td>복사 확인 표시 지속 시간 (ms)</td></tr>
              <tr><td>onCopy</td><td>(value: string) =&gt; void</td><td>-</td><td>복사 성공 콜백</td></tr>
              <tr><td>variant</td><td>'ghost' | 'outline' | 'filled'</td><td>'ghost'</td><td>버튼 변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>iconOnly</td><td>boolean</td><td>true</td><td>아이콘만 표시 여부</td></tr>
              <tr><td>label</td><td>string</td><td>'복사'</td><td>기본 레이블</td></tr>
              <tr><td>copiedLabel</td><td>string</td><td>'복사됨'</td><td>복사 완료 레이블</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
