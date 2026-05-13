import { DescriptionList } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DescriptionListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DescriptionList</h1>
        <p className="page-description">
          키-값 쌍을 표시하는 정의 목록 컴포넌트. 수직, 수평, 그리드 레이아웃을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 레이아웃 (기본)</h2>
        <LiveCodeBlock
          code={`<DescriptionList
  items={[
    { term: "이름", detail: "김서연" },
    { term: "이메일", detail: "seoyeon@example.com" },
    { term: "부서", detail: "개발팀" },
    { term: "입사일", detail: "2024년 3월 15일" },
  ]}
/>`}
          scope={{ DescriptionList }}
        />
      </section>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 레이아웃</h2>
        <LiveCodeBlock
          code={`<DescriptionList
  layout="horizontal"
  divider
  items={[
    { term: "프로젝트명", detail: "Akron UI v2" },
    { term: "상태", detail: "진행 중" },
    { term: "담당자", detail: "이성훈" },
    { term: "마감일", detail: "2026년 6월 30일" },
  ]}
/>`}
          scope={{ DescriptionList }}
        />
      </section>

      <section className="docs-section" id="grid">
        <h2 className="section-title">그리드 레이아웃</h2>
        <LiveCodeBlock
          code={`<DescriptionList
  layout="grid"
  columns={3}
  items={[
    { term: "총 사용자", detail: "12,456명" },
    { term: "활성 사용자", detail: "8,234명" },
    { term: "신규 가입", detail: "156명" },
    { term: "총 매출", detail: "₩45,200,000" },
    { term: "평균 주문", detail: "₩32,500" },
    { term: "반품률", detail: "2.3%" },
  ]}
/>`}
          scope={{ DescriptionList }}
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
              <tr><td>items</td><td>DescriptionItem[]</td><td>필수</td><td>항목 목록</td></tr>
              <tr><td>layout</td><td>'vertical' | 'horizontal' | 'grid'</td><td>'vertical'</td><td>레이아웃</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>divider</td><td>boolean</td><td>false</td><td>구분선</td></tr>
              <tr><td>columns</td><td>number</td><td>2</td><td>그리드 컬럼 수</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>DescriptionItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>term</td><td>string</td><td>키 / 라벨 (필수)</td></tr>
              <tr><td>detail</td><td>ReactNode</td><td>값 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>부가 아이콘</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
