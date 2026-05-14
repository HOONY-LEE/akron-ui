import { ComparisonTable } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ComparisonTablePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ComparisonTable</h1>
        <p className="page-description">
          비교 테이블 컴포넌트. 플랜, 기능 등을 나란히 비교합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ComparisonTable
  columns={[
    { id: "free", title: "Free", price: "₩0", pricePeriod: "/월", ctaLabel: "시작하기" },
    { id: "pro", title: "Pro", subtitle: "인기", price: "₩29,000", pricePeriod: "/월", highlighted: true, ctaLabel: "업그레이드" },
    { id: "enterprise", title: "Enterprise", price: "문의", ctaLabel: "연락하기" },
  ]}
  rows={[
    { feature: "프로젝트 수", values: { free: "3개", pro: "무제한", enterprise: "무제한" } },
    { feature: "팀 멤버", values: { free: "1명", pro: "10명", enterprise: "무제한" } },
    { feature: "스토리지", values: { free: "1GB", pro: "50GB", enterprise: "무제한" } },
    { feature: "API 접근", values: { free: false, pro: true, enterprise: true } },
    { feature: "우선 지원", values: { free: false, pro: true, enterprise: true } },
    { feature: "SSO", values: { free: false, pro: false, enterprise: true } },
    { feature: "감사 로그", values: { free: false, pro: false, enterprise: true } },
  ]}
  onCtaClick={(id) => alert(id + " 선택")}
/>`}
          scope={{ ComparisonTable }}
        />
      </section>

      <section className="docs-section" id="categories">
        <h2 className="section-title">카테고리 그룹핑</h2>
        <LiveCodeBlock
          code={`<ComparisonTable
  columns={[
    { id: "basic", title: "Basic" },
    { id: "standard", title: "Standard", highlighted: true },
    { id: "premium", title: "Premium" },
  ]}
  rows={[
    { feature: "대시보드", category: "기본 기능", values: { basic: true, standard: true, premium: true } },
    { feature: "리포트", category: "기본 기능", values: { basic: "기본", standard: "상세", premium: "커스텀" } },
    { feature: "알림 설정", category: "커뮤니케이션", values: { basic: true, standard: true, premium: true } },
    { feature: "Slack 연동", category: "커뮤니케이션", values: { basic: false, standard: true, premium: true } },
    { feature: "Webhook", category: "커뮤니케이션", values: { basic: false, standard: false, premium: true } },
  ]}
  striped
/>`}
          scope={{ ComparisonTable }}
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
              <tr><td>columns</td><td>ComparisonColumn[]</td><td>필수</td><td>비교 열 목록</td></tr>
              <tr><td>rows</td><td>ComparisonRow[]</td><td>필수</td><td>비교 행 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>striped</td><td>boolean</td><td>false</td><td>줄무늬 행</td></tr>
              <tr><td>onCtaClick</td><td>(columnId) =&gt; void</td><td>-</td><td>CTA 클릭</td></tr>
              <tr><td>featureColumnTitle</td><td>string</td><td>'기능'</td><td>기능 열 제목</td></tr>
              <tr><td>stickyFeatureColumn</td><td>boolean</td><td>false</td><td>고정 기능 열</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
