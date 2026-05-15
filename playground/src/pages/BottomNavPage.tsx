import { useState } from "react";
import { BottomNav } from "@sunghoon_lee/akron-ui";
import type { BottomNavItem } from "@sunghoon_lee/akron-ui";
import {
  Home,
  MessageSquare,
  Search,
  Bell,
  User,
  Calendar,
  Settings,
} from "lucide-react";

const basicItems: BottomNavItem[] = [
  { key: "home", label: "홈", icon: <Home size={22} /> },
  { key: "chat", label: "채팅", icon: <MessageSquare size={22} />, badge: 3 },
  { key: "search", label: "검색", icon: <Search size={22} /> },
  {
    key: "notifications",
    label: "알림",
    icon: <Bell size={22} />,
    badge: true,
  },
  { key: "profile", label: "마이", icon: <User size={22} /> },
];

const minimalItems: BottomNavItem[] = [
  { key: "home", label: "홈", icon: <Home size={22} /> },
  { key: "calendar", label: "일정", icon: <Calendar size={22} /> },
  { key: "settings", label: "설정", icon: <Settings size={22} /> },
];

export function BottomNavPage() {
  const [active1, setActive1] = useState("home");
  const [active2, setActive2] = useState("home");
  const [active3, setActive3] = useState("home");

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", paddingBottom: 120 }}>
      <h2 style={{ marginBottom: 8 }}>BottomNav</h2>
      <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32 }}>
        모바일 하단 탭 네비게이션 바. iOS / Android 스타일.
      </p>

      {/* 기본 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>기본 사용</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 200,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ark-color-text-secondary)",
              fontSize: 14,
            }}
          >
            선택됨: {basicItems.find((i) => i.key === active1)?.label}
          </div>
          <BottomNav
            items={basicItems}
            value={active1}
            onChange={setActive1}
            fixed={false}
          />
        </div>
      </section>

      {/* 라벨 숨김 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>라벨 숨김</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ark-color-text-secondary)",
              fontSize: 14,
            }}
          >
            아이콘만
          </div>
          <BottomNav
            items={minimalItems}
            value={active2}
            onChange={setActive2}
            showLabels={false}
            fixed={false}
          />
        </div>
      </section>

      {/* 뱃지 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>뱃지</h3>
        <p
          style={{
            color: "var(--ark-color-text-secondary)",
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          숫자 뱃지 (99+ 자동 처리) 또는 dot 뱃지를 지원합니다.
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <BottomNav
            items={[
              { key: "a", label: "메시지", icon: <MessageSquare size={22} />, badge: 5 },
              { key: "b", label: "알림", icon: <Bell size={22} />, badge: 128 },
              { key: "c", label: "온라인", icon: <User size={22} />, badge: true },
              { key: "d", label: "홈", icon: <Home size={22} /> },
            ]}
            value={active3}
            onChange={setActive3}
            fixed={false}
          />
        </div>
      </section>

      {/* 비활성화 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>비활성화</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
          }}
        >
          <BottomNav
            items={minimalItems}
            value="home"
            disabled
            fixed={false}
          />
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
              ["items", "BottomNavItem[]", "필수"],
              ["value", "string", "-"],
              ["onChange", "(key: string) => void", "-"],
              ["showLabels", "boolean", "true"],
              ["disabled", "boolean", "false"],
              ["fixed", "boolean", "true"],
              ["safeArea", "boolean", "true"],
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
