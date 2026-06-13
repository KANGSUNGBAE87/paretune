import type { AgreementSuggestion } from "../../core/report/reportTypes";

type AgreementCardProps = {
  agreement: AgreementSuggestion;
};

export function AgreementCard({ agreement }: AgreementCardProps) {
  return (
    <article className="section-card agreement-card">
      <h3>{agreement.title}</h3>
      <p>{agreement.body}</p>
    </article>
  );
}
