import { forwardRef } from "react";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import styles from "./Checkbox.module.css";

export interface CheckboxProps {
  /** 체크 상태 */
  checked?: boolean | "indeterminate";
  /** 기본 체크 상태 (비제어) */
  defaultChecked?: boolean;
  /** 상태 변경 핸들러 */
  onCheckedChange?: (checked: boolean | "indeterminate") => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 보조 텍스트 */
  description?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 체크박스 크기 */
  size?: "sm" | "md" | "lg";
  /** 고유 id (label 연결용) */
  id?: string;
  /** name 속성 (폼 제출용) */
  name?: string;
  /** value 속성 (폼 제출용) */
  value?: string;
  className?: string;
}

export const Checkbox = forwardRef<HTMLButtonElement, CheckboxProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      description,
      disabled = false,
      error = false,
      errorMessage,
      size = "md",
      id,
      name,
      value,
      className,
    },
    ref,
  ) => {
    const isIndeterminate = checked === "indeterminate";

    return (
      <div
        className={[
          styles.wrapper,
          styles[size],
          disabled ? styles.disabled : "",
          error ? styles.error : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className={styles.row}>
          <RadixCheckbox.Root
            ref={ref}
            id={id}
            name={name}
            value={value}
            checked={checked}
            defaultChecked={defaultChecked}
            onCheckedChange={onCheckedChange}
            disabled={disabled}
            className={styles.checkbox}
          >
            <RadixCheckbox.Indicator className={styles.indicator}>
              {isIndeterminate ? (
                <Minus className={styles.icon} />
              ) : (
                <Check className={styles.icon} strokeWidth={3} />
              )}
            </RadixCheckbox.Indicator>
          </RadixCheckbox.Root>

          {(label || description) && (
            <div className={styles.content}>
              {label && (
                <label htmlFor={id} className={styles.label}>
                  {label}
                </label>
              )}
              {description && (
                <span className={styles.description}>{description}</span>
              )}
            </div>
          )}
        </div>

        {error && errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";
