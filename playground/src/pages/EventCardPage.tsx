import React from "react";
import { EventCard } from "@sunghoon_lee/akron-ui";

export const EventCardPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>기본 사용</h2>
      <div style={{ maxWidth: 480 }}>
        <EventCard
          title="팀 스프린트 회의"
          date={new Date(2026, 4, 20)}
          time="14:00 - 15:30"
          location="회의실 A"
          description="2분기 스프린트 계획 논의 및 백로그 정리"
        />
      </div>
    </section>

    <section>
      <h2>색상 변경</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
        <EventCard title="디자인 리뷰" date={new Date(2026, 4, 22)} time="10:00" location="Zoom" color="var(--akron-success)" />
        <EventCard title="배포 일정" date={new Date(2026, 4, 25)} time="18:00" color="var(--akron-error)" />
        <EventCard title="워크숍" date={new Date(2026, 5, 1)} time="09:00 - 17:00" location="본사" color="var(--akron-warning)" />
      </div>
    </section>

    <section>
      <h2>크기</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }}>
        {(["sm", "md", "lg"] as const).map((s) => (
          <EventCard key={s} title={`${s.toUpperCase()} 사이즈`} date={new Date(2026, 4, 15)} time="10:00" size={s} />
        ))}
      </div>
    </section>
  </div>
);
