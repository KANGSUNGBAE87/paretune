import { useMemo, useState } from "react";
import { AppShell } from "../../components/AppShell";
import { PrimaryButton } from "../../components/PrimaryButton";
import { ProgressBar } from "../../components/ProgressBar";
import { ScreenHeader } from "../../components/ScreenHeader";
import { questions } from "../../core/questions/questions";
import type { ParticipantId, QuestionResponse } from "../../core/session/sessionTypes";
import { t } from "../../i18n";
import { QuestionCard } from "./QuestionCard";
import { ScaleOptionGroup } from "./ScaleOptionGroup";

type TestScreenProps = {
  participantId: ParticipantId;
  nickname: string;
  completeLabel: string;
  onComplete: (participantId: ParticipantId, answers: QuestionResponse[]) => void;
};

export function TestScreen({ participantId, nickname, completeLabel, onComplete }: TestScreenProps) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuestionResponse[]>([]);
  const current = questions[index];
  const selected = answers.find((answer) => answer.questionId === current.id)?.value;
  const domainLabel = t(`test.domain.${current.domain}`);
  const questionText = t(current.textKey);
  const isLast = index === questions.length - 1;
  const buttonLabel = useMemo(() => (isLast ? completeLabel : t("test.cta.next")), [completeLabel, isLast]);

  function select(value: QuestionResponse["value"]) {
    setAnswers((previous) => {
      const rest = previous.filter((answer) => answer.questionId !== current.id);
      return [...rest, { questionId: current.id, value }];
    });
  }

  function next() {
    if (!selected) return;
    if (isLast) {
      onComplete(participantId, answers);
      return;
    }
    setIndex((currentIndex) => currentIndex + 1);
  }

  return (
    <AppShell bottomAction={<PrimaryButton disabled={!selected} onClick={next}>{buttonLabel}</PrimaryButton>}>
      <ScreenHeader title={`${nickname}님 테스트`} subtitle="상대의 답변은 보이지 않아요. 자신의 생각대로 답해주세요." />
      <ProgressBar current={index + 1} total={questions.length} label={domainLabel} />
      <QuestionCard question={questionText} />
      <ScaleOptionGroup value={selected} onChange={select} />
    </AppShell>
  );
}
