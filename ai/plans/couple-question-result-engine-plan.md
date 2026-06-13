# 커플 성향지도 문항/결과 엔진 설계 계획

Status: decided, pre-implementation
Date: 2026-06-13
Scope: `src/core` 구현 전 설계. 이 문서는 코드 구현물이 아니라 구현 기준이다.

## 1. 목표

25개 자체 제작 문항과 resultAxis 기반 결과 엔진을 구현 가능한 구조로 고정한다.

엔진 목표:

- 참가자별 응답을 1~5점으로 저장한다.
- q25를 제외한 q01~q24로 성향/차이 축을 계산한다.
- q25는 `adjustmentReadiness`로만 사용한다.
- 차이 TOP 3는 문항별 점수가 아니라 resultAxis 단위로 선택한다.
- 잘 맞는 부분을 차이보다 먼저 보여준다.
- 숫자 점수, 궁합 점수, 원답 전체 공개, 민감한 원점수 노출을 금지한다.

## 2. 파일 구조

구현 시 권장 파일:

```text
src/core/questions/
  questions.ts
  resultAxes.ts

src/core/scoring/
  scoreParticipant.ts
  compareParticipants.ts
  selectTopDifferences.ts
  selectAlignedAreas.ts
  generateCoupleReport.ts

src/core/report/
  resultTemplates.ts
  reportTypes.ts

src/core/session/
  sessionTypes.ts
  sessionStateMachine.ts
```

## 3. questions.ts 구조

타입:

```ts
type QuestionDomain =
  | "relationship_energy"
  | "closeness_style"
  | "affection_expression"
  | "conflict_recovery"
  | "adjustment_anchor";

type Question = {
  id: string;
  domain: QuestionDomain;
  facet: string;
  textKey: string;
  reverseScored: boolean;
  resultTags: string[];
  version: number;
};
```

MVP v1 규칙:

- `version`은 `1`로 시작한다.
- `reverseScored`는 모두 `false`로 둔다.
- 사용자-facing 문항 문구는 `textKey`로 i18n에서 관리한다.
- q25는 `domain: "adjustment_anchor"`이며 성향 계산에서 제외한다.

문항 key:

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

## 4. resultAxes.ts 구조

타입:

```ts
type ResultAxis = {
  id: string;
  questionIds: string[];
  kind: "single" | "average" | "paired_pattern";
  highMeaningKey?: string;
  lowMeaningKey?: string;
  patternRules?: AxisPatternRule[];
};

type AxisPatternRule = {
  id: string;
  condition: string;
  meaningKey: string;
};
```

Axis 목록:

| axis | questionIds | kind |
| --- | --- | --- |
| contact_frequency | q01 | single |
| planning_style | q02 | single |
| novelty_energy | q03 | single |
| quiet_togetherness | q04 | single |
| social_energy | q05 | single |
| routine_care | q06 | single |
| reassurance_sensitivity | q07, q08 | average |
| personal_space_independence | q09, q11 | average |
| sharing_pace | q10 | single |
| direct_check_style | q12 | single |
| words_affection | q13 | single |
| focused_time | q14 | single |
| practical_care | q15 | single |
| physical_closeness | q16 | single |
| symbolic_ritual | q17 | single |
| detail_memory | q18 | single |
| conflict_timing | q19, q20 | paired_pattern |
| empathy_solution_balance | q21, q22 | paired_pattern |
| repair_action | q23 | single |
| revisit_after_calm | q24 | single |

### paired_pattern 규칙

`conflict_timing`:

- q19 높음, q20 낮음: 빠른 대화 선호
- q19 낮음, q20 높음: 정리 시간 선호
- q19 높음, q20 높음: 빨리 풀고 싶지만 감정 정리 시간도 필요
- q19 낮음, q20 낮음: 갈등 상황을 크게 확대하지 않고 지나가려는 경향

`empathy_solution_balance`:

- q21 높음, q22 낮음: 공감 우선
- q21 낮음, q22 높음: 해결책 우선
- q21 높음, q22 높음: 공감과 해결 모두 중요
- q21 낮음, q22 낮음: 갈등을 길게 다루는 것 자체가 부담일 수 있음

높음/낮음 기준은 MVP에서 다음처럼 둔다.

- low: 1.0~2.4
- middle: 2.5~3.5
- high: 3.6~5.0

## 5. resultTemplates.ts 구조

템플릿은 사용자-facing 문구를 직접 코드에 박지 않고 i18n key 또는 템플릿 key로 관리한다.

권장 구조:

```ts
type DifferenceTemplate = {
  axis: string;
  titleKey: string;
  participantAHighKey?: string;
  participantALowKey?: string;
  participantBHighKey?: string;
  participantBLowKey?: string;
  misunderstandingKey: string;
  adjustmentTipKey: string;
  agreementSuggestionKey: string;
  dailyMissionKey: string;
};
```

필수 템플릿:

- conflict_timing
- reassurance_sensitivity 또는 words_affection/practical_care 조합
- personal_space_independence
- empathy_solution_balance
- planning_style
- focused_time
- routine_care

첫 구현에서는 모든 axis에 템플릿을 다 만들되, TOP 3 선택 시 표현이 부족한 축은 fallback 템플릿을 사용한다.

## 6. scoreParticipant

입력:

- participant responses
- questions
- resultAxes

출력:

```ts
type ParticipantScore = {
  participantId: "participantA" | "participantB";
  questionScores: Record<string, number>;
  axisScores: Record<string, AxisScore>;
  adjustmentReadiness: number;
};

type AxisScore = {
  axis: string;
  value: number;
  pattern?: string;
  sourceQuestionIds: string[];
};
```

규칙:

- q01~q24는 question score로 계산한다.
- q25는 `adjustmentReadiness`로만 저장한다.
- `reverseScored`가 true이면 `6 - value`로 보정한다.
- single axis는 해당 문항 값.
- average axis는 관련 문항 평균.
- paired_pattern axis는 평균값과 pattern을 함께 저장한다.

## 7. compareParticipants

출력:

```ts
type CoupleDifference = {
  axis: string;
  participantAValue: number;
  participantBValue: number;
  differenceSize: number;
  differenceLevel: "similar" | "mild" | "clear";
  participantAPattern?: string;
  participantBPattern?: string;
  sensitivity: "normal" | "sensitive";
};
```

차이 기준:

- 0.0~0.9: `similar`
- 1.0~1.9: `mild`
- 2.0 이상: `clear`

사용자에게 이 숫자와 level 라벨을 직접 보여주지 않는다.

## 8. selectTopDifferences

규칙:

1. `clear` 차이를 먼저 후보로 둔다.
2. 부족하면 `mild` 차이를 보충한다.
3. 같은 의미의 축은 병합하거나 하나만 선택한다.
4. 민감한 축은 표현 강도를 낮춘다.
5. 최대 3개만 반환한다.

중복 묶음 후보:

- `reassurance_sensitivity` + `direct_check_style` => 안정감을 확인하는 방식
- `conflict_timing` + `revisit_after_calm` => 갈등 후 다시 연결되는 방식
- `words_affection` + `practical_care` => 애정을 알아듣는 방식
- `personal_space_independence` + `sharing_pace` => 가까움과 여백의 균형

## 9. selectAlignedAreas

규칙:

1. 차이가 0.9 이하인 축을 후보로 둔다.
2. 두 사람 모두 높은 축을 우선한다.
3. 관계에 긍정적으로 해석 가능한 축을 우선한다.
4. 최소 1개, 권장 1~2개를 반환한다.
5. 결과 화면에서는 잘 맞는 부분을 차이보다 먼저 보여준다.

예:

```text
두 사람 모두 일상 속에서 꾸준히 챙겨주는 행동을 소중하게 느끼는 편이에요.
```

## 10. q25 앵커

`adjustmentReadinessAverage = (participantA.q25 + participantB.q25) / 2`

| 범위 | tone | missionIntensity |
| ---: | --- | --- |
| 1.0~2.4 | cautious | low |
| 2.5~3.5 | neutral | medium |
| 3.6~5.0 | action_oriented | high |

사용:

- summary tone
- agreement wording
- mission burden
- safety/notice copy intensity

금지:

- 관계 좋음/나쁨 판단
- 궁합 점수화
- 사용자에게 준비도 점수 그대로 노출

## 11. generateCoupleReport

출력 타입:

```ts
type CoupleReport = {
  summary: string;
  alignedAreas: ReportSection[];
  topDifferences: DifferenceReport[];
  agreements: AgreementSuggestion[];
  mission: DailyMission;
  shareSummary: ShareSummary;
  safetyNoteKey: string;
};
```

생성 순서:

1. participant score 계산
2. axis difference 계산
3. aligned area 선택
4. top differences 선택
5. q25 평균으로 tone과 mission intensity 결정
6. result template에 닉네임, 관계 상태, axis 해석을 주입
7. safety note와 share summary 생성

## 12. 테스트 케이스 목록

단위 테스트:

- q25가 axis score에 포함되지 않는다.
- q25 평균이 tone을 정확히 결정한다.
- reverseScored true 문항은 `6 - value`로 보정된다.
- single axis가 올바른 문항 값을 사용한다.
- average axis가 관련 문항 평균을 사용한다.
- paired_pattern axis가 q19/q20, q21/q22 조합을 정확히 해석한다.
- 차이 0.9 이하는 similar로 분류된다.
- 차이 1.0~1.9는 mild로 분류된다.
- 차이 2.0 이상은 clear로 분류된다.
- TOP 3가 최대 3개만 반환된다.
- 중복 의미 축이 결과에서 과하게 반복되지 않는다.
- alignedAreas가 topDifferences보다 먼저 표시될 수 있게 생성된다.
- 공유 요약에 민감 원점수와 원답이 포함되지 않는다.

통합 테스트:

- 두 참가자가 모두 동일 응답을 하면 잘 맞는 부분 중심 리포트가 생성된다.
- contact_frequency가 크게 다른 커플은 연락/만남 빈도 조율 결과가 생성된다.
- conflict_timing이 크게 다른 커플은 대화 타이밍 결과가 생성된다.
- personal_space_independence가 크게 다른 커플은 각자의 시간 조율 결과가 생성된다.
- q25가 낮은 커플은 부담 낮은 미션을 받는다.
- q25가 높은 커플은 실천 중심 미션을 받는다.

## 13. 엣지 케이스

- 한 참가자의 응답이 누락된 경우 결과 생성 금지.
- q25가 누락된 경우 neutral tone fallback.
- 특정 axis 템플릿이 누락된 경우 fallback difference template 사용.
- 모든 차이가 similar이면 TOP 3 대신 “비슷한 흐름” 중심 리포트 제공.
- 모든 차이가 clear이면 민감한 표현을 순화하고 가장 실천 가능한 3개만 선택.
- participant nickname이 비어 있으면 `첫 번째 사람`, `두 번째 사람` fallback.
- 저장 전 앱을 닫으면 임시 세션으로 재개하되 원답 노출 금지.
- 삭제하고 끝내기 후에는 결과 재진입 불가.

## 14. 구현 우선순위

1. `questions.ts`
2. `resultAxes.ts`
3. `resultTemplates.ts`
4. `scoreParticipant.ts`
5. `compareParticipants.ts`
6. `selectTopDifferences.ts`
7. `selectAlignedAreas.ts`
8. `generateCoupleReport.ts`
9. 테스트 케이스

이 문서 이후 구현이 필요하면 `src/core` 중심으로 질문 데이터와 결과 엔진부터 구현한다.
