import { Marquee } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const LOGOS = [
  "React", "TypeScript", "Vite", "Node.js", "Next.js",
  "Tailwind", "GraphQL", "Docker", "AWS", "Figma",
];

const REVIEWS = [
  { author: "김민준", text: "정말 편리한 컴포넌트 라이브러리입니다!" },
  { author: "이서연", text: "디자인이 세련되고 사용하기 쉬워요." },
  { author: "박지호", text: "타입스크립트 지원이 완벽합니다." },
  { author: "최유나", text: "커스터마이징이 자유롭네요." },
];

export function MarqueePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Marquee</h1>
        <p className="page-description">
          무한 스크롤 배너 컴포넌트. 로고 슬라이더, 뉴스 티커, 공지 배너 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Marquee>
  {["React", "TypeScript", "Vite", "Node.js", "Next.js", "Tailwind", "GraphQL", "Docker", "AWS", "Figma"].map((name) => (
    <span
      key={name}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "6px 16px",
        borderRadius: 999,
        background: "var(--ark-color-surface-hover)",
        border: "1px solid var(--ark-color-border)",
        fontSize: 13,
        fontWeight: 500,
        whiteSpace: "nowrap",
      }}
    >
      {name}
    </span>
  ))}
</Marquee>`}
          scope={{ Marquee }}
        />
      </section>

      <section className="docs-section" id="direction">
        <h2 className="section-title">방향</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>← 왼쪽 (기본)</p>
    <Marquee direction="left" speed={30}>
      {["React", "TypeScript", "Vite", "Node.js", "Next.js"].map((name) => (
        <span key={name} style={{ padding: "4px 12px", borderRadius: 4, background: "var(--ark-color-primary)", color: "var(--ark-color-primary-foreground)", fontSize: 12, fontWeight: 500 }}>{name}</span>
      ))}
    </Marquee>
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>→ 오른쪽</p>
    <Marquee direction="right" speed={30}>
      {["Tailwind", "GraphQL", "Docker", "AWS", "Figma"].map((name) => (
        <span key={name} style={{ padding: "4px 12px", borderRadius: 4, background: "var(--ark-color-surface-hover)", border: "1px solid var(--ark-color-border)", fontSize: 12, fontWeight: 500 }}>{name}</span>
      ))}
    </Marquee>
  </div>
</div>`}
          scope={{ Marquee }}
        />
      </section>

      <section className="docs-section" id="reviews">
        <h2 className="section-title">리뷰 슬라이더</h2>
        <LiveCodeBlock
          code={`<Marquee speed={25} gap={20}>
  {[
    { author: "김민준", text: "정말 편리한 컴포넌트 라이브러리입니다!" },
    { author: "이서연", text: "디자인이 세련되고 사용하기 쉬워요." },
    { author: "박지호", text: "타입스크립트 지원이 완벽합니다." },
    { author: "최유나", text: "커스터마이징이 자유롭네요." },
  ].map(({ author, text }) => (
    <div
      key={author}
      style={{
        width: 220,
        padding: 16,
        borderRadius: 12,
        border: "1px solid var(--ark-color-border)",
        background: "var(--ark-color-surface)",
        flexShrink: 0,
      }}
    >
      <p style={{ margin: "0 0 8px", fontSize: 13, lineHeight: 1.5 }}>"{text}"</p>
      <p style={{ margin: 0, fontSize: 12, color: "var(--ark-color-text-secondary)", fontWeight: 500 }}>— {author}</p>
    </div>
  ))}
</Marquee>`}
          scope={{ Marquee }}
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
              <tr><td>speed</td><td>number</td><td>40</td><td>스크롤 속도 (px/s)</td></tr>
              <tr><td>direction</td><td>'left' | 'right'</td><td>'left'</td><td>스크롤 방향</td></tr>
              <tr><td>pauseOnHover</td><td>boolean</td><td>true</td><td>hover 시 일시정지</td></tr>
              <tr><td>gap</td><td>number</td><td>16</td><td>항목 간 간격 (px)</td></tr>
              <tr><td>repeat</td><td>number</td><td>4</td><td>콘텐츠 반복 횟수</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
