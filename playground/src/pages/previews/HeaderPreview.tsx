import { Header, Button, Card, PageContainer } from "@akron/ui";
import { Bell, Search, User, Menu } from "lucide-react";

export function HeaderPreview() {
  return (
    <div style={{ minHeight: "200vh", background: "var(--ark-color-bg-subtle)" }}>
      <Header
        logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Akron ERP</span>}
        sticky
        nav={
          <div style={{ display: "flex", gap: 4 }}>
            {["대시보드", "인사관리", "재무", "설정"].map((item) => (
              <Button key={item} variant="ghost" size="sm">{item}</Button>
            ))}
          </div>
        }
        actions={
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <Button variant="ghost" size="sm"><Search size={16} /></Button>
            <Button variant="ghost" size="sm"><Bell size={16} /></Button>
            <Button variant="ghost" size="sm"><User size={16} /></Button>
          </div>
        }
      />

      <PageContainer size="lg" style={{ padding: "32px 24px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>
          고정 헤더 데모
        </h1>
        <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32, fontSize: 14 }}>
          아래로 스크롤하면 헤더가 상단에 고정되는 것을 확인할 수 있습니다.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Array.from({ length: 12 }, (_, i) => (
            <Card key={i}>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 8 }}>
                  섹션 {i + 1}
                </h3>
                <p style={{ fontSize: 14, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                  스크롤하여 헤더의 sticky 동작을 확인해 보세요.
                  Header 컴포넌트는 sticky prop이 활성화되면 스크롤 시에도 항상 화면 상단에 고정됩니다.
                </p>
              </div>
            </Card>
          ))}
        </div>
      </PageContainer>
    </div>
  );
}
