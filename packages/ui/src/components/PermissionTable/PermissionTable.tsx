import React, { forwardRef, useMemo, useCallback } from "react";
import { Check, X, Minus } from "lucide-react";
import styles from "./PermissionTable.module.css";

export type PermissionValue = "granted" | "denied" | "partial" | "none";

export interface PermissionRow {
  id: string;
  label: string;
  description?: string;
  category?: string;
}

export interface PermissionColumn {
  id: string;
  label: string;
}

export interface PermissionTableProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  rows: PermissionRow[];
  columns: PermissionColumn[];
  values: Record<string, Record<string, PermissionValue>>;
  onChange?: (rowId: string, colId: string, value: PermissionValue) => void;
  readOnly?: boolean;
  size?: "sm" | "md";
  showCategories?: boolean;
  cycleValues?: PermissionValue[];
}

const DEFAULT_CYCLE: PermissionValue[] = ["granted", "denied", "none"];
const ICON_SIZE_MAP = { sm: 14, md: 16 } as const;

function PermissionIcon({
  value,
  size,
}: {
  value: PermissionValue;
  size: "sm" | "md";
}) {
  const iconSize = ICON_SIZE_MAP[size];

  switch (value) {
    case "granted":
      return <Check size={iconSize} className={styles.granted} />;
    case "denied":
      return <X size={iconSize} className={styles.denied} />;
    case "partial":
      return <Minus size={iconSize} className={styles.partial} />;
    case "none":
    default:
      return (
        <span className={styles.none} style={{ fontSize: iconSize }}>
          —
        </span>
      );
  }
}

export const PermissionTable = forwardRef<HTMLDivElement, PermissionTableProps>(
  (
    {
      rows,
      columns,
      values,
      onChange,
      readOnly = false,
      size = "md",
      showCategories = true,
      cycleValues = DEFAULT_CYCLE,
      className,
      ...rest
    },
    ref
  ) => {
    const handleCellClick = useCallback(
      (rowId: string, colId: string) => {
        if (readOnly || !onChange) return;
        const current = values[rowId]?.[colId] ?? "none";
        const idx = cycleValues.indexOf(current);
        const next = cycleValues[(idx + 1) % cycleValues.length];
        onChange(rowId, colId, next);
      },
      [readOnly, onChange, values, cycleValues]
    );

    const groupedRows = useMemo(() => {
      if (!showCategories) return [{ category: null, rows }];

      const groups: { category: string | null; rows: PermissionRow[] }[] = [];
      const map = new Map<string | null, PermissionRow[]>();

      for (const row of rows) {
        const cat = row.category ?? null;
        if (!map.has(cat)) {
          const arr: PermissionRow[] = [];
          map.set(cat, arr);
          groups.push({ category: cat, rows: arr });
        }
        map.get(cat)!.push(row);
      }
      return groups;
    }, [rows, showCategories]);

    const rootCls = [
      styles.root,
      size === "sm" ? styles.sm : undefined,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div ref={ref} className={rootCls} {...rest}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            <tr>
              <th className={`${styles.th} ${styles.first}`}>Permission</th>
              {columns.map((col) => (
                <th key={col.id} className={styles.th}>
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groupedRows.map((group) => (
              <React.Fragment key={group.category ?? "__ungrouped__"}>
                {showCategories && group.category && (
                  <tr className={styles.categoryRow}>
                    <td colSpan={columns.length + 1}>{group.category}</td>
                  </tr>
                )}
                {group.rows.map((row) => (
                  <tr key={row.id} className={styles.tr}>
                    <td className={`${styles.td} ${styles.first}`}>
                      <div className={styles.permLabel}>{row.label}</div>
                      {row.description && (
                        <div className={styles.permDesc}>{row.description}</div>
                      )}
                    </td>
                    {columns.map((col) => {
                      const val = values[row.id]?.[col.id] ?? "none";
                      return (
                        <td key={col.id} className={styles.td}>
                          <button
                            type="button"
                            className={`${styles.cell}${readOnly ? ` ${styles.readOnly}` : ""}`}
                            onClick={() => handleCellClick(row.id, col.id)}
                            disabled={readOnly}
                            aria-label={`${row.label} - ${col.label}: ${val}`}
                          >
                            <PermissionIcon value={val} size={size} />
                          </button>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
);

PermissionTable.displayName = "PermissionTable";
