import { MessageCircle, ShieldCheck, Siren } from "lucide-react";
import { AppShell } from "../../components/AppShell";
import { NoticeCard } from "../../components/NoticeCard";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type SafetyNoticeScreenProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  onNext: () => void;
};

export function SafetyNoticeScreen({ checked, onCheckedChange, onNext }: SafetyNoticeScreenProps) {
  return (
    <AppShell
      bottomAction={
        <PrimaryButton disabled={!checked} onClick={onNext}>
          {t("onboarding.safety.cta")}
        </PrimaryButton>
      }
    >
      <ScreenHeader title={t("onboarding.safety.title")} subtitle={t("onboarding.safety.subtitle")} />
      <div className="stack">
        <NoticeCard
          icon={<MessageCircle aria-hidden />}
          title={t("onboarding.safety.conversation.title")}
          body={t("onboarding.safety.conversation.body")}
        />
        <NoticeCard
          icon={<ShieldCheck aria-hidden />}
          title={t("onboarding.safety.understanding.title")}
          body={t("onboarding.safety.understanding.body")}
          tone="lavender"
        />
        <NoticeCard icon={<Siren aria-hidden />} title={t("onboarding.safety.safeFirst.title")} body={t("onboarding.safety.body")} />
      </div>
      <label className="checkbox-card">
        <input type="checkbox" checked={checked} onChange={(event) => onCheckedChange(event.target.checked)} />
        <span>{t("onboarding.safety.checkbox")}</span>
      </label>
    </AppShell>
  );
}
