import { Button, Card, Input, Stack } from "@sunghoon_lee/akron-ui";
import { CodeBlock } from "../components/CodeBlock";
import { Palette, Moon, Accessibility, Package, LayoutGrid, Settings } from "lucide-react";

export function OverviewPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Akron UI</h1>
        <p className="page-description">
          기업용 그룹웨어/ERP 제품을 위한 React 컴포넌트 라이브러리입니다.
          일관된 디자인 토큰 시스템, 접근성, 다크모드를 기본 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="features">
        <h2 className="section-title">특징</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><Palette size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>디자인 토큰</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                CSS 변수 기반 토큰으로 색상, 타이포그래피, 간격을 체계적으로 관리합니다.
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><Moon size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>다크모드</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                <code className="inline-code">data-theme="dark"</code> 속성만으로 전체 테마를 전환합니다.
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><Accessibility size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>접근성</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                Radix UI 기반의 접근성 지원과 focus-visible 상태를 기본 제공합니다.
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><Package size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>트리셰이킹</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                ESM + CJS 듀얼 빌드로 사용하지 않는 코드를 자동 제거합니다.
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><LayoutGrid size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>레이아웃 시스템</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                AppShell, Header, Sidebar 등 그룹웨어에 최적화된 레이아웃 컴포넌트를 제공합니다.
              </div>
            </div>
          </Card>
          <Card>
            <div style={{ padding: 20 }}>
              <div style={{ marginBottom: 10, color: "var(--ark-color-primary-500)" }}><Settings size={22} /></div>
              <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>커스터마이징</div>
              <div style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", lineHeight: 1.6 }}>
                컴포넌트별 CSS 변수를 오버라이드하여 디자인을 자유롭게 조정할 수 있습니다.
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="docs-section" id="install">
        <h2 className="section-title">설치</h2>
        <CodeBlock>{`pnpm add @sunghoon_lee/akron-ui`}</CodeBlock>
        <p className="section-desc" style={{ marginTop: 12 }}>
          피어 의존성으로 <code className="inline-code">react</code>와{" "}
          <code className="inline-code">react-dom</code> 18 이상이 필요합니다.
        </p>
      </section>

      <section className="docs-section" id="quickstart">
        <h2 className="section-title">빠른 시작</h2>
        <p className="section-desc">
          토큰 CSS를 임포트하고 컴포넌트를 사용하세요.
        </p>
        <CodeBlock>{`import "@sunghoon_lee/akron-ui/tokens.css";
import { Button, Input, Card } from "@sunghoon_lee/akron-ui";

function App() {
  return (
    <Card>
      <Input label="이름" placeholder="이름을 입력하세요" />
      <Button variant="primary">제출</Button>
    </Card>
  );
}`}</CodeBlock>
        <div className="example-label" style={{ marginTop: 24 }}>미리보기</div>
        <div className="preview-box left">
          <Card>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
              <Input label="이름" placeholder="이름을 입력하세요" />
              <Stack direction="horizontal" gap={8} justify="end">
                <Button variant="outline">취소</Button>
                <Button variant="primary">제출</Button>
              </Stack>
            </div>
          </Card>
        </div>
      </section>

      <section className="docs-section" id="darkmode">
        <h2 className="section-title">다크모드</h2>
        <p className="section-desc">
          루트 요소에 <code className="inline-code">data-theme</code> 속성을 설정하면
          모든 토큰이 자동으로 전환됩니다.
        </p>
        <CodeBlock>{`// 다크모드 활성화
document.documentElement.setAttribute("data-theme", "dark");

// 라이트모드 복원
document.documentElement.setAttribute("data-theme", "light");`}</CodeBlock>
      </section>

      <section className="docs-section" id="structure">
        <h2 className="section-title">구성</h2>
        <p className="section-desc">
          Akron UI는 다음과 같은 카테고리로 구성되어 있습니다.
        </p>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>카테고리</th><th>항목</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>파운데이션</td><td>Colors, Typography, Spacing</td><td>디자인 토큰과 시각적 기반 요소</td></tr>
              <tr><td>레이아웃</td><td>AppShell, Header, Sidebar, Footer, PageContainer, Stack</td><td>페이지 구조를 잡는 레이아웃 컴포넌트</td></tr>
              <tr><td>컴포넌트</td><td>Button, Input, Card, Table, Modal, Toast</td><td>UI 인터랙션을 위한 기본 컴포넌트</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
