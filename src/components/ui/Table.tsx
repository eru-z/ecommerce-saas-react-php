import {
  ReactNode,
  TableHTMLAttributes,
  HTMLAttributes,
  TdHTMLAttributes,
  ThHTMLAttributes,
} from 'react';

/* =========================
   SHARED BASE PROPS
========================= */

interface BaseProps {
  children: ReactNode;
  className?: string;
}

/* =========================
   TABLE WRAPPER
========================= */

interface TableProps extends TableHTMLAttributes<HTMLTableElement> {
  className?: string;
}

export const Table = ({ children, className = '', ...props }: TableProps) => {
  return (
    <div className="relative overflow-x-auto">
      <table
        {...props}
        className={`
          w-full border-collapse
          text-white
          ${className}
        `}
      >
        {children}
      </table>
    </div>
  );
};

/* =========================
   TABLE HEAD
========================= */

export const TableHead = ({ children, className = '' }: BaseProps) => {
  return (
    <thead
      className={`
        border-b border-neutral-800
        bg-neutral-900
        ${className}
      `}
    >
      {children}
    </thead>
  );
};

/* =========================
   TABLE BODY
========================= */

export const TableBody = ({ children, className = '' }: BaseProps) => {
  return (
    <tbody className={`divide-y divide-neutral-800 ${className}`}>
      {children}
    </tbody>
  );
};

/* =========================
   TABLE ROW
========================= */

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string;
}

export const TableRow = ({
  children,
  className = '',
  ...props
}: TableRowProps) => {
  return (
    <tr
      {...props}
      className={`
        transition-colors duration-200
        hover:bg-neutral-800/40
        ${className}
      `}
    >
      {children}
    </tr>
  );
};

/* =========================
   TABLE HEADER CELL (th)
========================= */

interface TableHeaderProps
  extends ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export const TableHeader = ({
  children,
  className = '',
  ...props
}: TableHeaderProps) => {
  return (
    <th
      {...props}
      className={`
        px-6 py-4 text-left
        text-xs font-medium uppercase tracking-widest
        text-white
        ${className}
      `}
    >
      {children}
    </th>
  );
};

/* =========================
   TABLE CELL (td)
========================= */

interface TableCellProps
  extends TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}

export const TableCell = ({
  children,
  className = '',
  ...props
}: TableCellProps) => {
  return (
    <td
      {...props}
      className={`
        px-6 py-4 text-sm
        text-white
        ${className}
      `}
    >
      {children}
    </td>
  );
};
