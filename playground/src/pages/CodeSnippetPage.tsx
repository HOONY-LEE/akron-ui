import { CodeSnippet } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CodeSnippetPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CodeSnippet</h1>
        <p className="page-description">
          코드 스니펫 컴포넌트. 복사 버튼, 줄 번호, 언어 레이블을 갖춘 코드 표시 블록입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<CodeSnippet
  language="tsx"
  code={\`import { Button } from "@sunghoon_lee/akron-ui";

export function App() {
  return <Button variant="primary">Hello Akron</Button>;
}\`}
/>`}
          scope={{ CodeSnippet }}
        />
      </section>

      <section className="docs-section" id="with-filename">
        <h2 className="section-title">파일명과 함께</h2>
        <LiveCodeBlock
          code={`<CodeSnippet
  filename="components/Button.tsx"
  showLineNumbers
  code={\`import React from "react";
import styles from "./Button.module.css";

export interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = ({ variant = "primary", children }: ButtonProps) => (
  <button className={[styles.root, styles[variant]].join(" ")}>
    {children}
  </button>
);\`}
/>`}
          scope={{ CodeSnippet }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <CodeSnippet
    variant="filled"
    language="bash"
    code="pnpm install @sunghoon_lee/akron-ui"
  />
  <CodeSnippet
    variant="outline"
    language="bash"
    code="pnpm install @sunghoon_lee/akron-ui"
  />
  <CodeSnippet
    variant="minimal"
    language="bash"
    code="pnpm install @sunghoon_lee/akron-ui"
  />
</div>`}
          scope={{ CodeSnippet }}
        />
      </section>

      <section className="docs-section" id="max-lines">
        <h2 className="section-title">최대 줄 수 (접기/펼치기)</h2>
        <LiveCodeBlock
          code={`<CodeSnippet
  filename="tokens.css"
  maxLines={5}
  showLineNumbers
  code={\`:root {
  --ark-color-primary: #6366f1;
  --ark-color-primary-50: #eef2ff;
  --ark-color-primary-100: #e0e7ff;
  --ark-color-primary-200: #c7d2fe;
  --ark-color-primary-300: #a5b4fc;
  --ark-color-primary-400: #818cf8;
  --ark-color-primary-500: #6366f1;
  --ark-color-primary-600: #4f46e5;
  --ark-color-primary-700: #4338ca;
  --ark-color-primary-800: #3730a3;
  --ark-color-primary-900: #312e81;
}\`}
/>`}
          scope={{ CodeSnippet }}
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
              <tr><td>code</td><td>string</td><td>필수</td><td>코드 내용</td></tr>
              <tr><td>language</td><td>string</td><td>-</td><td>언어 레이블 (헤더 표시)</td></tr>
              <tr><td>filename</td><td>string</td><td>-</td><td>파일명 (헤더 표시)</td></tr>
              <tr><td>showCopy</td><td>boolean</td><td>true</td><td>복사 버튼 표시</td></tr>
              <tr><td>showLineNumbers</td><td>boolean</td><td>false</td><td>줄 번호 표시</td></tr>
              <tr><td>maxLines</td><td>number</td><td>-</td><td>최대 표시 줄 수</td></tr>
              <tr><td>variant</td><td>'filled' | 'outline' | 'minimal'</td><td>'filled'</td><td>변형 (filled=다크테마)</td></tr>
              <tr><td>onCopy</td><td>(code: string) =&gt; void</td><td>-</td><td>복사 완료 콜백</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
