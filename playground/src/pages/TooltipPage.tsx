import { Tooltip, Button, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TooltipPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Tooltip</h1>
        <p className="page-description">
          호버 시 표시되는 설명 툴팁. 추가 정보를 비침습적으로 제공합니다.
          4방향 배치와 애니메이션을 지원하며, 키보드 접근성이 내장되어 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          <code className="inline-code">content</code> prop에 툴팁 내용을 전달하고, 자식 요소를 트리거로 사용합니다.
        </p>
        <LiveCodeBlock
          code={`<Tooltip content="사용자 프로필로 이동합니다">
  <Button variant="outline">프로필</Button>
</Tooltip>`}
          scope={{ Tooltip, Button }}
        />
      </section>

      <section className="docs-section" id="sides">
        <h2 className="section-title">방향</h2>
        <p className="section-desc">
          <code className="inline-code">side</code>: <code className="inline-code">top</code> | <code className="inline-code">right</code> | <code className="inline-code">bottom</code> | <code className="inline-code">left</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, justifyContent: "center", padding: "32px 0" }}>
  <Tooltip content="위에 표시" side="top">
    <Button variant="outline" size="sm">Top</Button>
  </Tooltip>
  <Tooltip content="오른쪽에 표시" side="right">
    <Button variant="outline" size="sm">Right</Button>
  </Tooltip>
  <Tooltip content="아래에 표시" side="bottom">
    <Button variant="outline" size="sm">Bottom</Button>
  </Tooltip>
  <Tooltip content="왼쪽에 표시" side="left">
    <Button variant="outline" size="sm">Left</Button>
  </Tooltip>
</div>`}
          scope={{ Tooltip, Button }}
        />
      </section>

      <section className="docs-section" id="rich">
        <h2 className="section-title">리치 콘텐츠</h2>
        <p className="section-desc">
          <code className="inline-code">content</code>에 JSX를 전달하여 풍부한 툴팁을 만들 수 있습니다.
        </p>
        <LiveCodeBlock
          code={`<Tooltip
  content={
    <div>
      <div style={{ fontWeight: 600, marginBottom: 4 }}>김지훈 사원</div>
      <div style={{ opacity: 0.8 }}>개발팀 · 재직 중</div>
    </div>
  }
  side="bottom"
>
  <Button variant="ghost">호버해 보세요</Button>
</Tooltip>`}
          scope={{ Tooltip, Button }}
        />
      </section>

      <section className="docs-section" id="no-arrow">
        <h2 className="section-title">화살표 없음</h2>
        <LiveCodeBlock
          code={`<Tooltip content="화살표 없는 툴팁" arrow={false}>
  <Button variant="outline" size="sm">No Arrow</Button>
</Tooltip>`}
          scope={{ Tooltip, Button }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <p className="section-desc">
          <code className="inline-code">disabled</code>로 툴팁을 비활성화합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12 }}>
  <Tooltip content="이 툴팁은 표시됩니다">
    <Button variant="outline" size="sm">활성화</Button>
  </Tooltip>
  <Tooltip content="이 툴팁은 표시되지 않습니다" disabled>
    <Button variant="outline" size="sm">비활성화</Button>
  </Tooltip>
</div>`}
          scope={{ Tooltip, Button }}
        />
      </section>

      <section className="docs-section" id="icon">
        <h2 className="section-title">아이콘 버튼과 함께</h2>
        <p className="section-desc">아이콘만 있는 버튼의 기능 설명에 활용합니다.</p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 8 }}>
  <Tooltip content="새 문서 만들기">
    <Button variant="outline" size="sm">＋</Button>
  </Tooltip>
  <Tooltip content="설정">
    <Button variant="outline" size="sm">⚙</Button>
  </Tooltip>
  <Tooltip content="알림 (3개)">
    <span style={{ position: "relative", display: "inline-flex" }}>
      <Button variant="outline" size="sm">🔔</Button>
      <Badge count={3} color="error" variant="solid" size="sm" style={{ position: "absolute", top: -6, right: -6 }} />
    </span>
  </Tooltip>
</div>`}
          scope={{ Tooltip, Button, Badge }}
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
              <tr><td>content</td><td>ReactNode</td><td>-</td><td>툴팁 내용 (필수)</td></tr>
              <tr><td>side</td><td>'top' | 'right' | 'bottom' | 'left'</td><td>'top'</td><td>표시 방향</td></tr>
              <tr><td>align</td><td>'start' | 'center' | 'end'</td><td>'center'</td><td>정렬</td></tr>
              <tr><td>delayDuration</td><td>number</td><td>400</td><td>표시 지연 시간 (ms)</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>arrow</td><td>boolean</td><td>true</td><td>화살표 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
