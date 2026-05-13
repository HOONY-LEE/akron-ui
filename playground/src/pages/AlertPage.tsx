import { useState } from "react";
import { Alert } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AlertPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Alert</h1>
        <p className="page-description">
          알림 배너 컴포넌트. 사용자에게 정보, 성공, 경고, 오류 메시지를 전달합니다.
          아이콘, 닫기 버튼, 제목과 설명 텍스트를 조합해 사용할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Alert variant="info" title="안내" description="서비스 점검이 오전 2시부터 4시까지 진행됩니다." />
  <Alert variant="success" title="완료" description="파일이 성공적으로 업로드되었습니다." />
  <Alert variant="warning" title="주의" description="저장하지 않은 변경사항이 있습니다." />
  <Alert variant="error" title="오류" description="요청을 처리하는 중 문제가 발생했습니다." />
</div>`}
          scope={{ Alert }}
        />
      </section>

      <section className="docs-section" id="no-title">
        <h2 className="section-title">제목 없이</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Alert variant="info" description="새로운 업데이트가 있습니다. 새로고침 후 이용해 주세요." />
  <Alert variant="success" description="변경사항이 저장되었습니다." />
</div>`}
          scope={{ Alert }}
        />
      </section>

      <section className="docs-section" id="closable">
        <h2 className="section-title">닫기 버튼</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [visible, setVisible] = useState(true);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {visible && (
        <Alert
          variant="warning"
          title="이메일 미인증"
          description="이메일 주소를 인증하지 않으면 일부 기능을 사용할 수 없습니다."
          closable
          onClose={() => setVisible(false)}
        />
      )}
      {!visible && (
        <button onClick={() => setVisible(true)} style={{ fontSize: 13 }}>
          다시 표시
        </button>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ Alert, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="no-icon">
        <h2 className="section-title">아이콘 없이</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Alert variant="info" showIcon={false} title="안내" description="아이콘 없는 알림입니다." />
  <Alert variant="error" showIcon={false} description="오류가 발생했습니다." />
</div>`}
          scope={{ Alert }}
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
              <tr><td>variant</td><td>'info' | 'success' | 'warning' | 'error'</td><td>'info'</td><td>알림 유형</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>제목</td></tr>
              <tr><td>description</td><td>ReactNode</td><td>-</td><td>설명 텍스트</td></tr>
              <tr><td>showIcon</td><td>boolean</td><td>true</td><td>아이콘 표시 여부</td></tr>
              <tr><td>closable</td><td>boolean</td><td>false</td><td>닫기 버튼 표시</td></tr>
              <tr><td>onClose</td><td>() =&gt; void</td><td>-</td><td>닫기 클릭 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
