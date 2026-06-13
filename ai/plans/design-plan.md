---
version: 0.4
status: mvp-implemented
updated: 2026-06-13
canonical: true
---

# 커플 성향지도 디자인 계획

현재 최신 UI/UX 디자인 기준은 [couple-ui-design-spec.md](./couple-ui-design-spec.md)이다. 문항과 결과 엔진 기준은 [couple-mvp-integrated-design-question-result-spec.md](./couple-mvp-integrated-design-question-result-spec.md)와 [couple-question-result-engine-plan.md](./couple-question-result-engine-plan.md)를 따른다.

## Current Baseline

- 디자인 컨셉: 같은 기기에서 두 사람이 차례로 남긴 응답을 안전하게 봉인한 뒤, 평가가 아닌 대화의 지도로 함께 열어보는 따뜻한 관계 조율 앱.
- 핵심 플로우: 커플 세션 시작 -> participantA 응답 -> 답변 봉인 -> 폰 넘기기 -> participantB 응답 -> 함께 결과 열기 -> 커플 비교 리포트 -> 합의문/대화 미션 -> 저장 또는 삭제.
- MVP 대상: 연인, 부부, 썸. 친구/가족/동료/룸메이트 모드는 노출하지 않는다.
- 문항 기준: 25문항. q01~q24는 성향/차이 계산에 쓰고 q25는 `adjustment_anchor`로 결과 톤과 미션 강도 조절에만 사용한다.
- 결과 기준: 문항별 차이가 아니라 resultAxis 단위로 차이 TOP 3를 선택하고, 잘 맞는 부분을 먼저 보여준다.
- 디자인 톤: warm ivory 기반, soft coral primary, lavender secondary, soft blue accent.
- 금지 방향: 궁합 점수, 유형 등급, 심리/임상 진단, MBTI식 라벨, 원답 공개, 상대 비난/통제 문구.
- 구현 반영: `src/features/session`, `src/features/test`, `src/features/result`, `src/features/share`, `src/features/settings`에 필수 화면을 구현했다.
- 검증 반영: gstack browser 모바일 QA에서 봉인/폰 넘기기/함께 열기/저장/공유 카드/설정 흐름을 확인했다.

## Implementation Planning Notes

- 첫 구현 전 `ai/plans/couple-ui-design-spec.md`, `ai/plans/couple-mvp-integrated-design-question-result-spec.md`, `ai/plans/couple-question-result-engine-plan.md`의 화면/문항/엔진 구조와 QA 체크리스트를 implementation plan으로 변환한다.
- 모든 화면 카피는 i18n key로 렌더링한다.
- UI feature code는 platform SDK를 직접 import하지 않고 Storage/Share/Locale adapter interface만 사용한다.
- participantA 봉인 이후 back navigation으로 participantA 답변 화면에 접근하지 못하게 하는 session guard를 우선 구현한다.

## Change Log

| Version | Date | Summary |
| --- | --- | --- |
| 0.4 | 2026-06-13 | 디자인 스펙 기준의 MVP UI 구현 완료 상태와 모바일 브라우저 QA 결과를 반영했다. |
| 0.3 | 2026-06-13 | Superpowers verification + gstack plan-design-review 결과를 반영해 UI 스펙에 state coverage, i18n, safe payload, component structure, GSTACK REVIEW REPORT를 추가했다. |
| 0.2 | 2026-06-13 | 25문항, q25 adjustment anchor, resultAxis 기반 결과 엔진 문서를 최신 기준에 연결했다. |
| 0.1 | 2026-06-13 | couple-ui-design-spec.md를 최신 디자인 기준으로 지정하고 구현 계획 전제 조건을 정리했다. |
