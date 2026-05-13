import { forwardRef } from "react";
import * as RadixPopover from "@radix-ui/react-popover";
import { X } from "lucide-react";
import styles from "./Popover.module.css";

export type PopoverSide = "top" | "right" | "bottom" | "left";
export type PopoverAlign = "start" | "center" | "end";

export interface PopoverProps {
  /** 트리거 요소 */
  trigger: React.ReactElement;
  /** 팝오버 내용 */
  children: React.ReactNode;
  /** 표시 방향 */
  side?: PopoverSide;
  /** 정렬 */
  align?: PopoverAlign;
  /** 트리거와의 간격 */
  sideOffset?: number;
  /** 닫기 버튼 표시 */
  showClose?: boolean;
  /** 열림 상태 제어 */
  open?: boolean;
  /** 기본 열림 여부 */
  defaultOpen?: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 팝오버 너비 */
  width?: string | number;
  className?: string;
}

export const Popover = forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      trigger,
      children,
      side = "bottom",
      align = "start",
      sideOffset = 8,
      showClose = false,
      open,
      defaultOpen,
      onOpenChange,
      width,
      className,
    },
    ref,
  ) => {
    return (
      <RadixPopover.Root
        open={open}
        defaultOpen={defaultOpen}
        onOpenChange={onOpenChange}
      >
        <RadixPopover.Trigger asChild>
          {trigger}
        </RadixPopover.Trigger>
        <RadixPopover.Portal>
          <RadixPopover.Content
            ref={ref}
            side={side}
            align={align}
            sideOffset={sideOffset}
            className={[styles.content, className ?? ""].filter(Boolean).join(" ")}
            style={width ? { width: typeof width === "number" ? `${width}px` : width } : undefined}
          >
            {children}
            {showClose && (
              <RadixPopover.Close className={styles.closeBtn} aria-label="닫기">
                <X size={14} />
              </RadixPopover.Close>
            )}
            <RadixPopover.Arrow className={styles.arrow} />
          </RadixPopover.Content>
        </RadixPopover.Portal>
      </RadixPopover.Root>
    );
  },
);

Popover.displayName = "Popover";
