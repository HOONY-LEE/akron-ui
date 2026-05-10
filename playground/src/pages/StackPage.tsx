import { Stack, Button, Card } from "@akron/ui";

export function StackPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Stack</h1>
        <p className="page-description">
          자식 요소를 수직 또는 수평으로 일정한 간격으로 배치하는 레이아웃 유틸리티입니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">direction</code>으로 방향을,
          <code className="inline-code">gap</code>으로 간격을 지정합니다.
          기본값은 수직(vertical) 방향입니다.
        </p>

        <h3 className="section-subtitle">vertical</h3>
        <div className="preview-box left">
          <Stack gap={12} style={{ width: "100%" }}>
            <Card><div style={{ padding: 8, fontSize: 14 }}>항목 1</div></Card>
            <Card><div style={{ padding: 8, fontSize: 14 }}>항목 2</div></Card>
            <Card><div style={{ padding: 8, fontSize: 14 }}>항목 3</div></Card>
          </Stack>
        </div>

        <h3 className="section-subtitle">horizontal</h3>
        <div className="preview-box left">
          <Stack direction="horizontal" gap={12}>
            <Button variant="primary">저장</Button>
            <Button variant="outline">취소</Button>
            <Button variant="ghost">초기화</Button>
          </Stack>
        </div>
        <div className="code-block">
          <code>{`<Stack direction="horizontal" gap={12}>
  <Button variant="primary">저장</Button>
  <Button variant="outline">취소</Button>
</Stack>`}</code>
        </div>
      </section>

      <section className="docs-section" id="alignment">
        <h2 className="section-title">정렬</h2>
        <p className="section-desc">
          <code className="inline-code">align</code>과{" "}
          <code className="inline-code">justify</code> prop으로 정렬을 제어합니다.
        </p>
        <div className="preview-box" style={{ height: 120 }}>
          <Stack direction="horizontal" gap={12} justify="between" align="center" style={{ width: "100%" }}>
            <span style={{ fontSize: 14, fontWeight: 600 }}>좌측 콘텐츠</span>
            <Stack direction="horizontal" gap={8}>
              <Button variant="outline" size="sm">취소</Button>
              <Button variant="primary" size="sm">확인</Button>
            </Stack>
          </Stack>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>direction</td><td>'vertical' | 'horizontal'</td><td>'vertical'</td><td>배치 방향</td></tr>
              <tr><td>gap</td><td>number</td><td>0</td><td>자식 간 간격 (px)</td></tr>
              <tr><td>align</td><td>'start' | 'center' | 'end' | 'stretch'</td><td>-</td><td>교차축 정렬</td></tr>
              <tr><td>justify</td><td>'start' | 'center' | 'end' | 'between'</td><td>-</td><td>주축 정렬</td></tr>
              <tr><td>wrap</td><td>boolean</td><td>false</td><td>줄바꿈 허용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
