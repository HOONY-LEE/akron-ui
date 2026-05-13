import { useState } from "react";
import { NotificationCenter } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { UserPlus, GitPullRequest, AlertTriangle, CheckCircle, MessageSquare } from "lucide-react";

export function NotificationCenterPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">NotificationCenter</h1>
        <p className="page-description">
          알림 센터. 벨 아이콘 버튼을 클릭하면 알림 목록이 드롭다운으로 표시됩니다.
          읽음 처리, 삭제, 타입별 스타일을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [notifications, setNotifications] = useState([
    { id: "1", title: "새 댓글이 달렸습니다", description: "홍길동님이 회의록에 댓글을 작성했습니다.", time: "방금", type: "info", read: false },
    { id: "2", title: "빌드 성공", description: "main 브랜치 배포가 완료되었습니다.", time: "5분 전", type: "success", read: false },
    { id: "3", title: "보안 경고", description: "의심스러운 로그인 시도가 감지되었습니다.", time: "1시간 전", type: "warning", read: false },
    { id: "4", title: "팀원 초대", description: "이서연님이 팀에 합류했습니다.", time: "2시간 전", type: "info", read: true },
    { id: "5", title: "에러 발생", description: "결제 서비스 응답 없음 (timeout).", time: "3시간 전", type: "error", read: true },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={handleMarkAsRead}
        onMarkAllAsRead={handleMarkAllAsRead}
        onDelete={handleDelete}
        onClearAll={handleClearAll}
      />
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        벨 아이콘을 클릭하세요
      </span>
    </div>
  );
}
render(<Demo />)`}
          scope={{ NotificationCenter, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="icons">
        <h2 className="section-title">커스텀 아이콘</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "PR 리뷰 요청",
      description: "김민준님이 pull request #42를 리뷰 요청했습니다.",
      time: "10분 전",
      type: "info",
      read: false,
      icon: <GitPullRequest size={16} />,
    },
    {
      id: "2",
      title: "새 팀원",
      description: "박지훈님이 팀에 합류했습니다.",
      time: "30분 전",
      type: "success",
      read: false,
      icon: <UserPlus size={16} />,
    },
    {
      id: "3",
      title: "새 메시지",
      description: "슬랙 #개발 채널에 멘션이 있습니다.",
      time: "1시간 전",
      type: "info",
      read: true,
      icon: <MessageSquare size={16} />,
    },
  ]);

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
      onDelete={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
    />
  );
}
render(<Demo />)`}
          scope={{ NotificationCenter, useState, GitPullRequest, UserPlus, MessageSquare }}
          noInline
        />
      </section>

      <section className="docs-section" id="empty">
        <h2 className="section-title">빈 상태</h2>
        <LiveCodeBlock
          code={`<NotificationCenter
  notifications={[]}
  emptyMessage="새로운 알림이 없습니다 🎉"
/>`}
          scope={{ NotificationCenter }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">NotificationCenter Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>notifications</td><td>NotificationItem[]</td><td>알림 목록 (필수)</td></tr>
              <tr><td>onMarkAsRead</td><td>(id: string) =&gt; void</td><td>읽음 처리 핸들러</td></tr>
              <tr><td>onMarkAllAsRead</td><td>() =&gt; void</td><td>전체 읽음 처리 핸들러</td></tr>
              <tr><td>onDelete</td><td>(id: string) =&gt; void</td><td>삭제 핸들러</td></tr>
              <tr><td>onClearAll</td><td>() =&gt; void</td><td>전체 삭제 핸들러</td></tr>
              <tr><td>title</td><td>string</td><td>패널 제목 (기본: '알림')</td></tr>
              <tr><td>trigger</td><td>ReactNode</td><td>커스텀 트리거 (기본: 벨 아이콘)</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>빈 상태 메시지</td></tr>
              <tr><td>maxHeight</td><td>number | string</td><td>목록 최대 높이 (기본: 400)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>NotificationItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>알림 제목 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>알림 설명</td></tr>
              <tr><td>time</td><td>string</td><td>시간 표시 (e.g. "5분 전")</td></tr>
              <tr><td>type</td><td>'info' | 'success' | 'warning' | 'error'</td><td>알림 타입 (색상 점)</td></tr>
              <tr><td>read</td><td>boolean</td><td>읽음 상태</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>커스텀 아이콘</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 이미지 URL</td></tr>
              <tr><td>onClick</td><td>() =&gt; void</td><td>항목 클릭 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
