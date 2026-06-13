import type {
  CoupleSession,
  CoupleSessionStatus,
  ParticipantId,
  ParticipantProfile,
  ParticipantResponses,
  RelationshipStatus,
} from "./sessionTypes";
import type { CoupleReport } from "../report/reportTypes";

const allowedTransitions: Record<CoupleSessionStatus, CoupleSessionStatus[]> = {
  not_started: ["participant_a_in_progress"],
  participant_a_in_progress: ["participant_a_sealed"],
  participant_a_sealed: ["handoff_to_participant_b"],
  handoff_to_participant_b: ["participant_b_in_progress"],
  participant_b_in_progress: ["ready_to_reveal"],
  ready_to_reveal: ["revealed"],
  revealed: ["saved", "deleted"],
  saved: ["deleted"],
  deleted: [],
};

function now() {
  return new Date().toISOString();
}

function assertNotDeleted(session: CoupleSession) {
  if (session.status === "deleted") throw new Error("deleted sessions cannot be changed");
}

function assertTransition(from: CoupleSessionStatus, to: CoupleSessionStatus) {
  if (!canTransition(from, to)) throw new Error(`Cannot transition from ${from} to ${to}`);
}

export function canTransition(from: CoupleSessionStatus, to: CoupleSessionStatus) {
  return allowedTransitions[from].includes(to);
}

export function createSession(input: {
  relationshipStatus: RelationshipStatus;
  firstParticipantId: ParticipantId;
  participants: { participantA: ParticipantProfile; participantB: ParticipantProfile };
}): CoupleSession {
  const timestamp = now();
  return {
    id: `session-${timestamp}`,
    relationshipStatus: input.relationshipStatus,
    status: "participant_a_in_progress",
    firstParticipantId: input.firstParticipantId,
    participants: input.participants,
    responses: {},
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function sealParticipantA(session: CoupleSession, responses: ParticipantResponses): CoupleSession {
  assertNotDeleted(session);
  assertTransition(session.status, "participant_a_sealed");
  return {
    ...session,
    status: "participant_a_sealed",
    responses: { ...session.responses, participantA: { ...responses, completedAt: responses.completedAt ?? now() } },
    updatedAt: now(),
  };
}

export function startParticipantB(session: CoupleSession): CoupleSession {
  assertNotDeleted(session);
  const fromSealed = session.status === "participant_a_sealed";
  const fromHandoff = session.status === "handoff_to_participant_b";
  if (!fromSealed && !fromHandoff) throw new Error("participantB can start only after participantA is sealed");
  return {
    ...session,
    status: "participant_b_in_progress",
    updatedAt: now(),
  };
}

export function completeParticipantB(session: CoupleSession, responses: ParticipantResponses): CoupleSession {
  assertNotDeleted(session);
  assertTransition(session.status, "ready_to_reveal");
  return {
    ...session,
    status: "ready_to_reveal",
    responses: { ...session.responses, participantB: { ...responses, completedAt: responses.completedAt ?? now() } },
    updatedAt: now(),
  };
}

export function revealResult(session: CoupleSession, report: CoupleReport): CoupleSession {
  assertNotDeleted(session);
  assertTransition(session.status, "revealed");
  return {
    ...session,
    status: "revealed",
    result: report,
    updatedAt: now(),
  };
}

export function saveResult(session: CoupleSession): CoupleSession {
  assertNotDeleted(session);
  if (session.status !== "revealed") throw new Error("saveResult requires revealed state");
  return {
    ...session,
    status: "saved",
    savedAt: now(),
    updatedAt: now(),
  };
}

export function deleteSession(session: CoupleSession): CoupleSession {
  return {
    ...session,
    status: "deleted",
    responses: {},
    result: undefined,
    updatedAt: now(),
  };
}
