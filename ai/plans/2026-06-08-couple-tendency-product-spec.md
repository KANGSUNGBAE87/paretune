# 커플 성향지도 제품 기획 및 MVP 구현 기준

Status: draft-approved for planning
Date: 2026-06-08
Project: 커플성향

## 1. 제품 핵심 정의

`커플 성향지도`의 MVP는 커플이 같은 앱, 같은 기기에서 순서대로 성향 테스트를 하고, 두 사람의 연애 성향 차이를 함께 열어보며, 더 잘 지내기 위한 합의문과 대화 미션을 받는 커플 관계 조율 앱이다.

핵심 플로우는 다음으로 고정한다.

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

이 앱은 일반 인간관계 분석 앱이 아니다. MVP는 연인, 부부, 썸/연애 전 단계의 관계에 집중한다. 친구, 가족, 룸메이트, 동료/팀원 성향 분석은 확장 후보로만 남기고 MVP 화면에는 노출하지 않는다.

## 2. 포지셔닝

제품 포지셔닝은 다음 문장으로 고정한다.

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

## 3. 대상 사용자와 관계 상태

MVP 대상은 다음으로 제한한다.

- 연인
- 부부
- 썸

핵심 문구와 결과 리포트는 연인/부부 중심으로 작성한다. 썸은 선택적으로 포함하되, 결과 문구가 과도하게 장기 관계를 전제하지 않도록 한다.

관계 상태 선택 옵션:

- 연인
- 부부
- 썸

향후 확장 후보:

- 친구
- 가족
- 룸메이트
- 동료/팀원

확장 후보는 MVP 화면에는 노출하지 않는다.

## 4. 참가자 구조

대표 사용 시나리오는 여자가 먼저 하고 남자가 이어서 하는 커플 상황일 수 있다. 하지만 내부 데이터와 결과 생성 구조는 여자/남자로 고정하지 않는다.

내부 참가자 구조:

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

피해야 할 예:

> 여자는 예민하고 남자는 무심합니다.

## 5. 방법론 기준

MVP 진단은 검증된 이론 구조를 참고하되, 상표화된 검사명, 공식 문항, 공식 결과 체계는 사용하지 않는다.

### 5.1 관계 에너지

- 기반: Big Five/IPIP의 외향성, 성실성, 개방성 일부 참고
- 목적: 데이트 빈도, 계획 선호, 새로움 선호, 관계에서 쓰는 에너지 차이를 파악한다.
- 결과는 `외향성 점수` 같은 원척도 이름보다 `함께 움직이는 에너지`, `계획을 편안하게 느끼는 정도`처럼 앱 자체 언어로 표현한다.

### 5.2 가까워지는 방식

- 기반: 성인 애착 이론의 애착 불안/애착 회피 2축 참고
- 목적: 관계에서 안정감을 얻는 방식, 확인 욕구, 개인 공간 욕구, 거리감 조절 방식을 파악한다.
- ECR-RS 등 연구 척도는 구조만 참고하고 문항은 자체 제작한다.

### 5.3 마음 표현 방식

- 기반: 자체 제작
- 목적: 말, 시간, 행동, 스킨십, 기념/선물 등 사랑을 느끼고 표현하는 방식을 파악한다.
- 5 Love Languages 명칭, 공식 구조, 공식 문항은 사용하지 않는다.

### 5.4 갈등 회복 방식

- 기반: 자체 제작
- 목적: 다툼 직후 대화 속도, 감정 공감 욕구, 해결책 선호, 혼자 정리할 시간 필요 여부를 파악한다.
- Gottman Method, TKI 등 상업적/브랜드화된 도구명이나 공식 구조를 사용하지 않는다.

## 6. 문항 수와 작성 기준

MVP 문항 수는 1인당 25문항으로 한다. 두 사람이 같은 자리에서 진행하므로 총 응답량은 50문항을 넘기지 않는다.

권장 MVP 문항 구성:

| 영역 | 문항 수 | 목적 |
| --- | ---: | --- |
| 관계 에너지 | 6 | 데이트 리듬, 계획 선호, 활동 에너지 |
| 가까워지는 방식 | 6 | 확인 욕구, 개인 공간, 안정감 방식 |
| 마음 표현 방식 | 6 | 애정 표현과 수신 방식 |
| 갈등 회복 방식 | 6 | 다툼 후 회복 속도와 대화 방식 |
| 관계 조율 준비도 앵커 | 1 | 결과 톤과 미션 강도 조절 |

25번째 문항은 영역 평균, 차이 TOP 3, 개인 성향 산출에 직접 포함하지 않는다. `adjustment_anchor`로 별도 저장하고 결과 리포트의 조심스러움, 실천성, 미션 강도를 조절하는 데만 사용한다.

정밀 진단은 1인당 32~56문항으로 확장할 수 있게 문항 데이터 구조를 분리한다.

응답 척도:

- 전혀 아니다
- 아니다
- 보통이다
- 그렇다
- 매우 그렇다

문항 작성 원칙:

- 연애 관계 안에서의 반응을 묻는다.
- 일반 인간관계, 회사, 가족, 팀 상황을 묻지 않는다.
- 한 문항에 하나의 반응만 묻는다.
- 상대 비난으로 이어질 수 있는 표현을 피한다.
- 일부 문항은 reverse scoring을 허용하되, 문항 데이터에 명시한다.

좋은 문항 예시:

- 상대가 애정 표현을 자주 해주면 관계가 더 안정적으로 느껴진다.
- 다툼이 생기면 바로 이야기하고 풀고 싶다.
- 연인 사이에도 각자의 시간이 충분히 필요하다고 느낀다.
- 말보다 행동으로 챙겨줄 때 사랑받는 느낌이 든다.
- 데이트 계획은 미리 정해져 있을 때 더 편하다.
- 상대가 평소와 다르게 차가워 보이면 이유를 자꾸 생각하게 된다.

피해야 할 문항 예시:

- 주변 사람과 갈등이 생기면 어떻게 하나요?
- 사람들과 지낼 때 어떤 편인가요?
- 팀에서 의견이 다를 때 어떻게 하나요?
- 가족과 대화할 때 어떤 편인가요?

## 7. MVP 사용자 흐름

### 7.1 시작 화면

목적을 짧게 설명한다.

예시:

> 가까운 연인 또는 부부가 함께 해보는 커플 성향지도예요. 누가 맞고 틀린지 보는 검사가 아니라, 서로의 차이를 이해하고 더 잘 맞춰가기 위한 참고용 도구예요.

### 7.2 안전/참고용 안내

테스트 시작 전 다음 내용을 안내한다.

- 의학적/임상적 진단이 아님
- 상담이나 치료를 대체하지 않음
- 결과를 상대 비난/통제 목적으로 사용하지 말 것
- 심각한 폭력, 위협, 스토킹, 강압, 정서적 학대 상황에서는 앱보다 안전 확보와 전문기관 상담이 우선

필수 문구:

> 이 결과는 의학적·임상적 진단이 아니며, 커플 간 자기이해와 대화를 돕기 위한 참고용입니다. 결과를 상대를 비난하거나 통제하는 용도로 사용하지 마세요. 심각한 폭력, 위협, 스토킹, 강압, 정서적 학대가 있는 관계라면 앱 결과보다 안전 확보와 전문기관 상담이 우선입니다.

### 7.3 관계 상태 선택

옵션은 `연인`, `부부`, `썸`으로 제한한다. 친구/가족/동료는 MVP에서 노출하지 않는다.

### 7.4 참가자 정보 입력

입력 항목:

- 참가자 A 닉네임
- 참가자 B 닉네임
- 먼저 할 사람 선택
- 성별 선택사항

닉네임은 결과 문구와 공유 카드에 사용한다. 실명 입력은 필수가 아니다.

### 7.5 participantA 테스트

- 1인당 25문항
- 5점 척도
- 영역별 또는 전체 진행률 표시
- 완료 후 개인 결과를 보여주지 않는다.

### 7.6 participantA 답변 봉인

participantA가 완료하면 답변을 봉인한다.

예시:

> 답변이 저장되었어요. 결과는 두 사람의 응답이 모두 끝난 뒤 함께 열 수 있어요. 이제 상대에게 폰을 건네주세요.

요구사항:

- participantA의 원답을 노출하지 않는다.
- participantA의 개인 결과를 노출하지 않는다.
- participantB가 participantA 답변에 영향받지 않도록 한다.
- 뒤로가기로 participantA 답변 화면에 접근하지 못하게 한다.

### 7.7 폰 넘기기 화면

participantB에게 차례가 넘어간다는 전환 화면을 명확히 둔다.

예시:

> 이제 민수님 차례예요. 이전 응답은 보이지 않아요. 편하게 자신의 생각대로 답해주세요.

### 7.8 participantB 테스트

- participantA와 같은 문항 구조를 사용한다.
- 완료 후 결과를 바로 보여주지 않고 함께 여는 화면으로 이동한다.

### 7.9 함께 결과 열기

participantB가 끝난 뒤 반드시 함께 결과 열기 화면을 둔다.

예시:

> 두 사람의 응답이 모두 모였어요. 결과는 한 사람을 평가하기 위한 것이 아니라, 서로를 더 잘 이해하기 위한 참고용이에요. 준비되면 함께 결과를 열어보세요.

버튼:

> 우리 결과 열기

### 7.10 커플 비교 리포트

결과 리포트는 다음 순서로 보여준다.

1. 전체 커플 스타일 한 줄 요약
2. 잘 맞는 부분
3. 차이가 큰 부분 TOP 3
4. 오해가 생기기 쉬운 상황
5. 맞춰가는 방법
6. 추천 합의문
7. 오늘의 대화 미션
8. 저장/공유/삭제 선택

## 8. 결과 리포트 원칙

결과는 판정이 아니라 조율 중심으로 작성한다.

절대 피할 표현:

- A가 문제입니다.
- B는 회피형입니다.
- 두 사람은 잘 안 맞습니다.
- 한쪽이 더 성숙합니다.
- 여자는 예민하고 남자는 무심합니다.
- 헤어지는 것이 좋습니다.
- 상대가 바뀌어야 합니다.

좋은 결과 문장 예시:

> 지민님은 연인 사이에서 빠른 확인과 표현을 통해 안정감을 느끼는 편이고, 민수님은 감정이 가라앉은 뒤 차분히 대화할 때 더 편안한 편이에요. 이 차이는 사랑의 크기보다 안정감을 얻는 방식의 차이일 수 있어요.

각 차이 항목 구조:

- 차이 이름
- participantA 성향
- participantB 성향
- 오해가 생기는 순간
- 맞춰가는 방법
- 추천 합의문

결과 작성 흐름:

```text
차이 발견
→ 오해 가능성 설명
→ 서로의 관점 설명
→ 맞춰가는 방법
→ 추천 합의문
→ 오늘의 대화 미션
```

추천 합의문 예시:

> 다툼 직후 바로 결론내기보다, 잠시 쉬고 다시 이야기하기로 약속해보세요.

오늘의 대화 미션 예시:

> 오늘 서로에게 “내가 편안함을 느끼는 관계 방식”을 하나씩 말해보세요.

합의문과 미션 기준:

- 명령형보다 제안형으로 작성한다.
- 한쪽에게만 맞추라고 하지 않는다.
- 두 사람이 함께 조율하는 문장으로 작성한다.
- 상대를 통제하거나 압박하는 문구를 금지한다.

## 9. 결과 저장/삭제 정책

결과는 자동 저장보다 선택 저장을 기본으로 한다.

결과 공개 후 선택지:

- 결과 저장하기
- 공유 카드 만들기
- 삭제하고 끝내기

기본 정책:

> 결과는 사용자가 명시적으로 저장하기 전까지 임시 세션으로만 유지한다.

저장하지 않고 끝내기를 선택하면 로컬 세션과 결과 데이터를 삭제한다. 저장된 결과도 결과 화면에서 삭제할 수 있어야 한다.

## 10. 개인정보와 원답 공개 원칙

MVP 기준:

- 실명 입력 필수 아님
- 닉네임 기반 사용
- 성별 입력 필수 아님
- participantA 결과는 participantB 테스트 전까지 비공개
- participantA/B의 문항별 원답 전체 공개 금지
- 결과는 요약/차이/조율법 중심으로 제공
- 결과 저장은 사용자 선택
- 결과 삭제 가능
- 세션 삭제 가능
- 공유 카드에는 민감한 세부 답변을 포함하지 않음
- MVP는 서버 저장 없이 로컬 저장 우선

같은 기기에서 진행하므로 원답 노출 방지를 제품 신뢰의 핵심으로 본다.

## 11. 중단/뒤로가기/재시작 정책

세션 상태는 로컬에 임시 저장한다. 단, 원답 노출과 이전 참가자 답변 접근을 막는 정책을 우선한다.

예외 상황별 정책:

| 상황 | 정책 |
| --- | --- |
| participantA 테스트 중 앱을 닫음 | 같은 참가자의 진행 중 테스트로 재개하거나 처음부터 다시 시작할 수 있다. |
| participantA 완료 후 participantB가 아직 시작하지 않음 | `participant_a_sealed` 상태로 재개한다. participantA 원답은 열람할 수 없다. |
| participantB 테스트 중 앱을 닫음 | participantB 진행 중 테스트로 재개한다. participantA 원답은 열람할 수 없다. |
| 뒤로가기 | 이전 참가자 답변 화면에 접근하지 못하게 한다. 현재 참가자 응답 중 뒤로가기는 확인 후 허용할 수 있다. |
| 처음부터 다시 시작 | 명확한 확인 모달 뒤 로컬 임시 세션을 삭제하고 `not_started`로 돌아간다. |
| 세션 삭제 | 결과 공개 전후 모두 가능해야 한다. 삭제 전 확인을 받는다. |
| 저장하지 않고 끝내기 | 임시 세션과 결과 데이터를 삭제한다. |
| 결과 생성 후 삭제 | 저장된 결과와 공유 카드 생성용 데이터까지 삭제한다. |

## 12. 공유 카드 정책

공유 카드는 가볍고 안전하게 설계한다.

포함 가능:

- 앱 이름
- 두 사람 닉네임
- 전체 커플 스타일 한 줄
- 잘 맞는 부분 1개
- 오늘의 대화 미션 1개

포함 금지:

- 문항별 원답
- 애착 불안/회피 같은 민감한 원점수
- 갈등 취약점 상세
- 상대 비난으로 해석될 수 있는 표현
- 위험/문제/불안정 같은 자극적 표현

## 13. MVP 포함 기능

- 커플 온보딩
- 안전/참고용 안내
- 관계 상태 선택: 연인/부부/썸
- participantA/B 닉네임 입력
- 먼저 할 사람 선택
- 한 기기 순차 테스트
- participantA 결과/원답 봉인
- 폰 넘기기 화면
- participantB 테스트
- 함께 결과 열기 화면
- 커플 비교 리포트
- 커플 성향 요약
- 잘 맞는 부분
- 차이가 큰 부분 TOP 3
- 오해가 생기기 쉬운 상황
- 추천 합의문
- 오늘의 대화 미션 1개
- 결과 공유 카드
- 결과 저장하기
- 삭제하고 끝내기
- 세션 삭제
- 한국어 기본
- 영어 확장 가능한 i18n 구조
- `StorageAdapter`
- `ShareAdapter`
- `AnalyticsAdapter` placeholder
- `PaymentAdapter` placeholder
- Apps in Toss / Google Play 호환 고려 사항

## 14. MVP 제외 기능

- 친구/가족/동료/룸메이트 모드
- 일반 인간관계 성향 분석
- 상대 초대 링크
- 초대 코드
- 계정 로그인
- 서버 기반 커플 연결
- 원격 동기화
- 장기 히스토리 분석
- 상담사 연결
- AI 상담 채팅
- 커뮤니티
- 구독 결제 실제 연동
- 광고 실제 연동
- MBTI식 16유형
- 5 Love Languages 명칭 사용
- 공식 심리검사처럼 보이는 표현
- 상대의 문항별 원답 전체 공개
- 의료/임상/상담 진단 기능

## 15. 예상 화면 목록과 라우팅

권장 라우트:

| Route | Screen | 목적 |
| --- | --- | --- |
| `/` | StartScreen | 앱 목적과 시작 CTA |
| `/safety` | SafetyNoticeScreen | 참고용/안전 안내 동의 |
| `/session/setup` | SessionSetupScreen | 관계 상태, 닉네임, 먼저 할 사람 설정 |
| `/test/:participantId` | TestScreen | 현재 참가자 문항 응답 |
| `/handoff` | HandoffScreen | participantA 봉인 및 폰 넘기기 |
| `/ready` | ReadyToRevealScreen | 함께 결과 열기 |
| `/result` | CoupleResultScreen | 커플 비교 리포트 |
| `/share` | ShareCardScreen | 안전한 공유 카드 생성 |
| `/settings` | SettingsScreen | 언어, 삭제, 약관/안내 |

화면 컴포넌트는 세션 상태를 직접 계산하지 않고, core의 세션 상태와 결과 계산 함수를 호출한다.

## 16. 상태 관리 구조

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

세션 데이터 예시:

```ts
type CoupleSession = {
  id: string;
  relationshipStatus: "dating" | "married" | "situationship";
  status: CoupleSessionStatus;
  firstParticipantId: "participantA" | "participantB";
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

참가자 예시:

```ts
type ParticipantProfile = {
  id: "participantA" | "participantB";
  nickname: string;
  gender?: "female" | "male" | "custom" | "unspecified";
  customGenderLabel?: string;
};
```

## 17. 문항 데이터 구조

문항 데이터는 UI 문구, 채점 축, 역채점 여부, i18n 키를 분리한다.

```ts
type Question = {
  id: string;
  domain:
    | "relationship_energy"
    | "closeness_style"
    | "affection_expression"
    | "conflict_recovery";
  facet: string;
  textKey: string;
  reverseScored?: boolean;
  version: number;
};

type QuestionResponse = {
  questionId: string;
  value: 1 | 2 | 3 | 4 | 5;
};

type ParticipantResponses = {
  participantId: "participantA" | "participantB";
  questionSetVersion: number;
  answers: QuestionResponse[];
  completedAt?: string;
};
```

## 18. 결과 계산과 리포트 생성

계산 원칙:

- 각 참가자별로 영역 평균을 계산한다.
- reverse scoring 문항은 계산 단계에서 보정한다.
- 커플 비교는 점수 우열이 아니라 차이 크기와 조율 제안을 만든다.
- 차이가 큰 항목은 resultAxis 단위로 묶어 TOP 3로 제한한다.
- q25 `adjustment_anchor`는 성향 점수에서 제외하고 결과 톤과 미션 강도 조절에만 사용한다.
- 결과 문구는 닉네임과 관계 상태를 반영하되, 비난/단정 표현을 금지한다.

권장 함수:

```ts
scoreParticipant(responses, questions): ParticipantScore
compareParticipants(scoreA, scoreB): CoupleDifference[]
selectTopDifferences(differences, limit = 3): CoupleDifference[]
generateCoupleReport(session, scores, differences, locale): CoupleReport
```

결과 타입 예시:

```ts
type CoupleReport = {
  summary: string;
  alignedAreas: ReportSection[];
  topDifferences: DifferenceReport[];
  agreements: AgreementSuggestion[];
  mission: DailyMission;
  safetyNoteKey: string;
};
```

## 19. i18n 기준

한국어(`ko`)를 기본 언어로 하고 영어(`en`) 확장을 첫 구현부터 가능하게 한다. 사용자-facing copy는 기능 로직에 하드코딩하지 않는다.

권장 key 구조:

```text
app.title
onboarding.start.title
onboarding.safety.body
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
handoff.title
handoff.body
reveal.title
reveal.cta
result.summary.title
result.difference.title
result.agreement.title
result.mission.title
share.card.title
settings.delete_session
```

LLM 기반 문구 생성 기능이 나중에 추가되더라도 active locale을 명시하고, LLM API 키는 앱 번들에 넣지 않는다.

## 20. 플랫폼/어댑터 기준

이 앱은 비게임 앱이므로 1차 출시 경로는 Apps in Toss로 잡고, Google Play 호환을 첫 구현부터 유지한다.

권장 폴더 구조:

```text
src/core/                    순수 제품 로직, 채점, 리포트 생성
src/features/session/         세션 시작/상태 흐름 UI
src/features/test/            문항 응답 UI
src/features/result/          결과 리포트 UI
src/features/share/           공유 카드 UI
src/i18n/                     ko/en 번역 리소스
src/platform/                 어댑터 인터페이스와 capability detection
src/platform/toss/            Apps in Toss 구현체
src/platform/google/          Google Play/Android 구현체
src/platform/web/             로컬 웹/개발 fallback 구현체
```

필수 어댑터:

| Adapter | MVP 구현 | Apps in Toss 방향 | Google Play 방향 |
| --- | --- | --- | --- |
| `StorageAdapter` | 로컬 임시/선택 저장 | Toss 환경 저장 또는 로컬/백엔드 확장 | Android storage/SQLite/cloud 확장 |
| `ShareAdapter` | 이미지/텍스트 공유 fallback | Toss 공유 기능 가능성 검토 | Android share intent |
| `AnalyticsAdapter` | no-op placeholder | Toss-compatible analytics 검토 | Firebase/GA 등 |
| `PaymentAdapter` | no-op placeholder | Apps in Toss IAP | Google Play Billing |
| `LocaleAdapter` | ko 기본, en 선택 가능 | Toss/device locale hint | Android/device locale hint |
| `AuthAdapter` | MVP 제외/no-op | Toss login은 후순위 | Credential Manager/Google Sign-In은 후순위 |

MVP에서는 계정 로그인, 서버 기반 커플 연결, 결제/광고 실제 연동을 제외한다. 다만 어댑터 인터페이스를 먼저 두어 제품 로직이 특정 플랫폼 SDK를 직접 import하지 않도록 한다.

## 21. 보안/백엔드 기준

MVP는 서버 저장 없이 로컬 저장 우선이다. 향후 서버가 추가되면 다음 원칙을 지킨다.

- LLM API 키, 결제 검증 비밀키, 스토어 인증정보를 앱 번들에 넣지 않는다.
- 유료 리포트, 미션팩, PDF 저장 등 paid entitlement는 백엔드 검증 후 부여한다.
- 서버에는 raw answer 저장을 최소화하고, 저장 목적과 삭제 방법을 명확히 한다.
- 커플 데이터는 개인별 민감 정보로 취급한다.

## 22. 수익화 방향

MVP에서는 실제 결제와 광고를 연동하지 않는다.

무료 후보:

- 기본 커플 비교 리포트
- 차이 TOP 3
- 오늘의 대화 미션 1개
- 공유 카드

유료 후보:

- 상세 커플 리포트
- 7일 대화 미션
- 갈등 상황별 대화 스크립트
- 기념일/데이트 추천
- PDF/이미지 카드 저장
- 장기 커플용 관계 점검 리포트

광고는 결과 핵심 화면에는 넣지 않는 방향을 우선 검토한다.

## 23. 검증 기준

제품 검증:

- 두 사람이 같은 자리에서 10분 안에 완료할 수 있는가
- participantA 결과가 participantB에게 노출되지 않는가
- 결과가 점수 싸움이 아니라 대화로 이어지는가
- 사용자가 저장/삭제 선택을 명확히 이해하는가
- 공유 카드가 민감 정보를 노출하지 않는가

기술 검증:

- 세션 상태 전이가 정의된 상태 외로 빠지지 않는가
- 뒤로가기/새로고침에서 원답이 노출되지 않는가
- i18n key 누락 없이 한국어 기본 화면이 렌더링되는가
- adapter placeholder로 Apps in Toss/Google Play SDK 직접 import를 피하는가
- 결과 계산 함수가 동일 입력에 대해 deterministic한가

## 24. 남은 결정사항

구현 전 결정하면 좋은 항목:

- 앱 최종 이름: `커플 성향지도`, `우리사이 성향지도`, `우리 잘 지내봐요` 중 선택
- 25개 MVP 문항의 최종 표현 QA
- 결과 리포트 톤: 따뜻한 설명형 vs 짧은 카드형
- 결과 저장 기본 UX: 저장 버튼을 강조할지, 삭제하고 끝내기를 같은 비중으로 둘지
- 공유 카드 디자인 방향
- 첫 구현 기술 스택: React web/Granite, React Native, 또는 다른 앱 프레임워크

## 25. 다음 구현 단계

1. 25개 MVP 문항, resultAxis, q25 앵커 규칙을 구현 계획에 반영한다.
2. `writing-plans` 단계에서 화면/파일/테스트 단위 구현 계획을 작성한다.
3. 프로젝트 스캐폴딩을 만든다.
4. i18n, 세션 상태, 문항 데이터, 채점 함수를 먼저 구현한다.
5. UI 화면을 순서대로 연결한다.
6. 브라우저/앱 QA에서 봉인, 뒤로가기, 삭제, 공유 카드 안전성을 검증한다.
