import { MasonryGrid } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function MasonryGridPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MasonryGrid</h1>
        <p className="page-description">
          메이슨리 그리드 레이아웃. CSS columns를 활용한 Pinterest 스타일 격자 배치입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          fullWidth
          code={`<MasonryGrid columns={2} gap={16}>
  {[
    { h: 260, label: "Travel", icon: "✈️" },
    { h: 180, label: "Coffee", icon: "☕" },
    { h: 320, label: "Architecture", icon: "🏛️" },
    { h: 200, label: "Nature", icon: "🌿" },
    { h: 240, label: "Books", icon: "📚" },
    { h: 160, label: "Music", icon: "🎵" },
    { h: 280, label: "Art", icon: "🎨" },
    { h: 220, label: "Food", icon: "🍜" },
  ].map(({ h, label, icon }, i) => (
    <div
      key={i}
      style={{
        height: h,
        borderRadius: 12,
        background: [
          "#f3f4f6", "#e5e7eb", "#f0f0f0", "#eaeaea",
          "#f5f5f5", "#ebebeb", "#e8e8e8", "#f2f2f2",
        ][i],
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
      }}
    >
      <span style={{ fontSize: 32 }}>{icon}</span>
      <span style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>{label}</span>
    </div>
  ))}
</MasonryGrid>`}
          scope={{ MasonryGrid }}
        />
      </section>

      <section className="docs-section" id="pinterest">
        <h2 className="section-title">Pinterest 스타일</h2>
        <p className="section-desc">
          다양한 높이의 카드로 구성된 핀터레스트 스타일 레이아웃입니다. 이미지 영역과 캡션이 있는 카드 형태입니다.
        </p>
        <LiveCodeBlock
          fullWidth
          code={`<MasonryGrid columns={3} gap={16}>
  {[
    { imgH: 200, title: "Minimal Workspace", desc: "깔끔한 데스크 셋업", bg: "#f3f4f6" },
    { imgH: 280, title: "Morning Light", desc: "자연광이 들어오는 공간", bg: "#e9eaec" },
    { imgH: 160, title: "Ceramic Mug", desc: "핸드메이드 도자기 컵", bg: "#edeef0" },
    { imgH: 240, title: "Plant Corner", desc: "초록 식물로 채운 코너", bg: "#eff0f2" },
    { imgH: 180, title: "Book Stack", desc: "이번 달 읽을 책 목록", bg: "#e5e7eb" },
    { imgH: 300, title: "Sunset View", desc: "옥상에서 본 노을 풍경", bg: "#f0f0f0" },
    { imgH: 200, title: "Linen Fabric", desc: "내추럴 린넨 소재", bg: "#eaeaea" },
    { imgH: 260, title: "Sketch Notes", desc: "아이디어 스케치 모음", bg: "#f5f5f5" },
    { imgH: 140, title: "Flat White", desc: "오늘의 커피 한 잔", bg: "#ebebeb" },
  ].map(({ imgH, title, desc, bg }, i) => (
    <div
      key={i}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "var(--ark-color-bg)",
        border: "1px solid var(--ark-color-border)",
      }}
    >
      <div
        style={{
          height: imgH,
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#c0c4cc" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div style={{ padding: "12px 14px" }}>
        <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: "var(--ark-color-text)" }}>{title}</p>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--ark-color-text-secondary)", lineHeight: 1.5 }}>{desc}</p>
      </div>
    </div>
  ))}
</MasonryGrid>`}
          scope={{ MasonryGrid }}
        />
      </section>

      <section className="docs-section" id="columns">
        <h2 className="section-title">열 수</h2>
        <p className="section-desc">
          <code className="inline-code">columns</code> 속성으로 열 수를 조절합니다.
        </p>
        <LiveCodeBlock
          fullWidth
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
  {[2, 3, 4].map((cols) => (
    <div key={cols}>
      <p style={{ fontSize: 12, fontWeight: 600, color: "var(--ark-color-text-secondary)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {cols} columns
      </p>
      <MasonryGrid columns={cols} gap={12}>
        {[140, 200, 160, 120, 180, 140].map((h, i) => (
          <div
            key={i}
            style={{
              height: h,
              borderRadius: 10,
              background: ["#f3f4f6", "#eaeaea", "#f0f0f0", "#e5e7eb", "#f5f5f5", "#ebebeb"][i],
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              fontWeight: 500,
              color: "#9ca3af",
            }}
          >
            {h}px
          </div>
        ))}
      </MasonryGrid>
    </div>
  ))}
</div>`}
          scope={{ MasonryGrid }}
        />
      </section>

      <section className="docs-section" id="cards">
        <h2 className="section-title">카드 그리드</h2>
        <p className="section-desc">
          카드 형태의 콘텐츠를 메이슨리 레이아웃으로 배치한 예시입니다.
        </p>
        <LiveCodeBlock
          fullWidth
          code={`<MasonryGrid columns={2} gap={16}>
  {[
    { title: "디자인 시스템", desc: "일관된 UI를 만드는 핵심 도구입니다. 색상, 타이포그래피, 간격 등 기본 요소를 체계적으로 관리합니다." },
    { title: "컴포넌트", desc: "재사용 가능한 UI 블록입니다." },
    { title: "접근성", desc: "모든 사용자가 동등하게 접근할 수 있는 인터페이스를 만드세요. WAI-ARIA 가이드라인을 준수합니다." },
    { title: "반응형", desc: "모바일부터 데스크탑까지 유연하게 대응합니다. 브레이크포인트 기반의 반응형 토큰을 제공합니다." },
    { title: "다크 모드", desc: "라이트/다크 테마를 지원합니다." },
    { title: "CSS 변수", desc: "디자인 토큰으로 일관된 스타일링을 구현합니다. 프로젝트 전반에 걸쳐 통일된 시각 언어를 유지할 수 있습니다." },
  ].map(({ title, desc }, i) => (
    <div
      key={i}
      style={{
        padding: "18px 20px",
        borderRadius: 12,
        border: "1px solid var(--ark-color-border)",
        background: "var(--ark-color-bg)",
      }}
    >
      <h4 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>{title}</h4>
      <p style={{ margin: 0, fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.7 }}>{desc}</p>
    </div>
  ))}
</MasonryGrid>`}
          scope={{ MasonryGrid }}
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
              <tr><td>columns</td><td>number | {'{ sm?, md?, lg?, xl? }'}</td><td>3</td><td>열 수 (반응형 객체 가능)</td></tr>
              <tr><td>gap</td><td>number | string</td><td>16</td><td>열 간격</td></tr>
              <tr><td>rowGap</td><td>number | string</td><td>-</td><td>행 간격 (없으면 gap과 동일)</td></tr>
            </tbody>
          </table>
        </div>
        <p style={{ marginTop: 12, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          반응형 예시: <code className="inline-code">{'columns={{ sm: 1, md: 2, lg: 3, xl: 4 }}'}</code>
        </p>
      </section>
    </>
  );
}
