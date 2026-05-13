import { useState } from "react";
import { Tour } from "@sunghoon_lee/akron-ui";
import type { TourStep } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TourPage() {
  const [open, setOpen] = useState(false);

  const demoSteps: TourStep[] = [
    {
      title: "환영합니다! 👋",
      description: "이 투어에서 주요 기능을 소개해드립니다. 단계별로 진행해 보세요.",
      placement: "center",
    },
    {
      target: "#tour-demo-card",
      title: "카드 컴포넌트",
      description: "이 카드는 콘텐츠를 담는 기본 컨테이너입니다.",
      placement: "bottom",
    },
    {
      target: "#tour-demo-button",
      title: "버튼",
      description: "인터랙티브한 액션을 트리거합니다.",
      placement: "right",
    },
  ];

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Tour</h1>
        <p className="page-description">
          온보딩 가이드 투어. 스포트라이트로 특정 요소를 강조하며 단계별로 UI를 설명합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: "환영합니다! 👋",
      description: "이 투어에서 주요 기능을 소개해드립니다.",
      placement: "center",
    },
    {
      target: "#demo-card",
      title: "카드 컴포넌트",
      description: "콘텐츠를 담는 기본 컨테이너입니다.",
      placement: "bottom",
    },
    {
      target: "#demo-btn",
      title: "버튼",
      description: "인터랙티브한 액션을 트리거합니다.",
      placement: "right",
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <div
        id="demo-card"
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          background: "var(--ark-color-surface)",
        }}
      >
        <p style={{ margin: 0, color: "var(--ark-color-text-secondary)" }}>카드 영역</p>
      </div>
      <button
        id="demo-btn"
        style={{
          padding: "8px 16px",
          background: "var(--ark-color-primary)",
          color: "var(--ark-color-primary-foreground)",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
          marginRight: 12,
        }}
      >
        버튼
      </button>
      <button
        style={{
          padding: "8px 16px",
          background: "var(--ark-color-surface)",
          border: "1px solid var(--ark-color-border)",
          borderRadius: 6,
          cursor: "pointer",
          color: "var(--ark-color-text-primary)",
        }}
        onClick={() => setOpen(true)}
      >
        투어 시작
      </button>

      <Tour
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        onComplete={() => alert("투어 완료!")}
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Tour, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    { title: "1단계", description: "첫 번째 단계입니다.", placement: "center" },
    { title: "2단계", description: "두 번째 단계입니다.", placement: "center" },
    { title: "3단계", description: "마지막 단계입니다!", placement: "center" },
  ];

  return (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      <button
        style={{
          padding: "8px 16px",
          background: "var(--ark-color-primary)",
          color: "var(--ark-color-primary-foreground)",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
        onClick={() => { setStep(0); setOpen(true); }}
      >
        투어 시작
      </button>
      <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
        현재 단계: {step + 1} / {steps.length}
      </span>
      <Tour
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => { setOpen(false); alert("완료!"); }}
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ Tour, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="options">
        <h2 className="section-title">옵션</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      title: "건너뛰기 없는 투어",
      description: "showSkip=false 로 건너뛰기 버튼을 숨길 수 있습니다.",
      placement: "center",
    },
    {
      title: "커스텀 레이블",
      description: "nextLabel, prevLabel, completeLabel 로 버튼 텍스트를 변경할 수 있습니다.",
      placement: "center",
    },
  ];

  return (
    <button
      style={{
        padding: "8px 16px",
        background: "var(--ark-color-primary)",
        color: "var(--ark-color-primary-foreground)",
        border: "none",
        borderRadius: 6,
        cursor: "pointer",
      }}
      onClick={() => setOpen(true)}
    >
      옵션 투어 시작
      <Tour
        steps={steps}
        open={open}
        onOpenChange={setOpen}
        showSkip={false}
        nextLabel="계속 →"
        prevLabel="← 뒤로"
        completeLabel="끝내기 ✓"
      />
    </button>
  );
}
render(<Demo />)`}
          scope={{ Tour, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">TourProps</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>steps</td><td>TourStep[]</td><td>필수</td><td>투어 단계 목록</td></tr>
              <tr><td>open</td><td>boolean</td><td>필수</td><td>투어 활성화 여부</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>필수</td><td>투어 상태 변경 핸들러</td></tr>
              <tr><td>currentStep</td><td>number</td><td>-</td><td>현재 단계 (제어 모드)</td></tr>
              <tr><td>onStepChange</td><td>(step: number) =&gt; void</td><td>-</td><td>단계 변경 핸들러</td></tr>
              <tr><td>onComplete</td><td>() =&gt; void</td><td>-</td><td>투어 완료 핸들러</td></tr>
              <tr><td>nextLabel</td><td>string</td><td>'다음'</td><td>다음 버튼 레이블</td></tr>
              <tr><td>prevLabel</td><td>string</td><td>'이전'</td><td>이전 버튼 레이블</td></tr>
              <tr><td>completeLabel</td><td>string</td><td>'완료'</td><td>완료 버튼 레이블</td></tr>
              <tr><td>showSkip</td><td>boolean</td><td>true</td><td>건너뛰기 버튼 표시</td></tr>
              <tr><td>spotlightPadding</td><td>number</td><td>8</td><td>스포트라이트 여백 (px)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>TourStep</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>target</td><td>string</td><td>-</td><td>CSS 선택자 (없으면 중앙 표시)</td></tr>
              <tr><td>title</td><td>string</td><td>필수</td><td>단계 제목</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>단계 설명</td></tr>
              <tr><td>content</td><td>ReactNode</td><td>-</td><td>추가 콘텐츠</td></tr>
              <tr><td>placement</td><td>'top' | 'bottom' | 'left' | 'right' | 'center'</td><td>'bottom'</td><td>툴팁 위치</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
