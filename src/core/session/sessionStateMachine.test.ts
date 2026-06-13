import { describe, expect, it } from "vitest";
import { questions } from "../questions/questions";
import type { ParticipantResponses } from "./sessionTypes";
import {
  canTransition,
  completeParticipantB,
  createSession,
  deleteSession,
  revealResult,
  saveResult,
  sealParticipantA,
  startParticipantB,
} from "./sessionStateMachine";

const answers: ParticipantResponses = {
  participantId: "participantA",
  questionSetVersion: 1,
  answers: questions.map((question) => ({ questionId: question.id, value: 3 })),
};

describe("sessionStateMachine", () => {
  it("allows only the sealed handoff flow before revealing results", () => {
    const session = createSession({
      relationshipStatus: "dating",
      firstParticipantId: "participantA",
      participants: {
        participantA: { id: "participantA", nickname: "지민", gender: "unspecified" },
        participantB: { id: "participantB", nickname: "민수", gender: "unspecified" },
      },
    });

    expect(canTransition("participant_a_sealed", "revealed")).toBe(false);
    const sealed = sealParticipantA(session, answers);
    expect(sealed.status).toBe("participant_a_sealed");
    const second = startParticipantB(sealed);
    expect(second.status).toBe("participant_b_in_progress");
    const ready = completeParticipantB(second, { ...answers, participantId: "participantB" });
    expect(ready.status).toBe("ready_to_reveal");
  });

  it("requires revealed state before saving and blocks deleted sessions", () => {
    const session = createSession({
      relationshipStatus: "dating",
      firstParticipantId: "participantA",
      participants: {
        participantA: { id: "participantA", nickname: "지민", gender: "unspecified" },
        participantB: { id: "participantB", nickname: "민수", gender: "unspecified" },
      },
    });

    expect(() => saveResult(session)).toThrow(/revealed/);
    const revealed = revealResult(
      { ...session, status: "ready_to_reveal" },
      {
        summary: "safe",
        tone: "neutral",
        alignedAreas: [],
        topDifferences: [],
        agreements: [],
        mission: { title: "mission", body: "body", intensity: "medium" },
        shareSummary: { title: "share", oneLineSummary: "safe", alignedArea: "safe", mission: "safe" },
        safetyNoteKey: "result.safety.note",
      },
    );
    expect(saveResult(revealed).status).toBe("saved");
    const deleted = deleteSession(revealed);
    expect(deleted.status).toBe("deleted");
    expect(() => startParticipantB(deleted)).toThrow(/deleted/);
  });
});
