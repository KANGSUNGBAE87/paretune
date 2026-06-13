import type { DifferenceReport } from "../../core/report/reportTypes";
import { t } from "../../i18n";

type DifferenceCardProps = {
  index: number;
  difference: DifferenceReport;
};

export function DifferenceCard({ index, difference }: DifferenceCardProps) {
  return (
    <article className="section-card difference-card">
      <div className="card-heading">
        <span>{index}</span>
        <h3>{difference.title}</h3>
      </div>
      <p>{difference.participantADescription}</p>
      <p>{difference.participantBDescription}</p>
      <div className="soft-note">
        <strong>{t("result.misunderstanding.title")}</strong>
        <p>{difference.misunderstandingMoment}</p>
      </div>
      <div className="soft-note soft-note--blue">
        <strong>{t("result.adjustment.title")}</strong>
        <p>{difference.adjustmentTip}</p>
      </div>
    </article>
  );
}
