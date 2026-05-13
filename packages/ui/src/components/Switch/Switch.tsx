import { forwardRef } from "react";
import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./Switch.module.css";

export interface SwitchProps {
  /** 켜짐/꺼짐 상태 */
  checked?: boolean;
  /** 기본 상태 (비제어) */
  defaultChecked?: boolean;
  /** 상태 변경 핸들러 */
  onCheckedChange?: (checked: boolean) => void;
  /** 라벨 텍스트 */
  label?: string;
  /** 보조 텍스트 */
  description?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 스위치 크기 */
  size?: "sm" | "md" | "lg";
  /** 라벨 위치 */
  labelPosition?: "left" | "right";
  /** 고유 id */
  id?: string;
  /** name 속성 */
  name?: string;
  /** value 속성 */
  value?: string;
  className?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (
    {
      checked,
      defaultChecked,
      onCheckedChange,
      label,
      description,
      disabled = false,
      size = "md",
      labelPosition = "right",
      id,
      name,
      value,
      className,
    },
    ref,
  ) => {
    const switchId = id ?? `switch-${Math.random().toString(36).slice(2, 7)}`;

    return (
      <div
        className={[
          styles.wrapper,
          styles[size],
          disabled ? styles.disabled : "",
          labelPosition === "left" ? styles.labelLeft : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {labelPosition === "left" && (label || description) && (
          <div className={styles.content}>
            {label && (
              <label htmlFor={switchId} className={styles.label}>
                {label}
              </label>
            )}
            {description && (
              <span className={styles.description}>{description}</span>
            )}
          </div>
        )}

        <RadixSwitch.Root
          ref={ref}
          id={switchId}
          name={name}
          value={value}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          className={styles.switch}
        >
          <RadixSwitch.Thumb className={styles.thumb} />
        </RadixSwitch.Root>

        {labelPosition === "right" && (label || description) && (
          <div className={styles.content}>
            {label && (
              <label htmlFor={switchId} className={styles.label}>
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

Switch.displayName = "Switch";
