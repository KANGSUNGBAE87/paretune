# 2026-06-13 커플 성향지도 UI/UX 디자인 스펙

## Metadata

- Actor/tool: codex
- Stage: planning
- Project: 커플성향

## User Request

샘플 UI 이미지와 고정된 MVP 지시문을 기반으로 `커플 성향지도`의 UI/UX 디자인 기획안을 만들고, 구현은 하지 않은 상태에서 구현자가 바로 화면 설계를 시작할 수 있도록 준비한다.

## Decisions Made

- 앱 포지셔닝은 궁합 테스트가 아니라 커플 관계 조율 앱으로 유지한다.
- 화면 흐름은 same-device sequential flow로 고정한다: participantA 응답, 답변 봉인, 폰 넘기기, participantB 응답, 함께 결과 열기, 커플 비교 리포트, 합의문/대화 미션, 저장 또는 삭제.
- 디자인 톤은 warm ivory 배경, soft coral primary, lavender secondary, soft blue accent로 정리했다.
- 버튼/텍스트 색상은 샘플 감성을 유지하되 AA 대비를 위해 primary coral을 접근성 기준에 맞게 조정했다.
- React Bits는 아직 설치하지 않고, 향후 React 구현 시 봉인/공개 전환의 절제된 모션 참고 후보로만 기록했다.
- 화면 카피는 구현에서 하드코딩하지 않도록 i18n key와 한국어 기본 문구 형식으로 문서화했다.
- UI feature code가 Apps in Toss/Google Play SDK에 직접 의존하지 않도록 adapter boundary를 설계 기준에 포함했다.

## Files Changed

- `ai/plans/couple-ui-design-spec.md`: 화면별 UX, 카피, 컴포넌트, 디자인 토큰, 접근성, 민감정보 보호, 공유 카드 안전 기준, 구현 우선순위, QA 체크리스트를 작성했다.
- `ai/plans/design-plan.md`: canonical 최신 디자인 계획 파일을 만들고 `couple-ui-design-spec.md`를 현재 기준으로 지정했다.
- `ai/session-logs/2026-06-13-couple-ui-design-spec.md`: 이번 계획 세션 기록을 남겼다.

## Commands and Verification

- `graphify query "커플성향 MVP same-device sequential participantA participantB 결과 공개 UI 설계에서 지켜야 할 핵심 플로우와 플랫폼 원칙은?"`
- `node` 로컬 contrast 계산으로 주요 텍스트/버튼 색상 대비를 확인했다.
- `colors.io`는 검색/열람 결과가 잡히지 않아 샘플 이미지와 직접 contrast 계산을 기준으로 팔레트를 정했다.

## Remaining Risks

- Superseded on 2026-06-13: 실제 문항은 `ai/plans/couple-mvp-integrated-design-question-result-spec.md`에서 25문항으로 확정되었고, q25는 `adjustment_anchor`로 정의되었다.
- 구현 기술 스택이 아직 확정되지 않았으므로 React Bits는 설치 대상이 아니라 참고 후보로만 남겼다.
- 실제 앱 화면 구현 후에는 모바일 viewport, 긴 닉네임, 영어 번역, reduced motion, back navigation guard를 별도 QA해야 한다.

## Next Steps

1. 사용자가 디자인 스펙을 검토하고 문구/톤/화면 우선순위 수정 여부를 결정한다.
2. 승인 후 `ai/plans/implementation-plan.md`에 화면/파일/테스트 단위 구현 계획을 작성한다.
3. 구현 단계에서 i18n, session guard, placeholder question set, UI primitives를 먼저 만든다.

## Final Review Update

사용자 요청에 따라 Superpowers verification 원칙과 gstack `/plan-design-review` 기준으로 마지막 리뷰를 수행했다.

추가 반영:

- `ai/plans/couple-ui-design-spec.md`에 정보 구조, interaction state coverage, i18n key 설계, 민감 정보 렌더링 계약, 화면 컴포넌트 구조, 반응형/접근성 보강 기준, implementation tasks, `GSTACK REVIEW REPORT`를 추가했다.
- `ai/reviews/review.md`를 canonical review artifact로 생성했다.
- gstack review log를 로컬 gstack 대시보드에 기록했다.

리뷰 결론:

- 디자인 계획은 구현 계획으로 넘어갈 수 있다.
- 다만 구현 전 `/plan-eng-review` 또는 동등한 architecture review에서 session guard, i18n, adapter boundary를 검증해야 한다.

## Knowledge Store Promotion

이번 내용은 프로젝트별 UI 디자인 결정이므로 우선 프로젝트 로컬 `ai/` 문서에 보존했다. 다른 프로젝트에 재사용할 전역 규칙은 새로 생기지 않아 `/Users/kangsungbae/Documents/지식저장소` 승격은 보류한다.
