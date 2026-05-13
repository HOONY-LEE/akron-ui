import { forwardRef } from "react";
import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import styles from "./Accordion.module.css";

/* ── Root ── */
export type AccordionType = "single" | "multiple";

export interface AccordionProps {
  /** 단일 또는 다중 열기 */
  type?: AccordionType;
  /** 선택된 아이템 값 (단일, 제어) */
  value?: string;
  /** 기본 선택 아이템 (단일, 비제어) */
  defaultValue?: string;
  /** 선택된 아이템 값들 (다중, 제어) */
  values?: string[];
  /** 기본 선택 아이템들 (다중, 비제어) */
  defaultValues?: string[];
  /** 변경 핸들러 */
  onValueChange?: (value: string) => void;
  onValuesChange?: (values: string[]) => void;
  /** 열린 상태 유지 (single 모드) */
  collapsible?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      type = "single",
      value,
      defaultValue,
      values,
      defaultValues,
      onValueChange,
      onValuesChange,
      collapsible = true,
      children,
      className,
    },
    ref,
  ) => {
    const cls = [styles.root, className ?? ""].filter(Boolean).join(" ");

    if (type === "multiple") {
      return (
        <RadixAccordion.Root
          ref={ref}
          type="multiple"
          value={values}
          defaultValue={defaultValues}
          onValueChange={onValuesChange}
          className={cls}
        >
          {children}
        </RadixAccordion.Root>
      );
    }

    return (
      <RadixAccordion.Root
        ref={ref}
        type="single"
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        collapsible={collapsible}
        className={cls}
      >
        {children}
      </RadixAccordion.Root>
    );
  },
);

Accordion.displayName = "Accordion";

/* ── Item ── */
export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const AccordionItem = forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ value, children, disabled, className }, ref) => {
    return (
      <RadixAccordion.Item
        ref={ref}
        value={value}
        disabled={disabled}
        className={[styles.item, className ?? ""].filter(Boolean).join(" ")}
      >
        {children}
      </RadixAccordion.Item>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

/* ── Trigger ── */
export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ children, className }, ref) => {
    return (
      <RadixAccordion.Header className={styles.header}>
        <RadixAccordion.Trigger
          ref={ref}
          className={[styles.trigger, className ?? ""].filter(Boolean).join(" ")}
        >
          <span className={styles.triggerLabel}>{children}</span>
          <ChevronDown className={styles.chevron} size={16} />
        </RadixAccordion.Trigger>
      </RadixAccordion.Header>
    );
  },
);

AccordionTrigger.displayName = "AccordionTrigger";

/* ── Content ── */
export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, className }, ref) => {
    return (
      <RadixAccordion.Content
        ref={ref}
        className={[styles.contentWrapper, className ?? ""].filter(Boolean).join(" ")}
      >
        <div className={styles.content}>{children}</div>
      </RadixAccordion.Content>
    );
  },
);

AccordionContent.displayName = "AccordionContent";
