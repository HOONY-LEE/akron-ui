import { forwardRef, useState, useEffect } from "react";
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

// ─── 한국 전화번호 자동 포맷터 ──────────────────────────────────────────────────
// 숫자만 추출해서 형식에 맞게 - 삽입. onChange에는 숫자만 전달.
function formatKrPhone(raw: string): string {
  // 숫자만 추출
  const digits = raw.replace(/\D/g, "");

  if (digits.startsWith("02")) {
    // 서울 지역번호: 02-XXX-XXXX (9자리) / 02-XXXX-XXXX (10자리)
    const d = digits.slice(0, 10);
    if (d.length <= 2) return d;
    if (d.length <= 5) return `${d.slice(0, 2)}-${d.slice(2)}`;
    if (d.length <= 9) return `${d.slice(0, 2)}-${d.slice(2, 5)}-${d.slice(5)}`;
    return `${d.slice(0, 2)}-${d.slice(2, 6)}-${d.slice(6, 10)}`;
  }

  const isMobile = /^01[016789]/.test(digits);
  if (isMobile) {
    // 휴대전화: 010-XXXX-XXXX (11자리)
    const d = digits.slice(0, 11);
    if (d.length <= 3) return d;
    if (d.length <= 7) return `${d.slice(0, 3)}-${d.slice(3)}`;
    return `${d.slice(0, 3)}-${d.slice(3, 7)}-${d.slice(7, 11)}`;
  }

  // 기타 지역번호: 0XX-XXX-XXXX (10자리)
  const d = digits.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6, 10)}`;
}

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
      value,
      onChange,
      placeholder,
      ...rest
    },
    ref,
  ) => {
    const [open, setOpen] = useState(false);
    const selected = countries.find((c) => c.code === initialCode) ?? countries[0];
    const isKr = selected.code === "KR";

    // KR일 때만 포맷 적용
    const toDisplay = (v: string) => (isKr ? formatKrPhone(v) : v);

    const [displayVal, setDisplayVal] = useState<string>(() =>
      toDisplay(String(value ?? "")),
    );

    // 외부 value 변경 반영 (controlled 모드)
    useEffect(() => {
      if (value !== undefined) {
        setDisplayVal(toDisplay(String(value)));
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value, isKr]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isKr) {
        // 한국이 아닌 경우 그대로
        setDisplayVal(e.target.value);
        onChange?.(e);
        return;
      }

      const formatted = formatKrPhone(e.target.value);
      const digits = formatted.replace(/\D/g, "");
      setDisplayVal(formatted);

      // onChange에는 숫자만 전달
      if (onChange) {
        const syntheticEvent = Object.create(e);
        syntheticEvent.target = { ...e.target, value: digits };
        syntheticEvent.currentTarget = { ...e.currentTarget, value: digits };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };

    const handleSelect = (c: CountryCode) => {
      setOpen(false);
      onCountryChange?.(c);
    };

    const inputId = rest.id ?? `phone-${Math.random().toString(36).slice(2)}`;
    const defaultPlaceholder = isKr ? "010-0000-0000" : placeholder ?? "";

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
              <ChevronDown
                size={12}
                className={[styles.chevron, open ? styles.chevronOpen : ""].filter(Boolean).join(" ")}
              />
            </button>
            {open && (
              <ul className={styles.dropdown} role="listbox" aria-label="국가 선택">
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
            value={displayVal}
            onChange={handleChange}
            placeholder={defaultPlaceholder}
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? `${inputId}-error` : undefined}
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
