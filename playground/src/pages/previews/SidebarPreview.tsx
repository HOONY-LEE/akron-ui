import { useState } from "react";
import {
  AppShell,
  LayoutSidebar,
  SidebarGroup,
  SidebarItem,
  Card,
  PageContainer,
} from "@akron/ui";
import {
  BarChart3, Bell, Users, Building2,
  CreditCard, FileText, Calendar, Settings,
  HelpCircle, LogOut,
} from "lucide-react";

export function SidebarPreview() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <AppShell
      sidebarWidth={260}
      sidebarCollapsed={collapsed}
      sidebar={
        <LayoutSidebar
          header={
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: "var(--ark-color-primary-500)", color: "#fff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontWeight: 700, fontSize: 13,
              }}>A</div>
              <span style={{ fontWeight: 700, fontSize: 16 }}>Akron ERP</span>
            </div>
          }
          footer={
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>v0.1.0</span>
              <div style={{ display: "flex", gap: 4 }}>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ark-color-text-secondary)", padding: 4 }}>
                  <HelpCircle size={14} />
                </button>
                <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--ark-color-text-secondary)", padding: 4 }}>
                  <LogOut size={14} />
                </button>
              </div>
            </div>
          }
          collapsed={collapsed}
          onCollapse={() => setCollapsed(true)}
          onExpand={() => setCollapsed(false)}
        >
          <SidebarGroup label="일반">
            <SidebarItem active icon={<BarChart3 size={16} />} tooltip="대시보드">대시보드</SidebarItem>
            <SidebarItem icon={<Bell size={16} />} tooltip="알림">알림</SidebarItem>
            <SidebarItem icon={<Calendar size={16} />} tooltip="일정">일정</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="인사">
            <SidebarItem icon={<Users size={16} />} tooltip="사원 관리">사원 관리</SidebarItem>
            <SidebarItem icon={<Building2 size={16} />} tooltip="조직도">조직도</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="재무">
            <SidebarItem icon={<CreditCard size={16} />} tooltip="급여 관리">급여 관리</SidebarItem>
            <SidebarItem icon={<FileText size={16} />} tooltip="경비 청구">경비 청구</SidebarItem>
          </SidebarGroup>
          <SidebarGroup label="시스템">
            <SidebarItem icon={<Settings size={16} />} tooltip="설정">설정</SidebarItem>
          </SidebarGroup>
        </LayoutSidebar>
      }
    >
      <PageContainer size="lg" style={{ padding: 32 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>사이드바 데모</h1>
        <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32, fontSize: 14 }}>
          좌측 사이드바의 접기/펼치기 기능과 구성을 확인하세요.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {[
            { title: "접기/펼치기", desc: "사이드바 헤더의 « 버튼으로 접고, 좌측 상단의 » 버튼으로 다시 펼칠 수 있습니다." },
            { title: "SidebarGroup", desc: "label prop으로 메뉴를 그룹별로 분류합니다." },
            { title: "SidebarItem", desc: "active prop으로 현재 선택된 메뉴를 표시합니다." },
            { title: "Header / Footer 슬롯", desc: "로고, 버전 정보 등을 고정 영역에 배치합니다." },
          ].map((item) => (
            <Card key={item.title}>
              <div style={{ padding: 20 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.5 }}>{item.desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </AppShell>
  );
}
