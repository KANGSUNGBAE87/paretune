import type { Locale } from "../../i18n";
import { resultAxes } from "../questions/resultAxes";
import { getDifferenceTemplate } from "../report/resultTemplates";
import type { CoupleReport, MissionIntensity, ReportTone } from "../report/reportTypes";
import type { CoupleSession } from "../session/sessionTypes";
import type { CoupleDifference } from "./compareParticipants";
import { selectAlignedAreas } from "./selectAlignedAreas";
import { selectTopDifferences } from "./selectTopDifferences";
import type { ParticipantScore } from "./scoreParticipant";

function toneFromAdjustment(scoreA: ParticipantScore, scoreB: ParticipantScore): { tone: ReportTone; intensity: MissionIntensity } {
  const average = (scoreA.adjustmentReadiness + scoreB.adjustmentReadiness) / 2;
  if (average <= 2.4) return { tone: "cautious", intensity: "low" };
  if (average >= 3.6) return { tone: "action_oriented", intensity: "high" };
  return { tone: "neutral", intensity: "medium" };
}

function describeSide(template: ReturnType<typeof getDifferenceTemplate>, value: number) {
  return value >= 3.5 ? template.high : template.low;
}

function alignedCopy(locale: Locale, area: { title: string; body: string }) {
  if (locale === "en") {
    return area.body.includes("routine_care") || area.title.includes("routine_care")
      ? "Both of you tend to value steady everyday care."
      : "You already share a point that can help the relationship feel comfortable.";
  }
  return area.body.includes("routine_care") || area.title.includes("routine_care")
    ? "두 사람 모두 일상 속에서 꾸준히 챙겨주는 행동을 소중하게 느끼는 편이에요."
    : "두 사람은 서로를 편안하게 만드는 지점을 이미 함께 가지고 있어요.";
}

export function generateCoupleReport(
  session: CoupleSession,
  scoreA: ParticipantScore,
  scoreB: ParticipantScore,
  differences: CoupleDifference[],
  locale: Locale = "ko",
): CoupleReport {
  const nameA = session.participants.participantA.nickname;
  const nameB = session.participants.participantB.nickname;
  const { tone, intensity } = toneFromAdjustment(scoreA, scoreB);
  const aligned = selectAlignedAreas(scoreA, scoreB, resultAxes, 2);
  const top = selectTopDifferences(differences, 3);

  const alignedAreas =
    aligned.length > 0
      ? aligned.map((area) => ({
          title: locale === "en" ? "Where we already feel steady" : "함께 안정감을 느끼는 부분",
          body: alignedCopy(locale, area),
        }))
      : [
          {
            title: locale === "en" ? "Ready to adjust together" : "같이 맞춰갈 준비",
            body:
              locale === "en"
                ? "Both of you are already looking at ways to make the relationship more comfortable."
                : "두 사람 모두 관계를 더 편하게 만들어갈 여지를 함께 보고 있어요.",
          },
        ];

  const topDifferences = top.map((difference) => {
    const template = getDifferenceTemplate(difference, locale);
    return {
      axis: difference.axis,
      title: template.title,
      participantADescription:
        locale === "en" ? nameA + " " + describeSide(template, difference.participantAValue) : nameA + "님은 " + describeSide(template, difference.participantAValue),
      participantBDescription:
        locale === "en" ? nameB + " " + describeSide(template, difference.participantBValue) : nameB + "님은 " + describeSide(template, difference.participantBValue),
      misunderstandingMoment: template.misunderstanding,
      adjustmentTip: template.adjustment,
      agreementSuggestion: template.agreement,
      dailyMission: template.mission,
    };
  });

  const primaryDifference = topDifferences[0];
  const summary = primaryDifference
    ? locale === "en"
      ? nameA + " and " + nameB + " show a difference around " + primaryDifference.title + ", but you can find a rhythm that feels comfortable for both."
      : nameA + "님과 " + nameB + "님은 " + primaryDifference.title + "에서 차이가 보이지만, 서로가 편안해지는 방식을 함께 찾을 수 있어요."
    : locale === "en"
      ? nameA + " and " + nameB + " may express things differently, but you share a base for making each other comfortable."
      : nameA + "님과 " + nameB + "님은 표현의 방식은 조금 달라도 서로를 편안하게 만들 수 있는 공통점을 가지고 있어요.";

  const missionBody =
    tone === "cautious"
      ? locale === "en"
        ? "Today, do not try to change many things. Just name one relationship style that feels comfortable."
        : "오늘은 많은 것을 바꾸기보다, 서로에게 편안한 관계 방식 하나만 가볍게 말해보세요."
      : primaryDifference?.dailyMission ??
        (locale === "en"
          ? "Today, each person shares one relationship style that helps them feel comfortable."
          : "오늘 서로에게 내가 편안함을 느끼는 관계 방식을 하나씩 말해보세요.");

  return {
    summary,
    tone,
    alignedAreas,
    topDifferences,
    agreements: [
      {
        title: locale === "en" ? "Our small agreement" : "우리의 작은 합의문",
        body:
          primaryDifference?.agreementSuggestion ??
          (locale === "en"
            ? "Instead of deciding what a difference means right away, listen first to why it matters."
            : "차이를 바로 결론내기보다, 서로에게 중요한 이유를 먼저 들어보기로 해요."),
      },
    ],
    mission: {
      title: locale === "en" ? "Today's conversation mission" : "오늘의 대화 미션",
      body: missionBody,
      intensity,
    },
    shareSummary: {
      title: locale === "en" ? "Couple tendency map" : "커플 성향지도",
      oneLineSummary: summary,
      alignedArea:
        alignedAreas[0]?.body ??
        (locale === "en" ? "You both have a willingness to understand each other." : "서로를 이해하려는 마음을 함께 가지고 있어요."),
      mission: missionBody,
    },
    safetyNoteKey: "result.safety.note",
  };
}
