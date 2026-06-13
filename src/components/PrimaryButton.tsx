import type { ButtonHTMLAttributes, ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode;
};

export function PrimaryButton({ children, icon, className = "", ...props }: Props) {
  return (
    <button className={`button button--primary ${className}`} {...props}>
      <span>{children}</span>
      {icon}
    </button>
  );
}
