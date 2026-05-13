import { forwardRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import styles from "./PhoneInput.module.css";

export type PhoneInputSize = "sm" | "md" | "lg";

export interface CountryCode {
  code: string;
  dial: string;
  flag: string;
}

export interface PhoneInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** 크기 */
  size?: PhoneInputSize;
  /** 레이블 */
  label?: string;
  /** 도움말 텍스트 */
  helperText?: string;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 선택된 국가코드 */
  countryCode?: string;
  /** 국가코드 변경 핸들러 */
  onCountryChange?: (code: CountryCode) => void;
  /** 국가 목록 커스터마이징 */
  countries?: CountryCode[];
  className?: string;
}

const DEFAULT_COUNTRIES: CountryCode[] = [
  { code: "KR", dial: "+82", flag: "🇰🇷" },
  { code: "US", dial: "+1", flag: "🇺🇸" },
  { code: "JP", dial: "+81", flag: "🇯🇵" },
  { code: "CN", dial: "+86", flag: "🇨🇳" },
  { code: "GB", dial: "+44", flag: "🇬🇧" },
  { code: "DE", dial: "+49", flag: "🇩🇪" },
  { code: "FR", dial: "+33", flag: "🇫🇷" },
  { code: "CA", dial: "+1", flag: "🇨🇦" },
  { code: "AU", dial: "+61", flag: "🇦🇺" },
  { code: "SG", dial: "+65", flag: "🇸🇬" },
];

const HEIGHT: Record<PhoneInputSize, string> = { sm: "32px", md: "40px", lg: "48px" };
const FONT: Record<PhoneInputSize, string> = { sm: "13px", md: "14px", lg: "15px" };

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      size = "md",
      label,
      helperText,
      errorMessage,
      countryCode: initialCode = "KR",
      onCountryChange,
      countries = DEFAULT_COUNTRIES,
      className,
      disabled,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const selected = countries.find((c) => c.code === initialCode) ?? countries[0];

    const handleSelect = (c: CountryCode) => {
      setOpen(false);
      onCountryChange?.(c);
    };

    const inputId = rest.id ?? `phone-${Math.random().toString(36).slice(2)}`;

    return (
      <div className={[styles.wrapper, className ?? ""].filter(Boolean).join(" ")}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <div
          className={[
            styles.inputGroup,
            styles[size],
            errorMessage ? styles.error : "",
            disabled ? styles.disabled : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {/* Country selector */}
          <div className={styles.countrySelector}>
            <button
              type="button"
              className={styles.countryBtn}
              onClick={() => !disabled && setOpen((v) => !v)}
              aria-label="국가 선택"
              aria-haspopup="listbox"
              aria-expanded={open}
              disabled={disabled}
              style={{ height: HEIGHT[size], fontSize: FONT[size] }}
            >
              <span>{selected.flag}</span>
              <span className={styles.dial}>{selected.dial}</span>
              <ChevronDown size={12} className={[styles.chevron, open ? styles.chevronOpen : ""].filter(Boolean).join(" ")} />
            </button>
            {open && (
              <ul
                className={styles.dropdown}
                role="listbox"
                aria-label="국가 선택"
              >
                {countries.map((c) => (
                  <li
                    key={c.code}
                    role="option"
                    aria-selected={c.code === selected.code}
                    className={[
                      styles.option,
                      c.code === selected.code ? styles.optionSelected : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    onClick={() => handleSelect(c)}
                  >
                    <span>{c.flag}</span>
                    <span className={styles.optionLabel}>{c.code}</span>
                    <span className={styles.optionDial}>{c.dial}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Divider */}
          <div className={styles.divider} />

          {/* Phone input */}
          <input
            {...rest}
            ref={ref}
            id={inputId}
            type="tel"
            disabled={disabled}
            className={styles.input}
            style={{ height: HEIGHT[size], fontSize: FONT[size] }}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={
              errorMessage ? `${inputId}-error` : undefined
            }
          />
        </div>
        {errorMessage ? (
          <p id={`${inputId}-error`} className={styles.errorText} role="alert">
            {errorMessage}
          </p>
        ) : helperText ? (
          <p className={styles.helperText}>{helperText}</p>
        ) : null}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
