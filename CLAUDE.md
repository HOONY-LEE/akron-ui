# Akron UI Monorepo

## 프로젝트 구조

- `packages/ui/` — 컴포넌트 라이브러리 (`@sunghoon_lee/akron-ui`)
- `playground/` — Vite 기반 문서/데모 사이트

## 주요 레퍼런스

- `packages/ui/CLAUDE.md` — UI 패키지 작업 규칙 (스타일링, 컴포넌트 구조, 인터랙션 상태 등)
- `packages/ui/AKRON_UI_REFERENCE.md` — AI 에이전트용 API 레퍼런스 (Props, 사용 패턴, 토큰 커스터마이징)

## 핵심 규칙

- 컴포넌트 추가/변경/삭제 시 `AKRON_UI_REFERENCE.md`도 반드시 함께 업데이트
- 스타일 값은 `tokens.css`의 CSS 변수만 사용 (하드코딩 금지)
- 아이콘은 `lucide-react`만 사용
- 외부 UI 라이브러리는 `@radix-ui` 프리미티브만 허용
