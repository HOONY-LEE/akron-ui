import { Ticker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const NEWS_ITEMS = [
  { id: "1", content: "📢 Akron UI v2.0 출시 예정" },
  { id: "2", content: "🚀 새로운 컴포넌트 20개 추가" },
  { id: "3", content: "🎨 다크모드 완전 지원" },
  { id: "4", content: "⚡ 빌드 속도 50% 향상" },
  { id: "5", content: "📦 번들 사이즈 30% 감소" },
];

export function TickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Ticker</h1>
        <p className="page-description">
          스크롤 티커 컴포넌트. 공지사항, 뉴스, 주식 시세 등을 가로로 스크롤하며 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Ticker
  items={[
    { id: "1", content: "📢 Akron UI v2.0 출시 예정" },
    { id: "2", content: "🚀 새로운 컴포넌트 20개 추가" },
    { id: "3", content: "🎨 다크모드 완전 지원" },
    { id: "4", content: "⚡ 빌드 속도 50% 향상" },
    { id: "5", content: "📦 번들 사이즈 30% 감소" },
  ]}
/>`}
          scope={{ Ticker }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  {["default", "primary", "success", "warning", "danger", "dark"].map(color => (
    <Ticker
      key={color}
      color={color}
      label={color}
      items={[
        { id: "1", content: "첫 번째 소식입니다" },
        { id: "2", content: "두 번째 소식입니다" },
        { id: "3", content: "세 번째 소식입니다" },
      ]}
    />
  ))}
</div>`}
          scope={{ Ticker }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 구분자 및 방향</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <Ticker
    items={[
      { id: "1", content: "BTC: ₩92,400,000" },
      { id: "2", content: "ETH: ₩5,200,000" },
      { id: "3", content: "SOL: ₩248,000" },
    ]}
    separator="│"
    color="dark"
    label="CRYPTO"
    speed={40}
  />
  <Ticker
    items={[
      { id: "1", content: "오른쪽에서 왼쪽으로" },
      { id: "2", content: "스크롤 방향 변경" },
      { id: "3", content: "direction='right'" },
    ]}
    direction="right"
    color="primary"
  />
</div>`}
          scope={{ Ticker }}
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
              <tr><td>items</td><td>TickerItem[]</td><td>필수</td><td>표시할 아이템 목록</td></tr>
              <tr><td>speed</td><td>number</td><td>60</td><td>스크롤 속도 (px/s)</td></tr>
              <tr><td>color</td><td>'default' | 'primary' | 'success' | 'warning' | 'danger' | 'dark'</td><td>'default'</td><td>색상 테마</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>좌측 헤더 레이블</td></tr>
              <tr><td>separator</td><td>ReactNode</td><td>'•'</td><td>아이템 간 구분자</td></tr>
              <tr><td>pauseOnHover</td><td>boolean</td><td>true</td><td>호버 시 일시정지</td></tr>
              <tr><td>direction</td><td>'left' | 'right'</td><td>'left'</td><td>스크롤 방향</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
