import { StatCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Users, DollarSign, ShoppingCart, BarChart2, ArrowUpRight, Activity } from "lucide-react";

export function StatCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">StatCard</h1>
        <p className="page-description">
          대시보드 지표 카드. 제목, 값, 트렌드 방향, 아이콘을 조합하여 KPI/메트릭을 시각적으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
  <StatCard
    title="총 사용자"
    value="12,847"
    trend="up"
    trendLabel="+8.2%"
    trendDesc="지난달 대비"
    icon={<Users size={18} />}
    iconColor="primary"
  />
  <StatCard
    title="월 매출"
    value="₩42,500,000"
    trend="up"
    trendLabel="+15.3%"
    trendDesc="전월 대비"
    icon={<DollarSign size={18} />}
    iconColor="success"
  />
  <StatCard
    title="주문 수"
    value="1,284"
    trend="down"
    trendLabel="-3.1%"
    trendDesc="지난주 대비"
    icon={<ShoppingCart size={18} />}
    iconColor="warning"
  />
  <StatCard
    title="이탈률"
    value="24.6"
    unit="%"
    trend="neutral"
    trendLabel="0%"
    trendDesc="변동 없음"
    icon={<BarChart2 size={18} />}
    iconColor="error"
  />
</div>`}
          scope={{ StatCard, Users, DollarSign, ShoppingCart, BarChart2 }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
  <StatCard
    title="Default"
    value="8,421"
    trend="up"
    trendLabel="+12%"
    icon={<Activity size={18} />}
    variant="default"
  />
  <StatCard
    title="Filled"
    value="8,421"
    trend="up"
    trendLabel="+12%"
    icon={<Activity size={18} />}
    variant="filled"
  />
  <StatCard
    title="Outline"
    value="8,421"
    trend="up"
    trendLabel="+12%"
    icon={<Activity size={18} />}
    variant="outline"
  />
</div>`}
          scope={{ StatCard, Activity }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <StatCard size="sm" title="Small" value="1,234" trend="up" trendLabel="+5%" icon={<Users size={14} />} />
  <StatCard size="md" title="Medium (기본)" value="1,234" trend="up" trendLabel="+5%" icon={<Users size={18} />} />
  <StatCard size="lg" title="Large" value="1,234" trend="up" trendLabel="+5%" icon={<Users size={22} />} />
</div>`}
          scope={{ StatCard, Users }}
        />
      </section>

      <section className="docs-section" id="clickable">
        <h2 className="section-title">클릭 가능</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
  <StatCard
    title="신규 가입자"
    value="342"
    trend="up"
    trendLabel="+28%"
    trendDesc="지난주 대비"
    icon={<Users size={18} />}
    iconColor="primary"
    description="자세히 보기 →"
    clickable
    onClick={() => alert("신규 가입자 상세")}
  />
  <StatCard
    title="활성 세션"
    value="1,893"
    trend="down"
    trendLabel="-4.2%"
    icon={<ArrowUpRight size={18} />}
    iconColor="success"
    description="실시간 현황 →"
    clickable
    onClick={() => alert("활성 세션 상세")}
  />
</div>`}
          scope={{ StatCard, Users, ArrowUpRight }}
        />
      </section>

      <section className="docs-section" id="loading">
        <h2 className="section-title">로딩</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
  <StatCard title="로딩 중..." value="" loading icon={<Users size={18} />} />
  <StatCard title="로딩 중..." value="" loading icon={<DollarSign size={18} />} iconColor="success" />
</div>`}
          scope={{ StatCard, Users, DollarSign }}
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
              <tr><td>title</td><td>string</td><td>필수</td><td>카드 제목</td></tr>
              <tr><td>value</td><td>string | number</td><td>필수</td><td>지표 값</td></tr>
              <tr><td>unit</td><td>string</td><td>-</td><td>단위 (e.g. "%", "원")</td></tr>
              <tr><td>trend</td><td>'up' | 'down' | 'neutral'</td><td>-</td><td>트렌드 방향</td></tr>
              <tr><td>trendLabel</td><td>string</td><td>-</td><td>트렌드 값 (e.g. "+12.5%")</td></tr>
              <tr><td>trendDesc</td><td>string</td><td>-</td><td>트렌드 설명 (e.g. "지난달 대비")</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>-</td><td>아이콘</td></tr>
              <tr><td>iconColor</td><td>'primary' | 'success' | 'warning' | 'error' | string</td><td>'primary'</td><td>아이콘 배경 색</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>부가 설명</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'filled' | 'outline'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>로딩 상태 (스켈레톤)</td></tr>
              <tr><td>clickable</td><td>boolean</td><td>false</td><td>클릭 가능 (hover 효과)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
