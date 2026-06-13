import { describe, expect, it } from "vitest";
import type { ParticipantResponses } from "../session/sessionTypes";
import { questions } from "../questions/questions";
import { resultAxes } from "../questions/resultAxes";
import { scoreParticipant } from "./scoreParticipant";
import { compareParticipants } from "./compareParticipants";
import { selectAlignedAreas } from "./selectAlignedAreas";
import { selectTopDifferences } from "./selectTopDifferences";

function makeResponses(participantId: "participantA" | "participantB", value: 1 | 2 | 3 | 4 | 5): ParticipantResponses {
  return {
    participantId,
    questionSetVersion: 1,
    answers: questions.map((question) => ({ questionId: question.id, value })),
  };
}

describe("couple comparison", () => {
  it("classifies identical responses as similar and clear opposites as clear", () => {
    const scoreA = scoreParticipant(makeResponses("participantA", 1), questions, resultAxes);
    const sameB = scoreParticipant(makeResponses("participantB", 1), questions, resultAxes);
    const oppositeB = scoreParticipant(makeResponses("participantB", 5), questions, resultAxes);

    expect(compareParticipants(scoreA, sameB, resultAxes).every((difference) => difference.differenceLevel === "similar")).toBe(true);
    expect(compareParticipants(scoreA, oppositeB, resultAxes).some((difference) => difference.differenceLevel === "clear")).toBe(true);
  });

  it("returns aligned areas before limiting top differences to three", () => {
    const scoreA = scoreParticipant(makeResponses("participantA", 5), questions, resultAxes);
    const scoreB = scoreParticipant(makeResponses("participantB", 5), questions, resultAxes);
    const aligned = selectAlignedAreas(scoreA, scoreB, resultAxes);

    expect(aligned.length).toBeGreaterThan(0);
    expect(aligned[0].titleKey).toMatch(/^result\.aligned\./);

    const oppositeB = scoreParticipant(makeResponses("participantB", 1), questions, resultAxes);
    const top = selectTopDifferences(compareParticipants(scoreA, oppositeB, resultAxes), 3);
    expect(top).toHaveLength(3);
  });
});
