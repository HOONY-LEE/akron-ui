import { forwardRef } from "react";
import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import styles from "./Radio.module.css";

/* ── RadioGroup ── */
export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  /** 선택된 값 */
  value?: string;
  /** 기본 선택 값 (비제어) */
  defaultValue?: string;
  /** 변경 핸들러 */
  onValueChange?: (value: string) => void;
  /** 옵션 목록 */
  options: RadioOption[];
  /** 방향 */
  direction?: "vertical" | "horizontal";
  /** 비활성화 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 라디오 크기 */
  size?: "sm" | "md" | "lg";
  /** name 속성 */
  name?: string;
  className?: string;
}

export const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value,
      defaultValue,
      onValueChange,
      options,
      direction = "vertical",
      disabled = false,
      error = false,
      errorMessage,
      size = "md",
      name,
      className,
    },
    ref,
  ) => {
    return (
      <div
        className={[
          styles.groupWrapper,
          error ? styles.error : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <RadixRadioGroup.Root
          ref={ref}
          value={value}
          defaultValue={defaultValue}
          onValueChange={onValueChange}
          disabled={disabled}
          name={name}
          className={[
            styles.group,
            styles[direction],
          ].join(" ")}
        >
          {options.map((option) => (
            <RadioItem
              key={option.value}
              value={option.value}
              label={option.label}
              description={option.description}
              disabled={option.disabled}
              size={size}
              error={error}
            />
          ))}
        </RadixRadioGroup.Root>

        {error && errorMessage && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  },
);

RadioGroup.displayName = "RadioGroup";

/* ── RadioItem (internal) ── */
interface RadioItemProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  error?: boolean;
  id?: string;
}

function RadioItem({
  value,
  label,
  description,
  disabled,
  size = "md",
  error,
  id,
}: RadioItemProps) {
  const itemId = id ?? `radio-${value}`;

  return (
    <div
      className={[
        styles.item,
        styles[size],
        disabled ? styles.disabled : "",
        error ? styles.errorItem : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <RadixRadioGroup.Item
        id={itemId}
        value={value}
        disabled={disabled}
        className={styles.radio}
      >
        <RadixRadioGroup.Indicator className={styles.indicator} />
      </RadixRadioGroup.Item>

      {(label || description) && (
        <div className={styles.content}>
          {label && (
            <label htmlFor={itemId} className={styles.label}>
              {label}
            </label>
          )}
          {description && (
            <span className={styles.description}>{description}</span>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Single Radio (standalone) ── */
export interface RadioProps {
  value: string;
  label?: string;
  description?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  id?: string;
  className?: string;
}

export const Radio = forwardRef<HTMLButtonElement, RadioProps>(
  ({ value, label, description, disabled, size = "md", id, className }, ref) => {
    const itemId = id ?? `radio-${value}`;

    return (
      <div
        className={[
          styles.item,
          styles[size],
          disabled ? styles.disabled : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <RadixRadioGroup.Item
          ref={ref}
          id={itemId}
          value={value}
          disabled={disabled}
          className={styles.radio}
        >
          <RadixRadioGroup.Indicator className={styles.indicator} />
        </RadixRadioGroup.Item>

        {(label || description) && (
          <div className={styles.content}>
            {label && (
              <label htmlFor={itemId} className={styles.label}>
                {label}
              </label>
            )}
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </div>
        )}
      </div>
    );
  },
);

Radio.displayName = "Radio";
