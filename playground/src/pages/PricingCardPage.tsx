import { PricingCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Zap } from "lucide-react";

export function PricingCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PricingCard</h1>
        <p className="page-description">
          가격 플랜 카드 컴포넌트. SaaS, 구독 서비스의 플랜 비교 페이지에 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
  <PricingCard
    name="무료"
    price={0}
    description="개인 프로젝트에 적합"
    ctaLabel="시작하기"
    features={[
      { text: "컴포넌트 10개" },
      { text: "기본 테마" },
      { text: "커뮤니티 지원" },
      { text: "상업적 사용", included: false },
      { text: "우선 지원", included: false },
    ]}
    style={{ width: 280 }}
  />
  <PricingCard
    name="Pro"
    price={29000}
    description="팀과 함께 사용하기 좋습니다"
    badge="가장 인기"
    variant="featured"
    ctaLabel="14일 무료 체험"
    features={[
      { text: "컴포넌트 무제한" },
      { text: "다크모드 + 커스텀 테마" },
      { text: "이메일 지원" },
      { text: "상업적 사용" },
      { text: "우선 지원", included: "partial" },
    ]}
    style={{ width: 280 }}
  />
  <PricingCard
    name="Enterprise"
    price="문의"
    description="대규모 조직을 위한 플랜"
    variant="outline"
    ctaLabel="영업팀 문의"
    features={[
      { text: "모든 Pro 기능" },
      { text: "커스텀 컴포넌트 개발" },
      { text: "전담 지원" },
      { text: "상업적 사용" },
      { text: "우선 지원" },
    ]}
    style={{ width: 280 }}
  />
</div>`}
          scope={{ PricingCard }}
        />
      </section>

      <section className="docs-section" id="with-icon">
        <h2 className="section-title">아이콘 포함</h2>
        <LiveCodeBlock
          code={`<PricingCard
  name="스타터"
  price={9900}
  period="/ 월"
  description="소규모 팀을 위한 플랜"
  icon={<Zap size={28} color="var(--ark-color-primary)" />}
  features={[
    { text: "사용자 5명" },
    { text: "프로젝트 10개" },
    { text: "1GB 스토리지" },
  ]}
  style={{ width: 280 }}
/>`}
          scope={{ PricingCard, Zap }}
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
              <tr><td>name</td><td>string</td><td>필수</td><td>플랜 이름</td></tr>
              <tr><td>price</td><td>number | string</td><td>필수</td><td>가격 (0이면 "무료"로 표시)</td></tr>
              <tr><td>currency</td><td>string</td><td>'₩'</td><td>통화 기호</td></tr>
              <tr><td>period</td><td>string</td><td>'/ 월'</td><td>청구 주기 텍스트</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>플랜 설명</td></tr>
              <tr><td>badge</td><td>string</td><td>-</td><td>배지 텍스트 (예: "가장 인기")</td></tr>
              <tr><td>features</td><td>PricingFeature[]</td><td>[]</td><td>기능 목록</td></tr>
              <tr><td>ctaLabel</td><td>string</td><td>'시작하기'</td><td>버튼 텍스트</td></tr>
              <tr><td>onCtaClick</td><td>() =&gt; void</td><td>-</td><td>버튼 클릭 핸들러</td></tr>
              <tr><td>ctaDisabled</td><td>boolean</td><td>false</td><td>버튼 비활성화</td></tr>
              <tr><td>variant</td><td>'default' | 'featured' | 'outline'</td><td>'default'</td><td>카드 변형</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>-</td><td>헤더 아이콘</td></tr>
            </tbody>
          </table>
        </div>
        <h3 style={{ marginTop: 16 }}>PricingFeature</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>text</td><td>string</td><td>기능 텍스트</td></tr>
              <tr><td>included</td><td>boolean | 'partial'</td><td>포함 여부 (true=체크, false=X, 'partial'=부분)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
