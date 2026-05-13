import { Breadcrumb } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BreadcrumbPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Breadcrumb</h1>
        <p className="page-description">
          경로 네비게이션 컴포넌트. 현재 페이지의 위치를 계층 구조로 표시합니다.
          긴 경로를 자동으로 접어 표시하는 기능을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Breadcrumb
  items={[
    { label: "홈", href: "/" },
    { label: "설정", href: "/settings" },
    { label: "프로필" },
  ]}
/>`}
          scope={{ Breadcrumb }}
        />
      </section>

      <section className="docs-section" id="custom-separator">
        <h2 className="section-title">구분자 커스텀</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Breadcrumb
    separator="/"
    items={[
      { label: "홈", href: "/" },
      { label: "제품", href: "/products" },
      { label: "스마트폰" },
    ]}
  />
  <Breadcrumb
    separator="›"
    items={[
      { label: "홈", href: "/" },
      { label: "제품", href: "/products" },
      { label: "스마트폰" },
    ]}
  />
</div>`}
          scope={{ Breadcrumb }}
        />
      </section>

      <section className="docs-section" id="collapsed">
        <h2 className="section-title">경로 축약</h2>
        <p className="section-desc">
          <code className="inline-code">maxItems</code>로 표시 개수를 제한하면 중간 경로가 <code className="inline-code">...</code>로 축약됩니다.
        </p>
        <LiveCodeBlock
          code={`<Breadcrumb
  maxItems={3}
  items={[
    { label: "홈", href: "/" },
    { label: "카테고리", href: "/categories" },
    { label: "전자기기", href: "/electronics" },
    { label: "스마트폰", href: "/smartphones" },
    { label: "Galaxy S25" },
  ]}
/>`}
          scope={{ Breadcrumb }}
        />
      </section>

      <section className="docs-section" id="click-handler">
        <h2 className="section-title">클릭 핸들러</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [current, setCurrent] = useState("제품 상세");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Breadcrumb
        items={[
          { label: "홈", onClick: () => setCurrent("홈") },
          { label: "제품 목록", onClick: () => setCurrent("제품 목록") },
          { label: "제품 상세" },
        ]}
      />
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        현재: {current}
      </span>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Breadcrumb, useState: require("react").useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Breadcrumb Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>items</td><td>BreadcrumbItem[]</td><td>-</td><td>경로 아이템 목록 (필수)</td></tr>
              <tr><td>separator</td><td>ReactNode</td><td>ChevronRight</td><td>구분자</td></tr>
              <tr><td>maxItems</td><td>number</td><td>-</td><td>최대 표시 개수</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>BreadcrumbItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>label</td><td>string</td><td>표시 텍스트 (필수)</td></tr>
              <tr><td>href</td><td>string</td><td>링크 URL</td></tr>
              <tr><td>onClick</td><td>(e) =&gt; void</td><td>클릭 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
