import { useState, useEffect } from "react";

const tocData: Record<string, { label: string; id: string; indent?: boolean }[]> = {
  overview: [
    { label: "특징", id: "features" },
    { label: "설치", id: "install" },
    { label: "빠른 시작", id: "quickstart" },
    { label: "다크모드", id: "darkmode" },
    { label: "구성", id: "structure" },
  ],
  colors: [
    { label: "Primary", id: "primary" },
    { label: "Gray", id: "gray" },
    { label: "Semantic", id: "semantic" },
    { label: "Surface & Text", id: "surface" },
    { label: "사용법", id: "usage" },
  ],
  typography: [
    { label: "폰트 패밀리", id: "font-family" },
    { label: "크기", id: "font-size" },
    { label: "굵기", id: "font-weight" },
    { label: "행간", id: "line-height" },
    { label: "사용법", id: "usage" },
  ],
  spacing: [
    { label: "스케일", id: "scale" },
    { label: "토큰 레퍼런스", id: "tokens" },
    { label: "Border Radius", id: "radius" },
    { label: "Shadows", id: "shadow" },
    { label: "사용법", id: "usage" },
  ],
  button: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes", indent: true },
    { label: "로딩 & 비활성", id: "states", indent: true },
    { label: "스타일", id: "variants" },
    { label: "인터페이스", id: "interface" },
  ],
  input: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes", indent: true },
    { label: "상태", id: "states" },
    { label: "라벨 & 도움말", id: "labels" },
    { label: "인터페이스", id: "interface" },
  ],
  card: [
    { label: "사용법", id: "usage" },
    { label: "클릭 가능", id: "clickable" },
    { label: "인터페이스", id: "interface" },
  ],
  table: [
    { label: "사용법", id: "usage" },
    { label: "숫자 정렬", id: "numeric" },
    { label: "인터페이스", id: "interface" },
  ],
  modal: [
    { label: "사용법", id: "usage" },
    { label: "크기 조정하기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  toast: [
    { label: "사용법", id: "usage" },
    { label: "타입", id: "types" },
    { label: "인터페이스", id: "interface" },
  ],
  "app-shell": [
    { label: "레이아웃 빌더", id: "builder" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-header": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "고정 헤더", id: "sticky" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-sidebar": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "layout-footer": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  "page-container": [
    { label: "미리보기", id: "preview" },
    { label: "사용법", id: "usage" },
    { label: "인터페이스", id: "interface" },
  ],
  stack: [
    { label: "사용법", id: "usage" },
    { label: "정렬", id: "alignment" },
    { label: "인터페이스", id: "interface" },
  ],
  checkbox: [
    { label: "기본 사용", id: "basic" },
    { label: "보조 텍스트", id: "description" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "체크박스 그룹", id: "group" },
    { label: "인터페이스", id: "interface" },
  ],
  radio: [
    { label: "기본 사용", id: "basic" },
    { label: "보조 텍스트", id: "description" },
    { label: "가로 방향", id: "horizontal" },
    { label: "크기", id: "sizes" },
    { label: "에러 상태", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  switch: [
    { label: "기본 사용", id: "basic" },
    { label: "보조 텍스트", id: "description" },
    { label: "라벨 위치", id: "label-position" },
    { label: "크기", id: "sizes" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  select: [
    { label: "기본 사용", id: "basic" },
    { label: "도움말 / 에러", id: "helper" },
    { label: "그룹 옵션", id: "groups" },
    { label: "크기", id: "sizes" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  textarea: [
    { label: "기본 사용", id: "basic" },
    { label: "도움말 / 에러", id: "helper" },
    { label: "글자 수 제한", id: "char-count" },
    { label: "크기 조절", id: "resize" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  badge: [
    { label: "변형", id: "variants" },
    { label: "색상", id: "colors" },
    { label: "크기", id: "sizes" },
    { label: "점 (Dot)", id: "dot" },
    { label: "숫자 카운트", id: "count" },
    { label: "인라인 사용", id: "inline" },
    { label: "인터페이스", id: "interface" },
  ],
  spinner: [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "색상", id: "colors" },
    { label: "버튼과 함께", id: "button" },
    { label: "전체 오버레이", id: "overlay" },
    { label: "인터페이스", id: "interface" },
  ],
  avatar: [
    { label: "기본 사용", id: "basic" },
    { label: "이미지", id: "image" },
    { label: "크기", id: "sizes" },
    { label: "모양", id: "shape" },
    { label: "상태 표시", id: "status" },
    { label: "아바타 그룹", id: "group" },
    { label: "인터페이스", id: "interface" },
  ],
  tabs: [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "비활성화", id: "disabled" },
    { label: "폼과 함께", id: "controlled" },
    { label: "인터페이스", id: "interface" },
  ],
  tooltip: [
    { label: "기본 사용", id: "basic" },
    { label: "방향", id: "sides" },
    { label: "리치 콘텐츠", id: "rich" },
    { label: "화살표 없음", id: "no-arrow" },
    { label: "비활성화", id: "disabled" },
    { label: "아이콘 버튼과 함께", id: "icon" },
    { label: "인터페이스", id: "interface" },
  ],
  pagination: [
    { label: "기본 사용", id: "basic" },
    { label: "줄임표 처리", id: "dots" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  progress: [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "크기", id: "sizes" },
    { label: "줄무늬 & 애니메이션", id: "striped" },
    { label: "동적 제어", id: "dynamic" },
    { label: "인터페이스", id: "interface" },
  ],
  accordion: [
    { label: "기본 사용", id: "basic" },
    { label: "다중 열기", id: "multiple" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  alert: [
    { label: "기본 사용", id: "basic" },
    { label: "제목 없이", id: "no-title" },
    { label: "닫기 버튼", id: "closable" },
    { label: "아이콘 없이", id: "no-icon" },
    { label: "인터페이스", id: "interface" },
  ],
  skeleton: [
    { label: "기본 사용", id: "basic" },
    { label: "모양", id: "shapes" },
    { label: "카드 플레이스홀더", id: "card-placeholder" },
    { label: "애니메이션 없음", id: "no-animation" },
    { label: "인터페이스", id: "interface" },
  ],
  chip: [
    { label: "기본 사용", id: "basic" },
    { label: "선택 가능", id: "selectable" },
    { label: "삭제 가능", id: "deletable" },
    { label: "색상", id: "colors" },
    { label: "크기", id: "sizes" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  breadcrumb: [
    { label: "기본 사용", id: "basic" },
    { label: "구분자 커스텀", id: "custom-separator" },
    { label: "경로 축약", id: "collapsed" },
    { label: "클릭 핸들러", id: "click-handler" },
    { label: "인터페이스", id: "interface" },
  ],
  stepper: [
    { label: "기본 사용", id: "basic" },
    { label: "설명 포함", id: "with-description" },
    { label: "수직 방향", id: "vertical" },
    { label: "인터랙티브", id: "interactive" },
    { label: "오류 상태", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  menu: [
    { label: "기본 사용", id: "basic" },
    { label: "위험 액션", id: "danger" },
    { label: "단축키", id: "shortcut" },
    { label: "비활성화 항목", id: "disabled" },
    { label: "위치", id: "placement" },
    { label: "인터페이스", id: "interface" },
  ],
  popover: [
    { label: "기본 사용", id: "basic" },
    { label: "방향", id: "sides" },
    { label: "리치 콘텐츠", id: "rich" },
    { label: "폼 팝오버", id: "form" },
    { label: "인터페이스", id: "interface" },
  ],
  "floating-action": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "서브 액션", id: "actions" },
    { label: "커스텀 아이콘", id: "custom-icon" },
    { label: "인터페이스", id: "interface" },
  ],
  divider: [
    { label: "기본 사용", id: "basic" },
    { label: "스타일 변형", id: "variants" },
    { label: "레이블", id: "label" },
    { label: "수직 구분선", id: "vertical" },
    { label: "인터페이스", id: "interface" },
  ],
  timeline: [
    { label: "기본 사용", id: "basic" },
    { label: "상태", id: "status" },
    { label: "커스텀 아이콘", id: "custom-icon" },
    { label: "인터페이스", id: "interface" },
  ],
  carousel: [
    { label: "기본 사용", id: "basic" },
    { label: "자동 재생", id: "auto-play" },
    { label: "루프 없음", id: "no-loop" },
    { label: "제어 모드", id: "controlled" },
    { label: "인터페이스", id: "interface" },
  ],
  icon: [
    { label: "기본 사용법", id: "usage" },
    { label: "크기", id: "sizes" },
    { label: "색상", id: "colors" },
    { label: "선 굵기", id: "stroke" },
    { label: "텍스트와 함께", id: "with-text" },
    { label: "애니메이션", id: "animation" },
    { label: "아이콘 목록", id: "gallery" },
    { label: "설치", id: "install" },
  ],
  form: [
    { label: "기본 사용", id: "basic" },
    { label: "필수 필드", id: "required" },
    { label: "에러 상태", id: "error" },
    { label: "FormGroup", id: "group" },
    { label: "전체 폼 예시", id: "complete-form" },
    { label: "인터페이스", id: "interface" },
  ],
  "list-view": [
    { label: "기본 사용", id: "basic" },
    { label: "빈 상태", id: "empty" },
    { label: "인터페이스", id: "interface" },
  ],
  "file-upload": [
    { label: "기본 사용", id: "basic" },
    { label: "이미지 업로드", id: "image" },
    { label: "크기 제한", id: "size-limit" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  "email-input": [
    { label: "기본 사용", id: "basic" },
    { label: "실시간 유효성 검증", id: "validation" },
    { label: "크기", id: "sizes" },
    { label: "에러 메시지", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  "phone-input": [
    { label: "기본 사용", id: "basic" },
    { label: "국가코드 제어", id: "controlled" },
    { label: "크기", id: "sizes" },
    { label: "에러 상태", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  "date-picker": [
    { label: "기본 사용", id: "basic" },
    { label: "제어 모드", id: "controlled" },
    { label: "최소/최대 날짜", id: "min-max" },
    { label: "크기", id: "sizes" },
    { label: "날짜 형식 커스터마이징", id: "format" },
    { label: "인터페이스", id: "interface" },
  ],
  sheet: [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 렌더링", id: "custom-render" },
    { label: "읽기 전용", id: "read-only" },
    { label: "인터페이스", id: "interface" },
  ],
  "number-input": [
    { label: "기본 사용", id: "basic" },
    { label: "제어 모드", id: "controlled" },
    { label: "접두사 / 접미사", id: "prefix-suffix" },
    { label: "크기", id: "sizes" },
    { label: "버튼 없이", id: "no-controls" },
    { label: "에러 상태", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  slider: [
    { label: "기본 사용", id: "basic" },
    { label: "범위 선택", id: "range" },
    { label: "눈금 표시", id: "marks" },
    { label: "색상", id: "colors" },
    { label: "수직 슬라이더", id: "vertical" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  rating: [
    { label: "기본 사용", id: "basic" },
    { label: "반쪽 별", id: "half" },
    { label: "읽기 전용", id: "readonly" },
    { label: "크기", id: "sizes" },
    { label: "커스텀 설정", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "otp-input": [
    { label: "기본 사용", id: "basic" },
    { label: "입력 타입", id: "types" },
    { label: "구분자", id: "separator" },
    { label: "마스킹", id: "mask" },
    { label: "크기", id: "sizes" },
    { label: "에러 상태", id: "error" },
    { label: "인터페이스", id: "interface" },
  ],
  "tag-input": [
    { label: "기본 사용", id: "basic" },
    { label: "태그 색상", id: "colors" },
    { label: "유효성 검증", id: "validation" },
    { label: "크기", id: "sizes" },
    { label: "읽기 전용 / 비활성화", id: "readonly" },
    { label: "인터페이스", id: "interface" },
  ],
  calendar: [
    { label: "기본 사용", id: "basic" },
    { label: "이벤트 표시", id: "events" },
    { label: "주간 보기", id: "week-view" },
    { label: "날짜 클릭", id: "click" },
    { label: "인터페이스", id: "interface" },
  ],
  drawer: [
    { label: "기본 사용", id: "basic" },
    { label: "방향", id: "placement" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "notification-center": [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 아이콘", id: "icons" },
    { label: "빈 상태", id: "empty" },
    { label: "인터페이스", id: "interface" },
  ],
  tour: [
    { label: "기본 사용", id: "basic" },
    { label: "제어 모드", id: "controlled" },
    { label: "옵션", id: "options" },
    { label: "인터페이스", id: "interface" },
  ],
  "split-button": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "드롭다운 위치", id: "placement" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  kbd: [
    { label: "기본 사용", id: "basic" },
    { label: "KbdShortcut", id: "shortcut" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "컨텍스트 내 사용", id: "in-context" },
    { label: "인터페이스", id: "interface" },
  ],
  "copy-button": [
    { label: "기본 사용", id: "basic" },
    { label: "레이블 포함", id: "with-label" },
    { label: "코드 블록 내 사용", id: "in-context" },
    { label: "크기", id: "sizes" },
    { label: "커스텀 타임아웃", id: "timeout" },
    { label: "인터페이스", id: "interface" },
  ],
  "scroll-area": [
    { label: "기본 사용", id: "basic" },
    { label: "수평 스크롤", id: "horizontal" },
    { label: "스크롤바 크기", id: "sizes" },
    { label: "항상 표시", id: "always-visible" },
    { label: "인터페이스", id: "interface" },
  ],
  "number-ticker": [
    { label: "기본 사용", id: "basic" },
    { label: "Easing", id: "easing" },
    { label: "숫자 포맷", id: "format" },
    { label: "대시보드 활용", id: "in-stat-card" },
    { label: "인터페이스", id: "interface" },
  ],
  "password-input": [
    { label: "기본 사용", id: "basic" },
    { label: "비밀번호 강도 표시", id: "strength" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "토글 없음", id: "no-toggle" },
    { label: "인터페이스", id: "interface" },
  ],
  "aspect-ratio": [
    { label: "기본 사용", id: "basic" },
    { label: "프리셋 비율", id: "presets" },
    { label: "커스텀 비율", id: "custom" },
    { label: "이미지와 함께", id: "with-image" },
    { label: "인터페이스", id: "interface" },
  ],
  "loading-overlay": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "레이블", id: "with-label" },
    { label: "Blur 효과", id: "blur" },
    { label: "인터페이스", id: "interface" },
  ],
  highlight: [
    { label: "기본 사용", id: "basic" },
    { label: "복수 키워드", id: "multiple" },
    { label: "색상", id: "colors" },
    { label: "검색 결과 활용", id: "search" },
    { label: "인터페이스", id: "interface" },
  ],
  spoiler: [
    { label: "기본 사용", id: "basic" },
    { label: "Hover 공개", id: "hover" },
    { label: "블러 강도", id: "blur-amount" },
    { label: "복잡한 콘텐츠", id: "rich-content" },
    { label: "제어 모드", id: "controlled" },
    { label: "인터페이스", id: "interface" },
  ],
  marquee: [
    { label: "기본 사용", id: "basic" },
    { label: "방향", id: "direction" },
    { label: "리뷰 슬라이더", id: "reviews" },
    { label: "인터페이스", id: "interface" },
  ],
  "hover-card": [
    { label: "기본 사용", id: "basic" },
    { label: "위치", id: "placement" },
    { label: "링크 미리보기", id: "link-preview" },
    { label: "인터페이스", id: "interface" },
  ],
  "media-card": [
    { label: "기본 사용", id: "basic" },
    { label: "수평 레이아웃", id: "horizontal" },
    { label: "배지 + 푸터", id: "with-badge" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "masonry-grid": [
    { label: "기본 사용", id: "basic" },
    { label: "열 수", id: "columns" },
    { label: "카드 그리드", id: "cards" },
    { label: "인터페이스", id: "interface" },
  ],
  "chat-bubble": [
    { label: "기본 대화", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "리치 콘텐츠", id: "rich-content" },
    { label: "인터페이스", id: "interface" },
  ],
  "gradient-text": [
    { label: "프리셋", id: "presets" },
    { label: "애니메이션", id: "animate" },
    { label: "커스텀 그라디언트", id: "custom" },
    { label: "HTML 태그 변경", id: "as-element" },
    { label: "인터페이스", id: "interface" },
  ],
  "confirm-dialog": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "삭제 확인", id: "danger-delete" },
    { label: "인터페이스", id: "interface" },
  ],
  "callout": [
    { label: "변형", id: "variants" },
    { label: "제목 없이", id: "no-title" },
    { label: "커스텀 아이콘", id: "custom-icon" },
    { label: "리치 콘텐츠", id: "rich-content" },
    { label: "인터페이스", id: "interface" },
  ],
  "ribbon": [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "위치", id: "placement" },
    { label: "인터페이스", id: "interface" },
  ],
  "glass-card": [
    { label: "기본 사용", id: "basic" },
    { label: "블러 강도", id: "blur" },
    { label: "호버 효과", id: "hoverable" },
    { label: "테두리", id: "border" },
    { label: "인터페이스", id: "interface" },
  ],
  "countdown-timer": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "커스텀 레이블", id: "custom-labels" },
    { label: "인터페이스", id: "interface" },
  ],
  "progress-ring": [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "크기", id: "sizes" },
    { label: "커스텀 레이블", id: "custom-label" },
    { label: "인터랙티브", id: "interactive" },
    { label: "인터페이스", id: "interface" },
  ],
  "reading-progress": [
    { label: "기본 사용", id: "basic" },
    { label: "스크롤 컨테이너 내에서", id: "custom-container" },
    { label: "인터페이스", id: "interface" },
  ],
  "back-to-top": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "위치 옵션", id: "positions" },
    { label: "인터페이스", id: "interface" },
  ],
  "inline-edit": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "멀티라인 (textarea)", id: "textarea" },
    { label: "빈 값 및 비활성화", id: "empty" },
    { label: "인터페이스", id: "interface" },
  ],
  "transfer-list": [
    { label: "기본 사용", id: "basic" },
    { label: "검색 가능", id: "searchable" },
    { label: "비활성화 항목", id: "disabled-items" },
    { label: "인터페이스", id: "interface" },
  ],
  "code-snippet": [
    { label: "기본 사용", id: "basic" },
    { label: "파일명과 함께", id: "with-filename" },
    { label: "변형", id: "variants" },
    { label: "최대 줄 수", id: "max-lines" },
    { label: "인터페이스", id: "interface" },
  ],
  "typewriter": [
    { label: "기본 사용", id: "basic" },
    { label: "여러 단어 순환", id: "multiple-words" },
    { label: "그라디언트와 조합", id: "with-gradient" },
    { label: "한 번만 타이핑", id: "no-loop" },
    { label: "커스텀 커서", id: "custom-cursor" },
    { label: "인터페이스", id: "interface" },
  ],
  "flip-card": [
    { label: "호버 뒤집기 (기본)", id: "hover" },
    { label: "클릭 뒤집기", id: "click" },
    { label: "세로 방향", id: "vertical" },
    { label: "제어 모드", id: "controlled" },
    { label: "인터페이스", id: "interface" },
  ],
  "pricing-card": [
    { label: "기본 사용", id: "basic" },
    { label: "아이콘 포함", id: "with-icon" },
    { label: "인터페이스", id: "interface" },
  ],
  "step-indicator": [
    { label: "기본 사용", id: "basic" },
    { label: "레이블 포함", id: "with-labels" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "ticker": [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "커스텀 구분자 및 방향", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "sticky-note": [
    { label: "색상", id: "colors" },
    { label: "제목 포함", id: "with-title" },
    { label: "크기", id: "sizes" },
    { label: "기울임 효과", id: "rotated" },
    { label: "인터페이스", id: "interface" },
  ],
  "time-ago": [
    { label: "기본 사용", id: "basic" },
    { label: "로케일", id: "locale" },
    { label: "미래 시간", id: "future" },
    { label: "인터페이스", id: "interface" },
  ],
  "gauge": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "색상", id: "colors" },
    { label: "자동 색상", id: "auto-color" },
    { label: "커스텀 포맷", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "log-viewer": [
    { label: "기본 사용", id: "basic" },
    { label: "줄 번호 & 옵션", id: "line-numbers" },
    { label: "레벨 뱃지 없음", id: "no-level" },
    { label: "인터페이스", id: "interface" },
  ],
  "diff-viewer": [
    { label: "unified diff 파싱", id: "unified" },
    { label: "수동 DiffLine 구성", id: "manual" },
    { label: "옵션", id: "options" },
    { label: "인터페이스", id: "interface" },
  ],
  "resizable-panels": [
    { label: "수평 분할", id: "horizontal" },
    { label: "수직 분할", id: "vertical" },
    { label: "최소/최대 크기", id: "min-max" },
    { label: "인터페이스", id: "interface" },
  ],
  "json-viewer": [
    { label: "기본 사용", id: "basic" },
    { label: "전체 펼침", id: "expand" },
    { label: "배열 데이터", id: "array" },
    { label: "옵션", id: "options" },
    { label: "인터페이스", id: "interface" },
  ],
  "animated-counter": [
    { label: "기본 사용", id: "basic" },
    { label: "접두사 / 접미사", id: "prefix-suffix" },
    { label: "이징 비교", id: "easing" },
    { label: "통계 카드 예시", id: "stat-cards" },
    { label: "인터페이스", id: "interface" },
  ],
  "checklist": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "설명 포함 & 비활성화", id: "description" },
    { label: "인터페이스", id: "interface" },
  ],
  "file-tree": [
    { label: "기본 사용", id: "basic" },
    { label: "선택 가능한 파일 트리", id: "selectable" },
    { label: "인터페이스", id: "interface" },
  ],
  "meter-group": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "스토리지 예시", id: "storage" },
    { label: "우측 레전드", id: "right-legend" },
    { label: "인터페이스", id: "interface" },
  ],
  "spotlight": [
    { label: "기본 사용", id: "basic" },
    { label: "인터페이스", id: "interface" },
  ],
  "banner-alert": [
    { label: "변형", id: "variants" },
    { label: "닫기 버튼", id: "dismissible" },
    { label: "공지사항 배너", id: "announcement" },
    { label: "인터페이스", id: "interface" },
  ],
  "shortcut-map": [
    { label: "테이블 레이아웃", id: "table" },
    { label: "그리드 레이아웃", id: "grid" },
    { label: "리스트 레이아웃", id: "list" },
    { label: "인터페이스", id: "interface" },
  ],
  "sortable-list": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "비활성화", id: "disabled" },
    { label: "인터페이스", id: "interface" },
  ],
  "currency-input": [
    { label: "기본 사용", id: "basic" },
    { label: "다양한 통화", id: "currencies" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "최소/최대 값", id: "minmax" },
    { label: "인터페이스", id: "interface" },
  ],
  "kanban-board": [
    { label: "기본 사용", id: "basic" },
    { label: "추가 버튼 숨김", id: "no-add" },
    { label: "인터페이스", id: "interface" },
  ],
  "color-swatch": [
    { label: "기본 사용", id: "basic" },
    { label: "라벨 있는 팔레트", id: "labeled" },
    { label: "원형", id: "circle" },
    { label: "인터페이스", id: "interface" },
  ],
  "description-list": [
    { label: "수직 레이아웃", id: "vertical" },
    { label: "수평 레이아웃", id: "horizontal" },
    { label: "그리드 레이아웃", id: "grid" },
    { label: "인터페이스", id: "interface" },
  ],
  "toggle-group": [
    { label: "단일 선택", id: "single" },
    { label: "다중 선택", id: "multiple" },
    { label: "변형", id: "variants" },
    { label: "인터페이스", id: "interface" },
  ],
  "watermark": [
    { label: "기본 사용", id: "basic" },
    { label: "두 줄 워터마크", id: "multi-line" },
    { label: "커스텀 설정", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "image-comparison": [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 라벨", id: "labels" },
    { label: "Controlled", id: "controlled" },
    { label: "인터페이스", id: "interface" },
  ],
  "signature-pad": [
    { label: "기본 사용", id: "basic" },
    { label: "Ref API", id: "ref" },
    { label: "인터페이스", id: "interface" },
  ],
  "org-chart": [
    { label: "기본 사용", id: "basic" },
    { label: "수평 레이아웃", id: "horizontal" },
    { label: "인터페이스", id: "interface" },
  ],
  "filter-bar": [
    { label: "기본 사용", id: "basic" },
    { label: "컴팩트 모드", id: "compact" },
    { label: "인터페이스", id: "interface" },
  ],
  "data-card": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "구분선", id: "divider" },
    { label: "인터페이스", id: "interface" },
  ],
  "approval-flow": [
    { label: "수평 레이아웃", id: "horizontal" },
    { label: "수직 레이아웃", id: "vertical" },
    { label: "컴팩트 모드", id: "compact" },
    { label: "인터페이스", id: "interface" },
  ],
  "search-highlight": [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "인터랙티브 검색", id: "interactive" },
    { label: "인터페이스", id: "interface" },
  ],
  "command-palette": [
    { label: "기본 사용", id: "basic" },
    { label: "단축키 힌트", id: "shortcuts" },
    { label: "최근 사용", id: "recent" },
    { label: "인터페이스", id: "interface" },
  ],
  "context-menu": [
    { label: "기본 사용", id: "basic" },
    { label: "서브메뉴", id: "submenu" },
    { label: "레이블 그룹", id: "label-group" },
    { label: "체크 항목", id: "checkbox-items" },
    { label: "인터페이스", id: "interface" },
  ],
  "input-group": [
    { label: "텍스트 어돈", id: "text-addon" },
    { label: "아이콘 어돈", id: "icon-addon" },
    { label: "버튼 어돈", id: "button-addon" },
    { label: "셀렉트 어돈", id: "select-addon" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "stat-card": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "클릭 가능", id: "clickable" },
    { label: "로딩", id: "loading" },
    { label: "인터페이스", id: "interface" },
  ],
  "segmented-control": [
    { label: "기본 사용", id: "basic" },
    { label: "아이콘", id: "icons" },
    { label: "아이콘만", id: "icon-only" },
    { label: "크기", id: "sizes" },
    { label: "전체 너비", id: "full-width" },
    { label: "인터페이스", id: "interface" },
  ],
  "empty-state": [
    { label: "기본 사용", id: "basic" },
    { label: "아이콘 변형", id: "icons" },
    { label: "크기", id: "sizes" },
    { label: "테이블 내부 사용", id: "in-table" },
    { label: "인터페이스", id: "interface" },
  ],
  "color-picker": [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 스와치", id: "swatches" },
    { label: "스와치 전용", id: "swatches-only" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "tree-view": [
    { label: "기본 사용", id: "basic" },
    { label: "아이콘", id: "icons" },
    { label: "제어 모드", id: "controlled" },
    { label: "전체 펼치기", id: "default-expanded" },
    { label: "인터페이스", id: "interface" },
  ],
  "multi-select": [
    { label: "기본 사용", id: "basic" },
    { label: "전체 선택", id: "select-all" },
    { label: "그룹", id: "groups" },
    { label: "최대 선택 수", id: "max-select" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  combobox: [
    { label: "기본 사용", id: "basic" },
    { label: "그룹", id: "groups" },
    { label: "설명 포함 옵션", id: "description" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "status-dot": [
    { label: "색상", id: "colors" },
    { label: "크기", id: "sizes" },
    { label: "펄스 애니메이션", id: "pulse" },
    { label: "인터페이스", id: "interface" },
  ],
  "bar-list": [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 색상", id: "colored" },
    { label: "값 포맷터", id: "formatter" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "bottom-sheet": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "푸터", id: "footer" },
    { label: "인터페이스", id: "interface" },
  ],
  "virtual-list": [
    { label: "기본 사용", id: "basic" },
    { label: "끝 도달 감지", id: "end-reached" },
    { label: "인터페이스", id: "interface" },
  ],
  "cron-builder": [
    { label: "기본 사용", id: "basic" },
    { label: "제어 모드", id: "controlled" },
    { label: "옵션", id: "options" },
    { label: "인터페이스", id: "interface" },
  ],
  "mention-input": [
    { label: "기본 사용", id: "basic" },
    { label: "멀티라인", id: "multiline" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "image-cropper": [
    { label: "기본 사용", id: "basic" },
    { label: "비율 고정", id: "aspect-ratio" },
    { label: "원형 크롭", id: "circle" },
    { label: "인터페이스", id: "interface" },
  ],
  "activity-feed": [
    { label: "기본 사용", id: "basic" },
    { label: "날짜별 그룹", id: "grouped" },
    { label: "최대 항목 수", id: "max-items" },
    { label: "인터페이스", id: "interface" },
  ],
  "date-range-picker": [
    { label: "기본 사용", id: "basic" },
    { label: "프리셋", id: "presets" },
    { label: "크기", id: "sizes" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "form-wizard": [
    { label: "기본 사용", id: "basic" },
    { label: "수직 레이아웃", id: "vertical" },
    { label: "취소 버튼", id: "with-cancel" },
    { label: "인터페이스", id: "interface" },
  ],
  "user-card": [
    { label: "기본 사용", id: "basic" },
    { label: "변형", id: "variants" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "rich-text-preview": [
    { label: "기본 사용", id: "basic" },
    { label: "줄 수 제한", id: "max-lines" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "sparkline": [
    { label: "라인 차트", id: "line" },
    { label: "영역 차트", id: "area" },
    { label: "바 차트", id: "bar" },
    { label: "크기", id: "sizes" },
    { label: "인터페이스", id: "interface" },
  ],
  "donut-chart": [
    { label: "기본 사용", id: "basic" },
    { label: "파이 차트", id: "pie" },
    { label: "크기", id: "sizes" },
    { label: "커스텀 색상 & 라벨", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "heat-map": [
    { label: "기본 사용", id: "basic" },
    { label: "색상", id: "colors" },
    { label: "커스텀 설정", id: "custom" },
    { label: "인터페이스", id: "interface" },
  ],
  "comment-thread": [
    { label: "기본 사용", id: "basic" },
    { label: "크기", id: "sizes" },
    { label: "빈 상태", id: "empty" },
    { label: "인터페이스", id: "interface" },
  ],
  "file-preview": [
    { label: "카드 변형", id: "card" },
    { label: "리스트 변형", id: "list" },
    { label: "컴팩트 변형", id: "compact" },
    { label: "상태", id: "states" },
    { label: "인터페이스", id: "interface" },
  ],
  "data-table": [
    { label: "기본 사용", id: "basic" },
    { label: "커스텀 셀 렌더러", id: "custom-cell" },
    { label: "체크박스 선택", id: "selectable" },
    { label: "옵션", id: "options" },
    { label: "인터페이스", id: "interface" },
  ],
};

export function TableOfContents({ currentPage }: { currentPage: string }) {
  const items = tocData[currentPage] ?? [];
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (items.length === 0) return;

    const scrollRoot = document.querySelector("[data-appshell-body]") ?? undefined;
    const ids = items.map((i) => i.id);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const topmost = visible.reduce((a, b) =>
            a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
          );
          setActiveId(topmost.target.id);
        }
      },
      { root: scrollRoot, rootMargin: "-80px 0px -60% 0px", threshold: 0 },
    );

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items, currentPage]);

  return (
    <aside className="toc">
      <div className="toc-header">On This Page</div>
      <ul className="toc-list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={[
                "toc-link",
                item.indent ? "indent" : "",
                activeId === item.id ? "active" : "",
              ].filter(Boolean).join(" ")}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <style>{`
        .toc {
          position: fixed;
          top: 40px;
          right: 0px;
          width: var(--docs-toc-width);
          padding: 0;
          display: none;
        }
        @media (min-width: 1280px) {
          .toc { display: block; }
        }
        .toc-header {
          font-size: 12px;
          font-weight: 700;
          color: var(--docs-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 12px;
        }
        .toc-list {
          list-style: none;
          border-left: 2px solid var(--docs-border);
          padding-left: 0;
        }
        .toc-link {
          display: block;
          font-size: 13px;
          color: var(--docs-text-tertiary);
          text-decoration: none;
          padding: 4px 0 4px 12px;
          margin-left: -2px;
          border-left: 2px solid transparent;
          transition: color 0.15s ease, border-color 0.15s ease, font-weight 0.15s ease;
          line-height: 1.5;
        }
        .toc-link:hover {
          color: var(--docs-text);
        }
        .toc-link.indent {
          padding-left: 24px;
        }
        .toc-link.active {
          color: var(--ark-color-primary-500);
          font-weight: 600;
          border-left-color: var(--ark-color-primary-500);
        }
      `}</style>
    </aside>
  );
}
