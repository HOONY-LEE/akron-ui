import { BannerAlert } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function BannerAlertPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">BannerAlert</h1>
        <p className="page-description">
          페이지 상단에 표시되는 배너 알림 컴포넌트. 공지사항, 시스템 점검 안내, 성공/오류 메시지 등에 활용합니다.
        </p>
      </header>

      <section className="docs-section" id="variants">
        <h2 className="section-title">변형</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
  <BannerAlert variant="info"         message="새 버전이 출시되었습니다." dismissible={false} />
  <BannerAlert variant="success"      message="배포가 성공적으로 완료되었습니다." dismissible={false} />
  <BannerAlert variant="warning"      message="내일 오전 2~4시 서버 점검이 예정되어 있습니다." dismissible={false} />
  <BannerAlert variant="error"        message="결제 처리 중 오류가 발생했습니다." dismissible={false} />
  <BannerAlert variant="announcement" message="🎉 Akron UI v2.0 출시!" dismissible={false} />
</div>`}
          scope={{ BannerAlert }}
        />
      </section>

      <section className="docs-section" id="dismissible">
        <h2 className="section-title">닫기 버튼</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
  <BannerAlert
    variant="info"
    message="새 기능이 추가되었습니다."
    description="자세한 내용은 릴리즈 노트를 확인하세요."
    dismissible
  />
  <BannerAlert
    variant="warning"
    message="구독이 7일 후 만료됩니다."
    actionLabel="지금 갱신"
    onAction={() => alert("갱신 페이지로 이동")}
    dismissible
  />
</div>`}
          scope={{ BannerAlert }}
        />
      </section>

      <section className="docs-section" id="announcement">
        <h2 className="section-title">공지사항 배너</h2>
        <LiveCodeBlock
          code={`<BannerAlert
  variant="announcement"
  message="🚀 Akron UI v2.0 출시!"
  description="50개 이상의 새 컴포넌트, 다크모드 완전 지원, 번들 크기 30% 감소"
  actionLabel="자세히 보기"
  onAction={() => alert("릴리즈 노트")}
  dismissible
/>`}
          scope={{ BannerAlert }}
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
              <tr><td>message</td><td>ReactNode</td><td>필수</td><td>메인 메시지</td></tr>
              <tr><td>variant</td><td>'info' | 'success' | 'warning' | 'error' | 'announcement'</td><td>'info'</td><td>변형</td></tr>
              <tr><td>description</td><td>ReactNode</td><td>-</td><td>부가 설명</td></tr>
              <tr><td>dismissible</td><td>boolean</td><td>true</td><td>닫기 버튼 표시</td></tr>
              <tr><td>onDismiss</td><td>() =&gt; void</td><td>-</td><td>닫힘 콜백</td></tr>
              <tr><td>actionLabel</td><td>string</td><td>-</td><td>CTA 버튼 레이블</td></tr>
              <tr><td>onAction</td><td>() =&gt; void</td><td>-</td><td>CTA 클릭 콜백</td></tr>
              <tr><td>hideIcon</td><td>boolean</td><td>false</td><td>아이콘 숨김</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>-</td><td>커스텀 아이콘</td></tr>
              <tr><td>sticky</td><td>boolean</td><td>false</td><td>position: sticky top:0 적용</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
