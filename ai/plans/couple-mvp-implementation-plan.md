# 커플 성향지도 MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 같은 기기에서 두 사람이 순차 응답하고, participantA 답변을 봉인한 뒤 participantB 응답 완료 후 함께 결과를 여는 `커플 성향지도` MVP를 구현한다.

**Architecture:** 현재 레포는 기획 문서 중심이며 `package.json`, `src/`, `app/` 소스가 없다. 구현은 React + TypeScript 앱을 새로 스캐폴딩하고, `src/core`에 문항/채점/결과/세션 로직을 플랫폼 독립적으로 둔 뒤 UI는 `src/features`에서 core와 platform adapter만 호출한다.

**Tech Stack:** React, TypeScript, Vite-compatible app shell, Vitest, React Testing Library, localStorage-backed web adapters, ko/en i18n dictionary.

---

## 1. 구현 목표

MVP는 다음 사용자 흐름을 실제로 동작하게 만든다.

```text
커플 세션 시작
→ participantA 응답
→ 답변 봉인
→ 폰 넘기기
→ participantB 응답
→ 함께 결과 열기
→ 커플 비교 리포트
→ 합의문/대화 미션
→ 저장 또는 삭제
```

반드시 지켜야 할 제품 원칙:

- participantA 결과와 원답은 participantB 테스트 전에 보이지 않는다.
- participantB 테스트 중 participantA 답변에 접근할 수 없다.
- 결과는 궁합 점수, 진단, 판정이 아니라 차이 이해, 조율, 합의문, 대화 미션 중심이다.
- q01~q24는 성향/차이 계산에 쓰고 q25는 `adjustment_anchor`로만 사용한다.
- 문항별 원답 전체 공개, 민감한 원점수, 위험도 점수, MBTI식 유형은 UI와 공유 카드에 노출하지 않는다.
- 제품 로직은 Apps in Toss/Google Play SDK를 직접 import하지 않는다.
- 사용자-facing copy는 i18n key로 관리한다.

## 2. 구현 범위

이번 MVP 구현 범위:

- React + TypeScript 앱 스캐폴딩
- 25문항 데이터와 ko/en i18n 문구
- resultAxis 20개
- participant scoring
- couple difference 계산
- aligned area 선택
- top differences 선택
- q25 기반 tone/mission intensity 결정
- couple report 생성
- 세션 상태 머신
- 로컬 저장/삭제
- 공유 카드 데이터 생성과 web share fallback
- 10개 주요 화면
- 공통 UI 컴포넌트
- core/session/report 중심 테스트

## 3. MVP 포함 기능

- StartScreen
- SafetyNoticeScreen
- SessionSetupScreen
- TestScreen
- HandoffScreen
- ParticipantBStartScreen
- ReadyToRevealScreen
- CoupleResultScreen
- ShareCardScreen
- SettingsScreen
- participantA/B 닉네임 입력
- 관계 상태: 연인, 부부, 썸
- 25문항 5점 척도 응답
- participantA 답변 봉인
- resultAxis 기반 결과 리포트
- 잘 맞는 부분 먼저 표시
- 차이 TOP 3
- 추천 합의문
- 오늘의 대화 미션
- 결과 저장하기
- 공유 카드 만들기
- 삭제하고 끝내기
- no-op Analytics/Payment/Auth adapter
- Storage/Share/Locale adapter

## 4. MVP 제외 기능

- 친구/가족/동료/룸메이트 모드
- 상대 초대 링크
- 초대 코드
- 계정 로그인
- 서버 기반 커플 연결
- 원격 동기화
- AI 상담 채팅
- 상담사 연결
- 결제 실제 연동
- 광고 실제 연동
- MBTI식 유형
- 궁합 점수
- 공식 심리검사처럼 보이는 표현
- 상대의 문항별 원답 전체 공개
- 결과 위험도 점수

## 5. 현재 프로젝트 구조 분석

현재 존재하는 핵심 문서:

- `AGENTS.md`
- `CLAUDE.md`
- `ai/plans/2026-06-08-couple-tendency-product-spec.md`
- `ai/plans/couple-mvp-integrated-design-question-result-spec.md`
- `ai/plans/couple-question-result-engine-plan.md`
- `ai/plans/couple-ui-design-spec.md`
- `ai/plans/design-plan.md`
- `ai/session-logs/`
- `graphify-out/graph.json`

현재 없는 구현 파일:

- `package.json`
- `src/`
- `app/`
- 테스트 설정
- 빌드 설정

따라서 구현은 스캐폴딩부터 시작한다. 기존 문서는 수정하지 않고 구현 중 발견한 변경 사항만 session log에 기록한다.

## 6. 권장 폴더 구조

```text
src/core/
  questions/
    questions.ts
    resultAxes.ts
  scoring/
    scoreParticipant.ts
    compareParticipants.ts
    selectTopDifferences.ts
    selectAlignedAreas.ts
    generateCoupleReport.ts
  session/
    sessionTypes.ts
    sessionStateMachine.ts
  report/
    resultTemplates.ts
    reportTypes.ts

src/features/session/
  StartScreen.tsx
  SafetyNoticeScreen.tsx
  SessionSetupScreen.tsx
  HandoffScreen.tsx
  ParticipantBStartScreen.tsx
  ReadyToRevealScreen.tsx

src/features/test/
  TestScreen.tsx
  QuestionCard.tsx
  ScaleOptionGroup.tsx

src/features/result/
  CoupleResultScreen.tsx
  ResultSummaryCard.tsx
  DifferenceCard.tsx
  AgreementCard.tsx
  MissionCard.tsx

src/features/share/
  ShareCardScreen.tsx
  SharePreviewCard.tsx

src/features/settings/
  SettingsScreen.tsx

src/components/
  AppShell.tsx
  PrimaryButton.tsx
  SecondaryButton.tsx
  GhostButton.tsx
  ScreenHeader.tsx
  ProgressBar.tsx
  SelectChip.tsx
  TextInputCard.tsx
  NoticeCard.tsx
  DeleteConfirmModal.tsx

src/design/
  tokens.ts
  theme.ts

src/i18n/
  ko.ts
  en.ts
  index.ts

src/platform/
  StorageAdapter.ts
  ShareAdapter.ts
  AnalyticsAdapter.ts
  PaymentAdapter.ts
  LocaleAdapter.ts
  AuthAdapter.ts
  index.ts
  web/
    storage.ts
    share.ts
    analytics.ts
    payment.ts
    locale.ts
    auth.ts
```

## 7. 데이터 모델

핵심 타입은 `src/core/session/sessionTypes.ts`에 둔다.

```ts
export type ParticipantId = "participantA" | "participantB";

export type RelationshipStatus = "dating" | "married" | "situationship";

export type CoupleSessionStatus =
  | "not_started"
  | "participant_a_in_progress"
  | "participant_a_sealed"
  | "handoff_to_participant_b"
  | "participant_b_in_progress"
  | "ready_to_reveal"
  | "revealed"
  | "saved"
  | "deleted";

export type ParticipantProfile = {
  id: ParticipantId;
  nickname: string;
  gender?: "female" | "male" | "custom" | "unspecified";
  customGenderLabel?: string;
};

export type QuestionDomain =
  | "relationship_energy"
  | "closeness_style"
  | "affection_expression"
  | "conflict_recovery"
  | "adjustment_anchor";

export type Question = {
  id: string;
  domain: QuestionDomain;
  facet: string;
  textKey: string;
  reverseScored: boolean;
  resultTags: string[];
  version: number;
};

export type QuestionResponse = {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
};

export type ParticipantResponses = {
  participantId: ParticipantId;
  questionSetVersion: number;
  answers: QuestionResponse[];
  completedAt?: string;
};

export type CoupleSession = {
  id: string;
  relationshipStatus: RelationshipStatus;
  status: CoupleSessionStatus;
  firstParticipantId: ParticipantId;
  participants: {
    participantA: ParticipantProfile;
    participantB: ParticipantProfile;
  };
  responses: {
    participantA?: ParticipantResponses;
    participantB?: ParticipantResponses;
  };
  result?: CoupleReport;
  createdAt: string;
  updatedAt: string;
  savedAt?: string;
};
```

리포트 타입은 `src/core/report/reportTypes.ts`에 둔다.

```ts
export type CoupleReport = {
  summary: string;
  alignedAreas: ReportSection[];
  topDifferences: DifferenceReport[];
  agreements: AgreementSuggestion[];
  mission: DailyMission;
  shareSummary: ShareSummary;
  safetyNoteKey: string;
};

export type ReportSection = {
  title: string;
  body: string;
};

export type DifferenceReport = {
  axis: string;
  title: string;
  participantADescription: string;
  participantBDescription: string;
  misunderstandingMoment: string;
  adjustmentTip: string;
  agreementSuggestion: string;
  dailyMission: string;
};

export type AgreementSuggestion = {
  title: string;
  body: string;
};

export type DailyMission = {
  title: string;
  body: string;
};

export type ShareSummary = {
  title: string;
  oneLineSummary: string;
  alignedArea: string;
  mission: string;
};
```

## 8. 세션 상태 머신

허용 전이:

```text
not_started -> participant_a_in_progress
participant_a_in_progress -> participant_a_sealed
participant_a_sealed -> handoff_to_participant_b
handoff_to_participant_b -> participant_b_in_progress
participant_b_in_progress -> ready_to_reveal
ready_to_reveal -> revealed
revealed -> saved
revealed -> deleted
saved -> deleted
```

필수 함수:

- `createSession(input)`
- `updateParticipantResponse(session, participantId, response)`
- `sealParticipantA(session)`
- `startParticipantB(session)`
- `completeParticipantB(session)`
- `revealResult(session, report)`
- `saveResult(session)`
- `deleteSession(session)`
- `canTransition(from, to)`

가드 규칙:

- participantA 완료 후 `revealed`로 바로 갈 수 없다.
- participantA sealed 이후 participantA 응답 화면으로 돌아갈 수 없다.
- participantB 완료 후 `ready_to_reveal`을 반드시 거친다.
- `deleted` 상태에서는 응답/저장/공유가 불가능하다.
- `saveResult`는 `revealed` 상태에서만 가능하다.

## 9. 문항 데이터 구조

`src/core/questions/questions.ts`는 실제 문항 텍스트를 담지 않고 i18n key만 담는다.

```ts
export const QUESTION_SET_VERSION = 1;

export const questions: Question[] = [
  {
    id: "q01",
    domain: "relationship_energy",
    facet: "date_rhythm",
    textKey: "question.relationship_energy.q01",
    reverseScored: false,
    resultTags: ["contact_frequency", "stability_by_connection"],
    version: QUESTION_SET_VERSION,
  },
  {
    id: "q25",
    domain: "adjustment_anchor",
    facet: "adjustment_readiness",
    textKey: "question.adjustment_anchor.q25",
    reverseScored: false,
    resultTags: ["adjustment_readiness", "report_tone"],
    version: QUESTION_SET_VERSION,
  },
];
```

구현 시 q01~q25 전체를 채운다. q25는 성향 평균과 resultAxis에 포함하지 않는다.

## 10. 결과 계산 엔진 구조

`src/core/questions/resultAxes.ts`:

- resultAxis 20개를 정의한다.
- q01~q24만 resultAxis에 매핑한다.
- q25는 제외한다.

필수 axis:

- `contact_frequency`: q01
- `planning_style`: q02
- `novelty_energy`: q03
- `quiet_togetherness`: q04
- `social_energy`: q05
- `routine_care`: q06
- `reassurance_sensitivity`: q07, q08
- `personal_space_independence`: q09, q11
- `sharing_pace`: q10
- `direct_check_style`: q12
- `words_affection`: q13
- `focused_time`: q14
- `practical_care`: q15
- `physical_closeness`: q16
- `symbolic_ritual`: q17
- `detail_memory`: q18
- `conflict_timing`: q19, q20
- `empathy_solution_balance`: q21, q22
- `repair_action`: q23
- `revisit_after_calm`: q24

`scoreParticipant(responses, questions, resultAxes)`:

- q01~q24 응답을 계산한다.
- reverseScored가 true이면 `6 - value`로 보정한다.
- q25는 `adjustmentReadiness`로만 반환한다.
- single axis는 해당 문항 값.
- average axis는 관련 문항 평균.
- paired_pattern axis는 평균값과 pattern을 함께 반환한다.

`compareParticipants(scoreA, scoreB, resultAxes)`:

- resultAxis별 participantA/B 값과 차이값을 계산한다.
- 차이값은 내부 계산에만 쓰고 UI에 숫자로 표시하지 않는다.

차이 레벨:

- 0.0~0.9: similar
- 1.0~1.9: mild
- 2.0 이상: clear

## 11. 결과 리포트 생성 구조

`selectAlignedAreas(scoreA, scoreB, resultAxes)`:

- 두 사람 모두 높거나 차이가 작은 긍정 영역을 고른다.
- 결과 화면에서는 차이보다 잘 맞는 부분을 먼저 보여준다.

`selectTopDifferences(differences, limit = 3)`:

- clear 차이 우선.
- 부족하면 mild 차이 보충.
- 의미가 중복되는 축은 묶거나 하나만 선택.
- 민감하거나 비난으로 해석될 수 있는 축은 표현 순화.
- 최대 3개 반환.

중복 묶음:

- `reassurance_sensitivity` + `direct_check_style` => 안정감을 확인하는 방식
- `conflict_timing` + `revisit_after_calm` => 갈등 후 다시 연결되는 방식
- `words_affection` + `practical_care` => 애정을 알아듣는 방식
- `personal_space_independence` + `sharing_pace` => 가까움과 여백의 균형

`generateCoupleReport(session, scores, differences, locale)`:

1. aligned area 선택
2. top differences 선택
3. q25 평균으로 tone 결정
4. result template에 닉네임/관계 상태 주입
5. summary, agreements, mission, shareSummary 생성

q25 tone:

- 1.0~2.4: cautious, low mission intensity
- 2.5~3.5: neutral, medium mission intensity
- 3.6~5.0: action_oriented, high mission intensity

## 12. i18n 구조

`src/i18n/ko.ts`, `src/i18n/en.ts`, `src/i18n/index.ts`를 만든다.

필수 key:

```text
app.title
onboarding.start.title
onboarding.start.subtitle
onboarding.start.cta
onboarding.safety.title
onboarding.safety.body
onboarding.safety.checkbox
session.relationship.dating
session.relationship.married
session.relationship.situationship
participant.nickname.label
test.scale.1
test.scale.2
test.scale.3
test.scale.4
test.scale.5
question.relationship_energy.q01
question.relationship_energy.q02
question.relationship_energy.q03
question.relationship_energy.q04
question.relationship_energy.q05
question.relationship_energy.q06
question.closeness_style.q07
question.closeness_style.q08
question.closeness_style.q09
question.closeness_style.q10
question.closeness_style.q11
question.closeness_style.q12
question.affection_expression.q13
question.affection_expression.q14
question.affection_expression.q15
question.affection_expression.q16
question.affection_expression.q17
question.affection_expression.q18
question.conflict_recovery.q19
question.conflict_recovery.q20
question.conflict_recovery.q21
question.conflict_recovery.q22
question.conflict_recovery.q23
question.conflict_recovery.q24
question.adjustment_anchor.q25
handoff.title
handoff.body
handoff.cta
reveal.title
reveal.body
reveal.cta
result.summary.title
result.aligned.title
result.difference.title
result.agreement.title
result.mission.title
share.card.title
settings.delete_session
```

컴포넌트에 한국어 문구를 직접 하드코딩하지 않는다.

## 13. 저장/삭제 정책

StorageAdapter를 통해 저장한다. MVP는 로컬 저장 기반이다.

정책:

- 결과는 자동 저장하지 않는다.
- 결과 공개 후 사용자가 `결과 저장하기`를 눌렀을 때만 `saved` 상태가 된다.
- `삭제하고 끝내기`를 누르면 임시 세션과 결과 데이터를 삭제한다.
- 저장된 결과도 Settings 또는 Result 화면에서 삭제할 수 있어야 한다.
- 삭제 전에는 확인 모달을 보여준다.
- 가능하면 저장 결과에는 report와 최소 메타데이터만 남기고 raw answers 저장은 최소화한다.

## 14. 공유 카드 정책

ShareCardScreen은 `shareSummary`만 사용한다.

포함 가능:

- 앱 이름
- 두 사람 닉네임
- 전체 커플 스타일 한 줄
- 잘 맞는 부분 1개
- 오늘의 대화 미션 1개

포함 금지:

- 문항별 원답
- 민감한 원점수
- 갈등 취약점 상세
- 상대 비난으로 해석될 수 있는 표현
- 위험/문제/불안정 같은 자극적 표현

ShareAdapter를 사용하고 플랫폼별 공유 기능은 adapter 뒤에 숨긴다.

## 15. 플랫폼 어댑터 구조

필수 adapter:

- `StorageAdapter`
- `ShareAdapter`
- `AnalyticsAdapter`
- `PaymentAdapter`
- `LocaleAdapter`
- `AuthAdapter`

MVP 구현:

- StorageAdapter: localStorage 기반
- ShareAdapter: Web Share API 사용 가능 시 사용, 아니면 클립보드/텍스트 fallback
- AnalyticsAdapter: no-op
- PaymentAdapter: no-op
- LocaleAdapter: ko 기본, en 선택 가능
- AuthAdapter: no-op

금지:

- core에서 플랫폼 SDK import
- product logic에서 Apps in Toss/Google Play Billing/AdMob 직접 호출
- 로그인/결제/광고 실제 연동을 MVP에 추가

## 16. 화면별 구현 계획

| 화면 | 파일 | 핵심 책임 |
| --- | --- | --- |
| StartScreen | `src/features/session/StartScreen.tsx` | 앱 목적 설명, 시작 CTA |
| SafetyNoticeScreen | `src/features/session/SafetyNoticeScreen.tsx` | 필수 안전 문구, 체크박스 |
| SessionSetupScreen | `src/features/session/SessionSetupScreen.tsx` | 관계 상태, 닉네임, 먼저 할 사람 |
| TestScreen | `src/features/test/TestScreen.tsx` | 25문항 응답, 진행률, 완료 가드 |
| HandoffScreen | `src/features/session/HandoffScreen.tsx` | participantA 답변 봉인, 폰 넘기기 |
| ParticipantBStartScreen | `src/features/session/ParticipantBStartScreen.tsx` | participantB 시작 안내 |
| ReadyToRevealScreen | `src/features/session/ReadyToRevealScreen.tsx` | 함께 결과 열기 |
| CoupleResultScreen | `src/features/result/CoupleResultScreen.tsx` | 커플 리포트, 저장/공유/삭제 |
| ShareCardScreen | `src/features/share/ShareCardScreen.tsx` | 안전한 공유 카드 프리뷰 |
| SettingsScreen | `src/features/settings/SettingsScreen.tsx` | 언어, 삭제, 안내 |

라우트:

```text
/                       StartScreen
/safety                 SafetyNoticeScreen
/session/setup          SessionSetupScreen
/test/:participantId    TestScreen
/handoff                HandoffScreen
/participant-b-start    ParticipantBStartScreen
/ready                  ReadyToRevealScreen
/result                 CoupleResultScreen
/share                  ShareCardScreen
/settings               SettingsScreen
```

## 17. 컴포넌트별 구현 계획

공통 컴포넌트:

- `AppShell`: 모바일 중심 레이아웃과 배경
- `PrimaryButton`: 주요 CTA
- `SecondaryButton`: 보조 CTA
- `GhostButton`: 덜 중요한 행동
- `ScreenHeader`: 화면 제목/설명
- `ProgressBar`: 25문항 진행률
- `SelectChip`: 관계 상태/선택 옵션
- `TextInputCard`: 닉네임 입력
- `NoticeCard`: 안전 안내
- `QuestionCard`: 질문 표시
- `ScaleOptionGroup`: 5점 척도
- `SealCard`: 답변 봉인 시각화
- `HandoffCard`: 폰 넘기기 안내
- `RevealCard`: 함께 결과 열기 안내
- `ResultSummaryCard`: 전체 요약
- `DifferenceCard`: 차이 TOP 3
- `AgreementCard`: 합의문
- `MissionCard`: 대화 미션
- `SharePreviewCard`: 공유 카드 미리보기
- `ActionButtonGroup`: 저장/공유/삭제 액션
- `DeleteConfirmModal`: 삭제 전 확인

컴포넌트는 `src/design/tokens.ts`와 `src/design/theme.ts`의 토큰을 사용한다.

## 18. 테스트 계획

테스트 도구:

- Vitest
- React Testing Library

필수 테스트:

1. questions
   - 총 25문항인지 확인
   - q25가 `adjustment_anchor`인지 확인
   - 모든 문항에 `id/domain/facet/textKey/reverseScored/resultTags/version`이 있는지 확인
   - textKey가 ko i18n에 존재하는지 확인
2. scoring
   - 1~5 응답값 계산
   - reverse scoring 동작
   - q25가 일반 성향 평균에 포함되지 않음
   - q25 adjustmentReadiness가 따로 반환됨
3. resultAxes
   - q01~q24가 resultAxis에 매핑됨
   - q25가 resultAxis에 포함되지 않음
4. compare
   - 동일 응답이면 차이가 작게 나옴
   - 서로 반대 성향이면 차이가 크게 나옴
   - UI용 결과에 숫자 점수가 노출되지 않음
5. report generation
   - summary 생성
   - alignedAreas 생성
   - topDifferences 최대 3개
   - agreements와 mission 생성
   - shareSummary에 민감 정보 없음
6. session state
   - 허용 전이만 가능
   - participantA 완료 후 revealed로 바로 가지 않음
   - participantB 완료 후 ready_to_reveal을 거침
   - deleted 상태 이후 응답/결과 접근 불가
7. safety copy
   - SafetyNoticeScreen에 필수 안내 문구 포함

## 19. QA 체크리스트

제품 QA:

- 두 사람이 같은 자리에서 10분 안에 완료할 수 있는가
- participantA 결과가 participantB에게 노출되지 않는가
- participantA 답변 봉인 후 뒤로가기로 원답 접근이 불가능한가
- participantB 완료 후 결과가 바로 열리지 않고 ReadyToRevealScreen을 거치는가
- 결과가 점수 싸움이 아니라 대화로 이어지는가
- 잘 맞는 부분이 차이보다 먼저 제시되는가
- 차이 TOP 3가 비난 없이 표현되는가
- 추천 합의문이 한쪽에게만 맞추라고 하지 않는가
- 오늘의 대화 미션이 부담스럽지 않고 실천 가능한가
- 저장/삭제 선택을 사용자가 명확히 이해하는가
- 공유 카드가 민감 정보를 노출하지 않는가

기술 QA:

- 세션 상태 전이가 정의된 상태 외로 빠지지 않는가
- 뒤로가기/새로고침에서 원답이 노출되지 않는가
- q25가 성향 점수에 포함되지 않는가
- resultAxis 계산이 deterministic한가
- 동일 입력에 대해 동일 결과가 생성되는가
- i18n key 누락 없이 한국어 기본 화면이 렌더링되는가
- Apps in Toss/Google Play SDK를 core 로직에서 직접 import하지 않는가
- StorageAdapter, ShareAdapter가 platform 별로 교체 가능하게 설계되었는가

## 20. 구현 순서

### Task 0: 앱 스캐폴딩

**Files:**

- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.ts`
- Create: `tsconfig.json`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/test/setup.ts`

- [ ] Step 1: React + TypeScript + Vitest 기반 앱 스캐폴딩 파일을 만든다.
- [ ] Step 2: `npm install` 또는 프로젝트에 맞는 패키지 설치를 수행한다.
- [ ] Step 3: `npm test -- --run`이 빈 테스트 상태에서 실행되는지 확인한다.
- [ ] Step 4: `npm run build`가 최소 앱에서 통과하는지 확인한다.

### Task 1: core 타입과 문항 데이터

**Files:**

- Create: `src/core/session/sessionTypes.ts`
- Create: `src/core/report/reportTypes.ts`
- Create: `src/core/questions/questions.ts`
- Create: `src/i18n/ko.ts`
- Create: `src/i18n/en.ts`
- Create: `src/i18n/index.ts`
- Test: `src/core/questions/questions.test.ts`

- [ ] Step 1: questions 테스트를 먼저 작성한다.
- [ ] Step 2: 타입과 25문항 데이터를 구현한다.
- [ ] Step 3: ko/en i18n key를 채운다.
- [ ] Step 4: 테스트를 실행해 25문항, q25, textKey 매핑을 검증한다.

### Task 2: resultAxis와 scoring

**Files:**

- Create: `src/core/questions/resultAxes.ts`
- Create: `src/core/scoring/scoreParticipant.ts`
- Test: `src/core/scoring/scoreParticipant.test.ts`

- [ ] Step 1: resultAxis mapping 테스트를 작성한다.
- [ ] Step 2: q01~q24 axis와 q25 제외 규칙을 구현한다.
- [ ] Step 3: `scoreParticipant`를 구현한다.
- [ ] Step 4: q25 adjustmentReadiness와 reverse scoring 테스트를 통과시킨다.

### Task 3: compare, aligned, top differences

**Files:**

- Create: `src/core/scoring/compareParticipants.ts`
- Create: `src/core/scoring/selectTopDifferences.ts`
- Create: `src/core/scoring/selectAlignedAreas.ts`
- Test: `src/core/scoring/compareParticipants.test.ts`
- Test: `src/core/scoring/selectTopDifferences.test.ts`
- Test: `src/core/scoring/selectAlignedAreas.test.ts`

- [ ] Step 1: 동일 응답, mild 차이, clear 차이 테스트를 작성한다.
- [ ] Step 2: duplicate axis grouping 테스트를 작성한다.
- [ ] Step 3: aligned area가 차이보다 먼저 노출될 수 있게 반환되는지 테스트한다.
- [ ] Step 4: 구현 후 테스트를 통과시킨다.

### Task 4: report templates와 report generation

**Files:**

- Create: `src/core/report/resultTemplates.ts`
- Create: `src/core/scoring/generateCoupleReport.ts`
- Test: `src/core/scoring/generateCoupleReport.test.ts`

- [ ] Step 1: q25 낮음/중간/높음 tone 테스트를 작성한다.
- [ ] Step 2: topDifferences 최대 3개 테스트를 작성한다.
- [ ] Step 3: shareSummary 민감 정보 제외 테스트를 작성한다.
- [ ] Step 4: report generation을 구현하고 테스트를 통과시킨다.

### Task 5: session state machine

**Files:**

- Create: `src/core/session/sessionStateMachine.ts`
- Test: `src/core/session/sessionStateMachine.test.ts`

- [ ] Step 1: 허용 전이와 금지 전이 테스트를 작성한다.
- [ ] Step 2: participantA 완료 후 revealed로 바로 갈 수 없음을 테스트한다.
- [ ] Step 3: participantB 완료 후 ready_to_reveal을 거치는지 테스트한다.
- [ ] Step 4: deleted 상태 접근 금지 테스트를 통과시킨다.

### Task 6: platform adapters

**Files:**

- Create: `src/platform/StorageAdapter.ts`
- Create: `src/platform/ShareAdapter.ts`
- Create: `src/platform/AnalyticsAdapter.ts`
- Create: `src/platform/PaymentAdapter.ts`
- Create: `src/platform/LocaleAdapter.ts`
- Create: `src/platform/AuthAdapter.ts`
- Create: `src/platform/web/storage.ts`
- Create: `src/platform/web/share.ts`
- Create: `src/platform/web/analytics.ts`
- Create: `src/platform/web/payment.ts`
- Create: `src/platform/web/locale.ts`
- Create: `src/platform/web/auth.ts`
- Create: `src/platform/index.ts`

- [ ] Step 1: no-op adapter 인터페이스를 정의한다.
- [ ] Step 2: localStorage-backed web storage를 구현한다.
- [ ] Step 3: Web Share API fallback share adapter를 구현한다.
- [ ] Step 4: core 파일에서 platform adapter를 import하지 않는지 확인한다.

### Task 7: design tokens와 공통 컴포넌트

**Files:**

- Create: `src/design/tokens.ts`
- Create: `src/design/theme.ts`
- Create: `src/components/*.tsx`

- [ ] Step 1: color, typography, spacing, radius, shadow token을 정의한다.
- [ ] Step 2: 버튼/카드/진행률/칩/모달 기본 컴포넌트를 만든다.
- [ ] Step 3: 컴포넌트가 하드코딩 색상 대신 token을 쓰는지 확인한다.

### Task 8: session/test/reveal 화면

**Files:**

- Create: `src/features/session/*.tsx`
- Create: `src/features/test/*.tsx`

- [ ] Step 1: Start/Safety/Setup 화면을 연결한다.
- [ ] Step 2: TestScreen에서 25문항 진행률과 응답 저장을 구현한다.
- [ ] Step 3: HandoffScreen에서 participantA 결과/원답을 노출하지 않는다.
- [ ] Step 4: ParticipantBStartScreen과 ReadyToRevealScreen을 연결한다.

### Task 9: result/share/settings 화면

**Files:**

- Create: `src/features/result/*.tsx`
- Create: `src/features/share/*.tsx`
- Create: `src/features/settings/SettingsScreen.tsx`

- [ ] Step 1: CoupleResultScreen이 report만 사용하고 raw answers를 렌더링하지 않게 한다.
- [ ] Step 2: 저장/공유/삭제 액션을 adapter와 state machine에 연결한다.
- [ ] Step 3: ShareCardScreen이 shareSummary만 사용하도록 한다.
- [ ] Step 4: SettingsScreen에서 결과/세션 삭제를 제공한다.

### Task 10: 검증과 세션 로그

**Files:**

- Create: `ai/session-logs/YYYY-MM-DD-couple-mvp-implementation.md`

- [ ] Step 1: `npm test -- --run` 실행.
- [ ] Step 2: `npm run lint` 실행.
- [ ] Step 3: `npm run typecheck` 실행.
- [ ] Step 4: `npm run build` 실행.
- [ ] Step 5: 실패가 있으면 수정 후 재실행.
- [ ] Step 6: 세션 로그에 구현 파일, 테스트 결과, 남은 이슈, 다음 단계를 기록.

## 21. 리스크와 주의사항

주요 리스크:

- 현재 레포가 구현 소스 없이 문서만 있으므로 첫 구현에서 스캐폴딩 범위가 커질 수 있다.
- 네트워크 제한 환경에서는 패키지 설치가 실패할 수 있다. 설치가 필요하면 사용자 승인 후 진행한다.
- Apps in Toss 세부 SDK는 현재 구현 범위가 아니므로 adapter 인터페이스만 둔다.
- result template 문구가 한쪽 탓처럼 읽히지 않는지 QA가 필요하다.
- q25가 점수처럼 보이면 안 된다.
- 공유 카드에 원답/민감 원점수가 들어가지 않도록 테스트가 필요하다.

절대 금지:

- participantA 결과를 participantB 테스트 전에 보여주기
- participantA 원답을 participantB에게 보여주기
- 결과에 궁합 점수 표시하기
- MBTI식 유형 만들기
- 불안형/회피형 같은 낙인형 결과명 만들기
- 심리 진단, 임상 진단, 치료, 상담 대체처럼 표현하기
- 상대가 문제라는 결과 만들기
- 한쪽에게만 맞추라고 하는 합의문 만들기
- 서버 저장/로그인/초대링크를 MVP에 끼워 넣기
- 플랫폼 SDK를 core 로직에서 직접 import하기
- i18n 없이 한국어 문구를 컴포넌트에 직접 하드코딩하기

## Self-Review

- Spec coverage: 첨부 지시문의 21개 구현기획 항목을 모두 본 문서에 포함했다.
- Existing structure: 현재 프로젝트가 문서 중심이며 `package.json`/`src`가 없다는 점을 구현 0단계에 반영했다.
- Product constraints: same-device sequential flow, answer sealing, ready-to-reveal, no raw answer exposure, no compatibility score를 구현 가드와 테스트로 연결했다.
- Platform constraints: Apps in Toss/Google Play 직접 의존을 금지하고 adapter 구조로 계획했다.
- Test coverage: questions, scoring, resultAxes, compare, report, session state, safety copy 테스트를 분리했다.
