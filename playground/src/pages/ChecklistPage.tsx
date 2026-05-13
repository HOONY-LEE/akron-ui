import { Checklist } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ChecklistPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Checklist</h1>
        <p className="page-description">
          인터랙티브 체크리스트 컴포넌트. 할 일 목록, 요구사항 확인, 온보딩 체크 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Checklist
  items={[
    { id: "1", label: "컴포넌트 라이브러리 설치" },
    { id: "2", label: "테마 설정 완료" },
    { id: "3", label: "첫 번째 컴포넌트 사용" },
    { id: "4", label: "다크모드 테스트" },
    { id: "5", label: "PR 리뷰 요청" },
  ]}
  defaultChecked={new Set(["1", "2"])}
  showProgress
/>`}
          scope={{ Checklist }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
  <div style={{ flex: 1, minWidth: 200 }}>
    <p style={{ fontSize: 13, marginBottom: 8, color: "var(--ark-color-text-secondary)" }}>default</p>
    <Checklist
      variant="default"
      items={[
        { id: "a1", label: "기획 문서 검토" },
        { id: "a2", label: "디자인 시안 확인" },
        { id: "a3", label: "개발 완료" },
      ]}
      defaultChecked={new Set(["a1"])}
    />
  </div>
  <div style={{ flex: 1, minWidth: 200 }}>
    <p style={{ fontSize: 13, marginBottom: 8, color: "var(--ark-color-text-secondary)" }}>card</p>
    <Checklist
      variant="card"
      items={[
        { id: "b1", label: "기획 문서 검토" },
        { id: "b2", label: "디자인 시안 확인" },
        { id: "b3", label: "개발 완료" },
      ]}
      defaultChecked={new Set(["b1", "b2"])}
    />
  </div>
  <div style={{ flex: 1, minWidth: 200 }}>
    <p style={{ fontSize: 13, marginBottom: 8, color: "var(--ark-color-text-secondary)" }}>minimal</p>
    <Checklist
      variant="minimal"
      items={[
        { id: "c1", label: "기획 문서 검토" },
        { id: "c2", label: "디자인 시안 확인" },
        { id: "c3", label: "개발 완료" },
      ]}
      defaultChecked={new Set(["c1"])}
    />
  </div>
</div>`}
          scope={{ Checklist }}
        />
      </section>

      <section className="docs-section" id="description">
        <h2 className="section-title">설명 포함 & 비활성화</h2>
        <LiveCodeBlock
          code={`<Checklist
  variant="card"
  items={[
    {
      id: "1",
      label: "보안 취약점 스캔",
      description: "npm audit 및 snyk으로 의존성 검사",
    },
    {
      id: "2",
      label: "단위 테스트 통과",
      description: "커버리지 80% 이상 유지",
      disabled: true,
    },
    {
      id: "3",
      label: "스테이징 배포 확인",
      description: "smoke test 완료 후 진행",
    },
  ]}
  defaultChecked={new Set(["1"])}
  showProgress
/>`}
          scope={{ Checklist }}
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
              <tr><td>items</td><td>ChecklistItem[]</td><td>필수</td><td>항목 목록</td></tr>
              <tr><td>checked</td><td>Set&lt;string | number&gt;</td><td>-</td><td>controlled 체크 상태</td></tr>
              <tr><td>defaultChecked</td><td>Set&lt;string | number&gt;</td><td>new Set()</td><td>기본 체크 상태</td></tr>
              <tr><td>onChange</td><td>(checked, item, next) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>variant</td><td>'default' | 'card' | 'minimal'</td><td>'default'</td><td>변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showProgress</td><td>boolean</td><td>false</td><td>진행도 바 표시</td></tr>
              <tr><td>completeMessage</td><td>string</td><td>'모두 완료! 🎉'</td><td>100% 달성 시 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
