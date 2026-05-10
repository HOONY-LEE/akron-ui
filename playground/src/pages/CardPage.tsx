import { Card } from "@akron/ui";
import { useToast } from "@akron/ui";

export function CardPage() {
  const toast = useToast();

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Card</h1>
        <p className="page-description">
          콘텐츠를 시각적으로 그룹화하는 컨테이너입니다. 정보 카드, 대시보드 위젯 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          기본 Card는 정적 컨테이너로 사용됩니다. 배경, 테두리, 그림자가 적용됩니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box left">
          <Card>
            <h3 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 600 }}>프로젝트 현황</h3>
            <p style={{ margin: 0, color: "var(--docs-text-secondary)", fontSize: 14 }}>
              진행 중인 프로젝트 3건, 완료 12건
            </p>
          </Card>
        </div>
        <div className="code-block">
          <code>{`<Card>
  <h3>프로젝트 현황</h3>
  <p>진행 중인 프로젝트 3건, 완료 12건</p>
</Card>`}</code>
        </div>
      </section>

      <section className="docs-section" id="clickable">
        <h2 className="section-title">클릭 가능</h2>
        <p className="section-desc">
          <code className="inline-code">clickable</code> prop을 추가하면 hover 시 그림자가 강조되며,
          키보드 접근성(tab, Enter)도 지원됩니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box" style={{ gap: 16 }}>
          <Card clickable onClick={() => toast({ type: "info", title: "카드 1 클릭" })}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>인사 관리</h3>
            <p style={{ margin: 0, color: "var(--docs-text-secondary)", fontSize: 13 }}>사원 정보 조회</p>
          </Card>
          <Card clickable onClick={() => toast({ type: "info", title: "카드 2 클릭" })}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>급여 관리</h3>
            <p style={{ margin: 0, color: "var(--docs-text-secondary)", fontSize: 13 }}>급여 명세서 확인</p>
          </Card>
          <Card clickable onClick={() => toast({ type: "info", title: "카드 3 클릭" })}>
            <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 600 }}>근태 관리</h3>
            <p style={{ margin: 0, color: "var(--docs-text-secondary)", fontSize: 13 }}>출퇴근 기록 조회</p>
          </Card>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>clickable</td>
                <td>boolean</td>
                <td>false</td>
                <td>hover 시 그림자 강조 및 클릭 가능 상태</td>
              </tr>
              <tr>
                <td>onClick</td>
                <td>() =&gt; void</td>
                <td>-</td>
                <td>클릭 이벤트 핸들러</td>
              </tr>
              <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>카드 내부 콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
