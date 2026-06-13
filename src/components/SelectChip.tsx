import type { ButtonHTMLAttributes } from "react";

type SelectChipProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export function SelectChip({ children, selected, className = "", ...props }: SelectChipProps) {
  return (
    <button className={`select-chip ${selected ? "is-selected" : ""} ${className}`} type="button" {...props}>
      {children}
    </button>
  );
}
