# @akron/ui API Reference (for AI Agents)

이 문서는 AI 코딩 도구(Claude, Cursor, Copilot 등)가 `@akron/ui` 라이브러리를 사용하여 코드를 생성할 때 참조하는 레퍼런스입니다. 컴포넌트의 props, 사용 패턴, 커스터마이징 방법을 구조화하여 제공합니다.

> **이 파일은 컴포넌트가 추가/변경/삭제될 때 반드시 함께 업데이트해야 합니다.**

---

## 설치 및 설정

```bash
pnpm add @akron/ui
```

```tsx
// main.tsx 또는 App.tsx — 토큰 CSS를 한 번만 import
import "@akron/ui/tokens";
```

---

## 레이아웃 컴포넌트

### AppShell

최상위 레이아웃 셸. 사이드바 + 본문 구조를 잡아준다.

```tsx
import { AppShell } from "@akron/ui";

<AppShell
  sidebar={<LayoutSidebar>...</LayoutSidebar>}
  sidebarWidth={260}           // px, 기본값 260
  sidebarCollapsed={false}     // 접힘 상태
  sidebarOpen={false}          // 모바일 오버레이 열림
  onSidebarClose={() => {}}    // 모바일 오버레이 닫기 콜백
>
  <Header sticky />
  <PageContainer>{/* 콘텐츠 */}</PageContainer>
  <Footer>© 2026</Footer>
</AppShell>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| sidebar | ReactNode | - | 좌측 사이드바 콘텐츠 |
| sidebarWidth | number | 260 | 사이드바 너비(px) |
| sidebarCollapsed | boolean | false | 사이드바 접힘 상태 |
| sidebarOpen | boolean | false | 모바일에서 사이드바 표시 여부 |
| onSidebarClose | () => void | - | 모바일 오버레이 클릭 시 콜백 |

**커스텀 토큰:** `--ark-layout-sidebar-width`, `--ark-layout-sidebar-collapsed-width`

---

### Header

상단 고정 헤더. AppShell 안에서 사용.

```tsx
import { Header } from "@akron/ui";

<Header
  logo={<span>My App</span>}   // 좌측 로고/타이틀 영역
  nav={<nav>...</nav>}          // 중앙 네비게이션 (선택)
  actions={<button>설정</button>} // 우측 액션 영역
  height={56}                   // px, 기본값 56
  sticky                        // 스크롤 시 상단 고정
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| logo | ReactNode | - | 좌측 로고/타이틀 |
| nav | ReactNode | - | 중앙 네비게이션 |
| actions | ReactNode | - | 우측 액션 버튼 영역 |
| height | number | 56 | 헤더 높이(px) |
| sticky | boolean | false | 스크롤 시 상단 고정 |

**커스텀 토큰:** `--ark-header-height`, `--ark-header-padding-x`, `--ark-header-bg`, `--ark-header-border-color`

---

### LayoutSidebar / SidebarGroup / SidebarItem

사이드바 내부 구조. AppShell의 `sidebar` prop에 전달.

```tsx
import { LayoutSidebar, SidebarGroup, SidebarItem } from "@akron/ui";

<LayoutSidebar
  header={<div>로고</div>}     // 사이드바 상단 (헤더 높이와 정렬됨)
  footer={<div>버전 정보</div>} // 사이드바 하단 고정
  collapsed={false}             // 아이콘만 보이는 접힘 모드
  onCollapse={() => {}}         // 접기 버튼 클릭
  onExpand={() => {}}           // 펼치기 버튼 클릭
>
  <SidebarGroup label="메뉴" collapsible defaultOpen>
    <SidebarItem
      icon={<HomeIcon size={16} />}  // 좌측 아이콘 (16px 권장)
      active                          // 현재 선택된 항목
      tooltip="홈"                    // 접힌 상태에서 표시되는 툴팁
      onClick={() => navigate("/")}
    >
      홈
    </SidebarItem>
  </SidebarGroup>
</LayoutSidebar>
```

**LayoutSidebar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| header | ReactNode | - | 사이드바 상단 영역 |
| footer | ReactNode | - | 사이드바 하단 고정 영역 |
| collapsed | boolean | false | 아이콘만 보이는 접힘 모드 |
| onCollapse | () => void | - | 접기 버튼 클릭 콜백 |
| onExpand | () => void | - | 펼치기 버튼 클릭 콜백 |

**SidebarGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | 그룹 라벨 (접힌 상태에서는 숨김) |
| collapsible | boolean | false | 그룹 접기/펼치기 가능 여부 |
| defaultOpen | boolean | true | 초기 펼침 상태 |

**SidebarItem Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| active | boolean | false | 선택된 항목 하이라이트 |
| icon | ReactNode | - | 좌측 아이콘 (접힌 상태에서만 표시됨) |
| tooltip | string | - | 접힌 상태에서 호버 시 표시되는 텍스트 |

**커스텀 토큰:** `--ark-sidebar-bg`, `--ark-sidebar-border-color`, `--ark-sidebar-item-radius`, `--ark-sidebar-item-padding-x`, `--ark-sidebar-item-padding-y`, `--ark-sidebar-item-gap`, `--ark-sidebar-group-gap`

---

### Footer

하단 푸터. AppShell 안에서 사용.

```tsx
import { Footer } from "@akron/ui";

<Footer>
  <span>© 2026 My Company</span>
</Footer>
```

Props는 표준 HTML `<footer>` 속성만 지원. 커스텀 토큰: `--ark-footer-bg`, `--ark-footer-border-color`, `--ark-footer-padding-x`, `--ark-footer-padding-y`

---

### PageContainer

본문 콘텐츠의 최대 너비를 제한하는 컨테이너.

```tsx
import { PageContainer } from "@akron/ui";

<PageContainer size="lg">  {/* sm | md | lg | xl | full */}
  {/* 콘텐츠 */}
</PageContainer>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" \| "md" \| "lg" \| "xl" \| "full" | "lg" | 최대 너비 |

사이즈별 최대 너비: sm=640px, md=768px, lg=960px, xl=1200px, full=제한없음

**커스텀 토큰:** `--ark-container-sm/md/lg/xl/2xl`, `--ark-container-padding-x`

---

### Stack

Flexbox 기반 레이아웃 유틸리티.

```tsx
import { Stack } from "@akron/ui";

<Stack direction="horizontal" gap={12} align="center" justify="between" wrap>
  <div>A</div>
  <div>B</div>
</Stack>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| direction | "vertical" \| "horizontal" | "vertical" | 배치 방향 |
| gap | number | 0 | 아이템 간격(px) |
| align | "start" \| "center" \| "end" \| "stretch" | - | cross-axis 정렬 |
| justify | "start" \| "center" \| "end" \| "between" | - | main-axis 정렬 |
| wrap | boolean | false | 줄바꿈 허용 |

---

## 입력 컴포넌트

### Button

```tsx
import { Button } from "@akron/ui";

<Button
  variant="primary"            // primary | secondary | outline | ghost | danger
  size="md"                    // sm | md | lg
  loading={false}              // 로딩 스피너 표시, 자동으로 disabled 처리
  leftIcon={<PlusIcon />}     // 텍스트 왼쪽 아이콘
  rightIcon={<ArrowRight />}  // 텍스트 오른쪽 아이콘
  disabled={false}
  onClick={() => {}}
>
  버튼 텍스트
</Button>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "primary" \| "secondary" \| "outline" \| "ghost" \| "danger" | "primary" | 스타일 변형 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| loading | boolean | false | 로딩 상태 (disabled 자동 적용) |
| leftIcon | ReactNode | - | 텍스트 왼쪽 아이콘 |
| rightIcon | ReactNode | - | 텍스트 오른쪽 아이콘 |

아이콘 크기 권장: sm=14, md=16, lg=18

**커스텀 토큰:** `--ark-btn-height-sm/md/lg`, `--ark-btn-radius`, `--ark-btn-font-size-sm/md/lg`, `--ark-btn-padding-x-sm/md/lg`

---

### Input

```tsx
import { Input } from "@akron/ui";

<Input
  label="이메일"               // 상단 라벨
  helperText="업무용 이메일"    // 하단 보조 텍스트
  errorMessage="필수 항목"     // 에러 메시지 (표시 시 에러 스타일 적용)
  inputSize="md"               // sm | md | lg
  placeholder="example@work.com"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | 상단 라벨 텍스트 |
| helperText | string | - | 하단 보조 설명 |
| errorMessage | string | - | 에러 메시지 (표시 시 빨간 테두리) |
| inputSize | "sm" \| "md" \| "lg" | "md" | 크기 (HTML의 size와 겹치지 않도록 inputSize로 명명) |

**커스텀 토큰:** `--ark-input-height-sm/md/lg`, `--ark-input-radius`, `--ark-input-font-size-sm/md/lg`, `--ark-input-padding-x`, `--ark-input-bg`, `--ark-input-border-color`

---

## 데이터 표시 컴포넌트

### Card

```tsx
import { Card } from "@akron/ui";

<Card clickable onClick={() => navigate("/detail")}>
  <h3>제목</h3>
  <p>설명</p>
</Card>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| clickable | boolean | false | 클릭 가능 상태 (hover 효과, role="button") |

**커스텀 토큰:** `--ark-card-radius`, `--ark-card-padding`, `--ark-card-bg`, `--ark-card-border-color`, `--ark-card-shadow`, `--ark-card-shadow-hover`

---

### Table / TableHeader / TableBody / TableRow / TableHead / TableCell

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@akron/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead numeric>금액</TableHead>  {/* 우측 정렬 */}
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell numeric>₩1,000,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

`numeric` prop을 사용하면 셀 내용이 우측 정렬됩니다.

**커스텀 토큰:** `--ark-table-cell-padding-x`, `--ark-table-cell-padding-y`, `--ark-table-header-bg`, `--ark-table-border-color`, `--ark-table-row-hover-bg`

---

## 오버레이 컴포넌트

### Modal

Radix Dialog 기반. 접근성(키보드, 포커스 트랩) 자동 지원.

```tsx
import { Modal } from "@akron/ui";

const [open, setOpen] = useState(false);

<Modal
  open={open}
  onOpenChange={setOpen}
  size="md"                    // sm | md | lg
  title="확인"
  description="정말 삭제하시겠습니까?"
>
  <div>모달 본문 콘텐츠</div>
  <Button onClick={() => setOpen(false)}>닫기</Button>
</Modal>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| open | boolean | **필수** | 모달 열림 상태 |
| onOpenChange | (open: boolean) => void | **필수** | 상태 변경 콜백 |
| size | "sm" \| "md" \| "lg" | "md" | 모달 너비 |
| title | string | - | 모달 제목 |
| description | string | - | 모달 설명 |

사이즈별 너비: sm=400px, md=560px, lg=720px (모바일에서는 전부 100%)

**커스텀 토큰:** `--ark-modal-width-sm/md/lg`, `--ark-modal-radius`, `--ark-modal-shadow`, `--ark-modal-bg`, `--ark-modal-overlay-bg`

---

### Toast (Provider + Hook)

Context 기반. 앱 최상위에 `ToastProvider`를 감싸고, 하위에서 `useToast()` 호출.

```tsx
// App.tsx
import { ToastProvider } from "@akron/ui";

<ToastProvider>
  <App />
</ToastProvider>

// 하위 컴포넌트
import { useToast } from "@akron/ui";

function MyComponent() {
  const toast = useToast();

  const handleSave = () => {
    toast({
      type: "success",           // success | warning | error | info
      title: "저장 완료",
      message: "변경사항이 저장되었습니다.",  // 선택
      duration: 3000,            // ms, 선택 (타입별 기본값 있음)
    });
  };
}
```

타입별 기본 duration: success=3000, info=3000, warning=4000, error=5000

**커스텀 토큰:** `--ark-toast-min-width`, `--ark-toast-max-width`, `--ark-toast-radius`, `--ark-toast-shadow`, `--ark-toast-bg`, `--ark-toast-border-color`

---

## 디자인 토큰 시스템

모든 스타일 값은 CSS 변수(Custom Properties)로 관리됩니다. 컴포넌트는 이 변수들을 참조하므로, 변수를 오버라이드하면 컴포넌트 스타일이 일괄 변경됩니다.

### Primary 색상 커스터마이징

```css
/* global.css — tokens.css import 이후에 추가 */
:root {
  --ark-color-primary-50:  #EEF2FF;
  --ark-color-primary-100: #E0E7FF;
  --ark-color-primary-200: #C7D2FE;
  --ark-color-primary-300: #A5B4FC;
  --ark-color-primary-400: #818CF8;
  --ark-color-primary-500: #4F46E5;  /* 브랜드 대표 색상 */
  --ark-color-primary-600: #4338CA;
  --ark-color-primary-700: #3730A3;
}

[data-theme="dark"] {
  --ark-color-primary-50:  #1a1a2e;
  --ark-color-primary-100: #22224a;
  --ark-color-primary-200: #2d2d6b;
  --ark-color-primary-300: #3730A3;
  --ark-color-primary-400: #4F46E5;
  --ark-color-primary-500: #818CF8;  /* 다크모드에서는 밝은 쪽이 500 */
  --ark-color-primary-600: #A5B4FC;
  --ark-color-primary-700: #C7D2FE;
}
```

> 50~700 **전체 shade를 오버라이드**해야 버튼, 배지, 포커스링, hover 등 모든 컴포넌트에 일관 적용됩니다. playground의 Colors 페이지에서 색상을 선택하고 "CSS 복사"로 전체 변수를 얻을 수 있습니다.

### 다크모드 적용

```tsx
// 토글 시 document에 data-theme 속성 변경
document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
```

tokens.css가 `[data-theme="dark"]` 선택자로 모든 토큰을 자동 전환합니다.

### 주요 토큰 카테고리

| 카테고리 | 접두사 | 예시 |
|---------|--------|------|
| 브랜드 색상 | `--ark-color-primary-` | `--ark-color-primary-500` |
| 중립 색상 | `--ark-color-gray-` | `--ark-color-gray-300` |
| 시맨틱 색상 | `--ark-color-success/warning/error/info-` | `--ark-color-error-500` |
| 배경/텍스트 | `--ark-color-bg/text-` | `--ark-color-bg-subtle` |
| 간격 | `--ark-spacing-` | `--ark-spacing-4` (16px) |
| 폰트 크기 | `--ark-font-size-` | `--ark-font-size-sm` (14px) |
| 모서리 반경 | `--ark-radius-` | `--ark-radius-lg` (8px) |
| 그림자 | `--ark-shadow-` | `--ark-shadow-md` |
| Z-index | `--ark-z-` | `--ark-z-modal` (300) |
| 트랜지션 | `--ark-transition-` | `--ark-transition-fast` (150ms) |

### 컴포넌트별 토큰

각 컴포넌트는 `--ark-{component}-*` 형태의 전용 토큰을 가집니다:

```css
/* 예: 버튼 높이만 전역으로 변경 */
:root {
  --ark-btn-height-md: 40px;
}

/* 예: 특정 섹션에서 카드 스타일 변경 */
.my-section {
  --ark-card-radius: 16px;
  --ark-card-shadow: none;
}
```

---

## 공통 패턴

### 아이콘 사용

모든 아이콘은 `lucide-react` 패키지를 사용합니다.

```tsx
import { Plus, Settings, ChevronRight } from "lucide-react";

<Button leftIcon={<Plus size={16} />}>추가</Button>
<SidebarItem icon={<Settings size={16} />}>설정</SidebarItem>
```

아이콘 크기 규칙:
- SidebarItem: 16px
- Button sm: 14px, md: 16px, lg: 18px
- Header 내 아이콘: 16~20px

### forwardRef

모든 컴포넌트는 `forwardRef`를 사용합니다. DOM 요소에 직접 접근 가능:

```tsx
const buttonRef = useRef<HTMLButtonElement>(null);
<Button ref={buttonRef}>클릭</Button>
```

### 접근성

- `focus-visible` 스타일: `outline: 2px solid var(--ark-color-primary-500); outline-offset: 2px`
- Modal: Radix Dialog 기반 포커스 트랩, ESC 닫기
- Input: `aria-invalid`, `aria-describedby` 자동 설정
- Toast: `role="alert"`
- Card (clickable): `role="button"`, `tabIndex={0}`

### 반응형 브레이크포인트

tokens.css에서 자동 적용:
- sm: 640px
- md: 768px (모바일 사이드바 오버레이 전환, 모달 전체폭)
- lg: 1024px
- xl: 1280px
- 2xl: 1536px

---

## 전체 레이아웃 조합 예시

```tsx
import {
  AppShell, Header, LayoutSidebar, SidebarGroup, SidebarItem,
  Footer, PageContainer, Button, Card, Stack, ToastProvider, useToast,
} from "@akron/ui";
import { Home, Users, Settings } from "lucide-react";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ToastProvider>
      <AppShell
        sidebar={
          <LayoutSidebar
            header={<span>My ERP</span>}
            collapsed={collapsed}
            onCollapse={() => setCollapsed(true)}
            onExpand={() => setCollapsed(false)}
          >
            <SidebarGroup label="메뉴">
              <SidebarItem icon={<Home size={16} />} active tooltip="대시보드">
                대시보드
              </SidebarItem>
              <SidebarItem icon={<Users size={16} />} tooltip="인사 관리">
                인사 관리
              </SidebarItem>
            </SidebarGroup>
            <SidebarGroup label="설정" collapsible>
              <SidebarItem icon={<Settings size={16} />} tooltip="환경설정">
                환경설정
              </SidebarItem>
            </SidebarGroup>
          </LayoutSidebar>
        }
        sidebarWidth={260}
        sidebarCollapsed={collapsed}
      >
        <Header logo="대시보드" actions={<Button size="sm">새로 만들기</Button>} sticky />
        <PageContainer size="xl">
          <Stack gap={16}>
            <Card>카드 콘텐츠</Card>
            <Card clickable>클릭 가능한 카드</Card>
          </Stack>
        </PageContainer>
        <Footer>© 2026 My Company</Footer>
      </AppShell>
    </ToastProvider>
  );
}
```
