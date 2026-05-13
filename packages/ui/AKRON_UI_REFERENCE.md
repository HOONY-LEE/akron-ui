# @sunghoon_lee/akron-ui API Reference (for AI Agents)

이 문서는 AI 코딩 도구(Claude, Cursor, Copilot 등)가 `@sunghoon_lee/akron-ui` 라이브러리를 사용하여 코드를 생성할 때 참조하는 레퍼런스입니다. 컴포넌트의 props, 사용 패턴, 커스터마이징 방법을 구조화하여 제공합니다.

> **이 파일은 컴포넌트가 추가/변경/삭제될 때 반드시 함께 업데이트해야 합니다.**

---

## 설치 및 설정

```bash
pnpm add @sunghoon_lee/akron-ui
```

```tsx
// main.tsx 또는 App.tsx — 토큰 CSS를 한 번만 import
import "@sunghoon_lee/akron-ui/tokens";
```

---

## 레이아웃 컴포넌트

### AppShell

최상위 레이아웃 셸. 사이드바 + 본문 구조를 잡아준다.

```tsx
import { AppShell } from "@sunghoon_lee/akron-ui";

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
import { Header } from "@sunghoon_lee/akron-ui";

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
import { LayoutSidebar, SidebarGroup, SidebarItem } from "@sunghoon_lee/akron-ui";

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
import { Footer } from "@sunghoon_lee/akron-ui";

<Footer>
  <span>© 2026 My Company</span>
</Footer>
```

Props는 표준 HTML `<footer>` 속성만 지원. 커스텀 토큰: `--ark-footer-bg`, `--ark-footer-border-color`, `--ark-footer-padding-x`, `--ark-footer-padding-y`

---

### PageContainer

본문 콘텐츠의 최대 너비를 제한하는 컨테이너.

```tsx
import { PageContainer } from "@sunghoon_lee/akron-ui";

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
import { Stack } from "@sunghoon_lee/akron-ui";

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

### Checkbox

Radix Checkbox 기반. 단독 또는 그룹 사용 가능.

```tsx
import { Checkbox } from "@sunghoon_lee/akron-ui";

// 단독 사용
<Checkbox
  label="약관에 동의합니다"
  description="선택사항"
  checked={checked}
  onCheckedChange={setChecked}
  size="md"
/>

// 비제어
<Checkbox label="이메일 수신" defaultChecked />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean \| "indeterminate" | - | 체크 상태 |
| defaultChecked | boolean | - | 기본 체크 상태 (비제어) |
| onCheckedChange | (checked: boolean \| "indeterminate") => void | - | 상태 변경 핸들러 |
| label | string | - | 라벨 텍스트 |
| description | string | - | 보조 텍스트 |
| disabled | boolean | false | 비활성화 |
| error | boolean | false | 에러 상태 |
| errorMessage | string | - | 에러 메시지 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| name | string | - | 폼 제출용 name |
| value | string | - | 폼 제출용 value |

---

### Radio / RadioGroup

라디오 버튼. 주로 `RadioGroup`으로 묶어 사용.

```tsx
import { RadioGroup } from "@sunghoon_lee/akron-ui";

<RadioGroup
  value={value}
  onValueChange={setValue}
  options={[
    { value: "a", label: "선택 A" },
    { value: "b", label: "선택 B", description: "설명 텍스트" },
    { value: "c", label: "선택 C", disabled: true },
  ]}
  direction="vertical"
  size="md"
/>
```

**RadioGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | - | 선택된 값 (제어) |
| defaultValue | string | - | 기본 선택 값 (비제어) |
| onValueChange | (value: string) => void | - | 변경 핸들러 |
| options | RadioOption[] | **필수** | 옵션 목록 |
| direction | "vertical" \| "horizontal" | "vertical" | 배치 방향 |
| disabled | boolean | false | 전체 비활성화 |
| error | boolean | false | 에러 상태 |
| errorMessage | string | - | 에러 메시지 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| name | string | - | 폼 name 속성 |

**RadioOption 타입:**

| Field | Type | Description |
|-------|------|-------------|
| value | string | 옵션 값 |
| label | string | 표시 텍스트 |
| description | string | 보조 설명 |
| disabled | boolean | 개별 비활성화 |

---

### Switch

토글 스위치. 켜짐/꺼짐 상태.

```tsx
import { Switch } from "@sunghoon_lee/akron-ui";

<Switch
  label="알림 받기"
  description="이메일로 알림을 받습니다"
  checked={enabled}
  onCheckedChange={setEnabled}
  labelPosition="right"
  size="md"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | - | 켜짐 상태 (제어) |
| defaultChecked | boolean | - | 기본 상태 (비제어) |
| onCheckedChange | (checked: boolean) => void | - | 상태 변경 핸들러 |
| label | string | - | 라벨 텍스트 |
| description | string | - | 보조 텍스트 |
| disabled | boolean | false | 비활성화 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| labelPosition | "left" \| "right" | "right" | 라벨 위치 |

---

### Select

드롭다운 선택. 그룹 옵션 지원.

```tsx
import { Select } from "@sunghoon_lee/akron-ui";

// 단순 옵션
<Select
  label="팀 선택"
  placeholder="선택하세요"
  value={team}
  onValueChange={setTeam}
  options={[
    { value: "frontend", label: "프론트엔드" },
    { value: "backend", label: "백엔드" },
    { value: "design", label: "디자인", disabled: true },
  ]}
/>

// 그룹 옵션
<Select
  options={[
    {
      label: "개발팀",
      options: [
        { value: "fe", label: "프론트엔드" },
        { value: "be", label: "백엔드" },
      ],
    },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | - | 선택된 값 (제어) |
| defaultValue | string | - | 기본 선택 값 (비제어) |
| onValueChange | (value: string) => void | - | 변경 핸들러 |
| options | SelectItem[] | **필수** | 옵션 또는 그룹 목록 |
| placeholder | string | - | 플레이스홀더 |
| label | string | - | 라벨 텍스트 |
| helperText | string | - | 도움말 텍스트 |
| errorMessage | string | - | 에러 메시지 |
| disabled | boolean | false | 비활성화 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |

**SelectOption 타입:** `{ value: string; label: string; disabled?: boolean }`  
**SelectGroup 타입:** `{ label: string; options: SelectOption[] }`

---

### Textarea

여러 줄 텍스트 입력. 글자 수 제한 및 자동 높이 지원.

```tsx
import { Textarea } from "@sunghoon_lee/akron-ui";

<Textarea
  label="내용"
  helperText="최대 500자"
  maxLength={500}
  minRows={3}
  maxRows={8}
  resize="none"
  placeholder="내용을 입력하세요"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | 라벨 텍스트 |
| helperText | string | - | 도움말 텍스트 |
| errorMessage | string | - | 에러 메시지 |
| error | boolean | false | 에러 상태 |
| maxLength | number | - | 글자 수 제한 (카운터 표시) |
| resize | "none" \| "vertical" \| "horizontal" \| "both" | "vertical" | 크기 조절 방향 |
| minRows | number | - | 최소 줄 수 |
| maxRows | number | - | 최대 줄 수 |

표준 `<textarea>` HTML 속성 전부 지원 (`placeholder`, `disabled`, `value`, `onChange` 등).

---

### EmailInput

이메일 형식 실시간 검증. 유효/무효 아이콘 표시.

```tsx
import { EmailInput } from "@sunghoon_lee/akron-ui";

<EmailInput
  label="이메일"
  placeholder="user@example.com"
  helperText="업무용 이메일을 입력하세요"
  validateOnChange       // 입력 중 실시간 검증 (기본 true)
  size="md"
/>

// 커스텀 검증 함수
<EmailInput
  validate={(v) => v.endsWith("@company.com")}
  errorMessage="사내 이메일만 허용됩니다"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 (지정 시 에러 상태 고정) |
| validateOnChange | boolean | true | 실시간 검증 |
| validate | (value: string) => boolean | 이메일 형식 | 커스텀 검증 함수 |
| showValidIcon | boolean | true | 유효 시 체크 아이콘 표시 |

표준 `<input>` HTML 속성 지원 (`value`, `onChange`, `disabled`, `placeholder` 등).

---

### PhoneInput

국가코드 선택 + 전화번호 입력.

```tsx
import { PhoneInput } from "@sunghoon_lee/akron-ui";

<PhoneInput
  label="전화번호"
  countryCode="KR"
  onCountryChange={(c) => console.log(c.code, c.dial)}
  placeholder="010-0000-0000"
  size="md"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 |
| countryCode | string | "KR" | 선택된 국가코드 (ISO 2자리) |
| onCountryChange | (code: CountryCode) => void | - | 국가 변경 핸들러 |
| countries | CountryCode[] | 10개 기본 국가 | 국가 목록 커스터마이징 |

**CountryCode 타입:** `{ code: string; dial: string; flag: string }`  
기본 제공 국가: KR, US, JP, CN, GB, DE, FR, AU, CA, SG

---

### DatePicker

캘린더 팝업 날짜 선택기.

```tsx
import { DatePicker } from "@sunghoon_lee/akron-ui";

// 비제어
<DatePicker
  label="날짜 선택"
  placeholder="YYYY.MM.DD"
  clearable
/>

// 제어
<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}          // 오늘 이전 비활성
  formatDate={(d) => d.toLocaleDateString("ko-KR")}
/>

// 특정 날짜 비활성
<DatePicker
  disableDate={(d) => d.getDay() === 0 || d.getDay() === 6}  // 주말 비활성
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | Date \| null | - | 선택된 날짜 (제어) |
| defaultValue | Date \| null | - | 기본 날짜 (비제어) |
| onChange | (date: Date \| null) => void | - | 날짜 변경 핸들러 |
| minDate | Date | - | 최소 날짜 (이전 날짜 비활성) |
| maxDate | Date | - | 최대 날짜 (이후 날짜 비활성) |
| disableDate | (date: Date) => boolean | - | 날짜별 비활성 판별 |
| formatDate | (date: Date) => string | YYYY.MM.DD | 표시 형식 함수 |
| placeholder | string | "날짜 선택" | 플레이스홀더 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 |
| disabled | boolean | false | 비활성화 |
| clearable | boolean | true | 지우기(X) 버튼 표시 |

---

### FileUpload

드래그 앤 드롭 파일 업로드 존.

```tsx
import { FileUpload } from "@sunghoon_lee/akron-ui";

<FileUpload
  accept="image/*"
  multiple
  maxSize={5 * 1024 * 1024}   // 5MB
  onChange={(files) => console.log(files)}
  showList                      // 업로드된 파일 목록 표시
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| accept | string | - | 허용 파일 유형 (`"image/*"`, `".pdf,.docx"` 등) |
| multiple | boolean | false | 다중 파일 허용 |
| maxSize | number | - | 최대 파일 크기(bytes), 초과 시 에러 표시 |
| onChange | (files: File[]) => void | - | 파일 변경 핸들러 |
| disabled | boolean | false | 비활성화 |
| showList | boolean | true | 파일 목록 표시 (이미지는 썸네일 미리보기) |

---

### NumberInput

증감 버튼 포함 숫자 전용 입력. 접두/접미사, 소수점 정밀도, 장기 누름 지원.

```tsx
import { NumberInput } from "@sunghoon_lee/akron-ui";

<NumberInput label="수량" defaultValue={1} min={0} max={999} step={1} />
<NumberInput label="가격" prefix="₩" defaultValue={10000} step={1000} />
<NumberInput label="무게" suffix="kg" defaultValue={70} step={0.1} precision={1} />
<NumberInput label="나이" hideControls defaultValue={25} min={0} max={150} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number \| null | - | 현재 값 (제어) |
| defaultValue | number \| null | - | 기본 값 (비제어) |
| onChange | (value: number \| null) => void | - | 값 변경 핸들러 |
| min | number | - | 최솟값 |
| max | number | - | 최댓값 |
| step | number | 1 | 증감 단위 |
| precision | number | 0 | 소수점 자리수 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| prefix | ReactNode | - | 앞 접두사 (예: "₩") |
| suffix | ReactNode | - | 뒤 접미사 (예: "kg") |
| hideControls | boolean | false | 증감 버튼 숨김 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 |

> 버튼 장기 누름(400ms 이후) 시 80ms 간격으로 자동 연속 증감.

---

### Slider

범위 슬라이더. 단일/범위 값, 수평/수직 방향, 눈금 표시.

```tsx
import { Slider } from "@sunghoon_lee/akron-ui";

// 단일 값
<Slider label="볼륨" value={vol} onChange={setVol} min={0} max={100} showValue />

// 범위
<Slider
  label="가격 범위"
  rangeValue={range}
  onRangeChange={setRange}
  min={0} max={100000}
  formatValue={(v) => "₩" + v.toLocaleString()}
  showValue
/>

// 눈금
<Slider
  defaultValue={3}
  min={1} max={5} step={1}
  marks={[
    { value: 1, label: "XS" }, { value: 3, label: "M" }, { value: 5, label: "XL" },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | 현재 값 (단일, 제어) |
| defaultValue | number | min | 기본 값 (단일, 비제어) |
| onChange | (value: number) => void | - | 값 변경 핸들러 |
| rangeValue | [number, number] | - | 범위 값 (제어) |
| defaultRangeValue | [number, number] | - | 기본 범위 (비제어) |
| onRangeChange | (value: [number, number]) => void | - | 범위 변경 핸들러 |
| min | number | 0 | 최솟값 |
| max | number | 100 | 최댓값 |
| step | number | 1 | 증감 단위 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| orientation | "horizontal" \| "vertical" | "horizontal" | 방향 |
| color | "primary" \| "success" \| "warning" \| "error" | "primary" | 색상 |
| showValue | boolean | false | 현재 값 텍스트 표시 |
| formatValue | (value: number) => string | String | 값 포맷 함수 |
| marks | boolean \| {value, label?}[] | - | 눈금 표시 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| disabled | boolean | false | 비활성화 |

> 키보드: 방향키로 step 이동, Home/End로 min/max 이동.

---

### Rating

별점 컴포넌트. 반쪽 별, 커스텀 색상, 읽기 전용 지원.

```tsx
import { Rating } from "@sunghoon_lee/akron-ui";

<Rating value={rating} onChange={setRating} label="평점" />
<Rating value={4.5} allowHalf readOnly />
<Rating defaultValue={3} count={10} label="10점 만점" />
<Rating defaultValue={4} color="var(--ark-color-primary-500)" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | - | 현재 값 (제어, 0~count) |
| defaultValue | number | 0 | 기본 값 (비제어) |
| onChange | (value: number) => void | - | 값 변경 핸들러 |
| count | number | 5 | 별 개수 |
| allowHalf | boolean | false | 반쪽 별 허용 |
| clearable | boolean | true | 같은 값 클릭 시 0으로 초기화 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| readOnly | boolean | false | 읽기 전용 |
| disabled | boolean | false | 비활성화 |
| color | string | 노란색 | 별 색상 (CSS 색상값) |
| label | string | - | 라벨 |

> 키보드: 포커스 후 방향키로 증감.

---

### OTPInput

인증코드 입력. 자릿수별 개별 셀, 자동 포커스 이동, 붙여넣기 지원.

```tsx
import { OTPInput } from "@sunghoon_lee/akron-ui";

<OTPInput
  label="인증번호"
  length={6}
  onComplete={(code) => verify(code)}
/>

// 구분자 있는 전화번호 스타일
<OTPInput length={10} type="numeric" separator={3} />

// PIN 입력
<OTPInput length={4} mask helperText="4자리 PIN을 입력하세요" />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| length | number | 6 | 자릿수 |
| value | string | - | 현재 값 (제어) |
| defaultValue | string | "" | 기본 값 (비제어) |
| onChange | (value: string) => void | - | 값 변경 핸들러 |
| onComplete | (value: string) => void | - | 모든 자리 입력 완료 시 핸들러 |
| type | "numeric" \| "alpha" \| "alphanumeric" | "numeric" | 허용 문자 타입 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| mask | boolean | false | 비밀번호 마스킹 |
| separator | number | - | 구분자 간격 (예: 3 → 3자리마다 "–") |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 |
| disabled | boolean | false | 비활성화 |

> 붙여넣기 시 자동으로 각 셀에 분배. `autoComplete="one-time-code"` 기본 설정.

---

### TagInput

태그 입력. Enter/쉼표로 추가, Backspace로 삭제.

```tsx
import { TagInput } from "@sunghoon_lee/akron-ui";

<TagInput
  label="기술 스택"
  value={tags}
  onChange={setTags}
  placeholder="태그 입력..."
  tagColor="primary"
/>

// 유효성 검증
<TagInput
  validate={(tag) => {
    if (tag.length < 2) return "2자 이상 입력하세요";
    return true;
  }}
  maxTags={5}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string[] | - | 태그 목록 (제어) |
| defaultValue | string[] | [] | 기본 태그 (비제어) |
| onChange | (tags: string[]) => void | - | 변경 핸들러 |
| placeholder | string | - | 플레이스홀더 |
| maxTags | number | - | 최대 태그 수 |
| addKeys | string[] | ["Enter", ","] | 태그 추가 트리거 키 |
| allowDuplicates | boolean | false | 중복 허용 |
| validate | (tag: string) => boolean \| string | - | 유효성 검증 (string 반환 시 에러 메시지) |
| tagColor | "neutral" \| "primary" \| "success" \| "warning" \| "error" | "neutral" | 태그 색상 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| readOnly | boolean | false | 읽기 전용 |
| disabled | boolean | false | 비활성화 |
| label | string | - | 라벨 |
| helperText | string | - | 도움말 |
| errorMessage | string | - | 에러 메시지 |

---

### Button

```tsx
import { Button } from "@sunghoon_lee/akron-ui";

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
import { Input } from "@sunghoon_lee/akron-ui";

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

## 표시 컴포넌트

### Badge

레이블/태그/카운트 표시.

```tsx
import { Badge } from "@sunghoon_lee/akron-ui";

<Badge variant="solid" color="primary" size="md">NEW</Badge>
<Badge color="success" dot />           // 점(dot) 뱃지
<Badge count={42} />                     // 숫자 카운트 (99+ 처리)
<Badge count={120} maxCount={99} />      // "99+" 표시
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "solid" \| "subtle" \| "outline" | "subtle" | 시각적 스타일 |
| color | "primary" \| "success" \| "warning" \| "error" \| "info" \| "neutral" | "neutral" | 색상 테마 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| dot | boolean | false | 텍스트 대신 점 표시 |
| count | number | - | 숫자 카운트 표시 |
| maxCount | number | 99 | count 최대값 (초과 시 "99+") |

---

### Chip

선택/삭제 가능한 태그 칩.

```tsx
import { Chip } from "@sunghoon_lee/akron-ui";

// 선택 가능
<Chip label="React" selected={selected} onSelect={setSelected} color="primary" />

// 삭제 가능
<Chip label="태그" deletable onDelete={() => removeTag()} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | **필수** | 칩 텍스트 |
| selected | boolean | false | 선택 상태 |
| onSelect | (selected: boolean) => void | - | 선택 토글 핸들러 |
| deletable | boolean | false | 삭제(X) 버튼 표시 |
| onDelete | () => void | - | 삭제 핸들러 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| color | "primary" \| "success" \| "warning" \| "error" \| "neutral" | "neutral" | 색상 테마 |
| disabled | boolean | false | 비활성화 |

> ⚠️ `onClick`/`onSelect` 이름 충돌 주의: `onSelect`는 Chip 전용 prop. 일반 클릭은 `label`을 클릭 시 `onSelect`가 호출됨.

---

### Alert

인라인 알림 메시지.

```tsx
import { Alert } from "@sunghoon_lee/akron-ui";

<Alert variant="info" title="안내" description="변경사항이 저장되었습니다." />
<Alert variant="error" title="오류" closable onClose={() => setShow(false)}>
  커스텀 본문 콘텐츠
</Alert>
<Alert variant="warning" showIcon={false}>아이콘 없이</Alert>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "info" \| "success" \| "warning" \| "error" | "info" | 알림 유형 |
| title | string | - | 제목 |
| description | ReactNode | - | 설명 텍스트 |
| showIcon | boolean | true | 유형 아이콘 표시 |
| closable | boolean | false | 닫기(X) 버튼 표시 |
| onClose | () => void | - | 닫기 핸들러 |
| children | ReactNode | - | 커스텀 본문 (description 대신 사용) |

---

### Skeleton

로딩 플레이스홀더 애니메이션.

```tsx
import { Skeleton } from "@sunghoon_lee/akron-ui";

<Skeleton variant="text" width="80%" />
<Skeleton variant="circle" width={40} height={40} />
<Skeleton variant="rect" width="100%" height={120} />
<Skeleton animated={false} />  // 애니메이션 없이
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | "text" \| "circle" \| "rect" | "text" | 모양 |
| width | string \| number | - | 가로 크기 |
| height | string \| number | - | 세로 크기 |
| animated | boolean | true | shimmer 애니메이션 |

---

### Spinner

로딩 인디케이터.

```tsx
import { Spinner } from "@sunghoon_lee/akron-ui";

<Spinner size="md" color="primary" />
<Spinner size="lg" color="white" label="로딩 중..." />  // 접근성 레이블
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | "xs" \| "sm" \| "md" \| "lg" \| "xl" | "md" | 크기 |
| color | "primary" \| "current" \| "white" | "primary" | 색상 (`current`: 현재 텍스트 색) |
| label | string | "로딩 중" | 스크린리더용 접근성 레이블 |

---

### Avatar / AvatarGroup

사용자 아바타. 이미지, 이니셜, 그룹 표시.

```tsx
import { Avatar, AvatarGroup } from "@sunghoon_lee/akron-ui";

<Avatar src="/photo.jpg" alt="홍길동" size="md" shape="circle" />
<Avatar name="홍길동" size="lg" />           // 이니셜 자동 추출 (홍)
<Avatar size="md" status="online" />          // 온라인 상태 점

// 그룹 (max 초과 시 "+N" 표시)
<AvatarGroup max={3} size="md">
  <Avatar name="김철수" />
  <Avatar name="이영희" />
  <Avatar name="박민준" />
  <Avatar name="최수아" />
</AvatarGroup>
```

**Avatar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| src | string | - | 이미지 URL |
| alt | string | - | 이미지 alt |
| name | string | - | 이름 (이미지 없을 때 이니셜 표시) |
| size | "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl" | "md" | 크기 |
| shape | "circle" \| "square" | "circle" | 모양 |
| status | "online" \| "offline" \| "away" \| "busy" | - | 상태 표시 점 |
| bgColor | string | 자동 | 배경 색상 (CSS 색상값) |

**AvatarGroup Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| max | number | - | 최대 표시 개수 |
| size | AvatarSize | "md" | 그룹 전체 크기 |

---

### Progress

진행률 표시 바.

```tsx
import { Progress } from "@sunghoon_lee/akron-ui";

<Progress value={65} />
<Progress value={80} color="success" size="lg" label="업로드" showValue />
<Progress value={45} striped animated />  // 줄무늬 + 애니메이션
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | number | 0 | 현재 값 (0~max) |
| max | number | 100 | 최대 값 |
| color | "primary" \| "success" \| "warning" \| "error" \| "info" | "primary" | 색상 |
| size | "xs" \| "sm" \| "md" \| "lg" | "md" | 높이 |
| label | string | - | 라벨 텍스트 |
| showValue | boolean | false | 퍼센트 숫자 표시 |
| striped | boolean | false | 줄무늬 패턴 |
| animated | boolean | false | 흐르는 애니메이션 (striped와 함께) |

---

### Tooltip

호버 시 설명 팝업. Radix Tooltip 기반.

```tsx
import { Tooltip } from "@sunghoon_lee/akron-ui";

<Tooltip content="클릭하여 복사" side="top">
  <button>복사</button>
</Tooltip>

// 리치 콘텐츠
<Tooltip content={<div><b>단축키</b><br />Ctrl+C</div>} arrow={false}>
  <span>?</span>
</Tooltip>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | ReactNode | **필수** | 툴팁 내용 |
| children | ReactNode | **필수** | 트리거 요소 |
| side | "top" \| "right" \| "bottom" \| "left" | "top" | 표시 방향 |
| align | "start" \| "center" \| "end" | "center" | 정렬 |
| delayDuration | number | 300 | 표시 지연 (ms) |
| disabled | boolean | false | 비활성화 |
| arrow | boolean | true | 화살표 표시 |
| open | boolean | - | 열림 상태 (제어) |

---

### Divider

구분선. 수평/수직, 레이블 지원.

```tsx
import { Divider } from "@sunghoon_lee/akron-ui";

<Divider />                          // 기본 수평 실선
<Divider variant="dashed" />
<Divider label="또는" labelPosition="center" />
<Divider orientation="vertical" style={{ height: 24 }} />
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| orientation | "horizontal" \| "vertical" | "horizontal" | 방향 |
| variant | "solid" \| "dashed" \| "dotted" | "solid" | 선 스타일 |
| label | string | - | 레이블 텍스트 |
| labelPosition | "start" \| "center" \| "end" | "center" | 레이블 위치 |

---

### Timeline

시간순 이벤트 목록.

```tsx
import { Timeline } from "@sunghoon_lee/akron-ui";

<Timeline
  items={[
    { title: "신청 완료", time: "2024.01.01", status: "completed" },
    { title: "검토 중", description: "담당자 검토 진행", status: "active" },
    { title: "승인 대기", status: "pending" },
    { title: "반려됨", time: "2024.01.05", status: "error" },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | TimelineItem[] | **필수** | 타임라인 아이템 목록 |

**TimelineItem 타입:**

| Field | Type | Description |
|-------|------|-------------|
| title | string | 제목 |
| description | string | 설명 |
| time | string | 시간/날짜 레이블 |
| status | "completed" \| "active" \| "pending" \| "error" | 상태 (점 색상 결정) |
| icon | ReactNode | 커스텀 아이콘 (기본 점 대체) |

---

### Carousel

슬라이드쇼. 자동 재생, 루프, 인디케이터 지원.

```tsx
import { Carousel } from "@sunghoon_lee/akron-ui";

<Carousel autoPlay={3000} loop showIndicators showArrows>
  <div>슬라이드 1</div>
  <div>슬라이드 2</div>
  <div>슬라이드 3</div>
</Carousel>

// 제어 모드
<Carousel activeIndex={current} onIndexChange={setCurrent}>
  {slides}
</Carousel>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| children | ReactNode[] | **필수** | 슬라이드 목록 |
| autoPlay | number | 0 | 자동 재생 간격(ms), 0이면 비활성 |
| loop | boolean | true | 마지막 → 처음 루프 |
| showIndicators | boolean | true | 하단 인디케이터 점 표시 |
| showArrows | boolean | true | 이전/다음 화살표 버튼 |
| activeIndex | number | - | 현재 슬라이드 (제어) |
| onIndexChange | (index: number) => void | - | 슬라이드 변경 핸들러 |

---

## 데이터 컴포넌트

### Card

```tsx
import { Card } from "@sunghoon_lee/akron-ui";

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
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@sunghoon_lee/akron-ui";

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

### Sheet

스프레드시트 UI. 더블클릭 셀 편집, 정렬, 커스텀 렌더러.

```tsx
import { Sheet } from "@sunghoon_lee/akron-ui";

const [data, setData] = useState([
  { name: "홍길동", team: "FE", score: "92" },
]);
const columns = [
  { key: "name", label: "이름", width: 120, sortable: true },
  { key: "team", label: "팀", width: 100, sortable: true },
  { key: "score", label: "점수", width: 80, type: "number", sortable: true },
];

<Sheet columns={columns} data={data} onChange={setData} />

// 커스텀 렌더러
const columns = [
  {
    key: "status",
    label: "상태",
    readOnly: true,
    render: (val) => <Badge color={val === "완료" ? "success" : "neutral"}>{val}</Badge>,
  },
];
```

**Sheet Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| columns | SheetColumn[] | **필수** | 컬럼 정의 |
| data | T[] | **필수** | 데이터 (Record<string, unknown> 형태) |
| onChange | (data: T[]) => void | - | 데이터 변경 핸들러 |
| rowHeight | number | 36 | 행 높이(px) |
| readOnly | boolean | false | 전체 읽기 전용 |
| maxHeight | string \| number | 480 | 최대 높이 |

**SheetColumn 타입:**

| Field | Type | Description |
|-------|------|-------------|
| key | string | 데이터 키 (필수) |
| label | string | 헤더 레이블 (필수) |
| width | number | 컬럼 너비(px) |
| readOnly | boolean | 컬럼 읽기 전용 |
| sortable | boolean | 정렬 가능 |
| render | (value, row, rowIndex) => ReactNode | 커스텀 셀 렌더러 |
| type | "text" \| "number" | 입력 타입 |

> 더블클릭으로 편집, Enter로 확정, Escape로 취소. `onChange`가 없으면 자동 읽기 전용.

---

### Calendar

월간/주간 캘린더 뷰. 이벤트 표시 지원.

```tsx
import { Calendar } from "@sunghoon_lee/akron-ui";

// 기본 (월간 보기)
<Calendar style={{ height: 480 }} />

// 이벤트 표시
<Calendar
  events={[
    { id: "1", title: "팀 미팅", date: "2026-05-13", color: "var(--ark-color-primary-500)" },
    { id: "2", title: "점심 약속", date: "2026-05-13", color: "var(--ark-color-success-500)" },
  ]}
  onDateClick={(date) => console.log(date)}
  style={{ height: 480 }}
/>

// 주간 보기
<Calendar view="week" style={{ height: 300 }} />
```

**Calendar Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| events | CalendarEvent[] | [] | 이벤트 목록 |
| value | Date | - | 현재 날짜 (제어) |
| defaultValue | Date | - | 기본 날짜 |
| onChange | (date: Date) => void | - | 날짜 변경 핸들러 |
| onDateClick | (date: Date) => void | - | 날짜 클릭 핸들러 |
| view | "month" \| "week" | "month" | 뷰 모드 |
| onViewChange | (view: CalendarView) => void | - | 뷰 변경 핸들러 |

**CalendarEvent 타입:**

| Field | Type | Description |
|-------|------|-------------|
| id | string | 이벤트 ID (필수) |
| title | string | 제목 (필수) |
| date | string | 날짜 YYYY-MM-DD (필수) |
| color | string | 배경 색상 (CSS 색상값) |
| onClick | () => void | 이벤트 클릭 핸들러 |

> 월간 보기: 하루 최대 3개 표시, 초과 시 "+N 더" 표시. 날짜 string은 반드시 `YYYY-MM-DD` 형식.

---

### ListView

리스트/그리드 뷰 토글. 범용 아이템 렌더링.

```tsx
import { ListView } from "@sunghoon_lee/akron-ui";

<ListView
  items={products}
  renderCard={(item) => <ProductCard {...item} />}
  renderRow={(item) => <ProductRow {...item} />}
  gridCols={3}
  mode="grid"
  onModeChange={setMode}
  empty={<div>데이터가 없습니다</div>}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | T[] | **필수** | 데이터 목록 |
| renderCard | (item: T, index: number) => ReactNode | **필수** | 그리드 카드 렌더러 |
| renderRow | (item: T, index: number) => ReactNode | **필수** | 리스트 행 렌더러 |
| mode | "list" \| "grid" | "list" | 초기 뷰 모드 |
| onModeChange | (mode: ListViewMode) => void | - | 모드 변경 핸들러 |
| gridCols | 2 \| 3 \| 4 | 3 | 그리드 컬럼 수 |
| toolbar | ReactNode | - | 툴바 우측 추가 요소 |
| empty | ReactNode | - | 빈 상태 표시 |

---

## 오버레이 컴포넌트

### Modal

Radix Dialog 기반. 접근성(키보드, 포커스 트랩) 자동 지원.

```tsx
import { Modal } from "@sunghoon_lee/akron-ui";

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
import { ToastProvider } from "@sunghoon_lee/akron-ui";

<ToastProvider>
  <App />
</ToastProvider>

// 하위 컴포넌트
import { useToast } from "@sunghoon_lee/akron-ui";

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

### Popover

클릭 트리거 팝오버. Radix Popover 기반.

```tsx
import { Popover } from "@sunghoon_lee/akron-ui";

<Popover
  trigger={<button>열기</button>}
  side="bottom"
  align="start"
  showClose
>
  <p>팝오버 내용</p>
</Popover>

// 제어 모드
<Popover
  trigger={<button>설정</button>}
  open={open}
  onOpenChange={setOpen}
  width={320}
>
  <form>...</form>
</Popover>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactElement | **필수** | 트리거 요소 |
| children | ReactNode | **필수** | 팝오버 내용 |
| side | "top" \| "right" \| "bottom" \| "left" | "bottom" | 표시 방향 |
| align | "start" \| "center" \| "end" | "center" | 정렬 |
| sideOffset | number | 8 | 트리거와의 간격(px) |
| showClose | boolean | false | 닫기 버튼 표시 |
| open | boolean | - | 열림 상태 (제어) |
| defaultOpen | boolean | false | 기본 열림 여부 |
| onOpenChange | (open: boolean) => void | - | 열림 상태 변경 핸들러 |
| width | string \| number | - | 팝오버 너비 |

> Radix Portal 사용으로 z-index 문제 없음. ESC 키 및 외부 클릭으로 닫힘.

---

### FloatingAction

화면 고정 플로팅 버튼 (FAB). 서브 액션 메뉴 지원.

```tsx
import { FloatingAction } from "@sunghoon_lee/akron-ui";
import { Plus, Edit, Trash, Share } from "lucide-react";

// 단순 버튼
<FloatingAction
  icon={<Plus size={24} />}
  label="추가"
  onClick={() => openModal()}
  position="bottom-right"
  size="md"
/>

// 서브 액션 메뉴
<FloatingAction
  position="bottom-right"
  actions={[
    { label: "수정", icon: <Edit size={16} />, onClick: () => {} },
    { label: "삭제", icon: <Trash size={16} />, onClick: () => {} },
    { label: "공유", icon: <Share size={16} />, onClick: () => {} },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| icon | ReactNode | Plus 아이콘 | 메인 버튼 아이콘 |
| actions | FabAction[] | - | 서브 액션 목록 (있으면 열고/닫기) |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| position | "bottom-right" \| "bottom-left" \| "top-right" \| "top-left" | "bottom-right" | 화면 고정 위치 |
| label | string | - | 단순 버튼 툴팁 (actions 없을 때) |

**FabAction 타입:** `{ label: string; icon: ReactNode; onClick: () => void; disabled?: boolean }`

> `position: fixed`로 화면에 고정. actions 있을 때 클릭하면 서브 메뉴 슬라이드업, 다시 클릭하면 닫힘.

---

## 네비게이션 컴포넌트

### Tabs

탭 네비게이션. line/solid/pill 스타일 지원.

```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@sunghoon_lee/akron-ui";

<Tabs defaultValue="overview" variant="line" size="md">
  <TabsList>
    <TabsTrigger value="overview">개요</TabsTrigger>
    <TabsTrigger value="details">상세</TabsTrigger>
    <TabsTrigger value="history" disabled>기록</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">개요 내용</TabsContent>
  <TabsContent value="details">상세 내용</TabsContent>
</Tabs>
```

**Tabs Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| value | string | - | 선택된 탭 (제어) |
| defaultValue | string | - | 기본 탭 (비제어) |
| onValueChange | (value: string) => void | - | 탭 변경 핸들러 |
| variant | "line" \| "solid" \| "pill" | "line" | 시각적 스타일 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |

**TabsTrigger Props:** `value` (필수), `disabled`  
**TabsContent Props:** `value` (필수)

---

### Pagination

페이지 네비게이션.

```tsx
import { Pagination } from "@sunghoon_lee/akron-ui";

<Pagination
  page={currentPage}
  totalPages={20}
  onPageChange={setCurrentPage}
  siblingCount={1}
  variant="outline"
  size="md"
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| page | number | **필수** | 현재 페이지 (1-based) |
| totalPages | number | **필수** | 전체 페이지 수 |
| onPageChange | (page: number) => void | **필수** | 페이지 변경 핸들러 |
| siblingCount | number | 1 | 현재 페이지 주변 표시 개수 |
| variant | "outline" \| "ghost" \| "solid" | "outline" | 스타일 |
| size | "sm" \| "md" \| "lg" | "md" | 크기 |
| hideArrows | boolean | false | 이전/다음 버튼 숨김 |

---

### Breadcrumb

경로 표시. 링크/버튼 혼용, 경로 축약 지원.

```tsx
import { Breadcrumb } from "@sunghoon_lee/akron-ui";

<Breadcrumb
  items={[
    { label: "홈", href: "/" },
    { label: "제품", href: "/products" },
    { label: "노트북" },  // href 없으면 현재 페이지 (비클릭)
  ]}
  maxItems={3}             // 초과 시 중간 경로 "..." 처리
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| items | BreadcrumbItem[] | **필수** | 경로 아이템 목록 |
| separator | ReactNode | ChevronRight | 구분자 |
| maxItems | number | - | 최대 표시 개수 (초과 시 중간 "..." 처리) |

**BreadcrumbItem 타입:** `{ label: string; href?: string; onClick?: (e) => void }`

---

### Stepper

단계 진행 표시기.

```tsx
import { Stepper } from "@sunghoon_lee/akron-ui";

<Stepper
  activeStep={1}
  orientation="horizontal"
  steps={[
    { title: "정보 입력", description: "기본 정보" },
    { title: "확인", description: "내용 검토" },
    { title: "완료" },
  ]}
/>

// 상태 직접 제어
<Stepper
  steps={[
    { title: "완료됨", status: "completed" },
    { title: "진행 중", status: "active" },
    { title: "오류", status: "error" },
    { title: "대기", status: "pending" },
  ]}
/>
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| steps | StepItem[] | **필수** | 단계 목록 |
| activeStep | number | 0 | 현재 활성 단계 (0-based, status 미지정 시 자동 계산) |
| orientation | "horizontal" \| "vertical" | "horizontal" | 방향 |

**StepItem 타입:** `{ title: string; description?: string; status?: "completed" | "active" | "error" | "pending" }`

> `status` 미지정 시 `activeStep` 기준으로 자동 계산: activeStep 이전 = completed, 현재 = active, 이후 = pending.

---

### Accordion

접기/펼치기 패널.

```tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@sunghoon_lee/akron-ui";

// 단일 열기
<Accordion type="single" defaultValue="item-1" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger>항목 1</AccordionTrigger>
    <AccordionContent>내용 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>항목 2</AccordionTrigger>
    <AccordionContent>내용 2</AccordionContent>
  </AccordionItem>
</Accordion>

// 다중 열기
<Accordion type="multiple" defaultValues={["item-1"]}>
  ...
</Accordion>
```

**Accordion Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| type | "single" \| "multiple" | "single" | 단일/다중 열기 |
| value | string | - | 선택 값 (단일, 제어) |
| defaultValue | string | - | 기본 선택 (단일, 비제어) |
| values | string[] | - | 선택 값들 (다중, 제어) |
| defaultValues | string[] | - | 기본 선택들 (다중, 비제어) |
| onValueChange | (value: string) => void | - | 단일 변경 핸들러 |
| onValuesChange | (values: string[]) => void | - | 다중 변경 핸들러 |
| collapsible | boolean | false | 열린 항목 다시 클릭 시 닫기 (single 전용) |

**AccordionItem Props:** `value` (필수), `disabled`

---

### Menu / MenuList

드롭다운 컨텍스트 메뉴.

```tsx
import { Menu, MenuList } from "@sunghoon_lee/akron-ui";
import { Edit, Trash, Share, Copy } from "lucide-react";

// trigger 있는 Menu
<Menu
  trigger={<button>더보기</button>}
  placement="bottom-end"
  items={[
    { label: "수정", icon: <Edit size={14} />, onClick: () => {} },
    { label: "복사", icon: <Copy size={14} />, shortcut: "Ctrl+C", onClick: () => {} },
    { type: "separator" },
    { label: "삭제", icon: <Trash size={14} />, danger: true, onClick: () => {} },
  ]}
/>

// 서브메뉴
const items = [
  {
    label: "내보내기",
    children: [
      { label: "PDF", onClick: () => {} },
      { label: "Excel", onClick: () => {} },
    ],
  },
];
```

**Menu Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| trigger | ReactElement | **필수** | 트리거 요소 |
| items | MenuEntry[] | **필수** | 메뉴 아이템 목록 |
| placement | "bottom-start" \| "bottom-end" \| "top-start" \| "top-end" | "bottom-start" | 위치 |
| open | boolean | - | 열림 상태 (제어) |
| onOpenChange | (open: boolean) => void | - | 열림 상태 변경 핸들러 |

**MenuItem 타입:**

| Field | Type | Description |
|-------|------|-------------|
| label | string | 레이블 (필수) |
| icon | ReactNode | 아이콘 |
| onClick | () => void | 클릭 핸들러 |
| disabled | boolean | 비활성화 |
| selected | boolean | 선택 상태 (체크 마크) |
| danger | boolean | 위험 액션 (빨간 텍스트) |
| shortcut | string | 오른쪽 단축키 표시 |
| children | MenuItem[] | 서브메뉴 (호버 시 표시) |

**MenuSeparator 타입:** `{ type: "separator" }`  
**MenuList** — trigger 없이 아이템 목록만 렌더링: `<MenuList items={items} />`

---

## 폼 유틸리티

### Form (FormField / FormLabel / FormDescription / FormMessage / FormGroup)

폼 필드 래퍼. Context로 id, required, error, disabled 상태 자식 컴포넌트에 전파.

```tsx
import { FormField, FormLabel, FormDescription, FormMessage, FormGroup } from "@sunghoon_lee/akron-ui";

// 기본 사용
<FormField required error={!!errors.email} disabled={isLoading}>
  <FormLabel>이메일</FormLabel>
  <Input placeholder="user@example.com" />
  <FormDescription>업무용 이메일을 입력하세요</FormDescription>
  <FormMessage error={errors.email?.message} />
</FormField>

// 폼 그룹 (여러 필드 묶기)
<FormGroup legend="개인 정보" horizontal>
  <FormField><FormLabel>이름</FormLabel><Input /></FormField>
  <FormField><FormLabel>생년월일</FormLabel><DatePicker /></FormField>
</FormGroup>
```

**FormField Props:**

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| id | string | 자동 생성 | 필드 id (FormLabel의 htmlFor와 자동 연결) |
| required | boolean | false | 필수 여부 (FormLabel에 * 표시) |
| error | boolean | false | 에러 상태 |
| disabled | boolean | false | 비활성화 상태 |

**FormMessage Props:** `error` prop으로 에러 메시지 표시, `children`으로 힌트 표시  
**FormGroup Props:** `legend` (그룹 레이블), `horizontal` (가로 배치)

> `useFormField()` 훅으로 자식에서 FormField context 접근 가능: `const { id, required, error, disabled } = useFormField()`

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
} from "@sunghoon_lee/akron-ui";
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

---

## Drawer

화면 가장자리에서 슬라이드로 열리는 사이드 패널. 상/하/좌/우 4방향과 4가지 크기를 지원합니다.

### Import

```tsx
import { Drawer } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| open | boolean | 필수 | 열림 상태 |
| onOpenChange | (open: boolean) => void | 필수 | 열림 상태 변경 핸들러 |
| placement | 'right' \| 'left' \| 'top' \| 'bottom' | 'right' | 열리는 방향 |
| size | 'sm' \| 'md' \| 'lg' \| 'full' | 'md' | 크기 (horizontal: width, vertical: height) |
| title | string | - | 헤더 제목 |
| description | string | - | 헤더 설명 |
| showClose | boolean | true | 닫기 버튼 표시 |
| closeOnOverlay | boolean | true | 오버레이 클릭으로 닫기 |
| footer | ReactNode | - | 하단 고정 영역 |
| children | ReactNode | - | 본문 콘텐츠 |

### 기본 사용

```tsx
import { useState } from "react";
import { Drawer, Button, Stack } from "@sunghoon_lee/akron-ui";

function App() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>드로어 열기</Button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="드로어 제목"
        description="드로어 설명입니다."
        footer={
          <Stack direction="horizontal" gap={8}>
            <Button variant="outline" onClick={() => setOpen(false)}>취소</Button>
            <Button onClick={() => setOpen(false)}>확인</Button>
          </Stack>
        }
      >
        <p>드로어 본문 콘텐츠입니다.</p>
      </Drawer>
    </>
  );
}
```

### 방향 및 크기

```tsx
// 방향: right (기본), left, top, bottom
<Drawer open={open} onOpenChange={setOpen} placement="left" title="왼쪽 드로어">
  ...
</Drawer>

// 크기: sm, md (기본), lg, full
<Drawer open={open} onOpenChange={setOpen} size="lg" title="큰 드로어">
  ...
</Drawer>
```

---

## ContextMenu

우클릭 컨텍스트 메뉴. 서브메뉴, 체크 항목, 구분선, 레이블 그룹을 지원합니다.

### Import

```tsx
import { ContextMenu } from "@sunghoon_lee/akron-ui";
import type { ContextMenuEntry } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 설명 |
|---|---|---|
| children | ReactNode | 우클릭 트리거 영역 (필수) |
| items | ContextMenuEntry[] | 메뉴 항목 목록 (필수) |
| onOpenChange | (open: boolean) => void | 열림 상태 변경 핸들러 |

### ContextMenuEntry 타입

```ts
// 일반 메뉴 항목
type ContextMenuItem = {
  label: string;
  icon?: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;       // 빨간 텍스트로 표시
  shortcut?: string;      // 단축키 표시 (e.g. "⌘C")
  checked?: boolean;      // 체크 마크 표시
  children?: ContextMenuItem[]; // 서브메뉴
};

// 구분선
type ContextMenuSeparator = { type: "separator" };

// 레이블 그룹
type ContextMenuLabel = { type: "label"; label: string };

type ContextMenuEntry = ContextMenuItem | ContextMenuSeparator | ContextMenuLabel;
```

### 기본 사용

```tsx
import { ContextMenu } from "@sunghoon_lee/akron-ui";
import { Copy, Edit, Trash } from "lucide-react";

function App() {
  return (
    <ContextMenu
      items={[
        { label: "복사", icon: <Copy size={14} />, shortcut: "⌘C", onClick: () => {} },
        { label: "편집", icon: <Edit size={14} />, onClick: () => {} },
        { type: "separator" },
        { label: "삭제", icon: <Trash size={14} />, danger: true, onClick: () => {} },
      ]}
    >
      <div style={{ padding: 48, border: "2px dashed #ccc", textAlign: "center" }}>
        우클릭하세요
      </div>
    </ContextMenu>
  );
}
```

### 서브메뉴

```tsx
<ContextMenu
  items={[
    { label: "열기", onClick: () => {} },
    {
      label: "내보내기",
      children: [
        { label: "PDF로 저장", onClick: () => {} },
        { label: "Excel로 저장", onClick: () => {} },
      ],
    },
  ]}
>
  <div>우클릭</div>
</ContextMenu>
```

### 체크 항목

```tsx
const [bold, setBold] = useState(false);

<ContextMenu
  items={[
    { type: "label", label: "텍스트 서식" },
    { label: "굵게", checked: bold, onClick: () => setBold(!bold) },
    { label: "기울임", checked: false, disabled: true, onClick: () => {} },
  ]}
>
  <div>우클릭</div>
</ContextMenu>
```

---

## DataTable

고급 데이터 테이블. 전체 검색, 컬럼별 정렬, 페이지네이션, 체크박스 선택을 내장합니다.

### Import

```tsx
import { DataTable } from "@sunghoon_lee/akron-ui";
import type { DataTableColumn } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| data | T[] | 필수 | 데이터 목록 (T extends Record<string, unknown>) |
| columns | DataTableColumn<T>[] | 필수 | 컬럼 정의 |
| searchable | boolean | true | 전체 검색 활성화 |
| pageSize | number | 10 | 초기 페이지 크기 |
| pageSizeOptions | number[] | [10,20,50,100] | 페이지 크기 선택 옵션 |
| selectable | boolean | false | 체크박스 선택 활성화 |
| selectedRows | number[] | - | 선택된 행 인덱스 (제어) |
| onSelectionChange | (indices: number[]) => void | - | 선택 변경 핸들러 |
| onRowClick | (row: T, index: number) => void | - | 행 클릭 핸들러 |
| striped | boolean | false | 줄무늬 행 |
| hoverable | boolean | true | 호버 하이라이트 |
| dense | boolean | false | 조밀한 행 높이 |
| loading | boolean | false | 로딩 상태 |
| maxHeight | string \| number | - | 최대 높이 (스크롤) |

### DataTableColumn<T>

| Field | 타입 | 설명 |
|---|---|---|
| key | keyof T | 데이터 키 (필수) |
| header | string | 헤더 레이블 (필수) |
| cell | (value, row, idx) => ReactNode | 커스텀 셀 렌더러 |
| sortable | boolean | 정렬 가능 |
| filterable | boolean | 검색 포함 여부 (기본 true) |
| width | string \| number | 컬럼 너비 |
| align | 'left' \| 'center' \| 'right' | 텍스트 정렬 |
| sortFn | (a, b, dir) => number | 커스텀 정렬 함수 |
| filterFn | (value, text) => boolean | 커스텀 필터 함수 |

### 기본 사용

```tsx
import { DataTable } from "@sunghoon_lee/akron-ui";

const data = [
  { id: "1", name: "홍길동", email: "hong@example.com", score: 95 },
  { id: "2", name: "김철수", email: "kim@example.com", score: 88 },
];

const columns = [
  { key: "id", header: "ID", width: 60, sortable: true },
  { key: "name", header: "이름", sortable: true },
  { key: "email", header: "이메일" },
  { key: "score", header: "점수", sortable: true, align: "right" },
];

<DataTable data={data} columns={columns} pageSize={10} />
```

### 커스텀 셀 렌더러

```tsx
import { DataTable, Badge } from "@sunghoon_lee/akron-ui";

const columns = [
  { key: "name", header: "이름" },
  {
    key: "status",
    header: "상태",
    cell: (val) => (
      <Badge color={val === "활성" ? "success" : "neutral"} size="sm">{val}</Badge>
    ),
  },
  {
    key: "progress",
    header: "진행률",
    cell: (val) => (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, height: 6, background: "var(--ark-color-bg-muted)", borderRadius: 3 }}>
          <div style={{ width: `${val}%`, height: "100%", background: "var(--ark-color-primary-500)", borderRadius: 3 }} />
        </div>
        <span style={{ fontSize: 12 }}>{val}%</span>
      </div>
    ),
  },
];
```

### 체크박스 선택

```tsx
const [selected, setSelected] = useState<number[]>([]);

<DataTable
  data={data}
  columns={columns}
  selectable
  selectedRows={selected}
  onSelectionChange={setSelected}
/>
```

---

## Combobox

검색 가능한 자동완성 셀렉트. 텍스트 검색으로 옵션을 필터링하고 키보드 네비게이션, 그룹, 초기화 버튼을 지원합니다.

### Import

```tsx
import { Combobox } from "@sunghoon_lee/akron-ui";
import type { ComboboxOption } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| options | ComboboxOption[] | 필수 | 옵션 목록 |
| value | string \| null | - | 선택된 값 (제어) |
| defaultValue | string | - | 초기 값 (비제어) |
| onChange | (value: string \| null) => void | - | 선택 변경 핸들러 |
| onInputChange | (text: string) => void | - | 검색 텍스트 변경 핸들러 |
| placeholder | string | '선택하세요' | 선택 전 플레이스홀더 |
| searchPlaceholder | string | '검색...' | 검색 입력 플레이스홀더 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| disabled | boolean | false | 비활성화 |
| error | boolean | false | 에러 상태 |
| errorMessage | string | - | 에러 메시지 |
| label | string | - | 라벨 |
| required | boolean | - | 필수 표시 (*) |
| helperText | string | - | 도움말 텍스트 |
| clearable | boolean | false | 초기화(X) 버튼 표시 |
| loading | boolean | false | 로딩 상태 |
| emptyMessage | string | '결과 없음' | 검색 결과 없을 때 |
| externalFilter | boolean | false | 서버사이드 필터링 (내부 필터링 비활성) |
| renderOption | (opt: ComboboxOption) => ReactNode | - | 커스텀 옵션 렌더러 |

### ComboboxOption

```ts
interface ComboboxOption {
  value: string;
  label: string;
  description?: string; // 부가 설명 (작은 글씨로 표시)
  disabled?: boolean;
  group?: string;       // 그룹명 (같은 값끼리 묶임)
}
```

### 기본 사용

```tsx
import { useState } from "react";
import { Combobox } from "@sunghoon_lee/akron-ui";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

function App() {
  const [value, setValue] = useState<string | null>(null);
  return (
    <Combobox
      label="프레임워크"
      options={options}
      value={value}
      onChange={setValue}
      placeholder="프레임워크 선택"
      clearable
    />
  );
}
```

### 그룹 옵션

```tsx
const options = [
  { value: "js", label: "JavaScript", group: "웹" },
  { value: "ts", label: "TypeScript", group: "웹" },
  { value: "py", label: "Python", group: "백엔드" },
  { value: "go", label: "Go", group: "백엔드" },
];

<Combobox options={options} placeholder="언어 선택" />
```

### 설명 포함 옵션

```tsx
const options = [
  { value: "basic", label: "기본 플랜", description: "월 9,900원 · 5GB" },
  { value: "pro", label: "프로 플랜", description: "월 29,900원 · 50GB" },
];
```

### 서버사이드 검색

```tsx
const [query, setQuery] = useState("");
const [results, setResults] = useState<ComboboxOption[]>([]);

async function handleSearch(text: string) {
  setQuery(text);
  const data = await fetchUsers(text);
  setResults(data.map(u => ({ value: u.id, label: u.name })));
}

<Combobox
  options={results}
  onInputChange={handleSearch}
  externalFilter  // 내부 필터링 비활성화
  placeholder="사용자 검색"
/>
```

---

## MultiSelect

다중 선택 드롭다운. 체크박스로 여러 옵션을 선택하고 태그로 표시합니다.

### Import

```tsx
import { MultiSelect } from "@sunghoon_lee/akron-ui";
import type { MultiSelectOption } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| options | MultiSelectOption[] | 필수 | 옵션 목록 |
| value | string[] | - | 선택된 값 배열 (제어) |
| defaultValue | string[] | [] | 초기 선택 값 (비제어) |
| onChange | (values: string[]) => void | - | 선택 변경 핸들러 |
| placeholder | string | '선택하세요' | 플레이스홀더 |
| searchPlaceholder | string | '검색...' | 검색 입력 플레이스홀더 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| disabled | boolean | false | 비활성화 |
| error | boolean | false | 에러 상태 |
| errorMessage | string | - | 에러 메시지 |
| label | string | - | 라벨 |
| required | boolean | - | 필수 표시 |
| helperText | string | - | 도움말 텍스트 |
| maxTagsShown | number | 3 | 태그 최대 표시 수 (초과 시 +N) |
| showSelectAll | boolean | false | 전체 선택/해제 버튼 표시 |
| maxSelect | number | - | 최대 선택 수 제한 |
| emptyMessage | string | '결과 없음' | 검색 결과 없을 때 메시지 |

### MultiSelectOption

```ts
interface MultiSelectOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
  group?: string;
}
```

### 기본 사용

```tsx
import { useState } from "react";
import { MultiSelect } from "@sunghoon_lee/akron-ui";

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
];

function App() {
  const [values, setValues] = useState<string[]>([]);
  return (
    <MultiSelect
      label="기술 스택"
      options={options}
      value={values}
      onChange={setValues}
      placeholder="선택하세요"
      showSelectAll
    />
  );
}
```

### 그룹 + 최대 선택

```tsx
const options = [
  { value: "js", label: "JavaScript", group: "웹" },
  { value: "ts", label: "TypeScript", group: "웹" },
  { value: "py", label: "Python", group: "백엔드" },
];

<MultiSelect options={options} maxSelect={2} placeholder="최대 2개 선택" />
```

---

## TreeView

계층적 트리 구조. 확장/축소, 선택, 키보드 네비게이션, 커스텀 아이콘을 지원합니다.

### Import

```tsx
import { TreeView } from "@sunghoon_lee/akron-ui";
import type { TreeNode } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| nodes | TreeNode[] | 필수 | 루트 노드 목록 |
| selectedId | string \| null | - | 선택된 노드 ID |
| onSelect | (node: TreeNode) => void | - | 선택 핸들러 |
| expandedIds | string[] | - | 확장된 노드 ID 목록 (제어) |
| onExpandChange | (ids: string[]) => void | - | 확장/축소 변경 핸들러 |
| defaultExpandedIds | string[] | - | 초기 확장 노드 ID (비제어) |
| defaultExpanded | boolean | false | 모든 노드 기본 확장 |
| showIcons | boolean | true | 아이콘 표시 |
| showLines | boolean | false | 들여쓰기 연결선 표시 |
| size | 'sm' \| 'md' | 'md' | 크기 |

### TreeNode

```ts
interface TreeNode {
  id: string;
  label: string;
  icon?: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
  data?: unknown;
}
```

### 기본 사용

```tsx
import { useState } from "react";
import { TreeView, TreeNode } from "@sunghoon_lee/akron-ui";
import { Folder, File } from "lucide-react";

const nodes: TreeNode[] = [
  {
    id: "src", label: "src", icon: <Folder size={14} />,
    children: [
      { id: "app.tsx", label: "App.tsx", icon: <File size={14} /> },
      { id: "index.ts", label: "index.ts", icon: <File size={14} /> },
    ],
  },
];

function App() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  return (
    <TreeView
      nodes={nodes}
      selectedId={selectedId}
      onSelect={(node) => setSelectedId(node.id)}
      defaultExpandedIds={["src"]}
    />
  );
}
```

---

## CommandPalette

⌘K 커맨드 팔레트. 검색으로 명령을 빠르게 실행하는 모달. 그룹, 단축키 힌트, 최근 사용 항목을 지원합니다.

### Import

```tsx
import { CommandPalette } from "@sunghoon_lee/akron-ui";
import type { CommandItem } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 설명 |
|---|---|---|
| open | boolean | 열림 상태 (필수) |
| onOpenChange | (open: boolean) => void | 열림 상태 변경 핸들러 (필수) |
| items | CommandItem[] | 커맨드 항목 목록 (필수) |
| placeholder | string | 검색 입력 placeholder |
| emptyMessage | string | 검색 결과 없을 때 메시지 |
| onSearch | (query: string) => void | 검색어 변경 핸들러 (서버사이드) |
| loading | boolean | 로딩 상태 |
| recentIds | string[] | 최근 사용 항목 ID 목록 (별도 그룹으로 표시) |

### CommandItem

```ts
interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: ReactNode;
  shortcut?: string[];   // e.g. ["⌘", "K"]
  group?: string;
  onSelect?: () => void;
  disabled?: boolean;
  keywords?: string[];   // 검색에만 사용 (표시 안 됨)
}
```

### 기본 사용 + ⌘K 단축키

```tsx
import { useState, useEffect } from "react";
import { CommandPalette } from "@sunghoon_lee/akron-ui";
import { Home, Settings, User } from "lucide-react";

const items: CommandItem[] = [
  { id: "home", label: "홈", icon: <Home size={16} />, group: "페이지", onSelect: () => router.push("/") },
  { id: "settings", label: "설정", icon: <Settings size={16} />, group: "페이지", shortcut: ["⌘", ","], onSelect: () => router.push("/settings") },
  { id: "profile", label: "프로필", icon: <User size={16} />, group: "계정", onSelect: () => router.push("/profile") },
];

function App() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <CommandPalette
      open={open}
      onOpenChange={setOpen}
      items={items}
      recentIds={["home", "settings"]}
    />
  );
}
```

---

## ColorPicker

색상 선택기. 색상 그라디언트 캔버스, 색조 슬라이더, HEX 입력, 스와치 팔레트를 제공합니다.

### Import

```tsx
import { ColorPicker } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| value | string | - | 현재 색상 hex 값 (제어, e.g. "#3b82f6") |
| defaultValue | string | '#3b82f6' | 초기 색상 (비제어) |
| onChange | (value: string) => void | - | 색상 변경 핸들러 |
| swatches | string[] | 12색 기본 팔레트 | 사전 정의 스와치 색상 배열 |
| swatchesOnly | boolean | false | 스와치만 표시 (그라디언트 편집기 숨김) |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 트리거 버튼 크기 |
| disabled | boolean | false | 비활성화 |
| label | string | - | 라벨 |
| error | boolean | false | 에러 상태 |
| errorMessage | string | - | 에러 메시지 |
| helperText | string | - | 도움말 텍스트 |

### 기본 사용

```tsx
import { useState } from "react";
import { ColorPicker } from "@sunghoon_lee/akron-ui";

function App() {
  const [color, setColor] = useState("#3b82f6");
  return (
    <ColorPicker
      label="테마 색상"
      value={color}
      onChange={setColor}
    />
  );
}
```

### 스와치 전용 (간단한 팔레트)

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  swatchesOnly
  swatches={["#ef4444", "#f97316", "#22c55e", "#3b82f6", "#8b5cf6"]}
/>
```

---

## SegmentedControl

버튼 그룹 토글. 여러 옵션 중 하나를 선택하는 라디오 그룹의 시각적 대안. 슬라이딩 인디케이터 애니메이션을 제공합니다.

### Import

```tsx
import { SegmentedControl } from "@sunghoon_lee/akron-ui";
import type { SegmentedControlOption } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| options | SegmentedControlOption[] | 필수 | 옵션 목록 |
| value | string | - | 선택된 값 (제어) |
| defaultValue | string | 첫 번째 옵션 | 초기 값 (비제어) |
| onChange | (value: string) => void | - | 선택 변경 핸들러 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| disabled | boolean | false | 전체 비활성화 |
| fullWidth | boolean | false | 컨테이너 전체 너비 |

### SegmentedControlOption

```ts
interface SegmentedControlOption {
  value: string;
  label: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}
```

### 기본 사용

```tsx
import { useState } from "react";
import { SegmentedControl } from "@sunghoon_lee/akron-ui";
import { List, Grid } from "lucide-react";

function App() {
  const [view, setView] = useState("list");
  return (
    <SegmentedControl
      value={view}
      onChange={setView}
      options={[
        { value: "list", label: "목록", icon: <List size={14} /> },
        { value: "grid", label: "그리드", icon: <Grid size={14} /> },
      ]}
    />
  );
}
```

---

## EmptyState

빈 상태 표시 컴포넌트. 데이터 없음, 검색 결과 없음, 오류 등의 상태를 일관된 UI로 표시합니다.

### Import

```tsx
import { EmptyState } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| icon | ReactNode | Inbox 아이콘 | 아이콘 요소 |
| title | string | '데이터 없음' | 제목 |
| description | string | - | 설명 텍스트 |
| action | ReactNode | - | 액션 버튼/요소 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| bordered | boolean | false | 점선 테두리 표시 |

### 기본 사용

```tsx
import { EmptyState, Button } from "@sunghoon_lee/akron-ui";
import { Search } from "lucide-react";

<EmptyState
  icon={<Search size={40} strokeWidth={1.5} />}
  title="검색 결과 없음"
  description="다른 검색어로 다시 시도해 보세요."
  action={<Button size="sm">필터 초기화</Button>}
  bordered
/>
```

---

## NotificationCenter

알림 센터 드롭다운. 벨 아이콘 버튼을 클릭하면 알림 목록이 표시됩니다. 읽음/삭제 처리, 타입별 스타일을 지원합니다.

### Import

```tsx
import { NotificationCenter } from "@sunghoon_lee/akron-ui";
import type { NotificationItem } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 설명 |
|---|---|---|
| notifications | NotificationItem[] | 알림 목록 (필수) |
| onMarkAsRead | (id: string) => void | 읽음 처리 핸들러 |
| onMarkAllAsRead | () => void | 전체 읽음 처리 |
| onDelete | (id: string) => void | 삭제 핸들러 |
| onClearAll | () => void | 전체 삭제 핸들러 |
| title | string | 패널 제목 (기본: '알림') |
| trigger | ReactNode | 커스텀 트리거 (기본: 벨 아이콘 버튼) |
| emptyMessage | string | 빈 상태 메시지 |
| maxHeight | number \| string | 목록 최대 높이 (기본: 400) |

### NotificationItem

```ts
interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  time?: string;               // e.g. "5분 전"
  type?: 'info' | 'success' | 'warning' | 'error';
  read?: boolean;
  icon?: ReactNode;            // 커스텀 아이콘 (36x36 박스)
  avatar?: string;             // 아바타 이미지 URL
  onClick?: () => void;
}
```

### 기본 사용

```tsx
import { useState } from "react";
import { NotificationCenter } from "@sunghoon_lee/akron-ui";

function App() {
  const [notifications, setNotifications] = useState([
    { id: "1", title: "새 댓글", description: "홍길동님이 댓글을 달았습니다.", time: "방금", type: "info", read: false },
    { id: "2", title: "빌드 완료", time: "5분 전", type: "success", read: true },
  ]);

  return (
    <NotificationCenter
      notifications={notifications}
      onMarkAsRead={(id) => setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))}
      onDelete={(id) => setNotifications(prev => prev.filter(n => n.id !== id))}
      onMarkAllAsRead={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
    />
  );
}
```

---

## InputGroup

입력 그룹. Input 앞뒤에 텍스트, 아이콘, 버튼 등의 어돈을 붙여 복합 입력 필드를 구성합니다.

### Import

```tsx
import { InputGroup, InputGroupAddon } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| prepend | ReactNode | - | 좌측 어돈 |
| append | ReactNode | - | 우측 어돈 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| error | boolean | false | 에러 상태 |
| disabled | boolean | false | 비활성화 |
| fullWidth | boolean | false | 전체 너비 |

`InputGroupAddon` — 텍스트/아이콘 어돈 래퍼 (패딩, 배경, 구분선 자동 적용)

### 기본 사용

```tsx
import { InputGroup, InputGroupAddon, Input, Button } from "@sunghoon_lee/akron-ui";
import { Search } from "lucide-react";

// 텍스트 어돈
<InputGroup prepend={<InputGroupAddon>https://</InputGroupAddon>}>
  <Input placeholder="example.com" />
</InputGroup>

// 아이콘 + 버튼
<InputGroup
  prepend={<InputGroupAddon><Search size={14} /></InputGroupAddon>}
  append={<Button size="sm">검색</Button>}
>
  <Input placeholder="검색어" />
</InputGroup>
```

---

## StatCard

대시보드 지표(KPI) 카드. 제목, 값, 트렌드, 아이콘을 조합하여 메트릭을 표시합니다.

### Import

```tsx
import { StatCard } from "@sunghoon_lee/akron-ui";
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|---|---|---|---|
| title | string | 필수 | 카드 제목 |
| value | string \| number | 필수 | 지표 값 |
| unit | string | - | 단위 (e.g. "%", "원") |
| trend | 'up' \| 'down' \| 'neutral' | - | 트렌드 방향 |
| trendLabel | string | - | 트렌드 값 텍스트 (e.g. "+12.5%") |
| trendDesc | string | - | 트렌드 설명 (e.g. "지난달 대비") |
| icon | ReactNode | - | 아이콘 |
| iconColor | 'primary' \| 'success' \| 'warning' \| 'error' \| string | 'primary' | 아이콘 배경 색상 |
| description | string | - | 부가 설명 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'filled' \| 'outline' | 'default' | 변형 |
| loading | boolean | false | 로딩 상태 (스켈레톤) |
| clickable | boolean | false | 클릭 가능 (hover 효과 + cursor pointer) |

### 기본 사용

```tsx
import { StatCard } from "@sunghoon_lee/akron-ui";
import { Users } from "lucide-react";

<StatCard
  title="총 사용자"
  value="12,847"
  trend="up"
  trendLabel="+8.2%"
  trendDesc="지난달 대비"
  icon={<Users size={18} />}
  iconColor="primary"
/>
```

---

## Tour

온보딩 가이드 투어 컴포넌트. 스포트라이트로 특정 요소를 강조하며 단계별로 UI를 설명합니다.

```tsx
import { Tour } from "@sunghoon_lee/akron-ui";
import type { TourStep } from "@sunghoon_lee/akron-ui";

const steps: TourStep[] = [
  {
    title: "환영합니다!",
    description: "주요 기능을 소개합니다.",
    placement: "center",
  },
  {
    target: "#my-button",
    title: "버튼",
    description: "액션을 트리거합니다.",
    placement: "bottom",
  },
];

<Tour
  steps={steps}
  open={open}
  onOpenChange={setOpen}
  onComplete={() => console.log("tour done")}
/>
```

### TourProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| steps | TourStep[] | 필수 | 투어 단계 목록 |
| open | boolean | 필수 | 투어 활성화 여부 |
| onOpenChange | (open: boolean) => void | 필수 | 상태 변경 핸들러 |
| currentStep | number | - | 현재 단계 인덱스 (제어 모드) |
| onStepChange | (step: number) => void | - | 단계 변경 핸들러 |
| onComplete | () => void | - | 투어 완료 핸들러 |
| nextLabel | string | '다음' | 다음 버튼 레이블 |
| prevLabel | string | '이전' | 이전 버튼 레이블 |
| completeLabel | string | '완료' | 완료 버튼 레이블 |
| showSkip | boolean | true | 건너뛰기 버튼 표시 여부 |
| spotlightPadding | number | 8 | 스포트라이트 여백 (px) |

### TourStep

| Prop | 타입 | 설명 |
|------|------|------|
| target | string | CSS 선택자 (없으면 화면 중앙 표시) |
| title | string | 단계 제목 |
| description | string | 단계 설명 |
| content | ReactNode | 추가 콘텐츠 |
| placement | 'top' \| 'bottom' \| 'left' \| 'right' \| 'center' | 툴팁 위치 |

---

## SplitButton

분할 버튼 컴포넌트. 기본 액션 버튼과 드롭다운 메뉴를 하나로 결합합니다.

```tsx
import { SplitButton } from "@sunghoon_lee/akron-ui";
import type { SplitButtonItem } from "@sunghoon_lee/akron-ui";

const items: SplitButtonItem[] = [
  { key: "save-draft", label: "임시 저장" },
  { key: "save-copy", label: "복사본 저장" },
  { key: "export", label: "내보내기", divider: true },
  { key: "delete", label: "삭제", divider: true, danger: true },
];

<SplitButton
  items={items}
  onItemClick={(key) => console.log(key)}
  variant="primary"
  size="md"
>
  저장
</SplitButton>
```

### SplitButtonProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | ReactNode | 필수 | 기본 버튼 레이블 |
| items | SplitButtonItem[] | 필수 | 드롭다운 항목 목록 |
| onItemClick | (key: string) => void | - | 항목 클릭 핸들러 |
| variant | 'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger' | 'primary' | 버튼 변형 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| disabled | boolean | false | 비활성화 |
| loading | boolean | false | 로딩 상태 |
| fullWidth | boolean | false | 전체 너비 |
| placement | 'bottom-start' \| 'bottom-end' | 'bottom-end' | 드롭다운 정렬 방향 |

### SplitButtonItem

| Prop | 타입 | 설명 |
|------|------|------|
| key | string | 고유 키 (onItemClick 콜백 인자) |
| label | ReactNode | 항목 표시 텍스트 |
| disabled | boolean | 비활성화 여부 |
| divider | boolean | 이 항목 위에 구분선 추가 |
| danger | boolean | 위험 스타일 (빨간 텍스트) |

---

## Kbd / KbdShortcut

키보드 단축키 표시 컴포넌트. 키캡 스타일로 단축키를 시각적으로 표현합니다.

```tsx
import { Kbd, KbdShortcut } from "@sunghoon_lee/akron-ui";

// 단일 키
<Kbd>Enter</Kbd>
<Kbd>⌘</Kbd>

// 조합 단축키
<KbdShortcut keys={["⌘", "K"]} />
<KbdShortcut keys={["⌃", "⌘", "F"]} size="sm" variant="outline" />
```

### KbdProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'outline' \| 'filled' | 'default' | 변형 |
| children | ReactNode | - | 키 텍스트 |

### KbdShortcutProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| keys | string[] | 필수 | 키 배열 (예: ["⌘", "K"]) |
| separator | ReactNode | '+' | 키 간 구분자 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'outline' \| 'filled' | 'default' | 변형 |

---

## CopyButton

클립보드 복사 버튼. 복사 성공 후 아이콘이 체크마크로 교체되어 피드백을 제공합니다.

```tsx
import { CopyButton } from "@sunghoon_lee/akron-ui";

// 아이콘만
<CopyButton value="복사할 텍스트" />

// 레이블 포함
<CopyButton
  value="npm install @sunghoon_lee/akron-ui"
  iconOnly={false}
  label="복사"
  copiedLabel="복사됨!"
  variant="outline"
  onCopy={(v) => console.log("copied:", v)}
/>
```

### CopyButtonProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | string | 필수 | 클립보드에 복사할 텍스트 |
| timeout | number | 2000 | 복사 확인 표시 지속 시간 (ms) |
| onCopy | (value: string) => void | - | 복사 성공 콜백 |
| variant | 'ghost' \| 'outline' \| 'filled' | 'ghost' | 버튼 변형 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| iconOnly | boolean | true | true면 아이콘만, false면 레이블도 표시 |
| label | string | '복사' | 기본 상태 레이블 |
| copiedLabel | string | '복사됨' | 복사 완료 상태 레이블 |

---

## ScrollArea

커스텀 스크롤바 영역 컴포넌트. hover 시 얇고 세련된 스크롤바를 표시합니다.

```tsx
import { ScrollArea } from "@sunghoon_lee/akron-ui";

<ScrollArea maxHeight={300}>
  {/* 스크롤할 콘텐츠 */}
</ScrollArea>

// 수평 스크롤
<ScrollArea orientation="horizontal">
  <div style={{ display: "flex", gap: 8, width: "max-content" }}>
    {/* 가로 스크롤 콘텐츠 */}
  </div>
</ScrollArea>
```

### ScrollAreaProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| orientation | 'vertical' \| 'horizontal' \| 'both' | 'vertical' | 스크롤 방향 |
| maxHeight | string \| number | - | 최대 높이 |
| maxWidth | string \| number | - | 최대 너비 |
| height | string \| number | - | 고정 높이 |
| width | string \| number | - | 고정 너비 |
| scrollbarSize | 'sm' \| 'md' \| 'lg' | 'md' | 스크롤바 굵기 |
| alwaysVisible | boolean | false | 스크롤바 항상 표시 여부 |

---

## NumberTicker

애니메이션 숫자 카운터. 목표 값까지 부드럽게 애니메이션됩니다.

```tsx
import { NumberTicker } from "@sunghoon_lee/akron-ui";

<NumberTicker value={12847} />
<NumberTicker value={98.5} decimalPlaces={1} suffix="%" duration={2000} />
<NumberTicker value={42500000} prefix="₩" easing="easeOut" />
```

### NumberTickerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | number | 필수 | 목표 값 |
| decimalPlaces | number | 0 | 소수점 자릿수 |
| thousandSeparator | string | ',' | 천 단위 구분자 |
| decimalSeparator | string | '.' | 소수점 기호 |
| prefix | string | '' | 앞 접두사 |
| suffix | string | '' | 뒤 접미사 |
| duration | number | 1500 | 애니메이션 지속시간 (ms) |
| delay | number | 0 | 시작 지연 (ms) |
| startValue | number | 0 | 시작 값 |
| easing | 'linear' \| 'easeOut' \| 'easeInOut' | 'easeOut' | Easing 함수 |
| animateOnView | boolean | true | 뷰포트 진입 시 애니메이션 시작 |

---

## PasswordInput

비밀번호 입력 컴포넌트. 표시/숨김 토글과 비밀번호 강도 표시를 지원합니다.

```tsx
import { PasswordInput } from "@sunghoon_lee/akron-ui";

<PasswordInput
  label="비밀번호"
  placeholder="비밀번호를 입력하세요"
  showStrength
  hint="8자 이상, 대소문자 및 특수문자 조합"
  fullWidth
/>
```

### PasswordInputProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| size | 'sm' \| 'md' \| 'lg' | 'md' | 입력 크기 |
| label | string | - | 레이블 |
| error | string | - | 오류 메시지 |
| hint | string | - | 도움말 텍스트 |
| fullWidth | boolean | false | 전체 너비 |
| showToggle | boolean | true | 표시/숨김 토글 버튼 |
| showStrength | boolean | false | 비밀번호 강도 미터 표시 |

> 강도 채점 기준: 길이(8자↑, 12자↑), 대소문자 혼합, 숫자, 특수문자 각 +1점 (최대 4점)

---

## AspectRatio

비율 유지 컨테이너. 미디어 요소의 가로세로 비율을 일정하게 유지합니다.

```tsx
import { AspectRatio } from "@sunghoon_lee/akron-ui";

<AspectRatio ratio="video">
  <img src="..." alt="..." />
</AspectRatio>

// 커스텀 비율
<AspectRatio ratio={4/3}>
  <video src="..." />
</AspectRatio>
```

### AspectRatioProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| ratio | number \| 'square' \| 'video' \| 'portrait' \| 'wide' \| 'ultrawide' | 1 | 가로:세로 비율 |
| children | ReactNode | 필수 | 컨테이너 내 콘텐츠 |

**프리셋**: square(1:1), video(16:9), portrait(3:4), wide(21:9), ultrawide(32:9)

---

## LoadingOverlay

로딩 오버레이 컴포넌트. 부모 컨테이너를 덮어 로딩 상태를 표시합니다. 부모에 `position: relative` 필요.

```tsx
import { LoadingOverlay } from "@sunghoon_lee/akron-ui";

<div style={{ position: "relative" }}>
  <LoadingOverlay visible={loading} label="불러오는 중..." blur />
  {/* 실제 콘텐츠 */}
</div>
```

### LoadingOverlayProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| visible | boolean | 필수 | 오버레이 표시 여부 |
| variant | 'spinner' \| 'dots' \| 'pulse' | 'spinner' | 로딩 인디케이터 종류 |
| label | string | - | 로딩 텍스트 |
| blur | boolean | false | 배경 blur 효과 |
| opacity | number | 0.6 | 배경 불투명도 (0~1) |
| zIndex | number | 10 | z-index 값 |

---

## Highlight

텍스트 강조 컴포넌트. 검색 결과 키워드를 하이라이트합니다.

```tsx
import { Highlight } from "@sunghoon_lee/akron-ui";

// 단일 키워드
<Highlight highlight="React">
  React는 UI 라이브러리입니다.
</Highlight>

// 복수 키워드
<Highlight highlight={["React", "JavaScript"]} color="primary">
  React는 JavaScript 기반입니다.
</Highlight>
```

### HighlightProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | string | 필수 | 전체 텍스트 |
| highlight | string \| string[] | 필수 | 강조할 쿼리 |
| color | 'yellow' \| 'primary' \| 'success' \| 'warning' \| 'error' \| string | 'yellow' | 강조 배경색 |
| ignoreCase | boolean | true | 대소문자 무시 여부 |

---

## Spoiler

스포일러/블러 공개 컴포넌트. 콘텐츠를 blur 처리하고 클릭 또는 hover 시 공개합니다.

```tsx
import { Spoiler } from "@sunghoon_lee/akron-ui";

<Spoiler showLabel="정답 보기" hideLabel="숨기기">
  <p>이 내용은 처음에 숨겨집니다.</p>
</Spoiler>

// hover 모드
<Spoiler revealOnHover>
  <img src="..." alt="..." />
</Spoiler>
```

### SpoilerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| children | ReactNode | 필수 | 숨길 콘텐츠 |
| showLabel | string | '내용 보기' | 공개 버튼 레이블 |
| hideLabel | string | '숨기기' | 숨김 버튼 레이블 |
| defaultOpen | boolean | false | 초기 공개 여부 |
| open | boolean | - | 제어 모드 공개 여부 |
| onOpenChange | (open: boolean) => void | - | 상태 변경 콜백 |
| revealOnHover | boolean | false | hover 시 공개 (마우스 떼면 다시 숨김) |
| blurAmount | 'sm' \| 'md' \| 'lg' | 'md' | 블러 강도 |

---

## Marquee

무한 스크롤 배너 컴포넌트. 로고 슬라이더, 공지 배너, 리뷰 캐러셀에 활용합니다.

```tsx
import { Marquee } from "@sunghoon_lee/akron-ui";

<Marquee speed={40} pauseOnHover>
  {logos.map((logo) => <img key={logo} src={logo} alt="" />)}
</Marquee>
```

### MarqueeProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| speed | number | 40 | 스크롤 속도 (px/s). 높을수록 빠름 |
| direction | 'left' \| 'right' | 'left' | 스크롤 방향 |
| pauseOnHover | boolean | true | hover 시 일시정지 |
| gap | number | 16 | 항목 간 간격 (px) |
| repeat | number | 4 | 콘텐츠 복사 횟수 (최소 2) |

---

## HoverCard

hover 카드 컴포넌트. 트리거에 마우스를 올리면 미리보기 카드를 표시합니다.

```tsx
import { HoverCard } from "@sunghoon_lee/akron-ui";

<HoverCard
  trigger={<span>@username</span>}
  placement="bottom-start"
  width={280}
>
  <div style={{ padding: 16 }}>
    {/* 카드 콘텐츠 */}
  </div>
</HoverCard>
```

### HoverCardProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| trigger | ReactNode | 필수 | hover 트리거 요소 |
| children | ReactNode | 필수 | 카드 콘텐츠 |
| placement | 'top' \| 'top-start' \| 'top-end' \| 'bottom' \| 'bottom-start' \| 'bottom-end' \| 'left' \| 'right' | 'bottom' | 카드 위치 |
| openDelay | number | 200 | 열기 지연 (ms) |
| closeDelay | number | 100 | 닫기 지연 (ms) |
| width | number \| string | 280 | 카드 너비 |
| disabled | boolean | false | 비활성화 |

---

## MediaCard

미디어 + 텍스트 카드 컴포넌트. 블로그, 뉴스, 제품 목록에 활용합니다.

```tsx
import { MediaCard } from "@sunghoon_lee/akron-ui";

<MediaCard
  media={<img src="..." alt="..." />}
  badge={<Badge>NEW</Badge>}
  meta="2024. 01. 15"
  title="게시글 제목"
  description="게시글 요약 설명..."
  footer={<Button size="sm">더 보기</Button>}
  hoverable
  onClick={() => router.push("/post/1")}
/>
```

### MediaCardProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| media | ReactNode | 필수 | 미디어 요소 |
| title | ReactNode | 필수 | 카드 제목 |
| description | ReactNode | - | 설명 (3줄 clamp) |
| badge | ReactNode | - | 미디어 위 배지 오버레이 |
| meta | ReactNode | - | 제목 위 메타 정보 |
| footer | ReactNode | - | 하단 액션 영역 |
| orientation | 'vertical' \| 'horizontal' | 'vertical' | 레이아웃 방향 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 카드 크기 |
| hoverable | boolean | false | hover elevation 효과 |
| mediaRatio | 'video' \| 'square' \| 'portrait' \| number | 'video' | 미디어 비율 (vertical 전용) |

---

## MasonryGrid

메이슨리 그리드 레이아웃. CSS columns를 사용한 Pinterest 스타일 격자 배치입니다.

```tsx
import { MasonryGrid } from "@sunghoon_lee/akron-ui";

// 고정 열 수
<MasonryGrid columns={3} gap={16}>
  {items.map((item) => <Card key={item.id} />)}
</MasonryGrid>

// 반응형 열 수
<MasonryGrid columns={{ sm: 1, md: 2, lg: 3, xl: 4 }} gap={16}>
  {items.map((item) => <Card key={item.id} />)}
</MasonryGrid>
```

### MasonryGridProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| columns | number \| { sm?, md?, lg?, xl? } | 3 | 열 수 또는 반응형 열 수 |
| gap | number \| string | 16 | 열 간격 |
| rowGap | number \| string | - | 행 간격 (없으면 gap과 동일) |

---

## ChatBubble

채팅 말풍선 컴포넌트. 메신저, 고객 지원 위젯, AI 챗봇 인터페이스에 사용합니다.

```tsx
import { ChatBubble } from "@sunghoon_lee/akron-ui";

// 수신 메시지 (왼쪽)
<ChatBubble side="left" name="지수" timestamp="오후 2:30">
  안녕하세요!
</ChatBubble>

// 발신 메시지 (오른쪽)
<ChatBubble side="right" timestamp="오후 2:31" status={<CheckCheck size={12} />}>
  안녕하세요 반갑습니다!
</ChatBubble>

// 아바타와 함께
<ChatBubble side="left" avatar={<Avatar />} name="지수" timestamp="오후 2:30">
  메시지 내용
</ChatBubble>
```

### ChatBubbleProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| side | 'left' \| 'right' | 'left' | 말풍선 방향 (left=수신, right=발신) |
| children | ReactNode | 필수 | 메시지 내용 |
| avatar | ReactNode | - | 아바타 요소 |
| name | string | - | 발신자 이름 (left 전용) |
| timestamp | ReactNode | - | 타임스탬프 |
| status | ReactNode | - | 메시지 상태 아이콘 (읽음 체크 등) |
| variant | 'filled' \| 'outline' \| 'ghost' | 'filled' | 말풍선 스타일 |

---

## GradientText

그라디언트 색상 텍스트 컴포넌트. 히어로 섹션, 강조 텍스트, 브랜딩에 사용합니다.

```tsx
import { GradientText } from "@sunghoon_lee/akron-ui";

// 프리셋 사용
<h1><GradientText preset="sunset">Hello World</GradientText></h1>

// 애니메이션
<h1><GradientText preset="ocean" animate>Shimmer Text</GradientText></h1>

// 커스텀 그라디언트
<GradientText gradient="linear-gradient(90deg, #ff6b6b, #feca57)">Custom</GradientText>

// HTML 태그 변경
<GradientText as="h2" preset="candy">Heading</GradientText>
```

### GradientTextProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| preset | 'primary' \| 'secondary' \| 'sunset' \| 'ocean' \| 'forest' \| 'candy' \| 'mono' | 'primary' | 그라디언트 프리셋 |
| gradient | string | - | 커스텀 CSS 그라디언트 문자열 |
| animate | boolean | false | shimmer 애니메이션 활성화 |
| as | keyof JSX.IntrinsicElements | 'span' | 렌더링할 HTML 태그 |
| children | ReactNode | 필수 | 텍스트 내용 |

---

## ConfirmDialog

확인 다이얼로그 컴포넌트. 위험한 작업이나 중요한 결정을 사용자에게 재확인할 때 사용합니다.

```tsx
import { ConfirmDialog } from "@sunghoon_lee/akron-ui";

const [open, setOpen] = useState(false);

<ConfirmDialog
  open={open}
  onOpenChange={setOpen}
  title="삭제하시겠습니까?"
  description="이 작업은 되돌릴 수 없습니다."
  variant="danger"
  confirmLabel="삭제"
  onConfirm={() => { /* 삭제 로직 */ setOpen(false); }}
/>
```

### ConfirmDialogProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| open | boolean | 필수 | 열림 상태 |
| onOpenChange | (open: boolean) => void | 필수 | 열림 상태 변경 핸들러 |
| title | string | 필수 | 제목 |
| description | string | - | 설명 텍스트 |
| onConfirm | () => void | 필수 | 확인 버튼 클릭 핸들러 |
| onCancel | () => void | - | 취소 버튼 클릭 핸들러 |
| confirmLabel | string | '확인' | 확인 버튼 텍스트 |
| cancelLabel | string | '취소' | 취소 버튼 텍스트 |
| variant | 'default' \| 'danger' \| 'warning' \| 'info' \| 'success' | 'default' | 다이얼로그 변형 |
| loading | boolean | false | 로딩 상태 |
| confirmDisabled | boolean | false | 확인 버튼 비활성화 |
| children | ReactNode | - | 추가 본문 내용 |

---

## Callout

콜아웃 컴포넌트. 문서, 블로그, 대시보드에서 중요한 정보를 강조할 때 사용합니다.

```tsx
import { Callout } from "@sunghoon_lee/akron-ui";

<Callout variant="warning" title="주의">
  이 기능은 실험적입니다.
</Callout>

<Callout variant="tip" hideIcon>
  아이콘 없는 팁 스타일
</Callout>
```

### CalloutProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| variant | 'info' \| 'warning' \| 'success' \| 'error' \| 'tip' | 'info' | 콜아웃 변형 |
| title | string | - | 제목 |
| icon | ReactNode | - | 커스텀 아이콘 |
| hideIcon | boolean | false | 아이콘 숨김 |
| children | ReactNode | 필수 | 내용 |

---

## Ribbon

모서리 리본 컴포넌트. 카드나 이미지 위에 NEW, SALE, BETA 등의 상태를 표시합니다.

```tsx
import { Ribbon } from "@sunghoon_lee/akron-ui";

<Ribbon label="NEW" color="primary">
  <Card>내용</Card>
</Ribbon>

<Ribbon label="SALE" color="danger" placement="top-left">
  <Card>내용</Card>
</Ribbon>
```

### RibbonProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| label | string | 필수 | 리본에 표시할 텍스트 |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'neutral' | 'primary' | 리본 색상 |
| placement | 'top-left' \| 'top-right' | 'top-right' | 리본 위치 |
| children | ReactNode | 필수 | 리본이 붙을 컨테이너 (overflow: hidden 적용) |

---

## GlassCard

글래스모피즘 카드 컴포넌트. 배경 이미지나 그라디언트 위에서 반투명한 유리 효과를 제공합니다.

```tsx
import { GlassCard } from "@sunghoon_lee/akron-ui";

// 그라디언트 배경 위에 사용
<div style={{ background: "linear-gradient(135deg, #667eea, #764ba2)", padding: 32 }}>
  <GlassCard blur="md" hoverable>
    <h3>제목</h3>
    <p>내용</p>
  </GlassCard>
</div>
```

### GlassCardProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| blur | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 배경 블러 강도 |
| border | 'none' \| 'subtle' \| 'visible' | 'subtle' | 테두리 스타일 |
| shadow | boolean | true | 그림자 표시 |
| hoverable | boolean | false | 호버 시 부상 효과 |
| opacity | number | 15 | 배경 불투명도 (0–100) |

---

## CountdownTimer

카운트다운 타이머 컴포넌트. 이벤트 마감, 출시 예정일, 한정 세일 등에 사용합니다.

```tsx
import { CountdownTimer } from "@sunghoon_lee/akron-ui";

// 3일 후
<CountdownTimer targetDate={new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)} />

// 카드 변형
<CountdownTimer
  targetDate={new Date("2026-12-31")}
  variant="card"
  size="lg"
  onComplete={() => console.log("완료!")}
/>
```

### CountdownTimerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| targetDate | Date \| number | 필수 | 카운트다운 목표 일시 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'card' \| 'minimal' | 'default' | 변형 |
| showDays | boolean | true | 일(Days) 표시 여부 |
| showLabels | boolean | true | 레이블 표시 여부 |
| separator | string | ':' | 구분자 문자 (default/minimal 변형) |
| onComplete | () => void | - | 카운트다운 종료 콜백 |
| labels | { days?, hours?, minutes?, seconds? } | - | 커스텀 레이블 |

---

## ProgressRing

원형 진행률 컴포넌트. SVG 기반 원형 게이지로 업로드 진행률, 점수, 완료율을 표시합니다.

```tsx
import { ProgressRing } from "@sunghoon_lee/akron-ui";

<ProgressRing value={75} />
<ProgressRing value={87} size="lg" color="success" />

// 커스텀 레이블
<ProgressRing value={87} size="lg" label={
  <div>
    <div style={{ fontSize: 22, fontWeight: 700 }}>87</div>
    <div style={{ fontSize: 10 }}>점수</div>
  </div>
} />
```

### ProgressRingProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | number | 필수 | 진행률 (0–100) |
| size | 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 크기 |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' | 'primary' | 색상 |
| strokeWidth | number | size별 자동 | 링 두께 |
| label | ReactNode | 퍼센트 텍스트 | 중앙 레이블 |
| hideLabel | boolean | false | 레이블 숨김 |
| trackColor | string | - | 트랙 색상 오버라이드 |
| progressColor | string | - | 진행 색상 오버라이드 |
| animate | boolean | true | 마운트 시 애니메이션 |

---

## ReadingProgress

읽기 진행률 바 컴포넌트. `position: fixed`로 화면 상단/하단에 고정되어 스크롤 위치를 표시합니다.

```tsx
import { ReadingProgress } from "@sunghoon_lee/akron-ui";

// 페이지 상단에 고정 (window 스크롤 추적)
<ReadingProgress />

// 그라디언트, 하단에 배치
<ReadingProgress color="gradient" placement="bottom" height={4} />

// 특정 스크롤 컨테이너 추적
const ref = useRef<HTMLDivElement>(null);
<ReadingProgress scrollContainer={ref} />
<div ref={ref} style={{ height: 400, overflow: "auto" }}>...</div>
```

### ReadingProgressProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| height | number | 3 | 진행 바 두께 (px) |
| placement | 'top' \| 'bottom' | 'top' | 화면 고정 위치 |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'gradient' | 'primary' | 색상 |
| progressColor | string | - | 커스텀 색상 |
| scrollContainer | RefObject\<HTMLElement\> | - | 추적할 스크롤 컨테이너 |
| zIndex | number | 1000 | z-index |

---

## BackToTop

맨 위로 이동 버튼 컴포넌트. 스크롤 임계값을 초과하면 자동으로 나타납니다.

```tsx
import { BackToTop } from "@sunghoon_lee/akron-ui";

// 기본 (화면 오른쪽 하단 고정)
<BackToTop />

// 커스텀
<BackToTop threshold={200} position="bottom-center" variant="outline" label="맨 위로" />
```

### BackToTopProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| threshold | number | 300 | 버튼 표시 시작 스크롤 위치 (px) |
| position | 'bottom-right' \| 'bottom-left' \| 'bottom-center' | 'bottom-right' | 화면 고정 위치 |
| variant | 'filled' \| 'outline' \| 'ghost' | 'filled' | 버튼 변형 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 버튼 크기 |
| behavior | ScrollBehavior | 'smooth' | 스크롤 동작 |
| icon | ReactNode | ArrowUp | 커스텀 아이콘 |
| label | string | - | 버튼 레이블 텍스트 |
| offsetX | number | 24 | 가로 오프셋 (px) |
| offsetY | number | 24 | 세로 오프셋 (px) |

---

## InlineEdit

인라인 편집 컴포넌트. 클릭하면 즉시 편집 가능한 입력 필드로 전환됩니다. Enter/Escape로 확인/취소합니다.

```tsx
import { InlineEdit } from "@sunghoon_lee/akron-ui";

// Controlled
const [name, setName] = useState("홍길동");
<InlineEdit value={name} onChange={setName} onConfirm={v => save(v)} />

// Uncontrolled
<InlineEdit defaultValue="기본값" />

// Textarea
<InlineEdit as="textarea" defaultValue="여러 줄 편집" />
```

### InlineEditProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | string | - | 현재 값 (controlled) |
| defaultValue | string | '' | 초기 값 (uncontrolled) |
| onChange | (value: string) => void | - | 값 변경 핸들러 |
| onConfirm | (value: string) => void | - | 편집 확인 핸들러 (Enter / 체크 버튼) |
| onCancel | (original: string) => void | - | 편집 취소 핸들러 (Escape / X 버튼) |
| as | 'input' \| 'textarea' | 'input' | 입력 타입 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| disabled | boolean | false | 비활성화 |
| showEditIcon | boolean | true | 호버 시 편집 아이콘 표시 |
| emptyText | string | '—' | 빈 값일 때 표시 텍스트 |
| placeholder | string | '클릭하여 편집' | placeholder |
| maxLength | number | - | 최대 입력 길이 |

---

## TransferList

이중 목록 전송 컴포넌트. 두 목록 사이에서 아이템을 선택/이동합니다. 권한 설정, 항목 선택 등에 사용합니다.

```tsx
import { TransferList } from "@sunghoon_lee/akron-ui";

<TransferList
  sourceItems={[
    { value: "a", label: "항목 A" },
    { value: "b", label: "항목 B", disabled: true },
  ]}
  targetItems={[{ value: "c", label: "항목 C" }]}
  sourceTitle="사용 가능"
  targetTitle="선택됨"
  searchable
  onChange={(source, target) => console.log(source, target)}
/>
```

### TransferListProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| sourceItems | TransferListItem[] | [] | 왼쪽(출처) 목록 |
| targetItems | TransferListItem[] | [] | 오른쪽(대상) 목록 |
| onChange | (source, target) => void | - | 변경 핸들러 |
| sourceTitle | string | '선택 가능' | 왼쪽 목록 제목 |
| targetTitle | string | '선택됨' | 오른쪽 목록 제목 |
| searchable | boolean | false | 검색 입력 활성화 |
| listHeight | number \| string | 240 | 목록 높이 |

### TransferListItem

| 필드 | 타입 | 설명 |
|------|------|------|
| value | string | 고유 식별자 |
| label | string | 표시 텍스트 |
| disabled | boolean | 이동 불가 여부 |

---

## CodeSnippet

코드 스니펫 컴포넌트. 복사 버튼, 줄 번호, 언어 레이블을 갖춘 코드 표시 블록입니다.

```tsx
import { CodeSnippet } from "@sunghoon_lee/akron-ui";

<CodeSnippet
  filename="Button.tsx"
  language="tsx"
  showLineNumbers
  maxLines={10}
  code={`export const Button = () => <button>Click</button>`}
/>
```

### CodeSnippetProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| code | string | 필수 | 코드 내용 |
| language | string | - | 언어 레이블 (헤더 표시) |
| filename | string | - | 파일명 (헤더 표시) |
| showCopy | boolean | true | 복사 버튼 표시 |
| showLineNumbers | boolean | false | 줄 번호 표시 |
| maxLines | number | - | 최대 표시 줄 수 (초과 시 펼치기 버튼) |
| variant | 'filled' \| 'outline' \| 'minimal' | 'filled' | 변형 (filled = 다크 테마) |
| onCopy | (code: string) => void | - | 복사 완료 콜백 |

---

## Typewriter

타이핑 애니메이션 컴포넌트. 텍스트를 한 글자씩 타이핑하고, 여러 단어를 순환 표시합니다.

```tsx
import { Typewriter } from "@sunghoon_lee/akron-ui";

// 단일 텍스트
<Typewriter words="Hello World" />

// 여러 단어 순환
<Typewriter words={["개발자를", "디자이너를", "크리에이터를"]} loop />

// 한 번만 타이핑 후 완료
<Typewriter words="완료 후 정지" loop={false} onComplete={() => console.log("완료")} />
```

### TypewriterProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| words | string \| string[] | 필수 | 타이핑할 텍스트 또는 배열 |
| typingSpeed | number | 60 | 타이핑 속도 (ms/글자) |
| deletingSpeed | number | 35 | 삭제 속도 (ms/글자) |
| pauseAfterTyping | number | 1500 | 타이핑 완료 후 대기 시간 (ms) |
| pauseAfterDeleting | number | 400 | 삭제 완료 후 대기 시간 (ms) |
| loop | boolean | true | 반복 여부 |
| showCursor | boolean | true | 커서 표시 |
| cursor | string | '\|' | 커서 문자 |
| as | TypewriterTag | 'span' | 렌더링 HTML 태그 |
| onComplete | () => void | - | 완료 콜백 (loop=false 시 호출) |

---

## FlipCard

3D 뒤집기 카드 컴포넌트. 호버 또는 클릭 시 앞면/뒷면이 3D 회전 애니메이션으로 전환됩니다.

```tsx
import { FlipCard } from "@sunghoon_lee/akron-ui";

<FlipCard
  height={200}
  front={<div>앞면 콘텐츠</div>}
  back={<div>뒷면 콘텐츠</div>}
/>

// 클릭 트리거
<FlipCard trigger="click" front={...} back={...} />

// 제어 모드
<FlipCard flipped={isFlipped} onFlipChange={setIsFlipped} front={...} back={...} />
```

### FlipCardProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| front | ReactNode | 필수 | 앞면 콘텐츠 |
| back | ReactNode | 필수 | 뒷면 콘텐츠 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 뒤집기 방향 |
| trigger | 'hover' \| 'click' | 'hover' | 뒤집기 트리거 |
| flipped | boolean | - | 외부 제어: 뒤집힘 상태 (controlled) |
| onFlipChange | (flipped: boolean) => void | - | 뒤집힘 상태 변경 핸들러 |
| duration | number | 600 | 애니메이션 시간 (ms) |
| height | number \| string | 200 | 카드 높이 (반드시 지정) |

---

## PricingCard

가격 플랜 카드 컴포넌트. SaaS, 구독 서비스의 플랜 비교 페이지에 사용합니다.

```tsx
import { PricingCard } from "@sunghoon_lee/akron-ui";

<PricingCard
  name="Pro"
  price={29000}
  period="/ 월"
  badge="가장 인기"
  variant="featured"
  ctaLabel="14일 무료 체험"
  features={[
    { text: "컴포넌트 무제한" },
    { text: "상업적 사용" },
    { text: "우선 지원", included: "partial" },
    { text: "엔터프라이즈 계약", included: false },
  ]}
  onCtaClick={() => navigate("/signup")}
/>
```

### PricingCardProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| name | string | 필수 | 플랜 이름 |
| price | number \| string | 필수 | 가격 (0이면 "무료" 표시) |
| currency | string | '₩' | 통화 기호 |
| period | string | '/ 월' | 청구 주기 텍스트 |
| description | string | - | 플랜 설명 |
| badge | string | - | 배지 텍스트 |
| features | PricingFeature[] | [] | 기능 목록 |
| ctaLabel | string | '시작하기' | CTA 버튼 텍스트 |
| onCtaClick | () => void | - | CTA 버튼 클릭 핸들러 |
| ctaDisabled | boolean | false | CTA 버튼 비활성화 |
| variant | 'default' \| 'featured' \| 'outline' | 'default' | 카드 변형 |
| icon | ReactNode | - | 헤더 아이콘 |

### PricingFeature

| 필드 | 타입 | 설명 |
|------|------|------|
| text | string | 기능 텍스트 |
| included | boolean \| 'partial' | true=체크, false=X, 'partial'=부분 |

---

## StepIndicator

단계 진행 표시 컴포넌트. 멀티스텝 폼, 온보딩, 주문 진행 상태를 시각화합니다.

```tsx
import { StepIndicator } from "@sunghoon_lee/akron-ui";

// 숫자 기반
<StepIndicator steps={4} currentStep={2} variant="numbers" />

// 레이블 포함
<StepIndicator
  steps={[{ label: "계정" }, { label: "결제" }, { label: "완료" }]}
  currentStep={1}
/>

// 클릭 가능한 단계
<StepIndicator steps={4} currentStep={step} onStepClick={setStep} />
```

### StepIndicatorProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| steps | number \| StepIndicatorStep[] | 필수 | 총 단계 수 또는 단계 배열 |
| currentStep | number | 필수 | 현재 단계 (0-based) |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'dots' \| 'numbers' \| 'icons' | 'dots' | 변형 |
| showConnector | boolean | true | 연결선 표시 |
| onStepClick | (index: number) => void | - | 완료된 단계 클릭 핸들러 |

---

## Ticker

스크롤 티커 컴포넌트. 공지사항, 뉴스, 주가 등을 가로로 흐르는 배너로 표시합니다.

```tsx
import { Ticker } from "@sunghoon_lee/akron-ui";

<Ticker
  label="공지"
  color="primary"
  items={[
    { id: "1", content: "v2.0 출시 예정" },
    { id: "2", content: "새 컴포넌트 추가" },
  ]}
/>
```

### TickerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | TickerItem[] | 필수 | 표시할 아이템 목록 |
| speed | number | 60 | 스크롤 속도 (px/s) |
| color | 'default' \| 'primary' \| 'success' \| 'warning' \| 'danger' \| 'dark' | 'default' | 색상 테마 |
| label | string | - | 좌측 헤더 레이블 |
| separator | ReactNode | '•' | 아이템 간 구분자 |
| pauseOnHover | boolean | true | 호버 시 일시정지 |
| direction | 'left' \| 'right' | 'left' | 스크롤 방향 |

---

## StickyNote

스티키 노트 카드 컴포넌트. 메모, 알림, 주석을 시각적으로 강조합니다.

```tsx
import { StickyNote } from "@sunghoon_lee/akron-ui";

<StickyNote color="yellow" title="할 일">
  API 문서 업데이트하기
</StickyNote>

<StickyNote color="pink" rotate={-2}>
  기울어진 메모
</StickyNote>
```

### StickyNoteProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| color | 'yellow' \| 'pink' \| 'blue' \| 'green' \| 'purple' \| 'orange' | 'yellow' | 색상 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| title | string | - | 제목 |
| foldedCorner | boolean | true | 접힌 모서리 효과 |
| rotate | number | 0 | 기울임 각도 (도) |
| shadow | boolean | true | 그림자 표시 |

---

## TimeAgo

상대적 시간 표시 컴포넌트. 주어진 날짜를 기준으로 "방금 전", "3시간 전", "어제" 등의 형태로 표시하며 자동으로 업데이트됩니다. HTML `<time>` 요소를 렌더링합니다.

```tsx
import { TimeAgo } from "@sunghoon_lee/akron-ui";

// 과거 시간
<TimeAgo date={new Date(Date.now() - 5 * 60 * 1000)} />
// → "5분 전"

// 미래 시간
<TimeAgo date={new Date(Date.now() + 3 * 60 * 60 * 1000)} locale="ko" />
// → "3시간 후"

// 영어
<TimeAgo date={new Date(Date.now() - 2 * 60 * 60 * 1000)} locale="en" />
// → "2 hours ago"

// 자동 업데이트 비활성화
<TimeAgo date={someDate} updateInterval={0} />
```

### TimeAgoProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| date | Date \| string \| number | 필수 | 기준 날짜/시각 |
| locale | 'ko' \| 'en' | 'ko' | 표시 언어 |
| updateInterval | number | 30000 | 자동 업데이트 간격(ms), 0이면 비활성화 |
| showTitle | boolean | true | 호버 시 절대 시간 툴팁 표시 |
| hideSuffix | boolean | false | suffix 숨김 |

### 출력 예시 (locale="ko")

| 경과 시간 | 출력 |
|----------|------|
| 10초 미만 | 방금 전 |
| 10~59초 | N초 전 |
| 1분 | 1분 전 |
| 2~59분 | N분 전 |
| 1시간 | 1시간 전 |
| 2~23시간 | N시간 전 |
| 1일 | 어제 |
| 2~29일 | N일 전 |
| 1개월 | 지난달 |
| 2~11개월 | N개월 전 |
| 1년 | 작년 |
| 2년+ | N년 전 |

---

## Gauge

원형(호 형태) 게이지 컴포넌트. CPU 사용률, 점수, RPM 등을 속도계 스타일로 시각화합니다. 270° 호를 SVG로 렌더링하며 진입 애니메이션을 포함합니다.

```tsx
import { Gauge } from "@sunghoon_lee/akron-ui";

// 기본
<Gauge value={75} label="CPU" />

// 자동 색상 (0~33%: danger, 33~66%: warning, 66~100%: success)
<Gauge value={85} color="auto" label="상태" />

// 커스텀 범위 및 포맷
<Gauge
  value={4200}
  min={0}
  max={8000}
  label="RPM"
  formatValue={(v) => v.toLocaleString()}
  showMinMax
/>
```

### GaugeProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | number | 필수 | 현재 값 |
| min | number | 0 | 최솟값 |
| max | number | 100 | 최댓값 |
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | 크기 |
| color | 'primary' \| 'success' \| 'warning' \| 'danger' \| 'auto' | 'primary' | 색상. auto는 값에 따라 자동 전환 |
| label | string | - | 중앙 하단 레이블 |
| showValue | boolean | true | 중앙 값 표시 |
| showMinMax | boolean | false | 최솟값/최댓값 표시 |
| formatValue | (value, percent) => string | - | 값 포맷 함수 |
| thickness | number | size 따라 | 호 두께 (px) |
| animated | boolean | true | 진입 애니메이션 |

---

## LogViewer

터미널 스타일 로그 뷰어. 서버 로그, 빌드 출력, 디버그 메시지를 수준별 색상으로 표시합니다. 항상 다크 배경(GitHub-style)으로 렌더링됩니다.

```tsx
import { LogViewer } from "@sunghoon_lee/akron-ui";

<LogViewer
  entries={[
    { id: 1, level: "info",    timestamp: new Date(), message: "서버 시작 중..." },
    { id: 2, level: "success", timestamp: new Date(), message: "연결 완료" },
    { id: 3, level: "warn",    timestamp: new Date(), message: "응답 지연" },
    { id: 4, level: "error",   timestamp: new Date(), message: "요청 실패", meta: { status: 503 } },
    { id: 5, level: "debug",   timestamp: new Date(), message: "캐시 히트" },
  ]}
  showLineNumbers
  maxHeight={400}
/>
```

### LogViewerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| entries | LogEntry[] | 필수 | 로그 항목 목록 |
| maxHeight | number \| string | 320 | 최대 높이 (px 또는 CSS 값) |
| showTimestamp | boolean | true | 타임스탬프 표시 |
| showLevel | boolean | true | 레벨 뱃지 표시 |
| showLineNumbers | boolean | false | 줄 번호 표시 |
| autoScroll | boolean | true | 새 항목 추가 시 자동 스크롤 |
| formatTimestamp | (ts: Date) => string | HH:mm:ss.ms | 타임스탬프 포맷 함수 |
| fontSize | 'xs' \| 'sm' \| 'md' | 'sm' | 폰트 크기 |

### LogEntry

| 필드 | 타입 | 설명 |
|------|------|------|
| message | string | 로그 메시지 (필수) |
| level | 'info' \| 'warn' \| 'error' \| 'debug' \| 'success' \| 'plain' | 로그 레벨 |
| timestamp | Date \| string | 타임스탬프 |
| id | string \| number | 고유 키 |
| meta | unknown | 추가 메타 데이터 (JSON 직렬화 표시) |

---

## DiffViewer

코드 diff 뷰어 컴포넌트. unified diff 문자열을 파싱하거나 직접 `DiffLine[]`을 제공하여 추가/삭제/변경 없음 줄을 시각적으로 표시합니다. GitHub 스타일 다크 테마를 사용합니다.

```tsx
import { DiffViewer } from "@sunghoon_lee/akron-ui";

// unified diff 문자열로 자동 파싱
<DiffViewer unifiedDiff={`--- a/src/foo.ts\n+++ b/src/foo.ts\n@@ -1,3 +1,3 @@\n-old line\n+new line\n context`} />

// 직접 DiffLine 제공
<DiffViewer
  files={[{
    oldFileName: "Button.tsx",
    newFileName: "Button.tsx",
    lines: [
      { type: "unchanged", content: "import React from 'react';", oldLineNumber: 1, newLineNumber: 1 },
      { type: "removed",   content: "const old = true;",          oldLineNumber: 2 },
      { type: "added",     content: "const new_ = true;",         newLineNumber: 2 },
    ],
  }]}
/>
```

### DiffViewerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| files | DiffFile[] | [] | diff 파일 목록 |
| unifiedDiff | string | - | unified diff 문자열 (자동 파싱). files보다 우선 |
| maxHeight | number \| string | 480 | 최대 높이 |
| showLineNumbers | boolean | true | 줄 번호 표시 |
| fontSize | 'xs' \| 'sm' \| 'md' | 'sm' | 폰트 크기 |

### DiffFile / DiffLine

```ts
interface DiffFile {
  oldFileName?: string;
  newFileName?: string;
  lines: DiffLine[];
}

interface DiffLine {
  type: "added" | "removed" | "unchanged" | "header";
  content: string;
  oldLineNumber?: number;
  newLineNumber?: number;
}
```

---

## ResizablePanels

드래그로 크기를 조절할 수 있는 2-패널 레이아웃 컴포넌트. 수평/수직 분할, 최소/최대 크기 제한, 키보드 접근성, 터치 지원을 포함합니다.

```tsx
import { ResizablePanels } from "@sunghoon_lee/akron-ui";

// 수평 분할 (기본)
<div style={{ height: 300 }}>
  <ResizablePanels
    first={<LeftPanel />}
    second={<RightPanel />}
    defaultSize={40}
  />
</div>

// 수직 분할
<div style={{ height: 400 }}>
  <ResizablePanels
    direction="vertical"
    first={<TopPanel />}
    second={<BottomPanel />}
    minSize={20}
    maxSize={80}
  />
</div>

// Controlled
const [size, setSize] = useState(50);
<ResizablePanels
  size={size}
  onSizeChange={setSize}
  first={<A />}
  second={<B />}
/>
```

### ResizablePanelsProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| first | ReactNode | 필수 | 첫 번째 패널 내용 |
| second | ReactNode | 필수 | 두 번째 패널 내용 |
| direction | 'horizontal' \| 'vertical' | 'horizontal' | 분할 방향 |
| defaultSize | number | 50 | 초기 첫 번째 패널 크기 (%) |
| minSize | number | 10 | 최소 크기 (%) |
| maxSize | number | 90 | 최대 크기 (%) |
| size | number | - | controlled 크기 (%) |
| onSizeChange | (size: number) => void | - | 크기 변경 콜백 |
| handleSize | number | 4 | 구분자 두께 (px) |

> **참고**: 부모 컨테이너에 명시적인 `height`가 있어야 합니다. 패널 내부에서 스크롤이 필요한 경우 `overflow: auto`를 직접 설정하세요.

---

## JsonViewer

인터랙티브 JSON 트리 뷰어. 중첩된 객체와 배열을 펼치고 접는 방식으로 탐색합니다. 클릭 또는 키보드로 노드를 토글할 수 있으며 GitHub 스타일 다크 테마를 사용합니다.

```tsx
import { JsonViewer } from "@sunghoon_lee/akron-ui";

<JsonViewer data={{ name: "Akron", version: "2.0", features: { darkMode: true } }} />

// 전체 펼침
<JsonViewer data={deepObj} defaultExpandDepth={Infinity} />

// 루트 이름 숨김
<JsonViewer data={arr} rootName={false} />
```

### JsonViewerProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| data | unknown | 필수 | 표시할 JSON 데이터 |
| defaultExpandDepth | number | 1 | 초기 펼침 깊이 (Infinity = 전체 펼침) |
| indent | number | 16 | 들여쓰기 px |
| maxHeight | number \| string | 400 | 최대 높이 |
| fontSize | 'xs' \| 'sm' \| 'md' | 'sm' | 폰트 크기 |
| rootName | string \| false | 'root' | 루트 노드 이름. false이면 이름 숨김 |
| showItemCount | boolean | true | 접힌 노드에 아이템 수 표시 |

---

## AnimatedCounter

숫자가 부드럽게 카운팅되는 애니메이션 컴포넌트. `requestAnimationFrame` 기반으로 매끄럽게 동작하며 다양한 이징 함수를 지원합니다.

```tsx
import { AnimatedCounter } from "@sunghoon_lee/akron-ui";

// 기본
<AnimatedCounter to={1200} style={{ fontSize: 40, fontWeight: 700 }} />

// 접두사 / 접미사 / 소수점
<AnimatedCounter to={4900000} prefix="₩" separator="," />
<AnimatedCounter to={98.6} suffix="%" decimals={1} />

// 커스텀 시작값 및 이징
<AnimatedCounter from={500} to={1000} easing="spring" duration={2000} />

// 뷰포트 진입 시 시작
<AnimatedCounter to={50000} startOnView />
```

### AnimatedCounterProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| to | number | 필수 | 목표 값 |
| from | number | 0 | 시작 값 |
| duration | number | 1500 | 애니메이션 지속 시간 (ms) |
| decimals | number | 0 | 소수점 자릿수 |
| easing | 'linear' \| 'easeOut' \| 'easeInOut' \| 'spring' | 'easeOut' | 이징 함수 |
| prefix | string | '' | 접두사 |
| suffix | string | '' | 접미사 |
| separator | string | - | 천 단위 구분자. 미지정 시 로케일 기반 자동 포맷 |
| formatValue | (value: number) => string | - | 커스텀 포맷 함수 |
| startOnView | boolean | false | 뷰포트 진입 시 애니메이션 시작 (IntersectionObserver) |
| onComplete | () => void | - | 애니메이션 완료 콜백 |

---

## Checklist

인터랙티브 체크리스트 컴포넌트. 완료 상태를 추적하고 진행도 바로 시각화할 수 있습니다. Controlled/Uncontrolled 패턴, 3가지 변형, 키보드 접근성을 지원합니다.

```tsx
import { Checklist } from "@sunghoon_lee/akron-ui";

<Checklist
  items={[
    { id: "1", label: "설치 완료" },
    { id: "2", label: "설정 파일 작성", description: "tsconfig.json 등" },
    { id: "3", label: "첫 컴포넌트 사용", disabled: true },
  ]}
  defaultChecked={new Set(["1"])}
  showProgress
  onChange={(checked, item, isChecked) => console.log(item.label, isChecked)}
/>

// Card variant
<Checklist variant="card" items={items} showProgress />
```

### ChecklistProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | ChecklistItem[] | 필수 | 항목 목록 |
| checked | Set\<string \| number\> | - | controlled 체크 상태 |
| defaultChecked | Set\<string \| number\> | new Set() | 기본 체크 상태 |
| onChange | (checked, item, next) => void | - | 변경 콜백 |
| variant | 'default' \| 'card' \| 'minimal' | 'default' | 변형 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| showProgress | boolean | false | 진행도 바 표시 |
| completeMessage | string | '모두 완료! 🎉' | 100% 달성 시 메시지 |

### ChecklistItem

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string \| number | 고유 식별자 (필수) |
| label | string | 항목 이름 (필수) |
| checked | boolean | 초기 체크 상태 (items에서 초기화 시 무시됨) |
| description | string | 부가 설명 |
| disabled | boolean | 비활성화 |

---

## FileTree

파일 시스템 트리 뷰어. 프로젝트 구조, git 상태 뱃지, 폴더 열기/닫기, 파일 선택을 지원합니다. 확장자별 자동 아이콘 매핑을 포함합니다.

```tsx
import { FileTree } from "@sunghoon_lee/akron-ui";

<FileTree
  nodes={[
    {
      id: "src", name: "src", type: "folder",
      children: [
        { id: "app", name: "App.tsx", type: "file", status: "modified" },
        { id: "main", name: "main.tsx", type: "file", status: "added" },
      ],
    },
    { id: "pkg", name: "package.json", type: "file" },
  ]}
  defaultExpanded={new Set(["src"])}
  onSelect={(node) => console.log(node.name)}
/>
```

### FileTreeProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| nodes | FileTreeNode[] | 필수 | 트리 노드 목록 |
| defaultExpanded | Set\<string\> | new Set() | 초기 열린 폴더 id |
| expanded | Set\<string\> | - | controlled 열린 폴더 id |
| onExpandChange | (expanded: Set\<string\>) => void | - | 폴더 열림/닫힘 콜백 |
| selected | string | - | 선택된 노드 id |
| onSelect | (node: FileTreeNode) => void | - | 노드 클릭 콜백 |
| size | 'sm' \| 'md' | 'md' | 크기 |
| indent | number | 12 | 들여쓰기 px |

### FileTreeNode

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | 고유 식별자 (필수) |
| name | string | 파일/폴더 이름 (필수) |
| type | 'file' \| 'folder' | 노드 타입 (필수) |
| children | FileTreeNode[] | 자식 노드 (폴더만) |
| icon | ReactNode | 커스텀 아이콘 |
| status | 'modified' \| 'added' \| 'deleted' \| 'renamed' | git 상태 뱃지 |

---

## MeterGroup

다중 세그먼트 스택 바 컴포넌트. 스토리지 사용량, 예산 분배, 진행 상태 등의 비율을 시각화합니다.

```tsx
import { MeterGroup } from "@sunghoon_lee/akron-ui";

<MeterGroup
  items={[
    { label: "사진",   value: 45 },
    { label: "동영상", value: 30 },
    { label: "문서",   value: 15 },
    { label: "기타",   value: 10 },
  ]}
  showPercent
/>

// 커스텀 색상 및 값 표시
<MeterGroup
  items={[
    { label: "시스템", value: 45, color: "var(--ark-color-primary-500)" },
    { label: "앱",     value: 62, color: "var(--ark-color-warning-500)" },
  ]}
  total={256}
  unit=" GB"
  showValue
  size="lg"
/>
```

### MeterGroupProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | MeterItem[] | 필수 | 세그먼트 목록 |
| total | number | items 합산 | 기준 합산값 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 바 두께 |
| legend | 'none' \| 'bottom' \| 'right' | 'bottom' | 레전드 위치 |
| showPercent | boolean | true | 퍼센트 표시 |
| showValue | boolean | false | 실제 값 표시 |
| unit | string | '' | 값 단위 |
| formatValue | (value, percent) => string | - | 커스텀 포맷 함수 |
| animated | boolean | true | 진입 애니메이션 |

### MeterItem

| 필드 | 타입 | 설명 |
|------|------|------|
| label | string | 세그먼트 이름 (필수) |
| value | number | 값 (필수) |
| color | string | CSS 색상 (기본: 내장 팔레트) |

---

## Spotlight

전역 검색 / 명령어 팔레트 오버레이 컴포넌트. ⌘K 단축키 등으로 열고, 키보드로 탐색 후 Enter로 선택합니다. 퍼지 검색, 그룹화, 단축키 힌트를 지원합니다.

```tsx
import { Spotlight } from "@sunghoon_lee/akron-ui";

const [open, setOpen] = useState(false);

// ⌘K로 열기
useEffect(() => {
  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setOpen(true);
    }
  };
  document.addEventListener("keydown", handler);
  return () => document.removeEventListener("keydown", handler);
}, []);

<Spotlight
  open={open}
  onClose={() => setOpen(false)}
  items={[
    { id: "home",    label: "홈",            type: "page",   group: "페이지" },
    { id: "dark",    label: "다크모드 전환", type: "action", group: "액션", shortcut: ["⌘", "D"] },
    { id: "readme",  label: "README.md",     type: "file" },
  ]}
  onSelect={(item) => console.log(item)}
/>
```

### SpotlightProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| open | boolean | 필수 | 열림 상태 |
| onClose | () => void | 필수 | 닫기 콜백 |
| items | SpotlightItem[] | 필수 | 검색 항목 목록 |
| onSelect | (item) => void | - | 항목 선택 콜백 |
| onSearch | (query) => void | - | 검색어 변경 콜백 |
| placeholder | string | '검색 또는 명령어 입력...' | 입력 플레이스홀더 |
| emptyMessage | string | '결과가 없습니다' | 빈 결과 메시지 |
| maxResults | number | 8 | 최대 결과 수 |

### SpotlightItem

| 필드 | 타입 | 설명 |
|------|------|------|
| id | string | 고유 식별자 (필수) |
| label | string | 표시 이름 (필수) |
| description | string | 부가 설명 |
| type | 'page' \| 'action' \| 'file' \| 'setting' \| 'recent' | 아이콘 타입 |
| group | string | 카테고리 그룹 이름 |
| icon | ReactNode | 커스텀 아이콘 |
| shortcut | string[] | 단축키 힌트 (예: ['⌘', 'K']) |
| keywords | string[] | 추가 검색 키워드 |

---

## BannerAlert

페이지 상단에 표시되는 배너 알림 컴포넌트. 공지사항, 시스템 점검 안내, 성공/오류 메시지, CTA 버튼을 포함합니다. 닫기 버튼으로 해제할 수 있으며 `sticky` 옵션으로 상단 고정이 가능합니다.

```tsx
import { BannerAlert } from "@sunghoon_lee/akron-ui";

<BannerAlert variant="info" message="새 버전이 출시되었습니다." />

// 공지사항 + CTA
<BannerAlert
  variant="announcement"
  message="🚀 Akron UI v2.0 출시!"
  description="50개 이상의 새 컴포넌트"
  actionLabel="자세히 보기"
  onAction={() => navigate("/release")}
  dismissible
/>

// 에러 + sticky
<BannerAlert variant="error" message="결제 처리 실패" sticky />
```

### BannerAlertProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| message | ReactNode | 필수 | 메인 메시지 |
| variant | 'info' \| 'success' \| 'warning' \| 'error' \| 'announcement' | 'info' | 변형 |
| description | ReactNode | - | 부가 설명 |
| dismissible | boolean | true | 닫기 버튼 표시 |
| onDismiss | () => void | - | 닫힘 콜백 |
| actionLabel | string | - | CTA 버튼 레이블 |
| onAction | () => void | - | CTA 클릭 콜백 |
| hideIcon | boolean | false | 아이콘 숨김 |
| icon | ReactNode | - | 커스텀 아이콘 |
| sticky | boolean | false | position: sticky top:0 적용 |

---

## ShortcutMap

키보드 단축키 레퍼런스 컴포넌트. 앱의 단축키 목록을 그룹별로 테이블, 그리드, 리스트 형태로 표시합니다. 도움말 페이지, 모달, 온보딩에 활용합니다.

```tsx
import { ShortcutMap } from "@sunghoon_lee/akron-ui";

<ShortcutMap
  groups={[
    {
      title: "일반",
      shortcuts: [
        { label: "검색 열기", keys: ["⌘", "K"] },
        { label: "저장", keys: ["⌘", "S"] },
      ],
    },
  ]}
/>

// 그리드 레이아웃
<ShortcutMap layout="grid" groups={groups} />

// 리스트 레이아웃
<ShortcutMap layout="list" size="sm" groups={groups} />
```

### ShortcutMapProps

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| groups | ShortcutGroup[] | 필수 | 단축키 그룹 목록 |
| layout | 'table' \| 'grid' \| 'list' | 'table' | 레이아웃 |
| size | 'sm' \| 'md' | 'md' | 크기 |

### ShortcutGroup / ShortcutEntry

```ts
interface ShortcutGroup {
  title: string;           // 그룹 제목
  shortcuts: ShortcutEntry[];
}

interface ShortcutEntry {
  label: string;         // 액션 이름
  keys: string[];        // 단축키 조합 (예: ['⌘', 'K'])
  description?: string;  // 부가 설명
}
```

---

## SortableList

드래그 앤 드롭 정렬 리스트. HTML5 Drag & Drop API 기반. 키보드 방향키로도 순서 변경 가능.

```tsx
import { SortableList } from "@sunghoon_lee/akron-ui";

const [items, setItems] = useState([
  { id: "1", label: "항목 A", description: "설명" },
  { id: "2", label: "항목 B" },
  { id: "3", label: "항목 C" },
]);

<SortableList items={items} onChange={setItems} variant="card" size="md" />
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | SortableItem[] | 필수 | 항목 목록 |
| onChange | (items: SortableItem[]) => void | - | 순서 변경 콜백 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'card' \| 'minimal' | 'default' | 변형 |
| showHandle | boolean | true | 드래그 핸들 표시 |
| disabled | boolean | false | 전체 비활성화 |
| renderItem | (item, index, handleProps) => ReactNode | - | 커스텀 렌더 |

### SortableItem

```ts
interface SortableItem {
  id: string | number;
  label: string;
  description?: string;
  disabled?: boolean;
}
```

---

## CurrencyInput

통화 형식 숫자 입력. 포커스 시 원시 숫자 편집, 블러 시 자동 포맷팅. 6개 통화 지원 (KRW, USD, EUR, JPY, GBP, CNY).

```tsx
import { CurrencyInput } from "@sunghoon_lee/akron-ui";

<CurrencyInput
  value={value}
  onChange={setValue}
  currency="KRW"
  min={0}
  max={10000000}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| value | number \| null | - | 숫자 값 (controlled) |
| defaultValue | number \| null | null | 기본 값 |
| onChange | (value: number \| null) => void | - | 값 변경 콜백 |
| currency | 'KRW' \| 'USD' \| 'EUR' \| 'JPY' \| 'GBP' \| 'CNY' | 'KRW' | 통화 코드 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| min | number | - | 최솟값 |
| max | number | - | 최댓값 |
| error | boolean | false | 에러 상태 |
| symbolPosition | 'prefix' \| 'suffix' | 'prefix' | 통화 기호 위치 |

---

## KanbanBoard

칸반 보드. 컬럼 간 드래그 앤 드롭 카드 이동. 라벨, 색상 바, 카드 추가 버튼 지원.

```tsx
import { KanbanBoard } from "@sunghoon_lee/akron-ui";

const [columns, setColumns] = useState([
  {
    id: "todo",
    title: "할 일",
    color: "var(--ark-color-gray-400)",
    cards: [
      { id: "1", title: "기획서 작성", labels: [{ text: "기획" }] },
    ],
  },
  {
    id: "done",
    title: "완료",
    color: "var(--ark-color-success-500)",
    cards: [],
  },
]);

<KanbanBoard columns={columns} onChange={setColumns} />
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| columns | KanbanColumn[] | 필수 | 컬럼 목록 |
| onChange | (columns: KanbanColumn[]) => void | - | 카드 이동 콜백 |
| onCardClick | (card, columnId) => void | - | 카드 클릭 콜백 |
| onAddCard | (columnId) => void | - | 카드 추가 클릭 |
| columnMinWidth | number | 280 | 컬럼 최소 너비(px) |
| showAddButton | boolean | true | 카드 추가 버튼 표시 |

### KanbanColumn / KanbanCard / KanbanLabel

```ts
interface KanbanColumn {
  id: string;
  title: string;
  cards: KanbanCard[];
  color?: string;        // 헤더 색상 바
}

interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  labels?: KanbanLabel[];
  footer?: ReactNode;
}

interface KanbanLabel {
  text: string;
  color?: string;
}
```

---

## ColorSwatch

색상 팔레트 표시. 클릭 시 색상 코드 복사. 선택 상태 지원.

```tsx
import { ColorSwatch } from "@sunghoon_lee/akron-ui";

<ColorSwatch
  colors={["#EF4444", "#F59E0B", "#22C55E", "#3B82F6"]}
  shape="circle"
  size="md"
  onSelect={(color) => console.log(color)}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| colors | (string \| ColorSwatchItem)[] | 필수 | 색상 목록 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| shape | 'square' \| 'circle' | 'square' | 모양 |
| copyOnClick | boolean | true | 클릭 시 복사 |
| showLabel | boolean | true | 라벨 표시 |
| onSelect | (color: string) => void | - | 선택 콜백 |
| selected | string | - | 선택된 색상 |
| columns | number | auto-fill | 컬럼 수 |

---

## DescriptionList

키-값 쌍 정의 목록. 수직, 수평, 그리드 레이아웃 지원.

```tsx
import { DescriptionList } from "@sunghoon_lee/akron-ui";

<DescriptionList
  layout="horizontal"
  divider
  items={[
    { term: "이름", detail: "김서연" },
    { term: "부서", detail: "개발팀" },
  ]}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | DescriptionItem[] | 필수 | 항목 목록 |
| layout | 'vertical' \| 'horizontal' \| 'grid' | 'vertical' | 레이아웃 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| divider | boolean | false | 구분선 |
| columns | number | 2 | 그리드 컬럼 수 |

### DescriptionItem

```ts
interface DescriptionItem {
  term: string;         // 키
  detail: ReactNode;    // 값
  icon?: ReactNode;     // 부가 아이콘
}
```

---

## ToggleGroup

토글 버튼 그룹. 단일 선택 / 다중 선택 모드 지원.

```tsx
import { ToggleGroup } from "@sunghoon_lee/akron-ui";

<ToggleGroup
  value={value}
  onChange={setValue}
  variant="outline"
  items={[
    { value: "left", label: "왼쪽" },
    { value: "center", label: "가운데" },
    { value: "right", label: "오른쪽" },
  ]}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| items | ToggleGroupItem[] | 필수 | 토글 항목 |
| type | 'single' \| 'multiple' | 'single' | 선택 타입 |
| value | string \| string[] | - | 선택 값 (controlled) |
| defaultValue | string \| string[] | - | 기본 선택 값 |
| onChange | (value) => void | - | 변경 콜백 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 크기 |
| variant | 'default' \| 'outline' \| 'ghost' | 'default' | 변형 |
| disabled | boolean | false | 전체 비활성화 |
| fullWidth | boolean | false | 전체 너비 채우기 |

---

## Watermark

페이지 워터마크 오버레이. SVG 기반 반복 패턴으로 콘텐츠 위에 텍스트 워터마크 표시.

```tsx
import { Watermark } from "@sunghoon_lee/akron-ui";

<Watermark text="사내 기밀" subText="2026-05-14">
  <div>보호할 콘텐츠</div>
</Watermark>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| text | string | 필수 | 워터마크 텍스트 |
| subText | string | - | 부가 텍스트 (두 번째 줄) |
| fontSize | number | 16 | 폰트 크기(px) |
| rotate | number | -22 | 회전 각도(deg) |
| gap | number | 100 | 간격(px) |
| opacity | number | 0.08 | 투명도 (0~1) |
| color | string | currentColor | 색상 |
| disabled | boolean | false | 비활성화 |

---

## ImageComparison

Before/After 이미지 비교 슬라이더. 드래그/터치/키보드로 위치 조절.

```tsx
import { ImageComparison } from "@sunghoon_lee/akron-ui";

<ImageComparison
  before="/before.jpg"
  after="/after.jpg"
  beforeLabel="원본"
  afterLabel="편집됨"
  height={400}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| before | string | 필수 | Before 이미지 URL |
| after | string | 필수 | After 이미지 URL |
| beforeLabel | string | 'Before' | Before 라벨 |
| afterLabel | string | 'After' | After 라벨 |
| defaultPosition | number | 50 | 초기 위치 (0~100) |
| position | number | - | 위치 (controlled) |
| onChange | (pos: number) => void | - | 위치 변경 콜백 |
| orientation | 'horizontal' \| 'vertical' | 'horizontal' | 방향 |
| height | number \| string | 400 | 높이 |

---

## SignaturePad

디지털 서명 패드. Canvas 기반 드로잉. 실행 취소, 초기화, PNG 내보내기 지원. Ref API로 제어.

```tsx
import { SignaturePad } from "@sunghoon_lee/akron-ui";

const padRef = useRef<SignaturePadRef>(null);
<SignaturePad ref={padRef} width={400} height={200} />
// padRef.current.toDataURL() → PNG data URL
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| width | number | 400 | 캔버스 너비 |
| height | number | 200 | 캔버스 높이 |
| penColor | string | - | 펜 색상 |
| penWidth | number | 2 | 펜 두께 |
| backgroundColor | string | - | 배경색 |
| onChange | (isEmpty: boolean) => void | - | 변경 콜백 |
| disabled | boolean | false | 비활성화 |
| placeholder | string | '여기에 서명하세요' | 플레이스홀더 |
| showToolbar | boolean | true | 툴바 표시 |

### Ref API

| 메서드 | 설명 |
|--------|------|
| clear() | 캔버스 초기화 |
| isEmpty() | 빈 캔버스 여부 |
| toDataURL(type?, quality?) | PNG data URL 반환 |
| undo() | 마지막 획 실행 취소 |

---

## OrgChart

조직도. 트리 구조로 조직 계층을 수직/수평 표시. 노드 접기/펼치기 지원.

```tsx
import { OrgChart } from "@sunghoon_lee/akron-ui";

<OrgChart
  data={{
    id: "ceo", name: "김대표", title: "CEO",
    children: [
      { id: "cto", name: "이기술", title: "CTO" },
      { id: "coo", name: "정운영", title: "COO" },
    ],
  }}
  onNodeClick={(node) => console.log(node)}
/>
```

### Props

| Prop | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| data | OrgNode | 필수 | 루트 노드 |
| direction | 'vertical' \| 'horizontal' | 'vertical' | 방향 |
| onNodeClick | (node: OrgNode) => void | - | 노드 클릭 콜백 |
| renderNode | (node: OrgNode) => ReactNode | - | 커스텀 노드 렌더 |
| showAvatar | boolean | true | 아바타 표시 |

### OrgNode

```ts
interface OrgNode {
  id: string;
  name: string;
  title?: string;
  avatar?: string;
  children?: OrgNode[];
  expanded?: boolean;   // 기본 true
}
```
