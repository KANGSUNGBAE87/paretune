import type { ButtonHTMLAttributes } from "react";

export function GhostButton({ children, className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={`button button--ghost ${className}`} {...props}>
      {children}
    </button>
  );
}
