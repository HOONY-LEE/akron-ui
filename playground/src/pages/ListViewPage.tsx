import { useState } from "react";
import { ListView, Avatar, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ListViewPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ListView</h1>
        <p className="page-description">
          카드형/리스트형 뷰 전환 컴포넌트. 데이터를 그리드 또는 리스트 형태로 표시합니다.
          상단 토글 버튼으로 뷰 모드를 전환할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [mode, setMode] = useState("list");
  const items = [
    { id: 1, name: "김민준", role: "프론트엔드", status: "online" },
    { id: 2, name: "이서연", role: "백엔드", status: "offline" },
    { id: 3, name: "박지훈", role: "디자이너", status: "online" },
    { id: 4, name: "최수아", role: "PM", status: "away" },
    { id: 5, name: "정도윤", role: "DevOps", status: "online" },
    { id: 6, name: "한예은", role: "QA", status: "offline" },
  ];

  return (
    <ListView
      items={items}
      mode={mode}
      onModeChange={setMode}
      gridCols={3}
      renderCard={(item) => (
        <div
          style={{
            padding: 16,
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            textAlign: "center",
          }}
        >
          <Avatar name={item.name} size="md" />
          <div>
            <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>{item.role}</div>
          </div>
          <Badge
            color={item.status === "online" ? "success" : item.status === "away" ? "warning" : "neutral"}
            size="sm"
          >
            {item.status}
          </Badge>
        </div>
      )}
      renderRow={(item) => (
        <div
          style={{
            padding: "10px 14px",
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <Avatar name={item.name} size="sm" />
          <div style={{ flex: 1 }}>
            <span style={{ fontWeight: 500, fontSize: 14 }}>{item.name}</span>
            <span style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginLeft: 8 }}>{item.role}</span>
          </div>
          <Badge
            color={item.status === "online" ? "success" : item.status === "away" ? "warning" : "neutral"}
            size="sm"
          >
            {item.status}
          </Badge>
        </div>
      )}
    />
  );
}
render(<Demo />)`}
          scope={{ ListView, Avatar, Badge, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="empty">
        <h2 className="section-title">빈 상태</h2>
        <LiveCodeBlock
          code={`<ListView
  items={[]}
  renderCard={() => null}
  renderRow={() => null}
  empty={
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 32 }}>📭</span>
      <span>검색 결과가 없습니다</span>
    </div>
  }
/>`}
          scope={{ ListView }}
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
              <tr><td>items</td><td>T[]</td><td>-</td><td>데이터 목록 (필수)</td></tr>
              <tr><td>renderCard</td><td>(item: T, idx: number) =&gt; ReactNode</td><td>-</td><td>그리드 카드 렌더러 (필수)</td></tr>
              <tr><td>renderRow</td><td>(item: T, idx: number) =&gt; ReactNode</td><td>-</td><td>리스트 행 렌더러 (필수)</td></tr>
              <tr><td>mode</td><td>'list' | 'grid'</td><td>'list'</td><td>현재 뷰 모드</td></tr>
              <tr><td>onModeChange</td><td>(mode) =&gt; void</td><td>-</td><td>모드 변경 핸들러</td></tr>
              <tr><td>gridCols</td><td>2 | 3 | 4</td><td>3</td><td>그리드 컬럼 수</td></tr>
              <tr><td>toolbar</td><td>ReactNode</td><td>-</td><td>툴바 좌측 추가 요소</td></tr>
              <tr><td>empty</td><td>ReactNode</td><td>'데이터가 없습니다.'</td><td>빈 상태 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
