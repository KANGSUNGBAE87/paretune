import type { ResultAxis } from "../questions/resultAxes";
import type { ReportSection } from "../report/reportTypes";
import type { ParticipantScore } from "./scoreParticipant";

export function selectAlignedAreas(scoreA: ParticipantScore, scoreB: ParticipantScore, axes: ResultAxis[], limit = 2): ReportSection[] {
  return axes
    .map((axis) => {
      const a = scoreA.axisScores[axis.id];
      const b = scoreB.axisScores[axis.id];
      if (!a || !b) return undefined;
      return {
        axis,
        difference: Math.abs(a.value - b.value),
        average: (a.value + b.value) / 2,
      };
    })
    .filter((item): item is { axis: ResultAxis; difference: number; average: number } => Boolean(item))
    .filter((item) => item.difference <= 0.9 || item.average >= 3.6)
    .sort((left, right) => left.difference - right.difference || right.average - left.average)
    .slice(0, limit)
    .map((item) => ({
      titleKey: `result.aligned.${item.axis.id}.title`,
      title: item.axis.titleKey,
      body: `result.aligned.${item.axis.id}.body`,
    }));
}
