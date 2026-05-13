import { useState } from "react";
import { TreeView } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Folder, FolderOpen, File, FileText, Image } from "lucide-react";

export function TreeViewPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TreeView</h1>
        <p className="page-description">
          계층적 트리 구조. 폴더/파일 탐색기, 조직도, 카테고리 메뉴에 활용합니다.
          확장/축소, 키보드 네비게이션, 아이콘을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [selected, setSelected] = useState(null);
  const nodes = [
    {
      id: "1", label: "문서",
      children: [
        { id: "1-1", label: "보고서.docx" },
        { id: "1-2", label: "기획서.docx" },
        { id: "1-3", label: "회의록.txt" },
      ],
    },
    {
      id: "2", label: "이미지",
      children: [
        { id: "2-1", label: "로고.png" },
        { id: "2-2", label: "배너.jpg" },
      ],
    },
    { id: "3", label: "README.md" },
  ];
  return (
    <div style={{ maxWidth: 280 }}>
      <TreeView
        nodes={nodes}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        defaultExpandedIds={["1"]}
      />
      {selected && (
        <p style={{ marginTop: 8, fontSize: 13, color: "var(--ark-color-text-secondary)" }}>
          선택: {selected}
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ TreeView, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="icons">
        <h2 className="section-title">아이콘</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [selected, setSelected] = useState(null);
  const nodes = [
    {
      id: "src", label: "src", icon: <Folder size={14} />,
      children: [
        {
          id: "components", label: "components", icon: <Folder size={14} />,
          children: [
            { id: "Button.tsx", label: "Button.tsx", icon: <FileText size={14} /> },
            { id: "Input.tsx", label: "Input.tsx", icon: <FileText size={14} /> },
          ],
        },
        { id: "index.ts", label: "index.ts", icon: <File size={14} /> },
      ],
    },
    { id: "package.json", label: "package.json", icon: <File size={14} /> },
    { id: "README.md", label: "README.md", icon: <FileText size={14} /> },
  ];
  return (
    <div style={{ maxWidth: 280 }}>
      <TreeView
        nodes={nodes}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        showIcons
        defaultExpandedIds={["src", "components"]}
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ TreeView, useState, Folder, File, FileText, Image }}
          noInline
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">제어 모드</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(["animals"]);
  const nodes = [
    {
      id: "animals", label: "동물",
      children: [
        { id: "dog", label: "강아지" },
        { id: "cat", label: "고양이" },
        {
          id: "birds", label: "새",
          children: [
            { id: "eagle", label: "독수리" },
            { id: "sparrow", label: "참새" },
          ],
        },
      ],
    },
    {
      id: "plants", label: "식물",
      children: [
        { id: "rose", label: "장미" },
        { id: "tulip", label: "튤립" },
      ],
    },
  ];
  return (
    <div style={{ maxWidth: 280 }}>
      <TreeView
        nodes={nodes}
        selectedId={selected}
        onSelect={(node) => setSelected(node.id)}
        expandedIds={expanded}
        onExpandChange={setExpanded}
      />
      <p style={{ marginTop: 8, fontSize: 12, color: "var(--ark-color-text-secondary)" }}>
        확장: [{expanded.join(", ")}]
      </p>
    </div>
  );
}
render(<Demo />)`}
          scope={{ TreeView, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="default-expanded">
        <h2 className="section-title">전체 펼치기</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const nodes = [
    {
      id: "1", label: "카테고리 A",
      children: [
        { id: "1-1", label: "항목 A-1" },
        { id: "1-2", label: "항목 A-2",
          children: [
            { id: "1-2-1", label: "하위 A-2-1" },
          ]
        },
      ],
    },
    {
      id: "2", label: "카테고리 B",
      children: [
        { id: "2-1", label: "항목 B-1" },
      ],
    },
  ];
  return (
    <div style={{ maxWidth: 280 }}>
      <TreeView nodes={nodes} defaultExpanded size="sm" />
    </div>
  );
}
render(<Demo />)`}
          scope={{ TreeView, useState }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">TreeView Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>nodes</td><td>TreeNode[]</td><td>필수</td><td>루트 노드 목록</td></tr>
              <tr><td>selectedId</td><td>string | null</td><td>-</td><td>선택된 노드 ID</td></tr>
              <tr><td>onSelect</td><td>(node: TreeNode) =&gt; void</td><td>-</td><td>선택 핸들러</td></tr>
              <tr><td>expandedIds</td><td>string[]</td><td>-</td><td>확장된 노드 ID 목록 (제어)</td></tr>
              <tr><td>onExpandChange</td><td>(ids: string[]) =&gt; void</td><td>-</td><td>확장 변경 핸들러</td></tr>
              <tr><td>defaultExpandedIds</td><td>string[]</td><td>-</td><td>초기 확장 노드 (비제어)</td></tr>
              <tr><td>defaultExpanded</td><td>boolean</td><td>false</td><td>모든 노드 기본 확장</td></tr>
              <tr><td>showIcons</td><td>boolean</td><td>true</td><td>아이콘 표시</td></tr>
              <tr><td>showLines</td><td>boolean</td><td>false</td><td>연결선 표시</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>TreeNode</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>표시 레이블 (필수)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>노드 아이콘</td></tr>
              <tr><td>children</td><td>TreeNode[]</td><td>자식 노드</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>data</td><td>unknown</td><td>추가 데이터</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
