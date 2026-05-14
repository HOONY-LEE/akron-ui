import { CookieConsent } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CookieConsentPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CookieConsent</h1>
        <p className="page-description">
          쿠키 동의 배너 컴포넌트. GDPR 등 규정 준수를 위한 쿠키 동의 UI입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="page-description" style={{ marginBottom: 16 }}>
          아래 예시는 position을 static으로 오버라이드하여 문서 내에 표시합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ position: "relative", minHeight: 100 }}>
  <CookieConsent
    style={{ position: "static" }}
    onAccept={() => alert("수락")}
    onDecline={() => alert("거부")}
  />
</div>`}
          scope={{ CookieConsent }}
        />
      </section>

      <section className="docs-section" id="card">
        <h2 className="section-title">카드 변형</h2>
        <LiveCodeBlock
          code={`<div style={{ position: "relative", minHeight: 160 }}>
  <CookieConsent
    style={{ position: "static", maxWidth: 400 }}
    variant="card"
    settingsLabel="쿠키 설정"
    onAccept={() => alert("수락")}
    onDecline={() => alert("거부")}
    onSettings={() => alert("설정")}
  />
</div>`}
          scope={{ CookieConsent }}
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
              <tr><td>title</td><td>string</td><td>'쿠키 사용 안내'</td><td>제목</td></tr>
              <tr><td>message</td><td>string</td><td>'이 웹사이트는...'</td><td>설명 메시지</td></tr>
              <tr><td>acceptLabel</td><td>string</td><td>'수락'</td><td>수락 버튼 텍스트</td></tr>
              <tr><td>declineLabel</td><td>string</td><td>'거부'</td><td>거부 버튼 텍스트</td></tr>
              <tr><td>settingsLabel</td><td>string</td><td>-</td><td>설정 버튼 텍스트</td></tr>
              <tr><td>onAccept</td><td>() =&gt; void</td><td>-</td><td>수락 핸들러</td></tr>
              <tr><td>onDecline</td><td>() =&gt; void</td><td>-</td><td>거부 핸들러</td></tr>
              <tr><td>onSettings</td><td>() =&gt; void</td><td>-</td><td>설정 핸들러</td></tr>
              <tr><td>position</td><td>'bottom' | 'bottom-left' | 'bottom-right' | 'top'</td><td>'bottom'</td><td>위치</td></tr>
              <tr><td>variant</td><td>'banner' | 'card'</td><td>'banner'</td><td>변형</td></tr>
              <tr><td>showIcon</td><td>boolean</td><td>true</td><td>아이콘 표시</td></tr>
              <tr><td>showCloseButton</td><td>boolean</td><td>false</td><td>닫기 버튼 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
