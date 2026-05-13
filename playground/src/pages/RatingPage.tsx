import { useState } from "react";
import { Rating } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function RatingPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Rating</h1>
        <p className="page-description">
          별점 컴포넌트. 반쪽 별, 읽기 전용, 커스텀 색상을 지원합니다.
          키보드 방향키로도 조작할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(3);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Rating value={value} onChange={setValue} label="평점" />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        선택된 별점: {value}점
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Rating, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="half">
        <h2 className="section-title">반쪽 별</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(3.5);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Rating value={value} onChange={setValue} allowHalf />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        {value}점
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Rating, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="readonly">
        <h2 className="section-title">읽기 전용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Rating value={4} readOnly label="사용자 평점" />
  <Rating value={3.5} readOnly allowHalf label="전문가 평점" />
</div>`}
          scope={{ Rating }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Rating defaultValue={4} size="sm" />
  <Rating defaultValue={4} size="md" />
  <Rating defaultValue={4} size="lg" />
</div>`}
          scope={{ Rating }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 설정</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
  <Rating defaultValue={7} count={10} label="10점 만점" />
  <Rating defaultValue={3} color="var(--ark-color-primary-500)" label="커스텀 색상" />
  <Rating defaultValue={0} clearable={false} label="초기화 불가" />
</div>`}
          scope={{ Rating }}
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
              <tr><td>value</td><td>number</td><td>-</td><td>현재 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>number</td><td>0</td><td>기본 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: number) =&gt; void</td><td>-</td><td>값 변경 핸들러</td></tr>
              <tr><td>count</td><td>number</td><td>5</td><td>별 개수</td></tr>
              <tr><td>allowHalf</td><td>boolean</td><td>false</td><td>반쪽 별 허용</td></tr>
              <tr><td>clearable</td><td>boolean</td><td>true</td><td>같은 값 클릭 시 0으로 초기화</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>color</td><td>string</td><td>노란색</td><td>커스텀 색상 (CSS 색상값)</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
