import type { ComponentType } from "react";
import { OverviewPage } from "./pages/OverviewPage";
import { ColorsPage } from "./pages/ColorsPage";
import { TypographyPage } from "./pages/TypographyPage";
import { SpacingPage } from "./pages/SpacingPage";
import { ButtonPage } from "./pages/ButtonPage";
import { InputPage } from "./pages/InputPage";
import { CardPage } from "./pages/CardPage";
import { TablePage } from "./pages/TablePage";
import { ModalPage } from "./pages/ModalPage";
import { ToastPage } from "./pages/ToastPage";
import { AppShellPage } from "./pages/AppShellPage";
import { HeaderPage } from "./pages/HeaderPage";
import { LayoutSidebarPage } from "./pages/LayoutSidebarPage";
import { FooterPage } from "./pages/FooterPage";
import { PageContainerPage } from "./pages/PageContainerPage";
import { StackPage } from "./pages/StackPage";
import { createComingSoonPage } from "./pages/ComingSoonPage";

export interface PageMeta {
  component: ComponentType;
  label: string;
  path: string;
  category: typeof categories[number];
  status?: "ready" | "planned";
}

export const categories = [
  "시작하기",
  "파운데이션",
  "레이아웃",
  "입력",
  "표시",
  "데이터",
  "네비게이션",
  "오버레이",
  "기타",
] as const;

export const pages: PageMeta[] = [
  // ── 시작하기 ──
  { path: "overview", component: OverviewPage, label: "소개", category: "시작하기" },

  // ── 파운데이션 ──
  { path: "colors", component: ColorsPage, label: "Colors", category: "파운데이션" },
  { path: "typography", component: TypographyPage, label: "Typography", category: "파운데이션" },
  { path: "spacing", component: SpacingPage, label: "Spacing", category: "파운데이션" },

  // ── 레이아웃 ──
  { path: "app-shell", component: AppShellPage, label: "AppShell", category: "레이아웃" },
  { path: "layout-header", component: HeaderPage, label: "Header", category: "레이아웃" },
  { path: "layout-sidebar", component: LayoutSidebarPage, label: "Sidebar", category: "레이아웃" },
  { path: "layout-footer", component: FooterPage, label: "Footer", category: "레이아웃" },
  { path: "page-container", component: PageContainerPage, label: "PageContainer", category: "레이아웃" },
  { path: "stack", component: StackPage, label: "Stack", category: "레이아웃" },

  // ── 입력 ──
  { path: "button", component: ButtonPage, label: "Button", category: "입력" },
  { path: "input", component: InputPage, label: "Input", category: "입력" },
  { path: "checkbox", component: createComingSoonPage("Checkbox", "체크박스 입력 컴포넌트. 단일 또는 그룹으로 사용하며 폼 내 다중 선택에 활용합니다."), label: "Checkbox", category: "입력", status: "planned" },
  { path: "radio", component: createComingSoonPage("Radio", "라디오 버튼/그룹. 여러 옵션 중 하나를 선택할 때 사용합니다."), label: "Radio", category: "입력", status: "planned" },
  { path: "switch", component: createComingSoonPage("Switch", "토글 스위치. On/Off 상태를 전환하는 컴포넌트입니다."), label: "Switch", category: "입력", status: "planned" },
  { path: "select", component: createComingSoonPage("Select", "드롭다운 선택 컴포넌트. 옵션 목록에서 하나 또는 여러 개를 선택합니다."), label: "Select", category: "입력", status: "planned" },
  { path: "textarea", component: createComingSoonPage("Textarea", "여러 줄 텍스트 입력 필드. 긴 텍스트 입력에 사용합니다."), label: "Textarea", category: "입력", status: "planned" },
  { path: "date-picker", component: createComingSoonPage("DatePicker", "날짜 선택기. 캘린더 UI를 통해 날짜를 선택합니다."), label: "DatePicker", category: "입력", status: "planned" },
  { path: "phone-input", component: createComingSoonPage("PhoneInput", "전화번호 입력 필드. 국가코드 선택과 번호 포맷팅을 지원합니다."), label: "PhoneInput", category: "입력", status: "planned" },
  { path: "email-input", component: createComingSoonPage("EmailInput", "이메일 주소 입력 필드. 실시간 유효성 검증을 지원합니다."), label: "EmailInput", category: "입력", status: "planned" },
  { path: "file-upload", component: createComingSoonPage("FileUpload", "파일 업로드 컴포넌트. 드래그앤드롭과 클릭 업로드를 지원합니다."), label: "FileUpload", category: "입력", status: "planned" },

  // ── 표시 ──
  { path: "badge", component: createComingSoonPage("Badge", "뱃지 컴포넌트. 숫자, 상태, 알림 개수 등을 표시합니다."), label: "Badge", category: "표시", status: "planned" },
  { path: "chip", component: createComingSoonPage("Chip", "칩/태그 컴포넌트. 선택 가능하고 삭제 버튼을 포함할 수 있습니다."), label: "Chip", category: "표시", status: "planned" },
  { path: "avatar", component: createComingSoonPage("Avatar", "프로필 사진/이니셜 아바타. 사용자 또는 그룹을 시각적으로 표현합니다."), label: "Avatar", category: "표시", status: "planned" },
  { path: "tooltip", component: createComingSoonPage("Tooltip", "호버 시 표시되는 설명 툴팁. 추가 정보를 제공합니다."), label: "Tooltip", category: "표시", status: "planned" },
  { path: "alert", component: createComingSoonPage("Alert", "알림 배너. info, success, warning, error 상태를 지원합니다."), label: "Alert", category: "표시", status: "planned" },
  { path: "skeleton", component: createComingSoonPage("Skeleton", "로딩 플레이스홀더. 콘텐츠 로딩 중 레이아웃을 미리 보여줍니다."), label: "Skeleton", category: "표시", status: "planned" },
  { path: "progress", component: createComingSoonPage("ProgressBar", "진행률 표시 바. 작업 진행 상황을 시각적으로 표현합니다."), label: "ProgressBar", category: "표시", status: "planned" },
  { path: "spinner", component: createComingSoonPage("Spinner", "로딩 스피너. 비동기 작업 진행 중 표시합니다."), label: "Spinner", category: "표시", status: "planned" },

  // ── 데이터 ──
  { path: "card", component: CardPage, label: "Card", category: "데이터" },
  { path: "table", component: TablePage, label: "Table", category: "데이터" },
  { path: "sheet", component: createComingSoonPage("Sheet", "스프레드시트 UI 컴포넌트. 셀 편집, 선택, 정렬 등 UI를 제공하며, 엑셀/구글시트 연동은 data/onChange prop을 통해 외부에서 처리합니다."), label: "Sheet", category: "데이터", status: "planned" },
  { path: "calendar", component: createComingSoonPage("Calendar", "캘린더 뷰 UI 컴포넌트. 월간/주간/일간 보기를 지원하며, 일정 데이터는 prop으로 전달받아 표시합니다."), label: "Calendar", category: "데이터", status: "planned" },
  { path: "list-view", component: createComingSoonPage("ListView", "카드형/리스트형 뷰 전환. 데이터를 다양한 형태로 표시합니다."), label: "ListView", category: "데이터", status: "planned" },
  { path: "timeline", component: createComingSoonPage("Timeline", "타임라인 컴포넌트. 시간순 활동 기록을 표시합니다."), label: "Timeline", category: "데이터", status: "planned" },

  // ── 네비게이션 ──
  { path: "tabs", component: createComingSoonPage("Tabs", "탭 네비게이션. 콘텐츠를 탭으로 분리하여 전환합니다."), label: "Tabs", category: "네비게이션", status: "planned" },
  { path: "breadcrumb", component: createComingSoonPage("Breadcrumb", "경로 네비게이션. 현재 페이지의 위치를 계층 구조로 표시합니다."), label: "Breadcrumb", category: "네비게이션", status: "planned" },
  { path: "pagination", component: createComingSoonPage("Pagination", "페이지네이션. 대량의 데이터를 페이지 단위로 탐색합니다."), label: "Pagination", category: "네비게이션", status: "planned" },
  { path: "stepper", component: createComingSoonPage("Stepper", "단계별 진행 표시기. 위자드 형태의 흐름을 안내합니다."), label: "Stepper", category: "네비게이션", status: "planned" },
  { path: "accordion", component: createComingSoonPage("Accordion", "접기/펼치기 섹션. 콘텐츠를 그룹별로 접어서 관리합니다."), label: "Accordion", category: "네비게이션", status: "planned" },
  { path: "menu", component: createComingSoonPage("Menu", "메뉴 컴포넌트. 컨텍스트 메뉴, 드롭다운 메뉴 등 메뉴 아이템 리스트를 표시합니다."), label: "Menu", category: "네비게이션", status: "planned" },

  // ── 오버레이 ──
  { path: "modal", component: ModalPage, label: "Modal", category: "오버레이" },
  { path: "toast", component: ToastPage, label: "Toast", category: "오버레이" },
  { path: "popover", component: createComingSoonPage("Popover", "팝오버. 클릭 시 요소 근처에 추가 콘텐츠를 표시합니다."), label: "Popover", category: "오버레이", status: "planned" },
  { path: "floating-action", component: createComingSoonPage("FloatingAction", "플로팅 액션 버튼(FAB). 화면 위에 떠있는 주요 액션 버튼입니다."), label: "FloatingAction", category: "오버레이", status: "planned" },

  // ── 기타 ──
  { path: "carousel", component: createComingSoonPage("Carousel", "캐러셀/슬라이더. 이미지나 콘텐츠를 슬라이드 형태로 표시합니다."), label: "Carousel", category: "기타", status: "planned" },
  { path: "icon", component: createComingSoonPage("Icon", "아이콘 시스템. lucide-react 기반 아이콘 사용법과 커스텀 아이콘 가이드입니다."), label: "Icon", category: "기타", status: "planned" },
  { path: "divider", component: createComingSoonPage("Divider", "구분선. 콘텐츠 섹션을 시각적으로 분리합니다."), label: "Divider", category: "기타", status: "planned" },
  { path: "form", component: createComingSoonPage("Form", "폼 레이아웃 및 검증. FormField와 함께 일관된 폼 구조를 제공합니다."), label: "Form", category: "기타", status: "planned" },
];

export function getPageByPath(pathname: string): PageMeta | undefined {
  const slug = pathname.replace(/^\//, "") || "overview";
  return pages.find((p) => p.path === slug);
}
