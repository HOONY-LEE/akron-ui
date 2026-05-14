import { PermissionTable } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function PermissionTablePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">PermissionTable</h1>
        <p className="page-description">
          권한 매트릭스 테이블 컴포넌트. 역할별 권한을 시각적으로 관리합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [values, setValues] = React.useState({
    "users-view": { admin: "granted", editor: "granted", viewer: "granted" },
    "users-create": { admin: "granted", editor: "granted", viewer: "denied" },
    "users-edit": { admin: "granted", editor: "partial", viewer: "denied" },
    "users-delete": { admin: "granted", editor: "denied", viewer: "denied" },
    "posts-view": { admin: "granted", editor: "granted", viewer: "granted" },
    "posts-create": { admin: "granted", editor: "granted", viewer: "denied" },
    "posts-edit": { admin: "granted", editor: "granted", viewer: "denied" },
    "posts-delete": { admin: "granted", editor: "denied", viewer: "denied" },
    "settings": { admin: "granted", editor: "denied", viewer: "denied" },
  });

  return (
    <PermissionTable
      columns={[
        { id: "admin", label: "관리자" },
        { id: "editor", label: "편집자" },
        { id: "viewer", label: "뷰어" },
      ]}
      rows={[
        { id: "users-view", label: "사용자 조회", category: "사용자 관리" },
        { id: "users-create", label: "사용자 생성", category: "사용자 관리" },
        { id: "users-edit", label: "사용자 수정", category: "사용자 관리" },
        { id: "users-delete", label: "사용자 삭제", description: "영구 삭제 포함", category: "사용자 관리" },
        { id: "posts-view", label: "게시물 조회", category: "게시물 관리" },
        { id: "posts-create", label: "게시물 작성", category: "게시물 관리" },
        { id: "posts-edit", label: "게시물 수정", category: "게시물 관리" },
        { id: "posts-delete", label: "게시물 삭제", category: "게시물 관리" },
        { id: "settings", label: "시스템 설정", category: "시스템" },
      ]}
      values={values}
      onChange={(rowId, colId, value) => {
        setValues(prev => ({
          ...prev,
          [rowId]: { ...prev[rowId], [colId]: value },
        }));
      }}
    />
  );
}`}
          scope={{ PermissionTable }}
        />
      </section>

      <section className="docs-section" id="readonly">
        <h2 className="section-title">읽기 전용</h2>
        <LiveCodeBlock
          code={`<PermissionTable
  readOnly
  columns={[
    { id: "admin", label: "관리자" },
    { id: "user", label: "일반 사용자" },
  ]}
  rows={[
    { id: "read", label: "읽기" },
    { id: "write", label: "쓰기" },
    { id: "delete", label: "삭제" },
  ]}
  values={{
    read: { admin: "granted", user: "granted" },
    write: { admin: "granted", user: "denied" },
    delete: { admin: "granted", user: "denied" },
  }}
  showCategories={false}
/>`}
          scope={{ PermissionTable }}
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
              <tr><td>rows</td><td>PermissionRow[]</td><td>필수</td><td>권한 행 목록</td></tr>
              <tr><td>columns</td><td>PermissionColumn[]</td><td>필수</td><td>역할 열 목록</td></tr>
              <tr><td>values</td><td>Record&lt;string, Record&lt;string, PermissionValue&gt;&gt;</td><td>필수</td><td>권한 값</td></tr>
              <tr><td>onChange</td><td>(rowId, colId, value) =&gt; void</td><td>-</td><td>변경 콜백</td></tr>
              <tr><td>readOnly</td><td>boolean</td><td>false</td><td>읽기 전용</td></tr>
              <tr><td>size</td><td>'sm' | 'md'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>showCategories</td><td>boolean</td><td>true</td><td>카테고리 그룹</td></tr>
              <tr><td>cycleValues</td><td>PermissionValue[]</td><td>['granted','denied','none']</td><td>클릭 순환 값</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
