import { LogViewer } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const SAMPLE_ENTRIES = [
  { id: 1, level: "info",    timestamp: new Date("2026-05-13T10:00:00.123"), message: "서버 시작 중..." },
  { id: 2, level: "success", timestamp: new Date("2026-05-13T10:00:00.456"), message: "데이터베이스 연결 완료" },
  { id: 3, level: "info",    timestamp: new Date("2026-05-13T10:00:01.001"), message: "포트 3000에서 수신 대기 중" },
  { id: 4, level: "debug",   timestamp: new Date("2026-05-13T10:00:02.300"), message: "캐시 초기화", meta: { size: "128MB" } },
  { id: 5, level: "warn",    timestamp: new Date("2026-05-13T10:00:05.800"), message: "응답 시간이 느립니다 (2.3s)" },
  { id: 6, level: "error",   timestamp: new Date("2026-05-13T10:00:08.100"), message: "외부 API 호출 실패", meta: { status: 503 } },
  { id: 7, level: "info",    timestamp: new Date("2026-05-13T10:00:09.200"), message: "재시도 중... (1/3)" },
  { id: 8, level: "success", timestamp: new Date("2026-05-13T10:00:10.500"), message: "재시도 성공" },
];

export function LogViewerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">LogViewer</h1>
        <p className="page-description">
          터미널 스타일 로그 뷰어 컴포넌트. 서버 로그, 빌드 출력, 디버그 메시지 등을 시각적으로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<LogViewer
  entries={[
    { id: 1, level: "info",    timestamp: new Date("2026-05-13T10:00:00.123"), message: "서버 시작 중..." },
    { id: 2, level: "success", timestamp: new Date("2026-05-13T10:00:00.456"), message: "데이터베이스 연결 완료" },
    { id: 3, level: "info",    timestamp: new Date("2026-05-13T10:00:01.001"), message: "포트 3000에서 수신 대기 중" },
    { id: 4, level: "debug",   timestamp: new Date("2026-05-13T10:00:02.300"), message: "캐시 초기화", meta: { size: "128MB" } },
    { id: 5, level: "warn",    timestamp: new Date("2026-05-13T10:00:05.800"), message: "응답 시간이 느립니다 (2.3s)" },
    { id: 6, level: "error",   timestamp: new Date("2026-05-13T10:00:08.100"), message: "외부 API 호출 실패", meta: { status: 503 } },
    { id: 7, level: "info",    timestamp: new Date("2026-05-13T10:00:09.200"), message: "재시도 중... (1/3)" },
    { id: 8, level: "success", timestamp: new Date("2026-05-13T10:00:10.500"), message: "재시도 성공" },
  ]}
/>`}
          scope={{ LogViewer }}
        />
      </section>

      <section className="docs-section" id="line-numbers">
        <h2 className="section-title">줄 번호 & 옵션</h2>
        <LiveCodeBlock
          code={`<LogViewer
  entries={[
    { level: "info",    message: "빌드 시작" },
    { level: "plain",   message: "> tsc --noEmit" },
    { level: "plain",   message: "> vite build" },
    { level: "success", message: "dist/index.js  512 kB" },
    { level: "success", message: "빌드 완료 (1.23s)" },
  ]}
  showLineNumbers
  showTimestamp={false}
  maxHeight={200}
/>`}
          scope={{ LogViewer }}
        />
      </section>

      <section className="docs-section" id="no-level">
        <h2 className="section-title">레벨 뱃지 없음</h2>
        <LiveCodeBlock
          code={`<LogViewer
  entries={[
    { message: "$ npm install" },
    { message: "added 1423 packages in 4.2s" },
    { message: "$ npm run build" },
    { message: "> akron-ui build" },
    { message: "> vite build && tsc --emitDeclarationOnly" },
  ]}
  showLevel={false}
  showTimestamp={false}
  maxHeight={200}
/>`}
          scope={{ LogViewer }}
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
              <tr><td>entries</td><td>LogEntry[]</td><td>필수</td><td>로그 항목 목록</td></tr>
              <tr><td>maxHeight</td><td>number | string</td><td>320</td><td>최대 높이 (px 또는 CSS 값)</td></tr>
              <tr><td>showTimestamp</td><td>boolean</td><td>true</td><td>타임스탬프 표시</td></tr>
              <tr><td>showLevel</td><td>boolean</td><td>true</td><td>레벨 뱃지 표시</td></tr>
              <tr><td>showLineNumbers</td><td>boolean</td><td>false</td><td>줄 번호 표시</td></tr>
              <tr><td>autoScroll</td><td>boolean</td><td>true</td><td>새 항목 추가 시 자동 스크롤</td></tr>
              <tr><td>formatTimestamp</td><td>(ts: Date) =&gt; string</td><td>HH:mm:ss.ms</td><td>타임스탬프 포맷 함수</td></tr>
              <tr><td>fontSize</td><td>'xs' | 'sm' | 'md'</td><td>'sm'</td><td>폰트 크기</td></tr>
            </tbody>
          </table>
        </div>

        <h3 style={{ marginTop: "1.5rem" }}>LogEntry</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>message</td><td>string</td><td>로그 메시지 (필수)</td></tr>
              <tr><td>level</td><td>'info' | 'warn' | 'error' | 'debug' | 'success' | 'plain'</td><td>로그 레벨</td></tr>
              <tr><td>timestamp</td><td>Date | string</td><td>타임스탬프</td></tr>
              <tr><td>id</td><td>string | number</td><td>고유 키</td></tr>
              <tr><td>meta</td><td>unknown</td><td>추가 메타 데이터 (JSON 표시)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
