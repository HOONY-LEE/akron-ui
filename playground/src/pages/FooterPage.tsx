import { Footer, Button } from "@akron/ui";
import { ExternalLink } from "lucide-react";

export function FooterPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Footer</h1>
        <p className="page-description">
          페이지 하단에 위치하는 푸터 영역입니다.
          저작권 표시, 링크, 부가 정보를 배치합니다.
        </p>
      </header>

      <section className="docs-section" id="preview">
        <PreviewButton url="/preview/footer" description="콘텐츠 하단에 고정되는 푸터를 전체 화면으로 확인하세요." />
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          AppShell의 children 하단에 배치하면 자동으로 페이지 끝으로 밀려납니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box" style={{ padding: 0, overflow: "hidden", flexDirection: "column", gap: 0 }}>
          <Footer>
            <span>© 2026 Akron Corp. All rights reserved.</span>
            <div style={{ display: "flex", gap: 8 }}>
              <Button variant="ghost" size="sm">이용약관</Button>
              <Button variant="ghost" size="sm">개인정보처리방침</Button>
            </div>
          </Footer>
        </div>
        <div className="code-block">
          <code>{`<Footer>
  <span>© 2026 Akron Corp.</span>
  <div>
    <Button variant="ghost" size="sm">이용약관</Button>
    <Button variant="ghost" size="sm">개인정보처리방침</Button>
  </div>
</Footer>`}</code>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>푸터 내용. flex space-between으로 배치됨</td></tr>
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
