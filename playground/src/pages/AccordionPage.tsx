import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AccordionPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Accordion</h1>
        <p className="page-description">
          접기/펼치기 섹션 컴포넌트. 콘텐츠를 그룹별로 접어서 공간을 절약합니다.
          단일 또는 다중 열기 모드, 부드러운 애니메이션, 키보드 접근성을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<Accordion defaultValue="item1" style={{ width: 480 }}>
  <AccordionItem value="item1">
    <AccordionTrigger>계정 정보는 어디서 확인하나요?</AccordionTrigger>
    <AccordionContent>
      상단 메뉴의 프로필 아이콘을 클릭하면 계정 정보 페이지로 이동합니다.
      이름, 이메일, 부서 정보를 확인하고 수정할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2">
    <AccordionTrigger>비밀번호를 잊었어요</AccordionTrigger>
    <AccordionContent>
      로그인 페이지에서 "비밀번호 찾기"를 클릭하세요.
      등록된 이메일 주소로 재설정 링크를 보내드립니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item3">
    <AccordionTrigger>모바일에서도 사용 가능한가요?</AccordionTrigger>
    <AccordionContent>
      네, 반응형 웹으로 모바일 브라우저에서도 사용하실 수 있습니다.
      iOS 및 Android 네이티브 앱도 준비 중입니다.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          scope={{ Accordion, AccordionItem, AccordionTrigger, AccordionContent }}
        />
      </section>

      <section className="docs-section" id="multiple">
        <h2 className="section-title">다중 열기</h2>
        <p className="section-desc">
          <code className="inline-code">type="multiple"</code>로 여러 항목을 동시에 열 수 있습니다.
        </p>
        <LiveCodeBlock
          code={`<Accordion type="multiple" defaultValues={["q1"]} style={{ width: 480 }}>
  <AccordionItem value="q1">
    <AccordionTrigger>연차 신청은 어떻게 하나요?</AccordionTrigger>
    <AccordionContent>
      인사관리 메뉴 → 휴가/연차 신청에서 날짜와 사유를 입력하고 제출하면 됩니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="q2">
    <AccordionTrigger>급여 명세서 조회</AccordionTrigger>
    <AccordionContent>
      인사관리 메뉴 → 급여 내역에서 월별 급여 명세서를 확인할 수 있습니다.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="q3">
    <AccordionTrigger>조직도 확인</AccordionTrigger>
    <AccordionContent>
      홈 화면의 조직도 위젯 또는 메뉴에서 부서별 조직도를 확인하세요.
    </AccordionContent>
  </AccordionItem>
</Accordion>`}
          scope={{ Accordion, AccordionItem, AccordionTrigger, AccordionContent }}
        />
      </section>

      <section className="docs-section" id="disabled">
        <h2 className="section-title">비활성화</h2>
        <LiveCodeBlock
          code={`<Accordion defaultValue="item1" style={{ width: 480 }}>
  <AccordionItem value="item1">
    <AccordionTrigger>일반 항목</AccordionTrigger>
    <AccordionContent>정상적으로 열리는 항목입니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item2" disabled>
    <AccordionTrigger>비활성화된 항목</AccordionTrigger>
    <AccordionContent>이 내용은 표시되지 않습니다.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item3">
    <AccordionTrigger>다른 항목</AccordionTrigger>
    <AccordionContent>또 다른 내용입니다.</AccordionContent>
  </AccordionItem>
</Accordion>`}
          scope={{ Accordion, AccordionItem, AccordionTrigger, AccordionContent }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">Accordion Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>기본값</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>type</td><td>'single' | 'multiple'</td><td>'single'</td><td>열기 모드</td></tr>
              <tr><td>defaultValue</td><td>string</td><td>-</td><td>기본 선택 값 (single 비제어)</td></tr>
              <tr><td>defaultValues</td><td>string[]</td><td>-</td><td>기본 선택 값들 (multiple 비제어)</td></tr>
              <tr><td>collapsible</td><td>boolean</td><td>true</td><td>single 모드에서 닫기 가능 여부</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
