import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ScreenHeader } from "../../components/ScreenHeader";
import { SelectChip } from "../../components/SelectChip";
import { TextInputCard } from "../../components/TextInputCard";
import type { ParticipantId, RelationshipStatus } from "../../core/session/sessionTypes";
import { t } from "../../i18n";

type SessionSetupScreenProps = {
  relationshipStatus: RelationshipStatus;
  participantAName: string;
  participantBName: string;
  firstParticipantId: ParticipantId;
  onRelationshipChange: (status: RelationshipStatus) => void;
  onParticipantANameChange: (name: string) => void;
  onParticipantBNameChange: (name: string) => void;
  onFirstParticipantChange: (id: ParticipantId) => void;
  onStart: () => void;
};

export function SessionSetupScreen({
  relationshipStatus,
  participantAName,
  participantBName,
  firstParticipantId,
  onRelationshipChange,
  onParticipantANameChange,
  onParticipantBNameChange,
  onFirstParticipantChange,
  onStart,
}: SessionSetupScreenProps) {
  return (
    <AppShell
      bottomAction={
        <PrimaryButton disabled={!participantAName.trim() || !participantBName.trim()} onClick={onStart}>
          {t("session.setup.cta")}
        </PrimaryButton>
      }
    >
      <ScreenHeader title={t("session.setup.title")} subtitle={t("session.setup.subtitle")} />
      <section className="form-section">
        <h2>{t("session.relationship.label")}</h2>
        <div className="chip-row">
          {(["dating", "married", "situationship"] as RelationshipStatus[]).map((status) => (
            <SelectChip key={status} selected={relationshipStatus === status} onClick={() => onRelationshipChange(status)}>
              {t(`session.relationship.${status}`)}
            </SelectChip>
          ))}
        </div>
      </section>
      <section className="form-section">
        <h2>{t("session.nickname.title")}</h2>
        <TextInputCard
          label={t("participant.firstNickname.label")}
          value={participantAName}
          onChange={(event) => onParticipantANameChange(event.target.value)}
        />
        <TextInputCard
          label={t("participant.secondNickname.label")}
          value={participantBName}
          onChange={(event) => onParticipantBNameChange(event.target.value)}
        />
      </section>
      <section className="form-section">
        <h2>{t("participant.firstPicker.label")}</h2>
        <div className="chip-row">
          <SelectChip selected={firstParticipantId === "participantA"} onClick={() => onFirstParticipantChange("participantA")}>
            {participantAName || t("participant.first.label")}
          </SelectChip>
          <SelectChip selected={firstParticipantId === "participantB"} onClick={() => onFirstParticipantChange("participantB")}>
            {participantBName || t("participant.second.label")}
          </SelectChip>
        </div>
      </section>
    </AppShell>
  );
}
