import { useState } from "react";
import { NumberInput } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function NumberInputPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">NumberInput</h1>
        <p className="page-description">
          숫자 전용 입력 필드. 증감 버튼, 최솟값/최댓값 제한, 단위 접두/접미사를 지원합니다.
          버튼을 길게 누르면 연속으로 증감합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 200 }}>
  <NumberInput label="수량" defaultValue={1} min={0} max={100} />
  <NumberInput label="점수" defaultValue={50} min={0} max={100} step={5} />
</div>`}
          scope={{ NumberInput }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(10);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 200 }}>
      <NumberInput
        label="수량"
        value={value}
        onChange={setValue}
        min={0}
        max={999}
        step={1}
      />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        현재 값: {value}
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ NumberInput, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="prefix-suffix">
        <h2 className="section-title">접두사 / 접미사</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 220 }}>
  <NumberInput label="가격" prefix="₩" defaultValue={1000} step={100} />
  <NumberInput label="무게" suffix="kg" defaultValue={70} step={0.1} precision={1} />
  <NumberInput label="퍼센트" suffix="%" defaultValue={50} min={0} max={100} />
</div>`}
          scope={{ NumberInput }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, maxWidth: 200 }}>
  <NumberInput size="sm" defaultValue={1} placeholder="Small" />
  <NumberInput size="md" defaultValue={1} placeholder="Medium (기본)" />
  <NumberInput size="lg" defaultValue={1} placeholder="Large" />
</div>`}
          scope={{ NumberInput }}
        />
      </section>

      <section className="docs-section" id="no-controls">
        <h2 className="section-title">버튼 없이</h2>
        <LiveCodeBlock
          code={`<NumberInput
  label="나이"
  defaultValue={25}
  min={0}
  max={150}
  hideControls
  helperText="숫자만 입력 가능합니다"
  style={{ maxWidth: 200 }}
/>`}
          scope={{ NumberInput }}
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">에러 상태</h2>
        <LiveCodeBlock
          code={`<NumberInput
  label="재고 수량"
  defaultValue={-1}
  errorMessage="재고는 0 이상이어야 합니다"
  style={{ maxWidth: 200 }}
/>`}
          scope={{ NumberInput }}
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
              <tr><td>value</td><td>number | null</td><td>-</td><td>현재 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>number | null</td><td>-</td><td>기본 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: number | null) =&gt; void</td><td>-</td><td>값 변경 핸들러</td></tr>
              <tr><td>min</td><td>number</td><td>-</td><td>최솟값</td></tr>
              <tr><td>max</td><td>number</td><td>-</td><td>최댓값</td></tr>
              <tr><td>step</td><td>number</td><td>1</td><td>증감 단위</td></tr>
              <tr><td>precision</td><td>number</td><td>0</td><td>소수점 자리수</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>prefix</td><td>ReactNode</td><td>-</td><td>앞 접두사</td></tr>
              <tr><td>suffix</td><td>ReactNode</td><td>-</td><td>뒤 접미사</td></tr>
              <tr><td>hideControls</td><td>boolean</td><td>false</td><td>증감 버튼 숨김</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
