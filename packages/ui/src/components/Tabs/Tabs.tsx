import { forwardRef } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";

export type TabsVariant = "line" | "solid" | "pill";
export type TabsSize = "sm" | "md" | "lg";

/* ── Root ── */
export interface TabsProps {
  /** 선택된 탭 값 */
  value?: string;
  /** 기본 선택 탭 (비제어) */
  defaultValue?: string;
  /** 탭 변경 핸들러 */
  onValueChange?: (value: string) => void;
  /** 시각적 스타일 */
  variant?: TabsVariant;
  /** 크기 */
  size?: TabsSize;
  children: React.ReactNode;
  className?: string;
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      variant = "line",
      size = "md",
      children,
      className,
    },
    ref,
  ) => {
    return (
      <RadixTabs.Root
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        className={[
          styles.root,
          styles[variant],
          styles[size],
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {children}
      </RadixTabs.Root>
    );
  },
);

Tabs.displayName = "Tabs";

/* ── List ── */
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ children, className }, ref) => {
    return (
      <RadixTabs.List
        ref={ref}
        className={[styles.list, className ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </RadixTabs.List>
    );
  },
);

TabsList.displayName = "TabsList";

/* ── Trigger ── */
export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ value, children, disabled, className }, ref) => {
    return (
      <RadixTabs.Trigger
        ref={ref}
        value={value}
        disabled={disabled}
        className={[styles.trigger, className ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </RadixTabs.Trigger>
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

/* ── Content ── */
export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ value, children, className }, ref) => {
    return (
      <RadixTabs.Content
        ref={ref}
        value={value}
        className={[styles.content, className ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </RadixTabs.Content>
    );
  },
);

TabsContent.displayName = "TabsContent";
