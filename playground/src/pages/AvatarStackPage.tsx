import React from "react";
import { AvatarStack } from "@sunghoon_lee/akron-ui";

const users = [
  { name: "김민수", color: "#e74c3c" },
  { name: "이지은", color: "#3498db" },
  { name: "박서준", color: "#2ecc71" },
  { name: "최유나", color: "#9b59b6" },
  { name: "정호석", color: "#f39c12" },
  { name: "한소희", color: "#1abc9c" },
  { name: "윤서연", color: "#e67e22" },
  { name: "강다니엘", color: "#34495e" },
];

export const AvatarStackPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>기본 사용</h2>
      <AvatarStack items={users} max={5} onOverflowClick={() => alert("나머지 보기")} />
    </section>

    <section>
      <h2>크기</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {(["sm", "md", "lg", "xl"] as const).map((s) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 24, fontWeight: 600 }}>{s}</span>
            <AvatarStack items={users.slice(0, 4)} size={s} />
          </div>
        ))}
      </div>
    </section>

    <section>
      <h2>최대 표시 수</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <AvatarStack items={users} max={3} />
        <AvatarStack items={users} max={5} />
        <AvatarStack items={users} max={8} />
      </div>
    </section>

    <section>
      <h2>이미지 아바타</h2>
      <AvatarStack
        items={[
          { name: "User 1", src: "https://i.pravatar.cc/150?img=1" },
          { name: "User 2", src: "https://i.pravatar.cc/150?img=2" },
          { name: "User 3", src: "https://i.pravatar.cc/150?img=3" },
          { name: "User 4", src: "https://i.pravatar.cc/150?img=4" },
        ]}
        size="lg"
      />
    </section>
  </div>
);
