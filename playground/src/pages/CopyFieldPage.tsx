import React from "react";
import { CopyField } from "@sunghoon_lee/akron-ui";

export const CopyFieldPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>기본 사용</h2>
      <div style={{ maxWidth: 400 }}>
        <CopyField value="npm install @sunghoon_lee/akron-ui" />
      </div>
    </section>

    <section>
      <h2>라벨 포함</h2>
      <div style={{ maxWidth: 480 }}>
        <CopyField label="API 엔드포인트" value="https://api.example.com/v1/users" />
      </div>
    </section>

    <section>
      <h2>크기</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 400 }}>
        {(["sm", "md", "lg"] as const).map((s) => (
          <CopyField key={s} value={`${s} size field`} size={s} label={s.toUpperCase()} />
        ))}
      </div>
    </section>

    <section>
      <h2>다양한 값</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 520 }}>
        <CopyField label="초대 링크" value="https://app.example.com/invite/abc123def456" />
        <CopyField label="API 키" value="sk_live_1234567890abcdef" />
        <CopyField label="색상 코드" value="#3b82f6" />
      </div>
    </section>
  </div>
);
