import React, { useState } from "react";
import { ThemeToggle } from "@sunghoon_lee/akron-ui";

export const ThemeTogglePage: React.FC = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h2>기본 사용</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <ThemeToggle theme={theme} onChange={setTheme} />
          <span>현재: {theme}</span>
        </div>
      </section>

      <section>
        <h2>크기</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <ThemeToggle theme={theme} onChange={setTheme} size={s} />
              <span style={{ fontSize: 12 }}>{s}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Pill 변형</h2>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <ThemeToggle theme={theme} onChange={setTheme} variant="pill" size="sm" />
          <ThemeToggle theme={theme} onChange={setTheme} variant="pill" size="md" />
          <ThemeToggle theme={theme} onChange={setTheme} variant="pill" size="lg" />
        </div>
      </section>

      <section>
        <h2>다크 모드 미리보기</h2>
        <div style={{ display: "flex", gap: 24 }}>
          <ThemeToggle theme="light" onChange={() => {}} />
          <ThemeToggle theme="dark" onChange={() => {}} />
        </div>
      </section>
    </div>
  );
};
