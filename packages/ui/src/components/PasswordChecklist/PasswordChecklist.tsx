import React, { forwardRef, useMemo } from "react";
import { Check, X } from "lucide-react";
import styles from "./PasswordChecklist.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PasswordRule {
  /** 규칙 ID */
  id: string;
  /** 규칙 레이블 */
  label: string;
  /** 검증 함수 */
  validate: (password: string) => boolean;
}

export interface PasswordChecklistProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 비밀번호 */
  password: string;
  /** 규칙 목록 (미지정 시 기본 규칙 사용) */
  rules?: PasswordRule[];
  /** 크기 */
  size?: "sm" | "md" | "lg";
  /** 모두 통과 시 콜백 */
  onAllPassed?: (passed: boolean) => void;
  /** 최소 길이 (기본 규칙용) */
  minLength?: number;
}

const createDefaultRules = (minLength: number): PasswordRule[] => [
  { id: "length", label: `최소 ${minLength}자 이상`, validate: (p) => p.length >= minLength },
  { id: "uppercase", label: "대문자 포함", validate: (p) => /[A-Z]/.test(p) },
  { id: "lowercase", label: "소문자 포함", validate: (p) => /[a-z]/.test(p) },
  { id: "number", label: "숫자 포함", validate: (p) => /\d/.test(p) },
  { id: "special", label: "특수문자 포함", validate: (p) => /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p) },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const PasswordChecklist = forwardRef<HTMLDivElement, PasswordChecklistProps>(
  (
    {
      password,
      rules: rulesProp,
      size = "md",
      onAllPassed,
      minLength = 8,
      className,
      ...rest
    },
    ref
  ) => {
    const rules = rulesProp ?? createDefaultRules(minLength);

    const results = useMemo(() => {
      const res = rules.map((rule) => ({
        ...rule,
        passed: password.length > 0 && rule.validate(password),
      }));
      const allPassed = res.every((r) => r.passed);
      onAllPassed?.(allPassed);
      return res;
    }, [password, rules, onAllPassed]);

    const passedCount = results.filter((r) => r.passed).length;

    return (
      <div
        ref={ref}
        className={`${styles.wrapper} ${styles[size]} ${className ?? ""}`}
        {...rest}
      >
        <div className={styles.progressRow}>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${rules.length > 0 ? (passedCount / rules.length) * 100 : 0}%` }}
            />
          </div>
          <span className={styles.progressText}>
            {passedCount}/{rules.length}
          </span>
        </div>

        <ul className={styles.ruleList}>
          {results.map((rule) => (
            <li
              key={rule.id}
              className={`${styles.ruleItem} ${
                password.length === 0 ? styles.neutral : rule.passed ? styles.passed : styles.failed
              }`}
            >
              <span className={styles.icon}>
                {password.length === 0 ? (
                  <span className={styles.dot} />
                ) : rule.passed ? (
                  <Check size={size === "sm" ? 12 : 14} />
                ) : (
                  <X size={size === "sm" ? 12 : 14} />
                )}
              </span>
              <span className={styles.label}>{rule.label}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
);

PasswordChecklist.displayName = "PasswordChecklist";
