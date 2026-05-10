import {
  forwardRef,
  type HTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import styles from "./Table.module.css";

/* ── Table ── */
export interface TableProps extends HTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, children, ...rest }, ref) => (
    <table
      ref={ref}
      className={[styles.table, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </table>
  ),
);
Table.displayName = "Table";

/* ── TableHeader ── */
export interface TableHeaderProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableHeader = forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, children, ...rest }, ref) => (
  <thead
    ref={ref}
    className={[styles.thead, className ?? ""].filter(Boolean).join(" ")}
    {...rest}
  >
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

/* ── TableBody ── */
export interface TableBodyProps
  extends HTMLAttributes<HTMLTableSectionElement> {}

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className, children, ...rest }, ref) => (
    <tbody
      ref={ref}
      className={[styles.tbody, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </tbody>
  ),
);
TableBody.displayName = "TableBody";

/* ── TableRow ── */
export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {}

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, children, ...rest }, ref) => (
    <tr
      ref={ref}
      className={[styles.tr, className ?? ""].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </tr>
  ),
);
TableRow.displayName = "TableRow";

/* ── TableHead (th) ── */
export interface TableHeadProps extends ThHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

export const TableHead = forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ numeric = false, className, children, ...rest }, ref) => (
    <th
      ref={ref}
      className={[
        styles.th,
        numeric ? styles.numeric : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </th>
  ),
);
TableHead.displayName = "TableHead";

/* ── TableCell (td) ── */
export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  numeric?: boolean;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ numeric = false, className, children, ...rest }, ref) => (
    <td
      ref={ref}
      className={[
        styles.td,
        numeric ? styles.numeric : "",
        className ?? "",
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </td>
  ),
);
TableCell.displayName = "TableCell";
