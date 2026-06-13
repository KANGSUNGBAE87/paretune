import { LockKeyhole } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type HandoffScreenProps = {
  onNext: () => void;
};

export function HandoffScreen({ onNext }: HandoffScreenProps) {
  return (
    <AppShell bottomAction={<PrimaryButton onClick={onNext}>{t("handoff.cta")}</PrimaryButton>}>
      <div className="seal-graphic" aria-hidden>
        <LockKeyhole />
      </div>
      <ScreenHeader title={t("handoff.title")} subtitle={t("handoff.body")} />
      <p className="privacy-pill">{t("handoff.privacy")}</p>
    </AppShell>
  );
}
