import { TagCloud } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TagCloudPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TagCloud</h1>
        <p className="page-description">
          태그 클라우드 컴포넌트. 가중치 기반으로 태그 크기를 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<TagCloud
  tags={[
    { label: "React", weight: 95 },
    { label: "TypeScript", weight: 80 },
    { label: "JavaScript", weight: 75 },
    { label: "CSS", weight: 60 },
    { label: "Node.js", weight: 55 },
    { label: "Next.js", weight: 50 },
    { label: "GraphQL", weight: 35 },
    { label: "Docker", weight: 30 },
    { label: "AWS", weight: 28 },
    { label: "Python", weight: 25 },
    { label: "Vite", weight: 40 },
    { label: "Tailwind", weight: 45 },
    { label: "Redux", weight: 20 },
    { label: "PostgreSQL", weight: 22 },
    { label: "Git", weight: 70 },
  ]}
  onClick={(tag) => alert(tag.label + ": " + tag.weight)}
/>`}
          scope={{ TagCloud }}
        />
      </section>

      <section className="docs-section" id="sorted">
        <h2 className="section-title">정렬</h2>
        <LiveCodeBlock
          code={`<TagCloud
  sortBy="weight"
  minFontSize={14}
  maxFontSize={42}
  tags={[
    { label: "기획", weight: 12 },
    { label: "디자인", weight: 8 },
    { label: "개발", weight: 25 },
    { label: "테스트", weight: 15 },
    { label: "배포", weight: 5 },
    { label: "유지보수", weight: 18 },
    { label: "코드 리뷰", weight: 20 },
  ]}
/>`}
          scope={{ TagCloud }}
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
              <tr><td>tags</td><td>TagCloudItem[]</td><td>필수</td><td>태그 목록</td></tr>
              <tr><td>minFontSize</td><td>number</td><td>12</td><td>최소 폰트 크기 (px)</td></tr>
              <tr><td>maxFontSize</td><td>number</td><td>36</td><td>최대 폰트 크기 (px)</td></tr>
              <tr><td>onClick</td><td>(tag) =&gt; void</td><td>-</td><td>태그 클릭 핸들러</td></tr>
              <tr><td>gap</td><td>number</td><td>8</td><td>태그 간 간격</td></tr>
              <tr><td>sortBy</td><td>'alphabetical' | 'weight' | 'random' | 'none'</td><td>'none'</td><td>정렬 기준</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
