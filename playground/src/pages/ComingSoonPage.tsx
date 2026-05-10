import { Construction } from "lucide-react";

interface ComingSoonPageProps {
  name: string;
  description: string;
}

export function ComingSoonPage({ name, description }: ComingSoonPageProps) {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">{name}</h1>
        <p className="page-description">{description}</p>
      </header>

      <section className="docs-section">
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          border: "2px dashed var(--ark-color-border)",
          borderRadius: 16,
          background: "var(--ark-color-bg-subtle)",
          textAlign: "center",
          gap: 16,
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: 16,
            background: "var(--ark-color-primary-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
            <Construction size={32} style={{ color: "var(--ark-color-primary-500)" }} />
          </div>
          <h2 style={{
            fontSize: 20,
            fontWeight: 700,
            color: "var(--ark-color-text)",
            margin: 0,
          }}>
            개발 예정
          </h2>
          <p style={{
            fontSize: 14,
            color: "var(--ark-color-text-secondary)",
            maxWidth: 400,
            lineHeight: 1.6,
            margin: 0,
          }}>
            <strong>{name}</strong> 컴포넌트는 현재 설계 및 개발이 진행될 예정입니다.
            완성되면 이 페이지에서 사용법, 인터페이스, 데모를 확인할 수 있습니다.
          </p>
          <span style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "6px 14px",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--ark-color-warning-700)",
            backgroundColor: "var(--ark-color-warning-50)",
            borderRadius: 20,
            marginTop: 8,
          }}>
            Planned
          </span>
        </div>
      </section>
    </>
  );
}

export function createComingSoonPage(name: string, description: string) {
  return function ComingSoon() {
    return <ComingSoonPage name={name} description={description} />;
  };
}
