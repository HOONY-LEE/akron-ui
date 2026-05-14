import { FeedbackWidget } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function FeedbackWidgetPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">FeedbackWidget</h1>
        <p className="page-description">
          사용자 피드백 수집 위젯. 페이지 하단이나 도움말에서 피드백을 받습니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<FeedbackWidget
  onSubmit={(data) => alert(JSON.stringify(data))}
/>`}
          scope={{ FeedbackWidget }}
        />
      </section>

      <section className="docs-section" id="inline">
        <h2 className="section-title">인라인 변형</h2>
        <LiveCodeBlock
          code={`<FeedbackWidget
  variant="inline"
  question="이 문서가 도움이 되었나요?"
  showComment={false}
  onSubmit={(data) => console.log(data)}
/>`}
          scope={{ FeedbackWidget }}
        />
      </section>

      <section className="docs-section" id="custom">
        <h2 className="section-title">커스텀 설정</h2>
        <LiveCodeBlock
          code={`<FeedbackWidget
  title="피드백"
  question="이 기능에 대해 어떻게 생각하시나요?"
  commentPlaceholder="개선 사항을 알려주세요..."
  thankYouMessage="소중한 의견 감사합니다! 🙏"
  dismissible
  onSubmit={(data) => console.log(data)}
  onDismiss={() => console.log("dismissed")}
/>`}
          scope={{ FeedbackWidget }}
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
              <tr><td>title</td><td>string</td><td>-</td><td>제목</td></tr>
              <tr><td>question</td><td>string</td><td>'이 내용이 도움이 되었나요?'</td><td>질문 텍스트</td></tr>
              <tr><td>onSubmit</td><td>(data) =&gt; void</td><td>-</td><td>제출 핸들러</td></tr>
              <tr><td>showComment</td><td>boolean</td><td>true</td><td>코멘트 입력 표시</td></tr>
              <tr><td>commentPlaceholder</td><td>string</td><td>'의견을 남겨주세요'</td><td>코멘트 플레이스홀더</td></tr>
              <tr><td>thankYouMessage</td><td>string</td><td>'감사합니다!'</td><td>제출 후 메시지</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>variant</td><td>'inline' | 'card'</td><td>'card'</td><td>변형</td></tr>
              <tr><td>dismissible</td><td>boolean</td><td>false</td><td>닫기 가능</td></tr>
              <tr><td>onDismiss</td><td>() =&gt; void</td><td>-</td><td>닫기 핸들러</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
