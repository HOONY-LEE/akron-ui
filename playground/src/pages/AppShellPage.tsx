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

export function AppShellPage() {
  const [selected, setSelected] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(layoutOptions.map((o) => [o.key, o.defaultOn]))
  );

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
          원하는 레이아웃 요소를 선택하고 전체 화면 미리보기로 확인하세요.
        </p>

        <div style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 12,
          overflow: "hidden",
          background: "var(--ark-color-bg)",
        }}>
          {/* Toggle controls + preview button */}
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

          {/* Mini wireframe preview */}
          <div style={{ padding: 24, display: "flex", justifyContent: "center" }}>
            <LayoutWireframe
              header={selected.header}
              leftSidebar={selected.leftSidebar}
              rightSidebar={selected.rightSidebar}
              footer={selected.footer}
            />
          </div>
        </div>
      </section>

      <section className="docs-section" id="responsive">
        <h2 className="section-title">반응형 미리보기</h2>
        <p className="section-desc">
          AppShell은 PC · 태블릿 · 모바일 3단계 반응형을 지원합니다.
          PC에서는 전체 사이드바, 태블릿에서는 아이콘 전용, 모바일에서는 오버레이 패턴으로 전환됩니다.
        </p>
        <DevicePreview url={buildPreviewUrl(selected)} />
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

function LayoutWireframe({
  header, leftSidebar, rightSidebar, footer,
}: {
  header: boolean; leftSidebar: boolean; rightSidebar: boolean; footer: boolean;
}) {
  const w = 480;
  const h = 300;
  const sidebarW = 80;
  const headerH = 32;
  const footerH = 28;

  const contentLeft = leftSidebar ? sidebarW : 0;
  const contentRight = rightSidebar ? sidebarW : 0;
  const contentTop = header ? headerH : 0;
  const contentBottom = footer ? footerH : 0;

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ borderRadius: 8, border: "1px solid var(--ark-color-border)" }}>
      {/* Background */}
      <rect width={w} height={h} fill="var(--ark-color-bg-subtle)" rx={8} />

      {/* Left Sidebar */}
      {leftSidebar && (
        <g>
          <rect x={0} y={0} width={sidebarW} height={h} fill="var(--ark-color-bg)" rx={8} />
          <rect x={0} y={0} width={sidebarW} height={h} fill="none" stroke="var(--ark-color-border)" rx={8} />
          <rect x={14} y={16} width={52} height={8} rx={3} fill="var(--ark-color-primary-500)" opacity={0.7} />
          <rect x={14} y={36} width={40} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={14} y={48} width={52} height={6} rx={3} fill="var(--ark-color-primary-100)" />
          <rect x={14} y={60} width={44} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={72} width={48} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={92} width={40} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={14} y={104} width={50} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={14} y={116} width={42} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <text x={sidebarW / 2} y={h - 20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>사이드바</text>
        </g>
      )}

      {/* Header — spans full width after left sidebar, sits above right sidebar */}
      {header && (
        <g>
          <rect x={contentLeft} y={0} width={w - contentLeft} height={headerH} fill="var(--ark-color-bg)" />
          <line x1={contentLeft} y1={headerH} x2={w} y2={headerH} stroke="var(--ark-color-border)" />
          <rect x={contentLeft + 16} y={12} width={60} height={8} rx={3} fill="var(--ark-color-gray-400)" />
          <circle cx={w - 20} cy={16} r={6} fill="var(--ark-color-gray-300)" />
          <circle cx={w - 40} cy={16} r={6} fill="var(--ark-color-gray-300)" />
          <text x={(contentLeft + w - contentRight) / 2} y={20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>헤더</text>
        </g>
      )}

      {/* Content area */}
      <g>
        <rect x={contentLeft + 20} y={contentTop + 20} width={120} height={10} rx={4} fill="var(--ark-color-gray-400)" />
        <rect x={contentLeft + 20} y={contentTop + 40} width={200} height={7} rx={3} fill="var(--ark-color-gray-200)" />
        <rect x={contentLeft + 20} y={contentTop + 56} width={w - contentLeft - contentRight - 40} height={50} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
        <rect x={contentLeft + 20} y={contentTop + 116} width={w - contentLeft - contentRight - 40} height={50} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
        <text x={(contentLeft + w - contentRight) / 2} y={(contentTop + h - contentBottom) / 2 + 30} textAnchor="middle" fontSize={10} fill="var(--ark-color-text-disabled)">콘텐츠 영역</text>
      </g>

      {/* Right Sidebar */}
      {rightSidebar && (
        <g>
          <rect x={w - sidebarW} y={contentTop} width={sidebarW} height={h - contentTop - contentBottom} fill="var(--ark-color-bg-subtle)" />
          <line x1={w - sidebarW} y1={contentTop} x2={w - sidebarW} y2={h - contentBottom} stroke="var(--ark-color-border)" />
          <rect x={w - sidebarW + 12} y={contentTop + 16} width={56} height={7} rx={3} fill="var(--ark-color-gray-400)" />
          <rect x={w - sidebarW + 12} y={contentTop + 32} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <rect x={w - sidebarW + 12} y={contentTop + 64} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <text x={w - sidebarW / 2} y={h - contentBottom - 16} textAnchor="middle" fontSize={8} fill="var(--ark-color-text-secondary)" fontWeight={600}>우측 패널</text>
        </g>
      )}

      {/* Footer */}
      {footer && (
        <g>
          <rect x={contentLeft} y={h - footerH} width={w - contentLeft - contentRight} height={footerH} fill="var(--ark-color-bg)" />
          <line x1={contentLeft} y1={h - footerH} x2={w - contentRight} y2={h - footerH} stroke="var(--ark-color-border)" />
          <rect x={contentLeft + 16} y={h - footerH + 10} width={80} height={6} rx={3} fill="var(--ark-color-gray-300)" />
          <text x={(contentLeft + w - contentRight) / 2} y={h - 8} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>푸터</text>
        </g>
      )}

      {/* Border */}
      <rect width={w} height={h} fill="none" stroke="var(--ark-color-border)" rx={8} />
    </svg>
  );
}

/* ── Device configs ── */
/* Image dimensions: macbook 2170×1430, ipad 1145×1480, iphone 467×900 */
/* Screen insets are percentages of the image dimensions */

const deviceConfigs = {
  pc: {
    iframeW: 1280,
    iframeH: 800,
    image: "/devices/macbook.png",
    imageW: 2170,
    imageH: 1430,
    /* Screen area within image (%) — matches actual MacBook screen edges, overflow clips bottom */
    screen: { top: 7.5, left: 6.8, width: 86.4, height: 80.8 },
    screenRadius: 8,
    displayW: 1300,
  },
  tablet: {
    iframeW: 900,
    iframeH: 1200,
    image: "/devices/ipad.png",
    imageW: 1145,
    imageH: 1480,
    screen: { top: 4.4, left: 5.0, width: 90.0, height: 91.2 },
    screenRadius: 6,
    displayW: 560,
  },
  mobile: {
    iframeW: 375,
    iframeH: 812,
    image: "/devices/iphone.png",
    imageW: 467,
    imageH: 900,
    screen: { top: 3.0, left: 5.5, width: 89.0, height: 94.0 },
    screenRadius: 24,
    displayW: 300,
  },
};

const devices = [
  { key: "pc" as const, label: "Desktop", icon: Monitor },
  { key: "tablet" as const, label: "Tablet", icon: Tablet },
  { key: "mobile" as const, label: "Mobile", icon: Smartphone },
];

/* ── Image-based Device Frame ── */

function DeviceFrame({ device }: { device: "pc" | "tablet" | "mobile"; url: string }) {
  return null; // placeholder, actual rendering is inline in DevicePreview
}

function DevicePreview({ url }: { url: string }) {
  const [device, setDevice] = useState<"pc" | "tablet" | "mobile">("pc");
  const cfg = deviceConfigs[device];

  const embedUrl = url + (url.includes("?") ? "&" : "?") + "embed=1";

  /* Calculate display dimensions */
  const displayW = cfg.displayW;

  /* Screen area in display pixels */
  const screenPxW = displayW * cfg.screen.width / 100;

  /* Scale iframe to fit screen area */
  const scale = screenPxW / cfg.iframeW;

  return (
    <div>
      {/* Toolbar — stays within content width */}
      <div style={{
        padding: "12px 24px",
        border: "1px solid var(--ark-color-border)",
        borderRadius: 12,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "var(--ark-color-bg)",
        marginBottom: 24,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          {devices.map((d) => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 14px", fontSize: 13, fontWeight: 500,
                border: "1px solid",
                borderColor: device === d.key ? "var(--ark-color-primary-500)" : "var(--ark-color-border)",
                borderRadius: 8, cursor: "pointer",
                background: device === d.key ? "var(--ark-color-primary-50)" : "var(--ark-color-bg)",
                color: device === d.key ? "var(--ark-color-primary-600)" : "var(--ark-color-text-secondary)",
                transition: "all 150ms ease",
              }}
            >
              <d.icon size={14} />
              {d.label}
            </button>
          ))}
        </div>
        <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>
          {cfg.iframeW} × {cfg.iframeH}
        </span>
      </div>

      {/* Device frame area */}
      <div style={{
        padding: device === "pc" ? "24px 0 32px" : device === "mobile" ? "56px 24px 32px" : "32px 24px",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}>
        <div style={{
          position: "relative",
          width: displayW,
          maxWidth: "100%",
        }}>
          {/* Device mockup image — determines container height via natural aspect ratio */}
          <img
            src={cfg.image}
            alt={`${device} frame`}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              pointerEvents: "none",
              position: "relative",
              zIndex: 2,
            }}
          />
          {/* iframe positioned inside the screen area, overflow clipped */}
          <div style={{
            position: "absolute",
            top: `${cfg.screen.top}%`,
            left: `${cfg.screen.left}%`,
            width: `${cfg.screen.width}%`,
            height: `${cfg.screen.height}%`,
            overflow: "hidden",
            borderRadius: cfg.screenRadius,
            zIndex: 1,
          }}>
            <iframe
              src={embedUrl}
              title={`${device} preview`}
              style={{
                width: cfg.iframeW,
                height: cfg.iframeH,
                border: "none",
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function buildPreviewUrl(selected: Record<string, boolean>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(selected)) {
    params.set(key, value ? "1" : "0");
  }
  return `/preview/app-shell?${params.toString()}`;
}
