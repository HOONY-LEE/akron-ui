import { DiffViewer } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const SAMPLE_DIFF = `--- a/src/utils/format.ts
+++ b/src/utils/format.ts
@@ -1,10 +1,12 @@
 export function formatDate(date: Date): string {
-  return date.toISOString().split("T")[0];
+  const y = date.getFullYear();
+  const m = String(date.getMonth() + 1).padStart(2, "0");
+  const d = String(date.getDate()).padStart(2, "0");
+  return \`\${y}-\${m}-\${d}\`;
 }

 export function formatNumber(n: number): string {
-  return n.toString();
+  return n.toLocaleString();
 }

+export function formatPercent(n: number): string {
+  return \`\${Math.round(n * 100)}%\`;
+}
`;

export function DiffViewerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">DiffViewer</h1>
        <p className="page-description">
          코드 diff 뷰어 컴포넌트. Git diff 형식의 변경 내용을 추가/삭제/변경 없음 줄로 구분해 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="unified">
        <h2 className="section-title">unified diff 파싱</h2>
        <LiveCodeBlock
          code={`const DIFF = \`--- a/src/utils/format.ts
+++ b/src/utils/format.ts
@@ -1,10 +1,12 @@
 export function formatDate(date: Date): string {
-  return date.toISOString().split("T")[0];
+  const y = date.getFullYear();
+  const m = String(date.getMonth() + 1).padStart(2, "0");
+  const d = String(date.getDate()).padStart(2, "0");
+  return \\\`\\\${y}-\\\${m}-\\\${d}\\\`;
 }

 export function formatNumber(n: number): string {
-  return n.toString();
+  return n.toLocaleString();
 }
\`;

<DiffViewer unifiedDiff={DIFF} />`}
          scope={{ DiffViewer, DIFF: SAMPLE_DIFF }}
        />
      </section>

      <section className="docs-section" id="manual">
        <h2 className="section-title">수동 DiffLine 구성</h2>
        <LiveCodeBlock
          code={`<DiffViewer
  files={[
    {
      oldFileName: "Button.tsx",
      newFileName: "Button.tsx",
      lines: [
        { type: "unchanged", content: 'import React from "react";', oldLineNumber: 1, newLineNumber: 1 },
        { type: "removed",   content: 'import styles from "./Button.css";', oldLineNumber: 2 },
        { type: "added",     content: 'import styles from "./Button.module.css";', newLineNumber: 2 },
        { type: "unchanged", content: "", oldLineNumber: 3, newLineNumber: 3 },
        { type: "unchanged", content: "export function Button({ children }) {", oldLineNumber: 4, newLineNumber: 4 },
        { type: "removed",   content: '  return <button>{children}</button>;', oldLineNumber: 5 },
        { type: "added",     content: '  return <button className={styles.root}>{children}</button>;', newLineNumber: 5 },
        { type: "unchanged", content: "}", oldLineNumber: 6, newLineNumber: 6 },
      ],
    }
  ]}
/>`}
          scope={{ DiffViewer }}
        />
      </section>

      <section className="docs-section" id="options">
        <h2 className="section-title">옵션</h2>
        <LiveCodeBlock
          code={`<DiffViewer
  unifiedDiff={DIFF}
  showLineNumbers={false}
  maxHeight={200}
  fontSize="xs"
/>`}
          scope={{ DiffViewer, DIFF: SAMPLE_DIFF }}
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
              <tr><td>files</td><td>DiffFile[]</td><td>[]</td><td>diff 파일 목록</td></tr>
              <tr><td>unifiedDiff</td><td>string</td><td>-</td><td>unified diff 문자열 (자동 파싱)</td></tr>
              <tr><td>maxHeight</td><td>number | string</td><td>480</td><td>최대 높이</td></tr>
              <tr><td>showLineNumbers</td><td>boolean</td><td>true</td><td>줄 번호 표시</td></tr>
              <tr><td>fontSize</td><td>'xs' | 'sm' | 'md'</td><td>'sm'</td><td>폰트 크기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
