import { useState } from "react";
import { ConfirmDialog } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ConfirmDialogPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ConfirmDialog</h1>
        <p className="page-description">
          확인 다이얼로그 컴포넌트. 위험한 작업이나 중요한 결정을 사용자에게 재확인할 때 사용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)" }}
      >
        확인 다이얼로그 열기
      </button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="변경 사항을 저장하시겠습니까?"
        description="저장하지 않으면 변경 사항이 모두 사라집니다."
        onConfirm={() => { alert("저장됨"); setOpen(false); }}
      />
    </>
  );
}`}
          scope={{ ConfirmDialog }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [variant, setVariant] = React.useState(null);
  const variants = [
    { key: "default", label: "Default", confirmLabel: "확인" },
    { key: "danger",  label: "Danger",  confirmLabel: "삭제" },
    { key: "warning", label: "Warning", confirmLabel: "계속" },
    { key: "info",    label: "Info",    confirmLabel: "이해했습니다" },
    { key: "success", label: "Success", confirmLabel: "적용" },
  ];

  const current = variants.find(v => v.key === variant);
  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {variants.map(v => (
          <button
            key={v.key}
            onClick={() => setVariant(v.key)}
            style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid var(--ark-color-border)", cursor: "pointer", background: "var(--ark-color-surface)" }}
          >
            {v.label}
          </button>
        ))}
      </div>
      {current && (
        <ConfirmDialog
          open={!!variant}
          onOpenChange={(o) => !o && setVariant(null)}
          variant={current.key}
          title={current.label + " 다이얼로그"}
          description={"이 작업은 되돌릴 수 없습니다. 계속하시겠습니까?"}
          confirmLabel={current.confirmLabel}
          onConfirm={() => setVariant(null)}
        />
      )}
    </>
  );
}`}
          scope={{ ConfirmDialog }}
        />
      </section>

      <section className="docs-section" id="danger-delete">
        <h2 className="section-title">삭제 확인</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
      alert("삭제 완료");
    }, 1500);
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", background: "#ef4444", color: "#fff" }}
      >
        파일 삭제
      </button>
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        variant="danger"
        title="파일을 삭제하시겠습니까?"
        description="이 파일은 영구적으로 삭제되며 복구할 수 없습니다."
        confirmLabel="삭제"
        loading={loading}
        onConfirm={handleConfirm}
      />
    </>
  );
}`}
          scope={{ ConfirmDialog }}
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
              <tr><td>open</td><td>boolean</td><td>필수</td><td>열림 상태</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>필수</td><td>열림 상태 변경 핸들러</td></tr>
              <tr><td>title</td><td>string</td><td>필수</td><td>제목</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>설명 텍스트</td></tr>
              <tr><td>onConfirm</td><td>() =&gt; void</td><td>필수</td><td>확인 버튼 클릭 핸들러</td></tr>
              <tr><td>onCancel</td><td>() =&gt; void</td><td>-</td><td>취소 버튼 클릭 핸들러</td></tr>
              <tr><td>confirmLabel</td><td>string</td><td>'확인'</td><td>확인 버튼 텍스트</td></tr>
              <tr><td>cancelLabel</td><td>string</td><td>'취소'</td><td>취소 버튼 텍스트</td></tr>
              <tr><td>variant</td><td>'default' | 'danger' | 'warning' | 'info' | 'success'</td><td>'default'</td><td>다이얼로그 변형</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>로딩 상태 (확인 버튼 스피너)</td></tr>
              <tr><td>confirmDisabled</td><td>boolean</td><td>false</td><td>확인 버튼 비활성화</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>추가 내용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
