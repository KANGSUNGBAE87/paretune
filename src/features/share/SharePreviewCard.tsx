import type { ShareSummary } from "../../core/report/reportTypes";
import { t } from "../../i18n";

type SharePreviewCardProps = {
  summary: ShareSummary;
  names: [string, string];
};

export function SharePreviewCard({ summary, names }: SharePreviewCardProps) {
  return (
    <article className="share-preview-card">
      <header>
        <strong>{summary.title}</strong>
        <span>
          {names[0]} & {names[1]}
        </span>
      </header>
      <h2>{summary.oneLineSummary}</h2>
      <div>
        <b>{t("share.card.aligned")}</b>
        <p>{summary.alignedArea}</p>
      </div>
      <div>
        <b>{t("share.card.mission")}</b>
        <p>{summary.mission}</p>
      </div>
    </article>
  );
}
