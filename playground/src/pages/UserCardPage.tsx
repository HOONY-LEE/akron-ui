import { UserCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function UserCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">UserCard</h1>
        <p className="page-description">
          사용자 프로필 카드 컴포넌트. 이름, 역할, 연락처 등을 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <UserCard
    name="김철수"
    role="프론트엔드 개발자"
    department="개발팀"
    email="chulsoo@company.com"
    phone="010-1234-5678"
    location="서울 강남구"
    status="online"
    onEmailClick={() => alert("이메일")}
    onPhoneClick={() => alert("전화")}
  />
  <UserCard
    name="이영희"
    role="UX 디자이너"
    department="디자인팀"
    status="away"
  />
</div>`}
          scope={{ UserCard }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <UserCard
    variant="horizontal"
    name="박민수"
    role="백엔드 개발자"
    department="개발팀"
    email="minsu@company.com"
    status="online"
  />
  <UserCard
    variant="compact"
    name="정수진"
    role="프로젝트 매니저"
    status="busy"
  />
</div>`}
          scope={{ UserCard }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
  <UserCard size="sm" name="김철수" role="개발자" status="online" />
  <UserCard size="md" name="이영희" role="디자이너" status="away" />
  <UserCard size="lg" name="박민수" role="매니저" status="offline" />
</div>`}
          scope={{ UserCard }}
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
              <tr><td>name</td><td>string</td><td>필수</td><td>사용자 이름</td></tr>
              <tr><td>role</td><td>string</td><td>-</td><td>역할</td></tr>
              <tr><td>department</td><td>string</td><td>-</td><td>부서</td></tr>
              <tr><td>email</td><td>string</td><td>-</td><td>이메일</td></tr>
              <tr><td>phone</td><td>string</td><td>-</td><td>전화번호</td></tr>
              <tr><td>location</td><td>string</td><td>-</td><td>위치</td></tr>
              <tr><td>avatar</td><td>string</td><td>-</td><td>아바타 URL</td></tr>
              <tr><td>status</td><td>'online' | 'offline' | 'away' | 'busy'</td><td>-</td><td>상태</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'compact' | 'horizontal'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>onEmailClick</td><td>() =&gt; void</td><td>-</td><td>이메일 클릭 콜백</td></tr>
              <tr><td>onPhoneClick</td><td>() =&gt; void</td><td>-</td><td>전화 클릭 콜백</td></tr>
              <tr><td>actions</td><td>ReactNode</td><td>-</td><td>액션 버튼 슬롯</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
