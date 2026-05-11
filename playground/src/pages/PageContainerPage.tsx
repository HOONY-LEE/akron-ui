import { PageContainer, Card } from "@akron/ui";
import { ExternalLink } from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";

export function PageContainerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PageContainer</h1>
        <p className="page-description">
          콘텐츠 영역의 최대 너비와 좌우 패딩을 설정하는 래퍼입니다.
          본문 콘텐츠를 감싸서 적절한 여백과 중앙 정렬을 적용합니다.
        </p>
      </header>

      <section className="docs-section" id="preview">
        <PreviewButton url="/preview/page-container" description="각 size별 최대 너비를 실제 화면에서 비교하세요." />
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">size</code> prop으로 5가지 최대 너비를 지정합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box" style={{ padding: 0, flexDirection: "column", gap: 12, overflow: "hidden" }}>
          {(["sm", "md", "lg", "xl", "full"] as const).map((size) => (
            <PageContainer key={size} size={size}>
              <Card>
                <div style={{ fontSize: 13, fontWeight: 600 }}>
                  size="{size}" — max-width: {
                    { sm: "640px", md: "960px", lg: "1200px", xl: "1440px", full: "100%" }[size]
                  }
                </div>
              </Card>
            </PageContainer>
          ))}
        </div>
        <CodeBlock>{`<PageContainer size="lg">
  {/* 최대 1200px, 좌우 패딩 24px */}
  <Card>콘텐츠</Card>
</PageContainer>`}</CodeBlock>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>size</td><td>'sm' | 'md' | 'lg' | 'xl' | 'full'</td><td>'lg'</td><td>최대 너비. sm=640, md=960, lg=1200, xl=1440</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function PreviewButton({ url, description }: { url: string; description: string }) {
  return (
    <div style={{
      border: "1px solid var(--ark-color-border)",
      borderRadius: 12,
      padding: "16px 24px",
      background: "var(--ark-color-bg-subtle)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>전체 화면 미리보기</div>
        <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>{description}</div>
      </div>
      <button
        onClick={() => window.open(url, "_blank", "noopener")}
        style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "10px 20px",
          fontSize: 14, fontWeight: 600,
          color: "var(--ark-color-text-inverse)",
          backgroundColor: "var(--ark-color-primary-500)",
          border: "none", borderRadius: 8, cursor: "pointer",
          transition: "background-color 0.15s ease",
          flexShrink: 0,
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--ark-color-primary-600)"}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--ark-color-primary-500)"}
      >
        <ExternalLink size={15} />
        새 창에서 열기
      </button>
    </div>
  );
}
