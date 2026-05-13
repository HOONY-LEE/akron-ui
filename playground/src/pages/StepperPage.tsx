import { useState } from "react";
import { Stepper, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function StepperPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Stepper</h1>
        <p className="page-description">
          단계별 진행 표시 컴포넌트. 위자드 형태의 흐름을 안내합니다.
          수평/수직 방향과 각 단계별 상태(완료, 진행 중, 오류, 대기)를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Stepper
  activeStep={1}
  steps={[
    { title: "계정 생성" },
    { title: "프로필 설정" },
    { title: "완료" },
  ]}
/>`}
          scope={{ Stepper }}
        />
      </section>

      <section className="docs-section" id="with-description">
        <h2 className="section-title">설명 포함</h2>
        <LiveCodeBlock
          code={`<Stepper
  activeStep={1}
  steps={[
    { title: "주문 접수", description: "주문이 성공적으로 접수되었습니다" },
    { title: "배송 준비", description: "상품을 포장 중입니다" },
    { title: "배송 중", description: "택배사에 인계되었습니다" },
    { title: "배송 완료", description: "상품이 도착했습니다" },
  ]}
/>`}
          scope={{ Stepper }}
        />
      </section>

      <section className="docs-section" id="vertical">
        <h2 className="section-title">수직 방향</h2>
        <LiveCodeBlock
          code={`<Stepper
  orientation="vertical"
  activeStep={2}
  steps={[
    { title: "신청서 작성", description: "기본 정보를 입력하세요" },
    { title: "서류 제출", description: "필요 서류를 업로드하세요" },
    { title: "검토 중", description: "담당자가 검토 중입니다" },
    { title: "승인 완료", description: "신청이 완료되었습니다" },
  ]}
  style={{ maxWidth: 360 }}
/>`}
          scope={{ Stepper }}
        />
      </section>

      <section className="docs-section" id="interactive">
        <h2 className="section-title">인터랙티브</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [step, setStep] = useState(0);
  const steps = [
    { title: "기본 정보", description: "이름과 이메일을 입력하세요" },
    { title: "주소 입력", description: "배송 주소를 입력하세요" },
    { title: "결제", description: "결제 수단을 선택하세요" },
    { title: "완료", description: "주문이 완료되었습니다" },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 480 }}>
      <Stepper steps={steps} activeStep={step} />
      <div style={{ display: "flex", gap: 8 }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
        >
          이전
        </Button>
        <Button
          size="sm"
          onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
          disabled={step === steps.length - 1}
        >
          다음
        </Button>
      </div>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Stepper, Button, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="error">
        <h2 className="section-title">오류 상태</h2>
        <LiveCodeBlock
          code={`<Stepper
  steps={[
    { title: "완료된 단계", status: "completed" },
    { title: "오류 발생", status: "error", description: "처리 중 오류가 발생했습니다" },
    { title: "대기 중", status: "pending" },
  ]}
/>`}
          scope={{ Stepper }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Stepper Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>steps</td><td>StepItem[]</td><td>-</td><td>단계 목록 (필수)</td></tr>
              <tr><td>activeStep</td><td>number</td><td>0</td><td>현재 활성 단계 (0-based)</td></tr>
              <tr><td>orientation</td><td>'horizontal' | 'vertical'</td><td>'horizontal'</td><td>방향</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>StepItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>title</td><td>string</td><td>단계 제목 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>단계 설명</td></tr>
              <tr><td>status</td><td>'completed' | 'active' | 'error' | 'pending'</td><td>상태 (미지정 시 activeStep으로 자동 결정)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
