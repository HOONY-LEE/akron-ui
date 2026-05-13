import { useState } from "react";
import { ColorPicker } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ColorPickerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ColorPicker</h1>
        <p className="page-description">
          색상 선택기. 색상 그라디언트 캔버스, 색조 슬라이더, HEX 입력, 스와치 팔레트를 제공합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ColorPicker
        label="테마 색상"
        value={color}
        onChange={setColor}
      />
      <div style={{
        padding: "20px 24px",
        borderRadius: 8,
        background: color,
        color: "#fff",
        fontWeight: 600,
        fontSize: 14,
        display: "inline-block",
      }}>
        {color}
      </div>
    </div>
  );
}
render(<Demo />)`}
          scope={{ ColorPicker, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="swatches">
        <h2 className="section-title">커스텀 스와치</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [color, setColor] = useState("#f97316");
  const brandSwatches = [
    "#f97316", "#ef4444", "#8b5cf6", "#3b82f6",
    "#22c55e", "#14b8a6", "#64748b", "#1e293b",
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <ColorPicker
        label="브랜드 색상"
        value={color}
        onChange={setColor}
        swatches={brandSwatches}
      />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        선택된 색상: {color}
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ ColorPicker, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="swatches-only">
        <h2 className="section-title">스와치 전용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [color, setColor] = useState("#22c55e");
  return (
    <ColorPicker
      label="상태 색상"
      value={color}
      onChange={setColor}
      swatchesOnly
      swatches={[
        "#22c55e", "#3b82f6", "#f97316",
        "#ef4444", "#8b5cf6", "#64748b",
      ]}
    />
  );
}
render(<Demo />)`}
          scope={{ ColorPicker, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [c1, setC1] = useState("#ef4444");
  const [c2, setC2] = useState("#3b82f6");
  const [c3, setC3] = useState("#22c55e");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ColorPicker size="sm" value={c1} onChange={setC1} label="Small" />
      <ColorPicker size="md" value={c2} onChange={setC2} label="Medium (기본)" />
      <ColorPicker size="lg" value={c3} onChange={setC3} label="Large" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ ColorPicker, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <ColorPicker value={color} onChange={setColor} helperText="도움말 텍스트입니다." label="일반" />
      <ColorPicker value={color} onChange={setColor} error errorMessage="색상을 선택하세요." label="에러" />
      <ColorPicker value={color} onChange={setColor} disabled label="비활성화" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ ColorPicker, useState }}
          noInline
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
              <tr><td>value</td><td>string</td><td>-</td><td>현재 색상 hex 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>'#3b82f6'</td><td>초기 색상 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>-</td><td>색상 변경 핸들러</td></tr>
              <tr><td>swatches</td><td>string[]</td><td>12색 팔레트</td><td>사전 정의 스와치 색상</td></tr>
              <tr><td>swatchesOnly</td><td>boolean</td><td>false</td><td>스와치만 표시 (편집기 숨김)</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>트리거 크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
