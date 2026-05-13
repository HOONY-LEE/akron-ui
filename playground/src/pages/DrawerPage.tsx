import { useState } from "react";
import { Drawer, Button, Stack } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DrawerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Drawer</h1>
        <p className="page-description">
          사이드 드로어. 화면 가장자리에서 슬라이드로 열리는 패널 컴포넌트.
          상/하/좌/우 4방향, 제목·설명·푸터 영역을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>드로어 열기</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="드로어 제목"
        description="드로어 설명입니다. 상세한 내용을 여기에 작성하세요."
        footer={
          <Stack direction="horizontal" gap={8}>
            <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </Stack>
        }
      >
        <p>드로어 본문 콘텐츠입니다.</p>
      </Drawer>
    </>
  );
}
render(<Demo />)`}
          scope={{ Drawer, Button, Stack, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="placement">
        <h2 className="section-title">방향</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [placement, setPlacement] = useState(null);
  const placements = ["right", "left", "bottom", "top"];
  return (
    <>
      <Stack direction="horizontal" gap={8} wrap>
        {placements.map((p) => (
          <Button key={p} variant="outline" onClick={() => setPlacement(p)}>
            {p}
          </Button>
        ))}
      </Stack>
      {placements.map((p) => (
        <Drawer
          key={p}
          open={placement === p}
          onOpenChange={(v) => !v && setPlacement(null)}
          placement={p}
          title={p + " 드로어"}
        >
          <p>{p} 방향에서 열립니다.</p>
        </Drawer>
      ))}
    </>
  );
}
render(<Demo />)`}
          scope={{ Drawer, Button, Stack, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [size, setSize] = useState(null);
  const sizes = ["sm", "md", "lg", "full"];
  return (
    <>
      <Stack direction="horizontal" gap={8} wrap>
        {sizes.map((s) => (
          <Button key={s} variant="outline" onClick={() => setSize(s)}>
            {s}
          </Button>
        ))}
      </Stack>
      {sizes.map((s) => (
        <Drawer
          key={s}
          open={size === s}
          onOpenChange={(v) => !v && setSize(null)}
          size={s}
          title={s + " 크기"}
        >
          <p>width가 {s}인 드로어입니다.</p>
        </Drawer>
      ))}
    </>
  );
}
render(<Demo />)`}
          scope={{ Drawer, Button, Stack, useState }}
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
              <tr><td>open</td><td>boolean</td><td>필수</td><td>열림 상태</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>필수</td><td>열림 상태 변경 핸들러</td></tr>
              <tr><td>placement</td><td>'right' | 'left' | 'top' | 'bottom'</td><td>'right'</td><td>열리는 방향</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg' | 'full'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>헤더 제목</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>헤더 설명</td></tr>
              <tr><td>showClose</td><td>boolean</td><td>true</td><td>닫기 버튼 표시</td></tr>
              <tr><td>closeOnOverlay</td><td>boolean</td><td>true</td><td>오버레이 클릭으로 닫기</td></tr>
              <tr><td>footer</td><td>ReactNode</td><td>-</td><td>하단 고정 영역</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
