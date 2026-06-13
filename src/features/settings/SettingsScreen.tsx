import { AppShell } from "../../components/AppShell";
import { GhostButton } from "../../components/GhostButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t, type Locale } from "../../i18n";
import type { AdNetworkId } from "../../platform/AdsAdapter";
import type { AuthProviderId } from "../../platform/AuthAdapter";
import type { PaymentStoreId } from "../../platform/PaymentAdapter";

type SettingsScreenProps = {
  locale: Locale;
  localeOptions: readonly { id: Locale; label: string }[];
  platformReadiness: {
    auth: AuthProviderId[];
    payment: PaymentStoreId[];
    ads: AdNetworkId[];
  };
  onLocaleChange: (locale: Locale) => void;
  onDeleteResult: () => void;
  onDeleteSession: () => void;
  onBack: () => void;
};

export function SettingsScreen({
  locale,
  localeOptions,
  platformReadiness,
  onLocaleChange,
  onDeleteResult,
  onDeleteSession,
  onBack,
}: SettingsScreenProps) {
  return (
    <AppShell>
      <ScreenHeader title={t("settings.title")} />
      <div className="settings-list">
        <div className="settings-language-row">
          <strong>{t("settings.language")}</strong>
          <span className="language-options">
            {localeOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={locale === option.id ? "is-selected" : ""}
                aria-pressed={locale === option.id}
                onClick={() => onLocaleChange(option.id)}
              >
                {t("settings.language." + option.id)}
              </button>
            ))}
          </span>
        </div>
        <div className="platform-readiness">
          <strong>{t("settings.platform.title")}</strong>
          <span>{t("settings.platform.auth")}</span>
          <span>{t("settings.platform.payment")}</span>
          <span>{t("settings.platform.ads")}</span>
          <small>
            {platformReadiness.auth.join(", ")} · {platformReadiness.payment.join(", ")} · {platformReadiness.ads.join(", ")}
          </small>
        </div>
        <GhostButton onClick={onDeleteResult}>{t("settings.delete_result")}</GhostButton>
        <GhostButton onClick={onDeleteSession}>{t("settings.delete_session")}</GhostButton>
        <GhostButton>{t("settings.guide")}</GhostButton>
      </div>
      <GhostButton onClick={onBack}>{t("share.card.back")}</GhostButton>
    </AppShell>
  );
}
