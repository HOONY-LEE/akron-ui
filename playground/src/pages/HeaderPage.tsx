import { Header, Button } from "@sunghoon_lee/akron-ui";
import { Bell, Search, User, ExternalLink } from "lucide-react";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function HeaderPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Header</h1>
        <p className="page-description">
          페이지 상단에 위치하는 네비게이션 바입니다.
          로고, 네비게이션, 액션 버튼 영역으로 구성됩니다.
        </p>
      </header>

      <section className="docs-section" id="preview">
        <PreviewButton url="/preview/header" />
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">logo</code>, <code className="inline-code">nav</code>,
          <code className="inline-code">actions</code> 영역으로 나뉩니다.
          <code className="inline-code">sticky</code> prop으로 스크롤 시 상단 고정할 수 있습니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ overflow: "hidden", borderRadius: 8 }}>
  <Header
    logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Akron ERP</span>}
    actions={
      <>
        <Button variant="ghost" size="sm"><Search size={16} /></Button>
        <Button variant="ghost" size="sm"><Bell size={16} /></Button>
        <Button variant="ghost" size="sm"><User size={16} /></Button>
      </>
    }
  />
</div>`}
          scope={{ Header, Button, Bell, Search, User }}
        />
      </section>

      <section className="docs-section" id="sticky">
        <h2 className="section-title">고정 헤더</h2>
        <p className="section-desc">
          <code className="inline-code">sticky</code> prop을 추가하면 스크롤 시 상단에 고정됩니다.
          <code className="inline-code">height</code>로 높이를 조절할 수 있습니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ overflow: "hidden", borderRadius: 8 }}>
  <Header
    logo="높이 48px 헤더"
    height={48}
    actions={<Button variant="outline" size="sm">로그아웃</Button>}
  />
</div>`}
          scope={{ Header, Button }}
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
              <tr><td>logo</td><td>ReactNode</td><td>-</td><td>좌측 로고/타이틀 영역</td></tr>
              <tr><td>nav</td><td>ReactNode</td><td>-</td><td>중앙 네비게이션 영역</td></tr>
              <tr><td>actions</td><td>ReactNode</td><td>-</td><td>우측 액션 버튼 영역</td></tr>
              <tr><td>height</td><td>number</td><td>56</td><td>헤더 높이 (px)</td></tr>
              <tr><td>sticky</td><td>boolean</td><td>false</td><td>상단 고정 여부</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function PreviewButton({ url }: { url: string }) {
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
        <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          실제 페이지에서 Header의 sticky 동작을 확인하세요.
        </div>
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
