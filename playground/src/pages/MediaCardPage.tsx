import { MediaCard, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Clock, Eye, Heart, ArrowRight } from "lucide-react";

export function MediaCardPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">MediaCard</h1>
        <p className="page-description">
          미디어 카드. 이미지와 텍스트를 결합한 카드 컴포넌트로 블로그, 뉴스, 제품 목록 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 600 }}>
  <MediaCard
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)" }} />
    }
    meta="2024. 01. 15"
    title="React 18의 새로운 기능 소개"
    description="Concurrent Mode, Suspense, 그리고 새로운 훅들에 대해 알아봅니다."
  />
  <MediaCard
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #06b6d4 0%, #0ea5e9 100%)" }} />
    }
    meta="2024. 01. 20"
    title="TypeScript 5.0 업데이트"
    description="성능 향상과 새로운 타입 시스템 기능을 살펴봅니다."
  />
</div>`}
          scope={{ MediaCard, Badge, Clock, Eye, Heart, ArrowRight }}
        />
      </section>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 레이아웃</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 500 }}>
  <MediaCard
    orientation="horizontal"
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)" }} />
    }
    meta="뉴스"
    title="UI 컴포넌트 라이브러리 트렌드"
    description="2024년 주목받는 React UI 라이브러리들을 비교합니다."
  />
  <MediaCard
    orientation="horizontal"
    size="sm"
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" }} />
    }
    title="성능 최적화 가이드"
    description="React 앱의 렌더링 성능을 개선하는 방법"
  />
</div>`}
          scope={{ MediaCard, Badge, Clock, Eye, Heart, ArrowRight }}
        />
      </section>

      <section className="docs-section" id="with-badge">
        <h2 className="section-title">배지 + 푸터</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 600 }}>
  <MediaCard
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)" }} />
    }
    badge={<Badge variant="solid" color="error" size="sm">NEW</Badge>}
    meta={<span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} /> 5분 읽기</span>}
    title="CSS Grid 완벽 가이드"
    description="현대 웹 레이아웃의 핵심, CSS Grid를 처음부터 배웁니다."
    footer={
      <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "var(--ark-color-text-tertiary)" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye size={12} />1.2K</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Heart size={12} />234</span>
      </div>
    }
  />
  <MediaCard
    media={
      <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)" }} />
    }
    badge={<Badge variant="soft" color="primary" size="sm">인기</Badge>}
    title="Node.js 백엔드 입문"
    description="Express, MongoDB와 함께 REST API를 구축합니다."
    hoverable
    onClick={() => alert("카드 클릭!")}
    footer={
      <span style={{ fontSize: 12, color: "var(--ark-color-primary)", display: "flex", alignItems: "center", gap: 4 }}>
        더 보기 <ArrowRight size={12} />
      </span>
    }
  />
</div>`}
          scope={{ MediaCard, Badge, Clock, Eye, Heart, ArrowRight }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
  {["sm", "md", "lg"].map((size) => (
    <MediaCard
      key={size}
      style={{ width: 180 }}
      size={size}
      media={<div style={{ width: "100%", height: "100%", background: "var(--ark-color-surface-hover)", border: "1px dashed var(--ark-color-border)" }} />}
      meta="메타 정보"
      title={\`\${size.toUpperCase()} 크기 카드\`}
      description="크기 예시"
    />
  ))}
</div>`}
          scope={{ MediaCard }}
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
              <tr><td>media</td><td>ReactNode</td><td>필수</td><td>미디어 요소 (이미지, 영상 등)</td></tr>
              <tr><td>title</td><td>ReactNode</td><td>필수</td><td>카드 제목</td></tr>
              <tr><td>description</td><td>ReactNode</td><td>-</td><td>설명 (최대 3줄 clamp)</td></tr>
              <tr><td>badge</td><td>ReactNode</td><td>-</td><td>미디어 위 오버레이 배지</td></tr>
              <tr><td>meta</td><td>ReactNode</td><td>-</td><td>제목 위 메타 정보</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>-</td><td>하단 액션 영역</td></tr>
              <tr><td>orientation</td><td>'vertical' | 'horizontal'</td><td>'vertical'</td><td>레이아웃 방향</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>카드 크기</td></tr>
              <tr><td>hoverable</td><td>boolean</td><td>false</td><td>hover 시 elevation 효과</td></tr>
              <tr><td>mediaRatio</td><td>'video' | 'square' | 'portrait' | number</td><td>'video'</td><td>미디어 비율 (vertical 전용)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
