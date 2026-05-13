import { SignaturePad } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function SignaturePadPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">SignaturePad</h1>
        <p className="page-description">
          디지털 서명 패드 컴포넌트. 마우스 또는 터치로 서명을 그리고, 실행 취소 및 내보내기를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<SignaturePad width={400} height={200} />`}
          scope={{ SignaturePad }}
        />
      </section>

      <section className="docs-section" id="ref">
        <h2 className="section-title">Ref API</h2>
        <LiveCodeBlock
          code={`() => {
  const padRef = React.useRef(null);
  const [dataUrl, setDataUrl] = React.useState("");
  return (
    <div>
      <SignaturePad ref={padRef} width={400} height={150} />
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <button
          onClick={() => {
            if (padRef.current) setDataUrl(padRef.current.toDataURL());
          }}
          style={{
            padding: "6px 12px", borderRadius: 6,
            border: "1px solid var(--ark-color-border)", background: "var(--ark-color-bg)", cursor: "pointer"
          }}
        >
          미리보기
        </button>
      </div>
      {dataUrl && (
        <div style={{ marginTop: 12 }}>
          <img src={dataUrl} alt="서명" style={{ border: "1px solid var(--ark-color-border)", borderRadius: 6 }} />
        </div>
      )}
    </div>
  );
}`}
          scope={{ SignaturePad, React }}
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
              <tr><td>width</td><td>number</td><td>400</td><td>캔버스 너비</td></tr>
              <tr><td>height</td><td>number</td><td>200</td><td>캔버스 높이</td></tr>
              <tr><td>penColor</td><td>string</td><td>-</td><td>펜 색상</td></tr>
              <tr><td>penWidth</td><td>number</td><td>2</td><td>펜 두께</td></tr>
              <tr><td>backgroundColor</td><td>string</td><td>-</td><td>배경색</td></tr>
              <tr><td>onChange</td><td>(isEmpty: boolean) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>placeholder</td><td>string</td><td>'여기에 서명하세요'</td><td>플레이스홀더</td></tr>
              <tr><td>showToolbar</td><td>boolean</td><td>true</td><td>툴바 표시</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>Ref API (SignaturePadRef)</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>메서드</th><th>반환 타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>clear()</td><td>void</td><td>캔버스 초기화</td></tr>
              <tr><td>isEmpty()</td><td>boolean</td><td>빈 캔버스 여부</td></tr>
              <tr><td>toDataURL(type?, quality?)</td><td>string</td><td>PNG data URL 반환</td></tr>
              <tr><td>undo()</td><td>void</td><td>마지막 획 실행 취소</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
