import { ArrowRight, Clock3, MapPinned } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type StartScreenProps = {
  onStart: () => void;
};

export function StartScreen({ onStart }: StartScreenProps) {
  return (
    <AppShell
      bottomAction={
        <>
          <PrimaryButton onClick={onStart} icon={<ArrowRight aria-hidden />}>
            {t("onboarding.start.cta")}
          </PrimaryButton>
          <p className="bottom-meta">
            <Clock3 size={16} aria-hidden /> {t("onboarding.start.meta")}
          </p>
        </>
      }
    >
      <div className="brand-mark" aria-hidden>
        <MapPinned />
      </div>
      <div className="map-hero" aria-hidden>
        <span className="avatar-dot avatar-dot--coral" />
        <span className="path-line" />
        <span className="avatar-dot avatar-dot--lavender" />
      </div>
      <ScreenHeader title={t("onboarding.start.title")} subtitle={t("onboarding.start.subtitle")} />
    </AppShell>
  );
}
