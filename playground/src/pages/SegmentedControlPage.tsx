import { useState } from "react";
import { SegmentedControl } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { List, Grid, BarChart2, Sun, Moon, Monitor } from "lucide-react";

export function SegmentedControlPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">SegmentedControl</h1>
        <p className="page-description">
          버튼 그룹 토글. 여러 옵션 중 하나를 선택하는 라디오 그룹의 시각적 대안입니다.
          슬라이딩 인디케이터로 부드러운 전환을 제공합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [view, setView] = useState("list");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SegmentedControl
        value={view}
        onChange={setView}
        options={[
          { value: "list", label: "목록" },
          { value: "grid", label: "그리드" },
          { value: "chart", label: "차트" },
        ]}
      />
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
        현재 보기: <b>{view}</b>
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ SegmentedControl, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="icons">
        <h2 className="section-title">아이콘</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [view, setView] = useState("list");
  return (
    <SegmentedControl
      value={view}
      onChange={setView}
      options={[
        { value: "list", label: "목록", icon: <List size={14} /> },
        { value: "grid", label: "그리드", icon: <Grid size={14} /> },
        { value: "chart", label: "차트", icon: <BarChart2 size={14} /> },
      ]}
    />
  );
}
render(<Demo />)`}
          scope={{ SegmentedControl, useState, List, Grid, BarChart2 }}
          noInline
        />
      </section>

      <section className="docs-section" id="icon-only">
        <h2 className="section-title">아이콘만</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [theme, setTheme] = useState("system");
  return (
    <SegmentedControl
      value={theme}
      onChange={setTheme}
      options={[
        { value: "light", label: "", icon: <Sun size={16} /> },
        { value: "system", label: "", icon: <Monitor size={16} /> },
        { value: "dark", label: "", icon: <Moon size={16} /> },
      ]}
    />
  );
}
render(<Demo />)`}
          scope={{ SegmentedControl, useState, Sun, Moon, Monitor }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const options = [
    { value: "a", label: "옵션 A" },
    { value: "b", label: "옵션 B" },
    { value: "c", label: "옵션 C" },
  ];
  const [v1, setV1] = useState("a");
  const [v2, setV2] = useState("a");
  const [v3, setV3] = useState("a");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <SegmentedControl size="sm" options={options} value={v1} onChange={setV1} />
      <SegmentedControl size="md" options={options} value={v2} onChange={setV2} />
      <SegmentedControl size="lg" options={options} value={v3} onChange={setV3} />
    </div>
  );
}
render(<Demo />)`}
          scope={{ SegmentedControl, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="full-width">
        <h2 className="section-title">전체 너비</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [tab, setTab] = useState("overview");
  return (
    <SegmentedControl
      fullWidth
      value={tab}
      onChange={setTab}
      options={[
        { value: "overview", label: "개요" },
        { value: "analytics", label: "분석" },
        { value: "reports", label: "보고서" },
        { value: "settings", label: "설정" },
      ]}
    />
  );
}
render(<Demo />)`}
          scope={{ SegmentedControl, useState }}
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
              <tr><td>options</td><td>SegmentedControlOption[]</td><td>필수</td><td>옵션 목록</td></tr>
              <tr><td>value</td><td>string</td><td>-</td><td>선택된 값 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>첫 번째 옵션</td><td>초기 값 (비제어)</td></tr>
              <tr><td>onChange</td><td>(value: string) =&gt; void</td><td>-</td><td>선택 변경 핸들러</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>전체 비활성화</td></tr>
              <tr><td>fullWidth</td><td>boolean</td><td>false</td><td>컨테이너 전체 너비</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>SegmentedControlOption</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>string</td><td>옵션 값 (필수)</td></tr>
              <tr><td>label</td><td>ReactNode</td><td>레이블 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>아이콘 (레이블 왼쪽)</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>개별 비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
