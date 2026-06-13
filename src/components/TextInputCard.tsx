import type { InputHTMLAttributes } from "react";

type TextInputCardProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function TextInputCard({ label, ...props }: TextInputCardProps) {
  return (
    <label className="input-card">
      <span>{label}</span>
      <input {...props} />
    </label>
  );
}
