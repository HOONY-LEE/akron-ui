import { Typewriter, GradientText } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TypewriterPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Typewriter</h1>
        <p className="page-description">
          타이핑 애니메이션 컴포넌트. 텍스트를 한 글자씩 타이핑하는 효과를 구현합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<p style={{ fontSize: 20, margin: 0 }}>
  안녕하세요, <Typewriter words="Akron UI입니다." />
</p>`}
          scope={{ Typewriter }}
        />
      </section>

      <section className="docs-section" id="multiple-words">
        <h2 className="section-title">여러 단어 순환</h2>
        <LiveCodeBlock
          code={`<h2 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>
  우리는{" "}
  <Typewriter
    words={["개발자를", "디자이너를", "크리에이터를"]}
    typingSpeed={80}
    deletingSpeed={50}
    pauseAfterTyping={1200}
  />
  {" "}위한 UI입니다
</h2>`}
          scope={{ Typewriter }}
        />
      </section>

      <section className="docs-section" id="with-gradient">
        <h2 className="section-title">그라디언트와 조합</h2>
        <LiveCodeBlock
          code={`<h1 style={{ fontSize: 36, fontWeight: 800, margin: 0 }}>
  <GradientText preset="sunset" animate>
    <Typewriter
      words={["React 컴포넌트", "디자인 시스템", "Akron UI"]}
      typingSpeed={70}
      cursor="_"
    />
  </GradientText>
</h1>`}
          scope={{ Typewriter, GradientText }}
        />
      </section>

      <section className="docs-section" id="no-loop">
        <h2 className="section-title">한 번만 타이핑</h2>
        <LiveCodeBlock
          code={`<p style={{ fontSize: 16, margin: 0 }}>
  <Typewriter
    words="이 텍스트는 한 번만 타이핑됩니다."
    loop={false}
    typingSpeed={50}
    onComplete={() => console.log("완료!")}
  />
</p>`}
          scope={{ Typewriter }}
        />
      </section>

      <section className="docs-section" id="custom-cursor">
        <h2 className="section-title">커스텀 커서</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
  <p style={{ margin: 0 }}><Typewriter words="기본 커서 (|)" /></p>
  <p style={{ margin: 0 }}><Typewriter words="밑줄 커서" cursor="_" /></p>
  <p style={{ margin: 0 }}><Typewriter words="블록 커서" cursor="█" /></p>
  <p style={{ margin: 0 }}><Typewriter words="커서 없음" showCursor={false} /></p>
</div>`}
          scope={{ Typewriter }}
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
              <tr><td>words</td><td>string | string[]</td><td>필수</td><td>타이핑할 텍스트 또는 배열</td></tr>
              <tr><td>typingSpeed</td><td>number</td><td>60</td><td>타이핑 속도 (ms/글자)</td></tr>
              <tr><td>deletingSpeed</td><td>number</td><td>35</td><td>삭제 속도 (ms/글자)</td></tr>
              <tr><td>pauseAfterTyping</td><td>number</td><td>1500</td><td>타이핑 완료 후 대기 시간 (ms)</td></tr>
              <tr><td>pauseAfterDeleting</td><td>number</td><td>400</td><td>삭제 완료 후 대기 시간 (ms)</td></tr>
              <tr><td>loop</td><td>boolean</td><td>true</td><td>반복 여부</td></tr>
              <tr><td>showCursor</td><td>boolean</td><td>true</td><td>커서 표시</td></tr>
              <tr><td>cursor</td><td>string</td><td>'|'</td><td>커서 문자</td></tr>
              <tr><td>as</td><td>TypewriterTag</td><td>'span'</td><td>렌더링 태그</td></tr>
              <tr><td>onComplete</td><td>() =&gt; void</td><td>-</td><td>완료 콜백 (loop=false 시)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
