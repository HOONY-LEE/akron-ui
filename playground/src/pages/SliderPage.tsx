import { useState } from "react";
import { Slider } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SliderPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Slider</h1>
        <p className="page-description">
          범위 슬라이더. 단일 값 및 범위(range) 선택, 눈금 표시, 키보드 접근성을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [v, setV] = useState(40);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 400 }}>
      <Slider label="밝기" value={v} onChange={setV} showValue />
      <Slider label="볼륨" defaultValue={70} showValue formatValue={(v) => v + "%"} />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Slider, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="range">
        <h2 className="section-title">범위 선택</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [range, setRange] = useState([20, 80]);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 400 }}>
      <Slider
        label="가격 범위"
        rangeValue={range}
        onRangeChange={setRange}
        min={0}
        max={100}
        showValue
        formatValue={(v) => "₩" + v + "만"}
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Slider, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="marks">
        <h2 className="section-title">눈금 표시</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 40, maxWidth: 400 }}>
  <Slider
    label="사이즈"
    defaultValue={2}
    min={1}
    max={5}
    step={1}
    marks={[
      { value: 1, label: "XS" },
      { value: 2, label: "S" },
      { value: 3, label: "M" },
      { value: 4, label: "L" },
      { value: 5, label: "XL" },
    ]}
  />
</div>`}
          scope={{ Slider }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 400 }}>
  <Slider label="Primary" defaultValue={60} color="primary" />
  <Slider label="Success" defaultValue={75} color="success" />
  <Slider label="Warning" defaultValue={45} color="warning" />
  <Slider label="Error"   defaultValue={30} color="error" />
</div>`}
          scope={{ Slider }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 슬라이더</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 32, alignItems: "flex-start", height: 240 }}>
  <Slider orientation="vertical" defaultValue={60} color="primary" showValue />
  <Slider orientation="vertical" defaultValue={40} color="success" showValue />
</div>`}
          scope={{ Slider }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<Slider
  label="비활성화"
  defaultValue={50}
  disabled
  style={{ maxWidth: 400 }}
/>`}
          scope={{ Slider }}
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
              <tr><td>value</td><td>number</td><td>-</td><td>현재 값 (단일, 제어)</td></tr>
              <tr><td>defaultValue</td><td>number</td><td>min</td><td>기본 값 (단일, 비제어)</td></tr>
              <tr><td>onChange</td><td>(value: number) =&gt; void</td><td>-</td><td>값 변경 핸들러</td></tr>
              <tr><td>rangeValue</td><td>[number, number]</td><td>-</td><td>범위 값 (제어)</td></tr>
              <tr><td>defaultRangeValue</td><td>[number, number]</td><td>-</td><td>기본 범위 (비제어)</td></tr>
              <tr><td>onRangeChange</td><td>(value: [number, number]) =&gt; void</td><td>-</td><td>범위 변경 핸들러</td></tr>
              <tr><td>min</td><td>number</td><td>0</td><td>최솟값</td></tr>
              <tr><td>max</td><td>number</td><td>100</td><td>최댓값</td></tr>
              <tr><td>step</td><td>number</td><td>1</td><td>증감 단위</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>orientation</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>방향</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'error'</td><td>'primary'</td><td>색상</td></tr>
              <tr><td>showValue</td><td>boolean</td><td>false</td><td>현재 값 표시</td></tr>
              <tr><td>formatValue</td><td>(value: number) =&gt; string</td><td>String</td><td>값 포맷 함수</td></tr>
              <tr><td>marks</td><td>boolean | {`{ value, label? }[]`}</td><td>-</td><td>눈금 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
