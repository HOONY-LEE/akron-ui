# @arkron/ui — AI 작업 규칙

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

## 다크모드
- `[data-theme="dark"]` 선택자로 다크모드 지원
- 다크모드 색상은 `tokens.css`에서 자동 전환되므로 컴포넌트에서 별도 처리 불필요
