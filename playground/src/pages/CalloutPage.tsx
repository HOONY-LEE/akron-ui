import { Callout } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Terminal } from "lucide-react";

export function CalloutPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Callout</h1>
        <p className="page-description">
          콜아웃 컴포넌트. 문서, 블로그, 대시보드에서 중요한 정보를 강조할 때 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Callout variant="info" title="알림">
    새로운 버전이 출시되었습니다. 지금 업데이트하세요.
  </Callout>
  <Callout variant="warning" title="주의">
    이 기능은 실험적입니다. 프로덕션 환경에서 사용 시 주의하세요.
  </Callout>
  <Callout variant="success" title="완료">
    배포가 성공적으로 완료되었습니다.
  </Callout>
  <Callout variant="error" title="오류">
    연결에 실패했습니다. 네트워크 상태를 확인하세요.
  </Callout>
  <Callout variant="tip" title="팁">
    Cmd + K를 누르면 커맨드 팔레트를 열 수 있습니다.
  </Callout>
</div>`}
          scope={{ Callout }}
        />
      </section>

      <section className="docs-section" id="no-title">
        <h2 className="section-title">제목 없이</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Callout variant="info">
    API 키는 환경 변수로 관리하는 것을 권장합니다.
  </Callout>
  <Callout variant="warning">
    이 페이지의 콘텐츠는 준비 중입니다.
  </Callout>
</div>`}
          scope={{ Callout }}
        />
      </section>

      <section className="docs-section" id="custom-icon">
        <h2 className="section-title">커스텀 아이콘</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Callout variant="info" icon={<Terminal size={16} />} title="터미널 명령어">
    pnpm install @sunghoon_lee/akron-ui 를 실행하여 패키지를 설치하세요.
  </Callout>
  <Callout variant="tip" hideIcon title="아이콘 없는 콜아웃">
    hideIcon 속성으로 아이콘을 숨길 수 있습니다.
  </Callout>
</div>`}
          scope={{ Callout, Terminal }}
        />
      </section>

      <section className="docs-section" id="rich-content">
        <h2 className="section-title">리치 콘텐츠</h2>
        <LiveCodeBlock
          code={`<Callout variant="warning" title="마이그레이션 필요">
  <p style={{ margin: "0 0 8px" }}>v2.0으로 업그레이드 시 다음 작업이 필요합니다:</p>
  <ul style={{ margin: 0, paddingLeft: 20 }}>
    <li>Button의 <code>kind</code> prop을 <code>variant</code>로 변경</li>
    <li>ThemeProvider 제거 (자동 감지로 전환)</li>
    <li>import 경로 업데이트</li>
  </ul>
</Callout>`}
          scope={{ Callout }}
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
              <tr><td>variant</td><td>'info' | 'warning' | 'success' | 'error' | 'tip'</td><td>'info'</td><td>콜아웃 변형</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>제목</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>-</td><td>아이콘 오버라이드</td></tr>
              <tr><td>hideIcon</td><td>boolean</td><td>false</td><td>아이콘 숨김</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>내용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
