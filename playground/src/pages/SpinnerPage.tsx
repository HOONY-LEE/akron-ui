import { Spinner, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SpinnerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Spinner</h1>
        <p className="page-description">
          로딩 스피너 컴포넌트. 비동기 작업 진행 중임을 시각적으로 표시합니다.
          크기와 색상을 자유롭게 조합할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Spinner />`}
          scope={{ Spinner }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">xs</code> | <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code> | <code className="inline-code">xl</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Spinner size="xs" />
  <Spinner size="sm" />
  <Spinner size="md" />
  <Spinner size="lg" />
  <Spinner size="xl" />
</div>`}
          scope={{ Spinner }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <p className="section-desc">
          <code className="inline-code">color</code>: <code className="inline-code">primary</code> | <code className="inline-code">current</code> | <code className="inline-code">white</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <Spinner color="primary" />
  <Spinner color="current" style={{ color: "var(--ark-color-success-500)" }} />
  <span style={{ background: "var(--ark-color-primary-500)", borderRadius: 8, padding: "10px 16px", display: "flex" }}>
    <Spinner color="white" />
  </span>
</div>`}
          scope={{ Spinner }}
        />
      </section>

      <section className="docs-section" id="button">
        <h2 className="section-title">버튼과 함께</h2>
        <p className="section-desc">버튼의 로딩 상태를 표시하는 패턴입니다.</p>
        <LiveCodeBlock
          code={`function Demo() {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };
  return (
    <div style={{ display: "flex", gap: 12 }}>
      <Button
        variant="primary"
        onClick={handleClick}
        disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        {loading && <Spinner size="xs" color="white" />}
        {loading ? "저장 중..." : "저장"}
      </Button>
      <Button
        variant="outline"
        onClick={handleClick}
        disabled={loading}
        style={{ display: "flex", alignItems: "center", gap: 8 }}
      >
        {loading && <Spinner size="xs" color="current" />}
        {loading ? "처리 중..." : "제출"}
      </Button>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Spinner, Button }}
          noInline
        />
      </section>

      <section className="docs-section" id="overlay">
        <h2 className="section-title">전체 오버레이</h2>
        <p className="section-desc">영역 전체를 덮는 로딩 패턴입니다.</p>
        <LiveCodeBlock
          code={`function Demo() {
  const [loading, setLoading] = useState(false);
  return (
    <div style={{ position: "relative", padding: 32, background: "var(--ark-color-bg-subtle)", borderRadius: 12 }}>
      <div style={{ opacity: loading ? 0.3 : 1 }}>
        <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>콘텐츠 영역</div>
        <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>로딩 중에는 이 콘텐츠가 흐려집니다.</div>
      </div>
      {loading && (
        <div style={{
          position: "absolute", inset: 0, display: "flex",
          alignItems: "center", justifyContent: "center", borderRadius: 12
        }}>
          <Spinner size="lg" />
        </div>
      )}
      <div style={{ marginTop: 16 }}>
        <Button variant="outline" size="sm" onClick={() => { setLoading(true); setTimeout(() => setLoading(false), 2000); }}>
          로딩 시작
        </Button>
      </div>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Spinner, Button }}
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
              <tr><td>size</td><td>'xs' | 'sm' | 'md' | 'lg' | 'xl'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>color</td><td>'primary' | 'current' | 'white'</td><td>'primary'</td><td>색상</td></tr>
              <tr><td>label</td><td>string</td><td>'로딩 중'</td><td>스크린리더용 텍스트</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
