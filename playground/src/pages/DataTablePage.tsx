import { useState } from "react";
import { DataTable, Badge } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function DataTablePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DataTable</h1>
        <p className="page-description">
          고급 데이터 테이블. 전체 검색, 컬럼별 정렬, 페이지네이션, 체크박스 선택을 내장합니다.
          커스텀 셀 렌더러로 뱃지, 버튼 등 임의 컴포넌트를 표시할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const data = Array.from({ length: 30 }, (_, i) => ({
    id: String(i + 1),
    name: ["김민준", "이서연", "박지훈", "최수아", "정예린"][i % 5],
    team: ["프론트엔드", "백엔드", "디자인", "PM", "QA"][i % 5],
    score: Math.floor(60 + Math.random() * 40),
    joined: \`2024-0\${(i % 9) + 1}-01\`,
  }));

  const columns = [
    { key: "id", header: "ID", width: 60, sortable: true },
    { key: "name", header: "이름", sortable: true },
    { key: "team", header: "팀", sortable: true },
    { key: "score", header: "점수", sortable: true, align: "right" },
    { key: "joined", header: "입사일", sortable: true },
  ];

  return <DataTable data={data} columns={columns} pageSize={10} />;
}
render(<Demo />)`}
          scope={{ DataTable, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="custom-cell">
        <h2 className="section-title">커스텀 셀 렌더러</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const data = [
    { name: "프로젝트 Alpha", status: "진행 중", progress: 75, owner: "김민준" },
    { name: "프로젝트 Beta",  status: "완료",    progress: 100, owner: "이서연" },
    { name: "프로젝트 Gamma", status: "대기",    progress: 0,   owner: "박지훈" },
    { name: "프로젝트 Delta", status: "오류",    progress: 40,  owner: "최수아" },
  ];

  const statusColor = { "진행 중": "primary", "완료": "success", "대기": "neutral", "오류": "error" };

  const columns = [
    { key: "name", header: "프로젝트", sortable: true },
    {
      key: "status",
      header: "상태",
      width: 100,
      cell: (val) => (
        <Badge color={statusColor[val] ?? "neutral"} size="sm">{val}</Badge>
      ),
    },
    {
      key: "progress",
      header: "진행률",
      width: 160,
      sortable: true,
      align: "right",
      cell: (val) => (
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--ark-color-bg-muted)" }}>
            <div style={{ width: val + "%", height: "100%", borderRadius: 3, background: "var(--ark-color-primary-500)" }} />
          </div>
          <span style={{ fontSize: 12, minWidth: 36, textAlign: "right" }}>{val}%</span>
        </div>
      ),
    },
    { key: "owner", header: "담당자" },
  ];

  return <DataTable data={data} columns={columns} searchable={false} />;
}
render(<Demo />)`}
          scope={{ DataTable, Badge, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="selectable">
        <h2 className="section-title">체크박스 선택</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [selected, setSelected] = useState([]);
  const data = [
    { id: "1", name: "홍길동", email: "hong@example.com" },
    { id: "2", name: "김철수", email: "kim@example.com" },
    { id: "3", name: "이영희", email: "lee@example.com" },
    { id: "4", name: "박민준", email: "park@example.com" },
  ];
  const columns = [
    { key: "id", header: "ID", width: 60 },
    { key: "name", header: "이름" },
    { key: "email", header: "이메일" },
  ];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <DataTable
        data={data}
        columns={columns}
        selectable
        selectedRows={selected}
        onSelectionChange={setSelected}
        searchable={false}
      />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        선택된 행: {selected.length > 0 ? selected.map(i => data[i]?.name).join(", ") : "없음"}
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ DataTable, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="options">
        <h2 className="section-title">옵션</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const data = Array.from({ length: 6 }, (_, i) => ({
    product: ["노트북", "마우스", "키보드", "모니터", "웹캠", "헤드셋"][i],
    qty: String((i + 1) * 10),
    price: String((i + 1) * 50000),
  }));
  const columns = [
    { key: "product", header: "상품명" },
    { key: "qty", header: "수량", align: "right", sortable: true },
    { key: "price", header: "단가", align: "right", sortable: true },
  ];
  return (
    <DataTable
      data={data}
      columns={columns}
      striped
      hoverable
      dense
      searchable={false}
      pageSize={10}
    />
  );
}
render(<Demo />)`}
          scope={{ DataTable, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">DataTable Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>data</td><td>T[]</td><td>필수</td><td>데이터 목록</td></tr>
              <tr><td>columns</td><td>DataTableColumn[]</td><td>필수</td><td>컬럼 정의</td></tr>
              <tr><td>searchable</td><td>boolean</td><td>true</td><td>전체 검색 활성화</td></tr>
              <tr><td>pageSize</td><td>number</td><td>10</td><td>페이지 크기</td></tr>
              <tr><td>pageSizeOptions</td><td>number[]</td><td>[10,20,50,100]</td><td>페이지 크기 선택 옵션</td></tr>
              <tr><td>selectable</td><td>boolean</td><td>false</td><td>체크박스 선택 활성화</td></tr>
              <tr><td>selectedRows</td><td>number[]</td><td>-</td><td>선택된 행 인덱스 (제어)</td></tr>
              <tr><td>onSelectionChange</td><td>(indices: number[]) =&gt; void</td><td>-</td><td>선택 변경 핸들러</td></tr>
              <tr><td>onRowClick</td><td>(row, index) =&gt; void</td><td>-</td><td>행 클릭 핸들러</td></tr>
              <tr><td>striped</td><td>boolean</td><td>false</td><td>줄무늬 행</td></tr>
              <tr><td>hoverable</td><td>boolean</td><td>true</td><td>호버 하이라이트</td></tr>
              <tr><td>dense</td><td>boolean</td><td>false</td><td>조밀한 행 높이</td></tr>
              <tr><td>loading</td><td>boolean</td><td>false</td><td>로딩 상태</td></tr>
              <tr><td>maxHeight</td><td>string | number</td><td>-</td><td>최대 높이 (스크롤)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>DataTableColumn</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>key</td><td>string</td><td>데이터 키 (필수)</td></tr>
              <tr><td>header</td><td>string</td><td>헤더 레이블 (필수)</td></tr>
              <tr><td>cell</td><td>(value, row, idx) =&gt; ReactNode</td><td>커스텀 셀 렌더러</td></tr>
              <tr><td>sortable</td><td>boolean</td><td>정렬 가능</td></tr>
              <tr><td>filterable</td><td>boolean</td><td>검색 포함 여부 (기본 true)</td></tr>
              <tr><td>width</td><td>string | number</td><td>컬럼 너비</td></tr>
              <tr><td>align</td><td>'left' | 'center' | 'right'</td><td>텍스트 정렬</td></tr>
              <tr><td>sortFn</td><td>(a, b, dir) =&gt; number</td><td>커스텀 정렬 함수</td></tr>
              <tr><td>filterFn</td><td>(value, text) =&gt; boolean</td><td>커스텀 필터 함수</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
