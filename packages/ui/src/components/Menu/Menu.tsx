import { forwardRef, useRef, useState, useEffect } from "react";
import { Check, ChevronRight } from "lucide-react";
import styles from "./Menu.module.css";

export interface MenuItem {
  /** 레이블 */
  label: string;
  /** 아이콘 (lucide-react 아이콘 element) */
  icon?: React.ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 선택됨 (체크 마크 표시) */
  selected?: boolean;
  /** 위험한 액션 (빨간 텍스트) */
  danger?: boolean;
  /** 오른쪽 단축키 표시 */
  shortcut?: string;
  /** 서브메뉴 */
  children?: MenuItem[];
}

export interface MenuSeparator {
  type: "separator";
}

export type MenuEntry = MenuItem | MenuSeparator;

export interface MenuListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MenuEntry[];
  className?: string;
}

export interface MenuProps {
  /** 메뉴 아이템 목록 */
  items: MenuEntry[];
  /** 트리거 요소 */
  trigger: React.ReactElement;
  /** 열림 상태 제어 */
  open?: boolean;
  /** 기본 열림 여부 */
  defaultOpen?: boolean;
  /** 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
  /** 메뉴 위치 */
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end";
  className?: string;
}

function isSeparator(entry: MenuEntry): entry is MenuSeparator {
  return "type" in entry && entry.type === "separator";
}

function MenuItemNode({
  item,
  onClose,
  depth = 0,
}: {
  item: MenuItem;
  onClose: () => void;
  depth?: number;
}) {
  const [subOpen, setSubOpen] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (item.disabled) return;
    if (!hasChildren) {
      item.onClick?.();
      onClose();
    }
  };

  return (
    <li
      className={[
        styles.item,
        item.disabled ? styles.itemDisabled : "",
        item.danger ? styles.itemDanger : "",
        item.selected ? styles.itemSelected : "",
        hasChildren ? styles.itemHasChildren : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onMouseEnter={() => hasChildren && setSubOpen(true)}
      onMouseLeave={() => hasChildren && setSubOpen(false)}
    >
      <button
        type="button"
        className={styles.itemBtn}
        onClick={handleClick}
        disabled={item.disabled}
        aria-haspopup={hasChildren ? "menu" : undefined}
        aria-expanded={hasChildren ? subOpen : undefined}
      >
        {item.selected && (
          <span className={styles.check}>
            <Check size={14} />
          </span>
        )}
        {!item.selected && item.icon && (
          <span className={styles.icon}>{item.icon}</span>
        )}
        {!item.selected && !item.icon && (
          <span className={styles.iconPlaceholder} />
        )}
        <span className={styles.label}>{item.label}</span>
        {item.shortcut && (
          <span className={styles.shortcut}>{item.shortcut}</span>
        )}
        {hasChildren && (
          <span className={styles.chevron}>
            <ChevronRight size={14} />
          </span>
        )}
      </button>

      {hasChildren && subOpen && (
        <ul className={[styles.menuList, styles.submenu].join(" ")}>
          {item.children!.map((child, i) =>
            isSeparator(child) ? (
              <li key={i} className={styles.separator} role="separator" />
            ) : (
              <MenuItemNode key={i} item={child} onClose={onClose} depth={depth + 1} />
            ),
          )}
        </ul>
      )}
    </li>
  );
}

export function MenuList({ items, className, ...rest }: MenuListProps) {
  return (
    <ul
      role="menu"
      className={[styles.menuList, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {items.map((entry, i) =>
        isSeparator(entry) ? (
          <li key={i} className={styles.separator} role="separator" />
        ) : (
          <MenuItemNode key={i} item={entry} onClose={() => {}} />
        ),
      )}
    </ul>
  );
}

export const Menu = forwardRef<HTMLDivElement, MenuProps>(
  (
    {
      items,
      trigger,
      open: controlledOpen,
      defaultOpen = false,
      onOpenChange,
      placement = "bottom-start",
      className,
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen);
    const isControlled = controlledOpen !== undefined;
    const open = isControlled ? controlledOpen : internalOpen;

    const containerRef = useRef<HTMLDivElement>(null);

    const setOpen = (val: boolean) => {
      if (!isControlled) setInternalOpen(val);
      onOpenChange?.(val);
    };

    const toggle = () => setOpen(!open);
    const close = () => setOpen(false);

    // Close on outside click
    useEffect(() => {
      if (!open) return;
      const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          close();
        }
      };
      document.addEventListener("mousedown", handleClick);
      return () => document.removeEventListener("mousedown", handleClick);
    }, [open]);

    // Close on Escape
    useEffect(() => {
      if (!open) return;
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") close();
      };
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }, [open]);

    const [placementY, placementX] = placement.split("-") as [string, string];

    return (
      <div
        ref={(node) => {
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
          (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={[styles.container, className ?? ""].filter(Boolean).join(" ")}
      >
        {/* Clone trigger with onClick */}
        {(() => {
          const child = trigger as React.ReactElement<React.HTMLAttributes<HTMLElement>>;
          return (
            <span
              onClick={toggle}
              style={{ display: "inline-flex" }}
              aria-haspopup="menu"
              aria-expanded={open}
            >
              {child}
            </span>
          );
        })()}

        {open && (
          <ul
            role="menu"
            className={[
              styles.menuList,
              styles[`placement-${placementY}`],
              styles[`align-${placementX}`],
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {items.map((entry, i) =>
              isSeparator(entry) ? (
                <li key={i} className={styles.separator} role="separator" />
              ) : (
                <MenuItemNode key={i} item={entry as MenuItem} onClose={close} />
              ),
            )}
          </ul>
        )}
      </div>
    );
  },
);

Menu.displayName = "Menu";
