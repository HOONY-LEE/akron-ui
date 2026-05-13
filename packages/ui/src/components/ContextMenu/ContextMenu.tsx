import { forwardRef, type ReactNode } from "react";
import * as RadixContextMenu from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import styles from "./ContextMenu.module.css";

export interface ContextMenuItem {
  /** 표시 레이블 */
  label: string;
  /** 아이콘 */
  icon?: ReactNode;
  /** 클릭 핸들러 */
  onClick?: () => void;
  /** 비활성화 */
  disabled?: boolean;
  /** 위험 액션 (빨간 텍스트) */
  danger?: boolean;
  /** 오른쪽 단축키 */
  shortcut?: string;
  /** 체크 마크 */
  checked?: boolean;
  /** 라디오 값 */
  radioValue?: string;
  /** 서브메뉴 */
  children?: ContextMenuItem[];
}

export interface ContextMenuSeparator {
  type: "separator";
}

export interface ContextMenuLabel {
  type: "label";
  label: string;
}

export type ContextMenuEntry = ContextMenuItem | ContextMenuSeparator | ContextMenuLabel;

export interface ContextMenuProps {
  /** 컨텍스트 메뉴 트리거 (우클릭 영역) */
  children: ReactNode;
  /** 메뉴 항목 목록 */
  items: ContextMenuEntry[];
  /** 열림 상태 변경 핸들러 */
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function isSeparator(entry: ContextMenuEntry): entry is ContextMenuSeparator {
  return "type" in entry && entry.type === "separator";
}

function isLabel(entry: ContextMenuEntry): entry is ContextMenuLabel {
  return "type" in entry && entry.type === "label";
}

function MenuItemList({ items }: { items: ContextMenuEntry[] }) {
  return (
    <>
      {items.map((entry, idx) => {
        if (isSeparator(entry)) {
          return <RadixContextMenu.Separator key={idx} className={styles.separator} />;
        }

        if (isLabel(entry)) {
          return (
            <RadixContextMenu.Label key={idx} className={styles.label}>
              {entry.label}
            </RadixContextMenu.Label>
          );
        }

        const item = entry as ContextMenuItem;

        if (item.children && item.children.length > 0) {
          return (
            <RadixContextMenu.Sub key={idx}>
              <RadixContextMenu.SubTrigger
                className={[styles.item, item.disabled ? styles.disabled : ""].join(" ")}
                disabled={item.disabled}
              >
                {item.icon && <span className={styles.icon}>{item.icon}</span>}
                <span className={styles.itemLabel}>{item.label}</span>
                <span className={styles.rightSlot}>
                  <ChevronRight size={14} />
                </span>
              </RadixContextMenu.SubTrigger>
              <RadixContextMenu.Portal>
                <RadixContextMenu.SubContent className={styles.content} sideOffset={2} alignOffset={-5}>
                  <MenuItemList items={item.children} />
                </RadixContextMenu.SubContent>
              </RadixContextMenu.Portal>
            </RadixContextMenu.Sub>
          );
        }

        if (item.checked !== undefined) {
          return (
            <RadixContextMenu.CheckboxItem
              key={idx}
              className={[
                styles.item,
                item.danger ? styles.danger : "",
                item.disabled ? styles.disabled : "",
              ]
                .filter(Boolean)
                .join(" ")}
              checked={item.checked}
              disabled={item.disabled}
              onCheckedChange={(checked) => checked && item.onClick?.()}
            >
              <RadixContextMenu.ItemIndicator className={styles.indicator}>
                <Check size={12} />
              </RadixContextMenu.ItemIndicator>
              {item.icon && <span className={styles.icon}>{item.icon}</span>}
              <span className={styles.itemLabel}>{item.label}</span>
              {item.shortcut && <span className={styles.rightSlot}>{item.shortcut}</span>}
            </RadixContextMenu.CheckboxItem>
          );
        }

        return (
          <RadixContextMenu.Item
            key={idx}
            className={[
              styles.item,
              item.danger ? styles.danger : "",
              item.disabled ? styles.disabled : "",
            ]
              .filter(Boolean)
              .join(" ")}
            disabled={item.disabled}
            onSelect={item.onClick}
          >
            {item.icon && <span className={styles.icon}>{item.icon}</span>}
            <span className={styles.itemLabel}>{item.label}</span>
            {item.shortcut && <span className={styles.rightSlot}>{item.shortcut}</span>}
          </RadixContextMenu.Item>
        );
      })}
    </>
  );
}

export const ContextMenu = forwardRef<HTMLDivElement, ContextMenuProps>(
  ({ children, items, onOpenChange, className }, ref) => {
    return (
      <RadixContextMenu.Root onOpenChange={onOpenChange}>
        <RadixContextMenu.Trigger asChild>
          <div ref={ref} className={[styles.trigger, className].filter(Boolean).join(" ")}>
            {children}
          </div>
        </RadixContextMenu.Trigger>
        <RadixContextMenu.Portal>
          <RadixContextMenu.Content className={styles.content} collisionPadding={8}>
            <MenuItemList items={items} />
          </RadixContextMenu.Content>
        </RadixContextMenu.Portal>
      </RadixContextMenu.Root>
    );
  },
);

ContextMenu.displayName = "ContextMenu";
