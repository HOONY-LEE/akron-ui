import { Button } from "@sunghoon_lee/akron-ui";
import { Mail, ArrowRight } from "lucide-react";
import { CodeBlock } from "../components/CodeBlock";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function ButtonPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">Button</h1>
        <p className="page-description">
          사용자의 행동을 유도하는 인터랙티브 요소입니다. 다양한 variant와 size를 조합하여 맥락에 맞게 사용할 수 있습니다.
        </p>
      </header>

      <section className="docs-section" id="usage">
        <h2 className="section-title">사용법</h2>
        <p className="section-desc">
          <code className="inline-code">variant</code>와 <code className="inline-code">size</code> prop으로
          버튼의 시각적 스타일과 크기를 지정합니다.
        </p>
        <LiveCodeBlock
          code={`<Button variant="primary">확인</Button>
<Button variant="secondary">취소</Button>
<Button variant="outline">더보기</Button>`}
          scope={{ Button }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h3 className="section-subtitle">크기 조정하기</h3>
        <p className="section-desc">
          <code className="inline-code">sm</code>, <code className="inline-code">md</code>,
          <code className="inline-code">lg</code> 세 가지 크기를 지원합니다.
          기본값은 <code className="inline-code">md</code>입니다.
        </p>
        <LiveCodeBlock
          code={`<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>`}
          scope={{ Button }}
        />
      </section>

      <section className="docs-section" id="states">
        <h3 className="section-subtitle">로딩 & 비활성</h3>
        <p className="section-desc">
          <code className="inline-code">loading</code> 상태에서는 스피너가 표시되며
          클릭이 불가능합니다. <code className="inline-code">disabled</code>는 버튼을 비활성화합니다.
        </p>
        <LiveCodeBlock
          code={`<Button loading>저장 중...</Button>
<Button disabled>비활성</Button>`}
          scope={{ Button }}
        />
      </section>

      <section className="docs-section" id="variants">
        <h2 className="section-title">스타일</h2>
        <p className="section-desc">
          5가지 variant를 제공합니다. 맥락에 따라 적절한 스타일을 선택하세요.
        </p>

        <LiveCodeBlock
          code={`<Button variant="primary" leftIcon={<Mail size={16} />}>메일 전송</Button>
<Button variant="secondary">필터</Button>
<Button variant="outline">수정</Button>
<Button variant="ghost">더보기</Button>
<Button variant="danger">삭제</Button>`}
          scope={{ Button, Mail, ArrowRight }}
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr>
                <th>Prop</th>
                <th>타입</th>
                <th>기본값</th>
                <th>설명</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>variant</td>
                <td>'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'</td>
                <td>'primary'</td>
                <td>버튼의 시각적 스타일</td>
              </tr>
              <tr>
                <td>size</td>
                <td>'sm' | 'md' | 'lg'</td>
                <td>'md'</td>
                <td>버튼의 크기</td>
              </tr>
              <tr>
                <td>loading</td>
                <td>boolean</td>
                <td>false</td>
                <td>로딩 스피너 표시 여부</td>
              </tr>
              <tr>
                <td>disabled</td>
                <td>boolean</td>
                <td>false</td>
                <td>비활성 상태</td>
              </tr>
              <tr>
                <td>leftIcon</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>텍스트 좌측 아이콘</td>
              </tr>
              <tr>
                <td>rightIcon</td>
                <td>ReactNode</td>
                <td>-</td>
                <td>텍스트 우측 아이콘</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
