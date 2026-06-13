import type { QuestionResponse } from "../../core/session/sessionTypes";
import { t } from "../../i18n";

type ScaleOptionGroupProps = {
  value?: QuestionResponse["value"];
  onChange: (value: QuestionResponse["value"]) => void;
};

const values: QuestionResponse["value"][] = [1, 2, 3, 4, 5];

export function ScaleOptionGroup({ value, onChange }: ScaleOptionGroupProps) {
  return (
    <div className="scale-group" role="radiogroup" aria-label="답변 선택">
      {values.map((option) => (
        <label key={option} className={`scale-option ${value === option ? "is-selected" : ""}`}>
          <input
            type="radio"
            name="scale-option"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          <span>{t(`test.scale.${option}`)}</span>
        </label>
      ))}
    </div>
  );
}
