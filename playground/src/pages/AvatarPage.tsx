import { Avatar, AvatarGroup } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AvatarPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Avatar</h1>
        <p className="page-description">
          프로필 아바타 컴포넌트. 이미지, 이니셜, 기본 아이콘 순으로 폴백됩니다.
          상태 표시, 그룹 배치를 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <p className="section-desc">
          <code className="inline-code">name</code>을 전달하면 이니셜을 자동 생성합니다. 이름에서 색상도 자동으로 결정됩니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Avatar name="김지훈" />
  <Avatar name="이수진" />
  <Avatar name="박민재" />
  <Avatar name="John Doe" />
  <Avatar />
</div>`}
          scope={{ Avatar }}
        />
      </section>

      <section className="docs-section" id="image">
        <h2 className="section-title">이미지</h2>
        <p className="section-desc">
          <code className="inline-code">src</code>로 이미지를 표시합니다. 이미지 로드 실패 시 이니셜로 폴백됩니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Avatar
    src="https://i.pravatar.cc/150?img=3"
    name="Alice"
    size="lg"
  />
  <Avatar
    src="https://i.pravatar.cc/150?img=8"
    name="Bob"
    size="lg"
  />
  <Avatar
    src="broken-url.jpg"
    name="이미지 실패"
    size="lg"
  />
</div>`}
          scope={{ Avatar }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <p className="section-desc">
          <code className="inline-code">size</code>: <code className="inline-code">xs</code> | <code className="inline-code">sm</code> | <code className="inline-code">md</code> | <code className="inline-code">lg</code> | <code className="inline-code">xl</code> | <code className="inline-code">2xl</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Avatar size="xs" name="A" />
  <Avatar size="sm" name="B" />
  <Avatar size="md" name="C" />
  <Avatar size="lg" name="D" />
  <Avatar size="xl" name="E" />
  <Avatar size="2xl" name="F" />
</div>`}
          scope={{ Avatar }}
        />
      </section>

      <section className="docs-section" id="shape">
        <h2 className="section-title">모양</h2>
        <p className="section-desc">
          <code className="inline-code">shape="square"</code>로 사각형 아바타를 사용합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
  <Avatar shape="circle" name="원형" size="lg" />
  <Avatar shape="square" name="사각" size="lg" />
</div>`}
          scope={{ Avatar }}
        />
      </section>

      <section className="docs-section" id="status">
        <h2 className="section-title">상태 표시</h2>
        <p className="section-desc">
          <code className="inline-code">status</code>: <code className="inline-code">online</code> | <code className="inline-code">offline</code> | <code className="inline-code">away</code> | <code className="inline-code">busy</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <Avatar name="김지훈" status="online" size="lg" />
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>online</span>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <Avatar name="이수진" status="away" size="lg" />
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>away</span>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <Avatar name="박민재" status="busy" size="lg" />
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>busy</span>
  </div>
  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
    <Avatar name="최영호" status="offline" size="lg" />
    <span style={{ fontSize: 12, color: "var(--ark-color-text-secondary)" }}>offline</span>
  </div>
</div>`}
          scope={{ Avatar }}
        />
      </section>

      <section className="docs-section" id="group">
        <h2 className="section-title">아바타 그룹</h2>
        <p className="section-desc">
          <code className="inline-code">AvatarGroup</code>으로 여러 아바타를 겹쳐 표시합니다. <code className="inline-code">max</code>로 최대 개수를 제한합니다.
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <AvatarGroup>
    <Avatar name="김지훈" />
    <Avatar name="이수진" />
    <Avatar name="박민재" />
    <Avatar name="최영호" />
  </AvatarGroup>

  <AvatarGroup max={3}>
    <Avatar name="김지훈" />
    <Avatar name="이수진" />
    <Avatar name="박민재" />
    <Avatar name="최영호" />
    <Avatar name="정다은" />
    <Avatar name="오승우" />
  </AvatarGroup>
</div>`}
          scope={{ Avatar, AvatarGroup }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Avatar Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>src</td><td>string</td><td>-</td><td>이미지 URL</td></tr>
              <tr><td>name</td><td>string</td><td>-</td><td>이름 (이니셜 + 색상 자동 생성)</td></tr>
              <tr><td>size</td><td>'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>shape</td><td>'circle' | 'square'</td><td>'circle'</td><td>모양</td></tr>
              <tr><td>status</td><td>'online' | 'offline' | 'away' | 'busy'</td><td>-</td><td>상태 점 표시</td></tr>
              <tr><td>bgColor</td><td>string</td><td>-</td><td>배경 색상 (CSS 값, name 색상 오버라이드)</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle">AvatarGroup Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>max</td><td>number</td><td>-</td><td>최대 표시 개수 (초과 시 +N 표시)</td></tr>
              <tr><td>size</td><td>AvatarSize</td><td>'md'</td><td>오버플로우 뱃지 크기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
