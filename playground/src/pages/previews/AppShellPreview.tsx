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
} from "@akron/ui";
import { Bell, Search, User, BarChart3, Users, FileText, CreditCard, Building2 } from "lucide-react";

export function AppShellPreview() {
  const [params] = useSearchParams();
  const showHeader = params.get("header") !== "0";
  const showLeftSidebar = params.get("leftSidebar") !== "0";
  const showRightSidebar = params.get("rightSidebar") === "1";
  const showFooter = params.get("footer") !== "0";
  const sidebarWidth = Number(params.get("sidebarWidth")) || 260;

  const [collapsed, setCollapsed] = useState(false);

  const leftSidebar = showLeftSidebar ? (
    <LayoutSidebar
      header={<div style={{ fontWeight: 700, fontSize: 16 }}>Akron ERP</div>}
      footer={<div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>v0.1.0</div>}
      collapsed={collapsed}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
    >
      <SidebarGroup label="일반">
        <SidebarItem active icon={<BarChart3 size={16} />} tooltip="대시보드">대시보드</SidebarItem>
        <SidebarItem icon={<Bell size={16} />} tooltip="알림">알림</SidebarItem>
      </SidebarGroup>
      <SidebarGroup label="인사">
        <SidebarItem icon={<Users size={16} />} tooltip="사원 관리">사원 관리</SidebarItem>
        <SidebarItem icon={<Building2 size={16} />} tooltip="조직도">조직도</SidebarItem>
      </SidebarGroup>
      <SidebarGroup label="재무">
        <SidebarItem icon={<CreditCard size={16} />} tooltip="급여 관리">급여 관리</SidebarItem>
        <SidebarItem icon={<FileText size={16} />} tooltip="경비 청구">경비 청구</SidebarItem>
      </SidebarGroup>
    </LayoutSidebar>
  ) : undefined;

  return (
    <AppShell
      sidebar={leftSidebar}
      sidebarWidth={sidebarWidth}
      sidebarCollapsed={collapsed}
    >
      {showHeader && (
        <Header
          logo={<span style={{ fontWeight: 700, fontSize: 16 }}>대시보드</span>}
          sticky
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
          <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>대시보드</h1>
          <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32, fontSize: 14 }}>
            오늘의 업무 현황을 한눈에 확인하세요.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
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
            <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 32, marginBottom: 16 }}>공지사항</h3>
            <Stack gap={12}>
              {[
                { title: "시스템 점검 안내", date: "2026.05.15" },
                { title: "하반기 워크숍 일정", date: "2026.05.12" },
                { title: "보안 정책 변경 안내", date: "2026.05.10" },
              ].map((n, i) => (
                <div key={i}>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>{n.title}</div>
                  <div style={{ fontSize: 11, color: "var(--ark-color-text-secondary)", marginTop: 2 }}>{n.date}</div>
                </div>
              ))}
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
}
