import { forwardRef } from "react";
import styles from "./Textarea.module.css";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size"> {
  /** 라벨 텍스트 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 에러 상태 */
  error?: boolean;
  /** 글자 수 제한 표시 */
  maxLength?: number;
  /** 현재 글자 수 (외부 제어 시) */
  currentLength?: number;
  /** 자동 높이 조절 비활성화 */
  resize?: "none" | "vertical" | "horizontal" | "both";
  /** 최소 줄 수 */
  minRows?: number;
  /** 최대 줄 수 */
  maxRows?: number;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      error = false,
      maxLength,
      currentLength,
      resize = "vertical",
      minRows = 3,
      className,
      style,
      value,
      ...rest
    },
    ref,
  ) => {
    const charCount =
      currentLength ?? (typeof value === "string" ? value.length : undefined);
    const isError = error || (maxLength != null && charCount != null && charCount > maxLength);

    return (
      <div
        className={[
          styles.wrapper,
          isError ? styles.error : "",
          rest.disabled ? styles.disabled : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {label && <label className={styles.label}>{label}</label>}

        <textarea
          ref={ref}
          rows={minRows}
          maxLength={maxLength}
          value={value}
          className={styles.textarea}
          style={{ resize, ...style }}
          {...rest}
        />

        <div className={styles.footer}>
          <span className={styles.helperText}>
            {isError && errorMessage ? errorMessage : helperText}
          </span>
          {maxLength != null && charCount != null && (
            <span
              className={[
                styles.charCount,
                charCount > maxLength ? styles.charCountOver : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {charCount} / {maxLength}
            </span>
          )}
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
