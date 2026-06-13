import { PrimaryButton } from "./PrimaryButton";
import { GhostButton } from "./GhostButton";
import { t } from "../i18n";

type DeleteConfirmModalProps = {
  open: boolean;
  titleKey: string;
  bodyKey: string;
  cancelKey: string;
  confirmKey: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ open, titleKey, bodyKey, cancelKey, confirmKey, onCancel, onConfirm }: DeleteConfirmModalProps) {
  if (!open) return null;
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="delete-title">
      <div className="modal-card">
        <h2 id="delete-title">{t(titleKey)}</h2>
        <p>{t(bodyKey)}</p>
        <div className="modal-actions">
          <GhostButton autoFocus onClick={onCancel}>
            {t(cancelKey)}
          </GhostButton>
          <PrimaryButton className="button--danger" onClick={onConfirm}>
            {t(confirmKey)}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
