import { Switch } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SwitchPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Switch</h1>
        <p className="page-description">
          토글 스위치 컴포넌트. On/Off 상태를 전환하는 데 사용합니다.
          라벨을 좌우 어느 쪽에도 배치할 수 있으며, 다크모드와 비활성화 상태를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      id="notify"
      label={enabled ? "알림 켜짐" : "알림 꺼짐"}
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
render(<Demo />)`}
          scope={{ Switch }}
          noInline
        />
      </section>

      <section className="docs-section" id="description">
        <h2 className="section-title">보조 텍스트</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <Switch
    id="sw1"
    label="이메일 알림"
    description="새 메시지를 이메일로 받습니다."
    defaultChecked
  />
  <Switch
    id="sw2"
    label="야간 모드"
    description="오후 10시 ~ 오전 8시 알림을 끕니다."
  />
</div>`}
          scope={{ Switch }}
        />
      </section>

      <section className="docs-section" id="label-position">
        <h2 className="section-title">라벨 위치</h2>
        <p className="section-desc">
          <code className="inline-code">labelPosition="left"</code>으로 라벨을 왼쪽에 배치합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 280 }}>
  <Switch id="r1" label="라벨 오른쪽 (기본)" labelPosition="right" defaultChecked />
  <Switch id="l1" label="라벨 왼쪽" labelPosition="left" defaultChecked />
</div>`}
          scope={{ Switch }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <Switch id="sz1" size="sm" label="Small" defaultChecked />
  <Switch id="sz2" size="md" label="Medium (기본값)" defaultChecked />
  <Switch id="sz3" size="lg" label="Large" defaultChecked />
</div>`}
          scope={{ Switch }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Switch id="d1" label="비활성화 (꺼짐)" disabled />
  <Switch id="d2" label="비활성화 (켜짐)" disabled defaultChecked />
</div>`}
          scope={{ Switch }}
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
              <tr><td>checked</td><td>boolean</td><td>-</td><td>켜짐/꺼짐 상태 (제어)</td></tr>
              <tr><td>defaultChecked</td><td>boolean</td><td>-</td><td>기본 상태 (비제어)</td></tr>
              <tr><td>onCheckedChange</td><td>(checked: boolean) =&gt; void</td><td>-</td><td>상태 변경 핸들러</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>보조 설명 텍스트</td></tr>
              <tr><td>labelPosition</td><td>'left' | 'right'</td><td>'right'</td><td>라벨 위치</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
