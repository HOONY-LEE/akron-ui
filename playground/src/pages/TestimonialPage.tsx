import { Testimonial } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TestimonialPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Testimonial</h1>
        <p className="page-description">
          추천사/후기 카드 컴포넌트. 사용자 리뷰나 추천 인용문을 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="card">
        <h2 className="section-title">카드 변형</h2>
        <LiveCodeBlock
          code={`<Testimonial
  variant="card"
  quote="Akron UI 덕분에 개발 속도가 2배 이상 빨라졌습니다. 디자인 시스템의 일관성도 자연스럽게 유지됩니다."
  authorName="김철수"
  authorTitle="프론트엔드 개발자, A사"
  rating={5}
/>`}
          scope={{ Testimonial }}
        />
      </section>

      <section className="docs-section" id="featured">
        <h2 className="section-title">강조 변형</h2>
        <LiveCodeBlock
          code={`<Testimonial
  variant="featured"
  size="lg"
  quote="팀 전체가 동일한 컴포넌트를 사용하니 디자인 리뷰 시간이 80% 줄었습니다."
  authorName="이영희"
  authorTitle="디자인 리드, B사"
  rating={5}
/>`}
          scope={{ Testimonial }}
        />
      </section>

      <section className="docs-section" id="minimal">
        <h2 className="section-title">미니멀 변형</h2>
        <LiveCodeBlock
          code={`<Testimonial
  variant="minimal"
  quote="간결하면서도 커스터마이징이 쉬워서 프로젝트에 바로 적용했습니다."
  authorName="박민수"
  authorTitle="CTO, C사"
/>`}
          scope={{ Testimonial }}
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
              <tr><td>quote</td><td>string</td><td>필수</td><td>추천사 본문</td></tr>
              <tr><td>authorName</td><td>string</td><td>필수</td><td>작성자 이름</td></tr>
              <tr><td>authorTitle</td><td>string</td><td>-</td><td>작성자 직책</td></tr>
              <tr><td>authorImage</td><td>string</td><td>-</td><td>프로필 이미지 URL</td></tr>
              <tr><td>rating</td><td>number</td><td>-</td><td>별점 (0-5)</td></tr>
              <tr><td>variant</td><td>'card' | 'minimal' | 'featured'</td><td>'card'</td><td>변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
