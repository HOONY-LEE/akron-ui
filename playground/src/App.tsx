import { useState, useEffect, type ReactNode } from "react";
import { Routes, Route, Navigate, useLocation, useNavigate, Link } from "react-router-dom";
import {
  AppShell,
  Header,
  LayoutSidebar,
  SidebarGroup,
  SidebarItem,
  ToastProvider,
} from "@sunghoon_lee/akron-ui";
import {
  BookOpen, Palette, Type, Ruler,
  LayoutGrid, PanelTop, PanelLeft, PanelBottom, Box, Layers,
  MousePointerClick, TextCursorInput, CreditCard, Table, Maximize2, Bell,
  Moon, Sun, Menu,
  CheckSquare, Circle, ToggleLeft, ChevronDown, AlignLeft, CalendarDays,
  Phone, Mail, Upload,
  Tag, Hash, UserCircle, Info, AlertTriangle, Loader, Activity, RotateCw,
  Grid3X3, CalendarRange, List, Clock,
  PanelsTopLeft, Navigation, ArrowLeftRight, Footprints, ChevronsUpDown, MoreHorizontal,
  Layers2, Move, Minus, FileText, SlidersHorizontal, Image, Sparkles,
  // 추가 아이콘
  LayoutDashboard, Split, Lock, Calculator, Star, Key, Tags, ListFilter,
  ListChecks, Paintbrush, ToggleRight, Combine, Loader2, Highlighter,
  EyeOff, Film, Table2, FolderTree, Inbox, BarChart3, MousePointer2,
  Command, PanelRight, BellRing, Compass, Keyboard, Clipboard, ScrollText,
  Timer, Ratio, MoveHorizontal, MessageCircle, Paintbrush2, ShieldAlert,
  Megaphone, Award, Gem, Hourglass, CircleDot, BookOpenCheck, ArrowUpToLine,
  PenLine, ArrowRightLeft, Code2, PenTool, FlipHorizontal, DollarSign,
  ListOrdered, TrendingUp, StickyNote, History, Gauge, Terminal, GitCompare,
  GripVertical, Braces, Binary, ListTodo, PieChart, Zap, Scan, GitBranch,
} from "lucide-react";
import { SearchBox } from "./components/SearchBox";
import { TableOfContents } from "./components/TableOfContents";
import { pages, categories, getPageByPath } from "./pagesConfig";
import { AppShellPreview } from "./pages/previews/AppShellPreview";
import { HeaderPreview } from "./pages/previews/HeaderPreview";
import { SidebarPreview } from "./pages/previews/SidebarPreview";
import { FooterPreview } from "./pages/previews/FooterPreview";
import { PageContainerPreview } from "./pages/previews/PageContainerPreview";
import "./global.css";

const pageIcons: Record<string, ReactNode> = {
  // 시작하기
  overview: <BookOpen size={16} />,
  // 파운데이션
  colors: <Palette size={16} />,
  typography: <Type size={16} />,
  spacing: <Ruler size={16} />,
  // 레이아웃
  "app-shell": <LayoutGrid size={16} />,
  "layout-header": <PanelTop size={16} />,
  "layout-sidebar": <PanelLeft size={16} />,
  "layout-footer": <PanelBottom size={16} />,
  "page-container": <Box size={16} />,
  stack: <Layers size={16} />,
  "masonry-grid": <LayoutDashboard size={16} />,
  "resizable-panels": <GripVertical size={16} />,
  // 입력
  button: <MousePointerClick size={16} />,
  "split-button": <Split size={16} />,
  input: <TextCursorInput size={16} />,
  "password-input": <Lock size={16} />,
  checkbox: <CheckSquare size={16} />,
  radio: <Circle size={16} />,
  switch: <ToggleLeft size={16} />,
  select: <ChevronDown size={16} />,
  textarea: <AlignLeft size={16} />,
  "date-picker": <CalendarDays size={16} />,
  "phone-input": <Phone size={16} />,
  "email-input": <Mail size={16} />,
  "file-upload": <Upload size={16} />,
  "number-input": <Calculator size={16} />,
  slider: <SlidersHorizontal size={16} />,
  rating: <Star size={16} />,
  "otp-input": <Key size={16} />,
  "tag-input": <Tags size={16} />,
  combobox: <ListFilter size={16} />,
  "multi-select": <ListChecks size={16} />,
  "color-picker": <Paintbrush size={16} />,
  "segmented-control": <ToggleRight size={16} />,
  "input-group": <Combine size={16} />,
  "inline-edit": <PenLine size={16} />,
  "transfer-list": <ArrowRightLeft size={16} />,
  checklist: <ListTodo size={16} />,
  // 표시
  badge: <Hash size={16} />,
  chip: <Tag size={16} />,
  avatar: <UserCircle size={16} />,
  tooltip: <Info size={16} />,
  alert: <AlertTriangle size={16} />,
  skeleton: <Loader size={16} />,
  progress: <Activity size={16} />,
  spinner: <RotateCw size={16} />,
  "loading-overlay": <Loader2 size={16} />,
  highlight: <Highlighter size={16} />,
  spoiler: <EyeOff size={16} />,
  "empty-state": <Inbox size={16} />,
  "stat-card": <BarChart3 size={16} />,
  "code-snippet": <Code2 size={16} />,
  "flip-card": <FlipHorizontal size={16} />,
  "pricing-card": <DollarSign size={16} />,
  ticker: <TrendingUp size={16} />,
  "sticky-note": <StickyNote size={16} />,
  "time-ago": <History size={16} />,
  gauge: <Gauge size={16} />,
  "log-viewer": <Terminal size={16} />,
  "diff-viewer": <GitCompare size={16} />,
  "json-viewer": <Braces size={16} />,
  "animated-counter": <Binary size={16} />,
  "file-tree": <FolderTree size={16} />,
  "meter-group": <PieChart size={16} />,
  callout: <Megaphone size={16} />,
  ribbon: <Award size={16} />,
  "glass-card": <Gem size={16} />,
  "progress-ring": <CircleDot size={16} />,
  // 데이터
  card: <CreditCard size={16} />,
  "media-card": <Film size={16} />,
  table: <Table size={16} />,
  "data-table": <Table2 size={16} />,
  sheet: <Grid3X3 size={16} />,
  calendar: <CalendarRange size={16} />,
  "list-view": <List size={16} />,
  timeline: <Clock size={16} />,
  "tree-view": <GitBranch size={16} />,
  // 네비게이션
  tabs: <PanelsTopLeft size={16} />,
  breadcrumb: <Navigation size={16} />,
  pagination: <ArrowLeftRight size={16} />,
  stepper: <Footprints size={16} />,
  accordion: <ChevronsUpDown size={16} />,
  menu: <MoreHorizontal size={16} />,
  "context-menu": <MousePointer2 size={16} />,
  "command-palette": <Command size={16} />,
  "step-indicator": <ListOrdered size={16} />,
  // 오버레이
  modal: <Maximize2 size={16} />,
  toast: <Bell size={16} />,
  popover: <Layers2 size={16} />,
  "hover-card": <Scan size={16} />,
  "floating-action": <Move size={16} />,
  drawer: <PanelRight size={16} />,
  "notification-center": <BellRing size={16} />,
  tour: <Compass size={16} />,
  "confirm-dialog": <ShieldAlert size={16} />,
  spotlight: <Zap size={16} />,
  // 기타
  kbd: <Keyboard size={16} />,
  "copy-button": <Clipboard size={16} />,
  "scroll-area": <ScrollText size={16} />,
  "number-ticker": <Timer size={16} />,
  "aspect-ratio": <Ratio size={16} />,
  marquee: <MoveHorizontal size={16} />,
  carousel: <Image size={16} />,
  icon: <Sparkles size={16} />,
  divider: <Minus size={16} />,
  form: <FileText size={16} />,
  "chat-bubble": <MessageCircle size={16} />,
  "gradient-text": <Paintbrush2 size={16} />,
  "countdown-timer": <Hourglass size={16} />,
  "reading-progress": <BookOpenCheck size={16} />,
  "back-to-top": <ArrowUpToLine size={16} />,
  typewriter: <PenTool size={16} />,
};

export function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    const el = document.querySelector("[data-appshell-body]");
    if (el) el.scrollTop = 0;
    else window.scrollTo(0, 0);
    setSidebarOpen(false);
  }, [location.pathname]);

  if (location.pathname.startsWith("/preview")) {
    return (
      <ToastProvider>
        <Routes>
          <Route path="/preview/app-shell" element={<AppShellPreview />} />
          <Route path="/preview/header" element={<HeaderPreview />} />
          <Route path="/preview/sidebar" element={<SidebarPreview />} />
          <Route path="/preview/footer" element={<FooterPreview />} />
          <Route path="/preview/page-container" element={<PageContainerPreview />} />
        </Routes>
      </ToastProvider>
    );
  }

  const currentPage = getPageByPath(location.pathname);
  const currentPath = currentPage?.path ?? "overview";

  const sidebar = (
    <LayoutSidebar
      header={
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{
              width: 28, height: 28, borderRadius: 8,
              background: "var(--ark-color-primary-500)", color: "#fff",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 700, fontSize: 14, flexShrink: 0,
            }}>A</span>
            <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>Akron UI</span>
          </div>
          <button
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle theme"
            style={{
              width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center",
              border: "1px solid var(--ark-color-border)", borderRadius: 8,
              background: "var(--ark-color-bg)", color: "var(--ark-color-text-secondary)",
              cursor: "pointer", flexShrink: 0,
            }}
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>
      }
      collapsed={collapsed}
      onCollapse={() => setCollapsed(true)}
      onExpand={() => setCollapsed(false)}
    >
      {categories.map((category) => {
        const items = pages.filter((p) => p.category === category);
        if (items.length === 0) return null;
        return (
          <SidebarGroup key={category} label={category} collapsible>
            {items.map((item) => (
              <SidebarItem
                key={item.path}
                active={item.path === currentPath}
                icon={pageIcons[item.path]}
                tooltip={item.label}
                onClick={() => navigate(`/${item.path}`)}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 6, width: "100%" }}>
                  {item.label}
                  {item.status === "planned" && (
                    <span style={{
                      fontSize: 9,
                      fontWeight: 600,
                      color: "var(--ark-color-text-disabled)",
                      backgroundColor: "var(--ark-color-bg-muted)",
                      padding: "1px 5px",
                      borderRadius: 4,
                      lineHeight: "14px",
                      flexShrink: 0,
                      marginLeft: "auto",
                    }}>
                      예정
                    </span>
                  )}
                </span>
              </SidebarItem>
            ))}
          </SidebarGroup>
        );
      })}
    </LayoutSidebar>
  );

  return (
    <ToastProvider>
      <AppShell
        sidebar={sidebar}
        sidebarWidth={260}
        sidebarCollapsed={collapsed}
        sidebarOpen={sidebarOpen}
        onSidebarClose={() => setSidebarOpen(false)}
      >
        <Header
          sticky
          menuButton={
            <button
              onClick={() => setSidebarOpen(true)}
              aria-label="메뉴 열기"
              style={{
                width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                border: "1px solid var(--ark-color-border)", borderRadius: 8,
                background: "var(--ark-color-bg)", color: "var(--ark-color-text-secondary)",
                cursor: "pointer",
              }}
            >
              <Menu size={18} />
            </button>
          }
          logo={
            currentPage ? (
              <div className="docs-breadcrumb">
                <span className="breadcrumb-root">{currentPage.category}</span>
                <span className="breadcrumb-separator">/</span>
                <span className="breadcrumb-current">{currentPage.label}</span>
              </div>
            ) : undefined
          }
          actions={<SearchBox />}
        />
        <div className="docs-main">
          <div className="docs-content">
            <Routes>
              <Route path="/" element={<Navigate to="/overview" replace />} />
              {pages.map((p) => (
                <Route key={p.path} path={`/${p.path}`} element={<p.component />} />
              ))}
            </Routes>
            <DocsPagination />
          </div>
          <TableOfContents currentPage={currentPath} />
        </div>
      </AppShell>
    </ToastProvider>
  );
}

function DocsPagination() {
  const location = useLocation();
  const currentPage = getPageByPath(location.pathname);
  if (!currentPage) return null;

  const idx = pages.indexOf(currentPage);
  const prev = idx > 0 ? pages[idx - 1] : null;
  const next = idx < pages.length - 1 ? pages[idx + 1] : null;

  return (
    <nav className="docs-pagination">
      {prev ? (
        <Link to={`/${prev.path}`} className="pagination-btn prev">
          <span className="pagination-label">이전</span>
          <span className="pagination-title">{prev.label}</span>
        </Link>
      ) : (
        <div />
      )}
      {next ? (
        <Link to={`/${next.path}`} className="pagination-btn next">
          <span className="pagination-label">다음</span>
          <span className="pagination-title">{next.label}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
