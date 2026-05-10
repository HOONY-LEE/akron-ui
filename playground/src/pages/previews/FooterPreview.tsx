import { Footer, Button, Card, PageContainer } from "@akron/ui";

export function FooterPreview() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--ark-color-bg-subtle)" }}>
      <PageContainer size="lg" style={{ padding: "32px 24px", flex: 1 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>푸터 데모</h1>
        <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32, fontSize: 14 }}>
          페이지 하단의 푸터 구성을 확인하세요. 콘텐츠가 적어도 푸터는 항상 하단에 위치합니다.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {[
            { title: "저작권 표시", desc: "회사명과 연도를 좌측에 표시합니다." },
            { title: "링크 영역", desc: "이용약관, 개인정보처리방침 등의 링크를 우측에 배치합니다." },
            { title: "반응형", desc: "화면이 작아지면 세로로 쌓이도록 구성됩니다." },
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

      <Footer>
        <span>© 2026 Akron Corp. All rights reserved.</span>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm">이용약관</Button>
          <Button variant="ghost" size="sm">개인정보처리방침</Button>
          <Button variant="ghost" size="sm">고객센터</Button>
        </div>
      </Footer>
    </div>
  );
}
