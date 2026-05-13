import React, { forwardRef } from "react";
import styles from "./ShortcutMap.module.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ShortcutEntry {
  /** 액션 이름 */
  label: string;
  /** 단축키 조합 (예: ['⌘', 'K']) */
  keys: string[];
  /** 부가 설명 */
  description?: string;
}

export interface ShortcutGroup {
  /** 그룹 제목 */
  title: string;
  /** 단축키 목록 */
  shortcuts: ShortcutEntry[];
}

export type ShortcutMapLayout = "table" | "grid" | "list";

export interface ShortcutMapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  /** 단축키 그룹 목록 */
  groups: ShortcutGroup[];
  /** 레이아웃 */
  layout?: ShortcutMapLayout;
  /** 크기 */
  size?: "sm" | "md";
}

// ─── ShortcutMap ──────────────────────────────────────────────────────────────

export const ShortcutMap = forwardRef<HTMLDivElement, ShortcutMapProps>(
  (
    {
      groups,
      layout = "table",
      size = "md",
      className,
      ...props
    },
    ref,
  ) => {
    const classes = [
      styles.root,
      styles[`layout-${layout}`],
      styles[`size-${size}`],
      className,
    ].filter(Boolean).join(" ");

    return (
      <div ref={ref} className={classes} {...props}>
        {groups.map((group, gi) => (
          <div key={gi} className={styles.group}>
            <h3 className={styles.groupTitle}>{group.title}</h3>

            {layout === "table" && (
              <table className={styles.table}>
                <tbody>
                  {group.shortcuts.map((sc, si) => (
                    <tr key={si} className={styles.row}>
                      <td className={styles.labelCell}>
                        <span className={styles.label}>{sc.label}</span>
                        {sc.description && (
                          <span className={styles.desc}>{sc.description}</span>
                        )}
                      </td>
                      <td className={styles.keysCell}>
                        <KeyCombo keys={sc.keys} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            {layout === "grid" && (
              <div className={styles.grid}>
                {group.shortcuts.map((sc, si) => (
                  <div key={si} className={styles.card}>
                    <KeyCombo keys={sc.keys} />
                    <span className={styles.cardLabel}>{sc.label}</span>
                  </div>
                ))}
              </div>
            )}

            {layout === "list" && (
              <ul className={styles.list}>
                {group.shortcuts.map((sc, si) => (
                  <li key={si} className={styles.listItem}>
                    <span className={styles.label}>{sc.label}</span>
                    <span className={styles.dots} />
                    <KeyCombo keys={sc.keys} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  },
);

ShortcutMap.displayName = "ShortcutMap";

// ─── KeyCombo ─────────────────────────────────────────────────────────────────

function KeyCombo({ keys }: { keys: string[] }) {
  return (
    <span className={styles.combo}>
      {keys.map((k, i) => (
        <React.Fragment key={i}>
          <kbd className={styles.kbd}>{k}</kbd>
          {i < keys.length - 1 && <span className={styles.plus}>+</span>}
        </React.Fragment>
      ))}
    </span>
  );
}
