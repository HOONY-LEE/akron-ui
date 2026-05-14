import { useState } from "react";
import {
  ChatLayout,
  ChatChannelList,
  ChatChannelGroup,
  ChatChannelItem,
  ChatRoom,
  ChatHeader,
  ChatMessageList,
  ChatMessage,
  ChatInput,
  ChatDateDivider,
  ChatTypingIndicator,
  Avatar,
} from "@sunghoon_lee/akron-ui";
import { Hash, Bot, Lock, Plus, Phone, Video, Users, Search } from "lucide-react";

interface Msg {
  id: string;
  sender: string;
  content: string;
  time: string;
  variant?: "default" | "ai" | "system";
}

const sampleChannels = [
  { id: "general", name: "일반", icon: <Hash size={14} />, unread: 0 },
  { id: "dev", name: "개발팀", icon: <Hash size={14} />, unread: 3 },
  { id: "design", name: "디자인팀", icon: <Hash size={14} />, unread: 0 },
  { id: "private", name: "경영진", icon: <Lock size={13} />, unread: 1 },
];

const sampleDMs = [
  { id: "dm-ai", name: "AI 어시스턴트", icon: <Bot size={14} />, unread: 0 },
  { id: "dm-kim", name: "김민수", icon: undefined, unread: 2 },
  { id: "dm-park", name: "박서연", icon: undefined, unread: 0 },
];

const sampleMessages: Record<string, Msg[]> = {
  general: [
    { id: "1", sender: "김민수", content: "안녕하세요! 오늘 전체 미팅 3시에 있습니다.", time: "오전 9:30", variant: "default" },
    { id: "2", sender: "박서연", content: "네, 확인했습니다. 회의실은 어디인가요?", time: "오전 9:32", variant: "default" },
    { id: "3", sender: "김민수", content: "5층 대회의실입니다.", time: "오전 9:33", variant: "default" },
    { id: "s1", sender: "", content: "이정훈님이 채널에 참여했습니다.", time: "", variant: "system" },
    { id: "4", sender: "이정훈", content: "안녕하세요! 신규 입사한 이정훈입니다. 잘 부탁드립니다 😊", time: "오전 10:15", variant: "default" },
  ],
  dev: [
    { id: "d1", sender: "최영호", content: "PR #142 리뷰 부탁드립니다.", time: "오후 2:10", variant: "default" },
    { id: "d2", sender: "박서연", content: "확인했어요, 코멘트 남겼습니다.", time: "오후 2:25", variant: "default" },
    { id: "d3", sender: "최영호", content: "감사합니다! 수정 후 다시 올리겠습니다.", time: "오후 2:30", variant: "default" },
  ],
  "dm-ai": [
    { id: "ai1", sender: "AI 어시스턴트", content: "안녕하세요! 무엇을 도와드릴까요?\n\n• 회의 일정 잡기\n• 태스크 생성 및 관리\n• 팀 업무량 분석", time: "오전 9:00", variant: "ai" },
  ],
};

const ME = "나";

export function ChatPage() {
  const [selectedChannel, setSelectedChannel] = useState("general");
  const [messages, setMessages] = useState(sampleMessages);
  const [typing, setTyping] = useState(false);

  const currentMsgs = messages[selectedChannel] || [];
  const channelName =
    [...sampleChannels, ...sampleDMs].find((c) => c.id === selectedChannel)?.name || "";
  const isAI = selectedChannel === "dm-ai";
  const isDM = selectedChannel.startsWith("dm-");

  const handleSend = (text: string) => {
    const newMsg: Msg = {
      id: `msg-${Date.now()}`,
      sender: ME,
      content: text,
      time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
      variant: "default",
    };

    setMessages((prev) => ({
      ...prev,
      [selectedChannel]: [...(prev[selectedChannel] || []), newMsg],
    }));

    if (isAI) {
      setTyping(true);
      setTimeout(() => {
        const aiMsg: Msg = {
          id: `ai-${Date.now()}`,
          sender: "AI 어시스턴트",
          content: `"${text}"에 대해 분석 중입니다.\n잠시만 기다려주세요.`,
          time: new Date().toLocaleTimeString("ko-KR", { hour: "2-digit", minute: "2-digit" }),
          variant: "ai",
        };
        setMessages((prev) => ({
          ...prev,
          [selectedChannel]: [...(prev[selectedChannel] || []), aiMsg],
        }));
        setTyping(false);
      }, 1500);
    }
  };

  return (
    <div className="docs-page">
      <h1>Chat</h1>
      <p className="docs-desc">
        Slack/Teams 스타일의 채팅 UI 시스템입니다. <code>ChatLayout</code>,{" "}
        <code>ChatChannelList</code>, <code>ChatRoom</code>, <code>ChatMessage</code> 등
        11개의 컴포넌트를 조합하여 완전한 채팅 인터페이스를 구성할 수 있습니다.
      </p>

      <h2 id="live-demo">라이브 데모</h2>
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 12 }}>
        채널을 선택하고 메시지를 보내보세요. AI 어시스턴트 채널에서는 자동 응답을 확인할 수 있습니다.
      </p>

      <div
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 12,
          overflow: "hidden",
          height: 520,
        }}
      >
        <ChatLayout>
          <ChatChannelList
            header={
              <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%" }}>
                <span style={{ fontWeight: 600, fontSize: 14, flex: 1 }}>메신저</span>
                <Search size={14} style={{ color: "var(--ark-color-text-disabled)", cursor: "pointer" }} />
                <Plus size={14} style={{ color: "var(--ark-color-text-disabled)", cursor: "pointer" }} />
              </div>
            }
          >
            <ChatChannelGroup label="채널">
              {sampleChannels.map((ch) => (
                <ChatChannelItem
                  key={ch.id}
                  icon={ch.icon}
                  name={ch.name}
                  active={selectedChannel === ch.id}
                  unreadCount={ch.unread}
                  onClick={() => setSelectedChannel(ch.id)}
                />
              ))}
            </ChatChannelGroup>
            <ChatChannelGroup label="다이렉트 메시지">
              {sampleDMs.map((dm) => (
                <ChatChannelItem
                  key={dm.id}
                  icon={dm.icon || <Avatar name={dm.name} size="xs" />}
                  name={dm.name}
                  active={selectedChannel === dm.id}
                  unreadCount={dm.unread}
                  online={dm.id === "dm-kim"}
                  onClick={() => setSelectedChannel(dm.id)}
                />
              ))}
            </ChatChannelGroup>
          </ChatChannelList>

          <ChatRoom>
            <ChatHeader
              icon={isAI ? <Bot size={16} /> : isDM ? undefined : <Hash size={16} />}
              title={channelName}
              subtitle={isDM ? (isAI ? "AI 어시스턴트" : "온라인") : `${currentMsgs.filter((m) => m.variant !== "system").length}개의 메시지`}
              actions={
                <div style={{ display: "flex", gap: 6 }}>
                  <Phone size={15} style={{ cursor: "pointer", color: "var(--ark-color-text-disabled)" }} />
                  <Video size={15} style={{ cursor: "pointer", color: "var(--ark-color-text-disabled)" }} />
                  <Users size={15} style={{ cursor: "pointer", color: "var(--ark-color-text-disabled)" }} />
                </div>
              }
            />
            <ChatMessageList>
              <ChatDateDivider label="오늘" />
              {currentMsgs.map((msg) => {
                const isMe = msg.sender === ME;
                return (
                  <ChatMessage
                    key={msg.id}
                    side={msg.variant === "system" ? "left" : isMe ? "right" : "left"}
                    variant={msg.variant || "default"}
                    avatar={
                      !isMe && msg.variant !== "system" ? (
                        <Avatar name={msg.sender} size="sm" />
                      ) : undefined
                    }
                    name={!isMe && msg.variant !== "system" ? msg.sender : undefined}
                    timestamp={msg.time || undefined}
                  >
                    {msg.content}
                  </ChatMessage>
                );
              })}
              {typing && <ChatTypingIndicator names={["AI 어시스턴트"]} />}
            </ChatMessageList>
            <ChatInput
              placeholder={isAI ? "AI에게 질문하세요..." : "메시지를 입력하세요..."}
              onSend={handleSend}
            />
          </ChatRoom>
        </ChatLayout>
      </div>

      <h2 id="components">컴포넌트 구조</h2>
      <div
        style={{
          background: "var(--ark-color-bg-subtle)",
          borderRadius: 8,
          padding: "16px 20px",
          fontFamily: "monospace",
          fontSize: 13,
          lineHeight: 1.8,
          whiteSpace: "pre",
          color: "var(--ark-color-text-secondary)",
          overflowX: "auto",
        }}
      >
{`<ChatLayout>
  <ChatChannelList header={...}>
    <ChatChannelGroup label="채널">
      <ChatChannelItem icon={<Hash />} name="일반" active />
    </ChatChannelGroup>
  </ChatChannelList>

  <ChatRoom>
    <ChatHeader icon={<Hash />} title="일반" />
    <ChatMessageList>
      <ChatDateDivider label="오늘" />
      <ChatMessage side="left" name="홍길동" avatar={...}>
        안녕하세요!
      </ChatMessage>
      <ChatMessage side="right">답장</ChatMessage>
      <ChatMessage variant="ai">AI 응답</ChatMessage>
      <ChatMessage variant="system">시스템 메시지</ChatMessage>
      <ChatTypingIndicator names={["홍길동"]} />
    </ChatMessageList>
    <ChatInput onSend={(text) => ...} />
  </ChatRoom>
</ChatLayout>`}
      </div>

      <h2 id="channel-item">ChatChannelItem</h2>
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 12 }}>
        다양한 상태를 지원합니다: <code>active</code>, <code>unreadCount</code>,{" "}
        <code>online</code>, <code>preview</code>, <code>timestamp</code>.
      </p>
      <div
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          padding: 8,
          maxWidth: 280,
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
      >
        <ChatChannelItem icon={<Hash size={14} />} name="일반" active />
        <ChatChannelItem icon={<Hash size={14} />} name="개발팀" unreadCount={5} preview="최영호: PR 리뷰 부탁" timestamp="오후 2:30" />
        <ChatChannelItem icon={<Lock size={13} />} name="경영진" unreadCount={12} />
        <ChatChannelItem icon={<Avatar name="김민수" size="xs" />} name="김민수" online preview="내일 미팅 가능하신가요?" timestamp="오전 11:20" />
        <ChatChannelItem icon={<Bot size={14} />} name="AI 어시스턴트" />
      </div>

      <h2 id="message-variants">ChatMessage variants</h2>
      <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", marginBottom: 12 }}>
        <code>default</code> (좌/우), <code>ai</code>, <code>system</code> 변형을 지원합니다.
      </p>
      <div
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <ChatMessage side="left" avatar={<Avatar name="김민수" size="sm" />} name="김민수" timestamp="오전 9:30">
          일반 수신 메시지입니다.
        </ChatMessage>
        <ChatMessage side="right" timestamp="오전 9:32">
          일반 발신 메시지입니다.
        </ChatMessage>
        <ChatMessage variant="ai" side="left" avatar={<Avatar name="AI" size="sm" />} timestamp="오전 9:35">
          AI 어시스턴트 응답 메시지입니다.{"\n"}그라데이션 배경이 적용됩니다.
        </ChatMessage>
        <ChatMessage variant="system">이정훈님이 채널에 참여했습니다.</ChatMessage>
      </div>

      <h2 id="typing-indicator">ChatTypingIndicator</h2>
      <div
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <ChatTypingIndicator />
        <ChatTypingIndicator names={["김민수"]} />
        <ChatTypingIndicator names={["김민수", "박서연"]} />
      </div>

      <h2 id="date-divider">ChatDateDivider</h2>
      <div
        style={{
          border: "1px solid var(--ark-color-border)",
          borderRadius: 8,
          padding: 20,
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <ChatDateDivider label="2024년 1월 15일 월요일" />
        <ChatDateDivider label="오늘" />
        <ChatDateDivider label="새로운 메시지" />
      </div>

      <h2 id="tokens">커스터마이징 토큰</h2>
      <div
        style={{
          background: "var(--ark-color-bg-subtle)",
          borderRadius: 8,
          padding: "16px 20px",
          fontFamily: "monospace",
          fontSize: 13,
          lineHeight: 1.8,
          whiteSpace: "pre",
          color: "var(--ark-color-text-secondary)",
        }}
      >
{`:root {
  --ark-chat-sidebar-width: 260px;
  --ark-chat-sidebar-bg: var(--ark-color-bg-subtle);
  --ark-chat-message-max-width: 75%;
}`}
      </div>
    </div>
  );
}
