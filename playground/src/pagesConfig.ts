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

export interface PageMeta {
  component: ComponentType;
  label: string;
  path: string;
  category: "시작하기" | "파운데이션" | "레이아웃" | "컴포넌트";
}

export const categories = ["시작하기", "파운데이션", "레이아웃", "컴포넌트"] as const;

export const pages: PageMeta[] = [
  { path: "overview", component: OverviewPage, label: "소개", category: "시작하기" },
  { path: "colors", component: ColorsPage, label: "Colors", category: "파운데이션" },
  { path: "typography", component: TypographyPage, label: "Typography", category: "파운데이션" },
  { path: "spacing", component: SpacingPage, label: "Spacing", category: "파운데이션" },
  { path: "app-shell", component: AppShellPage, label: "AppShell", category: "레이아웃" },
  { path: "layout-header", component: HeaderPage, label: "Header", category: "레이아웃" },
  { path: "layout-sidebar", component: LayoutSidebarPage, label: "Sidebar", category: "레이아웃" },
  { path: "layout-footer", component: FooterPage, label: "Footer", category: "레이아웃" },
  { path: "page-container", component: PageContainerPage, label: "PageContainer", category: "레이아웃" },
  { path: "stack", component: StackPage, label: "Stack", category: "레이아웃" },
  { path: "button", component: ButtonPage, label: "Button", category: "컴포넌트" },
  { path: "input", component: InputPage, label: "Input", category: "컴포넌트" },
  { path: "card", component: CardPage, label: "Card", category: "컴포넌트" },
  { path: "table", component: TablePage, label: "Table", category: "컴포넌트" },
  { path: "modal", component: ModalPage, label: "Modal", category: "컴포넌트" },
  { path: "toast", component: ToastPage, label: "Toast", category: "컴포넌트" },
];

export function getPageByPath(pathname: string): PageMeta | undefined {
  const slug = pathname.replace(/^\//, "") || "overview";
  return pages.find((p) => p.path === slug);
}
