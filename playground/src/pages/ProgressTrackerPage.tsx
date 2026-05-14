import { ProgressTracker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ProgressTrackerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ProgressTracker</h1>
        <p className="page-description">
          프로젝트 진행 추적 컴포넌트. 다단계 프로젝트의 진행 상황을 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 레이아웃</h2>
        <LiveCodeBlock
          code={`<ProgressTracker
  phases={[
    { id: "1", label: "기획", status: "completed" },
    { id: "2", label: "디자인", status: "completed" },
    { id: "3", label: "개발", status: "in-progress", progress: 65 },
    { id: "4", label: "테스트", status: "upcoming" },
    { id: "5", label: "배포", status: "upcoming" },
  ]}
/>`}
          scope={{ ProgressTracker }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 레이아웃</h2>
        <LiveCodeBlock
          code={`<ProgressTracker
  variant="vertical"
  showDates
  showAssignee
  phases={[
    { id: "1", label: "요구사항 분석", status: "completed", startDate: "2025-01-01", endDate: "2025-01-15", assignee: "김철수" },
    { id: "2", label: "UI 디자인", status: "completed", startDate: "2025-01-16", endDate: "2025-02-01", assignee: "이영희" },
    { id: "3", label: "프론트엔드 개발", status: "in-progress", progress: 40, startDate: "2025-02-02", assignee: "박민수" },
    { id: "4", label: "백엔드 개발", status: "delayed", description: "API 설계 변경으로 지연", assignee: "정수진" },
    { id: "5", label: "QA 테스트", status: "blocked", description: "개발 완료 대기 중" },
    { id: "6", label: "프로덕션 배포", status: "upcoming" },
  ]}
/>`}
          scope={{ ProgressTracker }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
  <ProgressTracker
    size="sm"
    phases={[
      { id: "1", label: "1단계", status: "completed" },
      { id: "2", label: "2단계", status: "in-progress", progress: 50 },
      { id: "3", label: "3단계", status: "upcoming" },
    ]}
  />
  <ProgressTracker
    size="lg"
    phases={[
      { id: "1", label: "1단계", status: "completed" },
      { id: "2", label: "2단계", status: "in-progress", progress: 50 },
      { id: "3", label: "3단계", status: "upcoming" },
    ]}
  />
</div>`}
          scope={{ ProgressTracker }}
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
              <tr><td>phases</td><td>TrackerPhase[]</td><td>필수</td><td>단계 목록</td></tr>
              <tr><td>variant</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>레이아웃</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showProgress</td><td>boolean</td><td>true</td><td>진행률 표시</td></tr>
              <tr><td>showDates</td><td>boolean</td><td>false</td><td>날짜 표시</td></tr>
              <tr><td>showAssignee</td><td>boolean</td><td>false</td><td>담당자 표시</td></tr>
              <tr><td>onPhaseClick</td><td>(phase) =&gt; void</td><td>-</td><td>단계 클릭 콜백</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>TrackerPhase</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 ID (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>단계 이름 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>설명</td></tr>
              <tr><td>status</td><td>'completed' | 'in-progress' | 'upcoming' | 'delayed' | 'blocked'</td><td>상태 (필수)</td></tr>
              <tr><td>progress</td><td>number</td><td>진행률 (0-100)</td></tr>
              <tr><td>startDate</td><td>string</td><td>시작일</td></tr>
              <tr><td>endDate</td><td>string</td><td>종료일</td></tr>
              <tr><td>assignee</td><td>string</td><td>담당자</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
