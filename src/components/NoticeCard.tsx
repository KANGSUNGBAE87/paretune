import type { ReactNode } from "react";

type NoticeCardProps = {
  title: string;
  body: string;
  icon?: ReactNode;
  tone?: "warm" | "blue" | "lavender";
};

export function NoticeCard({ title, body, icon, tone = "warm" }: NoticeCardProps) {
  return (
    <article className={`notice-card notice-card--${tone}`}>
      {icon ? <div className="notice-icon">{icon}</div> : null}
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </article>
  );
}
