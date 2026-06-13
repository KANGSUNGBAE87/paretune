import type { ResultAxis } from "../questions/resultAxes";
import type { ParticipantScore } from "./scoreParticipant";

export type DifferenceLevel = "similar" | "mild" | "clear";

export type CoupleDifference = {
  axis: string;
  participantAValue: number;
  participantBValue: number;
  differenceSize: number;
  differenceLevel: DifferenceLevel;
  participantAPattern?: string;
  participantBPattern?: string;
  sensitivity: "normal" | "sensitive";
};

function level(size: number): DifferenceLevel {
  if (size >= 2) return "clear";
  if (size >= 1) return "mild";
  return "similar";
}

export function compareParticipants(scoreA: ParticipantScore, scoreB: ParticipantScore, axes: ResultAxis[]): CoupleDifference[] {
  return axes.reduce<CoupleDifference[]>((differences, axis) => {
    const a = scoreA.axisScores[axis.id];
    const b = scoreB.axisScores[axis.id];
    if (!a || !b) return differences;
    const differenceSize = Math.abs(a.value - b.value);
    differences.push({
      axis: axis.id,
      participantAValue: a.value,
      participantBValue: b.value,
      differenceSize,
      differenceLevel: level(differenceSize),
      participantAPattern: a.pattern,
      participantBPattern: b.pattern,
      sensitivity: axis.sensitivity,
    });
    return differences;
  }, []);
}
