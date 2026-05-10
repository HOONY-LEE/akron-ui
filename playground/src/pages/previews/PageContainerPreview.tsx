import { PageContainer, Card } from "@akron/ui";

const sizes = [
  { size: "sm" as const, max: "640px" },
  { size: "md" as const, max: "960px" },
  { size: "lg" as const, max: "1200px" },
  { size: "xl" as const, max: "1440px" },
  { size: "full" as const, max: "100%" },
];

export function PageContainerPreview() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--ark-color-bg-subtle)", padding: "32px 0" }}>
      <PageContainer size="lg" style={{ marginBottom: 32, padding: "0 24px" }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>PageContainer 데모</h1>
        <p style={{ color: "var(--ark-color-text-secondary)", fontSize: 14 }}>
          각 size별 최대 너비를 시각적으로 비교할 수 있습니다. 브라우저 너비를 변경하며 확인해 보세요.
        </p>
      </PageContainer>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {sizes.map(({ size, max }) => (
          <PageContainer key={size} size={size}>
            <Card>
              <div style={{ padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <span style={{
                      fontSize: 13, fontWeight: 700,
                      color: "var(--ark-color-primary-500)",
                      fontFamily: "monospace",
                    }}>
                      size="{size}"
                    </span>
                    <span style={{
                      fontSize: 13, color: "var(--ark-color-text-secondary)",
                      marginLeft: 12,
                    }}>
                      max-width: {max}
                    </span>
                  </div>
                  <div style={{
                    fontSize: 12, color: "var(--ark-color-text-secondary)",
                    padding: "4px 10px",
                    background: "var(--ark-color-bg-subtle)",
                    borderRadius: 6,
                  }}>
                    {max}
                  </div>
                </div>
              </div>
            </Card>
          </PageContainer>
        ))}
      </div>
    </div>
  );
}
