import { RichTextPreview } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function RichTextPreviewPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">RichTextPreview</h1>
        <p className="page-description">
          마크다운 미리보기 컴포넌트. 마크다운 텍스트를 스타일된 HTML로 렌더링합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<RichTextPreview
  content={\`# 제목입니다

이것은 **굵은 텍스트**와 *기울임 텍스트*를 포함합니다.

## 코드 예시

인라인 코드는 \\\`code\\\`처럼 표시됩니다.

## 목록

- 첫 번째 항목
- 두 번째 항목
- 세 번째 항목

1. 순서가 있는 항목
2. 두 번째
3. 세 번째

> 인용문은 이렇게 표시됩니다.

---

[링크 텍스트](https://example.com)를 클릭하세요.\`}
/>`}
          scope={{ RichTextPreview }}
        />
      </section>

      <section className="docs-section" id="max-lines">
        <h2 className="section-title">줄 수 제한</h2>
        <LiveCodeBlock
          code={`<RichTextPreview
  maxLines={3}
  content="이것은 긴 텍스트입니다. 여러 줄에 걸쳐 표시될 수 있지만 maxLines 속성으로 제한할 수 있습니다. 더 보기 버튼을 클릭하면 전체 내용을 볼 수 있습니다. 이 기능은 목록이나 카드에서 미리보기를 표시할 때 유용합니다."
  onShowMore={() => alert("더 보기 클릭")}
/>`}
          scope={{ RichTextPreview }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
  <div>
    <strong>sm</strong>
    <RichTextPreview size="sm" content="**작은 크기**의 텍스트입니다. \`코드\`도 포함됩니다." />
  </div>
  <div>
    <strong>md</strong>
    <RichTextPreview size="md" content="**기본 크기**의 텍스트입니다. \`코드\`도 포함됩니다." />
  </div>
  <div>
    <strong>lg</strong>
    <RichTextPreview size="lg" content="**큰 크기**의 텍스트입니다. \`코드\`도 포함됩니다." />
  </div>
</div>`}
          scope={{ RichTextPreview }}
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
              <tr><td>content</td><td>string</td><td>필수</td><td>마크다운 텍스트</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>maxLines</td><td>number</td><td>-</td><td>최대 줄 수</td></tr>
              <tr><td>showMoreLabel</td><td>string</td><td>'더 보기'</td><td>더 보기 텍스트</td></tr>
              <tr><td>onShowMore</td><td>() =&gt; void</td><td>-</td><td>더 보기 콜백</td></tr>
              <tr><td>linkTarget</td><td>'_blank' | '_self'</td><td>'_blank'</td><td>링크 대상</td></tr>
              <tr><td>compact</td><td>boolean</td><td>false</td><td>컴팩트 모드</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
