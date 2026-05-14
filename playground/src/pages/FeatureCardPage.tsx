import React from "react";
import { FeatureCard } from "@sunghoon_lee/akron-ui";
import { Zap, Shield, Palette, Layers, Globe, Clock } from "lucide-react";

export const FeatureCardPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>기본 사용</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 800 }}>
        <FeatureCard icon={<Zap size={24} />} title="빠른 속도" description="최적화된 번들 사이즈로 빠른 로딩 속도를 제공합니다." />
        <FeatureCard icon={<Shield size={24} />} title="타입 안전" description="TypeScript로 작성되어 안전한 개발 경험을 보장합니다." iconBg="var(--akron-success-light)" iconColor="var(--akron-success)" />
        <FeatureCard icon={<Palette size={24} />} title="테마 지원" description="CSS 변수 기반 토큰으로 손쉽게 커스터마이징 가능합니다." iconBg="var(--akron-warning-light)" iconColor="var(--akron-warning)" />
      </div>
    </section>

    <section>
      <h2>크기</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 320 }}>
        {(["sm", "md", "lg"] as const).map((s) => (
          <FeatureCard key={s} icon={<Layers size={s === "sm" ? 16 : s === "lg" ? 28 : 20} />} title={`${s.toUpperCase()} 사이즈`} description="크기별 비교 예시" size={s} />
        ))}
      </div>
    </section>

    <section>
      <h2>Horizontal 레이아웃</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }}>
        <FeatureCard icon={<Globe size={24} />} title="글로벌 지원" description="다국어 및 RTL 레이아웃을 지원합니다." layout="horizontal" />
        <FeatureCard icon={<Clock size={24} />} title="실시간 업데이트" description="WebSocket 기반 실시간 데이터 동기화를 지원합니다." layout="horizontal" iconBg="var(--akron-error-light)" iconColor="var(--akron-error)" />
      </div>
    </section>
  </div>
);
