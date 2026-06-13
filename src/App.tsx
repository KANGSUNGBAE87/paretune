import { useMemo, useState } from "react";
import { DeleteConfirmModal } from "./components/DeleteConfirmModal";
import { questions, QUESTION_SET_VERSION } from "./core/questions/questions";
import { resultAxes } from "./core/questions/resultAxes";
import type { CoupleReport } from "./core/report/reportTypes";
import type { CoupleSession, ParticipantId, ParticipantResponses, QuestionResponse, RelationshipStatus } from "./core/session/sessionTypes";
import { completeParticipantB, createSession, deleteSession, revealResult, saveResult, sealParticipantA } from "./core/session/sessionStateMachine";
import { compareParticipants } from "./core/scoring/compareParticipants";
import { generateCoupleReport } from "./core/scoring/generateCoupleReport";
import { scoreParticipant } from "./core/scoring/scoreParticipant";
import { CoupleResultScreen } from "./features/result/CoupleResultScreen";
import { HandoffScreen } from "./features/session/HandoffScreen";
import { ParticipantBStartScreen } from "./features/session/ParticipantBStartScreen";
import { ReadyToRevealScreen } from "./features/session/ReadyToRevealScreen";
import { SafetyNoticeScreen } from "./features/session/SafetyNoticeScreen";
import { SessionSetupScreen } from "./features/session/SessionSetupScreen";
import { StartScreen } from "./features/session/StartScreen";
import { SettingsScreen } from "./features/settings/SettingsScreen";
import { ShareCardScreen } from "./features/share/ShareCardScreen";
import { TestScreen } from "./features/test/TestScreen";
import { shareAdapter, storageAdapter } from "./platform";

type Screen =
  | "start"
  | "safety"
  | "setup"
  | "testA"
  | "handoff"
  | "participantBStart"
  | "testB"
  | "ready"
  | "result"
  | "share"
  | "settings";

type DeleteTarget = "result" | "session";

const SAVED_RESULT_KEY = "couple-tendency:last-result";
const fallbackAnswer: QuestionResponse = { questionId: "__fallback__", value: 3 };

function responses(participantId: ParticipantId, answers: QuestionResponse[]): ParticipantResponses {
  return {
    participantId,
    questionSetVersion: QUESTION_SET_VERSION,
    answers: questions.map((question) => {
      const found = answers.find((answer) => answer.questionId === question.id);
      return found ?? { ...fallbackAnswer, questionId: question.id };
    }),
    completedAt: new Date().toISOString(),
  };
}

function savedResultPayload(session: CoupleSession) {
  if (!session.result) throw new Error("result is required before saving");
  return {
    version: 1,
    sessionId: session.id,
    relationshipStatus: session.relationshipStatus,
    participantNames: [session.participants.participantA.nickname, session.participants.participantB.nickname],
    savedAt: session.savedAt ?? new Date().toISOString(),
    report: session.result,
  };
}

export default function App() {
  const [screen, setScreen] = useState<Screen>("start");
  const [safetyChecked, setSafetyChecked] = useState(false);
  const [relationshipStatus, setRelationshipStatus] = useState<RelationshipStatus>("dating");
  const [participantAName, setParticipantAName] = useState("첫 번째 사람");
  const [participantBName, setParticipantBName] = useState("두 번째 사람");
  const [firstParticipantId, setFirstParticipantId] = useState<ParticipantId>("participantA");
  const [session, setSession] = useState<CoupleSession>();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget>("session");

  const names: [string, string] = useMemo(
    () => [session?.participants.participantA.nickname ?? participantAName, session?.participants.participantB.nickname ?? participantBName],
    [participantAName, participantBName, session],
  );

  function startSession() {
    const firstName = participantAName.trim() || "첫 번째 사람";
    const secondName = participantBName.trim() || "두 번째 사람";
    const firstParticipantName = firstParticipantId === "participantA" ? firstName : secondName;
    const secondParticipantName = firstParticipantId === "participantA" ? secondName : firstName;
    const nextSession = createSession({
      relationshipStatus,
      firstParticipantId: "participantA",
      participants: {
        participantA: { id: "participantA", nickname: firstParticipantName, gender: "unspecified" },
        participantB: { id: "participantB", nickname: secondParticipantName, gender: "unspecified" },
      },
    });
    setSession(nextSession);
    setScreen("testA");
  }

  function completeA(_participantId: ParticipantId, answers: QuestionResponse[]) {
    if (!session) return;
    setSession(sealParticipantA(session, responses("participantA", answers)));
    setScreen("handoff");
  }

  function completeB(_participantId: ParticipantId, answers: QuestionResponse[]) {
    if (!session) return;
    setSession(completeParticipantB({ ...session, status: "participant_b_in_progress" }, responses("participantB", answers)));
    setScreen("ready");
  }

  function reveal() {
    if (!session?.responses.participantA || !session.responses.participantB) return;
    const scoreA = scoreParticipant(session.responses.participantA, questions, resultAxes);
    const scoreB = scoreParticipant(session.responses.participantB, questions, resultAxes);
    const differences = compareParticipants(scoreA, scoreB, resultAxes);
    const report = generateCoupleReport(session, scoreA, scoreB, differences, "ko");
    setSession(revealResult({ ...session, status: "ready_to_reveal" }, report));
    setScreen("result");
  }

  function save() {
    if (!session?.result) return;
    const saved = saveResult(session);
    storageAdapter.set(SAVED_RESULT_KEY, savedResultPayload(saved));
    setSession(saved);
  }

  function requestDelete(target: DeleteTarget) {
    setDeleteTarget(target);
    setDeleteOpen(true);
  }

  function removeResult() {
    storageAdapter.remove(SAVED_RESULT_KEY);
    setSession((current) => {
      if (!current) return current;
      return {
        ...current,
        status: current.status === "saved" ? "revealed" : current.status,
        savedAt: undefined,
        updatedAt: new Date().toISOString(),
      };
    });
    setDeleteOpen(false);
  }

  function removeSession() {
    if (session) setSession(deleteSession(session));
    storageAdapter.remove(SAVED_RESULT_KEY);
    setDeleteOpen(false);
    setScreen("start");
  }

  function goHome() {
    setDeleteOpen(false);
    setScreen("start");
  }

  function openShareCard() {
    if (!session?.result) return;
    setScreen("share");
  }

  async function shareCurrentSummary() {
    if (!session?.result) return;
    await shareAdapter.share(session.result.shareSummary);
  }

  function confirmDelete() {
    if (deleteTarget === "result") {
      removeResult();
      return;
    }
    removeSession();
  }

  const report: CoupleReport | undefined = session?.result;

  return (
    <>
      {screen === "start" && <StartScreen onStart={() => setScreen("safety")} />}
      {screen === "safety" && (
        <SafetyNoticeScreen checked={safetyChecked} onCheckedChange={setSafetyChecked} onNext={() => setScreen("setup")} />
      )}
      {screen === "setup" && (
        <SessionSetupScreen
          relationshipStatus={relationshipStatus}
          participantAName={participantAName}
          participantBName={participantBName}
          firstParticipantId={firstParticipantId}
          onRelationshipChange={setRelationshipStatus}
          onParticipantANameChange={setParticipantAName}
          onParticipantBNameChange={setParticipantBName}
          onFirstParticipantChange={setFirstParticipantId}
          onStart={startSession}
        />
      )}
      {screen === "testA" && (
        <TestScreen participantId="participantA" nickname={names[0]} completeLabel="답변 봉인하기" onComplete={completeA} />
      )}
      {screen === "handoff" && <HandoffScreen onNext={() => setScreen("participantBStart")} />}
      {screen === "participantBStart" && <ParticipantBStartScreen nickname={names[1]} onStart={() => setScreen("testB")} />}
      {screen === "testB" && <TestScreen participantId="participantB" nickname={names[1]} completeLabel="다음" onComplete={completeB} />}
      {screen === "ready" && <ReadyToRevealScreen onReveal={reveal} />}
      {screen === "result" && report && (
        <CoupleResultScreen
          report={report}
          names={names}
          isSaved={session?.status === "saved"}
          onSave={save}
          onShare={openShareCard}
          onHome={goHome}
          onDelete={() => requestDelete("session")}
          onSettings={() => setScreen("settings")}
        />
      )}
      {screen === "share" && report && (
        <ShareCardScreen summary={report.shareSummary} names={names} onShare={shareCurrentSummary} onBack={() => setScreen("result")} />
      )}
      {screen === "settings" && (
        <SettingsScreen
          onBack={() => setScreen("result")}
          onDeleteResult={() => requestDelete("result")}
          onDeleteSession={() => requestDelete("session")}
        />
      )}
      <DeleteConfirmModal
        open={deleteOpen}
        titleKey={deleteTarget === "result" ? "delete.result.title" : "delete.session.title"}
        bodyKey={deleteTarget === "result" ? "delete.result.body" : "delete.session.body"}
        cancelKey="common.cancel"
        confirmKey={deleteTarget === "result" ? "delete.result.confirm" : "delete.session.confirm"}
        onCancel={() => setDeleteOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
