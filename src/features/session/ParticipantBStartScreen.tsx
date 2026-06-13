import { UserRoundCheck } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type ParticipantBStartScreenProps = {
  nickname: string;
  onStart: () => void;
};

export function ParticipantBStartScreen({ nickname, onStart }: ParticipantBStartScreenProps) {
  return (
    <AppShell tone="lavender" bottomAction={<PrimaryButton onClick={onStart}>{t("participantBStart.cta")}</PrimaryButton>}>
      <div className="soft-avatar" aria-hidden>
        <UserRoundCheck />
      </div>
      <ScreenHeader
        kicker={t("participantBStart.kicker")}
        title={t("participantBStart.title", "ko", { nickname })}
        subtitle={t("participantBStart.body")}
      />
      <p className="privacy-pill">{t("handoff.privacy")}</p>
    </AppShell>
  );
}
