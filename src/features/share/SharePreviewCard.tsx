import type { ShareSummary } from "../../core/report/reportTypes";

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
        <b>잘 맞는 부분</b>
        <p>{summary.alignedArea}</p>
      </div>
      <div>
        <b>오늘의 대화 미션</b>
        <p>{summary.mission}</p>
      </div>
    </article>
  );
}
