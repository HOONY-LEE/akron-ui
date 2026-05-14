import { CommentThread } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function CommentThreadPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CommentThread</h1>
        <p className="page-description">
          댓글 스레드 컴포넌트. 중첩 답글을 지원하는 토론 UI를 구성합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<CommentThread
  comments={[
    {
      id: "1",
      author: "김철수",
      content: "이 기능 정말 좋네요! 배포 일정은 어떻게 되나요?",
      timestamp: new Date(Date.now() - 3600000 * 2),
      replies: [
        {
          id: "2",
          author: "이영희",
          content: "다음 주 월요일 배포 예정입니다.",
          timestamp: new Date(Date.now() - 3600000),
          replies: [
            {
              id: "3",
              author: "김철수",
              content: "감사합니다! 기대되네요.",
              timestamp: new Date(Date.now() - 1800000),
            },
          ],
        },
      ],
    },
    {
      id: "4",
      author: "박민수",
      content: "디자인 리뷰 완료했습니다. 몇 가지 수정 사항이 있어요.",
      timestamp: new Date(Date.now() - 86400000),
      isEdited: true,
    },
  ]}
  onReply={(parentId, content) => alert("답글: " + content)}
  onEdit={(id, content) => alert("수정: " + content)}
  onDelete={(id) => alert("삭제: " + id)}
/>`}
          scope={{ CommentThread }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <strong>sm</strong>
    <CommentThread
      size="sm"
      comments={[
        { id: "1", author: "관리자", content: "작은 크기 댓글입니다.", timestamp: new Date() },
      ]}
    />
  </div>
  <div>
    <strong>md</strong>
    <CommentThread
      size="md"
      comments={[
        { id: "1", author: "관리자", content: "기본 크기 댓글입니다.", timestamp: new Date() },
      ]}
    />
  </div>
</div>`}
          scope={{ CommentThread }}
        />
      </section>

      <section className="docs-section" id="empty">
        <h2 className="section-title">빈 상태</h2>
        <LiveCodeBlock
          code={`<CommentThread comments={[]} emptyMessage="아직 댓글이 없습니다. 첫 번째 댓글을 작성해보세요!" />`}
          scope={{ CommentThread }}
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
              <tr><td>comments</td><td>CommentItem[]</td><td>필수</td><td>댓글 목록</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>maxDepth</td><td>number</td><td>3</td><td>최대 중첩 깊이</td></tr>
              <tr><td>showReplyButton</td><td>boolean</td><td>true</td><td>답글 버튼 표시</td></tr>
              <tr><td>showTimestamp</td><td>boolean</td><td>true</td><td>시간 표시</td></tr>
              <tr><td>onReply</td><td>(parentId, content) =&gt; void</td><td>-</td><td>답글 콜백</td></tr>
              <tr><td>onEdit</td><td>(commentId, content) =&gt; void</td><td>-</td><td>수정 콜백</td></tr>
              <tr><td>onDelete</td><td>(commentId) =&gt; void</td><td>-</td><td>삭제 콜백</td></tr>
              <tr><td>replyPlaceholder</td><td>string</td><td>'답글 작성...'</td><td>답글 플레이스홀더</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>'댓글이 없습니다.'</td><td>빈 상태 메시지</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>CommentItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 ID (필수)</td></tr>
              <tr><td>author</td><td>string</td><td>작성자 (필수)</td></tr>
              <tr><td>avatar</td><td>string</td><td>아바타 이미지 URL</td></tr>
              <tr><td>content</td><td>string</td><td>댓글 내용 (필수)</td></tr>
              <tr><td>timestamp</td><td>string | Date</td><td>작성 시간 (필수)</td></tr>
              <tr><td>replies</td><td>CommentItem[]</td><td>중첩 답글</td></tr>
              <tr><td>isEdited</td><td>boolean</td><td>수정 여부</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
