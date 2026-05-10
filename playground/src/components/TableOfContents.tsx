const tocData: Record<string, { label: string; id: string; indent?: boolean }[]> = {
  overview: [
    { label: "특징", id: "features" },
    { label: "설치", id: "install" },
    { label: "빠른 시작", id: "quickstart" },
    { label: "다크모드", id: "darkmode" },
    { label: "구성", id: "structure" },
  ],
  colors: [
    { label: "Primary", id: "primary" },
    { label: "Gray", id: "gray" },
    { label: "Semantic", id: "semantic" },
    { label: "Surface & Text", id: "surface" },
    { label: "사용법", id: "usage" },
  ],
  typography: [
    { label: "폰트 패밀리", id: "font-family" },
    { label: "크기", id: "font-size" },
    { label: "굵기", id: "font-weight" },
    { label: "행간", id: "line-height" },
    { label: "사용법", id: "usage" },
  ],
  spacing: [
    { label: "스케일", id: "scale" },
    { label: "토큰 레퍼런스", id: "tokens" },
    { label: "Border Radius", id: "radius" },
    { label: "Shadows", id: "shadow" },
    { label: "사용법", id: "usage" },
  ],
  button: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes", indent: true },
    { label: "로딩 & 비활성", id: "states", indent: true },
    { label: "스타일", id: "variants" },
    { label: "인터페이스", id: "interface" },
  ],
  input: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes", indent: true },
    { label: "상태", id: "states" },
    { label: "라벨 & 도움말", id: "labels" },
    { label: "인터페이스", id: "interface" },
  ],
  card: [
    { label: "사용법", id: "usage" },
    { label: "클릭 가능", id: "clickable" },
    { label: "인터페이스", id: "interface" },
  ],
  table: [
    { label: "사용법", id: "usage" },
    { label: "숫자 정렬", id: "numeric" },
    { label: "인터페이스", id: "interface" },
  ],
  modal: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  toast: [
    { label: "사용법", id: "usage" },
    { label: "타입", id: "types" },
    { label: "인터페이스", id: "interface" },
  ],
  "app-shell": [
    { label: "레이아웃 빌더", id: "builder" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-header": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "고정 헤더", id: "sticky" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-sidebar": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-footer": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "page-container": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  stack: [
    { label: "사용법", id: "usage" },
    { label: "정렬", id: "alignment" },
    { label: "인터페이스", id: "interface" },
  ],
};

export function TableOfContents({ currentPage }: { currentPage: string }) {
  const items = tocData[currentPage] ?? [];

  return (
    <aside className="toc">
      <div className="toc-header">On This Page</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`toc-link ${item.indent ? "indent" : ""}`}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        .toc {
          position: fixed;
          top: 40px;
          right: 32px;
          width: var(--docs-toc-width);
          padding: 0;
          display: none;
        }
        @media (min-width: 1280px) {
          .toc { display: block; }
        }
        .toc-header {
          font-size: 12px;
          font-weight: 700;
          color: var(--docs-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }
        .toc-list {
          list-style: none;
        }
        .toc-link {
          display: block;
          font-size: 13px;
          color: var(--docs-text-tertiary);
          text-decoration: none;
          padding: 4px 0;
          transition: color 0.12s ease;
          line-height: 1.5;
        }
        .toc-link:hover {
          color: var(--docs-text);
        }
        .toc-link.indent {
          padding-left: 12px;
        }
      `}</style>
    </aside>
  );
}
