import { StepIndicator } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { useState } from "react";
import { User, CreditCard, CheckCircle } from "lucide-react";

export function StepIndicatorPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">StepIndicator</h1>
        <p className="page-description">
          단계 진행 표시 컴포넌트. 멀티스텝 폼, 온보딩 플로우, 주문 진행 상태를 시각화합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [step, setStep] = React.useState(1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <StepIndicator steps={4} currentStep={step} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}
          style={{ padding: "6px 14px", borderRadius: 6, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)" }}>
          이전
        </button>
        <button onClick={() => setStep(s => Math.min(3, s + 1))} disabled={step === 3}
          style={{ padding: "6px 14px", borderRadius: 6, border: "none", background: "var(--ark-color-primary)", color: "#fff", cursor: "pointer" }}>
          다음
        </button>
      </div>
    </div>
  );
}`}
          scope={{ StepIndicator }}
        />
      </section>

      <section className="docs-section" id="with-labels">
        <h2 className="section-title">레이블 포함</h2>
        <LiveCodeBlock
          code={`<StepIndicator
  steps={[
    { label: "계정 생성" },
    { label: "정보 입력" },
    { label: "결제" },
    { label: "완료" },
  ]}
  currentStep={2}
/>`}
          scope={{ StepIndicator }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>dots (기본)</p>
    <StepIndicator steps={4} currentStep={2} variant="dots" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>numbers</p>
    <StepIndicator steps={4} currentStep={2} variant="numbers" />
  </div>
  <div>
    <p style={{ fontSize: 12, color: "var(--ark-color-text-tertiary)", marginBottom: 8 }}>icons</p>
    <StepIndicator
      steps={[
        { label: "계정", icon: <User size={12} /> },
        { label: "결제", icon: <CreditCard size={12} /> },
        { label: "완료", icon: <CheckCircle size={12} /> },
      ]}
      currentStep={1}
      variant="icons"
    />
  </div>
</div>`}
          scope={{ StepIndicator, User, CreditCard, CheckCircle }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <StepIndicator steps={4} currentStep={2} size="sm" variant="numbers" />
  <StepIndicator steps={4} currentStep={2} size="md" variant="numbers" />
  <StepIndicator steps={4} currentStep={2} size="lg" variant="numbers" />
</div>`}
          scope={{ StepIndicator }}
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
              <tr><td>steps</td><td>number | StepIndicatorStep[]</td><td>필수</td><td>총 단계 수 또는 단계 배열</td></tr>
              <tr><td>currentStep</td><td>number</td><td>필수</td><td>현재 단계 (0-based)</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'dots' | 'numbers' | 'icons'</td><td>'dots'</td><td>변형</td></tr>
              <tr><td>showConnector</td><td>boolean</td><td>true</td><td>연결선 표시</td></tr>
              <tr><td>onStepClick</td><td>(index: number) =&gt; void</td><td>-</td><td>완료된 단계 클릭 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
