import { AudioPlayer } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";

export function AudioPlayerPage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">AudioPlayer</h1>
        <p className="page-description">
          오디오 재생 컴포넌트. 재생, 일시정지, 시크, 볼륨 컨트롤을 제공합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`<AudioPlayer
  src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
  title="샘플 오디오"
  artist="SoundJay"
/>`}
          scope={{ AudioPlayer }}
        />
      </section>

      <section className="docs-section" id="sizes">
        <h2 className="section-title">크기</h2>
        <LiveCodeBlock
          code={`<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
  <AudioPlayer
    size="sm"
    src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
    title="Small"
  />
  <AudioPlayer
    size="lg"
    src="https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3"
    title="Large Player"
    artist="아티스트"
  />
</div>`}
          scope={{ AudioPlayer }}
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
              <tr><td>src</td><td>string</td><td>필수</td><td>오디오 소스 URL</td></tr>
              <tr><td>title</td><td>string</td><td>-</td><td>트랙 제목</td></tr>
              <tr><td>artist</td><td>string</td><td>-</td><td>아티스트</td></tr>
              <tr><td>coverUrl</td><td>string</td><td>-</td><td>커버 이미지 URL</td></tr>
              <tr><td>autoPlay</td><td>boolean</td><td>false</td><td>자동 재생</td></tr>
              <tr><td>loop</td><td>boolean</td><td>false</td><td>반복 재생</td></tr>
              <tr><td>size</td><td>'sm' | 'md' | 'lg'</td><td>'md'</td><td>크기</td></tr>
              <tr><td>onPrev</td><td>() =&gt; void</td><td>-</td><td>이전 트랙</td></tr>
              <tr><td>onNext</td><td>() =&gt; void</td><td>-</td><td>다음 트랙</td></tr>
              <tr><td>onEnded</td><td>() =&gt; void</td><td>-</td><td>재생 완료</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
