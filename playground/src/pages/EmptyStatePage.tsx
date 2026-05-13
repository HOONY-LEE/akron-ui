import { EmptyState, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import { Search, FolderOpen, Users, FileX, WifiOff } from "lucide-react";

export function EmptyStatePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">EmptyState</h1>
        <p className="page-description">
          빈 상태 표시 컴포넌트. 데이터 없음, 검색 결과 없음, 오류 등의 상태를 일관된 UI로 표시합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<EmptyState
  title="데이터가 없습니다"
  description="아직 등록된 항목이 없습니다. 새 항목을 추가해 보세요."
  action={<Button size="sm">새 항목 추가</Button>}
  bordered
/>`}
          scope={{ EmptyState, Button }}
        />
      </section>

      <section className="docs-section" id="icons">
        <h2 className="section-title">아이콘 변형</h2>
        <LiveCodeBlock
          code={`function Demo() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <EmptyState
        icon={<Search size={40} strokeWidth={1.5} />}
        title="검색 결과 없음"
        description="다른 검색어로 다시 시도해 보세요."
        bordered
        size="sm"
      />
      <EmptyState
        icon={<FolderOpen size={40} strokeWidth={1.5} />}
        title="폴더가 비어 있음"
        description="이 폴더에 파일이 없습니다."
        bordered
        size="sm"
      />
      <EmptyState
        icon={<Users size={40} strokeWidth={1.5} />}
        title="팀원 없음"
        description="팀원을 초대하세요."
        action={<Button size="sm" variant="outline">초대하기</Button>}
        bordered
        size="sm"
      />
      <EmptyState
        icon={<WifiOff size={40} strokeWidth={1.5} />}
        title="연결 실패"
        description="네트워크 연결을 확인해 주세요."
        action={<Button size="sm" variant="outline">다시 시도</Button>}
        bordered
        size="sm"
      />
    </div>
  );
}
render(<Demo />)`}
          scope={{ EmptyState, Button, Search, FolderOpen, Users, WifiOff }}
          noInline
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <EmptyState size="sm" title="Small 크기" description="작은 공간에 사용합니다." bordered />
  <EmptyState size="md" title="Medium 크기 (기본)" description="일반 콘텐츠 영역에 사용합니다." bordered />
  <EmptyState size="lg" title="Large 크기" description="전체 페이지나 넓은 영역에 사용합니다." bordered />
</div>`}
          scope={{ EmptyState }}
        />
      </section>

      <section className="docs-section" id="in-table">
        <h2 className="section-title">테이블 내부 사용</h2>
        <LiveCodeBlock
          code={`<div style={{ border: "1px solid var(--ark-color-border)", borderRadius: 8, overflow: "hidden" }}>
  <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--ark-color-border)", fontWeight: 600, fontSize: 14 }}>
    사용자 목록
  </div>
  <EmptyState
    icon={<FileX size={36} strokeWidth={1.5} />}
    title="사용자 없음"
    description="필터 조건에 맞는 사용자가 없습니다."
    size="sm"
    action={<Button size="sm" variant="outline">필터 초기화</Button>}
  />
</div>`}
          scope={{ EmptyState, Button, FileX }}
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
              <tr><td>icon</td><td>ReactNode</td><td>Inbox 아이콘</td><td>아이콘 요소</td></tr>
              <tr><td>title</td><td>string</td><td>'데이터 없음'</td><td>제목</td></tr>
              <tr><td>description</td><td>string</td><td>-</td><td>설명 텍스트</td></tr>
              <tr><td>action</td><td>ReactNode</td><td>-</td><td>액션 버튼/요소</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>bordered</td><td>boolean</td><td>false</td><td>점선 테두리 표시</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
