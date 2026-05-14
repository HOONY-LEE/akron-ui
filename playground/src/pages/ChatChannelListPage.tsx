import {
  ChatChannelList,
  ChatChannelGroup,
  ChatChannelItem,
} from "@sunghoon_lee/akron-ui";
import { Hash, Lock, Users } from "lucide-react";

export function ChatChannelListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ChatChannelList</h1>
        <p className="page-description">
          채팅 채널 목록 사이드바 컴포넌트. ChatChannelGroup으로 그룹을 구분하고,
          ChatChannelItem으로 개별 채널을 표시합니다.
        </p>
      </header>

      {/* ── 기본 채널 목록 ── */}
      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 채널 목록</h2>
        <p className="section-desc">
          <code className="inline-code">ChatChannelList</code> 안에{" "}
          <code className="inline-code">ChatChannelGroup</code>과{" "}
          <code className="inline-code">ChatChannelItem</code>을 조합하여
          채널 목록을 구성합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 320,
          }}
        >
          <ChatChannelList>
            <ChatChannelGroup label="일반">
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="general"
                preview="안녕하세요! 반갑습니다."
                timestamp="오후 2:30"
              />
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="random"
                preview="오늘 점심 뭐 먹을까요?"
                timestamp="오후 1:15"
              />
            </ChatChannelGroup>
            <ChatChannelGroup label="프로젝트">
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="design-system"
                preview="컴포넌트 리뷰 부탁드립니다."
                timestamp="오전 11:00"
              />
              <ChatChannelItem
                icon={<Lock size={16} />}
                name="backend"
                preview="API 배포 완료했습니다."
                timestamp="오전 10:30"
              />
            </ChatChannelGroup>
          </ChatChannelList>
        </div>
      </section>

      {/* ── 아이템 상태 ── */}
      <section className="docs-section" id="states">
        <h2 className="section-title">채널 아이템 상태</h2>
        <p className="section-desc">
          <code className="inline-code">active</code>,{" "}
          <code className="inline-code">unreadCount</code>,{" "}
          <code className="inline-code">online</code> 등 다양한 상태를
          지원합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 320,
          }}
        >
          <ChatChannelList>
            <ChatChannelGroup label="상태 예시">
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="기본 상태"
                preview="일반 채널입니다."
                timestamp="오후 3:00"
              />
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="활성 채널"
                preview="현재 보고 있는 채널입니다."
                timestamp="오후 2:50"
                active
              />
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="읽지 않은 메시지"
                preview="새 메시지가 있습니다!"
                timestamp="오후 2:45"
                unreadCount={5}
              />
              <ChatChannelItem
                icon={<Users size={16} />}
                name="온라인 표시"
                preview="접속 중인 사용자가 있습니다."
                timestamp="오후 2:40"
                online
              />
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="다수 읽지 않음"
                preview="확인해주세요."
                timestamp="오전 9:00"
                unreadCount={99}
              />
            </ChatChannelGroup>
          </ChatChannelList>
        </div>
      </section>

      {/* ── 헤더 & 푸터 ── */}
      <section className="docs-section" id="header-footer">
        <h2 className="section-title">헤더 & 푸터</h2>
        <p className="section-desc">
          <code className="inline-code">header</code>와{" "}
          <code className="inline-code">footer</code> 슬롯으로 채널 목록
          상단과 하단에 커스텀 콘텐츠를 배치할 수 있습니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 320,
          }}
        >
          <ChatChannelList
            header={
              <div
                style={{
                  padding: "12px 16px",
                  fontWeight: 700,
                  fontSize: 15,
                  borderBottom: "1px solid var(--ark-color-border)",
                }}
              >
                Workspace
              </div>
            }
            footer={
              <div
                style={{
                  padding: "10px 16px",
                  fontSize: 13,
                  color: "var(--ark-color-text-secondary)",
                  borderTop: "1px solid var(--ark-color-border)",
                }}
              >
                3개 채널 접속 중
              </div>
            }
          >
            <ChatChannelGroup label="채널">
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="general"
                preview="반갑습니다."
                timestamp="오후 4:00"
              />
              <ChatChannelItem
                icon={<Hash size={16} />}
                name="design"
                preview="디자인 확인 부탁드립니다."
                timestamp="오후 3:30"
                unreadCount={2}
              />
            </ChatChannelGroup>
          </ChatChannelList>
        </div>
      </section>

      {/* ── 인터페이스: ChatChannelList ── */}
      <section className="docs-section" id="interface-list">
        <h2 className="section-title">ChatChannelList 인터페이스</h2>
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
                <td>채널 그룹 및 아이템</td>
              </tr>
              <tr>
                <td>header</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>사이드바 상단 커스텀 콘텐츠</td>
              </tr>
              <tr>
                <td>footer</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>사이드바 하단 커스텀 콘텐츠</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 인터페이스: ChatChannelGroup ── */}
      <section className="docs-section" id="interface-group">
        <h2 className="section-title">ChatChannelGroup 인터페이스</h2>
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
                <td>-</td>
                <td>그룹 라벨 텍스트</td>
              </tr>
              <tr>
                <td>children</td>
                <td>ReactNode</td>
                <td>필수</td>
                <td>그룹 내 채널 아이템</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* ── 인터페이스: ChatChannelItem ── */}
      <section className="docs-section" id="interface-item">
        <h2 className="section-title">ChatChannelItem 인터페이스</h2>
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
                <td>icon</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>채널 아이콘</td>
              </tr>
              <tr>
                <td>name</td>
                <td>string</td>
                <td>필수</td>
                <td>채널 이름</td>
              </tr>
              <tr>
                <td>preview</td>
                <td>string</td>
                <td>-</td>
                <td>최근 메시지 미리보기</td>
              </tr>
              <tr>
                <td>timestamp</td>
                <td>string</td>
                <td>-</td>
                <td>최근 메시지 시각</td>
              </tr>
              <tr>
                <td>unreadCount</td>
                <td>number</td>
                <td>-</td>
                <td>읽지 않은 메시지 수</td>
              </tr>
              <tr>
                <td>active</td>
                <td>boolean</td>
                <td>false</td>
                <td>현재 선택된 채널 여부</td>
              </tr>
              <tr>
                <td>online</td>
                <td>boolean</td>
                <td>false</td>
                <td>온라인 상태 표시</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
