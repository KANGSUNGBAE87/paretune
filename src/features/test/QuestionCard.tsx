type QuestionCardProps = {
  question: string;
};

export function QuestionCard({ question }: QuestionCardProps) {
  return (
    <article className="question-card">
      <span aria-hidden className="quote-mark">
        "
      </span>
      <h2>{question}</h2>
    </article>
  );
}
