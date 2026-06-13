import type { CoupleReport } from "../report/reportTypes";

export type ParticipantId = "participantA" | "participantB";

export type RelationshipStatus = "dating" | "married" | "situationship";

export type CoupleSessionStatus =
  | "not_started"
  | "participant_a_in_progress"
  | "participant_a_sealed"
  | "handoff_to_participant_b"
  | "participant_b_in_progress"
  | "ready_to_reveal"
  | "revealed"
  | "saved"
  | "deleted";

export type ParticipantProfile = {
  id: ParticipantId;
  nickname: string;
  gender?: "female" | "male" | "custom" | "unspecified";
  customGenderLabel?: string;
};

export type QuestionDomain =
  | "relationship_energy"
  | "closeness_style"
  | "affection_expression"
  | "conflict_recovery"
  | "adjustment_anchor";

export type Question = {
  id: string;
  domain: QuestionDomain;
  facet: string;
  textKey: string;
  reverseScored: boolean;
  resultTags: string[];
  version: number;
};

export type QuestionResponse = {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
};

export type ParticipantResponses = {
  participantId: ParticipantId;
  questionSetVersion: number;
  answers: QuestionResponse[];
  completedAt?: string;
};

export type CoupleSession = {
  id: string;
  relationshipStatus: RelationshipStatus;
  status: CoupleSessionStatus;
  firstParticipantId: ParticipantId;
  participants: {
    participantA: ParticipantProfile;
    participantB: ParticipantProfile;
  };
  responses: {
    participantA?: ParticipantResponses;
    participantB?: ParticipantResponses;
  };
  result?: CoupleReport;
  createdAt: string;
  updatedAt: string;
  savedAt?: string;
};
