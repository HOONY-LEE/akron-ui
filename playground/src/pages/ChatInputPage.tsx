import { useState } from "react";
import { ChatInput } from "@sunghoon_lee/akron-ui";
import { Paperclip, Smile, Plus } from "lucide-react";

export function ChatInputPage() {
  const [value1, setValue1] = useState("");
  const [value2, setValue2] = useState("");
  const [value3, setValue3] = useState("");

  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ChatInput</h1>
        <p className="page-description">
          채팅 입력 컴포넌트. 텍스트 입력, 파일 첨부, 이모지 등 다양한 기능을
          슬롯 기반으로 구성할 수 있습니다.
        </p>
      </header>

      {/* ── 기본 입력 ── */}
      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          기본 채팅 입력 필드입니다. 텍스트를 입력하고 전송 버튼을 클릭하거나
          Enter로 전송합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 16,
            maxWidth: 520,
          }}
        >
          <ChatInput
            value={value1}
            onChange={setValue1}
            onSend={() => setValue1("")}
            placeholder="메시지를 입력하세요..."
          />
        </div>
      </section>

      {/* ── Prefix / Suffix ── */}
      <section className="docs-section" id="prefix-suffix">
        <h2 className="section-title">Prefix & Suffix</h2>
        <p className="section-desc">
          <code className="inline-code">prefix</code>와{" "}
          <code className="inline-code">suffix</code> 슬롯으로 입력 필드
          좌우에 아이콘이나 버튼을 배치합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 16,
            maxWidth: 520,
          }}
        >
          <ChatInput
            value={value2}
            onChange={setValue2}
            onSend={() => setValue2("")}
            placeholder="메시지를 입력하세요..."
            prefix={
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  color: "var(--ark-color-text-secondary)",
                }}
              >
                <Plus size={18} />
              </button>
            }
            suffix={
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Paperclip size={18} />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 32,
                    height: 32,
                    borderRadius: 6,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Smile size={18} />
                </button>
              </div>
            }
          />
        </div>
      </section>

      {/* ── 비활성 ── */}
      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성 상태</h2>
        <p className="section-desc">
          <code className="inline-code">disabled</code> prop으로 입력을
          비활성화합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 16,
            maxWidth: 520,
          }}
        >
          <ChatInput
            placeholder="입력이 비활성화되었습니다."
            disabled
          />
        </div>
      </section>

      {/* ── 멀티라인 ── */}
      <section className="docs-section" id="multiline">
        <h2 className="section-title">멀티라인 입력</h2>
        <p className="section-desc">
          <code className="inline-code">multiline</code> prop으로 여러 줄
          입력을 지원합니다.{" "}
          <code className="inline-code">maxRows</code>로 최대 줄 수를
          제한할 수 있습니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 16,
            maxWidth: 520,
          }}
        >
          <ChatInput
            value={value3}
            onChange={setValue3}
            onSend={() => setValue3("")}
            placeholder="여러 줄의 메시지를 입력하세요... (Shift+Enter로 줄바꿈)"
            multiline
            maxRows={5}
          />
        </div>
      </section>

      {/* ── 전송 버튼 숨기기 ── */}
      <section className="docs-section" id="hide-send">
        <h2 className="section-title">전송 버튼 숨기기</h2>
        <p className="section-desc">
          <code className="inline-code">hideSendButton</code> prop으로 전송
          버튼을 숨길 수 있습니다. Enter 키로만 전송하는 경우 유용합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            padding: 16,
            maxWidth: 520,
          }}
        >
          <ChatInput
            placeholder="Enter로 전송 (전송 버튼 없음)"
            hideSendButton
          />
        </div>
      </section>

      {/* ── 인터페이스 ── */}
      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
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
                <td>value</td>
                <td>string</td>
                <td>-</td>
                <td>입력 값 (제어 컴포넌트)</td>
              </tr>
              <tr>
                <td>onChange</td>
                <td>(value: string) =&gt; void</td>
                <td>-</td>
                <td>값 변경 핸들러</td>
              </tr>
              <tr>
                <td>onSend</td>
                <td>(value: string) =&gt; void</td>
                <td>-</td>
                <td>전송 핸들러</td>
              </tr>
              <tr>
                <td>placeholder</td>
                <td>string</td>
                <td>-</td>
                <td>플레이스홀더 텍스트</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>비활성 상태</td>
              </tr>
              <tr>
                <td>prefix</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>입력 필드 좌측 콘텐츠</td>
              </tr>
              <tr>
                <td>suffix</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>입력 필드 우측 콘텐츠</td>
              </tr>
              <tr>
                <td>sendIcon</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>전송 버튼 커스텀 아이콘</td>
              </tr>
              <tr>
                <td>hideSendButton</td>
                <td>boolean</td>
                <td>false</td>
                <td>전송 버튼 숨기기</td>
              </tr>
              <tr>
                <td>multiline</td>
                <td>boolean</td>
                <td>false</td>
                <td>멀티라인 입력 모드</td>
              </tr>
              <tr>
                <td>maxRows</td>
                <td>number</td>
                <td>-</td>
                <td>멀티라인 시 최대 줄 수</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
