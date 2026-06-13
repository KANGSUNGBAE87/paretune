import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export function SecondaryButton({ children, icon, className = "", ...props }: Props) {
  return (
    <button className={`button button--secondary ${className}`} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
