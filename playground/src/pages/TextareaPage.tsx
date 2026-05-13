import { Textarea } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TextareaPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Textarea</h1>
        <p className="page-description">
          여러 줄 텍스트 입력 필드. 긴 텍스트 입력에 사용합니다.
          글자 수 제한, 에러 상태, 라벨, 도움말 텍스트를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Textarea
  label="메모"
  placeholder="내용을 입력하세요..."
  style={{ width: 320 }}
/>`}
          scope={{ Textarea }}
        />
      </section>

      <section className="docs-section" id="helper">
        <h2 className="section-title">도움말 / 에러</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
  <Textarea
    label="자기소개"
    helperText="본인의 강점과 경력을 간략히 작성하세요."
    placeholder="자기소개를 입력하세요..."
    minRows={4}
  />
  <Textarea
    label="사유"
    error
    errorMessage="필수 항목입니다."
    placeholder="사유를 입력하세요..."
  />
</div>`}
          scope={{ Textarea }}
        />
      </section>

      <section className="docs-section" id="char-count">
        <h2 className="section-title">글자 수 제한</h2>
        <p className="section-desc">
          <code className="inline-code">maxLength</code>를 설정하면 우측 하단에 글자 수가 표시됩니다.
          제한을 초과하면 빨간색으로 표시됩니다.
        </p>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState("");
  return (
    <Textarea
      label="공지사항"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      maxLength={200}
      currentLength={value.length}
      placeholder="공지 내용을 입력하세요..."
      style={{ width: 360 }}
    />
  );
}
render(<Demo />)`}
          scope={{ Textarea }}
          noInline
        />
      </section>

      <section className="docs-section" id="resize">
        <h2 className="section-title">크기 조절</h2>
        <p className="section-desc">
          <code className="inline-code">resize</code> prop으로 크기 조절 방향을 설정합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}>
  <Textarea label="resize: none" resize="none" placeholder="크기 고정" />
  <Textarea label="resize: vertical (기본값)" resize="vertical" placeholder="세로만 조절 가능" />
  <Textarea label="resize: both" resize="both" placeholder="가로/세로 모두 조절 가능" />
</div>`}
          scope={{ Textarea }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<Textarea
  label="비활성화"
  disabled
  value="편집할 수 없는 텍스트 영역입니다."
  style={{ width: 320 }}
/>`}
          scope={{ Textarea }}
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
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
              <tr><td>helperText</td><td>string</td><td>-</td><td>도움말 텍스트</td></tr>
              <tr><td>errorMessage</td><td>string</td><td>-</td><td>에러 메시지</td></tr>
              <tr><td>error</td><td>boolean</td><td>false</td><td>에러 상태</td></tr>
              <tr><td>maxLength</td><td>number</td><td>-</td><td>최대 글자 수</td></tr>
              <tr><td>currentLength</td><td>number</td><td>-</td><td>현재 글자 수 (외부 제어)</td></tr>
              <tr><td>minRows</td><td>number</td><td>3</td><td>최소 표시 줄 수</td></tr>
              <tr><td>resize</td><td>'none' | 'vertical' | 'horizontal' | 'both'</td><td>'vertical'</td><td>크기 조절 방향</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>false</td><td>비활성화</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
