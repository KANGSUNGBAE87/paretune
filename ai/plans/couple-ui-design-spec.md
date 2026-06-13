# 커플 성향지도 UI 디자인 스펙

Status: decided, pre-implementation
Date: 2026-06-13
Scope: UI/UX 디자인 기준. 실제 화면 구현 코드는 작성하지 않는다.

## 1. 디자인 컨셉

한 줄 컨셉:

> 둘이 같은 자리에서 안전하게 답하고, 함께 차이를 열어보는 따뜻한 커플 관계 지도.

이 앱은 궁합 테스트나 심리검사처럼 보이면 안 된다. 누가 맞고 틀린지 판정하는 UI가 아니라, 서로의 차이를 이해하고 대화로 이어지게 하는 UI여야 한다.

## 2. 핵심 사용자 감정

사용자가 느껴야 하는 감정:

- 부담 없음
- 안전함
- 답변이 노출되지 않는다는 신뢰
- 둘이 같이 해보는 작은 이벤트감
- 결과를 보고 싸우는 느낌이 아니라 대화할 수 있다는 안도감
- 너무 유치하지 않은 따뜻함

피해야 하는 감정:

- 점수로 평가받는 느낌
- 궁합 판정 받는 느낌
- 상대가 내 원답을 볼 것 같은 불안
- 결과가 한쪽 탓처럼 느껴지는 분위기
- 과한 커플 이벤트 앱 느낌

## 3. 화면별 UX 목표와 카피

### StartScreen

목표:

- 앱이 “판정”이 아니라 “관계 조율”을 돕는다는 첫인상을 준다.
- 같은 기기에서 둘이 함께 진행하는 흐름을 자연스럽게 예고한다.

메인 카피:

> 우리 사이를 조금 더 잘 알아보는 시간

서브 카피:

> 누가 맞고 틀린지보다, 서로가 편안해지는 방식을 찾아봐요.

CTA:

> 커플 성향지도 시작하기

### SafetyNoticeScreen

목표:

- 참고용 도구임을 분명히 한다.
- 상대 비난/통제 목적 사용을 막는다.
- 심각한 위험 관계에서는 앱보다 안전 확보가 우선임을 안내한다.

필수 문구:

> 이 결과는 의학적·임상적 진단이 아니며, 커플 간 자기이해와 대화를 돕기 위한 참고용입니다. 결과를 상대를 비난하거나 통제하는 용도로 사용하지 마세요. 심각한 폭력, 위협, 스토킹, 강압, 정서적 학대가 있는 관계라면 앱 결과보다 안전 확보와 전문기관 상담이 우선입니다.

UI:

- 확인 체크박스
- 다음 CTA
- 차분한 안내 카드

### SessionSetupScreen

목표:

- 관계 상태와 두 참가자 정보를 가볍게 입력한다.
- 여자/남자 고정 구조가 아니라 닉네임 중심 구조로 느껴지게 한다.

요소:

- 관계 상태: 연인, 부부, 썸
- participantA 닉네임
- participantB 닉네임
- 먼저 할 사람 선택
- 성별 선택사항

### TestScreen

목표:

- 현재 참가자만 편하게 답하게 한다.
- 이전 참가자 답변/결과가 절대 보이지 않는다는 신뢰를 준다.

요소:

- 현재 참가자 닉네임
- 진행률: 예) `7 / 25`
- 영역 라벨: 관계 에너지, 가까워지는 방식, 마음 표현 방식, 갈등 회복 방식, 마무리 질문
- 질문 카드
- 5점 척도

5점 척도:

- 전혀 아니다
- 아니다
- 보통이다
- 그렇다
- 매우 그렇다

### HandoffScreen

목표:

- participantA 답변이 봉인되었음을 감정적으로 확실히 전달한다.
- 폰을 넘기는 행동을 앱의 핵심 UX로 만든다.

제목:

> 답변이 봉인되었어요

설명:

> 결과는 두 사람의 응답이 모두 끝난 뒤 함께 열 수 있어요.

보조 문구:

> 이전 응답은 보이지 않아요.

CTA:

> 상대에게 폰 넘기기

시각:

- 잠금
- 봉투
- 보관함
- 부드러운 지도 경로

### ParticipantBStartScreen

목표:

- participantB가 영향받지 않고 자기 생각대로 답하게 한다.

제목:

> 이제 {nickname}님 차례예요

설명:

> 상대의 답변은 보이지 않아요. 편하게 자신의 생각대로 답해주세요.

CTA:

> 내 테스트 시작하기

### ReadyToRevealScreen

목표:

- 결과를 바로 던지지 않고, 둘이 함께 여는 감정적 하이라이트를 만든다.

제목:

> 두 사람의 응답이 모두 모였어요

설명:

> 결과는 평가가 아니라 서로를 이해하기 위한 참고용이에요.

CTA:

> 우리 결과 열기

### CoupleResultScreen

목표:

- 점수/등급/승패가 아니라 조율 리포트처럼 보이게 한다.
- 잘 맞는 부분을 먼저 보여줘 안정감을 준다.
- 차이 TOP 3는 오해 가능성과 조율법까지 함께 보여준다.

섹션 순서:

1. 전체 커플 스타일 한 줄 요약
2. 잘 맞는 부분
3. 차이가 큰 부분 TOP 3
4. 오해가 생기기 쉬운 상황
5. 맞춰가는 방법
6. 추천 합의문
7. 오늘의 대화 미션
8. 저장/공유/삭제

금지:

- 점수, 등급, 승패, 위험도처럼 보이는 UI
- “문제”, “위험”, “불안정” 같은 자극적 라벨

### ShareCardScreen

목표:

- 공유할 수 있지만 민감한 내용은 절대 노출하지 않는다.

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
- 누가 더 문제인지 알 수 있는 표현

### SettingsScreen

목표:

- 언어, 삭제, 안내/약관 접근을 제공한다.

요소:

- 언어
- 결과 삭제
- 세션 삭제
- 안내/약관

## 4. 디자인 토큰

색상 방향:

| Token | Direction |
| --- | --- |
| background | warm ivory / cream |
| primary | soft coral |
| secondary | lavender |
| accent | soft blue |
| textPrimary | deep warm gray |
| textSecondary | muted gray |
| safe | soft green |
| warning | calm amber |

타이포그래피:

- 화면 제목은 짧고 선명하게.
- 질문 문항은 모바일에서 2~4줄 안에 읽히게.
- 결과 설명은 카드당 1개 메시지 중심.
- 버튼 텍스트는 1줄 유지.

간격:

- 모바일 기준 여백을 넉넉하게 둔다.
- 질문 카드와 응답 버튼 사이를 충분히 띄운다.
- 결과 화면은 섹션 사이 호흡을 넓게 둔다.

모서리/그림자:

- `radius.sm = 12px`: chip, scale option.
- `radius.md = 16px`: input card, notice card.
- `radius.lg = 20px`: result section card, handoff/reveal card.
- `radius.xl = 24px`: StartScreen hero card, share preview card.
- 모든 요소에 같은 큰 radius를 반복하지 않는다. 카드의 역할과 계층에 따라 radius를 다르게 쓴다.
- 버튼은 최소 56px 높이로 둔다.
- 그림자는 과하지 않게, 카드 구분용으로만 사용한다.

구현 토큰 초안:

| Token | Value | 용도 |
| --- | --- | --- |
| `color.bg.warmIvory` | `#FFF8EF` | 앱 기본 배경 |
| `color.surface.default` | `#FFFCF7` | 기본 카드 |
| `color.surface.coralTint` | `#FFF0EB` | 선택/강조 카드 |
| `color.surface.lavenderTint` | `#F4F0FF` | handoff, participantB 시작 |
| `color.surface.blueTint` | `#EFF6FF` | 미션, 공유 preview |
| `color.primary.coral` | `#BE5447` | primary CTA |
| `color.secondary.lavender` | `#7463C7` | secondary CTA |
| `color.accent.blue` | `#476FBC` | 정보성 accent |
| `color.safe.green` | `#2F6B52` | 저장 완료, 안전 안내 |
| `color.warning.amber` | `#8A5A12` | 차분한 중요 안내 |
| `color.danger.muted` | `#9E463B` | 삭제 확인 텍스트 |
| `color.text.primary` | `#33251F` | 제목/주요 본문 |
| `color.text.secondary` | `#746A62` | 보조 설명 |
| `color.border.soft` | `#E7DBCF` | 카드/입력 경계 |

## 5. 공통 컴포넌트 목록

- `AppShell`
- `PrimaryButton`
- `SecondaryButton`
- `GhostButton`
- `ScreenHeader`
- `ProgressBar`
- `SelectChip`
- `TextInputCard`
- `NoticeCard`
- `QuestionCard`
- `ScaleOptionGroup`
- `SealCard`
- `HandoffCard`
- `RevealCard`
- `ResultSummaryCard`
- `DifferenceCard`
- `AgreementCard`
- `MissionCard`
- `SharePreviewCard`
- `ActionButtonGroup`
- `DeleteConfirmModal`

## 6. 접근성 기준

- 응답 버튼은 터치하기 쉬운 크기여야 한다.
- 색상만으로 선택 상태를 표현하지 않는다.
- 진행률은 텍스트와 시각 요소를 함께 제공한다.
- 삭제/초기화는 확인 모달을 둔다.
- 결과 카드의 긴 문장은 줄간격을 충분히 둔다.
- 중요한 안전 안내는 작은 회색 글씨로 숨기지 않는다.
- 키보드/스크린리더 접근성을 고려해 질문과 응답 그룹을 연결한다.

## 7. 민감 정보 노출 방지 기준

- participantA 완료 후 개인 결과를 보여주지 않는다.
- HandoffScreen에서는 participantA 원답, 점수, 영역 요약을 노출하지 않는다.
- ParticipantBStartScreen에서도 이전 응답은 보이지 않는다는 안내만 제공한다.
- 뒤로가기/새로고침으로 이전 참가자 원답에 접근하지 못하게 설계한다.
- 결과 화면에서도 문항별 원답 전체 공개 기능은 제공하지 않는다.
- 공유 카드에는 민감한 원점수와 갈등 취약점 상세를 포함하지 않는다.

## 8. 저장/삭제 UX

결과 공개 후 선택지:

- 결과 저장하기
- 공유 카드 만들기
- 삭제하고 끝내기

기본 정책:

> 결과는 사용자가 명시적으로 저장하기 전까지 임시 세션으로만 유지한다.

삭제 UX:

- 삭제 전 확인 모달을 둔다.
- 삭제 후 복구할 수 없다는 점을 간단히 알린다.
- 무섭거나 과한 경고문보다 차분한 안내를 사용한다.

## 9. 구현 우선순위

UI 구현 우선순위:

1. `AppShell`, 버튼, 카드, 진행률, 칩, 입력 컴포넌트
2. `StartScreen`, `SafetyNoticeScreen`, `SessionSetupScreen`
3. `TestScreen`, `QuestionCard`, `ScaleOptionGroup`
4. `HandoffScreen`, `ParticipantBStartScreen`, `ReadyToRevealScreen`
5. `CoupleResultScreen` 결과 카드군
6. `ShareCardScreen`
7. `SettingsScreen`, 삭제 확인 모달

주의:

- 실제 구현 전에 문항/결과 엔진이 먼저 안정되어야 한다.
- 결과 화면 디자인은 엔진 출력 구조와 함께 검증해야 한다.
- UI는 점수 대결처럼 보이지 않도록 끝까지 점검한다.

## 10. 정보 구조와 화면 계층

이번 리뷰 기준에서 구현자가 반드시 지켜야 할 화면 계층은 다음과 같다.

```text
Start
  -> Safety notice
  -> Session setup
  -> Test(participantA or firstParticipant)
  -> Seal / handoff
  -> ParticipantB start
  -> Test(participantB or secondParticipant)
  -> Ready to reveal
  -> Couple result
      -> Share card preview
      -> Save result
      -> Delete confirm
  -> Settings
```

각 화면에서 사용자가 먼저 봐야 하는 3가지는 다음으로 제한한다.

| Screen | 1순위 | 2순위 | 3순위 |
| --- | --- | --- | --- |
| StartScreen | 앱 목적 | "누가 맞고 틀린지보다" 카피 | 시작 CTA |
| SafetyNoticeScreen | 참고용/비진단 안내 | 비난/통제 금지 | 확인 체크박스 |
| SessionSetupScreen | 관계 상태 | 두 닉네임 | 먼저 할 사람 |
| TestScreen | 현재 참가자/진행률 | 질문 | 5점 척도 |
| HandoffScreen | 봉인 완료 | 이전 응답 비노출 | 폰 넘기기 CTA |
| ParticipantBStartScreen | `{nickname}님 차례` | 상대 답변 비노출 | 내 테스트 시작 CTA |
| ReadyToRevealScreen | 응답 모두 완료 | 평가 아님 안내 | 우리 결과 열기 CTA |
| CoupleResultScreen | 한 줄 요약 | 잘 맞는 부분 | 차이 TOP 3 + 조율법 |
| ShareCardScreen | 공유 preview | 포함/제외 안내 | 저장/공유 CTA |
| SettingsScreen | 언어 | 삭제 | 안내/약관 |

## 11. Interaction State Coverage

| Feature | Loading | Empty | Error | Success | Partial |
| --- | --- | --- | --- | --- | --- |
| session setup | 저장된 임시 세션 확인 중 skeleton | 닉네임 입력 전 helper | 필수 닉네임 누락, 관계 상태 미선택 | 첫 테스트 시작 가능 | 한 명 닉네임만 입력됨 |
| test answer | 문항 로드 skeleton | 문항 데이터 없음 안내 + 처음으로 돌아가기 | 문항 로드 실패 + 재시도 | 답변 선택 후 다음 CTA 활성화 | 현재 문항 미선택 |
| participantA seal | 봉인 처리 중 lock animation | 해당 없음 | 봉인 실패 + 다시 봉인하기 | 답변이 봉인되었어요 | 봉인 후 뒤로가기 차단 |
| participantB start | sealed session 복구 중 | participantA 봉인 기록 없음 | 잘못된 세션 상태 + 처음부터 다시 | 내 테스트 시작 가능 | 닉네임이 길면 2줄 wrapping |
| ready reveal | 결과 준비 중 | 두 응답 중 하나 없음 | 결과 생성 실패 + 다시 시도 | 우리 결과 열기 가능 | 결과 preview 노출 금지 |
| result | 리포트 생성 skeleton | 결과 생성 불가 안내 | 리포트 생성 실패 + 삭제/재시도 | 요약/차이/합의문 표시 | 저장 전 임시 결과 notice |
| share card | preview 생성 중 | 공유 가능한 safe subset 없음 | 이미지 생성/공유 실패 | 이미지 저장 또는 시스템 공유 완료 | 공유 전 포함/제외 안내 |
| delete modal | 삭제 처리 중 | 해당 없음 | 삭제 실패 + 재시도 | 삭제 완료 후 Start로 이동 | 취소 focus 유지 |

상태 문구도 모두 i18n key로 분리한다.

## 12. i18n Key 설계

사용자-facing 한국어 문구는 컴포넌트에 직접 쓰지 않는다. 최소 namespace는 다음으로 둔다.

```text
common.*
start.*
safety.*
setup.*
test.*
handoff.*
participantBStart.*
reveal.*
result.*
share.*
settings.*
deleteConfirm.*
question.*
resultTemplate.*
```

25문항 key는 문항/결과 엔진 문서와 맞춘다.

```text
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
```

화면 copy key 예:

| Key | ko |
| --- | --- |
| `start.title` | 우리 사이를 조금 더 잘 알아보는 시간 |
| `safety.checkbox` | 안내를 확인했어요 |
| `setup.relationship.dating` | 연인 |
| `setup.relationship.married` | 부부 |
| `setup.relationship.situationship` | 썸 |
| `test.progress` | `{current} / {total}` |
| `handoff.title` | 답변이 봉인되었어요 |
| `participantBStart.title` | 이제 `{nickname}`님 차례예요 |
| `reveal.cta` | 우리 결과 열기 |
| `result.save.cta` | 결과 저장하기 |
| `share.excluded.notice` | 문항별 답변과 민감한 세부 내용은 포함되지 않아요. |

## 13. 민감 정보 렌더링 계약

UI 컴포넌트는 원답 전체를 직접 받지 않는다. 데이터 전달은 다음처럼 제한한다.

```ts
type TestScreenProps = {
  participantId: "participantA" | "participantB";
  nickname: string;
  currentQuestion: Question;
  progress: { current: number; total: 25 };
};

type CoupleResultViewModel = {
  summary: string;
  alignedAreas: AlignedAreaView[];
  topDifferences: DifferenceView[];
  misunderstanding: string;
  adjustmentTips: string[];
  agreement: string;
  mission: string;
  isSaved: boolean;
};

type ShareCardPayload = {
  appName: string;
  participantNames: [string, string];
  coupleSummary: string;
  alignedArea: string;
  dailyMission: string;
};
```

금지:

- `TestScreen`에 다른 참가자의 `responses`를 전달하지 않는다.
- `CoupleResultScreen`에 `ParticipantResponses` 원본 배열을 전달하지 않는다.
- `ShareCardScreen`은 `CoupleReport` 전체가 아니라 `ShareCardPayload`만 받는다.
- resultAxis 내부 숫자, difference level, q25 평균값은 UI 텍스트로 직접 노출하지 않는다.

## 14. 화면 컴포넌트 구조 제안

```text
src/
  app/
    AppShell.tsx
    routes.tsx
  features/
    session/
      screens/
        StartScreen.tsx
        SafetyNoticeScreen.tsx
        SessionSetupScreen.tsx
        HandoffScreen.tsx
        ParticipantBStartScreen.tsx
        ReadyToRevealScreen.tsx
        SettingsScreen.tsx
      components/
        SealCard.tsx
        RevealCard.tsx
        TextInputCard.tsx
        SelectChip.tsx
    test/
      screens/
        TestScreen.tsx
      components/
        QuestionCard.tsx
        ScaleOptionGroup.tsx
        ProgressBar.tsx
    result/
      screens/
        CoupleResultScreen.tsx
      components/
        ResultSummaryCard.tsx
        DifferenceCard.tsx
        AgreementCard.tsx
        MissionCard.tsx
        ActionButtonGroup.tsx
        DeleteConfirmModal.tsx
    share/
      screens/
        ShareCardScreen.tsx
      components/
        SharePreviewCard.tsx
  i18n/
    ko.ts
    en.ts
    keys.ts
  platform/
    adapters.ts
    web/
      storageAdapter.ts
      shareAdapter.ts
    toss/
      storageAdapter.ts
      shareAdapter.ts
    google/
      storageAdapter.ts
      shareAdapter.ts
```

의존성 규칙:

- `features/*`는 platform SDK를 직접 import하지 않는다.
- `features/*`는 `StorageAdapter`, `ShareAdapter`, `LocaleAdapter` interface만 호출한다.
- `src/core`의 문항/채점/결과 엔진은 UI와 플랫폼을 알지 않는다.

## 15. 반응형/접근성 보강 기준

- 지원 기준 viewport: 360px, 390px, 430px, tablet 768px.
- 모바일에서는 하단 CTA를 safe-area 위에 고정하되 본문 마지막 콘텐츠를 가리지 않는다.
- 긴 닉네임은 2줄까지 허용하고, CTA 안에서는 `{nickname}`을 넣지 않는다.
- 5점 척도는 `radiogroup`으로 구현하고 질문 id와 연결한다.
- 삭제 모달의 첫 focus는 취소 버튼에 둔다.
- reduced motion이 켜져 있으면 봉인/공개 애니메이션은 fade 150ms 이하로 줄인다.
- `ProgressBar`는 색상만으로 상태를 전달하지 않고 `7 / 25` 텍스트를 항상 표시한다.
- 결과 화면 섹션은 card stack이어도 각 card가 실제 정보 단위일 때만 사용한다. 장식용 카드 grid는 만들지 않는다.

## 16. 이번 리뷰에서 명시적으로 보류한 것

- 시각 mockup 생성: gstack designer 바이너리가 현재 설치 경로에서 확인되지 않았고, 사용자가 샘플 이미지를 이미 제공했으므로 텍스트 기반 리뷰로 진행한다.
- 실제 화면 구현: 이번 단계는 구현 준비와 리뷰이며 코드 구현은 하지 않는다.
- 실제 25문항 copy 수정: 통합 문항/결과 문서가 현재 기준이므로 UI 문서는 key와 렌더링 계약만 맞춘다.
- 원격 저장/로그인/결제/광고 UI: MVP에서는 adapter stub 전제만 둔다.

## 17. Implementation Tasks

- [ ] **T1 (P1, human: ~2h / CC: ~20min)** — `session` — participantA 봉인 이후 route history replace와 back guard를 구현 계획에 넣는다.
  - Surfaced by: Interaction State Coverage — 봉인 뒤 이전 참가자 화면 접근 차단이 UX 신뢰의 핵심이다.
  - Files: `ai/plans/implementation-plan.md`, future `src/core/session/sessionStateMachine.ts`, `src/app/routes.tsx`
  - Verify: participantA 완료 후 back/refresh에서 TestScreen이 열리지 않는 수동 QA.
- [ ] **T2 (P1, human: ~2h / CC: ~20min)** — `i18n` — 화면 copy, 문항, 결과 템플릿 key 구조를 첫 구현 작업에 포함한다.
  - Surfaced by: Design System Alignment — UI 문구 하드코딩은 ko/en 확장과 플랫폼 심사를 막는다.
  - Files: `ai/plans/implementation-plan.md`, future `src/i18n/ko.ts`, `src/i18n/en.ts`
  - Verify: 한국어 화면이 i18n key 누락 없이 렌더링되고 영어 리소스 placeholder가 존재한다.
- [ ] **T3 (P2, human: ~1h / CC: ~10min)** — `share` — 공유 카드는 `ShareCardPayload` safe subset만 받게 설계한다.
  - Surfaced by: Sensitive Data Contract — 전체 리포트를 넘기면 민감 정보가 공유 카드에 섞일 수 있다.
  - Files: future `src/features/share/sharePayload.ts`, `src/features/share/screens/ShareCardScreen.tsx`
  - Verify: raw responses, resultAxis 숫자, q25 값이 공유 payload에 없다.

## GSTACK REVIEW REPORT

| Review | Trigger | Why | Runs | Status | Findings |
|--------|---------|-----|------|--------|----------|
| CEO Review | `/plan-ceo-review` | Scope & strategy | 0 | not run | 제품 방향은 기존 same-device couple-only MVP와 일치해 이번 리뷰에서 새 scope 이슈는 없음 |
| Codex Review | Superpowers verification | Independent 2nd opinion | 1 | issues_fixed | 현재 UI 문서가 i18n, state coverage, safe payload, component structure에서 구현 준비성이 부족해 보완함 |
| Eng Review | `/plan-eng-review` | Architecture & tests (required) | 0 | not run | 구현 전 필수 gate로 남음. session guard와 adapter 구조는 eng review에서 검증 필요 |
| Design Review | `/plan-design-review` | UI/UX gaps | 1 | clean_with_followups | design completeness 6/10 -> 8.5/10. 3개 implementation tasks 도출 |
| DX Review | `/plan-devex-review` | Developer experience gaps | 0 | not run | 구현 계획 작성 이후 필요 여부 판단 |

- **UNRESOLVED:** visual mockup board는 gstack designer 바이너리 부재와 이미 제공된 샘플 이미지 때문에 생성하지 않았다.
- **VERDICT:** 디자인 계획은 구현 계획으로 넘어갈 수 있다. 단, 구현 전에 `/plan-eng-review` 또는 이에 준하는 architecture review로 session guard, i18n, adapter boundary를 검증해야 한다.
