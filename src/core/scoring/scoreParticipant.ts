import type { ResultAxis } from "../questions/resultAxes";
import type { ParticipantId, ParticipantResponses, Question } from "../session/sessionTypes";

export type AxisScore = {
  axis: string;
  value: number;
  pattern?: string;
  sourceQuestionIds: string[];
};

export type ParticipantScore = {
  participantId: ParticipantId;
  questionScores: Record<string, number>;
  axisScores: Record<string, AxisScore>;
  adjustmentReadiness: number;
};

function correctedValue(answerValue: number, question: Question) {
  return question.reverseScored ? 6 - answerValue : answerValue;
}

function patternFor(axis: ResultAxis, values: Record<string, number>) {
  if (axis.kind !== "paired_pattern") return undefined;
  const [first, second] = axis.questionIds.map((id) => values[id] ?? 3);
  const firstHigh = first >= 3.6;
  const secondHigh = second >= 3.6;
  const firstLow = first <= 2.4;
  const secondLow = second <= 2.4;

  if (axis.id === "conflict_timing") {
    if (firstHigh && secondLow) return "immediate_talk";
    if (firstLow && secondHigh) return "cooling_time";
    if (firstHigh && secondHigh) return "both_fast_and_cooling";
    return "low_conflict_focus";
  }

  if (axis.id === "empathy_solution_balance") {
    if (firstHigh && secondLow) return "empathy_first";
    if (firstLow && secondHigh) return "solution_first";
    if (firstHigh && secondHigh) return "both_empathy_and_solution";
    return "low_conflict_engagement";
  }

  return undefined;
}

export function scoreParticipant(
  responses: ParticipantResponses,
  questionSet: Question[],
  axes: ResultAxis[],
): ParticipantScore {
  const byQuestion = new Map(questionSet.map((question) => [question.id, question]));
  const questionScores: Record<string, number> = {};

  for (const answer of responses.answers) {
    const question = byQuestion.get(answer.questionId);
    if (!question) continue;
    questionScores[answer.questionId] = correctedValue(answer.value, question);
  }

  const adjustmentReadiness = questionScores.q25 ?? 3;
  const axisScores: Record<string, AxisScore> = {};

  for (const axis of axes) {
    const values = axis.questionIds.map((id) => questionScores[id]).filter((value): value is number => typeof value === "number");
    if (values.length === 0) continue;
    const value = values.reduce((sum, current) => sum + current, 0) / values.length;
    axisScores[axis.id] = {
      axis: axis.id,
      value,
      pattern: patternFor(axis, questionScores),
      sourceQuestionIds: axis.questionIds,
    };
  }

  return {
    participantId: responses.participantId,
    questionScores,
    axisScores,
    adjustmentReadiness,
  };
}
