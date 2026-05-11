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
            <span style={{ fontSize: 11, color: "var(--ark-color-text-disabled)", fontVariantNumeric: "tabular-nums" }}>
              {device === "pc" ? "1920 × 1080" : device === "tablet" ? "1024 × 1366" : "390 × 844"}
            </span>
          </div>

          {/* Mini wireframe preview — fixed height container */}
          <div style={{ padding: 24, display: "flex", justifyContent: "center", alignItems: "center", minHeight: 420 }}>
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
/*
 * PC:     좌측 사이드바 패널 + 우측 사이드바 패널 + 헤더 + 푸터
 * Tablet: 사이드바 → 헤더 햄버거 메뉴 (좌=왼쪽, 우=오른쪽) + 푸터
 * Mobile: 좌측 사이드바 → 하단 탭 바 (푸터 대체), 우측 사이드바 → 헤더 좌측 햄버거
 */

function LayoutWireframe({
  header, leftSidebar, rightSidebar, footer, device,
}: {
  header: boolean; leftSidebar: boolean; rightSidebar: boolean; footer: boolean; device: DeviceType;
}) {
  const dims = device === "mobile"
    ? { w: 220, h: 400, headerH: 32, footerH: 24, tabBarH: 44, radius: 20, padTop: 14, padBot: 10 }
    : device === "tablet"
    ? { w: 320, h: 400, headerH: 32, footerH: 26, tabBarH: 0, radius: 14, padTop: 10, padBot: 8 }
    : { w: 640, h: 380, headerH: 36, footerH: 30, tabBarH: 0, radius: 8, padTop: 0, padBot: 0 };

  const { w, h, headerH, footerH, tabBarH, radius, padTop, padBot } = dims;

  /* PC only: sidebar panels */
  const leftW = leftSidebar && device === "pc" ? 110 : 0;
  const rightW = rightSidebar && device === "pc" ? 100 : 0;

  const contentTop = padTop + (header ? headerH : 0);
  /* Mobile: 하단 탭 바가 푸터를 대체 */
  const hasTabBar = device === "mobile" && leftSidebar;
  const showFooter = device === "mobile" ? (footer && !hasTabBar) : footer;
  const contentBottom = padBot + (hasTabBar ? tabBarH : (showFooter ? footerH : 0));

  const contentW = w - leftW - rightW;

  /* Hamburger icon helper (3 lines) */
  const Hamburger = ({ x, y }: { x: number; y: number }) => (
    <>
      <rect x={x} y={y} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
      <rect x={x} y={y + 4} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
      <rect x={x} y={y + 8} width={14} height={2} rx={1} fill="var(--ark-color-gray-500)" />
    </>
  );

  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      style={{ borderRadius: radius, border: "1px solid var(--ark-color-border)", transition: "width 0.3s ease, height 0.3s ease" }}
    >
      {/* Background */}
      <rect width={w} height={h} fill="var(--ark-color-bg-subtle)" rx={radius} />

      {/* Device bezels — notch / camera / home indicator */}
      {device === "mobile" && (
        <>
          <rect x={w / 2 - 20} y={4} width={40} height={6} rx={3} fill="var(--ark-color-gray-400)" opacity={0.3} />
          <rect x={w / 2 - 24} y={h - 6} width={48} height={3} rx={1.5} fill="var(--ark-color-gray-400)" opacity={0.25} />
        </>
      )}
      {device === "tablet" && (
        <>
          <circle cx={w / 2} cy={5} r={2.5} fill="var(--ark-color-gray-400)" opacity={0.3} />
          <rect x={w / 2 - 20} y={h - 5} width={40} height={3} rx={1.5} fill="var(--ark-color-gray-400)" opacity={0.25} />
        </>
      )}

      {/* ── PC: Left Sidebar panel ── */}
      {leftSidebar && device === "pc" && (
        <g>
          <rect x={0} y={0} width={leftW} height={h} fill="var(--ark-color-bg)" rx={radius} />
          <rect x={0} y={0} width={leftW} height={h} fill="none" stroke="var(--ark-color-border)" rx={radius} />
          <rect x={16} y={18} width={leftW - 32} height={8} rx={3} fill="var(--ark-color-primary-500)" opacity={0.7} />
          <rect x={16} y={40} width={leftW * 0.5} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={16} y={52} width={leftW - 32} height={6} rx={3} fill="var(--ark-color-primary-100)" />
          <rect x={16} y={64} width={leftW * 0.6} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={16} y={76} width={leftW * 0.7} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={16} y={96} width={leftW * 0.5} height={5} rx={2} fill="var(--ark-color-gray-300)" />
          <rect x={16} y={108} width={leftW - 32} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <rect x={16} y={120} width={leftW * 0.55} height={6} rx={3} fill="var(--ark-color-gray-200)" />
          <text x={leftW / 2} y={h - 20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>사이드바</text>
        </g>
      )}

      {/* ── PC: Right Sidebar panel ── */}
      {rightSidebar && device === "pc" && (
        <g>
          <rect x={w - rightW} y={contentTop} width={rightW} height={h - contentTop - (showFooter ? footerH : 0)} fill="var(--ark-color-bg-subtle)" />
          <line x1={w - rightW} y1={contentTop} x2={w - rightW} y2={h - (showFooter ? footerH : 0)} stroke="var(--ark-color-border)" />
          <rect x={w - rightW + 12} y={contentTop + 16} width={56} height={7} rx={3} fill="var(--ark-color-gray-400)" />
          <rect x={w - rightW + 12} y={contentTop + 32} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <rect x={w - rightW + 12} y={contentTop + 64} width={56} height={24} rx={4} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
          <text x={w - rightW / 2} y={h - (showFooter ? footerH : 0) - 16} textAnchor="middle" fontSize={8} fill="var(--ark-color-text-secondary)" fontWeight={600}>우측 패널</text>
        </g>
      )}

      {/* ── Header ── */}
      {header && (
        <g>
          <rect x={leftW} y={padTop} width={w - leftW} height={headerH} fill="var(--ark-color-bg)" />
          <line x1={leftW} y1={padTop + headerH} x2={w} y2={padTop + headerH} stroke="var(--ark-color-border)" />

          {/* Tablet: leftSidebar → 좌측 햄버거 */}
          {device === "tablet" && leftSidebar && <Hamburger x={leftW + 10} y={padTop + 11} />}
          {/* Mobile: rightSidebar → 좌측 햄버거 */}
          {device === "mobile" && rightSidebar && <Hamburger x={leftW + 10} y={padTop + 11} />}

          {/* Logo / title placeholder */}
          {(() => {
            const hasLeftHamburger = (device === "tablet" && leftSidebar) || (device === "mobile" && rightSidebar);
            const logoX = leftW + (hasLeftHamburger ? 30 : 12);
            return <rect x={logoX} y={padTop + 12} width={Math.min(60, w - leftW - 40)} height={8} rx={3} fill="var(--ark-color-gray-400)" />;
          })()}

          {/* Tablet: rightSidebar → 우측 햄버거 */}
          {device === "tablet" && rightSidebar && <Hamburger x={w - 24} y={padTop + 11} />}

          {/* PC: action icons on right */}
          {device === "pc" && (
            <>
              <circle cx={w - rightW - 20} cy={padTop + 16} r={6} fill="var(--ark-color-gray-300)" />
              <circle cx={w - rightW - 40} cy={padTop + 16} r={6} fill="var(--ark-color-gray-300)" />
            </>
          )}

          <text x={(leftW + w - rightW) / 2} y={padTop + 20} textAnchor="middle" fontSize={9} fill="var(--ark-color-text-secondary)" fontWeight={600}>헤더</text>
        </g>
      )}

      {/* ── Content area ── */}
      <g>
        <rect x={leftW + 16} y={contentTop + 16} width={Math.min(120, contentW - 32)} height={10} rx={4} fill="var(--ark-color-gray-400)" />
        <rect x={leftW + 16} y={contentTop + 34} width={Math.min(200, contentW - 32)} height={7} rx={3} fill="var(--ark-color-gray-200)" />
        {(() => {
          const cardH = Math.min(50, (h - contentTop - contentBottom) / 4);
          return (
            <>
              <rect x={leftW + 16} y={contentTop + 50} width={contentW - 32} height={cardH} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
              <rect x={leftW + 16} y={contentTop + 50 + cardH + 10} width={contentW - 32} height={cardH} rx={6} fill="var(--ark-color-bg)" stroke="var(--ark-color-border)" />
            </>
          );
        })()}
        <text
          x={(leftW + w - rightW) / 2}
          y={(contentTop + h - contentBottom) / 2 + 30}
          textAnchor="middle"
          fontSize={device === "mobile" ? 9 : 10}
          fill="var(--ark-color-text-disabled)"
        >
          콘텐츠 영역
        </text>
      </g>

      {/* ── Footer (PC / Tablet, Mobile only if no tab bar) ── */}
      {showFooter && (
        <g>
          <rect x={leftW} y={h - padBot - footerH} width={w - leftW - rightW} height={footerH} fill="var(--ark-color-bg)" />
          <line x1={leftW} y1={h - padBot - footerH} x2={w - rightW} y2={h - padBot - footerH} stroke="var(--ark-color-border)" />
          <rect x={leftW + 12} y={h - padBot - footerH + Math.floor(footerH / 2) - 3} width={Math.min(80, contentW - 24)} height={6} rx={3} fill="var(--ark-color-gray-300)" />
          <text x={(leftW + w - rightW) / 2} y={h - padBot - 6} textAnchor="middle" fontSize={device === "mobile" ? 8 : 9} fill="var(--ark-color-text-secondary)" fontWeight={600}>푸터</text>
        </g>
      )}

      {/* ── Mobile: Bottom Tab Bar (좌측 사이드바 → 하단 탭 전환) ── */}
      {hasTabBar && (
        <g>
          <rect x={0} y={h - padBot - tabBarH} width={w} height={tabBarH} fill="var(--ark-color-bg)" rx={0} />
          <line x1={0} y1={h - padBot - tabBarH} x2={w} y2={h - padBot - tabBarH} stroke="var(--ark-color-border)" />
          {/* 5 tab icons evenly spaced */}
          {[0, 1, 2, 3, 4].map((i) => {
            const tabX = (w / 5) * i + (w / 5) / 2;
            const tabY = h - padBot - tabBarH + 12;
            const isActive = i === 0;
            return (
              <g key={i}>
                <rect x={tabX - 8} y={tabY} width={16} height={16} rx={4}
                  fill={isActive ? "var(--ark-color-primary-100)" : "var(--ark-color-gray-200)"} />
                <rect x={tabX - 6} y={tabY + 20} width={12} height={4} rx={2}
                  fill={isActive ? "var(--ark-color-primary-500)" : "var(--ark-color-gray-300)"} opacity={isActive ? 0.7 : 1} />
              </g>
            );
          })}
          <text x={w / 2} y={h - padBot - 3} textAnchor="middle" fontSize={7} fill="var(--ark-color-text-disabled)" fontWeight={600}>탭 바</text>
        </g>
      )}

      {/* Border */}
      <rect width={w} height={h} fill="none" stroke="var(--ark-color-border)" rx={radius} />
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
