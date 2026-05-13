import { DataCard } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { User, Mail, Phone, Building } from "lucide-react";

export function DataCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DataCard</h1>
        <p className="page-description">
          구조화된 데이터를 키-값 그리드로 표시하는 카드 컴포넌트. 헤더, 푸터, 구분선을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<DataCard
  title="사용자 정보"
  subtitle="기본 프로필 데이터"
  fields={[
    { label: "이름", value: "김서연", icon: <User size={14} /> },
    { label: "이메일", value: "seoyeon@example.com", icon: <Mail size={14} /> },
    { label: "전화번호", value: "010-1234-5678", icon: <Phone size={14} /> },
    { label: "부서", value: "개발팀", icon: <Building size={14} /> },
    { label: "소개", value: "프론트엔드 개발자로 3년째 근무 중입니다.", fullWidth: true },
  ]}
/>`}
          scope={{ DataCard, User, Mail, Phone, Building }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <DataCard
    title="Default"
    variant="default"
    columns={3}
    fields={[
      { label: "매출", value: "₩45,200,000" },
      { label: "주문", value: "1,234건" },
      { label: "반품률", value: "2.3%" },
    ]}
  />
  <DataCard
    title="Outlined"
    variant="outlined"
    columns={3}
    fields={[
      { label: "매출", value: "₩45,200,000" },
      { label: "주문", value: "1,234건" },
      { label: "반품률", value: "2.3%" },
    ]}
  />
  <DataCard
    title="Filled"
    variant="filled"
    columns={3}
    fields={[
      { label: "매출", value: "₩45,200,000" },
      { label: "주문", value: "1,234건" },
      { label: "반품률", value: "2.3%" },
    ]}
  />
</div>`}
          scope={{ DataCard }}
        />
      </section>

      <section className="docs-section" id="divider">
        <h2 className="section-title">구분선</h2>
        <LiveCodeBlock
          code={`<DataCard
  title="주문 상세"
  divider
  columns={2}
  fields={[
    { label: "주문번호", value: "ORD-2026-0514" },
    { label: "주문일", value: "2026년 5월 14일" },
    { label: "결제 금액", value: "₩128,000" },
    { label: "결제 수단", value: "신용카드" },
    { label: "배송지", value: "서울특별시 강남구 테헤란로 123", fullWidth: true },
  ]}
/>`}
          scope={{ DataCard }}
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
              <tr><td>title</td><td>string</td><td>-</td><td>카드 제목</td></tr>
              <tr><td>subtitle</td><td>string</td><td>-</td><td>부제목</td></tr>
              <tr><td>headerAction</td><td>ReactNode</td><td>-</td><td>헤더 우측 액션</td></tr>
              <tr><td>fields</td><td>DataCardField[]</td><td>필수</td><td>필드 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'default' | 'outlined' | 'filled'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>columns</td><td>number</td><td>2</td><td>컬럼 수</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>-</td><td>footer 콘텐츠</td></tr>
              <tr><td>divider</td><td>boolean</td><td>false</td><td>구분선 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
