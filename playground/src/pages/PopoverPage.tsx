import { useState } from "react";
import { Popover, Button, Input, Avatar } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PopoverPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Popover</h1>
        <p className="page-description">
          팝오버 컴포넌트. 클릭 시 요소 근처에 추가 콘텐츠를 표시합니다.
          다양한 방향과 정렬, 풍부한 콘텐츠를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Popover
  trigger={<Button variant="outline">팝오버 열기</Button>}
>
  <div style={{ fontSize: 14, lineHeight: 1.6 }}>
    <strong>팝오버 제목</strong>
    <p style={{ margin: "8px 0 0", color: "var(--ark-color-text-secondary)" }}>
      이곳에 추가 정보나 액션을 배치할 수 있습니다.
    </p>
  </div>
</Popover>`}
          scope={{ Popover, Button }}
        />
      </section>

      <section className="docs-section" id="sides">
        <h2 className="section-title">방향</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
  {["top", "bottom", "left", "right"].map((side) => (
    <Popover
      key={side}
      side={side}
      trigger={<Button variant="outline" size="sm">{side}</Button>}
    >
      <span style={{ fontSize: 13 }}>{side} 방향 팝오버</span>
    </Popover>
  ))}
</div>`}
          scope={{ Popover, Button }}
        />
      </section>

      <section className="docs-section" id="rich">
        <h2 className="section-title">리치 콘텐츠</h2>
        <LiveCodeBlock
          code={`<Popover
  trigger={
    <button
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 10px",
        border: "1px solid var(--ark-color-border)",
        borderRadius: 6,
        background: "none",
        cursor: "pointer",
        fontSize: 14,
      }}
    >
      <Avatar name="김지수" size="sm" />
      <span>프로필 보기</span>
    </button>
  }
  width={240}
>
  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <Avatar name="김지수" size="md" />
      <div>
        <div style={{ fontWeight: 600, fontSize: 14 }}>김지수</div>
        <div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>
          jisu@example.com
        </div>
      </div>
    </div>
    <div
      style={{
        borderTop: "1px solid var(--ark-color-border)",
        paddingTop: 12,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <button style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontSize: 13 }}>
        프로필 편집
      </button>
      <button style={{ textAlign: "left", background: "none", border: "none", cursor: "pointer", padding: "4px 0", fontSize: 13, color: "var(--ark-color-error-500)" }}>
        로그아웃
      </button>
    </div>
  </div>
</Popover>`}
          scope={{ Popover, Button, Avatar }}
        />
      </section>

      <section className="docs-section" id="form">
        <h2 className="section-title">폼 팝오버</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
      trigger={<Button variant="outline">이름 변경</Button>}
      width={260}
      showClose
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontWeight: 600, fontSize: 14 }}>이름 변경</div>
        <Input
          placeholder="새 이름 입력"
          size="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
            취소
          </Button>
          <Button size="sm" onClick={() => setOpen(false)}>
            저장
          </Button>
        </div>
      </div>
    </Popover>
  );
}
render(<Demo />)`}
          scope={{ Popover, Button, Input, Avatar, useState }}
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
              <tr><td>trigger</td><td>ReactElement</td><td>-</td><td>트리거 요소 (필수)</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>-</td><td>팝오버 콘텐츠 (필수)</td></tr>
              <tr><td>side</td><td>'top' | 'right' | 'bottom' | 'left'</td><td>'bottom'</td><td>표시 방향</td></tr>
              <tr><td>align</td><td>'start' | 'center' | 'end'</td><td>'start'</td><td>정렬</td></tr>
              <tr><td>sideOffset</td><td>number</td><td>8</td><td>트리거와의 간격</td></tr>
              <tr><td>showClose</td><td>boolean</td><td>false</td><td>닫기 버튼 표시</td></tr>
              <tr><td>width</td><td>string | number</td><td>-</td><td>팝오버 너비</td></tr>
              <tr><td>open</td><td>boolean</td><td>-</td><td>열림 상태 제어</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>-</td><td>열림 상태 변경 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
