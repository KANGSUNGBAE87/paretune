import { Sparkles } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type ReadyToRevealScreenProps = {
  onReveal: () => void;
};

export function ReadyToRevealScreen({ onReveal }: ReadyToRevealScreenProps) {
  return (
    <AppShell bottomAction={<PrimaryButton onClick={onReveal}>{t("reveal.cta")}</PrimaryButton>}>
      <div className="together-graphic" aria-hidden>
        <Sparkles />
      </div>
      <ScreenHeader title={t("reveal.title")} subtitle={t("reveal.body")} />
    </AppShell>
  );
}
