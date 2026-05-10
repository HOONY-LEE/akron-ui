# Akron UI — 컴포넌트 로드맵

## 현재 상태

### ✅ 완료

| 컴포넌트 | 카테고리 | 설명 |
|---------|---------|-----|
| Button | 컴포넌트 | 버튼 (variant, size, disabled, loading) |
| Input | 컴포넌트 | 텍스트 입력 필드 |
| Card | 컴포넌트 | 카드 컨테이너 |
| Table | 컴포넌트 | 테이블 (sortable, selectable) |
| Modal | 컴포넌트 | 모달 다이얼로그 |
| Toast | 컴포넌트 | 토스트 알림 메시지 |
| AppShell | 레이아웃 | 최상위 레이아웃 셸 |
| Header | 레이아웃 | 상단 헤더 |
| Footer | 레이아웃 | 하단 푸터 |
| LayoutSidebar | 레이아웃 | 사이드바 + 그룹/아이템 네비게이션 |
| PageContainer | 레이아웃 | 콘텐츠 최대 너비 제한 |
| Stack | 레이아웃 | 수직/수평 레이아웃 유틸리티 |

### 📋 개발 예정

#### UI 컴포넌트 — 기본 입력

| 컴포넌트 | 설명 | 우선순위 |
|---------|-----|---------|
| Checkbox | 체크박스 | 🔴 높음 |
| Radio | 라디오 버튼/그룹 | 🔴 높음 |
| Switch | 토글 스위치 | 🔴 높음 |
| Select / Dropdown | 드롭다운 선택 | 🔴 높음 |
| Textarea | 여러 줄 텍스트 입력 | 🟡 보통 |
| PhoneInput | 전화번호 입력 (국가코드 + 포맷팅) | 🟡 보통 |
| EmailInput | 이메일 주소 입력 (유효성 검증) | 🟡 보통 |
| DatePicker | 날짜 선택기 | 🟡 보통 |
| FileUpload | 파일 업로드 (드래그앤드롭) | 🟢 낮음 |

#### UI 컴포넌트 — 표시/피드백

| 컴포넌트 | 설명 | 우선순위 |
|---------|-----|---------|
| Badge | 뱃지 (숫자, 상태 표시) | 🔴 높음 |
| Chip | 칩 / 태그 (선택, 삭제 가능) | 🔴 높음 |
| Avatar | 프로필 사진 / 이니셜 아바타 | 🔴 높음 |
| Tooltip | 호버 시 설명 툴팁 | 🔴 높음 |
| Alert | 알림 배너 (info, success, warning, error) | 🟡 보통 |
| Skeleton | 로딩 플레이스홀더 | 🟡 보통 |
| ProgressBar | 진행률 표시 바 | 🟡 보통 |
| Spinner | 로딩 스피너 | 🟡 보통 |
| Empty | 빈 상태 일러스트 + 메시지 | 🟢 낮음 |

#### UI 컴포넌트 — 네비게이션/구조

| 컴포넌트 | 설명 | 우선순위 |
|---------|-----|---------|
| Tabs | 탭 네비게이션 | 🔴 높음 |
| Breadcrumb | 경로 네비게이션 | 🟡 보통 |
| Pagination | 페이지네이션 | 🟡 보통 |
| Stepper | 단계별 진행 (위자드) | 🟡 보통 |
| Accordion | 접기/펼치기 섹션 | 🟡 보통 |
| Menu | 메뉴 아이템 리스트 (컨텍스트 메뉴, 드롭다운 메뉴) | 🟡 보통 |
| Tree | 트리 구조 (조직도, 폴더 탐색) | 🟢 낮음 |

#### UI 컴포넌트 — 고급/복합

| 컴포넌트 | 설명 | 우선순위 |
|---------|-----|---------|
| Carousel | 캐러셀 / 슬라이더 | 🟡 보통 |
| FloatingAction | 플로팅 액션 버튼 (FAB) | 🟡 보통 |
| IconButton | 아이콘 전용 버튼 | 🟡 보통 |
| Popover | 팝오버 (클릭 시 컨텐츠 표시) | 🟡 보통 |
| Dialog | 확인/취소 다이얼로그 (Modal 기반) | 🟡 보통 |
| Sheet | 스프레드시트 UI (셀 편집/선택/정렬). 엑셀 연동은 소비자가 xlsx 등 외부 라이브러리로 처리 | 🟢 낮음 |
| Calendar | 캘린더 뷰 UI (월간/주간/일간). 데이터 연동은 data/onChange prop으로 위임 | 🟢 낮음 |
| DataGrid | 고급 데이터 그리드 (가상 스크롤, 컬럼 리사이즈) | 🟢 낮음 |
| ListView | 카드형/리스트형 뷰 전환 | 🟢 낮음 |
| Timeline | 타임라인 (활동 기록) | 🟢 낮음 |
| Kanban | 칸반 보드 | 🟢 낮음 |

#### 유틸리티 / 구조

| 컴포넌트 | 설명 | 우선순위 |
|---------|-----|---------|
| Divider | 구분선 | 🟡 보통 |
| Form / FormField | 폼 레이아웃 + 검증 | 🟡 보통 |
| Toolbar | 도구 모음 | 🟢 낮음 |
| Grid | 반응형 그리드 시스템 | 🟢 낮음 |

---

## 개발 순서 가이드

1. **1단계 (기본 폼 + 표시)**: Checkbox, Radio, Switch, Select, Badge, Chip, Avatar, Tooltip, Tabs
2. **2단계 (입력 확장)**: Textarea, DatePicker, PhoneInput, EmailInput, Pagination, Stepper, Breadcrumb
3. **3단계 (피드백 + 네비게이션)**: Alert, Skeleton, ProgressBar, Spinner, Accordion, Menu, Popover
4. **4단계 (고급)**: Carousel, Calendar, Sheet, DataGrid, ListView, FloatingAction, Tree, Timeline

---

## 카테고리 구조 (playground 사이드바)

```
시작하기
  └ 소개

파운데이션
  ├ Colors
  ├ Typography
  └ Spacing

레이아웃
  ├ AppShell
  ├ Header
  ├ Sidebar
  ├ Footer
  ├ PageContainer
  └ Stack

컴포넌트 — 입력
  ├ Button
  ├ Input
  ├ Checkbox
  ├ Radio
  ├ Switch
  ├ Select
  ├ Textarea
  ├ DatePicker
  ├ PhoneInput
  ├ EmailInput
  └ FileUpload

컴포넌트 — 표시
  ├ Badge
  ├ Chip
  ├ Avatar
  ├ Tooltip
  ├ Alert
  ├ Skeleton
  ├ ProgressBar
  └ Spinner

컴포넌트 — 데이터
  ├ Card
  ├ Table
  ├ Sheet
  ├ Calendar
  ├ DataGrid
  ├ ListView
  └ Timeline

컴포넌트 — 네비게이션
  ├ Tabs
  ├ Breadcrumb
  ├ Pagination
  ├ Stepper
  ├ Menu
  ├ Accordion
  └ Tree

컴포넌트 — 오버레이
  ├ Modal
  ├ Dialog
  ├ Toast
  ├ Popover
  └ FloatingAction

컴포넌트 — 기타
  ├ Carousel
  ├ IconButton
  ├ Divider
  ├ Form
  └ Toolbar
```
