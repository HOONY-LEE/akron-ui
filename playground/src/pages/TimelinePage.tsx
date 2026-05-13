import { Timeline } from "@sunghoon_lee/akron-ui";
import { Check, Clock, AlertCircle, Package } from "lucide-react";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TimelinePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Timeline</h1>
        <p className="page-description">
          타임라인 컴포넌트. 시간순 활동 기록을 표시합니다.
          상태별 색상, 커스텀 아이콘, 시간 레이블을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Timeline
  items={[
    { title: "주문 접수", time: "10:30", status: "completed", description: "주문이 성공적으로 접수되었습니다." },
    { title: "결제 완료", time: "10:31", status: "completed" },
    { title: "상품 준비 중", time: "11:00", status: "active", description: "판매자가 상품을 준비하고 있습니다." },
    { title: "배송 출발", status: "pending" },
    { title: "배송 완료", status: "pending" },
  ]}
  style={{ maxWidth: 400 }}
/>`}
          scope={{ Timeline }}
        />
      </section>

      <section className="docs-section" id="status">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<Timeline
  items={[
    { title: "완료된 단계", status: "completed", description: "성공적으로 처리되었습니다." },
    { title: "진행 중인 단계", status: "active", description: "현재 처리 중입니다." },
    { title: "오류 발생", status: "error", description: "처리 중 문제가 발생했습니다." },
    { title: "대기 중인 단계", status: "pending", description: "아직 시작되지 않았습니다." },
  ]}
  style={{ maxWidth: 400 }}
/>`}
          scope={{ Timeline }}
        />
      </section>

      <section className="docs-section" id="custom-icon">
        <h2 className="section-title">커스텀 아이콘</h2>
        <LiveCodeBlock
          code={`<Timeline
  items={[
    {
      title: "주문 확인",
      time: "2024.01.15 09:00",
      status: "completed",
      description: "주문이 확인되었습니다.",
      icon: <Check size={12} />,
    },
    {
      title: "포장 작업",
      time: "2024.01.15 10:30",
      status: "completed",
      description: "상품 포장이 완료되었습니다.",
      icon: <Package size={12} />,
    },
    {
      title: "배송 출발",
      time: "2024.01.15 14:00",
      status: "active",
      description: "배송이 시작되었습니다.",
      icon: <Clock size={12} />,
    },
    {
      title: "배송 완료",
      status: "pending",
      icon: <Check size={12} />,
    },
  ]}
  style={{ maxWidth: 420 }}
/>`}
          scope={{ Timeline, Check, Clock, Package, AlertCircle }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Timeline Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>items</td><td>TimelineItem[]</td><td>타임라인 아이템 목록 (필수)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>TimelineItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>제목 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>설명</td></tr>
              <tr><td>time</td><td>string</td><td>시간/날짜 레이블</td></tr>
              <tr><td>status</td><td>'completed' | 'active' | 'error' | 'pending'</td><td>상태</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>커스텀 아이콘</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
