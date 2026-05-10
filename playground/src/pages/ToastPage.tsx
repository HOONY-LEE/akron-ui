import { Button, useToast } from "@akron/ui";

export function ToastPage() {
  const toast = useToast();

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Toast</h1>
        <p className="page-description">
          사용자에게 일시적인 피드백을 전달하는 알림 메시지입니다.
          화면 우측 하단에 표시되며 자동으로 사라집니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          앱 루트에 <code className="inline-code">ToastProvider</code>를 감싸고,
          하위 컴포넌트에서 <code className="inline-code">useToast</code> 훅으로 토스트를 호출합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box">
          <Button
            variant="primary"
            onClick={() => toast({ type: "success", title: "저장 완료", message: "변경사항이 저장되었습니다." })}
          >
            토스트 띄우기
          </Button>
        </div>
        <div className="code-block">
          <code>{`const toast = useToast();

toast({
  type: "success",
  title: "저장 완료",
  message: "변경사항이 저장되었습니다.",
});`}</code>
        </div>
      </section>

      <section className="docs-section" id="types">
        <h2 className="section-title">타입</h2>
        <p className="section-desc">
          4가지 시맨틱 타입을 제공합니다. 각 타입에 따라 좌측 컬러바와 아이콘이 변경됩니다.
          자동 닫힘 시간도 타입에 따라 다릅니다.
        </p>

        <h3 className="section-subtitle">success</h3>
        <p className="section-desc">작업 성공 시 사용합니다. 3초 후 자동으로 사라집니다.</p>
        <div className="preview-box">
          <Button
            variant="primary"
            onClick={() => toast({ type: "success", title: "저장 완료", message: "변경사항이 저장되었습니다." })}
          >
            Success
          </Button>
        </div>

        <h3 className="section-subtitle">info</h3>
        <p className="section-desc">안내 메시지에 사용합니다. 3초 후 자동으로 사라집니다.</p>
        <div className="preview-box">
          <Button
            variant="outline"
            onClick={() => toast({ type: "info", title: "안내", message: "새 공지사항이 등록되었습니다." })}
          >
            Info
          </Button>
        </div>

        <h3 className="section-subtitle">warning</h3>
        <p className="section-desc">주의가 필요한 상황에 사용합니다. 4초 후 자동으로 사라집니다.</p>
        <div className="preview-box">
          <Button
            variant="outline"
            onClick={() => toast({ type: "warning", title: "주의", message: "저장하지 않은 변경사항이 있습니다." })}
          >
            Warning
          </Button>
        </div>

        <h3 className="section-subtitle">error</h3>
        <p className="section-desc">오류 발생 시 사용합니다. 5초 후 자동으로 사라집니다.</p>
        <div className="preview-box">
          <Button
            variant="danger"
            onClick={() => toast({ type: "error", title: "오류 발생", message: "서버 연결에 실패했습니다. 잠시 후 다시 시도해주세요." })}
          >
            Error
          </Button>
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
                <td>type</td>
                <td>'success' | 'info' | 'warning' | 'error'</td>
                <td>-</td>
                <td>토스트 시맨틱 타입 (필수)</td>
              </tr>
              <tr>
                <td>title</td>
                <td>string</td>
                <td>-</td>
                <td>토스트 제목 (필수)</td>
              </tr>
              <tr>
                <td>message</td>
                <td>string</td>
                <td>-</td>
                <td>부가 설명 메시지</td>
              </tr>
              <tr>
                <td>duration</td>
                <td>number</td>
                <td>타입별 상이</td>
                <td>자동 닫힘 시간 (ms). success/info: 3000, warning: 4000, error: 5000</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
