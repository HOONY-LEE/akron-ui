import { forwardRef, useState, useRef, useCallback, useEffect } from "react";
import { Send } from "lucide-react";
import styles from "./Chat.module.css";

export interface ChatInputProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange" | "prefix"> {
  /** 입력값 (controlled) */
  value?: string;
  /** 입력값 변경 콜백 */
  onChange?: (value: string) => void;
  /** 메시지 전송 콜백 */
  onSend?: (value: string) => void;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 비활성화 */
  disabled?: boolean;
  /** 입력창 좌측 액션 (파일 첨부 등) */
  prefix?: React.ReactNode;
  /** 전송 버튼 좌측 추가 액션 */
  suffix?: React.ReactNode;
  /** 커스텀 전송 아이콘 */
  sendIcon?: React.ReactNode;
  /** 전송 버튼 숨기기 */
  hideSendButton?: boolean;
  /** 여러 줄 입력 (textarea, 기본 false) */
  multiline?: boolean;
  /** textarea 최대 줄 수 (multiline일 때, 기본 5) */
  maxRows?: number;
}

export const ChatInput = forwardRef<HTMLDivElement, ChatInputProps>(
  (
    {
      value: controlledValue,
      onChange,
      onSend,
      placeholder = "메시지를 입력하세요...",
      disabled,
      prefix,
      suffix,
      sendIcon,
      hideSendButton,
      multiline,
      maxRows = 5,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] = useState("");
    const inputRef = useRef<HTMLTextAreaElement | HTMLInputElement>(null);
    const isControlled = controlledValue !== undefined;
    const currentValue = isControlled ? controlledValue : internalValue;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const v = e.target.value;
        if (!isControlled) setInternalValue(v);
        onChange?.(v);
      },
      [isControlled, onChange],
    );

    const handleSend = useCallback(() => {
      if (!currentValue.trim() || disabled) return;
      onSend?.(currentValue.trim());
      if (!isControlled) setInternalValue("");
    }, [currentValue, disabled, isControlled, onSend]);

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          handleSend();
        }
      },
      [handleSend],
    );

    // Auto-resize textarea
    useEffect(() => {
      if (multiline && inputRef.current && inputRef.current instanceof HTMLTextAreaElement) {
        const el = inputRef.current;
        el.style.height = "auto";
        const lineHeight = parseInt(getComputedStyle(el).lineHeight) || 21;
        const maxHeight = lineHeight * maxRows + 16; // 16 for padding
        el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`;
      }
    }, [currentValue, multiline, maxRows]);

    const InputTag = multiline ? "textarea" : "input";

    return (
      <div
        ref={ref}
        className={[styles.input, className].filter(Boolean).join(" ")}
        {...props}
      >
        {prefix && <div className={styles.inputPrefix}>{prefix}</div>}

        <InputTag
          ref={inputRef as React.Ref<HTMLTextAreaElement & HTMLInputElement>}
          className={styles.inputField}
          value={currentValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          rows={multiline ? 1 : undefined}
          style={multiline ? { overflow: "hidden" } : undefined}
        />

        {suffix && <div className={styles.inputSuffix}>{suffix}</div>}

        {!hideSendButton && (
          <button
            type="button"
            className={styles.inputSendBtn}
            onClick={handleSend}
            disabled={disabled || !currentValue.trim()}
            aria-label="전송"
          >
            {sendIcon ?? <Send size={14} />}
          </button>
        )}
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
