import { ApprovalFlow } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ApprovalFlowPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ApprovalFlow</h1>
        <p className="page-description">
          결재 흐름 컴포넌트. 결재선의 각 단계를 승인/반려/대기 상태로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 레이아웃 (기본)</h2>
        <LiveCodeBlock
          code={`<ApprovalFlow
  steps={[
    { id: "1", name: "김기획", title: "기획팀장", status: "approved", date: "05/12 09:30", comment: "승인합니다" },
    { id: "2", name: "이개발", title: "개발팀장", status: "approved", date: "05/12 14:00" },
    { id: "3", name: "박경영", title: "경영지원", status: "current" },
    { id: "4", name: "최대표", title: "대표이사", status: "pending" },
  ]}
/>`}
          scope={{ ApprovalFlow }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 레이아웃</h2>
        <LiveCodeBlock
          code={`<ApprovalFlow
  direction="vertical"
  steps={[
    { id: "1", name: "김기획", title: "기획팀장", status: "approved", date: "05/12 09:30", comment: "확인했습니다" },
    { id: "2", name: "이개발", title: "개발팀장", status: "rejected", date: "05/12 14:00", comment: "수정 후 재상신 바랍니다" },
    { id: "3", name: "박경영", title: "경영지원", status: "skipped" },
  ]}
/>`}
          scope={{ ApprovalFlow }}
        />
      </section>

      <section className="docs-section" id="compact">
        <h2 className="section-title">컴팩트 모드</h2>
        <LiveCodeBlock
          code={`<ApprovalFlow
  compact
  steps={[
    { id: "1", name: "김기획", status: "approved" },
    { id: "2", name: "이개발", status: "approved" },
    { id: "3", name: "박경영", status: "current" },
    { id: "4", name: "최대표", status: "pending" },
  ]}
/>`}
          scope={{ ApprovalFlow }}
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
              <tr><td>steps</td><td>ApprovalStep[]</td><td>필수</td><td>결재 단계 목록</td></tr>
              <tr><td>direction</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>방향</td></tr>
              <tr><td>onStepClick</td><td>(step) =&gt; void</td><td>-</td><td>단계 클릭 콜백</td></tr>
              <tr><td>compact</td><td>boolean</td><td>false</td><td>컴팩트 모드</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>ApprovalStep</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>name</td><td>string</td><td>결재자 이름 (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>직함/역할</td></tr>
              <tr><td>status</td><td>'approved' | 'rejected' | 'pending' | 'current' | 'skipped'</td><td>결재 상태 (필수)</td></tr>
              <tr><td>date</td><td>string</td><td>결재 일시</td></tr>
              <tr><td>comment</td><td>string</td><td>코멘트</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 URL</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
