import { OrgChart } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const ORG_DATA = {
  id: "ceo",
  name: "김대표",
  title: "CEO",
  children: [
    {
      id: "cto",
      name: "이기술",
      title: "CTO",
      children: [
        { id: "fe-lead", name: "박프론트", title: "프론트엔드 리드" },
        { id: "be-lead", name: "최백엔드", title: "백엔드 리드" },
      ],
    },
    {
      id: "coo",
      name: "정운영",
      title: "COO",
      children: [
        { id: "hr", name: "강인사", title: "HR 매니저" },
        { id: "finance", name: "조재무", title: "재무 매니저" },
      ],
    },
  ],
};

export function OrgChartPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">OrgChart</h1>
        <p className="page-description">
          조직도 컴포넌트. 트리 구조의 조직 계층을 수직 또는 수평으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용 (수직)</h2>
        <LiveCodeBlock
          code={`<OrgChart
  data={{
    id: "ceo",
    name: "김대표",
    title: "CEO",
    children: [
      {
        id: "cto",
        name: "이기술",
        title: "CTO",
        children: [
          { id: "fe", name: "박프론트", title: "프론트엔드 리드" },
          { id: "be", name: "최백엔드", title: "백엔드 리드" },
        ],
      },
      {
        id: "coo",
        name: "정운영",
        title: "COO",
        children: [
          { id: "hr", name: "강인사", title: "HR 매니저" },
        ],
      },
    ],
  }}
  onNodeClick={(node) => alert(node.name + " (" + node.title + ")")}
/>`}
          scope={{ OrgChart }}
        />
      </section>

      <section className="docs-section" id="horizontal">
        <h2 className="section-title">수평 레이아웃</h2>
        <LiveCodeBlock
          code={`<OrgChart
  direction="horizontal"
  data={{
    id: "ceo",
    name: "김대표",
    title: "CEO",
    children: [
      {
        id: "cto",
        name: "이기술",
        title: "CTO",
        children: [
          { id: "fe", name: "박프론트", title: "프론트엔드" },
          { id: "be", name: "최백엔드", title: "백엔드" },
        ],
      },
      {
        id: "coo",
        name: "정운영",
        title: "COO",
      },
    ],
  }}
/>`}
          scope={{ OrgChart }}
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
              <tr><td>data</td><td>OrgNode</td><td>필수</td><td>루트 노드</td></tr>
              <tr><td>direction</td><td>'vertical' | 'horizontal'</td><td>'vertical'</td><td>방향</td></tr>
              <tr><td>onNodeClick</td><td>(node: OrgNode) =&gt; void</td><td>-</td><td>노드 클릭 콜백</td></tr>
              <tr><td>renderNode</td><td>(node: OrgNode) =&gt; ReactNode</td><td>-</td><td>커스텀 노드 렌더</td></tr>
              <tr><td>showAvatar</td><td>boolean</td><td>true</td><td>아바타 표시</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>OrgNode</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>name</td><td>string</td><td>이름 (필수)</td></tr>
              <tr><td>title</td><td>string</td><td>직함</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 이미지 URL</td></tr>
              <tr><td>children</td><td>OrgNode[]</td><td>하위 노드</td></tr>
              <tr><td>expanded</td><td>boolean</td><td>확장 상태 (기본 true)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
