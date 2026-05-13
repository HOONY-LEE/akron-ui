import { TransferList } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

const FRUITS = [
  { value: "apple", label: "🍎 사과" },
  { value: "banana", label: "🍌 바나나" },
  { value: "cherry", label: "🍒 체리" },
  { value: "grape", label: "🍇 포도" },
  { value: "mango", label: "🥭 망고" },
  { value: "orange", label: "🍊 오렌지" },
  { value: "pear", label: "🍐 배" },
  { value: "watermelon", label: "🍉 수박" },
];

export function TransferListPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">TransferList</h1>
        <p className="page-description">
          이중 목록 전송 컴포넌트. 두 목록 사이에서 아이템을 선택하여 이동시킵니다. 권한 설정, 항목 선택 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<TransferList
  sourceItems={[
    { value: "apple", label: "🍎 사과" },
    { value: "banana", label: "🍌 바나나" },
    { value: "cherry", label: "🍒 체리" },
    { value: "grape", label: "🍇 포도" },
    { value: "mango", label: "🥭 망고" },
  ]}
  targetItems={[
    { value: "orange", label: "🍊 오렌지" },
    { value: "pear", label: "🍐 배" },
  ]}
  onChange={(source, target) => console.log(source, target)}
/>`}
          scope={{ TransferList }}
        />
      </section>

      <section className="docs-section" id="searchable">
        <h2 className="section-title">검색 가능</h2>
        <LiveCodeBlock
          code={`<TransferList
  sourceItems={[
    { value: "apple", label: "🍎 사과" },
    { value: "banana", label: "🍌 바나나" },
    { value: "cherry", label: "🍒 체리" },
    { value: "grape", label: "🍇 포도" },
    { value: "mango", label: "🥭 망고" },
    { value: "orange", label: "🍊 오렌지" },
    { value: "pear", label: "🍐 배" },
    { value: "watermelon", label: "🍉 수박" },
  ]}
  targetItems={[]}
  searchable
  sourceTitle="전체 과일"
  targetTitle="선택한 과일"
/>`}
          scope={{ TransferList }}
        />
      </section>

      <section className="docs-section" id="disabled-items">
        <h2 className="section-title">비활성화 항목</h2>
        <LiveCodeBlock
          code={`<TransferList
  sourceItems={[
    { value: "apple", label: "사과" },
    { value: "banana", label: "바나나", disabled: true },
    { value: "cherry", label: "체리" },
  ]}
  targetItems={[
    { value: "grape", label: "포도 (고정)", disabled: true },
    { value: "mango", label: "망고" },
  ]}
  sourceTitle="선택 가능"
  targetTitle="선택됨"
/>`}
          scope={{ TransferList }}
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
              <tr><td>sourceItems</td><td>TransferListItem[]</td><td>[]</td><td>왼쪽(출처) 목록</td></tr>
              <tr><td>targetItems</td><td>TransferListItem[]</td><td>[]</td><td>오른쪽(대상) 목록</td></tr>
              <tr><td>onChange</td><td>(source, target) =&gt; void</td><td>-</td><td>변경 핸들러</td></tr>
              <tr><td>sourceTitle</td><td>string</td><td>'선택 가능'</td><td>왼쪽 목록 제목</td></tr>
              <tr><td>targetTitle</td><td>string</td><td>'선택됨'</td><td>오른쪽 목록 제목</td></tr>
              <tr><td>searchable</td><td>boolean</td><td>false</td><td>검색 입력 활성화</td></tr>
              <tr><td>listHeight</td><td>number | string</td><td>240</td><td>목록 높이</td></tr>
            </tbody>
          </table>
        </div>
        <h3 style={{ marginTop: 16 }}>TransferListItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>필드</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>value</td><td>string</td><td>고유 식별자</td></tr>
              <tr><td>label</td><td>string</td><td>표시 텍스트</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>이동 불가 여부</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
