import type { DailyMission } from "../../core/report/reportTypes";

type MissionCardProps = {
  mission: DailyMission;
};

export function MissionCard({ mission }: MissionCardProps) {
  return (
    <article className="section-card mission-card">
      <h3>{mission.title}</h3>
      <p>{mission.body}</p>
    </article>
  );
}
