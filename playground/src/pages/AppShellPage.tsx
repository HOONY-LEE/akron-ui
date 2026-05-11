import { useState } from "react";
import { ExternalLink, Monitor, Tablet, Smartphone } from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";

interface ToggleOption {
  key: string;
  label: string;
  defaultOn: boolean;
}

const layoutOptions: ToggleOption[] = [
  { key: "header", label: "헤더", defaultOn: true },
  { key: "leftSidebar", label: "좌측 사이드바", defaultOn: true },
  { key: "rightSidebar", label: "우측 사이드바", defaultOn: false },
  { key: "footer", label: "푸터", defaultOn: true },
];

type DeviceType = "pc" | "tablet" | "mobile";

const deviceList: { key: DeviceType; label: string; icon: typeof Monitor }[] = [
  { key: "pc", label: "Desktop", icon: Monitor },
  { key: "tablet", label: "Tablet", icon: Tablet },
  { key: "mobile", label: "Mobile", icon: Smartphone },
];

export function AppShellPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(layoutOptions.map((o) => [o.key, o.defaultOn]))
  );
  const [device, setDevice] = useState<DeviceType>("pc");

  const toggle = (key: string) =>
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));

  const previewUrl = buildPreviewUrl(selected);

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">AppShell</h1>
        <p className="page-description">
          사이드바, 헤더, 콘텐츠 영역을 통합하는 최상위 레이아웃 셸입니다.
          그룹웨어/ERP 앱의 전체 페이지 구조를 한번에 잡아줍니다.
        </p>
      </header>

      <section className="docs-section" id="builder">
        <h2 className="section-title">레이아웃 빌더</h2>
        <p className="section-desc">
          원하는 레이아웃 요소와 디바이스를 선택하고 반응형 미리보기를 확인하세요.
          PC에서는 전체 사이드바, 태블릿에서는 아이콘 전용, 모바일에서는 오버레이 패턴으로 전환됩니다.
        </p>

        <div style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--ark-color-bg)",
        }}>
          {/* Toggle controls + device selector + preview button */}
          <div style={{
            padding: "20px 24px",
            borderBottom: "1px solid var(--ark-color-border)",
            display: "flex",
            alignItems: "center",
            gap: 24,
            flexWrap: "wrap",
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ark-color-text-secondary)" }}>
              구성 요소
            </span>
            {layoutOptions.map((opt) => (
              <label
                key={opt.key}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  cursor: "pointer", fontSize: 14, userSelect: "none",
                }}
              >
                <ToggleChip active={selected[opt.key]} onClick={() => toggle(opt.key)} />
                {opt.label}
              </label>
            ))}
            <button
              onClick={() => window.open(previewUrl, "_blank", "noopener")}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                padding: "7px 14px",
                fontSize: 13, fontWeight: 600,
                marginLeft: "auto",
                color: "var(--ark-color-text-inverse)",
                backgroundColor: "var(--ark-color-primary-500)",
                border: "none", borderRadius: 8, cursor: "pointer",
                transition: "background-color 0.15s ease",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--ark-color-primary-600)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "var(--ark-color-primary-500)"}
            >
              <ExternalLink size={14} />
              새 창에서 미리보기
            </button>
          </div>

          {/* Device selector */}
          <div style={{
            padding: "12px 24px",
            borderBottom: "1px solid var(--ark-color-border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "var(--ark-color-bg-subtle)",
          }}>
            <div style={{ display: "flex", gap: 4 }}>
              {deviceList.map((d) => (
                <button
                  key={d.key}
                  onClick={() => setDevice(d.key)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "5px 12px", fontSize: 12, fontWeight: 500,
                    border: "1px solid",
                    borderColor: device === d.key ? "var(--ark-color-primary-500)" : "var(--ark-color-border)",
                    borderRadius: 6, cursor: "pointer",
                    background: device === d.key ? "var(--ark-color-primary-50)" : "var(--ark-color-bg)",
                    color: device === d.key ? "var(--ark-color-primary-600)" : "var(--ark-color-text-secondary)",
                    transition: "all 150ms ease",
                  }}
                >
                  <d.icon size={13} />
                  {d.label}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 11, color: "var(--ark-color-text-disabled)" }}>
              {device === "pc" ? "사이드바 전체 표시" : device === "tablet" ? "아이콘 전용 사이드바" : "오버레이 사이드바"}
            </span>
          </div>

          {/* Mini wireframe preview */}
          <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
            <LayoutWireframe
              header={selected.header}
              leftSidebar={selected.leftSidebar}
              rightSidebar={selected.rightSidebar}
              footer={selected.footer}
              device={device}
            />
          </div>
        </div>
      </section>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">sidebar</code> prop에 사이드바 콘텐츠를 전달하면 좌측 고정 사이드바가 생성되고,
          <code className="inline-code">children</code>은 우측 본문 영역에 배치됩니다.
        </p>
        <CodeBlock>{`<AppShell
  sidebarWidth={260}
  sidebar={
    <LayoutSidebar header={<Logo />}>
      <SidebarGroup label="메뉴">
        <SidebarItem active>대시보드</SidebarItem>
        <SidebarItem>인사 관리</SidebarItem>
      </SidebarGroup>
    </LayoutSidebar>
  }
>
  <Header logo="대시보드" sticky />
  <PageContainer>
    {/* 콘텐츠 */}
  </PageContainer>
  <Footer>© 2026 Akron Corp.</Footer>
</AppShell>`}</CodeBlock>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>sidebar</td><td>ReactNode</td><td>-</td><td>좌측 사이드바 콘텐츠</td></tr>
              <tr><td>sidebarWidth</td><td>number</td><td>260</td><td>사이드바 너비 (px)</td></tr>
              <tr><td>sidebarCollapsed</td><td>boolean</td><td>false</td><td>사이드바 접힘 상태</td></tr>
              <tr><td>sidebarOpen</td><td>boolean</td><td>false</td><td>모바일에서 사이드바 표시 여부</td></tr>
              <tr><td>onSidebarClose</td><td>() =&gt; void</td><td>-</td><td>모바일 오버레이 클릭 시 사이드바 닫기 콜백</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>본문 영역 (Header + PageContainer + Footer 조합)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}

function ToggleChip({ active, onClick }: { active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 22,
        borderRadius: 11,
        border: "none",
        backgroundColor: active ? "var(--ark-color-primary-500)" : "var(--ark-color-gray-300)",
        position: "relative",
        cursor: "pointer",
        transition: "background-color 0.2s ease",
        flexShrink: 0,
      }}
    >
      <span style={{
        position: "absolute",
        top: 2, left: active ? 20 : 2,
        width: 18, height: 18,
        borderRadius: "50%",
        backgroundColor: "#fff",
        transition: "left 0.2s ease",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

/* ── Responsive-aware Layout Wireframe ── */

function LayoutWireframe({
  header, leftSidebar, rightSidebar, footer, device,
}: {
  header: boolean; leftSidebar: boolean; rightSidebar: boolean; footer: boolean; device: DeviceType;
}) {
  /* Dimensions per device */
  const dims = device === "mobile"
    ? { w: 220, h: 400, sidebarW: 0, collapsedW: 0, headerH: 32, footerH: 24 }
    : device === "tablet"
    ? { w: 340, h: 440, sidebarW: 40, collapsedW: 40, headerH: 32, footerH: 26 }
    : { w: 480, h: 300, sidebarW: 80, collapsedW: 80, headerH: 32, footerH: 28 };

  const { w, h, headerH, footerH } = dims;

  /* Sidebar width depends on device */
  const leftW = leftSidebar
    ? device === "mobile" ? 0 : device === "tablet" ? dims.collapsedW : dims.sidebarW
    : 0;
  const rightW = rightSidebar
    ? device === "mobile" ? 0 : device === "tablet" ? 0 : dims.sidebarW
    : 0;

  const contentLeft = leftW;
  const contentRight = rightW;
  const contentTop = header ? headerH : 0;
  const contentBottom = footer ? footerH : 0;
  const contentW = w - contentLeft - contentRight;

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ borderRadius: 8, border: "1px solid var(--ark-color-border)", transition: "width 0.3s ease, height 0.3s ease" }}
    >
      {/* Background */}
      <rect width={w} height={h} fill="var(--ark-color-bg-subtle)" rx={8} />

      {/* Left Sidebar — full (PC), icon-only (Tablet), hidden (Mobile) */}
      {leftSidebar && device === "pc" && (
        <g>
          <rect x={0} y={0} width={leftW} height={h} fill="var(--ark-color-bg)" rx={8} />
          <rect x={0} y={0} width={leftW} height={h} fill="none" stroke="var(--ark-color-border)" rx={8} />
          <rect x={14} y={16} width={52} height={8} rx={3} fill="var(--ark-color-primary-500)" opacity={0.7} />
          <rect x={14} y={36} width={40} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={14} y={48} width={52} height={6} rx={3} fill="var(--ark-color-primary-100)" />
          <rect x={14} y={60} width={44} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={72} width={48} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={92} width={40} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={14} y={104} width={50} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={116} width={42} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <text x={leftW / 2} y={h - 20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>사이드바</text>
        </g>
      )}
      {leftSidebar && device === "tablet" && (
        <g>
          <rect x={0} y={0} width={leftW} height={h} fill="var(--ark-color-bg)" rx={8} />
          <rect x={0} y={0} width={leftW} height={h} fill="none" stroke="var(--ark-color-border)" rx={8} />
          {/* Icon placeholders */}
          <rect x={10} y={14} width={20} height={6} rx={3} fill="var(--ark-color-primary-500)" opacity={0.7} />
          <rect x={12} y={32} width={16} height={16} rx={4} fill="var(--ark-color-primary-100)" />
          <rect x={12} y={54} width={16} height={16} rx={4} fill="var(--ark-color-gray-200)" />
          <rect x={12} y={76} width={16} height={16} rx={4} fill="var(--ark-color-gray-200)" />
          <rect x={12} y={104} width={16} height={16} rx={4} fill="var(--ark-color-gray-200)" />
          <rect x={12} y={126} width={16} height={16} rx={4} fill="var(--ark-color-gray-200)" />
        </g>
      )}

      {/* Header */}
      {header && (
        <g>
          <rect x={contentLeft} y={0} width={w - contentLeft} height={headerH} fill="var(--ark-color-bg)" />
          <line x1={contentLeft} y1={headerH} x2={w} y2={headerH} stroke="var(--ark-color-border)" />
          {/* Mobile: show hamburger icon if sidebar is on */}
          {device === "mobile" && leftSidebar ? (
            <>
              <rect x={contentLeft + 12} y={11} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
              <rect x={contentLeft + 12} y={15} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
              <rect x={contentLeft + 12} y={19} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
              <rect x={contentLeft + 34} y={12} width={50} height={8} rx={3} fill="var(--ark-color-gray-400)" />
            </>
          ) : (
            <rect x={contentLeft + 16} y={12} width={60} height={8} rx={3} fill="var(--ark-color-gray-400)" />
          )}
          {w - contentRight > contentLeft + 100 && (
            <>
              <circle cx={w - contentRight - 20} cy={16} r={6} fill="var(--ark-color-gray-300)" />
              {w - contentRight - contentLeft > 150 && (
                <circle cx={w - contentRight - 40} cy={16} r={6} fill="var(--ark-color-gray-300)" />
              )}
            </>
          )}
          <text x={(contentLeft + w - contentRight) / 2} y={20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>헤더</text>
        </g>
      )}

      {/* Content area */}
      <g>
        <rect x={contentLeft + 16} y={contentTop + 16} width={Math.min(120, contentW - 32)} height={10} rx={4} fill="var(--ark-color-gray-400)" />
        <rect x={contentLeft + 16} y={contentTop + 34} width={Math.min(200, contentW - 32)} height={7} rx={3} fill="var(--ark-color-gray-200)" />
        <rect x={contentLeft + 16} y={contentTop + 50} width={contentW - 32} height={Math.min(50, (h - contentTop - contentBottom) / 4)} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
        <rect x={contentLeft + 16} y={contentTop + 50 + Math.min(50, (h - contentTop - contentBottom) / 4) + 10} width={contentW - 32} height={Math.min(50, (h - contentTop - contentBottom) / 4)} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
        <text
          x={(contentLeft + w - contentRight) / 2}
          y={(contentTop + h - contentBottom) / 2 + 30}
          textAnchor="middle"
          fontSize={device === "mobile" ? 9 : 10}
          fill="var(--ark-color-text-disabled)"
        >
          콘텐츠 영역
        </text>
      </g>

      {/* Right Sidebar — hidden on tablet/mobile */}
      {rightSidebar && device === "pc" && (
        <g>
          <rect x={w - rightW} y={contentTop} width={rightW} height={h - contentTop - contentBottom} fill="var(--ark-color-bg-subtle)" />
          <line x1={w - rightW} y1={contentTop} x2={w - rightW} y2={h - contentBottom} stroke="var(--ark-color-border)" />
          <rect x={w - rightW + 12} y={contentTop + 16} width={56} height={7} rx={3} fill="var(--ark-color-gray-400)" />
          <rect x={w - rightW + 12} y={contentTop + 32} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <rect x={w - rightW + 12} y={contentTop + 64} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <text x={w - rightW / 2} y={h - contentBottom - 16} textAnchor="middle" fontSize={8} fill="var(--ark-color-text-secondary)" fontWeight={600}>우측 패널</text>
        </g>
      )}

      {/* Footer */}
      {footer && (
        <g>
          <rect x={contentLeft} y={h - footerH} width={w - contentLeft - contentRight} height={footerH} fill="var(--ark-color-bg)" />
          <line x1={contentLeft} y1={h - footerH} x2={w - contentRight} y2={h - footerH} stroke="var(--ark-color-border)" />
          <rect x={contentLeft + 12} y={h - footerH + Math.floor(footerH / 2) - 3} width={Math.min(80, contentW - 24)} height={6} rx={3} fill="var(--ark-color-gray-300)" />
          <text x={(contentLeft + w - contentRight) / 2} y={h - 6} textAnchor="middle" fontSize={device === "mobile" ? 8 : 9} fill="var(--ark-color-text-secondary)" fontWeight={600}>푸터</text>
        </g>
      )}

      {/* Mobile overlay sidebar indicator */}
      {leftSidebar && device === "mobile" && (
        <g opacity={0.3}>
          <rect x={0} y={0} width={w} height={h} fill="var(--ark-color-gray-900)" rx={8} />
          <rect x={0} y={0} width={w * 0.65} height={h} fill="var(--ark-color-bg)" rx={8} />
          <rect x={12} y={16} width={w * 0.65 - 24} height={8} rx={3} fill="var(--ark-color-primary-500)" opacity={0.7} />
          <rect x={12} y={36} width={w * 0.65 * 0.6} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={12} y={48} width={w * 0.65 - 24} height={6} rx={3} fill="var(--ark-color-primary-100)" />
          <rect x={12} y={60} width={w * 0.65 * 0.7} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={12} y={72} width={w * 0.65 * 0.8} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <text x={w * 0.65 / 2} y={h / 2} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>오버레이 사이드바</text>
        </g>
      )}

      {/* Border */}
      <rect width={w} height={h} fill="none" stroke="var(--ark-color-border)" rx={8} />
    </svg>
  );
}

function buildPreviewUrl(selected: Record<string, boolean>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(selected)) {
    params.set(key, value ? "1" : "0");
  }
  return `/preview/app-shell?${params.toString()}`;
}
