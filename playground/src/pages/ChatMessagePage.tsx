import {
  ChatMessage,
  ChatMessageList,
  ChatDateDivider,
  ChatTypingIndicator,
  Avatar,
} from "@sunghoon_lee/akron-ui";
import { Bot, Check, CheckCheck } from "lucide-react";

export function ChatMessagePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ChatMessage</h1>
        <p className="page-description">
          채팅 메시지 컴포넌트. 일반 대화, AI 응답, 시스템 알림 등 다양한
          메시지 형식을 표현합니다. ChatDateDivider, ChatTypingIndicator와
          함께 사용합니다.
        </p>
      </header>

      {/* ── 기본 메시지 ── */}
      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 대화</h2>
        <p className="section-desc">
          <code className="inline-code">side="left"</code>은 수신 메시지,{" "}
          <code className="inline-code">side="right"</code>은 발신 메시지를
          나타냅니다. <code className="inline-code">avatar</code>와{" "}
          <code className="inline-code">name</code>으로 발신자를 표시합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatMessageList>
            <ChatMessage
              side="left"
              avatar={<Avatar name="지수" size="sm" />}
              name="지수"
              timestamp="오후 2:30"
            >
              안녕하세요! 오늘 회의 시간 확인하셨나요?
            </ChatMessage>
            <ChatMessage
              side="right"
              timestamp="오후 2:31"
              status={<CheckCheck size={12} />}
            >
              네, 3시에 시작이죠? 준비하고 있어요.
            </ChatMessage>
            <ChatMessage
              side="left"
              avatar={<Avatar name="지수" size="sm" />}
              name="지수"
              timestamp="오후 2:31"
            >
              맞아요! 자료는 제가 공유해둘게요.
            </ChatMessage>
            <ChatMessage
              side="right"
              timestamp="오후 2:32"
              status={<Check size={12} />}
            >
              감사합니다.
            </ChatMessage>
          </ChatMessageList>
        </div>
      </section>

      {/* ── AI 메시지 ── */}
      <section className="docs-section" id="ai-variant">
        <h2 className="section-title">AI 응답 메시지</h2>
        <p className="section-desc">
          <code className="inline-code">variant="ai"</code>와{" "}
          <code className="inline-code">aiLabel</code>로 AI 어시스턴트의
          응답을 구분하여 표시합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatMessageList>
            <ChatMessage
              side="right"
              timestamp="오후 4:00"
            >
              TypeScript에서 제네릭이란 무엇인가요?
            </ChatMessage>
            <ChatMessage
              side="left"
              variant="ai"
              avatar={<Bot size={20} />}
              name="AI Assistant"
              aiLabel="AI"
              timestamp="오후 4:00"
            >
              제네릭(Generics)은 타입을 매개변수처럼 사용하여 재사용 가능한
              컴포넌트를 만드는 TypeScript의 기능입니다. 함수, 클래스,
              인터페이스에서 다양한 타입과 함께 동작할 수 있도록 유연성을
              제공합니다.
            </ChatMessage>
            <ChatMessage
              side="right"
              timestamp="오후 4:01"
            >
              예시 코드를 보여줄 수 있나요?
            </ChatMessage>
            <ChatMessage
              side="left"
              variant="ai"
              avatar={<Bot size={20} />}
              name="AI Assistant"
              aiLabel="AI"
              timestamp="오후 4:01"
            >
              {"function identity<T>(arg: T): T { return arg; }\n\nidentity<string>(\"hello\"); // 타입: string\nidentity<number>(42);       // 타입: number"}
            </ChatMessage>
          </ChatMessageList>
        </div>
      </section>

      {/* ── 시스템 메시지 ── */}
      <section className="docs-section" id="system-variant">
        <h2 className="section-title">시스템 메시지</h2>
        <p className="section-desc">
          <code className="inline-code">variant="system"</code>으로 시스템
          알림을 표시합니다. 입장, 퇴장 등의 이벤트에 활용합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatMessageList>
            <ChatMessage variant="system">
              민재님이 채널에 참가했습니다.
            </ChatMessage>
            <ChatMessage
              side="left"
              avatar={<Avatar name="민재" size="sm" />}
              name="민재"
              timestamp="오후 5:00"
            >
              안녕하세요, 잘 부탁드립니다!
            </ChatMessage>
            <ChatMessage variant="system">
              지수님이 채널 이름을 "프로젝트-알파"로 변경했습니다.
            </ChatMessage>
          </ChatMessageList>
        </div>
      </section>

      {/* ── 메시지 액션 ── */}
      <section className="docs-section" id="actions">
        <h2 className="section-title">메시지 액션</h2>
        <p className="section-desc">
          <code className="inline-code">actions</code> 슬롯으로 메시지에
          액션 버튼을 추가할 수 있습니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatMessageList>
            <ChatMessage
              side="left"
              avatar={<Avatar name="수진" size="sm" />}
              name="수진"
              timestamp="오후 6:00"
              actions={
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    style={{
                      padding: "2px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid var(--ark-color-border)",
                      background: "transparent",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    답장
                  </button>
                  <button
                    style={{
                      padding: "2px 8px",
                      fontSize: 12,
                      borderRadius: 4,
                      border: "1px solid var(--ark-color-border)",
                      background: "transparent",
                      cursor: "pointer",
                      color: "inherit",
                    }}
                  >
                    이모지
                  </button>
                </div>
              }
            >
              이 문서 검토 부탁드립니다.
            </ChatMessage>
          </ChatMessageList>
        </div>
      </section>

      {/* ── 날짜 구분선 ── */}
      <section className="docs-section" id="date-divider">
        <h2 className="section-title">ChatDateDivider</h2>
        <p className="section-desc">
          날짜 또는 시점으로 메시지를 구분하는 구분선입니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatMessageList>
            <ChatDateDivider label="2024년 12월 1일" />
            <ChatMessage
              side="left"
              avatar={<Avatar name="지수" size="sm" />}
              name="지수"
              timestamp="오전 9:00"
            >
              좋은 아침이에요!
            </ChatMessage>
            <ChatDateDivider label="오늘" />
            <ChatMessage
              side="left"
              avatar={<Avatar name="지수" size="sm" />}
              name="지수"
              timestamp="오전 10:30"
            >
              오늘 미팅 준비됐나요?
            </ChatMessage>
            <ChatMessage
              side="right"
              timestamp="오전 10:31"
              status={<CheckCheck size={12} />}
            >
              네, 준비 완료입니다!
            </ChatMessage>
          </ChatMessageList>
        </div>
      </section>

      {/* ── 타이핑 인디케이터 ── */}
      <section className="docs-section" id="typing-indicator">
        <h2 className="section-title">ChatTypingIndicator</h2>
        <p className="section-desc">
          상대방이 입력 중임을 나타내는 인디케이터입니다.{" "}
          <code className="inline-code">names</code>로 입력 중인 사용자를
          표시할 수 있습니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 20,
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div>
            <span
              className="preview-label"
              style={{ marginBottom: 8, display: "block" }}
            >
              이름 없이
            </span>
            <ChatTypingIndicator />
          </div>
          <div>
            <span
              className="preview-label"
              style={{ marginBottom: 8, display: "block" }}
            >
              1명 입력 중
            </span>
            <ChatTypingIndicator names={["지수"]} />
          </div>
          <div>
            <span
              className="preview-label"
              style={{ marginBottom: 8, display: "block" }}
            >
              2명 입력 중
            </span>
            <ChatTypingIndicator names={["지수", "민재"]} />
          </div>
        </div>
      </section>

      {/* ── 인터페이스: ChatMessage ── */}
      <section className="docs-section" id="interface-message">
        <h2 className="section-title">ChatMessage 인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>필수</td>
                <td>메시지 내용</td>
              </tr>
              <tr>
                <td>side</td>
                <td>'left' | 'right'</td>
                <td>'left'</td>
                <td>메시지 방향 (left=수신, right=발신)</td>
              </tr>
              <tr>
                <td>variant</td>
                <td>'default' | 'ai' | 'system'</td>
                <td>'default'</td>
                <td>메시지 스타일 변형</td>
              </tr>
              <tr>
                <td>avatar</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>아바타 요소</td>
              </tr>
              <tr>
                <td>name</td>
                <td>string</td>
                <td>-</td>
                <td>발신자 이름</td>
              </tr>
              <tr>
                <td>aiLabel</td>
                <td>string</td>
                <td>-</td>
                <td>AI 메시지 라벨 (variant="ai"일 때)</td>
              </tr>
              <tr>
                <td>timestamp</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>메시지 시각</td>
              </tr>
              <tr>
                <td>status</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>메시지 상태 (읽음, 전송 등)</td>
              </tr>
              <tr>
                <td>actions</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>메시지 액션 버튼 영역</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 인터페이스: ChatDateDivider ── */}
      <section className="docs-section" id="interface-divider">
        <h2 className="section-title">ChatDateDivider 인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>label</td>
                <td>string</td>
                <td>필수</td>
                <td>구분선에 표시할 텍스트 (날짜 등)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 인터페이스: ChatTypingIndicator ── */}
      <section className="docs-section" id="interface-typing">
        <h2 className="section-title">ChatTypingIndicator 인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>names</td>
                <td>string[]</td>
                <td>-</td>
                <td>입력 중인 사용자 이름 목록</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
