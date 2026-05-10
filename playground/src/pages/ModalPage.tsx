import { useState } from "react";
import { Button, Modal } from "@akron/ui";

export function ModalPage() {
  const [smOpen, setSmOpen] = useState(false);
  const [mdOpen, setMdOpen] = useState(false);
  const [lgOpen, setLgOpen] = useState(false);

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Modal</h1>
        <p className="page-description">
          사용자의 주의를 집중시키는 오버레이 다이얼로그입니다.
          Radix UI Dialog 기반으로 포커스 트랩과 접근성을 기본 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">open</code>과{" "}
          <code className="inline-code">onOpenChange</code>로 열림/닫힘을 제어합니다.
          오버레이 클릭 또는 ESC 키로 닫을 수 있습니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box">
          <Button onClick={() => setMdOpen(true)}>모달 열기</Button>
        </div>
        <Modal
          open={mdOpen}
          onOpenChange={setMdOpen}
          title="사원 정보 수정"
          description="수정한 내용은 즉시 반영됩니다."
        >
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 24 }}>
            <Button variant="outline" onClick={() => setMdOpen(false)}>취소</Button>
            <Button variant="primary" onClick={() => setMdOpen(false)}>저장</Button>
          </div>
        </Modal>
        <div className="code-block">
          <code>{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>모달 열기</Button>
<Modal
  open={open}
  onOpenChange={setOpen}
  title="사원 정보 수정"
  description="수정한 내용은 즉시 반영됩니다."
>
  <Button onClick={() => setOpen(false)}>저장</Button>
</Modal>`}</code>
        </div>
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기 조정하기</h2>
        <p className="section-desc">
          <code className="inline-code">sm</code>(400px),{" "}
          <code className="inline-code">md</code>(560px),{" "}
          <code className="inline-code">lg</code>(720px) 세 가지 크기를 지원합니다.
        </p>
        <div className="example-label">Editable Example</div>
        <div className="preview-box">
          <Button variant="outline" size="sm" onClick={() => setSmOpen(true)}>Small</Button>
          <Button variant="outline" size="sm" onClick={() => setMdOpen(true)}>Medium</Button>
          <Button variant="outline" size="sm" onClick={() => setLgOpen(true)}>Large</Button>
        </div>
        <Modal open={smOpen} onOpenChange={setSmOpen} title="Small Modal" size="sm">
          <p style={{ color: "var(--docs-text-secondary)", fontSize: 14 }}>최대 너비 400px의 작은 모달입니다.</p>
        </Modal>
        <Modal open={lgOpen} onOpenChange={setLgOpen} title="Large Modal" size="lg">
          <p style={{ color: "var(--docs-text-secondary)", fontSize: 14 }}>최대 너비 720px의 큰 모달입니다. 복잡한 폼이나 상세 정보 표시에 적합합니다.</p>
        </Modal>
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
                <td>open</td>
                <td>boolean</td>
                <td>-</td>
                <td>모달 열림 여부 (필수)</td>
              </tr>
              <tr>
                <td>onOpenChange</td>
                <td>(open: boolean) =&gt; void</td>
                <td>-</td>
                <td>열림/닫힘 상태 변경 핸들러 (필수)</td>
              </tr>
              <tr>
                <td>size</td>
                <td>'sm' | 'md' | 'lg'</td>
                <td>'md'</td>
                <td>모달 최대 너비</td>
              </tr>
              <tr>
                <td>title</td>
                <td>string</td>
                <td>-</td>
                <td>모달 제목</td>
              </tr>
              <tr>
                <td>description</td>
                <td>string</td>
                <td>-</td>
                <td>모달 설명</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
