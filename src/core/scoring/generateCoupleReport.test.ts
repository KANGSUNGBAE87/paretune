import { describe, expect, it } from "vitest";
import { questions } from "../questions/questions";
import { resultAxes } from "../questions/resultAxes";
import type { CoupleSession, ParticipantResponses } from "../session/sessionTypes";
import { compareParticipants } from "./compareParticipants";
import { generateCoupleReport } from "./generateCoupleReport";
import { scoreParticipant } from "./scoreParticipant";

function responses(participantId: "participantA" | "participantB", base: 1 | 3 | 5, q25: 1 | 3 | 5): ParticipantResponses {
  return {
    participantId,
    questionSetVersion: 1,
    answers: questions.map((question) => ({ questionId: question.id, value: question.id === "q25" ? q25 : base })),
  };
}

const session: CoupleSession = {
  id: "session-1",
  relationshipStatus: "dating",
  status: "ready_to_reveal",
  firstParticipantId: "participantA",
  participants: {
    participantA: { id: "participantA", nickname: "지민", gender: "unspecified" },
    participantB: { id: "participantB", nickname: "민수", gender: "unspecified" },
  },
  responses: {},
  createdAt: "2026-06-13T00:00:00.000Z",
  updatedAt: "2026-06-13T00:00:00.000Z",
};

describe("generateCoupleReport", () => {
  it("creates a safe report with aligned areas, up to three differences, agreement, mission, and share summary", () => {
    const scoreA = scoreParticipant(responses("participantA", 5, 5), questions, resultAxes);
    const scoreB = scoreParticipant(responses("participantB", 1, 5), questions, resultAxes);
    const report = generateCoupleReport(session, scoreA, scoreB, compareParticipants(scoreA, scoreB, resultAxes), "ko");

    expect(report.summary).toContain("지민");
    expect(report.alignedAreas.length).toBeGreaterThan(0);
    expect(report.topDifferences.length).toBeLessThanOrEqual(3);
    expect(report.agreements[0].body).not.toContain("상대가 바뀌어야");
    expect(report.mission.body.length).toBeGreaterThan(0);
    expect(JSON.stringify(report.shareSummary)).not.toMatch(/q\d{2}|raw|score|위험/);
  });

  it("uses q25 only to tune report tone and mission intensity", () => {
    const cautiousA = scoreParticipant(responses("participantA", 3, 1), questions, resultAxes);
    const cautiousB = scoreParticipant(responses("participantB", 3, 1), questions, resultAxes);
    const report = generateCoupleReport(session, cautiousA, cautiousB, compareParticipants(cautiousA, cautiousB, resultAxes), "ko");

    expect(report.tone).toBe("cautious");
    expect(report.mission.intensity).toBe("low");
  });
});
