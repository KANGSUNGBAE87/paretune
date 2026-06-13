import { AppShell } from "../../components/AppShell";
import { GhostButton } from "../../components/GhostButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { t } from "../../i18n";

type SettingsScreenProps = {
  onDeleteResult: () => void;
  onDeleteSession: () => void;
  onBack: () => void;
};

export function SettingsScreen({ onDeleteResult, onDeleteSession, onBack }: SettingsScreenProps) {
  return (
    <AppShell>
      <ScreenHeader title={t("settings.title")} />
      <div className="settings-list">
        <div>
          <strong>{t("settings.language")}</strong>
          <span>한국어 / English</span>
        </div>
        <GhostButton onClick={onDeleteResult}>{t("settings.delete_result")}</GhostButton>
        <GhostButton onClick={onDeleteSession}>{t("settings.delete_session")}</GhostButton>
        <GhostButton>{t("settings.guide")}</GhostButton>
      </div>
      <GhostButton onClick={onBack}>{t("share.card.back")}</GhostButton>
    </AppShell>
  );
}
