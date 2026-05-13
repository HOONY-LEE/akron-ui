import { forwardRef } from "react";
import * as RadixSelect from "@radix-ui/react-select";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

function isGroup(item: SelectItem): item is SelectGroup {
  return "options" in item;
}

export interface SelectProps {
  /** 선택된 값 */
  value?: string;
  /** 기본 선택 값 (비제어) */
  defaultValue?: string;
  /** 변경 핸들러 */
  onValueChange?: (value: string) => void;
  /** 옵션 목록 (SelectOption[] 또는 SelectGroup[]) */
  options: SelectItem[];
  /** 플레이스홀더 */
  placeholder?: string;
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** name 속성 */
  name?: string;
  /** 오픈 상태 (제어) */
  open?: boolean;
  /** 기본 오픈 상태 (비제어) */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export const Select = forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options,
      placeholder = "선택하세요",
      label,
      helperText,
      errorMessage,
      error = false,
      disabled = false,
      size = "md",
      name,
      open,
      defaultOpen,
      onOpenChange,
      className,
    },
    ref,
  ) => {
    const isError = error || Boolean(errorMessage);

    return (
      <div
        className={[
          styles.wrapper,
          styles[size],
          isError ? styles.error : "",
          disabled ? styles.disabled : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && <label className={styles.label}>{label}</label>}

        <RadixSelect.Root
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
          open={open}
          defaultOpen={defaultOpen}
          onOpenChange={onOpenChange}
        >
          <RadixSelect.Trigger ref={ref} className={styles.trigger}>
            <RadixSelect.Value placeholder={placeholder} />
            <RadixSelect.Icon className={styles.icon}>
              <ChevronDown size={14} />
            </RadixSelect.Icon>
          </RadixSelect.Trigger>

          <RadixSelect.Portal>
            <RadixSelect.Content
              className={styles.content}
              position="popper"
              sideOffset={4}
            >
              <RadixSelect.ScrollUpButton className={styles.scrollBtn}>
                <ChevronUp size={14} />
              </RadixSelect.ScrollUpButton>

              <RadixSelect.Viewport className={styles.viewport}>
                {options.map((item, i) =>
                  isGroup(item) ? (
                    <RadixSelect.Group key={i}>
                      <RadixSelect.Label className={styles.groupLabel}>
                        {item.label}
                      </RadixSelect.Label>
                      {item.options.map((opt) => (
                        <SelectOptionItem key={opt.value} option={opt} />
                      ))}
                    </RadixSelect.Group>
                  ) : (
                    <SelectOptionItem key={item.value} option={item} />
                  ),
                )}
              </RadixSelect.Viewport>

              <RadixSelect.ScrollDownButton className={styles.scrollBtn}>
                <ChevronDown size={14} />
              </RadixSelect.ScrollDownButton>
            </RadixSelect.Content>
          </RadixSelect.Portal>
        </RadixSelect.Root>

        {(helperText || errorMessage) && (
          <span className={isError ? styles.errorMessage : styles.helperText}>
            {isError ? errorMessage : helperText}
          </span>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

/* ── Option Item ── */
function SelectOptionItem({ option }: { option: SelectOption }) {
  return (
    <RadixSelect.Item
      value={option.value}
      disabled={option.disabled}
      className={styles.item}
    >
      <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.itemIndicator}>
        <Check size={12} strokeWidth={3} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}
