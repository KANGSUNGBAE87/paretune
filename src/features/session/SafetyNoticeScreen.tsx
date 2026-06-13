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
      <ScreenHeader title={t("onboarding.safety.title")} subtitle="우리 사이를 더 이해하기 위한 도구예요." />
      <div className="stack">
        <NoticeCard
          icon={<MessageCircle aria-hidden />}
          title="대화의 시작을 돕는 참고 결과"
          body="우리가 나누는 대화가 더 쉬워질 수 있도록 도와줘요."
        />
        <NoticeCard
          icon={<ShieldCheck aria-hidden />}
          title="비난보다 이해를 위한 결과"
          body="옳고 그름을 가리기보다, 서로의 다름을 이해하는 데 집중해요."
          tone="lavender"
        />
        <NoticeCard icon={<Siren aria-hidden />} title="불편한 관계에서는 안전이 먼저" body={t("onboarding.safety.body")} />
      </div>
      <label className="checkbox-card">
        <input type="checkbox" checked={checked} onChange={(event) => onCheckedChange(event.target.checked)} />
        <span>{t("onboarding.safety.checkbox")}</span>
      </label>
    </AppShell>
  );
}
