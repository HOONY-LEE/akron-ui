import { useState } from "react";
import { SwipeAction } from "@sunghoon_lee/akron-ui";
import type { SwipeActionButton } from "@sunghoon_lee/akron-ui";
import { Trash2, Archive, Pin, Star, MailOpen } from "lucide-react";

const rightActions: SwipeActionButton[] = [
  {
    key: "archive",
    label: "보관",
    icon: <Archive size={20} />,
    color: "primary",
    onClick: () => alert("보관됨!"),
  },
  {
    key: "delete",
    label: "삭제",
    icon: <Trash2 size={20} />,
    color: "error",
    onClick: () => alert("삭제됨!"),
  },
];

const leftActions: SwipeActionButton[] = [
  {
    key: "pin",
    label: "고정",
    icon: <Pin size={20} />,
    color: "warning",
    onClick: () => alert("고정됨!"),
  },
  {
    key: "star",
    label: "즐겨찾기",
    icon: <Star size={20} />,
    color: "success",
    onClick: () => alert("즐겨찾기!"),
  },
];

function DemoItem({
  title,
  subtitle,
  time,
}: {
  title: string;
  subtitle: string;
  time: string;
}) {
  return (
    <div
      style={{
        padding: "12px 16px",
        borderBottom: "1px solid var(--ark-color-border)",
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
      }}
    >
      <div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 13,
            color: "var(--ark-color-text-secondary)",
          }}
        >
          {subtitle}
        </div>
      </div>
      <div
        style={{
          fontSize: 12,
          color: "var(--ark-color-text-disabled)",
          whiteSpace: "nowrap",
        }}
      >
        {time}
      </div>
    </div>
  );
}

export function SwipeActionPage() {
  const [items, setItems] = useState([
    {
      id: 1,
      title: "김철수",
      subtitle: "회의 시간 확인 부탁드립니다",
      time: "오전 10:30",
    },
    {
      id: 2,
      title: "이영희",
      subtitle: "보고서 수정했습니다",
      time: "오전 9:15",
    },
    {
      id: 3,
      title: "박민수",
      subtitle: "점심 같이 하실래요?",
      time: "어제",
    },
  ]);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>SwipeAction</h2>
      <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32 }}>
        리스트 항목을 좌우로 스와이프하여 빠른 액션을 실행합니다. iOS 메일/메시지 스타일.
      </p>

      {/* 기본 (우측 액션) */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>← 왼쪽 스와이프 (우측 액션)</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          {items.map((item) => (
            <SwipeAction
              key={item.id}
              rightActions={[
                {
                  key: "archive",
                  label: "보관",
                  icon: <Archive size={20} />,
                  color: "primary",
                },
                {
                  key: "delete",
                  label: "삭제",
                  icon: <Trash2 size={20} />,
                  color: "error",
                  onClick: () =>
                    setItems((prev) =>
                      prev.filter((i) => i.id !== item.id),
                    ),
                },
              ]}
            >
              <DemoItem {...item} />
            </SwipeAction>
          ))}
          {items.length === 0 && (
            <div
              style={{
                padding: 24,
                textAlign: "center",
                color: "var(--ark-color-text-disabled)",
                fontSize: 14,
              }}
            >
              모든 항목이 삭제되었습니다.{" "}
              <button
                type="button"
                style={{
                  color: "var(--ark-color-primary-500)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
                onClick={() =>
                  setItems([
                    {
                      id: 1,
                      title: "김철수",
                      subtitle: "회의 시간 확인 부탁드립니다",
                      time: "오전 10:30",
                    },
                    {
                      id: 2,
                      title: "이영희",
                      subtitle: "보고서 수정했습니다",
                      time: "오전 9:15",
                    },
                    {
                      id: 3,
                      title: "박민수",
                      subtitle: "점심 같이 하실래요?",
                      time: "어제",
                    },
                  ])
                }
              >
                복원
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 양방향 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>양방향 스와이프</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <SwipeAction rightActions={rightActions} leftActions={leftActions}>
            <DemoItem
              title="프로젝트 업데이트"
              subtitle="좌/우로 스와이프 해보세요"
              time="방금"
            />
          </SwipeAction>
          <SwipeAction
            rightActions={[
              {
                key: "read",
                label: "읽음",
                icon: <MailOpen size={20} />,
                color: "primary",
              },
            ]}
            leftActions={[
              {
                key: "pin",
                label: "고정",
                icon: <Pin size={20} />,
                color: "warning",
              },
            ]}
          >
            <DemoItem
              title="주간 리포트"
              subtitle="이번 주 실적 정리입니다"
              time="1시간 전"
            />
          </SwipeAction>
        </div>
      </section>

      {/* Props */}
      <section>
        <h3 style={{ marginBottom: 12 }}>Props</h3>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "2px solid var(--ark-color-border)",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px 12px" }}>Prop</th>
              <th style={{ padding: "8px 12px" }}>타입</th>
              <th style={{ padding: "8px 12px" }}>기본값</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["rightActions", "SwipeActionButton[]", "[]"],
              ["leftActions", "SwipeActionButton[]", "[]"],
              ["disabled", "boolean", "false"],
              ["threshold", "number", "80"],
              ["autoClose", "boolean", "true"],
              ["children", "ReactNode", "필수"],
            ].map(([prop, type, def]) => (
              <tr
                key={prop}
                style={{
                  borderBottom: "1px solid var(--ark-color-border)",
                }}
              >
                <td style={{ padding: "8px 12px", fontWeight: 600 }}>
                  {prop}
                </td>
                <td
                  style={{
                    padding: "8px 12px",
                    fontFamily: "monospace",
                    fontSize: 13,
                  }}
                >
                  {type}
                </td>
                <td style={{ padding: "8px 12px" }}>{def}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
