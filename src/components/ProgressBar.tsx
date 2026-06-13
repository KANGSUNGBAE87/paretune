type ProgressBarProps = {
  current: number;
  total: number;
  label: string;
};

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const value = Math.round((current / total) * 100);
  return (
    <div className="progress-wrap" aria-label={`${label} ${current} / ${total}`}>
      <div className="progress-meta">
        <span>{label}</span>
        <strong>
          {current} / {total}
        </strong>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}
