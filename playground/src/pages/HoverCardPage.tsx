import { HoverCard, Avatar, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { MapPin, Link, Calendar } from "lucide-react";

export function HoverCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">HoverCard</h1>
        <p className="page-description">
          hover 카드 컴포넌트. 트리거에 마우스를 올리면 풍부한 미리보기 카드를 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24 }}>
  <HoverCard
    trigger={
      <span style={{ color: "var(--ark-color-primary)", textDecoration: "underline", cursor: "pointer", fontSize: 14 }}>
        @sunghoon_lee
      </span>
    }
  >
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
        <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--ark-color-primary)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>S</div>
        <div>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Sunghoon Lee</div>
          <div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>@sunghoon_lee</div>
        </div>
      </div>
      <p style={{ margin: "0 0 12px", fontSize: 13, lineHeight: 1.6, color: "var(--ark-color-text-secondary)" }}>
        Frontend developer. Building UI component libraries.
      </p>
      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>
        <span>팔로워 1.2K</span>
        <span>팔로잉 234</span>
      </div>
    </div>
  </HoverCard>
</div>`}
          scope={{ HoverCard }}
        />
      </section>

      <section className="docs-section" id="placement">
        <h2 className="section-title">위치</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", padding: 40 }}>
  {["top", "bottom", "left", "right"].map((placement) => (
    <HoverCard
      key={placement}
      placement={placement}
      trigger={
        <button style={{
          padding: "8px 16px",
          borderRadius: 6,
          border: "1px solid var(--ark-color-border)",
          background: "var(--ark-color-surface)",
          cursor: "pointer",
          fontSize: 13,
          color: "var(--ark-color-text-primary)",
        }}>
          {placement}
        </button>
      }
    >
      <div style={{ padding: 12 }}>
        <p style={{ margin: 0, fontSize: 13 }}>{placement} 위치의 HoverCard입니다.</p>
      </div>
    </HoverCard>
  ))}
</div>`}
          scope={{ HoverCard }}
        />
      </section>

      <section className="docs-section" id="link-preview">
        <h2 className="section-title">링크 미리보기</h2>
        <LiveCodeBlock
          code={`<p style={{ fontSize: 14, lineHeight: 2 }}>
  <HoverCard
    placement="bottom-start"
    trigger={
      <span style={{ color: "var(--ark-color-primary)", textDecoration: "underline", cursor: "pointer" }}>
        Akron UI 문서
      </span>
    }
    width={300}
  >
    <div>
      <div style={{ height: 100, background: "linear-gradient(135deg, var(--ark-color-primary) 0%, var(--ark-color-success) 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#fff", fontWeight: 700, fontSize: 20 }}>Akron UI</span>
      </div>
      <div style={{ padding: 12 }}>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>Akron UI</div>
        <p style={{ margin: "0 0 8px", fontSize: 12, color: "var(--ark-color-text-secondary)", lineHeight: 1.5 }}>
          React 기반 디자인 시스템 컴포넌트 라이브러리
        </p>
        <span style={{ fontSize: 11, color: "var(--ark-color-text-tertiary)" }}>akron-ui.dev</span>
      </div>
    </div>
  </HoverCard>
  를 방문하면 다양한 컴포넌트를 확인할 수 있습니다.
</p>`}
          scope={{ HoverCard, MapPin, Link, Calendar }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>trigger</td><td>ReactNode</td><td>필수</td><td>hover 트리거 요소</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>카드 콘텐츠</td></tr>
              <tr><td>placement</td><td>'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'right'</td><td>'bottom'</td><td>카드 위치</td></tr>
              <tr><td>openDelay</td><td>number</td><td>200</td><td>열기 지연 (ms)</td></tr>
              <tr><td>closeDelay</td><td>number</td><td>100</td><td>닫기 지연 (ms)</td></tr>
              <tr><td>width</td><td>number | string</td><td>280</td><td>카드 너비</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
