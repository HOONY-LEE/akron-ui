import { Divider } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DividerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Divider</h1>
        <p className="page-description">
          구분선 컴포넌트. 콘텐츠 섹션을 시각적으로 분리합니다.
          수평/수직 방향, solid/dashed/dotted 스타일, 레이블을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <p style={{ margin: 0, fontSize: 14 }}>첫 번째 섹션 내용입니다.</p>
  <Divider />
  <p style={{ margin: 0, fontSize: 14 }}>두 번째 섹션 내용입니다.</p>
</div>`}
          scope={{ Divider }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">스타일 변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <div>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", marginBottom: 8, display: "block" }}>solid (기본)</span>
    <Divider variant="solid" />
  </div>
  <div>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", marginBottom: 8, display: "block" }}>dashed</span>
    <Divider variant="dashed" />
  </div>
  <div>
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)", marginBottom: 8, display: "block" }}>dotted</span>
    <Divider variant="dotted" />
  </div>
</div>`}
          scope={{ Divider }}
        />
      </section>

      <section className="docs-section" id="label">
        <h2 className="section-title">레이블</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <Divider label="또는" />
  <Divider label="이어서" labelPosition="start" />
  <Divider label="계속" labelPosition="end" />
  <Divider label="옵션" variant="dashed" />
</div>`}
          scope={{ Divider }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 구분선</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
  <span>홈</span>
  <Divider orientation="vertical" style={{ height: 16 }} />
  <span>제품</span>
  <Divider orientation="vertical" style={{ height: 16 }} />
  <span>회사 소개</span>
  <Divider orientation="vertical" style={{ height: 16 }} />
  <span>문의</span>
</div>`}
          scope={{ Divider }}
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
              <tr><td>orientation</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>방향</td></tr>
              <tr><td>variant</td><td>'solid' | 'dashed' | 'dotted'</td><td>'solid'</td><td>선 스타일</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>중간 레이블 텍스트</td></tr>
              <tr><td>labelPosition</td><td>'start' | 'center' | 'end'</td><td>'center'</td><td>레이블 위치</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
