type ResultSummaryCardProps = {
  summary: string;
  names: [string, string];
};

export function ResultSummaryCard({ summary, names }: ResultSummaryCardProps) {
  return (
    <article className="result-summary-card">
      <div className="couple-avatars" aria-hidden>
        <span data-initial={names[0].slice(0, 1)} />
        <i />
        <span data-initial={names[1].slice(0, 1)} />
      </div>
      <h2>{summary}</h2>
    </article>
  );
}
