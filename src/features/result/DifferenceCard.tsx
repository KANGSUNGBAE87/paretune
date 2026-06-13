import type { DifferenceReport } from "../../core/report/reportTypes";

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
        <strong>오해가 생기기 쉬운 순간</strong>
        <p>{difference.misunderstandingMoment}</p>
      </div>
      <div className="soft-note soft-note--blue">
        <strong>맞춰가는 방법</strong>
        <p>{difference.adjustmentTip}</p>
      </div>
    </article>
  );
}
