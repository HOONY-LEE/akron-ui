import React, { useState } from "react";
import { GridList } from "@sunghoon_lee/akron-ui";
import { Layout, Palette, Zap, Shield, Globe, Clock } from "lucide-react";

const items = [
  { id: "layout", label: "레이아웃", icon: <Layout size={24} />, description: "반응형 그리드" },
  { id: "theme", label: "테마", icon: <Palette size={24} />, description: "커스텀 컬러" },
  { id: "speed", label: "성능", icon: <Zap size={24} />, description: "빠른 로딩" },
  { id: "security", label: "보안", icon: <Shield size={24} />, description: "데이터 암호화" },
  { id: "i18n", label: "국제화", icon: <Globe size={24} />, description: "다국어 지원" },
  { id: "realtime", label: "실시간", icon: <Clock size={24} />, description: "WebSocket" },
];

export const GridListPage: React.FC = () => {
  const [single, setSingle] = useState<string[]>([]);
  const [multi, setMulti] = useState<string[]>(["theme", "speed"]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <section>
        <h2>단일 선택</h2>
        <div style={{ maxWidth: 480 }}>
          <GridList items={items} value={single} onChange={setSingle} columns={3} />
        </div>
        <p style={{ marginTop: 8, color: "var(--akron-muted-text)" }}>선택: {single.join(", ") || "없음"}</p>
      </section>

      <section>
        <h2>다중 선택</h2>
        <div style={{ maxWidth: 480 }}>
          <GridList items={items} value={multi} onChange={setMulti} columns={3} multiple />
        </div>
        <p style={{ marginTop: 8, color: "var(--akron-muted-text)" }}>선택: {multi.join(", ")}</p>
      </section>

      <section>
        <h2>크기</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
          {(["sm", "md", "lg"] as const).map((s) => (
            <div key={s}>
              <h3>{s.toUpperCase()}</h3>
              <GridList
                items={items.slice(0, 3)}
                value={[]}
                onChange={() => {}}
                columns={3}
                size={s}
              />
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>비활성화 항목</h2>
        <div style={{ maxWidth: 480 }}>
          <GridList
            items={items.map((item, i) => ({ ...item, disabled: i === 3 || i === 5 }))}
            value={["layout"]}
            onChange={() => {}}
            columns={3}
          />
        </div>
      </section>
    </div>
  );
};
