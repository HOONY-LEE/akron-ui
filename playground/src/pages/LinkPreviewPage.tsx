import React from "react";
import { LinkPreview } from "@sunghoon_lee/akron-ui";

export const LinkPreviewPage: React.FC = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
    <section>
      <h2>Horizontal (기본)</h2>
      <div style={{ maxWidth: 520 }}>
        <LinkPreview
          url="https://example.com/article"
          title="Akron UI 컴포넌트 라이브러리"
          description="React 기반의 모던 UI 컴포넌트 라이브러리입니다. CSS 토큰과 접근성을 지원합니다."
          siteName="Example"
          imageUrl="https://picsum.photos/400/300"
          faviconUrl="https://www.google.com/favicon.ico"
        />
      </div>
    </section>

    <section>
      <h2>Vertical 레이아웃</h2>
      <div style={{ maxWidth: 320 }}>
        <LinkPreview
          url="https://example.com/blog"
          title="다크모드 지원 가이드"
          description="CSS 변수를 활용한 다크모드 구현 방법을 알아봅니다."
          layout="vertical"
          imageUrl="https://picsum.photos/600/300"
        />
      </div>
    </section>

    <section>
      <h2>크기 비교</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 520 }}>
        {(["sm", "md", "lg"] as const).map((s) => (
          <LinkPreview
            key={s}
            url="https://example.com"
            title={`${s.toUpperCase()} 사이즈 프리뷰`}
            description="크기별 프리뷰 비교 예시입니다."
            size={s}
          />
        ))}
      </div>
    </section>

    <section>
      <h2>이미지 없음</h2>
      <div style={{ maxWidth: 400 }}>
        <LinkPreview
          url="https://example.com/text-only"
          title="텍스트 전용 링크 프리뷰"
          description="이미지가 없는 링크에서도 깔끔하게 보입니다."
          siteName="Text Site"
        />
      </div>
    </section>
  </div>
);
