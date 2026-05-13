import { useState, useEffect } from "react";
import { CommandPalette, Button } from "@sunghoon_lee/akron-ui";
import { LiveCodeBlock } from "../components/LiveCodeBlock";
import {
  Home, Settings, FileText, Search, User, BarChart2,
  Bell, Moon, Sun, LogOut, HelpCircle, Keyboard,
} from "lucide-react";

export function CommandPalettePage() {
  return (
    <>
      <header className="page-header">
        <h1 className="page-title">CommandPalette</h1>
        <p className="page-description">
          ⌘K 커맨드 팔레트. 키보드 단축키로 빠르게 명령을 검색하고 실행합니다.
          그룹, 아이콘, 단축키 힌트, 최근 사용 항목을 지원합니다.
        </p>
      </header>

      <section className="docs-section" id="basic">
        <h2 className="section-title">기본 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  const [lastAction, setLastAction] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const items = [
    { id: "home", label: "홈으로", icon: <Home size={16} />, group: "페이지", onSelect: () => setLastAction("홈으로 이동") },
    { id: "settings", label: "설정", icon: <Settings size={16} />, group: "페이지", onSelect: () => setLastAction("설정 열기") },
    { id: "profile", label: "프로필", icon: <User size={16} />, group: "페이지", onSelect: () => setLastAction("프로필 열기") },
    { id: "docs", label: "문서", icon: <FileText size={16} />, group: "페이지", onSelect: () => setLastAction("문서 열기") },
    { id: "darkmode", label: "다크모드 전환", icon: <Moon size={16} />, group: "설정", onSelect: () => setLastAction("다크모드 전환") },
    { id: "notifications", label: "알림 설정", icon: <Bell size={16} />, group: "설정", onSelect: () => setLastAction("알림 설정") },
    { id: "logout", label: "로그아웃", icon: <LogOut size={16} />, group: "계정", onSelect: () => setLastAction("로그아웃") },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <Button onClick={() => setOpen(true)}>
        커맨드 팔레트 열기 (⌘K)
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        placeholder="명령어 검색..."
      />
      {lastAction && (
        <p style={{ fontSize: 13, color: "var(--ark-color-text-secondary)", margin: 0 }}>
          실행: <b>{lastAction}</b>
        </p>
      )}
    </div>
  );
}
render(<Demo />)`}
          scope={{ CommandPalette, Button, useState, useEffect, Home, Settings, User, FileText, Moon, Bell, LogOut }}
          noInline
        />
      </section>

      <section className="docs-section" id="shortcuts">
        <h2 className="section-title">단축키 힌트</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "new", label: "새 파일", icon: <FileText size={16} />, shortcut: ["⌘", "N"], onSelect: () => {} },
    { id: "save", label: "저장", icon: <FileText size={16} />, shortcut: ["⌘", "S"], onSelect: () => {} },
    { id: "search", label: "전체 검색", icon: <Search size={16} />, shortcut: ["⌘", "F"], onSelect: () => {} },
    { id: "settings", label: "설정", icon: <Settings size={16} />, shortcut: ["⌘", ","], onSelect: () => {} },
    { id: "help", label: "도움말", icon: <HelpCircle size={16} />, shortcut: ["⌘", "?"], onSelect: () => {} },
    { id: "shortcuts", label: "단축키 목록", icon: <Keyboard size={16} />, shortcut: ["⌘", "⇧", "K"], onSelect: () => {} },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>단축키 팔레트 열기</Button>
      <CommandPalette open={open} onOpenChange={setOpen} items={items} />
    </>
  );
}
render(<Demo />)`}
          scope={{ CommandPalette, Button, useState, FileText, Search, Settings, HelpCircle, Keyboard }}
          noInline
        />
      </section>

      <section className="docs-section" id="recent">
        <h2 className="section-title">최근 사용</h2>
        <LiveCodeBlock
          code={`function Demo() {
  const [open, setOpen] = useState(false);
  const items = [
    { id: "dashboard", label: "대시보드", icon: <BarChart2 size={16} />, group: "페이지", onSelect: () => {} },
    { id: "users", label: "사용자 관리", icon: <User size={16} />, group: "페이지", onSelect: () => {} },
    { id: "settings", label: "설정", icon: <Settings size={16} />, group: "페이지", onSelect: () => {} },
    { id: "reports", label: "보고서", icon: <FileText size={16} />, group: "페이지", onSelect: () => {} },
  ];
  return (
    <>
      <Button onClick={() => setOpen(true)}>팔레트 열기 (최근: dashboard, settings)</Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        items={items}
        recentIds={["dashboard", "settings"]}
      />
    </>
  );
}
render(<Demo />)`}
          scope={{ CommandPalette, Button, useState, BarChart2, User, Settings, FileText }}
          noInline
        />
      </section>

      <section className="docs-section" id="interface">
        <h2 className="section-title">인터페이스</h2>
        <h3 className="section-subtitle">CommandPalette Props</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Prop</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>open</td><td>boolean</td><td>열림 상태 (필수)</td></tr>
              <tr><td>onOpenChange</td><td>(open: boolean) =&gt; void</td><td>열림 상태 변경 핸들러 (필수)</td></tr>
              <tr><td>items</td><td>CommandItem[]</td><td>커맨드 항목 목록 (필수)</td></tr>
              <tr><td>placeholder</td><td>string</td><td>검색 입력 placeholder</td></tr>
              <tr><td>emptyMessage</td><td>string</td><td>검색 결과 없을 때 메시지</td></tr>
              <tr><td>onSearch</td><td>(query: string) =&gt; void</td><td>검색어 변경 핸들러 (서버사이드)</td></tr>
              <tr><td>loading</td><td>boolean</td><td>로딩 상태</td></tr>
              <tr><td>recentIds</td><td>string[]</td><td>최근 사용 항목 ID 목록</td></tr>
            </tbody>
          </table>
        </div>
        <h3 className="section-subtitle" style={{ marginTop: 24 }}>CommandItem</h3>
        <div className="props-table-wrapper">
          <table className="props-table">
            <thead>
              <tr><th>Field</th><th>타입</th><th>설명</th></tr>
            </thead>
            <tbody>
              <tr><td>id</td><td>string</td><td>고유 식별자 (필수)</td></tr>
              <tr><td>label</td><td>string</td><td>표시 레이블 (필수)</td></tr>
              <tr><td>description</td><td>string</td><td>부가 설명</td></tr>
              <tr><td>icon</td><td>ReactNode</td><td>아이콘</td></tr>
              <tr><td>shortcut</td><td>string[]</td><td>단축키 표시 (e.g. ["⌘", "K"])</td></tr>
              <tr><td>group</td><td>string</td><td>그룹명</td></tr>
              <tr><td>onSelect</td><td>() =&gt; void</td><td>실행 핸들러</td></tr>
              <tr><td>disabled</td><td>boolean</td><td>비활성화</td></tr>
              <tr><td>keywords</td><td>string[]</td><td>검색용 키워드 (표시 안 됨)</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
