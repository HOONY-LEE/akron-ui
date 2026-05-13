import { StickyNote } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function StickyNotePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">StickyNote</h1>
        <p className="page-description">
          스티키 노트 카드 컴포넌트. 메모, 알림, 주석을 시각적으로 강조할 때 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
  <StickyNote color="yellow">할 일: 디자인 리뷰 완료하기</StickyNote>
  <StickyNote color="pink">아이디어: 다크모드 개선안</StickyNote>
  <StickyNote color="blue">참고: API 문서 링크 확인</StickyNote>
  <StickyNote color="green">완료: 테스트 케이스 작성 ✓</StickyNote>
  <StickyNote color="purple">버그: 모바일 레이아웃 수정 필요</StickyNote>
  <StickyNote color="orange">중요: 배포 전 최종 확인</StickyNote>
</div>`}
          scope={{ StickyNote }}
        />
      </section>

      <section className="docs-section" id="with-title">
        <h2 className="section-title">제목 포함</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
  <StickyNote color="yellow" title="할 일">
    <ul style={{ margin: 0, paddingLeft: 16 }}>
      <li>컴포넌트 문서 작성</li>
      <li>스토리북 업데이트</li>
      <li>PR 리뷰 요청</li>
    </ul>
  </StickyNote>
  <StickyNote color="blue" title="참고 링크">
    <p style={{ margin: 0 }}>디자인 가이드라인: figma.com/...</p>
    <p style={{ margin: "4px 0 0" }}>GitHub Issues: github.com/...</p>
  </StickyNote>
</div>`}
          scope={{ StickyNote }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
  <StickyNote color="yellow" size="sm">작은 메모</StickyNote>
  <StickyNote color="pink" size="md">중간 메모입니다.</StickyNote>
  <StickyNote color="blue" size="lg">큰 메모 영역입니다. 더 많은 내용을 작성할 수 있습니다.</StickyNote>
</div>`}
          scope={{ StickyNote }}
        />
      </section>

      <section className="docs-section" id="rotated">
        <h2 className="section-title">기울임 효과</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 24, padding: 20, alignItems: "flex-start" }}>
  <StickyNote color="yellow" rotate={-3}>살짝 왼쪽으로 기울어진 메모</StickyNote>
  <StickyNote color="pink" rotate={0}>정면 메모</StickyNote>
  <StickyNote color="green" rotate={2}>살짝 오른쪽으로 기울어진 메모</StickyNote>
</div>`}
          scope={{ StickyNote }}
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
              <tr><td>color</td><td>'yellow' | 'pink' | 'blue' | 'green' | 'purple' | 'orange'</td><td>'yellow'</td><td>색상</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>제목</td></tr>
              <tr><td>foldedCorner</td><td>boolean</td><td>true</td><td>접힌 모서리 효과</td></tr>
              <tr><td>rotate</td><td>number</td><td>0</td><td>기울임 각도 (도)</td></tr>
              <tr><td>shadow</td><td>boolean</td><td>true</td><td>그림자 표시</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>메모 내용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
