import { ImageCropper } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ImageCropperPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ImageCropper</h1>
        <p className="page-description">
          이미지 크롭 컴포넌트. 이미지를 원하는 영역으로 자르고 크기를 조절합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<ImageCropper
  src="https://picsum.photos/600/400"
  onChange={(area) => console.log("크롭 영역:", area)}
  onCrop={(dataUrl) => console.log("크롭 완료")}
/>`}
          scope={{ ImageCropper }}
        />
      </section>

      <section className="docs-section" id="aspect-ratio">
        <h2 className="section-title">비율 고정</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <strong>1:1 (정사각형)</strong>
    <ImageCropper src="https://picsum.photos/600/400" aspectRatio={1} />
  </div>
  <div>
    <strong>16:9</strong>
    <ImageCropper src="https://picsum.photos/600/400" aspectRatio={16/9} />
  </div>
</div>`}
          scope={{ ImageCropper }}
        />
      </section>

      <section className="docs-section" id="circle">
        <h2 className="section-title">원형 크롭</h2>
        <LiveCodeBlock
          code={`<ImageCropper
  src="https://picsum.photos/400/400"
  shape="circle"
  aspectRatio={1}
/>`}
          scope={{ ImageCropper }}
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
              <tr><td>src</td><td>string</td><td>필수</td><td>이미지 URL</td></tr>
              <tr><td>aspectRatio</td><td>number</td><td>-</td><td>비율 (width/height)</td></tr>
              <tr><td>shape</td><td>'rect' | 'circle'</td><td>'rect'</td><td>크롭 형태</td></tr>
              <tr><td>minWidth</td><td>number</td><td>50</td><td>최소 크롭 너비</td></tr>
              <tr><td>minHeight</td><td>number</td><td>50</td><td>최소 크롭 높이</td></tr>
              <tr><td>onChange</td><td>(cropArea) =&gt; void</td><td>-</td><td>영역 변경 콜백</td></tr>
              <tr><td>onCrop</td><td>(dataUrl) =&gt; void</td><td>-</td><td>크롭 완료 콜백</td></tr>
              <tr><td>showControls</td><td>boolean</td><td>true</td><td>줌/회전 컨트롤</td></tr>
              <tr><td>showGrid</td><td>boolean</td><td>true</td><td>3분할 격자</td></tr>
              <tr><td>quality</td><td>number</td><td>0.92</td><td>출력 품질 (0-1)</td></tr>
              <tr><td>outputFormat</td><td>string</td><td>'image/png'</td><td>출력 포맷</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
