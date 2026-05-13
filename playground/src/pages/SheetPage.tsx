import { useState } from "react";
import { Sheet, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SheetPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Sheet</h1>
        <p className="page-description">
          스프레드시트 UI 컴포넌트. 셀 편집, 선택, 정렬 기능을 제공합니다.
          더블클릭으로 셀을 편집하고 Enter 키로 확정, Escape로 취소합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [data, setData] = useState([
    { name: "김민준", team: "프론트엔드", score: "92" },
    { name: "이서연", team: "백엔드", score: "88" },
    { name: "박지훈", team: "디자인", score: "95" },
    { name: "최수아", team: "PM", score: "79" },
  ]);

  const columns = [
    { key: "name", label: "이름", width: 120, sortable: true },
    { key: "team", label: "팀", width: 120, sortable: true },
    { key: "score", label: "점수", width: 80, type: "number", sortable: true },
  ];

  return (
    <Sheet
      columns={columns}
      data={data}
      onChange={setData}
    />
  );
}
render(<Demo />)`}
          scope={{ Sheet, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="custom-render">
        <h2 className="section-title">커스텀 렌더링</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const data = [
    { name: "프로젝트 Alpha", status: "진행 중", progress: "75" },
    { name: "프로젝트 Beta", status: "완료", progress: "100" },
    { name: "프로젝트 Gamma", status: "대기", progress: "0" },
    { name: "프로젝트 Delta", status: "오류", progress: "40" },
  ];

  const statusColor = {
    "진행 중": "primary",
    "완료": "success",
    "대기": "neutral",
    "오류": "error",
  };

  const columns = [
    { key: "name", label: "프로젝트", width: 180, sortable: true },
    {
      key: "status",
      label: "상태",
      width: 100,
      readOnly: true,
      render: (val) => (
        <Badge color={statusColor[val] ?? "neutral"} size="sm">{val}</Badge>
      ),
    },
    {
      key: "progress",
      label: "진행률",
      width: 100,
      readOnly: true,
      render: (val) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              flex: 1,
              height: 6,
              borderRadius: 3,
              background: "var(--ark-color-bg-muted)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: \`\${val}%\`,
                height: "100%",
                background: "var(--ark-color-primary-500)",
                borderRadius: 3,
              }}
            />
          </div>
          <span style={{ fontSize: 12, minWidth: 30 }}>{val}%</span>
        </div>
      ),
    },
  ];

  return <Sheet columns={columns} data={data} />;
}
render(<Demo />)`}
          scope={{ Sheet, Badge, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="read-only">
        <h2 className="section-title">읽기 전용</h2>
        <LiveCodeBlock
          code={`<Sheet
  readOnly
  columns={[
    { key: "product", label: "상품명", width: 160 },
    { key: "qty", label: "수량", width: 80 },
    { key: "price", label: "단가", width: 100 },
  ]}
  data={[
    { product: "노트북", qty: "10", price: "1,200,000" },
    { product: "마우스", qty: "50", price: "45,000" },
    { product: "키보드", qty: "30", price: "120,000" },
  ]}
/>`}
          scope={{ Sheet }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Sheet Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>columns</td><td>SheetColumn[]</td><td>-</td><td>컬럼 정의 (필수)</td></tr>
              <tr><td>data</td><td>T[]</td><td>-</td><td>데이터 (필수)</td></tr>
              <tr><td>onChange</td><td>(data: T[]) =&gt; void</td><td>-</td><td>데이터 변경 핸들러</td></tr>
              <tr><td>rowHeight</td><td>number</td><td>36</td><td>행 높이 (px)</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
              <tr><td>maxHeight</td><td>string | number</td><td>480</td><td>최대 높이</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>SheetColumn</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>key</td><td>string</td><td>데이터 키 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>헤더 레이블 (필수)</td></tr>
              <tr><td>width</td><td>number</td><td>컬럼 너비</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>컬럼 읽기 전용</td></tr>
              <tr><td>sortable</td><td>boolean</td><td>정렬 가능</td></tr>
              <tr><td>render</td><td>(value, row, idx) =&gt; ReactNode</td><td>커스텀 렌더러</td></tr>
              <tr><td>type</td><td>'text' | 'number'</td><td>입력 타입</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
