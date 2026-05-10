import { forwardRef, useId, type InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

export type InputSize = "sm" | "md" | "lg";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  inputSize?: InputSize;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      errorMessage,
      inputSize = "md",
      className,
      id: idProp,
      ...rest
    },
    ref,
  ) => {
    const autoId = useId();
    const id = idProp ?? autoId;
    const hasError = !!errorMessage;
    const descriptionId = hasError
      ? `${id}-error`
      : helperText
        ? `${id}-helper`
        : undefined;

    if (!label) {
      return (
        <input
          ref={ref}
          id={id}
          className={[
            styles.input,
            styles.inputOnly,
            styles[inputSize],
            hasError ? styles.error : "",
            className ?? "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-invalid={hasError || undefined}
          aria-describedby={descriptionId}
          {...rest}
        />
      );
    }

    return (
      <div
        className={[
          styles.wrapper,
          styles[inputSize],
          hasError ? styles.error : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          className={[styles.input, className ?? ""].filter(Boolean).join(" ")}
          aria-invalid={hasError || undefined}
          aria-describedby={descriptionId}
          {...rest}
        />
        {hasError ? (
          <span id={`${id}-error`} className={styles.errorMessage} role="alert">
            {errorMessage}
          </span>
        ) : helperText ? (
          <span id={`${id}-helper`} className={styles.helperText}>
            {helperText}
          </span>
        ) : null}
      </div>
    );
  },
);

Input.displayName = "Input";
