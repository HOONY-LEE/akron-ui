import { Changelog } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ChangelogPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Changelog</h1>
        <p className="page-description">
          변경 로그 컴포넌트. 릴리스 노트와 변경 내역을 시각적으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Changelog
  releases={[
    {
      version: "2.1.0",
      date: "2025-05-10",
      current: true,
      changes: [
        { type: "added", description: "다크모드 지원 추가" },
        { type: "added", description: "TreeSelect 컴포넌트 추가" },
        { type: "changed", description: "Button 컴포넌트 애니메이션 개선" },
        { type: "fixed", description: "Modal 닫기 시 포커스 복원 문제 수정" },
      ],
    },
    {
      version: "2.0.0",
      date: "2025-04-15",
      changes: [
        { type: "added", description: "디자인 토큰 시스템 도입" },
        { type: "changed", description: "모든 컴포넌트 CSS 변수 기반으로 마이그레이션" },
        { type: "removed", description: "레거시 테마 API 제거" },
        { type: "deprecated", description: "className prop 직접 전달 방식 지원 종료 예정" },
        { type: "security", description: "XSS 취약점 패치" },
      ],
    },
    {
      version: "1.5.2",
      date: "2025-03-20",
      changes: [
        { type: "fixed", description: "DatePicker 월 이동 시 깜빡임 수정" },
        { type: "fixed", description: "Select 옵션 스크롤 성능 개선" },
      ],
    },
  ]}
/>`}
          scope={{ Changelog }}
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
              <tr><td>releases</td><td>ChangelogRelease[]</td><td>필수</td><td>릴리스 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showIcons</td><td>boolean</td><td>true</td><td>아이콘 표시</td></tr>
              <tr><td>showBadges</td><td>boolean</td><td>true</td><td>배지 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
