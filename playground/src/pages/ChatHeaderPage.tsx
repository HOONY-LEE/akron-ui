import { ChatHeader } from "@sunghoon_lee/akron-ui";
import { Hash, Lock, Phone, Video, Search, Users } from "lucide-react";

export function ChatHeaderPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ChatHeader</h1>
        <p className="page-description">
          채팅방 상단 헤더 컴포넌트. 채널 이름, 설명, 액션 버튼 등을
          표시합니다.
        </p>
      </header>

      {/* ── 기본 사용 ── */}
      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          <code className="inline-code">icon</code>과{" "}
          <code className="inline-code">title</code>로 채널 정보를
          표시합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatHeader
            icon={<Hash size={18} />}
            title="general"
          />
        </div>
      </section>

      {/* ── 서브타이틀 ── */}
      <section className="docs-section" id="subtitle">
        <h2 className="section-title">서브타이틀</h2>
        <p className="section-desc">
          <code className="inline-code">subtitle</code>로 채널 설명이나
          추가 정보를 표시합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          <ChatHeader
            icon={<Hash size={18} />}
            title="design-system"
            subtitle="디자인 시스템 관련 논의 채널"
          />
        </div>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
            marginTop: 12,
          }}
        >
          <ChatHeader
            icon={<Lock size={18} />}
            title="backend-private"
            subtitle="멤버 4명 참여 중"
          />
        </div>
      </section>

      {/* ── 액션 버튼 ── */}
      <section className="docs-section" id="actions">
        <h2 className="section-title">액션 버튼</h2>
        <p className="section-desc">
          <code className="inline-code">actions</code> 슬롯에 통화, 검색,
          멤버 보기 등의 액션 버튼을 배치합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 8,
            overflow: "hidden",
            maxWidth: 520,
          }}
        >
          <ChatHeader
            icon={<Hash size={18} />}
            title="general"
            subtitle="팀 전체 공지 및 소통"
            actions={
              <div style={{ display: "flex", gap: 4 }}>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Phone size={18} />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Video size={18} />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Search size={18} />
                </button>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    border: "none",
                    background: "transparent",
                    cursor: "pointer",
                    color: "var(--ark-color-text-secondary)",
                  }}
                >
                  <Users size={18} />
                </button>
              </div>
            }
          />
        </div>
      </section>

      {/* ── 다양한 아이콘 ── */}
      <section className="docs-section" id="variants">
        <h2 className="section-title">다양한 채널 유형</h2>
        <p className="section-desc">
          아이콘을 바꿔 공개 채널, 비공개 채널, 그룹 DM 등의 유형을
          구분합니다.
        </p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
            maxWidth: 520,
          }}
        >
          <div
            style={{
              border: "1px solid var(--ark-color-border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <ChatHeader
              icon={<Hash size={18} />}
              title="public-channel"
              subtitle="공개 채널"
            />
          </div>
          <div
            style={{
              border: "1px solid var(--ark-color-border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <ChatHeader
              icon={<Lock size={18} />}
              title="private-channel"
              subtitle="비공개 채널"
            />
          </div>
          <div
            style={{
              border: "1px solid var(--ark-color-border)",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <ChatHeader
              icon={<Users size={18} />}
              title="팀 디자인"
              subtitle="멤버 6명"
            />
          </div>
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
                <td>icon</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>채널 아이콘</td>
              </tr>
              <tr>
                <td>title</td>
                <td>string</td>
                <td>필수</td>
                <td>채널 이름 또는 제목</td>
              </tr>
              <tr>
                <td>subtitle</td>
                <td>string</td>
                <td>-</td>
                <td>채널 설명 또는 부가 정보</td>
              </tr>
              <tr>
                <td>actions</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>우측 액션 버튼 영역</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
