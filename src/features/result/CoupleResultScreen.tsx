import { Download, House, Settings, Share2, Trash2 } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { GhostButton } from "../../components/GhostButton";
import { PrimaryButton } from "../../components/PrimaryButton";
import { SecondaryButton } from "../../components/SecondaryButton";
import type { CoupleReport } from "../../core/report/reportTypes";
import { t } from "../../i18n";
import { AgreementCard } from "./AgreementCard";
import { DifferenceCard } from "./DifferenceCard";
import { MissionCard } from "./MissionCard";
import { ResultSummaryCard } from "./ResultSummaryCard";

type CoupleResultScreenProps = {
  report: CoupleReport;
  names: [string, string];
  isSaved: boolean;
  onSave: () => void;
  onShare: () => void;
  onHome: () => void;
  onDelete: () => void;
  onSettings: () => void;
};

export function CoupleResultScreen({ report, names, isSaved, onSave, onShare, onHome, onDelete, onSettings }: CoupleResultScreenProps) {
  return (
    <AppShell>
      <div className="top-bar">
        <span>{t("app.title")}</span>
        <GhostButton aria-label="설정" onClick={onSettings}>
          <Settings size={20} aria-hidden />
        </GhostButton>
      </div>
      <h1 className="result-title">{t("result.title")}</h1>
      <ResultSummaryCard summary={report.summary} names={names} />
      <section className="result-section">
        <h2>{t("result.aligned.title")}</h2>
        {report.alignedAreas.map((area, index) => (
          <article className="section-card" key={`${area.title}-${index}`}>
            <h3>{area.title}</h3>
            <p>{area.body}</p>
          </article>
        ))}
      </section>
      <section className="result-section">
        <h2>{t("result.difference.title")}</h2>
        {report.topDifferences.map((difference, index) => (
          <DifferenceCard key={difference.axis} index={index + 1} difference={difference} />
        ))}
      </section>
      <AgreementCard agreement={report.agreements[0]} />
      <MissionCard mission={report.mission} />
      <p className="safe-share-note">{t("share.card.excluded")}</p>
      <p className="action-hint">{t("result.save.notice")}</p>
      <div className="action-stack">
        <PrimaryButton onClick={onSave} icon={<Download aria-hidden />}>
          {isSaved ? t("result.saved") : t("result.save.cta")}
        </PrimaryButton>
        <SecondaryButton onClick={onShare} icon={<Share2 aria-hidden />}>
          {t("result.share.cta")}
        </SecondaryButton>
        <GhostButton onClick={onHome}>
          <House size={18} aria-hidden /> {t("result.home.cta")}
        </GhostButton>
        <GhostButton className="danger-link" onClick={onDelete}>
          <Trash2 size={18} aria-hidden /> {t("result.delete.cta")}
        </GhostButton>
      </div>
    </AppShell>
  );
}
