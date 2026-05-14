import { FilePreview } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FilePreviewPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FilePreview</h1>
        <p className="page-description">
          파일 미리보기 카드 컴포넌트. 파일 유형별 아이콘과 정보를 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="card">
        <h2 className="section-title">카드 변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <FilePreview name="보고서.pdf" type="application/pdf" size={2048000} onDownload={() => {}} onDelete={() => {}} />
  <FilePreview name="프로필.png" type="image/png" size={512000} onPreview={() => {}} onDelete={() => {}} />
  <FilePreview name="데이터.xlsx" type="application/vnd.ms-excel" size={1024000} onDownload={() => {}} />
  <FilePreview name="프로젝트.zip" type="application/zip" size={10240000} onDownload={() => {}} />
</div>`}
          scope={{ FilePreview }}
        />
      </section>

      <section className="docs-section" id="list">
        <h2 className="section-title">리스트 변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <FilePreview variant="list" name="계약서_최종.pdf" type="application/pdf" size={3200000} onDownload={() => {}} onDelete={() => {}} />
  <FilePreview variant="list" name="회의록_0514.docx" type="text/plain" size={45000} onDownload={() => {}} />
  <FilePreview variant="list" name="배경음악.mp3" type="audio/mpeg" size={8500000} onDownload={() => {}} />
</div>`}
          scope={{ FilePreview }}
        />
      </section>

      <section className="docs-section" id="compact">
        <h2 className="section-title">컴팩트 변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
  <FilePreview variant="compact" name="스크린샷.png" type="image/png" size={256000} />
  <FilePreview variant="compact" name="로그.txt" type="text/plain" size={12000} />
  <FilePreview variant="compact" name="동영상.mp4" type="video/mp4" size={52400000} />
</div>`}
          scope={{ FilePreview }}
        />
      </section>

      <section className="docs-section" id="states">
        <h2 className="section-title">상태</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
  <FilePreview name="업로드중.pdf" type="application/pdf" size={5000000} progress={65} />
  <FilePreview name="실패.xlsx" type="application/vnd.ms-excel" size={1024000} error="업로드에 실패했습니다" />
</div>`}
          scope={{ FilePreview }}
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
              <tr><td>name</td><td>string</td><td>필수</td><td>파일 이름</td></tr>
              <tr><td>size</td><td>number</td><td>-</td><td>파일 크기 (bytes)</td></tr>
              <tr><td>type</td><td>string</td><td>-</td><td>MIME 타입 또는 확장자</td></tr>
              <tr><td>thumbnail</td><td>string</td><td>-</td><td>미리보기 이미지 URL</td></tr>
              <tr><td>variant</td><td>'card' | 'list' | 'compact'</td><td>'card'</td><td>변형</td></tr>
              <tr><td>fileSize</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>컴포넌트 크기</td></tr>
              <tr><td>onDownload</td><td>() =&gt; void</td><td>-</td><td>다운로드 콜백</td></tr>
              <tr><td>onDelete</td><td>() =&gt; void</td><td>-</td><td>삭제 콜백</td></tr>
              <tr><td>onPreview</td><td>() =&gt; void</td><td>-</td><td>미리보기 콜백</td></tr>
              <tr><td>progress</td><td>number</td><td>-</td><td>업로드 진행률 (0-100)</td></tr>
              <tr><td>error</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
