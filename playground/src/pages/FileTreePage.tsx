import { FileTree } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import type { FileTreeNode } from "@sunghoon_lee/akron-ui";

const SAMPLE_TREE: FileTreeNode[] = [
  {
    id: "src",
    name: "src",
    type: "folder",
    children: [
      {
        id: "components",
        name: "components",
        type: "folder",
        children: [
          {
            id: "button",
            name: "Button",
            type: "folder",
            children: [
              { id: "button-tsx", name: "Button.tsx", type: "file", status: "modified" },
              { id: "button-css", name: "Button.module.css", type: "file" },
              { id: "button-idx", name: "index.ts", type: "file" },
            ],
          },
          {
            id: "input",
            name: "Input",
            type: "folder",
            children: [
              { id: "input-tsx", name: "Input.tsx", type: "file" },
              { id: "input-css", name: "Input.module.css", type: "file" },
            ],
          },
        ],
      },
      { id: "app-tsx", name: "App.tsx", type: "file" },
      { id: "main-tsx", name: "main.tsx", type: "file", status: "added" },
      { id: "index-css", name: "index.css", type: "file" },
    ],
  },
  {
    id: "public",
    name: "public",
    type: "folder",
    children: [
      { id: "favicon", name: "favicon.ico", type: "file" },
      { id: "logo", name: "logo.svg", type: "file" },
    ],
  },
  { id: "package", name: "package.json", type: "file" },
  { id: "tsconfig", name: "tsconfig.json", type: "file" },
  { id: "readme", name: "README.md", type: "file" },
  { id: "deleted", name: ".env.old", type: "file", status: "deleted" },
];

export function FileTreePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FileTree</h1>
        <p className="page-description">
          파일 시스템 트리 뷰어. 프로젝트 구조, 디렉터리 브라우저, diff 파일 목록 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<FileTree
  nodes={[
    {
      id: "src", name: "src", type: "folder",
      children: [
        {
          id: "components", name: "components", type: "folder",
          children: [
            { id: "btn", name: "Button.tsx", type: "file", status: "modified" },
            { id: "inp", name: "Input.tsx",  type: "file" },
          ],
        },
        { id: "app",  name: "App.tsx",   type: "file" },
        { id: "main", name: "main.tsx",  type: "file", status: "added" },
      ],
    },
    { id: "pkg", name: "package.json", type: "file" },
    { id: "del", name: ".env.old",     type: "file", status: "deleted" },
  ]}
  defaultExpanded={new Set(["src", "components"])}
/>`}
          scope={{ FileTree }}
        />
      </section>

      <section className="docs-section" id="selectable">
        <h2 className="section-title">선택 가능한 파일 트리</h2>
        <LiveCodeBlock
          code={`() => {
  const [selected, setSelected] = React.useState("btn");
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, padding: 8, minWidth: 200 }}>
        <FileTree
          nodes={[
            {
              id: "src", name: "src", type: "folder",
              children: [
                { id: "btn", name: "Button.tsx", type: "file" },
                { id: "inp", name: "Input.tsx",  type: "file" },
                { id: "crd", name: "Card.tsx",   type: "file" },
              ],
            },
          ]}
          defaultExpanded={new Set(["src"])}
          selected={selected}
          onSelect={(node) => node.type === "file" && setSelected(node.id)}
        />
      </div>
      <div style={{ fontSize: 14, color: "var(--ark-color-text-secondary)", padding: 8 }}>
        선택: <strong style={{ color: "var(--ark-color-text)" }}>{selected}</strong>
      </div>
    </div>
  );
}`}
          scope={{ FileTree, React }}
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
              <tr><td>nodes</td><td>FileTreeNode[]</td><td>필수</td><td>트리 노드 목록</td></tr>
              <tr><td>defaultExpanded</td><td>Set&lt;string&gt;</td><td>new Set()</td><td>초기 열린 폴더 id</td></tr>
              <tr><td>expanded</td><td>Set&lt;string&gt;</td><td>-</td><td>controlled 열린 폴더 id</td></tr>
              <tr><td>onExpandChange</td><td>(expanded: Set&lt;string&gt;) =&gt; void</td><td>-</td><td>폴더 열림/닫힘 콜백</td></tr>
              <tr><td>selected</td><td>string</td><td>-</td><td>선택된 노드 id</td></tr>
              <tr><td>onSelect</td><td>(node: FileTreeNode) =&gt; void</td><td>-</td><td>노드 클릭 콜백</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>indent</td><td>number</td><td>12</td><td>들여쓰기 px</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>FileTreeNode</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>name</td><td>string</td><td>파일/폴더 이름 (필수)</td></tr>
              <tr><td>type</td><td>'file' | 'folder'</td><td>노드 타입 (필수)</td></tr>
              <tr><td>children</td><td>FileTreeNode[]</td><td>자식 노드 (폴더만)</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>커스텀 아이콘</td></tr>
              <tr><td>status</td><td>'modified' | 'added' | 'deleted' | 'renamed'</td><td>git 상태 뱃지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
