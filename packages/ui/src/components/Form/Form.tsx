import { forwardRef, createContext, useContext, useId } from "react";
import styles from "./Form.module.css";

/* ── Context ── */
interface FormFieldContextValue {
  id: string;
  required?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue>({ id: "" });

export function useFormField() {
  return useContext(FormFieldContext);
}

/* ── FormField ── */
export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 필드 고유 ID (미지정 시 자동 생성) */
  id?: string;
  /** 필수 여부 */
  required?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 비활성화 */
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ id: propId, required, error, disabled, children, className, ...rest }, ref) => {
    const autoId = useId();
    const id = propId ?? autoId;

    return (
      <FormFieldContext.Provider value={{ id, required, error, disabled }}>
        <div
          ref={ref}
          className={[styles.field, className ?? ""].filter(Boolean).join(" ")}
          {...rest}
        >
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  },
);

FormField.displayName = "FormField";

/* ── FormLabel ── */
export interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  className?: string;
}

export const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, className, htmlFor: propFor, ...rest }, ref) => {
    const { id, required, error } = useFormField();

    return (
      <label
        ref={ref}
        htmlFor={propFor ?? id}
        className={[
          styles.label,
          error ? styles.labelError : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {children}
        {required && (
          <span className={styles.required} aria-hidden="true">
            {" *"}
          </span>
        )}
      </label>
    );
  },
);

FormLabel.displayName = "FormLabel";

/* ── FormDescription ── */
export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
  className?: string;
}

export const FormDescription = forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ children, className, ...rest }, ref) => {
  return (
    <p
      ref={ref}
      className={[styles.description, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </p>
  );
});

FormDescription.displayName = "FormDescription";

/* ── FormMessage ── */
export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  children?: React.ReactNode;
  /** 에러 메시지 텍스트 */
  error?: string;
  className?: string;
}

export const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ children, error: errorMsg, className, ...rest }, ref) => {
    const { error } = useFormField();
    const message = errorMsg ?? (typeof children === "string" ? children : undefined);
    const isError = error || Boolean(errorMsg);

    if (!message && !children) return null;

    return (
      <p
        ref={ref}
        role={isError ? "alert" : undefined}
        className={[
          styles.message,
          isError ? styles.messageError : styles.messageHint,
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        {...rest}
      >
        {message ?? children}
      </p>
    );
  },
);

FormMessage.displayName = "FormMessage";

/* ── FormGroup ── */
export interface FormGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그룹 레이블 */
  legend?: string;
  children: React.ReactNode;
  /** 가로 배치 여부 */
  horizontal?: boolean;
  className?: string;
}

export const FormGroup = forwardRef<HTMLDivElement, FormGroupProps>(
  ({ legend, children, horizontal, className, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        className={[
          styles.group,
          horizontal ? styles.groupHorizontal : "",
          className ?? "",
        ]
          .filter(Boolean)
          .join(" ")}
        role="group"
        aria-label={legend}
        {...rest}
      >
        {legend && <div className={styles.groupLegend}>{legend}</div>}
        <div className={[styles.groupContent, horizontal ? styles.groupContentHorizontal : ""].filter(Boolean).join(" ")}>
          {children}
        </div>
      </div>
    );
  },
);

FormGroup.displayName = "FormGroup";
