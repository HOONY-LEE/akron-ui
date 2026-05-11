# @akron/ui — AI 작업 규칙

## 컴포넌트 구조
- 새 컴포넌트 추가 시 기존 컴포넌트와 동일한 폴더 구조를 따를 것: `ComponentName/ComponentName.tsx`, `ComponentName.module.css`, `index.ts`
- 컴포넌트는 반드시 `forwardRef`를 적용할 것
- 새 컴포넌트 생성 후 `src/index.ts`에 export 추가할 것

## 스타일링 규칙
- 모든 스타일 값은 `src/tokens/tokens.css`에 정의된 CSS 변수만 사용 — 하드코딩 절대 금지
- 컬러, 스페이싱, 사이즈, 폰트, 그림자 등 매직 넘버 사용 금지
- CSS Modules (`.module.css`) 사용

## 인터랙션 상태
- 모든 인터랙티브 요소에 다음 4가지 상태 정의 필수: `hover`, `active`, `focus-visible`, `disabled`
- `focus-visible` 스타일은 `outline: 2px solid var(--ark-color-primary-500); outline-offset: 2px` 패턴 사용

## 외부 의존성
- radix-ui primitives 사용 가능 (접근성 해결용)
- 그 외 외부 UI 라이브러리 사용 금지
- 아이콘은 `lucide-react`만 사용

## 반응형 & 커스텀 토큰
- 반응형은 `tokens.css` 내 `@media` 쿼리에서 토큰 값을 재정의하는 방식
- 컴포넌트별 CSS 변수(`--ark-btn-*`, `--ark-input-*`, `--ark-sidebar-*` 등)를 통해 외부에서 커스텀 가능
- 브레이크포인트: `sm(640)`, `md(768)`, `lg(1024)`, `xl(1280)`, `2xl(1536)`

## 다크모드
- `[data-theme="dark"]` 선택자로 다크모드 지원
- 다크모드 색상은 `tokens.css`에서 자동 전환되므로 컴포넌트에서 별도 처리 불필요

## AI 레퍼런스 문서 유지

- `AKRON_UI_REFERENCE.md`는 AI 코딩 도구가 이 라이브러리를 사용할 때 참조하는 API 레퍼런스
- 컴포넌트가 **추가/변경/삭제**될 때 반드시 이 문서도 함께 업데이트할 것
  - 새 컴포넌트 추가 → 해당 섹션에 Props 테이블, 코드 예시, 커스텀 토큰 목록 추가
  - Props 변경 (추가/삭제/타입 변경/기본값 변경) → Props 테이블 업데이트
  - 컴포넌트 삭제 → 해당 섹션 제거
  - 토큰 추가/변경 → "디자인 토큰 시스템" 섹션 및 관련 컴포넌트의 "커스텀 토큰" 목록 업데이트
  - 사용 패턴 변경 (예: import 경로, Provider 구조) → 코드 예시 업데이트
- Playground 문서 페이지(ColorsPage, ButtonPage 등)와 이 레퍼런스는 별개 — 레퍼런스는 AI가 코드를 생성할 때 필요한 최소한의 정확한 정보만 포함

## Git 작업 규칙
- 작업 시작 전 반드시 `git pull origin main` 실행
- 새 기능은 `feature/<기능명>` 브랜치에서 작업 후 PR 생성
- 버그 수정은 `fix/<이슈>`, 리팩토링은 `refactor/<대상>` 브랜치 사용
- 커밋 메시지 형식: `타입: 설명` (예: `feat: 사이드바 컴포넌트 추가`)
  - 타입: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`
- 커밋은 논리적 단위로 나눠서 — 한 커밋에 관련 없는 변경 섞지 말 것
- main 브랜치에 직접 push는 초기 세팅 단계에서만 허용, 이후 PR 기반으로 전환
