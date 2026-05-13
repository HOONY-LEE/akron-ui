import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function TablePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Table</h1>
        <p className="page-description">
          데이터를 행과 열로 구조화하여 보여주는 테이블 컴포넌트입니다.
          서브컴포넌트 조합으로 유연하게 구성할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">Table</code>,{" "}
          <code className="inline-code">TableHeader</code>,{" "}
          <code className="inline-code">TableBody</code>,{" "}
          <code className="inline-code">TableRow</code>,{" "}
          <code className="inline-code">TableHead</code>,{" "}
          <code className="inline-code">TableCell</code>을 조합하여 사용합니다.
        </p>
        <LiveCodeBlock
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>사원명</TableHead>
      <TableHead>부서</TableHead>
      <TableHead>직급</TableHead>
      <TableHead>입사일</TableHead>
      <TableHead numeric>연봉 (만원)</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell>개발팀</TableCell>
      <TableCell>시니어</TableCell>
      <TableCell>2020-03-15</TableCell>
      <TableCell numeric>6,500</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>김영희</TableCell>
      <TableCell>디자인팀</TableCell>
      <TableCell>리드</TableCell>
      <TableCell>2019-07-01</TableCell>
      <TableCell numeric>7,200</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>이철수</TableCell>
      <TableCell>기획팀</TableCell>
      <TableCell>매니저</TableCell>
      <TableCell>2021-01-10</TableCell>
      <TableCell numeric>5,800</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>박지영</TableCell>
      <TableCell>마케팅팀</TableCell>
      <TableCell>주니어</TableCell>
      <TableCell>2023-09-01</TableCell>
      <TableCell numeric>4,200</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
          scope={{ Table, TableHeader, TableBody, TableRow, TableHead, TableCell }}
        />
      </section>

      <section className="docs-section" id="numeric">
        <h2 className="section-title">숫자 정렬</h2>
        <p className="section-desc">
          <code className="inline-code">numeric</code> prop을 사용하면 셀 내용이 우측 정렬되며
          tabular-nums 폰트 피처가 적용됩니다.
        </p>
        <LiveCodeBlock
          code={`<Table>
  <TableHeader>
    <TableRow>
      <TableHead>항목</TableHead>
      <TableHead numeric>수량</TableHead>
      <TableHead numeric>금액</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>사무용품</TableCell>
      <TableCell numeric>150</TableCell>
      <TableCell numeric>2,340,000</TableCell>
    </TableRow>
    <TableRow>
      <TableCell>소프트웨어 라이선스</TableCell>
      <TableCell numeric>25</TableCell>
      <TableCell numeric>18,750,000</TableCell>
    </TableRow>
  </TableBody>
</Table>`}
          scope={{ Table, TableHeader, TableBody, TableRow, TableHead, TableCell }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>컴포넌트</th>
                <th>Prop</th>
                <th>타입</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>TableHead</td>
                <td>numeric</td>
                <td>boolean</td>
                <td>우측 정렬 + tabular-nums</td>
              </tr>
              <tr>
                <td>TableCell</td>
                <td>numeric</td>
                <td>boolean</td>
                <td>우측 정렬 + tabular-nums</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
