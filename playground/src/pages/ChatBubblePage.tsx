import { ChatBubble, Avatar } from "@sunghoon_lee/akron-ui";
import { Check, CheckCheck } from "lucide-react";

export function ChatBubblePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ChatBubble</h1>
        <p className="page-description">
          채팅 말풍선 컴포넌트. 메신저, 고객 지원 위젯, AI 챗봇 인터페이스에 활용합니다.
          고수준 <code className="inline-code">ChatMessage</code>와 달리
          말풍선 자체의 스타일링에 집중한 저수준 컴포넌트입니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 대화</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            padding: 16,
            maxWidth: 480,
            background: "var(--ark-color-bg-muted)",
            borderRadius: 12,
            border: "1px solid var(--ark-color-border)",
          }}
        >
          <ChatBubble
            side="left"
            avatar={<Avatar name="지수" size="sm" />}
            name="지수"
            timestamp="오후 2:30"
          >
            안녕하세요! Akron UI 어떻게 사용하고 계신가요?
          </ChatBubble>

          <ChatBubble
            side="right"
            avatar={<Avatar name="나" size="sm" />}
            timestamp="오후 2:31"
            status={<CheckCheck size={12} />}
          >
            정말 사용하기 편리해요. 컴포넌트 종류도 다양하고요!
          </ChatBubble>

          <ChatBubble
            side="left"
            avatar={<Avatar name="지수" size="sm" />}
            name="지수"
            timestamp="오후 2:31"
          >
            맞아요, 저도 이번 프로젝트에 적용해보려고요.
          </ChatBubble>

          <ChatBubble
            side="right"
            avatar={<Avatar name="나" size="sm" />}
            timestamp="오후 2:32"
            status={<CheckCheck size={12} />}
          >
            추천합니다! 문서도 잘 되어 있어요.
          </ChatBubble>
        </div>
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <div>
            <span className="preview-label" style={{ marginBottom: 8, display: "block" }}>filled (기본)</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <ChatBubble side="left" variant="filled">수신 메시지 예시입니다.</ChatBubble>
              <ChatBubble side="right" variant="filled">발신 메시지 예시입니다.</ChatBubble>
            </div>
          </div>
          <div>
            <span className="preview-label" style={{ marginBottom: 8, display: "block" }}>outline</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <ChatBubble side="left" variant="outline">수신 메시지 예시입니다.</ChatBubble>
              <ChatBubble side="right" variant="outline">발신 메시지 예시입니다.</ChatBubble>
            </div>
          </div>
          <div>
            <span className="preview-label" style={{ marginBottom: 8, display: "block" }}>ghost</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <ChatBubble side="left" variant="ghost">수신 메시지 예시입니다.</ChatBubble>
              <ChatBubble side="right" variant="ghost">발신 메시지 예시입니다.</ChatBubble>
            </div>
          </div>
        </div>
      </section>

      <section className="docs-section" id="rich-content">
        <h2 className="section-title">리치 콘텐츠</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 400,
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 20,
          }}
        >
          <ChatBubble side="left">
            <div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>파일 첨부</div>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "var(--ark-color-bg-muted)",
                  fontSize: 12,
                  border: "1px solid var(--ark-color-border)",
                }}
              >
                design-system-v2.fig · 4.2 MB
              </div>
            </div>
          </ChatBubble>

          <ChatBubble side="right">
            <div>
              <p style={{ margin: "0 0 8px" }}>이 링크 확인해보세요!</p>
              <div
                style={{
                  padding: "8px 12px",
                  borderRadius: 6,
                  background: "rgba(255,255,255,0.15)",
                  fontSize: 12,
                }}
              >
                <div style={{ fontWeight: 600 }}>Akron UI</div>
                <div style={{ opacity: 0.8 }}>React 컴포넌트 라이브러리</div>
              </div>
            </div>
          </ChatBubble>
        </div>
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>side</td><td>'left' | 'right'</td><td>'left'</td><td>말풍선 방향 (left=수신, right=발신)</td></tr>
              <tr><td>children</td><td>ReactNode</td><td>필수</td><td>메시지 내용</td></tr>
              <tr><td>avatar</td><td>ReactNode</td><td>-</td><td>아바타 요소</td></tr>
              <tr><td>name</td><td>string</td><td>-</td><td>발신자 이름 (left 전용)</td></tr>
              <tr><td>timestamp</td><td>ReactNode</td><td>-</td><td>타임스탬프</td></tr>
              <tr><td>status</td><td>ReactNode</td><td>-</td><td>메시지 상태 (읽음 등)</td></tr>
              <tr><td>variant</td><td>'filled' | 'outline' | 'ghost'</td><td>'filled'</td><td>말풍선 스타일</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
