import React, { forwardRef, useState, useId } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./PasswordInput.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type PasswordInputSize = "sm" | "md" | "lg";

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "type"> {
  /** 입력 크기 */
  size?: PasswordInputSize;
  /** 레이블 */
  label?: string;
  /** 오류 메시지 */
  error?: string;
  /** 도움말 텍스트 */
  hint?: string;
  /** 전체 너비 */
  fullWidth?: boolean;
  /** 비밀번호 표시/숨김 토글 표시 여부 */
  showToggle?: boolean;
  /** 비밀번호 강도 표시 여부 */
  showStrength?: boolean;
}

// ─── Password strength ────────────────────────────────────────────────────────

interface StrengthResult {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
}

function getPasswordStrength(password: string): StrengthResult {
  if (!password) return { score: 0, label: "" };

  let score = 0;
  if (password.length >= 8) score++;
  if (password.length >= 12) score++;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const clamped = Math.min(score, 4) as 0 | 1 | 2 | 3 | 4;
  const labels = ["", "약함", "보통", "강함", "매우 강함"];
  return { score: clamped, label: labels[clamped] };
}

// ─── PasswordInput ────────────────────────────────────────────────────────────

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  (
    {
      size = "md",
      label,
      error,
      hint,
      fullWidth = false,
      showToggle = true,
      showStrength = false,
      className,
      id: idProp,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(false);
    const [internalValue, setInternalValue] = useState(
      (defaultValue as string) ?? "",
    );
    const generatedId = useId();
    const id = idProp ?? generatedId;

    const isControlled = value !== undefined;
    const currentValue = isControlled ? (value as string) : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const strength = showStrength ? getPasswordStrength(currentValue) : null;

    const wrapperClass = [
      styles.wrapper,
      fullWidth && styles.fullWidth,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const inputWrapClass = [
      styles.inputWrap,
      styles[`size-${size}`],
      error && styles.inputError,
      disabled && styles.inputDisabled,
    ]
      .filter(Boolean)
      .join(" ");

    const iconSize = size === "sm" ? 14 : size === "lg" ? 18 : 16;

    return (
      <div className={wrapperClass}>
        {label && (
          <label htmlFor={id} className={styles.label}>
            {label}
          </label>
        )}

        <div className={inputWrapClass}>
          <input
            ref={ref}
            id={id}
            type={visible ? "text" : "password"}
            className={styles.input}
            value={isControlled ? value : internalValue}
            defaultValue={isControlled ? undefined : undefined}
            onChange={handleChange}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              [error && `${id}-error`, hint && `${id}-hint`]
                .filter(Boolean)
                .join(" ") || undefined
            }
            {...props}
          />

          {showToggle && (
            <button
              type="button"
              className={styles.toggleBtn}
              onClick={() => setVisible((v) => !v)}
              aria-label={visible ? "비밀번호 숨기기" : "비밀번호 표시"}
              tabIndex={-1}
              disabled={disabled}
            >
              {visible ? <EyeOff size={iconSize} /> : <Eye size={iconSize} />}
            </button>
          )}
        </div>

        {/* Strength meter */}
        {showStrength && currentValue && strength && (
          <div className={styles.strengthWrap}>
            <div className={styles.strengthBars}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={[
                    styles.strengthBar,
                    strength.score >= i && styles[`strength${strength.score}`],
                  ]
                    .filter(Boolean)
                    .join(" ")}
                />
              ))}
            </div>
            {strength.label && (
              <span
                className={[styles.strengthLabel, styles[`strengthText${strength.score}`]]
                  .filter(Boolean)
                  .join(" ")}
              >
                {strength.label}
              </span>
            )}
          </div>
        )}

        {error && (
          <p id={`${id}-error`} className={styles.errorMsg} role="alert">
            {error}
          </p>
        )}
        {hint && !error && (
          <p id={`${id}-hint`} className={styles.hint}>
            {hint}
          </p>
        )}
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
