# @akron/ui

Enterprise Groupware / ERP를 위한 React UI 컴포넌트 라이브러리.

## 설치

```bash
pnpm add @akron/ui
```

Peer dependencies:

```bash
pnpm add react react-dom
```

## 사용법

### CSS 토큰 로드

앱 진입점에서 스타일을 import합니다:

```tsx
import "@akron/ui/styles.css";
```

### 컴포넌트 사용

```tsx
import { Button, Input, Card, Modal, ToastProvider, useToast } from "@akron/ui";

function App() {
  return (
    <ToastProvider>
      <Card>
        <Input label="이메일" type="email" placeholder="name@company.com" />
        <Button variant="primary" size="md">
          로그인
        </Button>
      </Card>
    </ToastProvider>
  );
}
```

### Table

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@akron/ui";

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>이름</TableHead>
      <TableHead numeric>금액</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>홍길동</TableCell>
      <TableCell numeric>1,200,000</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Modal

```tsx
import { Modal, Button } from "@akron/ui";

function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>열기</Button>
      <Modal open={open} onOpenChange={setOpen} title="확인" size="sm">
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </>
  );
}
```

### Toast

```tsx
import { useToast } from "@akron/ui";

function SaveButton() {
  const toast = useToast();

  return (
    <Button onClick={() => toast({ type: "success", title: "저장 완료" })}>
      저장
    </Button>
  );
}
```

## 다크모드

루트 요소에 `data-theme="dark"` 속성을 추가하면 자동으로 다크모드가 적용됩니다:

```html
<html data-theme="dark">
```

## 토큰 커스터마이징

CSS 변수를 오버라이드하여 디자인 토큰을 커스터마이징할 수 있습니다:

```css
:root {
  --ark-color-primary-500: #0EA5E9;
  --ark-color-primary-600: #0284C7;
  --ark-radius-md: 8px;
}
```

모든 토큰 목록은 `src/tokens/tokens.css`를 참고하세요.

## 빌드

```bash
pnpm build
```

ESM과 CJS 듀얼 빌드를 생성합니다.
