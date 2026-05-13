import { forwardRef, useState } from "react";
import { Mail, CheckCircle2, XCircle } from "lucide-react";
import styles from "./EmailInput.module.css";

export type EmailInputSize = "sm" | "md" | "lg";

export interface EmailInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** 크기 */
  size?: EmailInputSize;
  /** 레이블 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 (지정 시 에러 상태) */
  errorMessage?: string;
  /** 실시간 유효성 검증 활성화 */
  validateOnChange?: boolean;
  /** 유효성 검증 함수 (기본: 이메일 형식 검사) */
  validate?: (value: string) => boolean;
  /** 유효성 통과 시 아이콘 표시 */
  showValidIcon?: boolean;
  className?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function defaultValidate(value: string): boolean {
  return EMAIL_REGEX.test(value);
}

const HEIGHT: Record<EmailInputSize, string> = {
  sm: "32px",
  md: "40px",
  lg: "48px",
};

const FONT_SIZE: Record<EmailInputSize, string> = {
  sm: "13px",
  md: "14px",
  lg: "15px",
};

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  (
    {
      size = "md",
      label,
      helperText,
      errorMessage: externalError,
      validateOnChange = true,
      validate = defaultValidate,
      showValidIcon = true,
      className,
      value,
      defaultValue,
      onChange,
      onBlur,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState<string>(
      String(defaultValue ?? ""),
    );
    const [touched, setTouched] = useState(false);

    const isControlled = value !== undefined;
    const currentValue = isControlled ? String(value) : internalValue;
    const hasValue = currentValue.length > 0;
    const isValid = hasValue && validate(currentValue);
    const showError = (touched || validateOnChange) && hasValue && !isValid;
    const errorMsg = externalError ?? (showError ? "올바른 이메일 주소를 입력하세요." : "");
    const hasError = Boolean(errorMsg);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) setInternalValue(e.target.value);
      onChange?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setTouched(true);
      onBlur?.(e);
    };

    const inputId = rest.id ?? `email-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={[
            styles.inputWrapper,
            styles[size],
            hasError ? styles.error : "",
            isValid && showValidIcon && !hasError ? styles.valid : "",
            disabled ? styles.disabled : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <span className={styles.leadingIcon}>
            <Mail size={size === "sm" ? 14 : 16} />
          </span>
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="email"
            value={isControlled ? value : internalValue}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={disabled}
            className={styles.input}
            style={{ height: HEIGHT[size], fontSize: FONT_SIZE[size] }}
            aria-invalid={hasError}
            aria-describedby={
              errorMsg ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
          />
          {showValidIcon && hasValue && (
            <span className={styles.trailingIcon}>
              {isValid && !hasError ? (
                <CheckCircle2 size={14} className={styles.validIcon} />
              ) : hasError ? (
                <XCircle size={14} className={styles.errorIcon} />
              ) : null}
            </span>
          )}
        </div>
        {errorMsg ? (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {errorMsg}
          </p>
        ) : helperText ? (
          <p id={`${inputId}-helper`} className={styles.helperText}>
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
