import { NotificationBell } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function NotificationBellPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">NotificationBell</h1>
        <p className="page-description">
          알림 벨 컴포넌트. 배지 카운트와 드롭다운 알림 목록을 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<NotificationBell
  count={5}
  notifications={[
    { id: "1", title: "새 댓글", message: "김철수님이 댓글을 남겼습니다.", timestamp: new Date(Date.now() - 300000), type: "info" },
    { id: "2", title: "작업 완료", message: "배포가 성공적으로 완료되었습니다.", timestamp: new Date(Date.now() - 3600000), type: "success", read: true },
    { id: "3", title: "주의 필요", message: "서버 메모리 사용량이 80%를 초과했습니다.", timestamp: new Date(Date.now() - 7200000), type: "warning" },
    { id: "4", title: "오류 발생", message: "빌드 #423이 실패했습니다.", timestamp: new Date(Date.now() - 86400000), type: "error" },
    { id: "5", title: "새 멤버", message: "이영희님이 팀에 합류했습니다.", timestamp: new Date(Date.now() - 172800000), type: "info", read: true },
  ]}
  onMarkAllRead={() => alert("모두 읽음")}
  onClear={() => alert("모두 지우기")}
/>`}
          scope={{ NotificationBell }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
  <NotificationBell size="sm" count={3} />
  <NotificationBell size="md" count={12} />
  <NotificationBell size="lg" count={99} />
</div>`}
          scope={{ NotificationBell }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, alignItems: "center" }}>
  <NotificationBell count={0} />
  <NotificationBell count={150} maxCount={99} />
  <NotificationBell muted />
</div>`}
          scope={{ NotificationBell }}
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
              <tr><td>count</td><td>number</td><td>0</td><td>배지 카운트</td></tr>
              <tr><td>maxCount</td><td>number</td><td>99</td><td>최대 표시 수 (초과 시 N+)</td></tr>
              <tr><td>notifications</td><td>NotificationBellItem[]</td><td>-</td><td>알림 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>onMarkAllRead</td><td>() =&gt; void</td><td>-</td><td>모두 읽음 콜백</td></tr>
              <tr><td>onClear</td><td>() =&gt; void</td><td>-</td><td>모두 지우기 콜백</td></tr>
              <tr><td>onSettingsClick</td><td>() =&gt; void</td><td>-</td><td>설정 클릭 콜백</td></tr>
              <tr><td>muted</td><td>boolean</td><td>false</td><td>음소거 상태</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'알림이 없습니다.'</td><td>빈 상태 메시지</td></tr>
              <tr><td>title</td><td>string</td><td>'알림'</td><td>드롭다운 제목</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
