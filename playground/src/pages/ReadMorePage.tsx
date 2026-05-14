import { ReadMore } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ReadMorePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ReadMore</h1>
        <p className="page-description">
          접기/펼치기 컴포넌트. 긴 텍스트를 접어서 표시하고 펼칠 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ReadMore maxHeight={80}>
  <p style={{ margin: 0 }}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.
  </p>
</ReadMore>`}
          scope={{ ReadMore }}
        />
      </section>

      <section className="docs-section" id="max-lines">
        <h2 className="section-title">최대 줄 수</h2>
        <LiveCodeBlock
          code={`<ReadMore maxLines={3}>
  <p style={{ margin: 0 }}>
    이것은 줄 수 기반으로 텍스트를 제한하는 예제입니다. 최대 3줄까지 표시하고 나머지는 접힙니다.
    여러 줄에 걸쳐 내용을 작성하면 3줄 이후는 "더보기" 버튼으로 펼칠 수 있습니다.
    이 방식은 카드 UI나 목록에서 설명 텍스트를 제한할 때 유용합니다.
    추가적인 내용이 여기에 더 있습니다. 사용자는 더보기를 클릭하여 전체 내용을 확인할 수 있습니다.
    마지막 줄까지 포함하여 충분한 텍스트가 있어야 효과를 볼 수 있습니다.
  </p>
</ReadMore>`}
          scope={{ ReadMore }}
        />
      </section>

      <section className="docs-section" id="custom-labels">
        <h2 className="section-title">커스텀 레이블</h2>
        <LiveCodeBlock
          code={`<ReadMore maxHeight={60} moreLabel="전체 보기 ↓" lessLabel="간략히 ↑" showGradient={false}>
  <p style={{ margin: 0 }}>
    커스텀 레이블을 사용하여 더보기/접기 버튼의 텍스트를 변경할 수 있습니다.
    그라데이션 효과도 비활성화할 수 있어 다양한 디자인에 맞출 수 있습니다.
    이 컴포넌트는 제어/비제어 패턴을 모두 지원하며, 애니메이션도 선택적으로 적용 가능합니다.
    길고 상세한 내용을 포함하는 경우에 특히 유용합니다.
  </p>
</ReadMore>`}
          scope={{ ReadMore }}
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
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>내용</td></tr>
              <tr><td>maxLines</td><td>number</td><td>-</td><td>최대 줄 수</td></tr>
              <tr><td>maxHeight</td><td>number</td><td>120</td><td>최대 높이 (px)</td></tr>
              <tr><td>expanded</td><td>boolean</td><td>-</td><td>펼침 상태 (제어)</td></tr>
              <tr><td>defaultExpanded</td><td>boolean</td><td>false</td><td>기본 펼침 상태</td></tr>
              <tr><td>onExpandedChange</td><td>(expanded) =&gt; void</td><td>-</td><td>상태 변경 핸들러</td></tr>
              <tr><td>moreLabel</td><td>string</td><td>'더보기'</td><td>더보기 버튼 텍스트</td></tr>
              <tr><td>lessLabel</td><td>string</td><td>'접기'</td><td>접기 버튼 텍스트</td></tr>
              <tr><td>showGradient</td><td>boolean</td><td>true</td><td>그라데이션 오버레이</td></tr>
              <tr><td>animated</td><td>boolean</td><td>true</td><td>애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
