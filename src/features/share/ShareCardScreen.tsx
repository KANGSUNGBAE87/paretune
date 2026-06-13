import { Share2 } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { GhostButton } from "../../components/GhostButton";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import type { ShareSummary } from "../../core/report/reportTypes";
import { t } from "../../i18n";
import { SharePreviewCard } from "./SharePreviewCard";

type ShareCardScreenProps = {
  summary: ShareSummary;
  names: [string, string];
  onShare: () => void;
  onBack: () => void;
};

export function ShareCardScreen({ summary, names, onShare, onBack }: ShareCardScreenProps) {
  return (
    <AppShell
      bottomAction={
        <>
          <PrimaryButton onClick={onShare} icon={<Share2 aria-hidden />}>
            {t("share.card.system")}
          </PrimaryButton>
          <GhostButton onClick={onBack}>{t("share.card.back")}</GhostButton>
        </>
      }
    >
      <ScreenHeader title={t("share.card.title")} subtitle={t("share.card.subtitle")} />
      <SharePreviewCard summary={summary} names={names} />
      <p className="safe-share-note">{t("share.card.excluded")}</p>
    </AppShell>
  );
}
