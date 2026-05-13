import { Tabs, TabsList, TabsTrigger, TabsContent, Card, Input, Button, Stack } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TabsPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Tabs</h1>
        <p className="page-description">
          탭 네비게이션 컴포넌트. 콘텐츠를 탭으로 분리하여 전환합니다.
          line, solid, pill 세 가지 스타일 변형과 키보드 접근성을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">개요</TabsTrigger>
    <TabsTrigger value="tab2">상세 정보</TabsTrigger>
    <TabsTrigger value="tab3">히스토리</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <div style={{ padding: "8px 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
      개요 탭의 콘텐츠입니다.
    </div>
  </TabsContent>
  <TabsContent value="tab2">
    <div style={{ padding: "8px 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
      상세 정보 탭의 콘텐츠입니다.
    </div>
  </TabsContent>
  <TabsContent value="tab3">
    <div style={{ padding: "8px 0", fontSize: 14, color: "var(--ark-color-text-secondary)" }}>
      히스토리 탭의 콘텐츠입니다.
    </div>
  </TabsContent>
</Tabs>`}
          scope={{ Tabs, TabsList, TabsTrigger, TabsContent }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <p className="section-desc">
          <code className="inline-code">variant</code>: <code className="inline-code">line</code> | <code className="inline-code">solid</code> | <code className="inline-code">pill</code>
        </p>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
  {["line", "solid", "pill"].map((variant) => (
    <div key={variant}>
      <div style={{ fontSize: 12, fontWeight: 600, color: "var(--ark-color-text-secondary)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
        {variant}
      </div>
      <Tabs defaultValue="a" variant={variant}>
        <TabsList>
          <TabsTrigger value="a">메뉴 A</TabsTrigger>
          <TabsTrigger value="b">메뉴 B</TabsTrigger>
          <TabsTrigger value="c">메뉴 C</TabsTrigger>
        </TabsList>
        <TabsContent value="a"><div style={{ paddingTop: 8, fontSize: 14, color: "var(--ark-color-text-secondary)" }}>메뉴 A 콘텐츠</div></TabsContent>
        <TabsContent value="b"><div style={{ paddingTop: 8, fontSize: 14, color: "var(--ark-color-text-secondary)" }}>메뉴 B 콘텐츠</div></TabsContent>
        <TabsContent value="c"><div style={{ paddingTop: 8, fontSize: 14, color: "var(--ark-color-text-secondary)" }}>메뉴 C 콘텐츠</div></TabsContent>
      </Tabs>
    </div>
  ))}
</div>`}
          scope={{ Tabs, TabsList, TabsTrigger, TabsContent }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">활성화</TabsTrigger>
    <TabsTrigger value="disabled" disabled>비활성화</TabsTrigger>
    <TabsTrigger value="other">다른 탭</TabsTrigger>
  </TabsList>
  <TabsContent value="active">
    <div style={{ paddingTop: 8, fontSize: 14, color: "var(--ark-color-text-secondary)" }}>활성화된 탭 콘텐츠</div>
  </TabsContent>
  <TabsContent value="other">
    <div style={{ paddingTop: 8, fontSize: 14, color: "var(--ark-color-text-secondary)" }}>다른 탭 콘텐츠</div>
  </TabsContent>
</Tabs>`}
          scope={{ Tabs, TabsList, TabsTrigger, TabsContent }}
        />
      </section>

      <section className="docs-section" id="controlled">
        <h2 className="section-title">폼과 함께</h2>
        <p className="section-desc">탭을 사용한 폼 단계 구성 예시입니다.</p>
        <LiveCodeBlock
          code={`function Demo() {
  const [tab, setTab] = useState("basic");
  return (
    <Card>
      <div style={{ padding: 20 }}>
        <Tabs value={tab} onValueChange={setTab} variant="solid">
          <TabsList>
            <TabsTrigger value="basic">기본 정보</TabsTrigger>
            <TabsTrigger value="contact">연락처</TabsTrigger>
            <TabsTrigger value="settings">설정</TabsTrigger>
          </TabsList>
          <TabsContent value="basic">
            <Stack direction="vertical" gap={12} style={{ paddingTop: 8 }}>
              <Input label="이름" placeholder="홍길동" />
              <Input label="직급" placeholder="사원" />
              <Button variant="primary" size="sm" onClick={() => setTab("contact")}>다음 →</Button>
            </Stack>
          </TabsContent>
          <TabsContent value="contact">
            <Stack direction="vertical" gap={12} style={{ paddingTop: 8 }}>
              <Input label="이메일" placeholder="hong@example.com" />
              <Input label="전화번호" placeholder="010-0000-0000" />
              <Button variant="primary" size="sm" onClick={() => setTab("settings")}>다음 →</Button>
            </Stack>
          </TabsContent>
          <TabsContent value="settings">
            <Stack direction="vertical" gap={12} style={{ paddingTop: 8 }}>
              <div style={{ fontSize: 14, color: "var(--ark-color-text-secondary)" }}>알림 및 접근 설정</div>
              <Button variant="primary" size="sm">저장</Button>
            </Stack>
          </TabsContent>
        </Tabs>
      </div>
    </Card>
  );
}
render(<Demo />)`}
          scope={{ Tabs, TabsList, TabsTrigger, TabsContent, Card, Input, Button, Stack }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Tabs Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>string</td><td>-</td><td>선택된 탭 (제어)</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본 선택 탭 (비제어)</td></tr>
              <tr><td>onValueChange</td><td>(value: string) =&gt; void</td><td>-</td><td>탭 변경 핸들러</td></tr>
              <tr><td>variant</td><td>'line' | 'solid' | 'pill'</td><td>'line'</td><td>스타일 변형</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
