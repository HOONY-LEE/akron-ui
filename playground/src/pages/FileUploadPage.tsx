import { FileUpload } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FileUploadPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FileUpload</h1>
        <p className="page-description">
          파일 업로드 컴포넌트. 드래그앤드롭과 클릭 업로드를 지원합니다.
          파일 형식 제한, 크기 제한, 다중 업로드, 미리보기를 제공합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<FileUpload
  onChange={(files) => console.log("업로드된 파일:", files)}
  style={{ maxWidth: 480 }}
/>`}
          scope={{ FileUpload }}
        />
      </section>

      <section className="docs-section" id="image">
        <h2 className="section-title">이미지 업로드</h2>
        <LiveCodeBlock
          code={`<FileUpload
  accept="image/*"
  multiple
  onChange={(files) => console.log(files)}
  style={{ maxWidth: 480 }}
/>`}
          scope={{ FileUpload }}
        />
      </section>

      <section className="docs-section" id="size-limit">
        <h2 className="section-title">크기 제한</h2>
        <LiveCodeBlock
          code={`<FileUpload
  accept=".pdf,.docx,.xlsx"
  maxSize={5 * 1024 * 1024}
  multiple
  onChange={(files) => console.log(files)}
  style={{ maxWidth: 480 }}
/>`}
          scope={{ FileUpload }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<FileUpload
  disabled
  style={{ maxWidth: 480 }}
/>`}
          scope={{ FileUpload }}
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
              <tr><td>accept</td><td>string</td><td>-</td><td>허용 파일 형식 (예: "image/*", ".pdf")</td></tr>
              <tr><td>multiple</td><td>boolean</td><td>false</td><td>다중 파일 허용</td></tr>
              <tr><td>maxSize</td><td>number</td><td>-</td><td>최대 파일 크기 (bytes)</td></tr>
              <tr><td>onChange</td><td>(files: File[]) =&gt; void</td><td>-</td><td>파일 변경 핸들러</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
              <tr><td>showList</td><td>boolean</td><td>true</td><td>업로드된 파일 목록 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
