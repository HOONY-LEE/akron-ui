import { BrowserFrame } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BrowserFramePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">BrowserFrame</h1>
        <p className="page-description">
          브라우저 프레임 목업 컴포넌트. 스크린샷이나 데모를 브라우저 프레임 안에 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="chrome">
        <h2 className="section-title">Chrome 스타일</h2>
        <LiveCodeBlock
          code={`<BrowserFrame url="https://akron-ui.dev/components">
  <div style={{ padding: 40, textAlign: "center", background: "#f8f9fa" }}>
    <h2 style={{ margin: "0 0 8px" }}>Akron UI</h2>
    <p style={{ color: "#666", margin: 0 }}>컴포넌트 라이브러리 데모</p>
  </div>
</BrowserFrame>`}
          scope={{ BrowserFrame }}
        />
      </section>

      <section className="docs-section" id="safari">
        <h2 className="section-title">Safari 스타일</h2>
        <LiveCodeBlock
          code={`<BrowserFrame variant="safari" url="https://example.com">
  <div style={{ padding: 40, textAlign: "center", background: "#fefce8" }}>
    <p style={{ margin: 0 }}>Safari 스타일 프레임</p>
  </div>
</BrowserFrame>`}
          scope={{ BrowserFrame }}
        />
      </section>

      <section className="docs-section" id="dark">
        <h2 className="section-title">다크 프레임</h2>
        <LiveCodeBlock
          code={`<BrowserFrame dark url="https://dashboard.app">
  <div style={{ padding: 40, textAlign: "center", background: "#111", color: "#fff" }}>
    <p style={{ margin: 0 }}>다크 모드 프레임</p>
  </div>
</BrowserFrame>`}
          scope={{ BrowserFrame }}
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
              <tr><td>url</td><td>string</td><td>'https://example.com'</td><td>주소 표시줄 URL</td></tr>
              <tr><td>variant</td><td>'chrome' | 'safari' | 'minimal'</td><td>'chrome'</td><td>변형</td></tr>
              <tr><td>dark</td><td>boolean</td><td>false</td><td>다크 프레임</td></tr>
              <tr><td>shadow</td><td>boolean</td><td>true</td><td>그림자</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>내용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
