import { AspectRatio } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AspectRatioPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">AspectRatio</h1>
        <p className="page-description">
          비율 유지 컨테이너. 이미지, 비디오, 임베드 등 미디어 요소의 가로세로 비율을 일정하게 유지합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ maxWidth: 400 }}>
  <AspectRatio ratio="video" style={{ borderRadius: 12, overflow: "hidden" }}>
    <div style={{
      width: "100%", height: "100%",
      background: "linear-gradient(135deg, var(--ark-color-primary) 0%, var(--ark-color-success) 100%)",
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontSize: 18, fontWeight: 600,
    }}>
      16 / 9
    </div>
  </AspectRatio>
</div>`}
          scope={{ AspectRatio }}
        />
      </section>

      <section className="docs-section" id="presets">
        <h2 className="section-title">프리셋 비율</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
  {[
    { ratio: "square", label: "square (1:1)" },
    { ratio: "video", label: "video (16:9)" },
    { ratio: "portrait", label: "portrait (3:4)" },
  ].map(({ ratio, label }) => (
    <AspectRatio key={ratio} ratio={ratio} style={{ borderRadius: 8, overflow: "hidden" }}>
      <div style={{
        width: "100%", height: "100%",
        background: "var(--ark-color-surface-hover)",
        border: "1px solid var(--ark-color-border)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, color: "var(--ark-color-text-secondary)",
        textAlign: "center", padding: 8,
      }}>
        {label}
      </div>
    </AspectRatio>
  ))}
</div>`}
          scope={{ AspectRatio }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 비율</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 500 }}>
  <AspectRatio ratio={4/3} style={{ borderRadius: 8, overflow: "hidden" }}>
    <div style={{
      width: "100%", height: "100%",
      background: "var(--ark-color-surface-hover)",
      border: "1px solid var(--ark-color-border)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, color: "var(--ark-color-text-secondary)",
    }}>
      4 / 3
    </div>
  </AspectRatio>
  <AspectRatio ratio={1/2} style={{ borderRadius: 8, overflow: "hidden" }}>
    <div style={{
      width: "100%", height: "100%",
      background: "var(--ark-color-surface-hover)",
      border: "1px solid var(--ark-color-border)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 13, color: "var(--ark-color-text-secondary)",
    }}>
      1 / 2
    </div>
  </AspectRatio>
</div>`}
          scope={{ AspectRatio }}
        />
      </section>

      <section className="docs-section" id="with-image">
        <h2 className="section-title">이미지와 함께</h2>
        <LiveCodeBlock
          code={`<div style={{ maxWidth: 360 }}>
  <AspectRatio ratio="video" style={{ borderRadius: 12, overflow: "hidden" }}>
    <img
      src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=80"
      alt="산 풍경"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  </AspectRatio>
</div>`}
          scope={{ AspectRatio }}
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
              <tr><td>ratio</td><td>number | 'square' | 'video' | 'portrait' | 'wide' | 'ultrawide'</td><td>1</td><td>가로:세로 비율</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>컨테이너 내 콘텐츠</td></tr>
            </tbody>
          </table>
        </div>
        <div className="props-table-wrapper" style={{ marginTop: 16 }}>
          <table className="props-table">
            <thead>
              <tr><th>프리셋</th><th>비율</th><th>용도</th></tr>
            </thead>
            <tbody>
              <tr><td>square</td><td>1:1</td><td>프로필 이미지, 아이콘</td></tr>
              <tr><td>video</td><td>16:9</td><td>영상, YouTube 임베드</td></tr>
              <tr><td>portrait</td><td>3:4</td><td>세로형 이미지</td></tr>
              <tr><td>wide</td><td>21:9</td><td>시네마스코프 배너</td></tr>
              <tr><td>ultrawide</td><td>32:9</td><td>울트라와이드 배너</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
