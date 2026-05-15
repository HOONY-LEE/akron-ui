import { useState, useCallback } from "react";
import { PullToRefresh } from "@sunghoon_lee/akron-ui";

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function PullToRefreshPage() {
  const [items, setItems] = useState([
    "항목 1 — 아래로 당겨서 새로고침",
    "항목 2",
    "항목 3",
    "항목 4",
    "항목 5",
  ]);
  const [refreshCount, setRefreshCount] = useState(0);

  const handleRefresh = useCallback(async () => {
    await wait(1500);
    setRefreshCount((c) => c + 1);
    setItems((prev) => [
      `새 항목 (${refreshCount + 1}번째 새로고침)`,
      ...prev,
    ]);
  }, [refreshCount]);

  const [controlledRefreshing, setControlledRefreshing] = useState(false);
  const handleControlledRefresh = useCallback(() => {
    setControlledRefreshing(true);
    setTimeout(() => setControlledRefreshing(false), 2000);
  }, []);

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>PullToRefresh</h2>
      <p style={{ color: "var(--ark-color-text-secondary)", marginBottom: 32 }}>
        모바일에서 리스트를 아래로 당겨 새로고침합니다.
      </p>

      {/* 기본 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>기본 사용</h3>
        <p
          style={{
            color: "var(--ark-color-text-secondary)",
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          아래 영역을 터치로 아래로 당기면 새로고침이 실행됩니다. (모바일에서 테스트)
        </p>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
            height: 300,
          }}
        >
          <PullToRefresh onRefresh={handleRefresh}>
            <div style={{ padding: 16 }}>
              {items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 0",
                    borderBottom: "1px solid var(--ark-color-border)",
                    fontSize: 14,
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </PullToRefresh>
        </div>
      </section>

      {/* Controlled */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>Controlled 모드</h3>
        <p
          style={{
            color: "var(--ark-color-text-secondary)",
            fontSize: 14,
            marginBottom: 12,
          }}
        >
          <code>refreshing</code> prop으로 외부에서 상태를 제어합니다.
        </p>
        <button
          type="button"
          onClick={handleControlledRefresh}
          disabled={controlledRefreshing}
          style={{
            padding: "8px 16px",
            borderRadius: 6,
            border: "1px solid var(--ark-color-border)",
            background: "var(--ark-color-bg)",
            cursor: controlledRefreshing ? "default" : "pointer",
            marginBottom: 12,
            fontSize: 14,
          }}
        >
          {controlledRefreshing ? "새로고침 중..." : "새로고침 트리거"}
        </button>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
            height: 200,
          }}
        >
          <PullToRefresh
            onRefresh={handleControlledRefresh}
            refreshing={controlledRefreshing}
          >
            <div style={{ padding: 16 }}>
              <div
                style={{
                  padding: "12px 0",
                  fontSize: 14,
                  color: "var(--ark-color-text-secondary)",
                }}
              >
                Controlled 새로고침 데모
              </div>
              <div
                style={{
                  padding: "12px 0",
                  fontSize: 14,
                  color: "var(--ark-color-text-secondary)",
                }}
              >
                버튼을 누르거나 당기세요
              </div>
            </div>
          </PullToRefresh>
        </div>
      </section>

      {/* 커스텀 텍스트 */}
      <section style={{ marginBottom: 40 }}>
        <h3 style={{ marginBottom: 12 }}>커스텀 텍스트</h3>
        <div
          style={{
            border: "1px solid var(--ark-color-border)",
            borderRadius: 12,
            overflow: "hidden",
            height: 200,
          }}
        >
          <PullToRefresh
            onRefresh={async () => await wait(1500)}
            pullText="Pull down to reload"
            releaseText="Release to reload"
            refreshingText="Reloading..."
          >
            <div style={{ padding: 16 }}>
              <div style={{ padding: "12px 0", fontSize: 14 }}>
                영문 텍스트 커스텀 예시
              </div>
            </div>
          </PullToRefresh>
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
              ["onRefresh", "() => void | Promise<void>", "필수"],
              ["refreshing", "boolean", "-"],
              ["threshold", "number", "60"],
              ["maxPull", "number", "120"],
              ["disabled", "boolean", "false"],
              ["pullText", "string", '"당겨서 새로고침"'],
              ["releaseText", "string", '"놓으면 새로고침"'],
              ["refreshingText", "string", '"새로고침 중..."'],
              ["indicator", "ReactNode", "-"],
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
