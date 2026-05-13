import React, { forwardRef, useRef, useState, useImperativeHandle } from "react";
import styles from "./OTPInput.module.css";

export type OTPInputSize = "sm" | "md" | "lg";
export type OTPInputType = "numeric" | "alpha" | "alphanumeric";

export interface OTPInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** OTP 자릿수 */
  length?: number;
  /** 현재 값 (제어 모드) */
  value?: string;
  /** 기본 값 (비제어) */
  defaultValue?: string;
  /** 값 변경 핸들러 */
  onChange?: (value: string) => void;
  /** 완료 핸들러 (모두 채워졌을 때) */
  onComplete?: (value: string) => void;
  /** 입력 타입 */
  type?: OTPInputType;
  /** 크기 */
  size?: OTPInputSize;
  /** 라벨 */
  label?: string;
  /** 도움말 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 마스킹 (비밀번호형) */
  mask?: boolean;
  /** 구분자 위치 (예: [2] → 2칸마다 구분자) */
  separator?: number;
  className?: string;
}

function normalize(raw: string, type: OTPInputType): string {
  if (type === "numeric") return raw.replace(/\D/g, "");
  if (type === "alpha") return raw.replace(/[^a-zA-Z]/g, "").toUpperCase();
  return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

export const OTPInput = forwardRef<HTMLDivElement, OTPInputProps>(
  (
    {
      length = 6,
      value,
      defaultValue = "",
      onChange,
      onComplete,
      type = "numeric",
      size = "md",
      label,
      helperText,
      errorMessage,
      disabled = false,
      mask = false,
      separator,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const isControlled = value !== undefined;
    const [internal, setInternal] = useState<string>(
      normalize(defaultValue.slice(0, length), type),
    );

    const digits = (isControlled ? value! : internal).padEnd(length, "").slice(0, length).split("");

    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

    const commit = (newVal: string) => {
      if (!isControlled) setInternal(newVal);
      onChange?.(newVal);
      if (newVal.replace(/ /g, "").length === length) {
        onComplete?.(newVal);
      }
    };

    const handleChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value;
      const cleaned = normalize(raw, type);
      if (!cleaned) return;

      // paste support: fill multiple cells
      if (cleaned.length > 1) {
        const base = (isControlled ? value! : internal).padEnd(length, " ").split("");
        let pos = idx;
        for (const ch of cleaned) {
          if (pos >= length) break;
          base[pos] = ch;
          pos++;
        }
        const next = base.join("").trimEnd();
        commit(next);
        const focusIdx = Math.min(pos, length - 1);
        inputRefs.current[focusIdx]?.focus();
        return;
      }

      const base = (isControlled ? value! : internal).padEnd(length, " ").split("");
      base[idx] = cleaned[0];
      const next = base.join("").trimEnd();
      commit(next);
      if (idx < length - 1) {
        inputRefs.current[idx + 1]?.focus();
      }
    };

    const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        const base = (isControlled ? value! : internal).padEnd(length, " ").split("");
        if (base[idx] !== " " && base[idx] !== "") {
          base[idx] = " ";
          commit(base.join("").trimEnd());
        } else if (idx > 0) {
          base[idx - 1] = " ";
          commit(base.join("").trimEnd());
          inputRefs.current[idx - 1]?.focus();
        }
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        e.preventDefault();
        inputRefs.current[idx - 1]?.focus();
      } else if (e.key === "ArrowRight" && idx < length - 1) {
        e.preventDefault();
        inputRefs.current[idx + 1]?.focus();
      } else if (e.key === "Delete") {
        const base = (isControlled ? value! : internal).padEnd(length, " ").split("");
        base[idx] = " ";
        commit(base.join("").trimEnd());
        e.preventDefault();
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      e.target.select();
    };

    const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = normalize(e.clipboardData.getData("text"), type);
      const base = (isControlled ? value! : internal).padEnd(length, " ").split("");
      let pos = idx;
      for (const ch of pasted) {
        if (pos >= length) break;
        base[pos] = ch;
        pos++;
      }
      const next = base.join("").trimEnd();
      commit(next);
      const focusIdx = Math.min(pos, length - 1);
      inputRefs.current[focusIdx]?.focus();
    };

    const hasError = !!errorMessage;

    const wrapperCls = [
      styles.wrapper,
      styles[size],
      hasError ? styles.error : "",
      disabled ? styles.disabled : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={wrapperCls} style={style} {...rest}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={styles.fields}>
          {digits.map((digit, idx) => (
            <React.Fragment key={idx}>
              {separator && idx > 0 && idx % separator === 0 && (
                <span className={styles.sep} aria-hidden="true">–</span>
              )}
              <input
                ref={(el) => { inputRefs.current[idx] = el; }}
                type={mask ? "password" : "text"}
                inputMode={type === "numeric" ? "numeric" : "text"}
                maxLength={1}
                value={digit.trim()}
                onChange={(e) => handleChange(idx, e)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                onFocus={handleFocus}
                onPaste={(e) => handlePaste(idx, e)}
                disabled={disabled}
                className={styles.cell}
                aria-label={`${idx + 1}번째 입력`}
                autoComplete="one-time-code"
              />
            </React.Fragment>
          ))}
        </div>
        {!hasError && helperText && (
          <span className={styles.helperText}>{helperText}</span>
        )}
        {hasError && (
          <span className={styles.errorMessage}>{errorMessage}</span>
        )}
      </div>
    );
  },
);

OTPInput.displayName = "OTPInput";
