export type ReportTone = "cautious" | "neutral" | "action_oriented";
export type MissionIntensity = "low" | "medium" | "high";

export type ReportSection = {
  titleKey?: string;
  title: string;
  body: string;
};

export type DifferenceReport = {
  axis: string;
  title: string;
  participantADescription: string;
  participantBDescription: string;
  misunderstandingMoment: string;
  adjustmentTip: string;
  agreementSuggestion: string;
  dailyMission: string;
};

export type AgreementSuggestion = {
  title: string;
  body: string;
};

export type DailyMission = {
  title: string;
  body: string;
  intensity: MissionIntensity;
};

export type ShareSummary = {
  title: string;
  oneLineSummary: string;
  alignedArea: string;
  mission: string;
};

export type CoupleReport = {
  summary: string;
  tone: ReportTone;
  alignedAreas: ReportSection[];
  topDifferences: DifferenceReport[];
  agreements: AgreementSuggestion[];
  mission: DailyMission;
  shareSummary: ShareSummary;
  safetyNoteKey: string;
};
