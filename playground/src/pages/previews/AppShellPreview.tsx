import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  AppShell,
  Header,
  LayoutSidebar,
  SidebarGroup,
  SidebarItem,
  Footer,
  PageContainer,
  Button,
  Card,
  Stack,
} from "@sunghoon_lee/akron-ui";
import {
  Bell, Search, User, BarChart3, Users, FileText, CreditCard, Building2, Menu,
  Monitor, Tablet, Smartphone,
} from "lucide-react";

type Page = "dashboard" | "notifications" | "employees" | "org" | "payroll" | "expense";

const pageLabels: Record<Page, string> = {
  dashboard: "대시보드",
  notifications: "알림",
  employees: "사원 관리",
  org: "조직도",
  payroll: "급여 관리",
  expense: "경비 청구",
};

const devices = [
  { key: "pc", label: "PC", icon: Monitor, width: "100%" },
  { key: "tablet", label: "Tablet", icon: Tablet, width: "900px" },
  { key: "mobile", label: "Mobile", icon: Smartphone, width: "375px" },
] as const;

export function AppShellPreview() {
  const [params] = useSearchParams();
  const showHeader = params.get("header") !== "0";
  const showLeftSidebar = params.get("leftSidebar") !== "0";
  const showRightSidebar = params.get("rightSidebar") === "1";
  const showFooter = params.get("footer") !== "0";
  const sidebarWidth = Number(params.get("sidebarWidth")) || 160;
  const isEmbed = params.get("embed") === "1";

  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [device, setDevice] = useState("pc");

  const navigateTo = (page: Page) => {
    setActivePage(page);
    setSidebarOpen(false);
  };

  const currentDevice = devices.find((d) => d.key === device)!;

  const embedUrl = (() => {
    const p = new URLSearchParams(params);
    p.set("embed", "1");
    return `/preview/app-shell?${p.toString()}`;
  })();

  const leftSidebar = showLeftSidebar ? (
    <LayoutSidebar
      header={<div style={{ fontWeight: 700, fontSize: 16 }}>Akron ERP</div>}
      footer={<div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>v0.1.0</div>}
      collapsed={collapsed}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
    >
      <SidebarGroup label="일반">
        <SidebarItem active={activePage === "dashboard"} icon={<BarChart3 size={16} />} tooltip="대시보드" onClick={() => navigateTo("dashboard")}>대시보드</SidebarItem>
        <SidebarItem active={activePage === "notifications"} icon={<Bell size={16} />} tooltip="알림" onClick={() => navigateTo("notifications")}>알림</SidebarItem>
      </SidebarGroup>
      <SidebarGroup label="인사">
        <SidebarItem active={activePage === "employees"} icon={<Users size={16} />} tooltip="사원 관리" onClick={() => navigateTo("employees")}>사원 관리</SidebarItem>
        <SidebarItem active={activePage === "org"} icon={<Building2 size={16} />} tooltip="조직도" onClick={() => navigateTo("org")}>조직도</SidebarItem>
      </SidebarGroup>
      <SidebarGroup label="재무">
        <SidebarItem active={activePage === "payroll"} icon={<CreditCard size={16} />} tooltip="급여 관리" onClick={() => navigateTo("payroll")}>급여 관리</SidebarItem>
        <SidebarItem active={activePage === "expense"} icon={<FileText size={16} />} tooltip="경비 청구" onClick={() => navigateTo("expense")}>경비 청구</SidebarItem>
      </SidebarGroup>
    </LayoutSidebar>
  ) : undefined;

  const appContent = (
    <AppShell
      sidebar={leftSidebar}
      sidebarWidth={sidebarWidth}
      sidebarCollapsed={collapsed}
      sidebarOpen={sidebarOpen}
      onSidebarClose={() => setSidebarOpen(false)}
    >
      {showHeader && (
        <Header
          logo={<span style={{ fontWeight: 700, fontSize: 16 }}>{pageLabels[activePage]}</span>}
          sticky
          menuButton={
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="메뉴 열기"
              style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--ark-color-border)", borderRadius: 8,
                background: "var(--ark-color-bg)", color: "var(--ark-color-text-secondary)",
                cursor: "pointer",
              }}
            >
              <Menu size={18} />
            </button>
          }
          actions={
            <Stack direction="horizontal" gap={4}>
              <Button variant="ghost" size="sm"><Search size={16} /></Button>
              <Button variant="ghost" size="sm"><Bell size={16} /></Button>
              <Button variant="ghost" size="sm"><User size={16} /></Button>
            </Stack>
          }
        />
      )}

      <div style={{ display: "flex", flex: 1 }}>
        <PageContainer size="lg" style={{ padding: 32, flex: 1 }}>
          <PageContent page={activePage} />
        </PageContainer>

        {showRightSidebar && (
          <aside style={{
            width: 280, flexShrink: 0, borderLeft: "1px solid var(--ark-color-border)",
            padding: 24, background: "var(--ark-color-bg-subtle)",
          }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>빠른 실행</h3>
            <Stack gap={8}>
              <Button variant="outline" size="sm" style={{ width: "100%", justifyContent: "flex-start" }}>
                <Users size={14} style={{ marginRight: 8 }} /> 사원 등록
              </Button>
              <Button variant="outline" size="sm" style={{ width: "100%", justifyContent: "flex-start" }}>
                <FileText size={14} style={{ marginRight: 8 }} /> 경비 청구
              </Button>
            </Stack>
          </aside>
        )}
      </div>

      {showFooter && (
        <Footer>
          <span>© 2026 Akron Corp. All rights reserved.</span>
          <Stack direction="horizontal" gap={8}>
            <Button variant="ghost" size="sm">이용약관</Button>
            <Button variant="ghost" size="sm">개인정보처리방침</Button>
          </Stack>
        </Footer>
      )}
    </AppShell>
  );

  if (isEmbed) return appContent;

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Device toolbar */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px",
        borderBottom: "1px solid var(--ark-color-border)",
        background: "var(--ark-color-bg-subtle)",
        flexShrink: 0,
        zIndex: 9999,
      }}>
        <div style={{ display: "flex", gap: 4 }}>
          {devices.map((d) => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              style={{
                display: "flex", alignItems: "center", gap: 5,
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
        <span style={{ fontSize: 11, color: "var(--ark-color-text-secondary)" }}>
          {currentDevice.width === "100%" ? "Full width" : currentDevice.width}
        </span>
      </div>

      {/* Preview area */}
      <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        background: device === "pc" ? "transparent" : "var(--ark-color-bg-muted)",
        overflow: "hidden",
      }}>
        {device === "pc" ? (
          <div style={{ width: "100%", height: "100%", overflow: "hidden" }}>
            {appContent}
          </div>
        ) : (
          <div style={{
            width: currentDevice.width,
            maxWidth: "100%",
            height: "100%",
            transition: "width 300ms ease",
            overflow: "hidden",
            borderLeft: "1px solid var(--ark-color-border)",
            borderRight: "1px solid var(--ark-color-border)",
          }}>
            <iframe
              src={embedUrl}
              title={`${currentDevice.label} preview`}
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function PageContent({ page }: { page: Page }) {
  switch (page) {
    case "dashboard":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>대시보드</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32, fontSize: 14 }}>
            오늘의 업무 현황을 한눈에 확인하세요.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 32 }}>
            {[
              { label: "전체 사원", value: "1,247명", color: "var(--ark-color-primary-500)" },
              { label: "금일 출근", value: "1,182명", color: "var(--ark-color-success-500)" },
              { label: "미승인 결재", value: "23건", color: "var(--ark-color-warning-500)" },
              { label: "신규 알림", value: "8건", color: "var(--ark-color-info-500)" },
            ].map((stat) => (
              <Card key={stat.label}>
                <div style={{ padding: 20 }}>
                  <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>{stat.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                </div>
              </Card>
            ))}
          </div>
          <Card>
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>최근 활동</h2>
              {[
                { text: "김철수님이 휴가 신청을 제출했습니다.", time: "5분 전" },
                { text: "2025년 5월 급여 정산이 완료되었습니다.", time: "1시간 전" },
                { text: "신규 사원 이영희님이 등록되었습니다.", time: "3시간 전" },
                { text: "경비 청구 #1024가 승인되었습니다.", time: "어제" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "12px 0", borderBottom: i < 3 ? "1px solid var(--ark-color-border)" : "none",
                }}>
                  <span style={{ fontSize: 14 }}>{item.text}</span>
                  <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", whiteSpace: "nowrap", marginLeft: 16 }}>{item.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      );
    case "notifications":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>알림</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 24, fontSize: 14 }}>최근 알림 목록입니다.</p>
          <Stack gap={12}>
            {[
              { title: "휴가 신청 승인", desc: "김철수님의 연차 신청이 승인되었습니다.", time: "10분 전", color: "var(--ark-color-success-500)" },
              { title: "결재 요청", desc: "박영수님이 출장비 결재를 요청했습니다.", time: "30분 전", color: "var(--ark-color-warning-500)" },
              { title: "시스템 점검 예정", desc: "5/15(목) 02:00~06:00 시스템 점검 예정", time: "2시간 전", color: "var(--ark-color-info-500)" },
              { title: "급여 명세서 발행", desc: "5월 급여 명세서가 발행되었습니다.", time: "어제", color: "var(--ark-color-primary-500)" },
            ].map((n, i) => (
              <Card key={i}>
                <div style={{ padding: 20, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: n.color, marginTop: 6, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{n.title}</div>
                    <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>{n.desc}</div>
                  </div>
                  <span style={{ fontSize: 11, color: "var(--ark-color-text-disabled)", whiteSpace: "nowrap" }}>{n.time}</span>
                </div>
              </Card>
            ))}
          </Stack>
        </>
      );
    case "employees":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>사원 관리</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 24, fontSize: 14 }}>전체 사원 목록을 관리합니다.</p>
          <Card>
            <div style={{ padding: 20 }}>
              {["홍길동 — 개발팀 시니어", "김영희 — 디자인팀 리드", "이철수 — 기획팀 매니저", "박지민 — 인사팀 사원"].map((row, i, arr) => (
                <div key={i} style={{ padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid var(--ark-color-border)" : "none", fontSize: 14 }}>{row}</div>
              ))}
            </div>
          </Card>
        </>
      );
    case "org":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>조직도</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 24, fontSize: 14 }}>회사 조직 구조를 확인합니다.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {["경영지원본부", "개발본부", "디자인팀", "인사팀", "재무팀", "마케팅팀"].map((dept) => (
              <Card key={dept}><div style={{ padding: 20, textAlign: "center", fontWeight: 600, fontSize: 14 }}>{dept}</div></Card>
            ))}
          </div>
        </>
      );
    case "payroll":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>급여 관리</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 24, fontSize: 14 }}>급여 정산 현황을 확인합니다.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24 }}>
            <Card><div style={{ padding: 20 }}><div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>총 급여액</div><div style={{ fontSize: 28, fontWeight: 700 }}>₩6.2억</div></div></Card>
            <Card><div style={{ padding: 20 }}><div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>정산 완료</div><div style={{ fontSize: 28, fontWeight: 700, color: "var(--ark-color-success-500)" }}>1,182명</div></div></Card>
            <Card><div style={{ padding: 20 }}><div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 8 }}>미정산</div><div style={{ fontSize: 28, fontWeight: 700, color: "var(--ark-color-warning-500)" }}>65명</div></div></Card>
          </div>
        </>
      );
    case "expense":
      return (
        <>
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>경비 청구</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 24, fontSize: 14 }}>경비 청구 내역을 확인합니다.</p>
          <Stack gap={12}>
            {[
              { title: "출장비 — 부산 출장", amount: "₩350,000", status: "승인", statusColor: "var(--ark-color-success-500)" },
              { title: "교육비 — AWS 세미나", amount: "₩150,000", status: "대기", statusColor: "var(--ark-color-warning-500)" },
              { title: "접대비 — 거래처 미팅", amount: "₩280,000", status: "반려", statusColor: "var(--ark-color-error-500)" },
            ].map((item, i) => (
              <Card key={i}>
                <div style={{ padding: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>{item.amount}</div>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: item.statusColor }}>{item.status}</span>
                </div>
              </Card>
            ))}
          </Stack>
        </>
      );
  }
}
