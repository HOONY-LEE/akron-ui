import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import styles from "./MentionInput.module.css";

/* ── Types ── */

export interface MentionUser {
  id: string;
  name: string;
  avatar?: string;
}

export type MentionInputSize = "sm" | "md" | "lg";

export interface MentionInputProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string, mentions: MentionUser[]) => void;
  users: MentionUser[];
  trigger?: string;
  size?: MentionInputSize;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  maxLength?: number;
  multiline?: boolean;
  rows?: number;
}

/* ── Helpers ── */

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Extract the plain text content from the contentEditable element */
function getPlainText(el: HTMLElement): string {
  let text = "";
  el.childNodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.textContent ?? "";
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const elem = node as HTMLElement;
      if (elem.dataset.mentionId) {
        text += elem.textContent ?? "";
      } else {
        text += getPlainText(elem);
      }
      // Handle <br> for multiline
      if (elem.tagName === "BR") {
        text += "\n";
      }
    }
  });
  return text;
}

/** Extract mentioned users from the contentEditable element */
function extractMentions(el: HTMLElement, users: MentionUser[]): MentionUser[] {
  const found: MentionUser[] = [];
  const mentionEls = el.querySelectorAll("[data-mention-id]");
  mentionEls.forEach((mentionEl) => {
    const id = (mentionEl as HTMLElement).dataset.mentionId;
    if (id) {
      const user = users.find((u) => u.id === id);
      if (user && !found.some((f) => f.id === user.id)) {
        found.push(user);
      }
    }
  });
  return found;
}

/** Place caret at end of element */
function placeCaretAtEnd(el: HTMLElement) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.selectNodeContents(el);
  range.collapse(false);
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/** Place caret after a specific node */
function placeCaretAfterNode(node: Node) {
  const range = document.createRange();
  const sel = window.getSelection();
  range.setStartAfter(node);
  range.collapse(true);
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/** Get the text being typed after the trigger character */
function getTriggerQuery(
  el: HTMLElement,
  triggerChar: string,
): { query: string; range: Range; triggerOffset: number } | null {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;

  const range = sel.getRangeAt(0);
  if (!range.collapsed) return null;

  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return null;

  const text = node.textContent ?? "";
  const offset = range.startOffset;
  const textBefore = text.slice(0, offset);

  // Find the last trigger character that isn't preceded by a non-space character
  const triggerIdx = textBefore.lastIndexOf(triggerChar);
  if (triggerIdx === -1) return null;

  // The trigger must be at start or preceded by a space/newline
  if (triggerIdx > 0) {
    const charBefore = textBefore[triggerIdx - 1];
    if (charBefore !== " " && charBefore !== "\n" && charBefore !== " ") {
      return null;
    }
  }

  const query = textBefore.slice(triggerIdx + triggerChar.length);
  // Query should not contain spaces (we stop matching when user types space)
  if (query.includes(" ")) return null;

  return { query, range, triggerOffset: triggerIdx };
}

/* ── Component ── */

export const MentionInput = forwardRef<HTMLDivElement, MentionInputProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      users,
      trigger = "@",
      size = "md",
      placeholder,
      disabled = false,
      error = false,
      helperText,
      maxLength,
      multiline = false,
      rows = 3,
      className,
      style,
      ...rest
    },
    ref,
  ) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(0);
    const isControlled = value !== undefined;
    const lastValueRef = useRef<string>(defaultValue ?? "");

    useImperativeHandle(ref, () => editorRef.current as HTMLDivElement);

    // Filter users based on query
    const filteredUsers = useMemo(() => {
      if (!query && query !== "") return users;
      const lower = query.toLowerCase();
      return users.filter((u) => u.name.toLowerCase().includes(lower));
    }, [users, query]);

    // Reset active index when filtered users change
    useEffect(() => {
      setActiveIndex(0);
    }, [filteredUsers.length]);

    // Initialize with default value
    useEffect(() => {
      const el = editorRef.current;
      if (!el) return;
      if (defaultValue && !isControlled && el.textContent === "") {
        el.textContent = defaultValue;
      }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Controlled value sync
    useEffect(() => {
      const el = editorRef.current;
      if (!el || !isControlled) return;
      const currentText = getPlainText(el);
      if (value !== currentText) {
        // Only update if the value actually changed from outside
        el.textContent = value ?? "";
        lastValueRef.current = value ?? "";
      }
    }, [value, isControlled]);

    // Close dropdown on outside click
    useEffect(() => {
      if (!showDropdown) return;
      const handleClick = (e: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(e.target as Node) &&
          editorRef.current &&
          !editorRef.current.contains(e.target as Node)
        ) {
          setShowDropdown(false);
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [showDropdown]);

    const emitChange = useCallback(() => {
      const el = editorRef.current;
      if (!el || !onChange) return;
      const text = getPlainText(el);
      const mentions = extractMentions(el, users);
      lastValueRef.current = text;
      onChange(text, mentions);
    }, [onChange, users]);

    const insertMention = useCallback(
      (user: MentionUser) => {
        const el = editorRef.current;
        if (!el) return;

        const triggerInfo = getTriggerQuery(el, trigger);
        if (!triggerInfo) {
          setShowDropdown(false);
          return;
        }

        const { range, triggerOffset } = triggerInfo;
        const textNode = range.startContainer as Text;
        const offset = range.startOffset;

        // Create mention span
        const mentionSpan = document.createElement("span");
        mentionSpan.className = styles.mention;
        mentionSpan.contentEditable = "false";
        mentionSpan.dataset.mentionId = user.id;
        mentionSpan.textContent = `${trigger}${user.name}`;

        // Delete the trigger + query text
        const before = textNode.textContent?.slice(0, triggerOffset) ?? "";
        const after = textNode.textContent?.slice(offset) ?? "";

        // Replace text node content with "before" text
        textNode.textContent = before;

        // Insert mention span after the text node
        const parent = textNode.parentNode!;
        const nextSibling = textNode.nextSibling;

        // Insert mention after the before-text
        if (nextSibling) {
          parent.insertBefore(mentionSpan, nextSibling);
        } else {
          parent.appendChild(mentionSpan);
        }

        // Add a space after the mention and the remaining text
        const afterTextNode = document.createTextNode(
          ` ${after}`,
        );
        if (mentionSpan.nextSibling) {
          parent.insertBefore(afterTextNode, mentionSpan.nextSibling);
        } else {
          parent.appendChild(afterTextNode);
        }

        // Place caret after the space
        placeCaretAfterNode(afterTextNode);
        // Move caret to position 1 (after the nbsp)
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const r = sel.getRangeAt(0);
          r.setStart(afterTextNode, 1);
          r.collapse(true);
        }

        setShowDropdown(false);
        setQuery("");
        emitChange();
      },
      [trigger, emitChange],
    );

    const handleInput = useCallback(() => {
      const el = editorRef.current;
      if (!el) return;

      // Max length check
      if (maxLength) {
        const text = getPlainText(el);
        if (text.length > maxLength) {
          // Truncate - restore to max length
          // Simple approach: just prevent further input
          return;
        }
      }

      // Check for trigger
      const triggerInfo = getTriggerQuery(el, trigger);
      if (triggerInfo) {
        setQuery(triggerInfo.query);
        setShowDropdown(true);
      } else {
        setShowDropdown(false);
        setQuery("");
      }

      emitChange();
    }, [trigger, maxLength, emitChange]);

    const handleKeyDown = useCallback(
      (e: KeyboardEvent<HTMLDivElement>) => {
        if (showDropdown && filteredUsers.length > 0) {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev < filteredUsers.length - 1 ? prev + 1 : 0,
            );
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setActiveIndex((prev) =>
              prev > 0 ? prev - 1 : filteredUsers.length - 1,
            );
            return;
          }
          if (e.key === "Enter") {
            e.preventDefault();
            insertMention(filteredUsers[activeIndex]);
            return;
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setShowDropdown(false);
            return;
          }
        }

        // Prevent Enter in single-line mode
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          return;
        }
      },
      [showDropdown, filteredUsers, activeIndex, insertMention, multiline],
    );

    const handlePaste = useCallback(
      (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text/plain");
        // Insert as plain text
        const sel = window.getSelection();
        if (sel && sel.rangeCount > 0) {
          const range = sel.getRangeAt(0);
          range.deleteContents();
          const textNode = document.createTextNode(text);
          range.insertNode(textNode);
          placeCaretAfterNode(textNode);
        }
        // Trigger input handling
        setTimeout(() => handleInput(), 0);
      },
      [handleInput],
    );

    // Compute textarea min-height based on rows
    const textareaStyle = multiline
      ? {
          minHeight: `${rows * 1.5 * 16 + 16}px`, // line-height * font-size * rows + padding
        }
      : undefined;

    const rootClasses = [
      styles.root,
      styles[size],
      disabled ? styles.disabled : "",
      error ? styles.error : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const inputClasses = [
      styles.input,
      multiline ? styles.textarea : styles.singleLine,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className={rootClasses} style={style} {...rest}>
        <div className={styles.inputWrapper}>
          <div
            ref={editorRef}
            className={inputClasses}
            contentEditable={!disabled}
            role="textbox"
            aria-multiline={multiline}
            aria-disabled={disabled}
            aria-invalid={error || undefined}
            data-placeholder={placeholder}
            suppressContentEditableWarning
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            style={textareaStyle}
          />

          {showDropdown && (
            <div ref={dropdownRef} className={styles.dropdown} role="listbox">
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user, index) => (
                  <div
                    key={user.id}
                    className={[
                      styles.dropdownItem,
                      index === activeIndex ? styles.active : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    role="option"
                    aria-selected={index === activeIndex}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      insertMention(user);
                    }}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <div className={styles.avatar}>
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className={styles.avatarImg}
                        />
                      ) : (
                        <span className={styles.initials}>
                          {getInitials(user.name)}
                        </span>
                      )}
                    </div>
                    <span className={styles.userName}>{user.name}</span>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>No users found</div>
              )}
            </div>
          )}
        </div>

        {helperText && (
          <span
            className={[
              styles.helperText,
              error ? styles.helperError : "",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {helperText}
          </span>
        )}
      </div>
    );
  },
);

MentionInput.displayName = "MentionInput";
