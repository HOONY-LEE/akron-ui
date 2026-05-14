import { ActivityFeed } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ActivityFeedPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ActivityFeed</h1>
        <p className="page-description">
          활동 피드 컴포넌트. 팀 활동, 감사 로그, 변경 이력을 타임라인으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ActivityFeed
  items={[
    { id: "1", type: "create", user: "김철수", message: "새 프로젝트를 생성했습니다.", detail: "Akron UI v2.0", timestamp: new Date(Date.now() - 300000) },
    { id: "2", type: "comment", user: "이영희", message: "디자인 리뷰에 코멘트를 남겼습니다.", timestamp: new Date(Date.now() - 3600000) },
    { id: "3", type: "assign", user: "박민수", message: "김철수님에게 작업을 할당했습니다.", timestamp: new Date(Date.now() - 7200000) },
    { id: "4", type: "update", user: "정수진", message: "문서를 업데이트했습니다.", detail: "API 레퍼런스 v3", timestamp: new Date(Date.now() - 86400000) },
    { id: "5", type: "delete", user: "최동훈", message: "이전 버전 파일을 삭제했습니다.", timestamp: new Date(Date.now() - 172800000) },
    { id: "6", type: "upload", user: "김철수", message: "첨부 파일을 업로드했습니다.", detail: "보고서_최종.pdf", timestamp: new Date(Date.now() - 259200000) },
    { id: "7", type: "status", user: "이영희", message: "상태를 '완료'로 변경했습니다.", timestamp: new Date(Date.now() - 345600000) },
  ]}
/>`}
          scope={{ ActivityFeed }}
        />
      </section>

      <section className="docs-section" id="grouped">
        <h2 className="section-title">날짜별 그룹</h2>
        <LiveCodeBlock
          code={`<ActivityFeed
  groupByDate
  items={[
    { id: "1", type: "create", user: "김철수", message: "새 작업을 생성했습니다.", timestamp: new Date() },
    { id: "2", type: "comment", user: "이영희", message: "코멘트를 남겼습니다.", timestamp: new Date(Date.now() - 3600000) },
    { id: "3", type: "update", user: "박민수", message: "문서를 수정했습니다.", timestamp: new Date(Date.now() - 86400000) },
    { id: "4", type: "assign", user: "정수진", message: "작업을 할당했습니다.", timestamp: new Date(Date.now() - 86400000 * 2) },
  ]}
/>`}
          scope={{ ActivityFeed }}
        />
      </section>

      <section className="docs-section" id="max-items">
        <h2 className="section-title">최대 항목 수</h2>
        <LiveCodeBlock
          code={`<ActivityFeed
  maxItems={3}
  items={[
    { id: "1", type: "create", user: "김철수", message: "항목 1", timestamp: new Date() },
    { id: "2", type: "update", user: "이영희", message: "항목 2", timestamp: new Date(Date.now() - 3600000) },
    { id: "3", type: "comment", user: "박민수", message: "항목 3", timestamp: new Date(Date.now() - 7200000) },
    { id: "4", type: "delete", user: "정수진", message: "항목 4", timestamp: new Date(Date.now() - 86400000) },
    { id: "5", type: "upload", user: "최동훈", message: "항목 5", timestamp: new Date(Date.now() - 172800000) },
  ]}
/>`}
          scope={{ ActivityFeed }}
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
              <tr><td>items</td><td>ActivityItem[]</td><td>필수</td><td>활동 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showTimeline</td><td>boolean</td><td>true</td><td>타임라인 표시</td></tr>
              <tr><td>showAvatar</td><td>boolean</td><td>true</td><td>아바타 표시</td></tr>
              <tr><td>maxItems</td><td>number</td><td>-</td><td>표시 항목 수 제한</td></tr>
              <tr><td>onItemClick</td><td>(item) =&gt; void</td><td>-</td><td>클릭 콜백</td></tr>
              <tr><td>groupByDate</td><td>boolean</td><td>false</td><td>날짜별 그룹</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'활동 내역이 없습니다.'</td><td>빈 상태 메시지</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>ActivityItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 ID (필수)</td></tr>
              <tr><td>type</td><td>ActivityType</td><td>활동 유형 (필수)</td></tr>
              <tr><td>user</td><td>string</td><td>사용자 이름 (필수)</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 URL</td></tr>
              <tr><td>message</td><td>string</td><td>활동 메시지 (필수)</td></tr>
              <tr><td>detail</td><td>string</td><td>상세 정보</td></tr>
              <tr><td>timestamp</td><td>string | Date</td><td>시간 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>커스텀 아이콘</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
