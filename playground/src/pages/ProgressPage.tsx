import { Progress, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ProgressPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">ProgressBar</h1>
        <p className="page-description">
          진행률 표시 바. 작업 진행 상황을 시각적으로 표현합니다.
          색상, 크기, 줄무늬, 애니메이션 옵션을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
  <Progress value={30} label="파일 업로드" showValue />
  <Progress value={65} label="처리 중" showValue />
  <Progress value={100} label="완료" showValue />
</div>`}
          scope={{ Progress }}
        />
      </section>

      <section className="docs-section" id="colors">
        <h2 className="section-title">색상</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
  {[
    { color: "primary", value: 60, label: "Primary" },
    { color: "success", value: 100, label: "Success" },
    { color: "warning", value: 40, label: "Warning" },
    { color: "error", value: 20, label: "Error" },
    { color: "info", value: 80, label: "Info" },
  ].map(({ color, value, label }) => (
    <Progress key={color} color={color} value={value} label={label} showValue />
  ))}
</div>`}
          scope={{ Progress }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
  <Progress size="xs" value={70} />
  <Progress size="sm" value={70} />
  <Progress size="md" value={70} />
  <Progress size="lg" value={70} />
</div>`}
          scope={{ Progress }}
        />
      </section>

      <section className="docs-section" id="striped">
        <h2 className="section-title">줄무늬 & 애니메이션</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
  <Progress value={60} label="Striped" striped />
  <Progress value={60} label="Striped + Animated" striped animated />
</div>`}
          scope={{ Progress }}
        />
      </section>

      <section className="docs-section" id="dynamic">
        <h2 className="section-title">동적 제어</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [value, setValue] = useState(0);
  const running = value > 0 && value < 100;

  const start = () => {
    setValue(0);
    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) { clearInterval(interval); return 100; }
        return v + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, width: 360 }}>
      <Progress
        value={Math.min(value, 100)}
        label="업로드 진행률"
        showValue
        color={value >= 100 ? "success" : "primary"}
        striped={running}
        animated={running}
      />
      <Button variant="outline" size="sm" onClick={start} disabled={running}>
        {value >= 100 ? "다시 시작" : running ? "진행 중..." : "시작"}
      </Button>
    </div>
  );
}
render(<Demo />)`}
          scope={{ Progress, Button }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>number</td><td>0</td><td>현재 값 (0~max)</td></tr>
              <tr><td>max</td><td>number</td><td>100</td><td>최대 값</td></tr>
              <tr><td>color</td><td>'primary' | 'success' | 'warning' | 'error' | 'info'</td><td>'primary'</td><td>색상</td></tr>
              <tr><td>size</td><td>'xs' | 'sm' | 'md' | 'lg'</td><td>'md'</td><td>높이 크기</td></tr>
              <tr><td>label</td><td>string</td><td>-</td><td>라벨 텍스트</td></tr>
              <tr><td>showValue</td><td>boolean</td><td>false</td><td>퍼센트 표시</td></tr>
              <tr><td>striped</td><td>boolean</td><td>false</td><td>줄무늬 패턴</td></tr>
              <tr><td>animated</td><td>boolean</td><td>false</td><td>줄무늬 애니메이션</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
