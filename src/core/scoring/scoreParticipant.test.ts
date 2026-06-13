import { describe, expect, it } from "vitest";
import type { ParticipantResponses } from "../session/sessionTypes";
import { questions } from "../questions/questions";
import { resultAxes } from "../questions/resultAxes";
import { scoreParticipant } from "./scoreParticipant";

const responses: ParticipantResponses = {
  participantId: "participantA",
  questionSetVersion: 1,
  answers: questions.map((question, index) => ({
    questionId: question.id,
    value: question.id === "q25" ? 2 : ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
  })),
};

describe("scoreParticipant", () => {
  it("excludes q25 from result axes and stores it as adjustmentReadiness", () => {
    const score = scoreParticipant(responses, questions, resultAxes);

    expect(score.adjustmentReadiness).toBe(2);
    expect(score.axisScores.adjustment_anchor).toBeUndefined();
    expect(Object.values(score.axisScores).flatMap((axis) => axis.sourceQuestionIds)).not.toContain("q25");
  });

  it("supports reverse scoring without changing raw responses", () => {
    const reversedQuestions = questions.map((question) =>
      question.id === "q01" ? { ...question, reverseScored: true } : question,
    );
    const score = scoreParticipant(responses, reversedQuestions, resultAxes);

    expect(score.questionScores.q01).toBe(5);
    expect(responses.answers.find((answer) => answer.questionId === "q01")?.value).toBe(1);
  });
});
