import { LayoutSidebar, SidebarGroup, SidebarItem } from "@akron/ui";
import { ExternalLink, BarChart3, Bell, Users, Building2, Clock, CreditCard, FileText } from "lucide-react";

export function LayoutSidebarPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Sidebar</h1>
        <p className="page-description">
          앱의 좌측 네비게이션 패널입니다. 그룹과 아이템으로 메뉴를 구성하며,
          AppShell의 sidebar prop에 전달하여 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="preview">
        <PreviewButton url="/preview/sidebar" description="AppShell 내에서 Sidebar의 전체 구성을 확인하세요." />
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">LayoutSidebar</code>에{" "}
          <code className="inline-code">SidebarGroup</code>과{" "}
          <code className="inline-code">SidebarItem</code>을 조합합니다.
          <code className="inline-code">header</code>와 <code className="inline-code">footer</code> 슬롯도 지원합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box" style={{ padding: 0, height: 380, overflow: "hidden", justifyContent: "flex-start" }}>
          <div style={{ width: 240, height: "100%", borderRight: "1px solid var(--ark-color-border)" }}>
            <LayoutSidebar
              header={<div style={{ fontWeight: 700, fontSize: 15 }}>Akron ERP</div>}
              footer={<div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>v0.1.0</div>}
            >
              <SidebarGroup label="일반">
                <SidebarItem active icon={<BarChart3 size={16} />}>대시보드</SidebarItem>
                <SidebarItem icon={<Bell size={16} />}>알림</SidebarItem>
              </SidebarGroup>
              <SidebarGroup label="인사">
                <SidebarItem icon={<Users size={16} />}>사원 관리</SidebarItem>
                <SidebarItem icon={<Building2 size={16} />}>조직도</SidebarItem>
                <SidebarItem icon={<Clock size={16} />}>근태 관리</SidebarItem>
              </SidebarGroup>
              <SidebarGroup label="재무">
                <SidebarItem icon={<CreditCard size={16} />}>급여 관리</SidebarItem>
                <SidebarItem icon={<FileText size={16} />}>경비 청구</SidebarItem>
              </SidebarGroup>
            </LayoutSidebar>
          </div>
        </div>
        <div className="code-block">
          <code>{`<LayoutSidebar
  header={<Logo />}
  footer={<Version />}
>
  <SidebarGroup label="인사">
    <SidebarItem active icon={<Users />} tooltip="사원 관리">
      사원 관리
    </SidebarItem>
    <SidebarItem icon={<Building2 />} tooltip="조직도">
      조직도
    </SidebarItem>
  </SidebarGroup>
</LayoutSidebar>`}</code>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>컴포넌트</th><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>LayoutSidebar</td><td>header</td><td>ReactNode</td><td>상단 고정 영역</td></tr>
              <tr><td>LayoutSidebar</td><td>footer</td><td>ReactNode</td><td>하단 고정 영역</td></tr>
              <tr><td>LayoutSidebar</td><td>onCollapse</td><td>() =&gt; void</td><td>접기 버튼 클릭 콜백 (제공 시 접기 버튼 표시)</td></tr>
              <tr><td>LayoutSidebar</td><td>collapsed</td><td>boolean</td><td>접힘 상태 (true면 아이콘만 표시)</td></tr>
              <tr><td>LayoutSidebar</td><td>onExpand</td><td>() =&gt; void</td><td>펼치기 버튼 클릭 콜백</td></tr>
              <tr><td>SidebarGroup</td><td>label</td><td>string</td><td>그룹 라벨</td></tr>
              <tr><td>SidebarItem</td><td>active</td><td>boolean</td><td>활성 상태 표시</td></tr>
              <tr><td>SidebarItem</td><td>icon</td><td>ReactNode</td><td>메뉴 아이콘 (접힌 상태에서 아이콘만 표시)</td></tr>
              <tr><td>SidebarItem</td><td>tooltip</td><td>string</td><td>접힌 상태에서 호버 시 표시되는 툴팁 텍스트</td></tr>
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
