import { forwardRef } from "react";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import styles from "./Tooltip.module.css";

export type TooltipSide = "top" | "right" | "bottom" | "left";
export type TooltipAlign = "start" | "center" | "end";

export interface TooltipProps {
  /** 툴팁 내용 */
  content: React.ReactNode;
  /** 트리거 엘리먼트 */
  children: React.ReactNode;
  /** 표시 방향 */
  side?: TooltipSide;
  /** 정렬 */
  align?: TooltipAlign;
  /** 지연 시간 (ms) */
  delayDuration?: number;
  /** 비활성화 */
  disabled?: boolean;
  /** 화살표 표시 */
  arrow?: boolean;
  /** 오픈 여부 (제어) */
  open?: boolean;
  /** 기본 오픈 여부 */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delayDuration = 400,
  disabled = false,
  arrow = true,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps) {
  if (disabled) {
    return <>{children}</>;
  }

  return (
    <RadixTooltip.Provider delayDuration={delayDuration}>
      <RadixTooltip.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <RadixTooltip.Trigger asChild>
          {children}
        </RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            align={align}
            sideOffset={6}
            className={styles.content}
          >
            {content}
            {arrow && <RadixTooltip.Arrow className={styles.arrow} />}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
}

Tooltip.displayName = "Tooltip";

/* ── TooltipProvider (for app-level wrapping) ── */
export interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
  skipDelayDuration?: number;
}

export function TooltipProvider({
  children,
  delayDuration = 400,
  skipDelayDuration = 300,
}: TooltipProviderProps) {
  return (
    <RadixTooltip.Provider
      delayDuration={delayDuration}
      skipDelayDuration={skipDelayDuration}
    >
      {children}
    </RadixTooltip.Provider>
  );
}
