import React, { useState } from "react";
import { QRCode } from "@sunghoon_lee/akron-ui";

export const QRCodePage: React.FC = () => {
  const [text, setText] = useState("https://example.com");

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h2>기본 사용</h2>
        <QRCode data="https://example.com" label="example.com" />
      </section>

      <section>
        <h2>인터랙티브</h2>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start" }}>
          <QRCode data={text} size={160} label={text} />
          <div style={{ flex: 1, maxWidth: 320 }}>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="텍스트 입력..."
              style={{
                width: "100%",
                padding: "8px 12px",
                border: "1px solid var(--akron-border)",
                borderRadius: "var(--akron-radius-md)",
                fontSize: 14,
              }}
            />
          </div>
        </div>
      </section>

      <section>
        <h2>크기 비교</h2>
        <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
          <QRCode data="small" size={80} label="80px" />
          <QRCode data="medium" size={128} label="128px" />
          <QRCode data="large" size={200} label="200px" />
        </div>
      </section>

      <section>
        <h2>커스텀 색상</h2>
        <div style={{ display: "flex", gap: 24 }}>
          <QRCode data="https://example.com" fgColor="#2563eb" bgColor="#eff6ff" label="블루" />
          <QRCode data="https://example.com" fgColor="#059669" bgColor="#ecfdf5" label="그린" />
          <QRCode data="https://example.com" fgColor="#dc2626" bgColor="#fef2f2" label="레드" />
        </div>
      </section>
    </div>
  );
};
