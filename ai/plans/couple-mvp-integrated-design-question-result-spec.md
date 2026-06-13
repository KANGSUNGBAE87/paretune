# 커플 성향지도 MVP 통합 설계: UX, 25문항, 결과 리포트

Status: decided, pre-implementation
Date: 2026-06-13
Scope: 제품/UX/문항/결과 엔진 설계. 실제 구현 코드는 작성하지 않는다.

## 1. 제품 핵심 정의

`커플 성향지도`는 연인, 부부, 썸 관계의 두 사람이 같은 앱과 같은 기기에서 순서대로 성향 테스트를 하고, 두 사람의 연애 성향 차이를 함께 열어보며, 더 잘 지내기 위한 합의문과 대화 미션을 받는 커플 관계 조율 앱이다.

MVP 플로우:

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

MVP 대상은 `연인`, `부부`, `썸`으로 제한한다. 친구, 가족, 룸메이트, 동료/팀원 분석은 확장 후보로만 남기고 MVP 화면에는 노출하지 않는다.

## 2. 포지셔닝과 금지 표현

제품 포지셔닝:

> 연인/부부가 서로의 연애 성향 차이를 확인하고, 더 잘 맞춰가기 위한 대화와 실천을 돕는 커플 관계 조율 앱.

사용할 표현:

- 커플 성향지도
- 연애 성향 분석
- 관계 성향지도
- 차이 지도
- 커플 비교 리포트
- 맞춰가는 방법
- 합의문
- 대화 미션
- 참고용 자기이해 도구

피해야 할 표현:

- 운명적 궁합
- 심리 진단
- 임상 진단
- 치료
- 상담 대체
- MBTI 기반
- 5 Love Languages 기반
- 공식 애착검사
- 누가 문제인지
- 누가 더 정상인지
- 잘 맞음/안 맞음 단정
- 친구/동료/가족 성향 분석 앱

## 3. 참가자 구조

대표 사용 시나리오는 여자가 먼저 하고 남자가 이어서 하는 커플일 수 있다. 하지만 내부 데이터 구조와 결과 생성 구조는 여자/남자로 고정하지 않는다.

내부 구조:

- `participantA`
- `participantB`

화면에는 사용자가 입력한 닉네임을 표시한다. 성별 입력은 필수가 아니며, 필요하다면 선택사항으로만 둔다.

성별 선택 후보:

- 선택 안 함
- 여성
- 남성
- 직접 입력

결과 문구는 성별이 아니라 닉네임 기준으로 작성한다.

좋은 예:

> 지민님은 연인 사이에서 빠른 확인과 표현을 통해 안정감을 느끼는 편이고, 민수님은 충분히 생각하고 감정이 정리된 뒤 대화할 때 더 편안한 편이에요.

나쁜 예:

> 여자는 예민하고 남자는 무심합니다.

## 4. 문항 설계 원칙

MVP 문항 수는 25개로 한다.

구성:

- 관계 에너지: 6문항
- 가까워지는 방식: 6문항
- 마음 표현 방식: 6문항
- 갈등 회복 방식: 6문항
- 관계 조율 준비도 앵커: 1문항

25번째 문항은 특정 영역 점수에 섞지 않는다. `adjustment_anchor`로 별도 저장하고 결과 리포트의 톤, 미션 강도, 안내 방식을 조절한다.

응답 척도:

| 값 | 라벨 |
| ---: | --- |
| 1 | 전혀 아니다 |
| 2 | 아니다 |
| 3 | 보통이다 |
| 4 | 그렇다 |
| 5 | 매우 그렇다 |

문항 작성 기준:

- 알려진 심리/관계 이론은 구조만 참고한다.
- 공식 검사명, 공식 문항, 공식 결과 체계는 사용하지 않는다.
- Big Five/IPIP, 성인 애착, 사랑 표현 방식, 갈등 회복 방식 등은 내부 참고 구조일 뿐 사용자에게 직접 노출하지 않는다.
- MBTI, 5 Love Languages, 공식 애착검사, 진단/상담/치료 표현을 사용하지 않는다.
- 문항은 전부 자체 제작 문장이다.
- 문항은 연애/부부/썸 관계 안에서의 반응만 묻는다.
- 회사, 가족, 친구, 팀 상황을 묻지 않는다.
- 한 문항에는 하나의 반응만 담는다.
- 상대 비난으로 이어질 수 있는 표현은 금지한다.

## 5. 25개 MVP 문항

문항 데이터에는 `id`, `domain`, `facet`, `textKey`, `reverseScored`, `resultTags`, `version`을 포함한다. 모든 사용자-facing 문구는 i18n key로 분리한다.

| id | domain | facet | 문항 | resultTags |
| --- | --- | --- | --- | --- |
| q01 | relationship_energy | date_rhythm | 연인과는 자주 만나거나 연락할수록 관계가 더 안정적으로 느껴진다. | contact_frequency, stability_by_connection |
| q02 | relationship_energy | planning_comfort | 데이트 계획은 미리 정해져 있을 때 더 편하다. | planning_style, predictability |
| q03 | relationship_energy | novelty_preference | 둘이 새로운 장소나 활동을 자주 해보는 것이 관계에 활력을 준다. | novelty_energy, activity |
| q04 | relationship_energy | quiet_togetherness | 특별한 일을 하지 않아도 같이 조용히 쉬는 시간이 좋다. | quiet_togetherness, calm_bond |
| q05 | relationship_energy | social_energy | 친구나 지인을 함께 만나는 데이트도 관계에 좋은 자극이 된다고 느낀다. | social_energy, outside_stimulation |
| q06 | relationship_energy | routine_care | 반복되는 일상 속에서 꾸준히 챙겨주는 모습이 더 오래 기억에 남는다. | routine_care, consistency |
| q07 | closeness_style | reassurance_need | 상대가 애정 표현을 자주 해주면 관계가 더 안정적으로 느껴진다. | reassurance_sensitivity, verbal_confirmation |
| q08 | closeness_style | distance_sensitivity | 상대가 평소보다 차갑거나 늦게 답하면 이유를 자꾸 생각하게 된다. | reassurance_sensitivity, distance_sensitivity |
| q09 | closeness_style | personal_space | 연인 사이에도 각자의 시간이 충분히 필요하다고 느낀다. | personal_space_independence, boundary |
| q10 | closeness_style | closeness_pace | 관계가 가까워질수록 일상과 감정을 더 많이 공유하고 싶어진다. | sharing_pace, emotional_sharing |
| q11 | closeness_style | independence_comfort | 모든 것을 함께 결정하기보다 각자 알아서 하는 영역도 필요하다. | personal_space_independence, autonomy |
| q12 | closeness_style | direct_check | 불안하거나 서운할 때는 혼자 추측하기보다 직접 확인하고 싶다. | direct_check_style, clarity |
| q13 | affection_expression | words_affection | “좋아해”, “고마워” 같은 말을 자주 들으면 사랑받는 느낌이 든다. | words_affection, verbal_affection |
| q14 | affection_expression | focused_time | 바쁘더라도 나에게 집중해주는 시간이 있을 때 마음이 채워진다. | focused_time, attention |
| q15 | affection_expression | practical_care | 말보다 실제로 챙겨주는 행동에서 애정을 더 크게 느낀다. | practical_care, acts_of_care |
| q16 | affection_expression | physical_closeness | 손잡기, 포옹처럼 자연스러운 스킨십이 관계의 따뜻함을 느끼게 한다. | physical_closeness, warmth |
| q17 | affection_expression | small_ritual | 기념일이나 작은 선물을 챙겨주는 행동이 오래 기억에 남는다. | symbolic_ritual, memory |
| q18 | affection_expression | memory_detail | 내가 말한 작은 취향이나 약속을 기억해줄 때 사랑받는다고 느낀다. | detail_memory, attentiveness |
| q19 | conflict_recovery | immediate_talk | 다툼이 생기면 가능한 빨리 이야기하고 풀고 싶다. | conflict_timing, immediate_talk |
| q20 | conflict_recovery | cooling_time | 감정이 올라왔을 때는 잠시 혼자 정리할 시간이 필요하다. | conflict_timing, cooling_time |
| q21 | conflict_recovery | empathy_first | 문제를 해결하기 전에 먼저 내 감정을 이해받고 싶다. | empathy_solution_balance, empathy_first |
| q22 | conflict_recovery | solution_first | 갈등이 생기면 감정보다 앞으로 어떻게 할지 정하는 게 중요하다. | empathy_solution_balance, solution_first |
| q23 | conflict_recovery | apology_repair | 사과는 말뿐 아니라 이후 행동이 달라질 때 진심으로 느껴진다. | repair_action, behavior_change |
| q24 | conflict_recovery | revisit_after_calm | 다툼이 끝난 뒤에도 나중에 다시 차분히 이야기하면 더 잘 풀린다. | revisit_after_calm, follow_up |
| q25 | adjustment_anchor | adjustment_readiness | 서로의 차이를 알게 되면, 더 편하게 맞춰갈 수 있다고 느낀다. | adjustment_readiness, report_tone |

MVP v1에서는 `reverseScored`를 모두 `false`로 둔다. 역채점 문항은 정밀 진단 확장 시 추가한다.

## 6. resultAxis 설계

차이 TOP 3는 문항별 점수 차이를 그대로 보여주지 않고 resultAxis 단위로 묶어 해석한다.

| axis | 관련 문항 | 높은 쪽 해석 | 낮은 쪽 해석 |
| --- | --- | --- | --- |
| contact_frequency | q01 | 자주 연결될수록 안정감을 느낌 | 연락/만남 빈도가 낮아도 안정감을 유지함 |
| planning_style | q02 | 미리 계획된 데이트가 편함 | 즉흥적 흐름이 더 편함 |
| novelty_energy | q03 | 새로운 활동과 변화에서 활력을 느낌 | 익숙하고 편안한 흐름을 선호할 수 있음 |
| quiet_togetherness | q04 | 조용히 함께 있는 시간에서 안정감을 느낌 | 함께 있을 때 활동감이나 대화가 더 필요할 수 있음 |
| social_energy | q05 | 함께 사람들을 만나는 데이트에서도 에너지를 얻음 | 둘만의 시간을 더 선호할 수 있음 |
| routine_care | q06 | 꾸준한 일상 챙김에서 애정을 느낌 | 일상 루틴보다 특별한 표현이 더 기억에 남을 수 있음 |
| reassurance_sensitivity | q07, q08 | 표현과 확인을 통해 안정감을 얻고 거리 변화에 민감할 수 있음 | 표현이 적어도 비교적 안정감을 유지할 수 있음 |
| personal_space_independence | q09, q11 | 각자의 시간과 독립적 영역이 중요함 | 더 많이 함께하고 공유하는 흐름이 편안할 수 있음 |
| sharing_pace | q10 | 가까워질수록 일상과 감정을 더 많이 공유하고 싶어함 | 가까워져도 일정한 여백을 유지하고 싶어할 수 있음 |
| direct_check_style | q12 | 서운하거나 불안할 때 직접 확인하고 싶어함 | 바로 묻기보다 스스로 정리하거나 상황을 지켜볼 수 있음 |
| words_affection | q13 | 말로 듣는 표현에서 사랑받는 느낌을 얻음 | 말보다 다른 표현을 더 신뢰할 수 있음 |
| focused_time | q14 | 집중된 시간과 온전한 관심에서 마음이 채워짐 | 긴 시간을 함께하지 않아도 안정감을 느낄 수 있음 |
| practical_care | q15 | 실제로 챙겨주는 행동에서 애정을 크게 느낌 | 말, 시간, 분위기 등 다른 표현을 더 중요하게 느낄 수 있음 |
| physical_closeness | q16 | 자연스러운 스킨십에서 관계의 따뜻함을 느낌 | 스킨십보다 다른 방식이 더 편안할 수 있음 |
| symbolic_ritual | q17 | 기념일, 작은 선물, 상징적 표현이 오래 기억에 남음 | 특별한 이벤트보다 평소의 자연스러운 흐름을 선호할 수 있음 |
| detail_memory | q18 | 작은 취향과 약속을 기억해주는 데서 사랑을 느낌 | 디테일보다 큰 흐름의 안정감이나 행동을 더 중요하게 느낄 수 있음 |
| conflict_timing | q19, q20 | q19/q20 조합으로 빠른 대화, 정리 시간, 둘 다 필요, 지나가기 경향을 해석 | 조합형 해석 |
| empathy_solution_balance | q21, q22 | q21/q22 조합으로 공감 우선, 해결 우선, 둘 다 중요, 갈등 다루기 부담을 해석 | 조합형 해석 |
| repair_action | q23 | 사과 이후 행동 변화가 중요함 | 말로 풀거나 분위기가 회복되는 것만으로도 괜찮을 수 있음 |
| revisit_after_calm | q24 | 나중에 다시 차분히 이야기하면 더 잘 풀림 | 한 번 끝난 이야기를 다시 꺼내는 것을 부담스러워할 수 있음 |

## 7. 결과 계산 방식

기본 원칙:

- 응답값은 1~5점이다.
- `reverseScored`가 true인 문항은 `6 - value`로 보정한다.
- q25는 성향 점수 계산에서 제외한다.
- q25는 `adjustmentReadiness` 값으로 따로 보관한다.
- 커플 비교는 점수 우열이 아니라 차이 크기와 조율 제안을 만든다.
- 숫자 점수, 궁합 점수, 위험도 점수, 애착 불안/회피 원점수는 사용자에게 보여주지 않는다.

권장 함수:

```ts
scoreParticipant(responses, questions): ParticipantScore
compareParticipants(scoreA, scoreB): CoupleDifference[]
selectTopDifferences(differences, limit = 3): CoupleDifference[]
selectAlignedAreas(scoreA, scoreB): AlignedArea[]
generateCoupleReport(session, scores, differences, locale): CoupleReport
```

차이 크기 기준:

- 0.0~0.9: 비슷함
- 1.0~1.9: 약간 차이
- 2.0 이상: 뚜렷한 차이

사용자에게 숫자는 직접 보여주지 않고 내부 계산용으로만 사용한다.

## 8. 차이 TOP 3 선택 기준

`selectTopDifferences`는 다음 기준을 따른다.

1. resultAxis별로 participantA와 participantB의 해석 차이를 계산한다.
2. 차이가 큰 축을 우선한다.
3. 너무 민감하거나 비난으로 해석될 수 있는 항목은 표현을 순화한다.
4. 같은 의미의 축이 중복되면 하나만 선택한다.
5. TOP 3만 보여준다.
6. 나머지 차이는 상세 리포트 확장 후보로 남긴다.

중복 묶음 예:

- `reassurance_sensitivity`와 `direct_check_style`이 모두 크게 차이 나면 `안정감을 확인하는 방식`으로 묶을 수 있다.
- `conflict_timing`과 `revisit_after_calm`이 모두 크게 차이 나면 `갈등 후 다시 연결되는 방식`으로 묶을 수 있다.

## 9. 잘 맞는 부분 선택 기준

`selectAlignedAreas`는 다음 후보를 우선한다.

- 두 사람 모두 점수가 높은 축
- 두 사람의 차이가 작은 축
- 관계에 긍정적으로 해석 가능한 축

결과는 차이보다 잘 맞는 부분을 먼저 보여준다. 사용자가 “우리는 안 맞나?”라고 느끼지 않도록 한다.

예시:

> 두 사람 모두 일상 속에서 꾸준히 챙겨주는 행동을 소중하게 느끼는 편이에요.

## 10. q25 관계 조율 준비도 앵커

q25 평균값은 participantA와 participantB의 q25 응답 평균으로 계산한다.

| 평균 | 결과 톤 | 미션 강도 |
| ---: | --- | --- |
| 1.0~2.4 | 조심스러운 톤 | 작고 부담 없는 대화 미션 |
| 2.5~3.5 | 중립 톤 | 차이 확인과 작은 실천 |
| 3.6~5.0 | 실천 중심 톤 | 조금 더 적극적인 합의문과 미션 |

예시:

- 낮음: “바로 많은 것을 바꾸기보다, 오늘은 서로 편한 방식 하나만 가볍게 이야기해보세요.”
- 중간: “두 사람의 차이를 가볍게 확인하고, 오늘 해볼 수 있는 작은 약속을 정해보세요.”
- 높음: “두 사람 모두 차이를 조율해볼 준비가 있는 편이에요. 오늘 바로 해볼 수 있는 약속을 하나 정해보세요.”

q25는 절대 “관계가 좋다/나쁘다”를 판단하는 점수로 쓰지 않는다.

## 11. 결과 리포트 구조

결과 생성 순서:

1. 전체 커플 스타일 한 줄 요약
2. 잘 맞는 부분
3. 차이가 큰 부분 TOP 3
4. 오해가 생기기 쉬운 상황
5. 맞춰가는 방법
6. 추천 합의문
7. 오늘의 대화 미션
8. 저장/공유/삭제 선택

결과 작성 흐름:

```text
차이 발견
→ 오해 가능성 설명
→ 서로의 관점 설명
→ 맞춰가는 방법
→ 추천 합의문
→ 오늘의 대화 미션
```

타입 기준:

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

## 12. 결과 문장 예시

### 갈등 후 대화 타이밍 차이

제목: 대화 속도

participantA:

> {participantA}님은 불편한 감정이 생기면 빠르게 이야기해야 마음이 놓이는 편이에요.

participantB:

> {participantB}님은 감정이 조금 가라앉은 뒤 이야기할 때 더 차분하게 표현할 수 있는 편이에요.

오해 순간:

> {participantA}님은 상대가 시간을 갖자고 할 때 피한다고 느낄 수 있고, {participantB}님은 바로 이야기하자는 말이 압박처럼 느껴질 수 있어요.

조율 팁:

> 바로 결론을 내기보다, 다시 이야기할 시간을 정해두면 두 사람 모두 덜 불안하게 대화할 수 있어요.

합의문:

> 감정이 커졌을 때는 잠시 쉬고, 오늘 안에 다시 이야기하기로 약속해보세요.

대화 미션:

> 각자 ‘다툼 후 내가 대화하기 편한 타이밍’을 하나씩 말해보세요.

### 애정 확인 방식 차이

제목: 애정 확인 방식

> {participantA}님은 말과 표현을 통해 안정감을 느끼는 편이에요.

> {participantB}님은 직접적인 말보다 행동으로 챙기는 방식이 더 자연스러울 수 있어요.

> {participantA}님은 표현이 적으면 마음이 식었다고 느낄 수 있고, {participantB}님은 이미 행동으로 보여주고 있다고 느낄 수 있어요.

> 말과 행동 중 하나만 정답으로 두지 말고, 서로 알아듣기 쉬운 표현을 섞어보는 게 좋아요.

합의문:

> 표현이 어색해도 하루에 한 번은 고마웠던 점을 말로 전해보기로 해요.

대화 미션:

> 오늘 상대가 해준 행동 중 고마웠던 점 하나를 말로 전해보세요.

### 개인 공간 차이

제목: 각자의 시간

> {participantA}님은 연인 사이에서도 각자의 시간이 충분할 때 관계가 더 편안하게 느껴질 수 있어요.

> {participantB}님은 더 자주 함께하고 공유할수록 가까워진다고 느낄 수 있어요.

> {participantA}님에게는 자연스러운 휴식이, {participantB}님에게는 거리감처럼 느껴질 수 있어요.

> 각자의 시간을 갖되, 언제 다시 연결될지 작은 신호를 남겨두면 오해가 줄어들 수 있어요.

합의문:

> 혼자 쉬는 시간이 필요할 때는 이유 없이 사라지기보다, 언제 다시 연락할지 함께 알려주기로 해요.

대화 미션:

> 각자 ‘혼자 있고 싶을 때 듣고 싶은 말’을 하나씩 정해보세요.

## 13. 화면 UX 설계

필수 화면:

| 화면 | UX 목표 | 주요 카피/요소 |
| --- | --- | --- |
| StartScreen | 앱 목적 설명과 시작 | “우리 사이를 조금 더 잘 알아보는 시간” |
| SafetyNoticeScreen | 참고용/안전 안내 | 진단/상담/치료 대체 아님, 비난/통제 금지 |
| SessionSetupScreen | 관계 상태와 참가자 설정 | 연인/부부/썸, 닉네임, 먼저 할 사람 |
| TestScreen | 현재 참가자의 25문항 응답 | 진행률 7/25, 5점 척도, 영역 라벨 |
| HandoffScreen | participantA 답변 봉인 | “답변이 봉인되었어요” |
| ParticipantBStartScreen | participantB 시작 전 신뢰감 | “상대의 답변은 보이지 않아요” |
| ReadyToRevealScreen | 결과 공개 전 감정적 하이라이트 | “두 사람의 응답이 모두 모였어요” |
| CoupleResultScreen | 조율 중심 리포트 | 잘 맞는 부분, 차이 TOP 3, 합의문, 미션 |
| ShareCardScreen | 안전한 공유 카드 | 민감 정보 제외 |
| SettingsScreen | 언어/삭제/안내 | 결과 삭제, 세션 삭제, 안내/약관 |

## 14. 디자인 방향

디자인 목표:

- “궁합 테스트”가 아니라 “커플 관계 조율 앱”처럼 보이게 한다.
- 누가 맞고 틀린지 판정하는 UI를 피한다.
- 같은 기기에서 순서대로 하는 흐름을 명확히 한다.
- participantA의 답변이 participantB에게 노출되지 않는다는 신뢰감을 준다.
- 결과 화면은 점수 대결이 아니라 요약, 차이, 오해 가능성, 맞춰가는 방법, 합의문, 오늘의 대화 미션 중심으로 구성한다.

디자인 톤:

- 따뜻함
- 안전함
- 신뢰감
- 가볍지만 유치하지 않음
- Toss 스타일처럼 간결하고 모바일 친화적
- 한국어 UI 기준

시각 방향:

- warm ivory / cream 배경
- soft coral primary
- lavender secondary
- soft blue accent
- deep warm gray 텍스트
- muted gray 보조 텍스트
- soft green 안전/완료
- 차분한 amber 안내

과한 하트, 과한 커플 일러스트, 유치한 궁합 테스트 느낌은 피한다. 실제 사람 사진보다 추상 아바타, 겹치는 원, 지도 라인, 봉투/잠금, 부드러운 길/경로 그래픽을 사용한다.

## 15. 상태 관리와 저장/삭제 정책

세션 상태:

```ts
type CoupleSessionStatus =
  | "not_started"
  | "participant_a_in_progress"
  | "participant_a_sealed"
  | "handoff_to_participant_b"
  | "participant_b_in_progress"
  | "ready_to_reveal"
  | "revealed"
  | "saved"
  | "deleted";
```

상태와 UX 제약:

- participantA 테스트 완료 후 개인 결과를 보여주지 않는다.
- participantA 답변 봉인 후 뒤로가기로 participantA 답변 화면에 접근하지 못하게 설계한다.
- participantB 테스트 완료 후 결과를 바로 보여주지 않고 ReadyToRevealScreen을 거친다.
- 결과 저장은 자동 저장이 아니라 사용자가 “결과 저장하기”를 눌렀을 때만 저장되는 느낌으로 설계한다.
- “삭제하고 끝내기”는 저장하기와 함께 명확히 보여준다.
- 삭제 전에는 확인 모달을 둔다.

결과 공개 후 선택지:

- 결과 저장하기
- 공유 카드 만들기
- 삭제하고 끝내기

기본 정책:

> 결과는 사용자가 명시적으로 저장하기 전까지 임시 세션으로만 유지한다.

## 16. 라우팅과 폴더 구조

권장 라우트:

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

권장 폴더 구조:

```text
src/core/questions/
src/core/scoring/
src/core/session/
src/core/report/
src/features/session/
src/features/test/
src/features/result/
src/features/share/
src/components/
src/design/
src/i18n/
src/platform/
src/platform/toss/
src/platform/google/
src/platform/web/
```

## 17. 플랫폼과 i18n 기준

이 앱은 비게임 앱이다. 1차 출시 경로는 Apps in Toss를 우선 고려하되, Google Play 호환을 첫 구현부터 유지한다.

필수 어댑터:

- `StorageAdapter`
- `ShareAdapter`
- `AnalyticsAdapter` placeholder
- `PaymentAdapter` placeholder
- `LocaleAdapter`
- `AuthAdapter` no-op

MVP 제외:

- 계정 로그인
- 서버 기반 커플 연결
- 초대 링크
- 초대 코드
- 원격 동기화
- 실제 결제
- 실제 광고
- AI 상담 채팅
- 상담사 연결
- 장기 히스토리 분석

한국어 `ko`를 기본 언어로 한다. 영어 `en` 확장을 첫 구현부터 가능하게 설계한다. 사용자-facing copy는 기능 로직에 하드코딩하지 않는다.

## 18. 공유 카드 안전 기준

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

## 20. 최종 주의사항

이 앱은 심리검사 앱처럼 보이면 안 된다. 궁합 점수 앱처럼 보이면 안 된다. 상대를 평가하거나 비난하게 만드는 앱이면 안 된다.

이 앱은 다음을 돕는 앱이어야 한다.

- 두 사람이 자신의 연애 성향을 편하게 말할 수 있게 한다.
- 서로의 차이를 안전하게 확인하게 한다.
- 차이를 문제로 보지 않고 조율 지점으로 보게 한다.
- 결과를 대화와 작은 실천으로 이어지게 한다.
- 한쪽의 원답이나 민감 정보를 노출하지 않는다.
- 같은 기기에서 순서대로 진행하는 UX를 신뢰감 있게 만든다.
